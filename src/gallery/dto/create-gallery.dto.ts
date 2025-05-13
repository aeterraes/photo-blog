import { IsUrl, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGalleryDto {
  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @IsOptional()
  url: string;
}
