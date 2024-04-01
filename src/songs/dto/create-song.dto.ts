import { IsString, IsArray, IsNotEmpty, IsDateString, IsMilitaryTime } from 'class-validator';

export class CreateSongDto {
  @IsString()
  @IsNotEmpty()  
  readonly title: string;
  
  @IsNotEmpty()  
  @IsArray()
  @IsString({each: true})
  readonly artists: string[];

  @IsNotEmpty()
  @IsMilitaryTime()
  readonly duration: Date;

  @IsNotEmpty()
  @IsDateString()
  readonly releasedDate: Date;
}