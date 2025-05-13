import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post], { name: 'posts' })
  findAll() {
    return this.postService.findAll();
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.postService.findOne(id);
  }

  @Query(() => [Post], { name: 'recentPosts' })
  findRecentPosts(@Args('limit', { type: () => Int }) limit: number) {
    return this.postService.findRecentPosts(limit);
  }

  @Query(() => [Post], { name: 'paginatedPosts' })
  findPaginated(
    @Args('page', { type: () => Int }) page: number,
    @Args('limit', { type: () => Int }) limit: number,
  ) {
    return this.postService.findPaginated(page, limit);
  }

  @Mutation(() => Post)
  createPost(@Args('input') input: CreatePostInput) {
    return this.postService.create(input);
  }

  @Mutation(() => Post)
  updatePost(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdatePostInput,
  ) {
    return this.postService.update(id, input);
  }

  @Mutation(() => Boolean)
  async removePost(@Args('id', { type: () => Int }) id: number) {
    await this.postService.remove(id);
    return true;
  }
}
