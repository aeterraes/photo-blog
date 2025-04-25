import { Injectable, NotFoundException, MessageEvent } from '@nestjs/common';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}
  private imageUpdates = new Subject<MessageEvent>();

  getImageUpdates(): Observable<MessageEvent> {
    return this.imageUpdates.asObservable();
  }

  async create(createGalleryDto: CreateGalleryDto): Promise<Image> {
    const image = this.imageRepository.create(createGalleryDto);
    const savedImage = await this.imageRepository.save(image);
    this.imageUpdates.next({ data: { action: 'create', image: savedImage } });
    return savedImage;
  }

  async findAll(): Promise<Image[]> {
    return await this.imageRepository.find({
      where: { merchPackage: null },
      select: ['id', 'url'],
    });
  }

  async findOne(id: number): Promise<Image> {
    const image = await this.imageRepository.findOne({
      where: { id },
      select: ['id', 'url'],
    });

    if (!image) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }

    return image;
  }

  async update(id: number, updateGalleryDto: UpdateGalleryDto): Promise<Image> {
    await this.imageRepository.update(id, updateGalleryDto);
    const updatedImage = await this.findOne(id);
    this.imageUpdates.next({
      data: {
        action: 'update',
        image: { id: updatedImage.id, url: updatedImage.url },
      },
    });
    return updatedImage;
  }

  async remove(id: number): Promise<void> {
    const image = await this.findOne(id);
    await this.imageRepository.delete(id);
    this.imageUpdates.next({
      data: { action: 'delete', image: { id: image.id } },
    });
  }
}
