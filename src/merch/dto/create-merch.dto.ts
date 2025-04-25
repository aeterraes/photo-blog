import { CreateProductDto } from '../../product/dto/create-product.dto';
import { CreateGalleryDto } from '../../gallery/dto/create-gallery.dto';

export class CreateMerchDto {
  merchType: string;

  designType: string;
  collection: string;

  products: CreateProductDto[];
  images: CreateGalleryDto[];
}
