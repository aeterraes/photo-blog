import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateGalleryInput } from '../../gallery/dto/create-gallery.input';
import { CreateProductInput } from '../../product/dto/create-product.input';
@InputType()
export class CreateMerchInput {
  @Field()
  @IsString()
  merchType: string;

  @Field()
  @IsString()
  designType: string;

  @Field()
  @IsString()
  collection: string;

  @Field(() => [CreateProductInput])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductInput)
  products: CreateProductInput[];

  @Field(() => [CreateGalleryInput])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateGalleryInput)
  images: CreateGalleryInput[];
}
