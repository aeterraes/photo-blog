import { Field, InputType, Int } from '@nestjs/graphql';
import { CreateProductInput } from './create-product.input';

@InputType()
export class UpdateProductInput extends CreateProductInput {
  @Field(() => Int, { nullable: true })
  id?: number;
}
