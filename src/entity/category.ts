import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    name: string;

    @CreateDateColumn()
    @ApiProperty()
    readonly createdAt?: Date;

    @UpdateDateColumn()
    @ApiProperty()
    readonly updatedAt?: Date;

}
