import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMerchDto } from './dto/create-merch.dto';
import { UpdateMerchDto } from './dto/update-merch.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Merch } from './entities/merch.entity';
import { User } from '../user/entities/user.entity';
import { Product } from '../product/entities/product.entity';
import { Image } from '../gallery/entities/image.entity';
import { GalleryService } from '../gallery/gallery.service';

@Injectable()
export class MerchService {
  constructor(
    @InjectRepository(Merch)
    private merchRepository: Repository<Merch>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
    private readonly galleryService: GalleryService,
  ) {}

  async create(createMerchDto: CreateMerchDto, userId: number): Promise<Merch> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const merch = this.merchRepository.create({
      ...createMerchDto,
      user,
      userId,
    });

    const savedMerch = await this.merchRepository.save(merch);

    if (createMerchDto.products?.length) {
      const products = createMerchDto.products.map((productDto) =>
        this.productRepository.create({
          ...productDto,
          merchPackage: savedMerch,
          merchPackageId: savedMerch.id,
        }),
      );
      await this.productRepository.save(products);
    }

    if (createMerchDto.images?.length) {
      const images = createMerchDto.images.map((imageDto) =>
        this.imageRepository.create({
          ...imageDto,
          merchPackage: savedMerch,
          merchPackageId: savedMerch.id,
        }),
      );
      await this.imageRepository.save(images);
    }

    return this.merchRepository.findOne({
      where: { id: savedMerch.id },
      relations: ['products', 'images'],
    });
  }

  async findAllByUser(userId: number): Promise<Merch[]> {
    return this.merchRepository.find({
      where: { userId },
      relations: ['products', 'images'],
      order: { dateCreated: 'DESC' },
    });
  }

  async findOne(id: number, userId: number): Promise<any> {
    const merch = await this.merchRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['products', 'images', 'user'],
    });

    if (!merch) {
      throw new NotFoundException('Merch package not found');
    }

    const imagesWithData = await Promise.all(
      merch.images.map(async (image) => {
        try {
          return await this.galleryService.findOne(image.id);
        } catch (e) {
          return null;
        }
      }),
    );

    const validImages = imagesWithData.filter((img) => img !== null);

    return {
      ...merch,
      images: validImages,
    };
  }

  async update(
    id: number,
    updateMerchDto: UpdateMerchDto,
    userId: number,
  ): Promise<Merch> {
    const merch = await this.findOne(id, userId);

    Object.assign(merch, updateMerchDto);
    return this.merchRepository.save(merch);
  }

  async remove(id: number, userId: number): Promise<void> {
    const merch = await this.findOne(id, userId);
    await this.merchRepository.remove(merch);
  }

  async findPaginatedByUser(
    userId: number,
    page: number,
    limit: number,
  ): Promise<[Merch[], number]> {
    return this.merchRepository.findAndCount({
      where: { userId },
      relations: ['products', 'images'],
      order: { dateCreated: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
  }
}
