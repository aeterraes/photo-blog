import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Redirect,
  Render,
  Request,
  Sse,
  MessageEvent,
} from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { Observable } from 'rxjs';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Sse('stream')
  stream(): Observable<MessageEvent> {
    return this.galleryService.getImageUpdates();
  }
  @Get()
  @Render('gallery-page')
  async getGallery(@Request() req) {
    const images = await this.galleryService.findAll();

    return {
      title: 'Gallery',
      isAuthenticated: !!req.user,
      images: images.map((img) => img.url),
      extraCss: ['/css/gallery-style.css'],
      extraJsHead: [
        'https://unpkg.com/swiper/swiper-bundle.min.js',
        '/js/gallery.js',
      ],
      extraJsBody: ['/js/menu-activity.js'],
    };
  }

  @Get('add')
  @Render('add-gallery-image')
  addForm(@Request() req) {
    return {
      title: 'Add Image',
    };
  }

  @Post()
  @Redirect('/gallery')
  async create(@Body() createGalleryDto: CreateGalleryDto) {
    await this.galleryService.create(createGalleryDto);
  }

  @Get(':id/edit')
  @Render('edit-gallery-image')
  async editForm(@Param('id') id: string, @Request() req) {
    const image = await this.galleryService.findOne(+id);
    return {
      title: 'Edit Image',
      isAuthenticated: true,
      image,
    };
  }

  @Patch(':id')
  @Redirect('/gallery')
  async update(
    @Param('id') id: string,
    @Body() updateGalleryDto: UpdateGalleryDto,
  ) {
    await this.galleryService.update(+id, updateGalleryDto);
  }

  @Delete(':id')
  @Redirect('/gallery')
  async remove(@Param('id') id: string) {
    await this.galleryService.remove(+id);
  }
}
