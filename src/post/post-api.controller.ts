import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PostService } from './post.service';
import { Post as PostEntity } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostResponseDto } from './dto/post-response.dto';

@ApiTags('Posts API')
@ApiBearerAuth()
@Controller('api/posts')
export class PostApiController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create new post' })
  @ApiResponse({
    status: 201,
    description: 'Post created',
    type: PostResponseDto,
  })
  async create(@Body() createPostDto: CreatePostDto) {
    const post = await this.postService.create(createPostDto);
    return {
      statusCode: 201,
      data: this.mapToPostResponse(post),
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({
    status: 200,
    description: 'List of posts',
    type: [PostResponseDto],
  })
  async findAll() {
    const posts = await this.postService.findAll();
    return {
      statusCode: 200,
      data: posts.map(this.mapToPostResponse),
    };
  }

  @Get('paginated')
  @ApiOperation({ summary: 'Get paginated posts' })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of posts',
    schema: {
      properties: {
        items: {
          type: 'array',
          items: { $ref: '#/components/schemas/PostResponseDto' },
        },
        meta: {
          properties: {
            total: { type: 'number', example: 100 },
            page: { type: 'number', example: 1 },
            limit: { type: 'number', example: 10 },
            totalPages: { type: 'number', example: 10 },
          },
        },
      },
    },
  })
  async findPaginated(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    const [posts, total] = await this.postService.findPaginated(page, limit);
    return {
      items: posts.map(this.mapToPostResponse),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  @Get('recent')
  @ApiOperation({ summary: 'Get recent posts' })
  @ApiResponse({
    status: 200,
    description: 'List of recent posts',
    type: [PostResponseDto],
  })
  async findRecent(
    @Query('limit', new DefaultValuePipe(3), ParseIntPipe) limit: number = 3,
  ) {
    const posts = await this.postService.findRecentPosts(limit);
    return {
      statusCode: 200,
      data: posts.map(this.mapToPostResponse),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get post details' })
  @ApiResponse({
    status: 200,
    description: 'Post details',
    type: PostResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Post not found' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const post = await this.postService.findOne(id);
    return {
      statusCode: 200,
      data: this.mapToPostResponse(post),
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update post' })
  @ApiResponse({
    status: 200,
    description: 'Post updated',
    type: PostResponseDto,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    const post = await this.postService.update(id, updatePostDto);
    return {
      statusCode: 200,
      data: this.mapToPostResponse(post),
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete post' })
  @ApiResponse({ status: 204, description: 'Post deleted' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.postService.remove(id);
    return {
      statusCode: 204,
      message: 'Post deleted successfully',
    };
  }

  private mapToPostResponse(post: PostEntity): PostResponseDto {
    return {
      id: post.id,
      title: post.title,
      description: post.description,
      imageUrl: post.imageUrl,
      dateCreated: post.dateCreated.toISOString(),
    };
  }
}
