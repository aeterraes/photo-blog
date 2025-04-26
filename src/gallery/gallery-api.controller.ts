import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  Sse,
  DefaultValuePipe,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiQuery, ApiBody } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { MessageEvent } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';

@ApiTags('Gallery API')
@Controller('api/gallery')
export class GalleryApiController {
  constructor(private readonly galleryService: GalleryService) {}

  @Sse('stream')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'SSE stream for real-time image updates',
  })
  stream(): Observable<MessageEvent> {
    return this.galleryService.getImageUpdates();
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Paginated list of images with metadata',
  })
  async getGallery(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    const [images, total] = await this.galleryService.findPaginated(
      page,
      limit,
    );
    const totalPages = Math.ceil(total / limit);

    return {
      data: images,
      meta: {
        total,
        page,
        limit,
        totalPages,
        links: {
          first: `/api/gallery?page=1&limit=${limit}`,
          last: `/api/gallery?page=${totalPages}&limit=${limit}`,
          next:
            page < totalPages
              ? `/api/gallery?page=${page + 1}&limit=${limit}`
              : null,
          prev:
            page > 1 ? `/api/gallery?page=${page - 1}&limit=${limit}` : null,
        },
      },
    };
  }

  @Post()
  @ApiBody({ type: CreateGalleryDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Image created successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  async create(@Body() createGalleryDto: CreateGalleryDto) {
    const image = await this.galleryService.create(createGalleryDto);
    return {
      statusCode: HttpStatus.CREATED,
      data: { id: image.id, url: image.url },
    };
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Image details',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Image not found',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const image = await this.galleryService.findOne(id);
    return { data: image };
  }

  @Patch(':id')
  @ApiBody({ type: UpdateGalleryDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Image updated successfully',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGalleryDto: UpdateGalleryDto,
  ) {
    await this.galleryService.update(id, updateGalleryDto);
    return { statusCode: HttpStatus.OK, message: 'Image updated' };
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Image deleted successfully',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.galleryService.remove(id);
    return { statusCode: HttpStatus.NO_CONTENT };
  }
}
