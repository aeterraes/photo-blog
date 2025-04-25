import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  Request,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get('goods')
  @Render('goods-page')
  async getGoods(@Request() req) {
    const goods = await this.productService.findAllWithImages();
    return {
      title: 'goods',
      isAuthenticated: !!req.user,
      goods,
      extraCss: ['/css/goods-style.css'],
      extraJsBody: ['/js/menu-activity.js'],
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }

  @Get('add/form')
  @UseGuards(JwtAuthGuard)
  @Render('add-product')
  addForm(@Req() req) {
    return {
      title: 'Add Product',
      isAuthenticated: true,
    };
  }
}
