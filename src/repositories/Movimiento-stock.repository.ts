import { Repository } from "typeorm";
import MovimientoStock from "../models/Movimiento-stock.model";
import { AppDataSource } from "../config/db";
import { MovimientoStockDto } from "../schemas/MovimientoStock.dto";

class MovimientoStockRepository {
    private MovimientoStockRepository: Repository<MovimientoStock>

    constructor() {
        this.MovimientoStockRepository = AppDataSource.getRepository(MovimientoStock)
    }

    async create(movimientoStockData: MovimientoStockDto) {
        const movimientoStock = this.MovimientoStockRepository.create(movimientoStockData)
        return this.MovimientoStockRepository.save(movimientoStock)
    }

    async getByProductId(productId: number) {
        return this.MovimientoStockRepository.find({
            where: { producto: { id: productId } },
            order: { fecha: "DESC" }
        })
    }
}

export default MovimientoStockRepository