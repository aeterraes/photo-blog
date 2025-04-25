import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  UseGuards,
  Request,
  Redirect,
} from '@nestjs/common';
import { MerchService } from './merch.service';
import { CreateMerchDto } from './dto/create-merch.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateMerchDto } from './dto/update-merch.dto';

@Controller('merch')
export class MerchController {
  constructor(private readonly merchService: MerchService) {}

  private checkAuth(req) {
    return !req.user;
  }

  @Get('create')
  @Render('merch-form')
  showCreateForm(@Request() req) {
    if (this.checkAuth(req)) {
      return { redirect: '/auth/login' };
    }

    return {
      title: 'Create Merch Package',
      isAuthenticated: true,
      user: req.user,
      merchTypes: ['Postcard', 'Poster', 'Pin', 'Shopper'],
      designTypes: ['Custom', 'Classic'],
      collections: ['New Autumn', 'Classic', 'Forest Vibes'],
      extraCss: ['/css/merch-form-style.css'],
      extraJsBody: ['/js/new-table.js'],
    };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Redirect('/merch/created')
  async create(@Body() body: any, @Request() req) {
    const createMerchDto: CreateMerchDto = {
      merchType: body.merchTypes?.join(', ') || '',
      designType: body.designTypes?.join(', ') || '',
      collection: body.collections?.join(', ') || '',
      products: [],
      images: [],
    };

    await this.merchService.create(createMerchDto, req.user.id);
  }

  @Get('created')
  @Render('merch-created')
  createdSuccess(@Request() req) {
    if (this.checkAuth(req)) {
      return { redirect: '/auth/login' };
    }

    return {
      title: 'Merch Package Created',
      isAuthenticated: true,
      user: req.user,
    };
  }

  @Get()
  @Render('merch-list')
  async findAll(@Request() req) {
    if (this.checkAuth(req)) {
      return { redirect: '/auth/login' };
    }

    const packages = await this.merchService.findAllByUser(req.user.id);
    return {
      title: 'My Merch Packages',
      isAuthenticated: true,
      user: req.user,
      packages,
    };
  }

  @Get(':id')
  @Render('merch-details')
  async findOne(@Param('id') id: string, @Request() req) {
    if (this.checkAuth(req)) {
      return { redirect: '/auth/login' };
    }

    const merchPackage = await this.merchService.findOne(+id, req.user.id);
    return {
      title: 'Merch Package Details',
      isAuthenticated: true,
      user: req.user,
      package: merchPackage,
      extraCss: ['/css/merch-details-style.css'],
    };
  }

  @Get(':id/edit')
  @Render('merch-edit')
  async editForm(@Param('id') id: string, @Request() req) {
    if (this.checkAuth(req)) {
      return { redirect: '/auth/login' };
    }

    const merchPackage = await this.merchService.findOne(+id, req.user.id);
    return {
      title: 'Edit Merch Package',
      isAuthenticated: true,
      user: req.user,
      package: merchPackage,
      merchTypes: ['Postcard', 'Poster', 'Pin', 'Shopper'],
      designTypes: ['Custom', 'Classic'],
      collections: ['New Autumn', 'Classic', 'Forest Vibes'],
      extraCss: ['/css/merch-form-style.css'],
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Redirect('/merch/:id')
  async update(
    @Param('id') id: string,
    @Body() updateMerchDto: UpdateMerchDto,
    @Request() req,
  ) {
    await this.merchService.update(+id, updateMerchDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Redirect('/merch')
  async remove(@Param('id') id: string, @Request() req) {
    await this.merchService.remove(+id, req.user.id);
  }
}
