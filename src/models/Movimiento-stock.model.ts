import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import Producto from "./Producto.model"

export enum TipoMovimiento {
    ENTRADA = 'entrada',
    SALIDA = 'salida'
}

@Entity()
class MovimientoStock {
    @PrimaryGeneratedColumn()
    id: number
  
    @Column({
      type: 'enum',
      enum: TipoMovimiento,
    })
    tipo: TipoMovimiento
  
    @Column()
    cantidad: number
  
    @ManyToOne(() => Producto)
    producto: Producto
  
    @CreateDateColumn({ name: 'fecha' })
    fecha: Date
}

export default MovimientoStock