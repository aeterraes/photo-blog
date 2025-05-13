import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostApiController } from './post-api.controller';
import { PostResolver } from './post.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostController, PostApiController],
  providers: [PostService, PostResolver],
  exports: [PostService],
})
export class PostModule {}
