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
  Redirect,
  Response,
  UnauthorizedException,
} from '@nestjs/common';
import { MerchService } from './merch.service';
import { CreateMerchDto } from './dto/create-merch.dto';
import { UpdateMerchDto } from './dto/update-merch.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('merch')
export class MerchController {
  constructor(private readonly merchService: MerchService) {}
  /*
  private checkAuth(@Request() req) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
  }


   */

  @Get('create')
  @Render('merch-form')
  showCreateForm(@Request() req, @Response() res) {
    return {
      title: 'Create Merch Package',
      user: req.user,
      merchTypes: ['Postcard', 'Poster', 'Pin', 'Shopper'],
      designTypes: ['Custom', 'Classic'],
      collections: ['New Autumn', 'Classic', 'Forest Vibes'],
      extraCss: ['/css/merch-form-style.css'],
      extraJsBody: ['/js/new-table.js'],
    };
  }

  @Post()
  @Redirect('/merch/created')
  async create(@Body() body: any, @Request() req, @Response() res) {
    const createMerchDto: CreateMerchDto = {
      merchType: body.merchTypes?.join(', ') || '',
      designType: body.designTypes?.join(', ') || '',
      collection: body.collections?.join(', ') || '',
      products: [],
      images: [],
    };

    await this.merchService.create(createMerchDto, req.user.id);
    return res.redirect('/merch/created');
  }

  @Get('created')
  @Render('merch-created')
  createdSuccess(@Request() req, @Response() res) {
    return {
      title: 'Merch Package Created',
      user: req.user,
    };
  }

  @Get()
  @Render('merch-list')
  async findAll(@Request() req, @Response() res) {
    const packages = await this.merchService.findAllByUser(req.user.id);
    return {
      title: 'My Merch Packages',

      user: req.user,
      packages,
    };
  }

  @Get(':id')
  @Render('merch-details')
  async findOne(@Param('id') id: string, @Request() req, @Response() res) {
    const merchPackage = await this.merchService.findOne(+id, req.user.id);
    return {
      title: 'Merch Package Details',

      user: req.user,
      package: merchPackage,
      extraCss: ['/css/merch-details-style.css'],
    };
  }

  @Get(':id/edit')
  @Render('merch-edit')
  async editForm(@Param('id') id: string, @Request() req, @Response() res) {
    const merchPackage = await this.merchService.findOne(+id, req.user.id);
    return {
      title: 'Edit Merch Package',

      user: req.user,
      package: merchPackage,
      merchTypes: ['Postcard', 'Poster', 'Pin', 'Shopper'],
      designTypes: ['Custom', 'Classic'],
      collections: ['New Autumn', 'Classic', 'Forest Vibes'],
      extraCss: ['/css/merch-form-style.css'],
    };
  }

  @Patch(':id')
  @Redirect('/merch/:id')
  async update(
    @Param('id') id: string,
    @Body() updateMerchDto: UpdateMerchDto,
    @Request() req,
  ) {
    await this.merchService.update(+id, updateMerchDto, req.user.id);
  }

  @Delete(':id')
  @Redirect('/merch')
  async remove(@Param('id') id: string, @Request() req) {
    await this.merchService.remove(+id, req.user.id);
  }
}
