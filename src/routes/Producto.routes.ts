import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middlewares/validation";
import ProductoController from "../controllers/Producto.controller";

const router = Router()

router.post('/',
    body('nombre').notEmpty().withMessage('El nombre del producto no puede estar vacío.'),
    body('descripcion').optional().isString().withMessage('La descripción debe ser una cadena de texto.'),
    body('precio').isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo.'),
    body('stock').optional().isInt({ min: 0 }).withMessage('El stock debe ser un número entero positivo.'),
    body('categoria').notEmpty().withMessage('La categoría no puede estar vacía.'),
    handleInputErrors,
    ProductoController.create
)

router.get('/', ProductoController.getProducts)

router.get('/:id',
    param('id').isInt().withMessage('El ID del producto debe ser un número entero.'),
    handleInputErrors,
    ProductoController.getById
)

router.put('/:id',
    param('id').isInt().withMessage('El ID del producto debe ser un número entero.'),
    body('nombre').notEmpty().withMessage('El nombre del producto no puede estar vacío.'),
    body('descripcion').optional().isString().withMessage('La descripción debe ser una cadena de texto.'),
    body('precio').isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo.'),
    body('stock').optional().isInt({ min: 0 }).withMessage('El stock debe ser un número entero positivo.'),
    body('categoria').notEmpty().withMessage('La categoría no puede estar vacía.'),
    handleInputErrors,
    ProductoController.update
)

router.delete('/:id',
    param('id').isInt().withMessage('El ID del producto debe ser un número entero.'),
    handleInputErrors,
    ProductoController.delete
)

export default router