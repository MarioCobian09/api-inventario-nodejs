import { Router } from "express";
import { body, param } from "express-validator";
import UsuarioController from "../controllers/Usuario.controller";
import { handleInputErrors } from "../middlewares/validation";
import { isAdmin } from "../middlewares/auth";

const router = Router()

router.use(isAdmin)

// CRUD DE USUARIOS

// Get all users
router.get('/get-all', UsuarioController.getAll)

// Get user by ID
router.get('/:userId',
    param('id')
        .isNumeric().withMessage('El ID no puede estar vacío'),
    handleInputErrors,
    UsuarioController.getById
)

// Update User
router.patch('/:id',
    param('id')
        .isNumeric().withMessage('El ID no puede estar vacío'),
    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio.'),
    body('email')
        .notEmpty().withMessage('El nombre es obligatorio.'),
    handleInputErrors,
    UsuarioController.update
)

// Update role
router.patch('/:id/role',
    param('id')
        .isNumeric().withMessage('El ID no puede estar vacío'),
    handleInputErrors,
    UsuarioController.updateRole
)

// Delete
router.delete('/:id',
    param('id')
        .isNumeric().withMessage('El ID no puede estar vacío'),
    handleInputErrors,
    UsuarioController.delete
)



export default router