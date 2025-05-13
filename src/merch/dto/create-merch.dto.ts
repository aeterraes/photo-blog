import { CreateProductDto } from '../../product/dto/create-product.dto';
import { CreateGalleryDto } from '../../gallery/dto/create-gallery.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMerchDto {
  @ApiProperty({ example: 'Poster' })
  @IsString()
  merchType: string;

  @ApiProperty({ example: 'Custom' })
  @IsString()
  designType: string;

  @ApiProperty({ example: 'New Collection' })
  @IsString()
  collection: string;

  @ApiProperty({ type: [CreateProductDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductDto)
  products: CreateProductDto[];

  @ApiProperty({ type: [CreateGalleryDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateGalleryDto)
  images: CreateGalleryDto[];
}
