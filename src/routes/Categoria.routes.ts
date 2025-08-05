import { Router } from "express";
import CategoriaController from "../controllers/Categoria.controller";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middlewares/validation";

const router = Router()

router.post('/', 
    body('nombre')
        .notEmpty().withMessage('El nombre no puede estar vacío.'),
    body('descripcion')
        .notEmpty().withMessage('La descripción no puede estar vacía.'),
    handleInputErrors,
    CategoriaController.create
)

router.get('/', CategoriaController.getAll)

router.get('/:categoryId',
    param('categoryId')
        .isNumeric().withMessage('El ID de la categoría debe ser un número.'),
    handleInputErrors,
    CategoriaController.getById
)

router.put('/:categoryId',
    param('categoryId')
        .isNumeric().withMessage('El ID de la categoría debe ser un número.'),
    body('nombre')
        .notEmpty().withMessage('El nombre no puede estar vacío.'),
    body('descripcion')
        .notEmpty().withMessage('La descripción no puede estar vacía.'),
    handleInputErrors,
    CategoriaController.update
)

router.delete('/:categoryId',
    param('categoryId')
        .isNumeric().withMessage('El ID de la categoría debe ser un número.'),
    handleInputErrors,
    CategoriaController.delete
)

export default router