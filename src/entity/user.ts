import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Profile } from './profile';
import { Photo } from './photo';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToOne(type => Profile)
  @JoinColumn()
  @ApiProperty()
  profile: Profile;

  @OneToMany(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type => Photo,
    photo => photo.user,
  )
  @ApiProperty()
  photos: Photo[];

  @CreateDateColumn()
  @ApiProperty()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  @ApiProperty()
  readonly updatedAt?: Date;
}
