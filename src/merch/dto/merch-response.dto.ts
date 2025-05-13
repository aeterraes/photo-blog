import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { CreateProductDto } from '../../product/dto/create-product.dto';
import { Type } from 'class-transformer';
import { CreateGalleryDto } from '../../gallery/dto/create-gallery.dto';

export class MerchResponseDto {
  @ApiProperty({ example: 'Poster' })
  @IsString()
  merchType: string;

  @ApiProperty({ example: 'Custom' })
  @IsString()
  designType: string;

  @ApiProperty({ example: 'Summer 2023' })
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
