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
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('blog')
  @Render('blog-page')
  async getBlog(@Request() req) {
    const posts = await this.postService.findAll();
    return {
      title: 'blog',
      posts: posts.map((post) => ({
        id: post.id,
        title: post.title,
        date: post.dateCreated.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
        image: post.imageUrl,
        description: post.description,
      })),
      extraCss: ['/css/posts-style.css'],
      extraJsBody: ['/js/menu-activity.js'],
    };
  }

  @Get(':id')
  @Render('post-detail')
  async getPostDetail(@Param('id') id: string, @Request() req) {
    const post = await this.postService.findOne(+id);
    return {
      title: post.title,
      post: {
        ...post,
        date: post.dateCreated.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
      },
      extraCss: ['/css/posts-style.css'],
      extraJsBody: ['/js/menu-activity.js'],
    };
  }

  @Get('add')
  @Render('add-post')
  addForm(@Request() req) {
    return {
      title: 'Add Post',
    };
  }

  @Post()
  @Redirect('/post/blog')
  async create(@Body() createPostDto: CreatePostDto) {
    await this.postService.create(createPostDto);
  }

  @Get(':id/edit')
  @Render('edit-post')
  async editForm(@Param('id') id: string, @Request() req) {
    const post = await this.postService.findOne(+id);
    return {
      title: 'Edit Post',
      post,
    };
  }

  @Patch(':id')
  @Redirect('/post/blog')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    await this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @Redirect('/post/blog')
  async remove(@Param('id') id: string) {
    await this.postService.remove(+id);
  }
}
