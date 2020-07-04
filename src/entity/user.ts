import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Profile } from "./profile";
import { Photo } from "./photo";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @OneToOne(type => Profile)
    @JoinColumn()
    profile: Profile;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @OneToMany(type => Photo, photo => photo.user)
    photos: Photo[];

    @CreateDateColumn()
    readonly createdAt?: Date;

    @UpdateDateColumn()
    readonly updatedAt?: Date;

}
