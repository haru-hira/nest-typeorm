import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TestObjects {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  attr1: string;
}