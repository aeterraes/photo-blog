import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
export declare class GalleryService {
    create(createGalleryDto: CreateGalleryDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateGalleryDto: UpdateGalleryDto): string;
    remove(id: number): string;
}
