import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm'
import { Book } from './book.entity';

@Entity()
export class BookInstance {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    imprint: string;

    @Column({ type: 'varchar' })
    status: string;

    @Column({ type: 'date', nullable: true })
    dueBack: Date;

    @Column({ type: 'varchar', nullable: true })
    url: string;

    @ManyToOne(() => Book, book => book.bookInstances)
    book: Book;

    constructor(initialValues: Partial<BookInstance> = {}) {
        Object.assign(this, initialValues);
    }
}
