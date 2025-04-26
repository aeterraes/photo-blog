import { IsUrl, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGalleryDto {
  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @IsUrl()
  @IsNotEmpty()
  url: string;
}