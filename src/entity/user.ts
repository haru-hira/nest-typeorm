import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Profile } from "./profile";

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

}
