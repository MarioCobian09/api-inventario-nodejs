import { IsEmpty, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";
import Categoria from "../models/Categoria.model";

export class ProductDto {
    @IsNotEmpty({ message: 'El nombre del producto no puede estar vació.' })
    @IsString({ message: 'El nombre del producto debe ser una cadena de texto.' })
    nombre: string;

    @IsString()
    @IsOptional()
    descripcion?: string;

    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'El precio debe ser un número con hasta dos decimales.' })
    @IsPositive({ message: 'El precio debe ser un número positivo.' })
    precio: number;

    @IsInt({ message: 'El stock debe ser un número entero.' })
    @Min(0, { message: 'El stock no puede ser negativo.' })
    @IsOptional()
    stock?: number;

    @IsNotEmpty({ message: 'La categoría no puede estar vacía.' })
    categoria: Categoria;
}