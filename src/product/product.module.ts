import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { GalleryModule } from '../gallery/gallery.module';
import { ProductApiController } from './product-api.controller';
import { ProductResolver } from './product.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), GalleryModule],
  controllers: [ProductController, ProductApiController],
  providers: [ProductService, ProductResolver],
  exports: [ProductService],
})
export class ProductModule {}
