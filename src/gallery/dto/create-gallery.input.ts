import { InputType, Field } from '@nestjs/graphql';
import { IsUrl, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateGalleryInput {
  @Field()
  @IsUrl()
  @IsNotEmpty()
  url: string;
}
