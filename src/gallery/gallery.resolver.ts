import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GalleryService } from './gallery.service';
import { Image } from './entities/image.entity';
import { CreateGalleryInput } from './dto/create-gallery.input';
import { UpdateGalleryInput } from './dto/update-gallery.input';

@Resolver(() => Image)
export class GalleryResolver {
  constructor(private readonly galleryService: GalleryService) {}

  @Query(() => [Image], { name: 'galleryImages' })
  findAll() {
    return this.galleryService.findAll();
  }

  @Query(() => Image, { name: 'galleryImage' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.galleryService.findOne(id);
  }

  @Query(() => [Image], { name: 'paginatedGalleryImages' })
  findPaginated(
    @Args('page', { type: () => Int }) page: number,
    @Args('limit', { type: () => Int }) limit: number,
  ) {
    return this.galleryService.findPaginated(page, limit);
  }

  @Mutation(() => Image)
  createGalleryImage(@Args('input') input: CreateGalleryInput) {
    return this.galleryService.create(input);
  }

  @Mutation(() => Image)
  updateGalleryImage(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateGalleryInput,
  ) {
    return this.galleryService.update(id, input);
  }

  @Mutation(() => Boolean)
  async removeGalleryImage(@Args('id', { type: () => Int }) id: number) {
    await this.galleryService.remove(id);
    return true;
  }
}
