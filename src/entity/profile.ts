import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  gender: string;

  @Column()
  @ApiProperty()
  photo: string;

  @CreateDateColumn()
  @ApiProperty()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  @ApiProperty()
  readonly updatedAt?: Date;
}
