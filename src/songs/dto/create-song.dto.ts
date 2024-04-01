import { IsString, IsArray, IsNotEmpty, IsDateString, IsMilitaryTime } from 'class-validator';

export class CreateSongDto {
  @IsString()
  @IsNotEmpty()  
  readonly title: string;
  
  @IsString()
  @IsNotEmpty()  
  @IsArray()
  readonly artists: string[];

  @IsNotEmpty()
  @IsMilitaryTime()
  readonly duration: Date;

  @IsNotEmpty()
  @IsDateString()
  readonly releaseDate: Date;
}