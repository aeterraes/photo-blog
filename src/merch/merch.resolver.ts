import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { MerchService } from './merch.service';
import { Merch } from './entities/merch.entity';
import { CreateMerchInput } from './dto/create-merch.input';
import { UpdateMerchInput } from './dto/update-merch.input';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Merch)
export class MerchResolver {
  constructor(private readonly merchService: MerchService) {}

  @Query(() => [Merch], { name: 'userMerchPackages' })
  findAllByUser(@Context() context) {
    return this.merchService.findAllByUser(context.req.user.id);
  }

  @Query(() => Merch, { name: 'merchPackage' })
  findOne(@Args('id', { type: () => Int }) id: number, @Context() context) {
    return this.merchService.findOne(id, context.req.user.id);
  }

  @Query(() => [Merch], { name: 'paginatedUserMerchPackages' })
  findPaginatedByUser(
    @Context() context,
    @Args('page', { type: () => Int }) page: number,
    @Args('limit', { type: () => Int }) limit: number,
  ) {
    return this.merchService.findPaginatedByUser(
      context.req.user.id,
      page,
      limit,
    );
  }

  @Mutation(() => Merch)
  createMerchPackage(
    @Args('input') input: CreateMerchInput,
    @Context() context,
  ) {
    return this.merchService.create(input, context.req.user.id);
  }

  @Mutation(() => Merch)
  updateMerchPackage(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateMerchInput,
    @Context() context,
  ) {
    return this.merchService.update(id, input, context.req.user.id);
  }

  @Mutation(() => Boolean)
  async removeMerchPackage(
    @Args('id', { type: () => Int }) id: number,
    @Context() context,
  ) {
    await this.merchService.remove(id, context.req.user.id);
    return true;
  }
}
