import { plainToInstance } from "class-transformer";
import InventoryService from "../services/Inventory.service";
import { Request, Response } from "express";
import { UpdateStockDto } from "../schemas/MovimientoStock.dto";
import { validate } from "class-validator";
import { error } from "console";

class InventoryController {

    static async addStock(req: Request, res: Response) {
        const productId = +req.params.id

        if(isNaN(productId)) {
            return res.status(400).json({ error: "El ID del producto debe ser un número" })
        }
        
        try {
            const updateStockDto = plainToInstance(UpdateStockDto, req.body)
    
            const errors = await validate(updateStockDto)

            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map(err => Object.values(err.constraints || {})).flat() })
            }

            await InventoryService.addStock(updateStockDto, productId)
            res.status(200).send('Stock añadido correctamente')
        } catch (error) {
            if (error instanceof Error && error.message === 'Producto no encontrado') {
                return res.status(404).json({ error: 'Producto no encontrado' })
            }
            res.status(400).json({ error: 'Ha ocurrido un error.' })
        }
    }

    static async removeStock(req: Request, res: Response) {
        const productId = +req.params.id

        if(isNaN(productId)) {
            return res.status(400).json({ error: "El ID del producto debe ser un número" })
        }

        try {
            const updateStockDto = plainToInstance(UpdateStockDto, req.body)
    
            const errors = await validate(updateStockDto)

            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map(err => Object.values(err.constraints || {})).flat() })
            }

            await InventoryService.removeStock(updateStockDto, productId)
            res.status(200).send('Stock retirado correctamente')
        } catch (error) {
            if (error instanceof Error && error.message === 'Producto no encontrado') {
                return res.status(404).json({ error: 'Producto no encontrado' })
            } else if (error instanceof Error && error.message === 'Stock insuficiente') {
                return res.status(400).json({ error: 'Stock insuficiente' })
            }
            res.status(400).json({ error: 'Ha ocurrido un error.' })
        }
    }

    static async getMovements(req: Request, res: Response) {
        const productId = +req.params.id

        if(isNaN(productId)) {
            return res.status(400).json({ error: "El ID del producto debe ser un número" })
        }

        try {
            const movements = await InventoryService.getMovements(productId)
            res.status(200).json(movements)
        } catch (error) {
            if (error instanceof Error && error.message === 'Producto no encontrado') {
                return res.status(404).json({ error: 'Producto no encontrado' })
            }
            res.status(400).json({ error: 'Ha ocurrido un error.' })
        }
    }
}

export default InventoryController