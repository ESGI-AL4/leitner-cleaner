import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Card {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    category: number;

    @Column()
    question: string;

    @Column()
    answer: string;

    @Column()
    tag: string;
}