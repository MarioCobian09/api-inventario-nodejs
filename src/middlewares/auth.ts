import { Response, Request, NextFunction } from "express"
import jwt from "jsonwebtoken"
import UsuarioRepository from "../repositories/Usuario.repository"
import Usuario from "../models/Usuario.model"

declare global {
    namespace Express {
        interface Request {
            user?: Usuario
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    
    const bearer = req.headers.authorization

    if (!bearer) {
        return res.status(401).json({ message: 'No Autorizado' })
    }

    const [, token] = bearer.split(' ')

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(typeof decoded === 'object' && decoded.email) {
            const userRepository = new UsuarioRepository()
            const user = await userRepository.findByEmail(decoded.email) 

            if(user) {
                req.user = user
                next()
            } else {
                return res.status(401).json({ message: 'Token inválido' })
            }
        }
        
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' })
    }
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== true) {
        return res.status(403).json({ message: 'Acceso denegado' })
    }
    next()
}