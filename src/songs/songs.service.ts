import { DefaultValuePipe, Injectable, ParseIntPipe, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from 'src/entities/song.entity';
import { In, Repository, UpdateResult } from 'typeorm';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { Artist } from 'src/entities/artist.entity';

@Injectable()
export class SongsService {
    
    constructor(@InjectRepository(Song) private songRepository: Repository<Song>, 
    @InjectRepository(Artist) private artistRepository : Repository<Artist>,
) {
    }

    async create(songDTO: CreateSongDto): Promise<Song>{
        const song = new Song();
        song.title = songDTO.title;
        song.artists = songDTO.artists;
        song.duration = songDTO.duration;
        song.releasedDate = songDTO.releasedDate;
        song.lyrics = songDTO.lyrics;
        
        const artists = await this.artistRepository.findBy({id: In(songDTO.artists)});
        song.artists = artists;

        return await this.songRepository.save(song);
    }
     async paginate(options: IPaginationOptions) :Promise<Pagination<Song>> {
        const queryBuilder = this.songRepository.createQueryBuilder('c')
        queryBuilder.orderBy('c.releasedDate', 'DESC');
        return await paginate<Song>(this.songRepository, options);
    }

    findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    ): Promise<Pagination<Song>> {
        limit = limit >100 ? 100 : limit;
        return this.paginate({
            page,limit
        })
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
