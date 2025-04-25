import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
export declare class GalleryController {
    private readonly galleryService;
    constructor(galleryService: GalleryService);
    create(createGalleryDto: CreateGalleryDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateGalleryDto: UpdateGalleryDto): string;
    remove(id: string): string;
}
