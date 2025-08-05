import { IsInt, IsPositive } from "class-validator";
import { TipoMovimiento } from "../models/Movimiento-stock.model";
import Producto from "../models/Producto.model";

export class UpdateStockDto {
    @IsInt({ message: 'La cantidad debe ser un número entero.' })
    @IsPositive({ message: 'La cantidad debe ser un número positivo.' })
    cantidad: number;
}

export class MovimientoStockDto {
    tipo: TipoMovimiento;
    cantidad: number;
    producto: Producto;
}