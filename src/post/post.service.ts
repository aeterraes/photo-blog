import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postRepository.create(createPostDto);
    return await this.postRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    const cacheKey = 'posts_all';
    const cached = await this.cacheManager.get<Post[]>(cacheKey);
    if (cached) return cached;
    const posts = await this.postRepository.find({
      select: ['id', 'title', 'description', 'imageUrl', 'dateCreated'],
    });
    await this.cacheManager.set(cacheKey, posts, 60_000);
    return posts;
  }

  async findOne(id: number): Promise<Post> {
    const cacheKey = `post_${id}`;
    const cached = await this.cacheManager.get<Post>(cacheKey);
    if (cached) return cached;

    const post = await this.postRepository.findOne({
      where: { id },
      select: ['id', 'title', 'description', 'imageUrl', 'dateCreated'],
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    await this.cacheManager.set(cacheKey, post, 60_000);
    return post;
  }

  async findRecentPosts(limit: number): Promise<Post[]> {
    const cacheKey = `posts_recent_${limit}`;
    const cached = await this.cacheManager.get<Post[]>(cacheKey);
    if (cached) return cached;

    const posts = await this.postRepository.find({
      order: { dateCreated: 'DESC' },
      take: limit,
      select: ['id', 'title', 'imageUrl', 'dateCreated'],
    });

    await this.cacheManager.set(cacheKey, posts, 60_000);
    return posts;
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    await this.postRepository.update(id, updatePostDto);
    await this.cacheManager.del(`post_${id}`);
    await this.cacheManager.del('posts_all');
    await this.cacheManager.del('posts_recent*');
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.postRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    await this.cacheManager.del(`post_${id}`);
    await this.cacheManager.del('posts_all');
    await this.cacheManager.del('posts_recent*');
  }

  async findPaginated(page: number, limit: number): Promise<[Post[], number]> {
    const cacheKey = `posts_page_${page}_${limit}`;
    const cached = await this.cacheManager.get<[Post[], number]>(cacheKey);
    if (cached) return cached;

    const result = await this.postRepository.findAndCount({
      order: { dateCreated: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
      select: ['id', 'title', 'imageUrl', 'dateCreated'],
    });

    await this.cacheManager.set(cacheKey, result, 60_000);
    return result;
  }
}
