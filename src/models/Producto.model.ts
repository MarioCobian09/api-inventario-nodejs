import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import Categoria from "./Categoria.model"

@Entity()
class Producto {

    @PrimaryGeneratedColumn()
    declare id: number

    @Column()
    declare nombre: string

    @Column({ type: 'text', nullable: true })
    declare descripcion: string

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    declare precio: number

    @Column({ type: 'int', default: 0 })
    declare stock: number

    @ManyToOne(() => Categoria, categoria => categoria.productos, { eager: true })
    @JoinColumn({ name: 'categoria_id' })
    declare categoria: Categoria

    @CreateDateColumn({ name: 'created_at' })
    declare createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    declare updatedAt: Date
}

export default Producto