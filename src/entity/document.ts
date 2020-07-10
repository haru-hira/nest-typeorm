import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Document {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    fileName: string;

    @Column()
    @ApiProperty()
    originalObjectKey: string;

    @Column()
    @ApiProperty()
    originalObjectContentType: string;

    @CreateDateColumn()
    @ApiProperty()
    readonly createdAt?: Date;

    @UpdateDateColumn()
    @ApiProperty()
    readonly updatedAt?: Date;

}
