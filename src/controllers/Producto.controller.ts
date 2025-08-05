import { Request, Response } from "express"
import ProductoService from "../services/Producto.service"

type ProductoData = {
    nombre: string
    descripcion?: string
    precio: number
    stock?: number
    categoria: number
}

class ProductoController {

    static async create(req: Request, res: Response) {
        try {
            const productData : ProductoData = req.body
            const newProduct = await ProductoService.create(productData)

            return res.status(201).send('Producto creado exitosamente.')
            
        } catch (error) {
            return res.status(500).json({ message: 'Error al crear el producto.', error: error.message })
        }
    }
    
    static async getProducts(req: Request, res: Response) {

        const { search, category } = req.query

        try {

            const productos = await ProductoService.getProducts(
                search as string | undefined, 
                category ? parseInt(category as string) : undefined
            )
            return res.status(200).json(productos)
            
        } catch (error) {
            return res.status(500).json({ message: 'Error al crear el producto.', error: error.message })
        }
    }

    static async getById(req: Request, res: Response) {
        const productId = parseInt(req.params.id)

        try {
            const producto = await ProductoService.getById(productId)
            if (!producto) {
                return res.status(404).json({ message: 'Producto no encontrado.' })
            }
            return res.status(200).json(producto)
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener el producto.', error: error.message })
        }
    }

    static async update(req: Request, res: Response) {
        const productId = +req.params.id
        const productData: ProductoData = req.body

        if (!productId || isNaN(productId)) {
            return res.status(400).json({ message: 'ID de producto inválido.' })
        }

        try {
            const updatedProduct = await ProductoService.update(productId, productData)
            if (!updatedProduct) {
                return res.status(404).json({ message: 'Producto no encontrado.' })
            }
            return res.status(200).send('Producto actualizado exitosamente.')
        } catch (error) {
            return res.status(500).json({ message: 'Error al actualizar el producto.', error: error.message })
        }
    }

    static async delete(req: Request, res: Response) {
        const productId = parseInt(req.params.id)

        try {
            await ProductoService.delete(productId)
            return res.status(200).send('Producto eliminado exitosamente.')
        } catch (error) {
            return res.status(500).json({ message: 'Error al eliminar el producto.', error: error.message })
        }
    }
}

export default ProductoController