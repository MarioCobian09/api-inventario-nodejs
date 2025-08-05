import { IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, MinLength } from "class-validator"


export class UserDto {
    @IsString({ message: 'El nombre debe ser un texto.' })
    @IsNotEmpty({ message: 'El nombre es obligatorio.' })
    declare nombre: string

    @IsEmail({}, { message: 'El e-mail no es válido.' })
    declare email: string

    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
    @IsNotEmpty({ message: 'La contraseña no puede estar vacía.' })
    declare password: string
}

export class LoginDto {
    @IsEmail({}, { message: 'El e-mail no es válido.' })
    declare email: string

    @IsNotEmpty({ message: 'La contraseña no puede estar vacía.' })
    declare password: string
}

export class GetUserByIdDto {
    @IsNotEmpty({ message: 'El ID no puede estar vacío.' })
    @IsNumber({}, { message: 'El ID debe ser un número.' })
    declare id: number
}

export class UpdateUserDto {
    @IsString({ message: 'El nombre debe ser un texto.' })
    @IsNotEmpty({ message: 'El nombre es obligatorio.' })
    declare nombre: string

    @IsEmail({}, { message: 'El e-mail no es válido.' })
    declare email: string
}