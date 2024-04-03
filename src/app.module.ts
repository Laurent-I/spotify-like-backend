import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerModule } from './common/middleware/logger/logger.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Song } from './entities/song.entity';

@Module({
  imports: [SongsModule, LoggerModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port:5432,
    username: 'postgres',
    password: 'sh@d0w123',
    database: 'test',
    entities:[Song],
    synchronize: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor( private dataSource: DataSource) {
    console.log(dataSource.driver.database)
  }

  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('songs');
    // consumer.apply(LoggerMiddleware).forRoutes({path: 'songs', method: RequestMethod.POST})
    consumer.apply(LoggerMiddleware).forRoutes(SongsController);
  }
}
