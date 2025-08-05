import { validate } from "class-validator"
import { LoginDto, UpdateUserDto, UserDto } from "../schemas/Usuario.dto"
import UsuarioService from "../services/Usuario.service"
import { plainToInstance } from "class-transformer"
import { Request, Response } from "express"

const userService = new UsuarioService()

class UsuarioController {

    static async createUser(req: Request, res: Response) {
        const userDto = plainToInstance(UserDto, req.body)

        const errors = await validate(userDto)

        if (errors.length > 0) {
            return res.status(409).json({errors: errors.map( error => error.constraints )})
        }

        try {
            const newUser = await userService.createUser(userDto)
            
            if(newUser) {
                res.send('Usuario Creado Correctamente')
            }
        } catch (error) {
            if (error.message.includes('El usuario ya existe.')) {
                return res.status(409).json({ message: error.message })
            }
            return res.status(500).json({ message: 'Error interno del servidor' })
        }
    }

    static async login(req: Request, res: Response) {
        const loginDto = plainToInstance(LoginDto, req.body)

        const errors = await validate(loginDto)
        if (errors.length > 0) {
            return res.status(409).json({errors: errors.map( error => error.constraints )})
        }

        try {
            const result = await userService.login(loginDto)
            return res.status(200).json(result)
        } catch (error) {
            return res.status(401).json({ message: error.message })
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const users = await userService.getAll()
            return res.status(200).json(users)
        } catch (error) {
            return res.status(500).json({ message: 'Error interno del servidor' })
        }
    }

    static async getById(req: Request, res: Response) {
        const userId = +req.params.id

        if(isNaN(userId)) {
            return res.status(400).json({ message: 'El ID debe ser un número' })
        }

        try {
            const user = await userService.getById(userId)
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' })
            }
            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json({ message: 'Error interno del servidor' })
        }
    }

    static async update(req: Request, res: Response) {
        const userId = +req.params.id

        if(isNaN(userId)) {
            return res.status(400).json({ message: 'El ID debe ser un número' })
        }

        // En caso de tener atributos que no son, que los omita
        const userDto = plainToInstance(UpdateUserDto, req.body)

        const errors = await validate(userDto, { whitelist: true })
        if (errors.length > 0) {
            return res.status(409).json({errors: errors.map( error => error.constraints )})
        }

        try {

            await userService.update(userId, userDto)
            return res.status(200).send('Usuario actualizado correctamente')

        } catch (error) {
            if (error.message.includes('Usuario no encontrado')) {
                return res.status(404).json({ message: error.message })
            }
            if (error.message.includes('El e-mail ya está en uso')) {
                return res.status(409).json({ message: error.message })
            }
            return res.status(500).json({ message: 'Error interno del servidor' })
        }
    }

    static async updateRole(req: Request, res: Response) {
        const userId = +req.params.id

        if(isNaN(userId)) {
            return res.status(400).json({ message: 'El ID debe ser un número' })
        }

        try {
            await userService.updateRole(userId)
            return res.status(200).send('Rol actualizado correctamente')
        } catch (error) {
            if (error.message.includes('Usuario no encontrado')) {
                return res.status(404).json({ message: error.message })
            }
            return res.status(500).json({ message: 'Error interno del servidor' })
        }
    }

    static async delete(req: Request, res: Response) {
        const userId = +req.params.id

        if(isNaN(userId)) {
            return res.status(400).json({ message: 'El ID debe ser un número' })
        }

        try {
            const deleted = await userService.delete(userId)
            if (deleted) {
                return res.status(200).send('Usuario eliminado correctamente')
            } else {
                return res.status(404).json({ message: 'Usuario no encontrado' })
            }
        } catch (error) {
            return res.status(500).json({ message: 'Error interno del servidor' })
        }
    }
}

export default UsuarioController