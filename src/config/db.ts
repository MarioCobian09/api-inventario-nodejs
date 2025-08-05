import { DataSource } from "typeorm"
import { exit } from "process"
import colors from 'colors'
import dotenv from 'dotenv';

import Usuario from "../models/Usuario.model"
import Categoria from "../models/Categoria.model";
import Producto from "../models/Producto.model";
import MovimientoStock from "../models/Movimiento-stock.model";


dotenv.config();

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME || 'prueba_inventario_db',
    url: process.env.DB_URL || '', // Para usar con Heroku
    synchronize: true,
    logging: false, // ver las consultas a la DB
    entities: [Usuario, Categoria, Producto, MovimientoStock],
    subscribers: [],
    migrations: []
})

export const connectDB = async () => {


    try {

        await AppDataSource.initialize()
        console.log(colors.magenta.bold('La DB esta funcionando correctamente!'))
        
    } catch (error) {
        console.log(error);
        
        console.log(colors.red.bold('Error al conectar con la DB'))
        exit(1)
    }
}