import { plainToInstance } from "class-transformer"
import { Request, Response } from "express"
import { CategoryDto } from "../schemas/Categoria.dto"
import CategoriaService from "../services/Categoria.service"
import { validate } from "class-validator"

const categoryService = new CategoriaService()

class CategoriaController {
    
    static async create(req: Request, res: Response) {
        const categoryDto = plainToInstance(CategoryDto, req.body)

        const errors = await validate(categoryDto)

        if (errors.length > 0) {
            return res.status(409).json({ errors: errors.map(error => error.constraints) })
        }

        try {
            const newCategory = await categoryService.create(categoryDto)
            return res.status(201).send('Categoría creada correctamente')
        } catch (error) {
            return res.status(500).json({ message: "Error interno del servidor" })
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const categories = await categoryService.getAll()
            return res.status(200).json(categories)
        } catch (error) {
            return res.status(500).json({ message: "Error interno del servidor" })
        }
    }

    static async getById(req: Request, res: Response) {
        const categoryId = +req.params.categoryId

        if (isNaN(categoryId)) {
            return res.status(400).json({ message: "ID de categoría inválido" })
        }

        try {
            const category = await categoryService.getById(categoryId)
            if (!category) {
                return res.status(404).json({ message: "Categoría no encontrada" })
            }
            return res.status(200).json(category)
        } catch (error) {
            return res.status(500).json({ message: "Error interno del servidor" })
        }
    }
    
    static async update(req: Request, res: Response) {
        const categoryId = +req.params.categoryId

        if (isNaN(categoryId)) {
            return res.status(400).json({ message: "ID de categoría inválido" })
        }

        const categoryDto = plainToInstance(CategoryDto, req.body)

        const errors = await validate(categoryDto)

        if (errors.length > 0) {
            return res.status(409).json({ errors: errors.map(error => error.constraints) })
        }

        try {
            const updatedCategory = await categoryService.update(categoryId, categoryDto)
            if (updatedCategory) {
                return res.status(200).send('Categoría actualizada correctamente')
            }
        } catch (error) {
            return res.status(500).json({ message: "Error interno del servidor" })
        }
    }

    static async delete(req: Request, res: Response) {
        const categoryId = +req.params.categoryId

        if (isNaN(categoryId)) {
            return res.status(400).json({ message: "ID de categoría inválido" })
        }

        try {
            const deleted = await categoryService.delete(categoryId)
            if (deleted) {
                return res.status(200).send('Categoría eliminada correctamente')
            } else {
                return res.status(404).json({ message: "Categoría no encontrada" })
            }
        } catch (error) {
            return res.status(500).json({ message: "Error interno del servidor" })
        }
    }
}

export default CategoriaController