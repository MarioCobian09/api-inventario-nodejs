import { IsEmpty, IsString } from "class-validator";

export class CategoryDto {
    @IsString({ message: 'El nombre debe ser una cadena de texto.' })
    declare nombre: string;

    @IsString({ message: 'La descripción debe ser una cadena de texto.' })
    declare descripcion: string;
}