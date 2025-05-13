import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ProductWithImage {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  image: string;
}
