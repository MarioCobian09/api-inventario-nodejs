import { validate } from "class-validator";
import CategoriaRepository from "../repositories/Categoria.repostory";
import ProductoRepository from "../repositories/Productos.repository";
import { ProductDto } from "../schemas/Producto.dto";
import { plainToInstance } from "class-transformer";

type ProductoData = {
    nombre: string;
    descripcion?: string;
    precio: number;
    stock?: number;
    categoria: number;
}

class ProductoService {
    private productoRepository: ProductoRepository
    private categoriaRepository: CategoriaRepository

    constructor() {
        this.productoRepository = new ProductoRepository()
        this.categoriaRepository = new CategoriaRepository();
    }

    async create(productData: ProductoData) {

        // Encontrar la categoría por ID
        const categoriaId = productData.categoria
        const categoria = await this.categoriaRepository.getById(categoriaId)

        if (!categoria) {
            throw new Error(`Categoría con ID ${categoriaId} no encontrada.`);
        }

        // Asignarle la categoría al producto
        const productoDto = plainToInstance(ProductDto, {
            ...productData,
            categoria: categoria
        })

        // Convertirlo a DTO
        const errors = await validate(productoDto)

        if (errors.length > 0) {
            throw new Error(`Errores de validación: ${errors.map(err => Object.values(err.constraints || {}).join(', ')).join('; ')}`)
        }

        // Crear el producto en la base de datos
        const newProduct = await this.productoRepository.create(productoDto)
        if (!newProduct) {
            throw new Error('Error al crear el producto.');
        }

        return newProduct
    }

    async getProducts(search?: string, categoryId?: number) {
        
        if (search) {
            return await this.productoRepository.searchByNameOrDescription(search)
        } else if (categoryId) {
            return await this.productoRepository.findByCategory(categoryId)
        } else {
            return await this.productoRepository.getAll()
        }
    }

    async getById(productId: number) {
        const producto = await this.productoRepository.getById(productId)
        return producto 
    }

    async update(productId: number, productData: ProductoData) {
        // Encontrar el producto por ID
        const product = await this.productoRepository.getById(productId)

        if (!product) {
            throw new Error(`Producto con ID ${productId} no encontrado.`);
        }

        // Encontrar la categoría por ID
        const categoriaId = productData.categoria
        const categoria = await this.categoriaRepository.getById(categoriaId)

        if (!categoria) {
            throw new Error(`Categoría con ID ${categoriaId} no encontrada.`);
        }

        Object.assign(product, {
            ...productData,
            categoria: categoria
        })

        // Actualizar el producto en la base de datos
        const updatedProduct = await this.productoRepository.update(product)

        if (!updatedProduct) {
            throw new Error('Error al actualizar el producto.');
        }

        return updatedProduct
    }

    async delete(productId: number) {
        const product = await this.productoRepository.getById(productId)

        if (!product) {
            throw new Error(`Producto con ID ${productId} no encontrado.`);
        }

        const deleted = await this.productoRepository.delete(product)

        if (!deleted) {
            throw new Error('Error al eliminar el producto.');
        }
    }

}

export default new ProductoService();