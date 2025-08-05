import { plainToInstance } from "class-transformer";
import Producto from "../models/Producto.model";
import MovimientoStockRepository from "../repositories/Movimiento-stock.repository";
import ProductoRepository from "../repositories/Productos.repository";
import { MovimientoStockDto, UpdateStockDto } from "../schemas/MovimientoStock.dto";
import { TipoMovimiento } from "../models/Movimiento-stock.model";

class InventoryService {
    private movimientoStockRepository: MovimientoStockRepository
    private productoRepository: ProductoRepository

    constructor() {
        this.movimientoStockRepository = new MovimientoStockRepository()
        this.productoRepository = new ProductoRepository()
    }

    async addStock(updateStockDto: UpdateStockDto, productId: Producto['id']) {
        const producto = await this.productoRepository.getById(productId)

        if (!producto) {
            throw new Error('Producto no encontrado')
        }

        producto.stock += updateStockDto.cantidad

        const movimientoStockData = new MovimientoStockDto()
        movimientoStockData.tipo = TipoMovimiento.ENTRADA
        movimientoStockData.cantidad = updateStockDto.cantidad
        movimientoStockData.producto = producto

        Promise.allSettled([
            this.movimientoStockRepository.create(movimientoStockData),
            this.productoRepository.update(producto)
        ])
    }

    async removeStock(updateStockDto: UpdateStockDto, productId: Producto['id']) {
        const producto = await this.productoRepository.getById(productId)

        if (!producto) {
            throw new Error('Producto no encontrado')
        }

        if (producto.stock < updateStockDto.cantidad) {
            throw new Error('Stock insuficiente')
        }

        producto.stock -= updateStockDto.cantidad

        const movimientoStockData = plainToInstance(MovimientoStockDto, {
            tipo: TipoMovimiento.SALIDA,
            cantidad: updateStockDto.cantidad,
            producto: producto
        })

        Promise.allSettled([
            this.movimientoStockRepository.create(movimientoStockData),
            this.productoRepository.update(producto)
        ])
    }

    async getMovements(productId: Producto['id']) {
        const producto = await this.productoRepository.getById(productId)

        if (!producto) {
            throw new Error('Producto no encontrado')
        }
        return await this.movimientoStockRepository.getByProductId(productId)
    }
}

export default new InventoryService()