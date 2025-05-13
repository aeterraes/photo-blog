import { Module } from '@nestjs/common';
import { MerchService } from './merch.service';
import { MerchController } from './merch.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Merch } from './entities/merch.entity';
import { Product } from '../product/entities/product.entity';
import { Image } from '../gallery/entities/image.entity';
import { User } from '../user/entities/user.entity';
import { GalleryModule } from '../gallery/gallery.module';
import { MerchApiController } from './merch-api.controller';
import { MerchResolver } from './merch.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Merch, Product, Image, User]),
    GalleryModule,
  ],
  controllers: [MerchController, MerchApiController],
  providers: [MerchService, MerchResolver],
  exports: [MerchService],
})
export class MerchModule {}
