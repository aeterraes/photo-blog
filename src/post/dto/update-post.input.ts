import { Field, InputType, Int } from '@nestjs/graphql';
import { CreatePostInput } from './create-post.input';

@InputType()
export class UpdatePostInput extends CreatePostInput {
  @Field(() => Int, { nullable: true })
  id?: number;
}
