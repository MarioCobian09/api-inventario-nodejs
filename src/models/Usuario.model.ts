import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
class Usuario {

    @PrimaryGeneratedColumn()
    declare id: number

    @Column()
    declare nombre: string

    @Column({ unique: true })
    declare email: string

    @Column()
    declare password: string

    @Column({ default: false })
    declare role: boolean

    @CreateDateColumn({ name: 'created_at' })
    declare createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    declare updatedAt: Date
}

export default Usuario