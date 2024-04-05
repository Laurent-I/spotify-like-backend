import { Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Song } from "./song.entity";

@Entity("artists")
export class Artist{
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(()=> User)
    @JoinColumn()
    user: User;

    @ManyToMany(()=> Song, (song) => song.artists)
    songs: Song[];
}