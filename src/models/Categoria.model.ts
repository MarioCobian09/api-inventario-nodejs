import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import Producto from "./Producto.model"

@Entity()
class Categoria {

    @PrimaryGeneratedColumn()
    declare id: number

    @Column()
    declare nombre: string

    @Column({ type: 'text', nullable: true })
    declare descripcion: string
    
    @OneToMany(() => Producto, producto => producto.categoria)
    declare productos: Producto[]

    @CreateDateColumn({ name: 'created_at' })
    declare createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    declare updatedAt: Date
}

export default Categoria