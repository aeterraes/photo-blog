import { Field, InputType, Int } from '@nestjs/graphql';
import { CreateMerchInput } from './create-merch.input';

@InputType()
export class UpdateMerchInput extends CreateMerchInput {
  @Field(() => Int, { nullable: true })
  id?: number;
}
