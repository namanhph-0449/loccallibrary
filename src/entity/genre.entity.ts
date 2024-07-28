import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm'
import { Book } from './book.entity';

@Entity()
export class Genre {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar', nullable: true })
    url: string;

    @ManyToMany(() => Book, (book) => book.genres)
    books: Book[] | undefined;

    constructor(initialValues: Partial<Genre> = {}) {
        Object.assign(this, initialValues);
    }
}
