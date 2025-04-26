import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { GalleryApiController } from './gallery-api.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  controllers: [GalleryController, GalleryApiController],
  providers: [GalleryService],
  exports: [GalleryService],
})
export class GalleryModule {}
