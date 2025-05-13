import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductWithImage } from './dto/product-with-image.dto';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product], { name: 'products' })
  findAll() {
    return this.productService.findAll();
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productService.findOne(id);
  }

  @Query(() => [ProductWithImage], { name: 'productsWithImages' })
  findAllWithImages() {
    return this.productService.findAllWithImages();
  }

  @Query(() => [Product], { name: 'paginatedProducts' })
  findPaginated(
    @Args('page', { type: () => Int }) page: number,
    @Args('limit', { type: () => Int }) limit: number,
  ) {
    return this.productService.findPaginated(page, limit);
  }

  @Mutation(() => Product)
  createProduct(@Args('input') input: CreateProductInput) {
    return this.productService.create(input);
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateProductInput,
  ) {
    return this.productService.update(id, input);
  }

  @Mutation(() => Boolean)
  async removeProduct(@Args('id', { type: () => Int }) id: number) {
    await this.productService.remove(id);
    return true;
  }
}
