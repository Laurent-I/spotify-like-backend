import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from 'src/entities/song.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';

@Injectable()
export class SongsService {
    constructor(@InjectRepository(Song) private songRepository: Repository<Song>) {
    }

    async create(songDTO: CreateSongDto): Promise<Song>{
        const song = new Song();
        song.title = songDTO.title;
        song.artists = songDTO.artists;
        song.duration = songDTO.duration;
        song.releasedDate = songDTO.releasedDate;
        song.lyrics = songDTO.lyrics;
        return await this.songRepository.save(song);
    }

    findAll(): Promise<Song[]> {
        return this.songRepository.find();
    }

    findOne(id: number): Promise<Song> {
        return this.songRepository.findOneBy({id});
    }

    async remove(id: number): Promise<void> {
        await this.songRepository.delete(id);
    }

    async update(id: number, recordToUpdate: UpdateSongDto): Promise<UpdateResult>{
        return await this.songRepository.update(id, recordToUpdate);
    }

}
