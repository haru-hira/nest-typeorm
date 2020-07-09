import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Photo {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    url: string;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @ManyToOne(type => User, user => user.photos)
    @ApiProperty()
    user: User;

    @CreateDateColumn()
    @ApiProperty()
    readonly createdAt?: Date;

    @UpdateDateColumn()
    @ApiProperty()
    readonly updatedAt?: Date;

}
