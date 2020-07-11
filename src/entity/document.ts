import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Document {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column({ nullable: true })
    @ApiProperty()
    fileName?: string;

    @Column()
    @ApiProperty()
    originalObjectKey: string;

    @Column({ nullable: true })
    @ApiProperty()
    originalObjectContentType?: string;

    @Column()
    @ApiProperty()
    status: DocumentStatus;

    @CreateDateColumn()
    @ApiProperty()
    readonly createdAt?: Date;

    @UpdateDateColumn()
    @ApiProperty()
    readonly updatedAt?: Date;

}

export enum DocumentStatus {
    PERMANENT,
    TEMPORARY
}
