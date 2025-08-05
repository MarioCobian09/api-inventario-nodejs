import Usuario from "../models/Usuario.model"
import UsuarioRepository from "../repositories/Usuario.repository"
import { LoginDto, UpdateUserDto, UserDto } from "../schemas/Usuario.dto"
import { checkPassword, hashPassword } from "../utils/auth"
import { generateJWT } from "../utils/jwt"


class UsuarioService {

    private userRepository: UsuarioRepository
    
    constructor() {
        this.userRepository = new UsuarioRepository()
    }

    async createUser(userData: UserDto) {

        const existingUser = await this.userRepository.findByEmail(userData.email)

        if(existingUser) {
            throw new Error('El usuario ya existe.')
        }

        const hashedPassword = await hashPassword(userData.password)

        const data = userData
        data.password = hashedPassword

        const newUser = await this.userRepository.createUser(data)

        const { password, ...user } = newUser
        return user
    }

    async login(loginData: LoginDto) {

        const { email, password } = loginData
        const user = await this.userRepository.findByEmail(email)

        if(!user) {
            throw new Error('Credenciales inválidas')
        }

        const isPasswordValid = await checkPassword(password, user.password)
        if(!isPasswordValid) {
            throw new Error('Credenciales inválidas')
        }

        const payload = {
            nombre: user.nombre,
            email: user.email
        }

        const token = generateJWT(payload)

        return {
            token
        }
    }

    async getAll() {
        const users = await this.userRepository.getAll()
        return users.map(user => {
            const { password, ...userData } = user
            return userData
        })
    }

    async getById(userId: number) {
        const user = await this.userRepository.getById(userId)

        if(user) {
            const { password, ...userData } = user
            return userData
        } else {
            return user
        }
    }

    async update(userId: Usuario['id'], userData: UpdateUserDto) {
        const user = await this.userRepository.getById(userId)

        if(!user) {
            throw new Error('Usuario no encontrado')
        }

        if(userData.email && userData.email !== user.email) {
            const existingUser = await this.userRepository.findByEmail(userData.email)
            if(existingUser) {
                throw new Error('El e-mail ya está en uso')
            }
        }

        Object.assign(user, userData)

        return await this.userRepository.update(user)
    }

    async updateRole(userId: Usuario['id']) {
        const user = await this.userRepository.getById(userId)

        if(!user) {
            throw new Error('Usuario no encontrado')
        }

        user.role = !user.role

        return await this.userRepository.update(user)
    }

    async delete(userId: Usuario['id']) {
        const user = await this.userRepository.getById(userId)

        if(!user) {
            throw new Error('Usuario no encontrado')
        }

        return await this.userRepository.delete(user)
    }
}

export default UsuarioService