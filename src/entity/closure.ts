import {Entity, Tree, Column, PrimaryGeneratedColumn, TreeChildren, TreeParent } from "typeorm";

@Entity()
@Tree("closure-table")
export class Closure {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @TreeChildren()
    children: Closure[];

    @TreeParent()
    parent: Closure;
}
