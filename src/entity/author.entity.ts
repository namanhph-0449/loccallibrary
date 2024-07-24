import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Book } from './book.entity';

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    firstName: string;
    
    @Column({ type: 'varchar' })
    familyName: string;

    @Column({ type: 'date', nullable: true })
    dateOfBirth: Date;

    @Column({ type: 'date', nullable: true })
    dateOfDeath: Date;

    @Column({ type: 'varchar', nullable: true })
    name: string;

    @Column({ type: 'varchar', nullable: true })
    url: string;

    @OneToMany(() => Book, book => book.author)
    books: Book[];

    constructor(initialValues: Partial<Author> = {}) {
        Object.assign(this, initialValues);
    }
}
