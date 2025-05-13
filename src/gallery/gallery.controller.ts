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
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { Observable } from 'rxjs';
import { FileManagerService } from '../file/file-manager.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('gallery')
export class GalleryController {
  constructor(
    private readonly galleryService: GalleryService,
    private readonly fileUploader: FileManagerService,
  ) {}

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
  @UseInterceptors(
    FileInterceptor('image', {
      limits: { fileSize: 30 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/png'];

        if (allowedMimes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new BadRequestException('Only image files are allowed'), false);
        }
      },
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createGalleryDto: CreateGalleryDto,
    @Res() res: Response,
  ) {
    if (!file && !createGalleryDto.url) {
      throw new BadRequestException('URL or file must be provided');
    }

    if (file) {
      const url = await this.fileUploader.uploadFile(
        file.buffer,
        file.originalname,
        file.mimetype,
      );
      createGalleryDto.url = url;
    }

    await this.galleryService.create(createGalleryDto);

    if (res) {
      return res.redirect('/gallery');
    }

    return { status: 'success' };
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
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateGalleryDto: UpdateGalleryDto,
  ) {
    if (file) {
      const url = await this.fileUploader.uploadFile(
        file.buffer,
        file.originalname,
        file.mimetype,
      );
      updateGalleryDto.url = url;
    }

    await this.galleryService.update(+id, updateGalleryDto);
  }

  @Delete(':id')
  @Post(':id/delete')
  @Redirect('/gallery')
  async remove(@Param('id') id: string) {
    await this.galleryService.remove(+id);
  }
}
