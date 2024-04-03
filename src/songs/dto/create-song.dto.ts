import { IsString, IsArray, IsNotEmpty, IsDateString, IsMilitaryTime, IsOptional } from 'class-validator';

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

  @IsString()
  @IsOptional()
  readonly lyrics: string;
}