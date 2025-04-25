import { Controller, Get, Post, Render, Res, UseGuards } from '@nestjs/common';
import { Request } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { PostService } from './post/post.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private postService: PostService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req, @Res() res) {
    const { access_token } = await this.authService.login(req.user);
    console.log(req.user);
    console.log(access_token);
    res.cookie('access_token', access_token, {
      httpOnly: true,
      maxAge: 3600000,
    });
    return res.redirect('/profile');
  }

  @Get('auth/login')
  @Render('login')
  getLogin(@Res() res) {
    return {
      title: 'Login',
      description: 'Login',
      extraJsBody: ['/js/menu-activity.js'],
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @Render('profile')
  getProfile(@Request() req) {
    return {
      title: 'Profile',
      description: 'User profile page',
      keywords: 'user, profile',
      isAuthenticated: !!req.user,
      user: req.user,
      extraJsBody: ['/js/menu-activity.js'],
    };
  }

  @Post('auth/logout')
  logout(@Res() res) {
    res.clearCookie('access_token');
    return res.redirect('/home');
  }

  @Get('home')
  @Render('index')
  async getIndex(@Request() req) {
    const recentPosts = await this.postService.findRecentPosts(4);
    return {
      title: 'home',
      description: 'Photo blog',
      keywords: 'photo, aesthetic',
      isAuthenticated: !!req.user,
      posts: recentPosts.map((post) => ({
        id: post.id,
        title: post.title,
        description: post.description,
        image: post.imageUrl,
      })),
      extraJsBody: ['/js/menu-activity.js'],
    };
  }

  @Get('table')
  @Render('table-form')
  getTableForm(@Request() req) {
    return {
      title: 'table-form',
      isAuthenticated: !!req.user,
      extraCss: ['/css/table-style.css'],
      extraJsBody: ['/js/menu-activity.js', '/js/table.js'],
    };
  }
}
