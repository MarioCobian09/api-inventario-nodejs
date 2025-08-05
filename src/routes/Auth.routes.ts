import { Router } from "express";
import { body } from "express-validator";
import UsuarioController from "../controllers/Usuario.controller";
import { handleInputErrors } from "../middlewares/validation";


const router = Router()

router.post('/create-user', 
    body('nombre')
        .notEmpty().withMessage('El nombre no puede ir vació.'),
    body('email')
        .notEmpty().withMessage('El email no puede ir vació.'),
    body('password')
        .notEmpty().withMessage('El password no puede ir vació.'),
    handleInputErrors,
    UsuarioController.createUser
)

router.post('/login', 
    body('email')
        .notEmpty().withMessage('El email no puede ir vació.'),
    body('password')
        .notEmpty().withMessage('El password no puede ir vació.'),
    handleInputErrors,
    UsuarioController.login
)

export default router