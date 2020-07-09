import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./category";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Question {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    title: string;

    @Column()
    @ApiProperty()
    text: string;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @ManyToMany(type => Category)
    @JoinTable()
    @ApiProperty()
    categories: Category[];

    @CreateDateColumn()
    @ApiProperty()
    readonly createdAt?: Date;

    @UpdateDateColumn()
    @ApiProperty()
    readonly updatedAt?: Date;

}
