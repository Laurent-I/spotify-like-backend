import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';

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
    create(@Body() createSongDTO: CreateSongDto) {
        const results = this.songsService.create(createSongDTO)
        return results
    }
    
    @Get(':id')
    findOne(@Param('id', new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    }) ) id: number) {
        return `This action returns a song based on id ${typeof id} of song`
    }

    @Put(':id')
    update() :string {
        return 'This action updates a song'
    }

    @Delete(':id')
    remove() :string {
        return 'This action removes a song'
    }
}
