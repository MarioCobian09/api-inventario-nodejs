import { Repository } from "typeorm"
import { AppDataSource } from "../config/db"
import Categoria from "../models/Categoria.model"
import { CategoryDto } from "../schemas/Categoria.dto"


class CategoriaRepository {

    private categoriaRepository: Repository<Categoria>

    constructor() {
        this.categoriaRepository = AppDataSource.getRepository(Categoria)
    }

    async create(categoryData: CategoryDto) {
        const newCategoria = this.categoriaRepository.create(categoryData)
        return await this.categoriaRepository.save(newCategoria)
    }

    async getAll() {
        return await this.categoriaRepository.find({
            order: {
                nombre: "ASC"
            }
        })
    }

    async getById(id: number) {
        return await this.categoriaRepository.findOneBy({ id })
    }

    async update(category: Categoria) {
        return await this.categoriaRepository.save(category)
    }

    async delete(user: Categoria) {
        return await this.categoriaRepository.delete(user.id)
    }
}

export default CategoriaRepository