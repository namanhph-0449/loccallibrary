import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity()
export class Genre {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar', nullable: true })
    url: string;

    constructor(initialValues: Partial<Genre> = {}) {
        Object.assign(this, initialValues);
    }
}
