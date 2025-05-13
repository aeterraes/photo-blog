import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { GalleryApiController } from './gallery-api.controller';
import { GalleryResolver } from './gallery.resolver';
import { FileManagerService } from '../file/file-manager.service';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  controllers: [GalleryController, GalleryApiController],
  providers: [GalleryService, GalleryResolver, FileManagerService],
  exports: [GalleryService],
})
export class GalleryModule {}
