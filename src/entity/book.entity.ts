import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne, JoinTable } from 'typeorm'
import { Author } from './author.entity';
import { Genre } from './genre.entity';
import { BookInstance } from './BookInstance.entity';

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    title: string;
    
    @Column({ type: 'varchar' })
    summary: string;

    @Column({ type: 'varchar', nullable: true })
    isbn: string;

    @Column({ type: 'varchar', nullable: true })
    url: string;

    @ManyToOne(() => Author, author => author.books)
    author: Author;

    @ManyToMany(() => Genre)
    @JoinTable()
    genres: Genre[];

    @OneToMany(() => BookInstance, bookInstance => bookInstance.book)
    bookInstances: BookInstance[];

    constructor(initialValues: Partial<Book> = {}) {
        Object.assign(this, initialValues);
    }

}
