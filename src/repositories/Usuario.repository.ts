import { Repository } from "typeorm"
import { AppDataSource } from "../config/db"
import Usuario from "../models/Usuario.model"
import { UserDto } from "../schemas/Usuario.dto"

class UsuarioRepository {

    private userRepository: Repository<Usuario>

    constructor() {
        this.userRepository = AppDataSource.getRepository(Usuario)
    }

    async createUser(userData: UserDto) {
        const newUser = this.userRepository.create(userData)
        return await this.userRepository.save(newUser)
    }

    async findByEmail(email: string) {
        return await this.userRepository.findOneBy({ email })
    }

    async getAll() {
        return await this.userRepository.find()
    }

    async getById(id: number) {
        return await this.userRepository.findOneBy({ id })
    }

    async update(user: Usuario) {
        return await this.userRepository.save(user)
    }

    async delete(user: Usuario) {
        return await this.userRepository.delete(user.id)
    }
}

export default UsuarioRepository