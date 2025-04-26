import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  getSchemaPath,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MerchService } from './merch.service';
import { CreateMerchDto } from './dto/create-merch.dto';
import { UpdateMerchDto } from './dto/update-merch.dto';
import { MerchResponseDto } from './dto/merch-response.dto';

@ApiTags('Merch API')
@ApiBearerAuth()
@Controller('api/merch')
export class MerchApiController {
  constructor(private readonly merchService: MerchService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create new merch package' })
  @ApiBody({ type: CreateMerchDto })
  @ApiResponse({
    status: 201,
    description: 'Merch created',
    schema: {
      example: {
        statusCode: 201,
        data: {
          id: 1,
          merchType: 'Poster',
          designType: 'Custom',
          collection: 'Summer 2023',
          dateCreated: '2023-07-15T10:00:00.000Z',
          products: [
            {
              id: 1,
              name: 'Large Poster',
              description: 'High quality print',
              price: 29.99,
            },
          ],
          images: [{ id: 1, url: 'https://example.com/poster.jpg' }],
        },
      },
    },
  })
  async create(@Body() createMerchDto: CreateMerchDto, @Req() req) {
    const merch = await this.merchService.create(createMerchDto, req.user.id);
    return {
      statusCode: 201,
      data: this.mapMerchToResponse(merch),
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all merch packages for current user' })
  @ApiResponse({
    status: 200,
    description: 'List of merch packages',
    schema: {
      example: {
        statusCode: 200,
        data: [
          {
            id: 1,
            merchType: 'Poster',
            designType: 'Custom',
            collection: 'Summer 2023',
            dateCreated: '2023-07-15T10:00:00.000Z',
            products: [],
            images: [],
          },
        ],
      },
    },
  })
  async findAll(@Req() req) {
    const packages = await this.merchService.findAllByUser(req.user.id);
    return {
      statusCode: 200,
      data: packages.map(this.mapMerchToResponse),
    };
  }

  @Get('paginated')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get paginated merch packages' })
  @ApiResponse({
    status: 200,
    description: 'Paginated list',
    schema: {
      properties: {
        items: {
          type: 'array',
          items: { $ref: getSchemaPath(MerchResponseDto) },
        },
        meta: {
          properties: {
            total: { type: 'number' },
            page: { type: 'number' },
            limit: { type: 'number' },
            totalPages: { type: 'number' },
          },
        },
      },
    },
  })
  async findPaginated(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Req() req,
  ) {
    const [packages, total] = await this.merchService.findPaginatedByUser(
      req.user.id,
      page,
      limit,
    );

    return {
      statusCode: 200,
      data: {
        items: packages.map(this.mapMerchToResponse),
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get merch package details' })
  @ApiResponse({
    status: 200,
    description: 'Merch details',
    schema: {
      example: {
        statusCode: 200,
        data: {
          id: 1,
          merchType: 'Poster',
          designType: 'Custom',
          collection: 'Summer 2023',
          dateCreated: '2023-07-15T10:00:00.000Z',
          products: [
            {
              id: 1,
              name: 'Large Poster',
              description: 'High quality print',
              price: 29.99,
            },
          ],
          images: [{ id: 1, url: 'https://example.com/poster.jpg' }],
        },
      },
    },
  })
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() req) {
    const merchPackage = await this.merchService.findOne(id, req.user.id);
    return {
      statusCode: 200,
      data: this.mapMerchToResponse(merchPackage),
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update merch package' })
  @ApiBody({ type: UpdateMerchDto })
  @ApiResponse({
    status: 200,
    description: 'Updated successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Merch package updated',
      },
    },
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMerchDto: UpdateMerchDto,
    @Req() req,
  ) {
    await this.merchService.update(id, updateMerchDto, req.user.id);
    return {
      statusCode: 200,
      message: 'Merch package updated',
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete merch package' })
  @ApiResponse({
    status: 204,
    description: 'Deleted successfully',
    schema: {
      example: {
        statusCode: 204,
        message: 'Merch package deleted',
      },
    },
  })
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req) {
    await this.merchService.remove(id, req.user.id);
    return {
      statusCode: 204,
      message: 'Merch package deleted',
    };
  }

  private mapMerchToResponse(merch: any) {
    return {
      id: merch.id,
      merchType: merch.merchType,
      designType: merch.designType,
      collection: merch.collection,
      dateCreated: merch.dateCreated,
      products: merch.products?.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
      })),
      images: merch.images?.map((img) => ({
        id: img.id,
        url: img.url,
      })),
    };
  }
}
