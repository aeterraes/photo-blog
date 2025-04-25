import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { GalleryService } from '../gallery/gallery.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private readonly galleryService: GalleryService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      select: ['id', 'name', 'description', 'price'],
    });

    if (!product) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return product;
  }

  async findAllWithImages() {
    const products = await this.productRepository.find();

    const goods = await Promise.all(
      products.map(async (product) => {
        try {
          const image = await this.galleryService.findOne(product.id);
          return {
            name: product.name,
            description: product.description,
            image: image.url,
          };
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          console.warn(`Image not found for product ${product.id}`);
          return {
            name: product.name,
            description: product.description,
            image: '/images/default.jpg',
          };
        }
      }),
    );

    return goods;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    await this.productRepository.update(id, updateProductDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
