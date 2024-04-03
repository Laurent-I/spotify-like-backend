import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { Song } from 'src/entities/song.entity';
import { UpdateResult } from 'typeorm';
import { UpdateSongDto } from './dto/update-song.dto';

@Controller('songs')
export class SongsController {

    constructor(private songsService: SongsService) {}

    @Get()
    findAll() {
        try {
            return this.songsService.findAll() 
        } catch (error) {
            throw new HttpException('server error', HttpStatus.INTERNAL_SERVER_ERROR, {cause: error.message})
        }
    }

    @Post()
    create(@Body() createSongDTO: CreateSongDto):Promise<Song> {
        return this.songsService.create(createSongDTO)
    }
    
    @Get(':id')
    findOne(@Param('id', new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    }) ) id: number) {
        return this.songsService.findOne(id)
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id:number, @Body() updateSongDto: UpdateSongDto) :Promise<UpdateResult> {
    return this.songsService.update(id, updateSongDto);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe)id: number) :Promise<void> {
        return this.songsService.remove(id)
    }
}
