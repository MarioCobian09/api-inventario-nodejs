import CategoriaRepository from "../repositories/Categoria.repostory"
import { CategoryDto } from "../schemas/Categoria.dto"

class CategoriaService {
    private categoriaRepository : CategoriaRepository

    constructor() {
        this.categoriaRepository = new CategoriaRepository()
    }

    async create(categoryData: CategoryDto) {
        return await this.categoriaRepository.create(categoryData)
    }

    async getAll() {
        return await this.categoriaRepository.getAll()
    }

    async getById(id: number) {
        const category = await this.categoriaRepository.getById(id)
        return category
    }

    async update(id: number, categoryData: CategoryDto) {
        const existingCategory = await this.categoriaRepository.getById(id)

        if (!existingCategory) {
            throw new Error("Categoría no encontrada")
        }

        Object.assign(existingCategory, categoryData)

        return await this.categoriaRepository.create(existingCategory)
    }

    async delete(id: number) {
        const existingCategory = await this.categoriaRepository.getById(id)

        if(existingCategory) {
            return await this.categoriaRepository.delete(existingCategory)
        } else {
            return existingCategory
        }

    }
}

export default CategoriaService