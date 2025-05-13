import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Field()
  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;
}
