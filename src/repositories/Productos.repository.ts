import { Like, Repository } from "typeorm"
import Producto from "../models/Producto.model"
import { AppDataSource } from "../config/db"
import { ProductDto } from "../schemas/Producto.dto"


class ProductoRepository {
    private productosRepository: Repository<Producto>

    constructor() {
        this.productosRepository = AppDataSource.getRepository(Producto)
    }

    async create(productoData: ProductDto) {
        const nuevoProducto = this.productosRepository.create(productoData)
        return await this.productosRepository.save(nuevoProducto)
    }

    async getAll() {
        return await this.productosRepository.find({
            relations: ['categoria']
        })
    }

    async searchByNameOrDescription(query: string) {
        return await this.productosRepository.find({
            where: [
                { nombre: Like(`%${query}%`) },
                { descripcion: Like(`%${query}%`) }
            ],
            relations: ['categoria']
        })
    }

    async findByCategory(categoryId: number) {
        return await this.productosRepository.find({
            where: { categoria: { id: categoryId } },
            relations: ['categoria']
        })
    }

    async getById(id: Producto['id']) {
        return await this.productosRepository.findOne({
            where: { id },
            relations: ['categoria']
        })
    }

    async update(producto: Producto) {
        return await this.productosRepository.save(producto)
    }

    async delete(producto: Producto) {
        return await this.productosRepository.remove(producto)
    }
}

export default ProductoRepository