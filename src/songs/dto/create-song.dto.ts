import { IsString, IsArray, IsNotEmpty, IsDateString, IsMilitaryTime, IsOptional, IsNumber } from 'class-validator';

export class CreateSongDto {
  @IsString()
  @IsNotEmpty()  
  readonly title: string;
  
  @IsNotEmpty()  
  @IsArray()
  @IsNumber({}, {each: true})
  readonly artists

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