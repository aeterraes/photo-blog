import { Controller, Get, Post, Render, Res, UseGuards } from '@nestjs/common';
import { Request } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

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
  getIndex(@Request() req) {
    return {
      title: 'home',
      description: 'Photo blog',
      keywords: 'photo, aesthetic',
      isAuthenticated: !!req.user,
      posts: [
        {
          title: 'Light phenomena',
          description:
            'A collection of photos of halos and unusual distortions',
          image: '/images/first.jpeg',
        },
        {
          title: 'Exploring the story of the creation',
          description:
            'An immense ocean, a mysterious atmosphere and a cyber sermon',
          image: '/images/second.jpg',
        },
        {
          title: "Autumn's colours",
          description: 'Autumn exudes golden light',
          image: '/images/third.jpeg',
        },
        {
          title: 'Strangeways, here we come',
          description: 'A strange cast of modern art: what is hidden in it',
          image: '/images/fourth.jpg',
        },
      ],
      extraJsBody: ['/js/menu-activity.js'],
    };
  }

  @Get('blog')
  @Render('blog-page')
  getBlog(@Request() req) {
    return {
      title: 'blog',
      isAuthenticated: !!req.user,
      posts: [
        {
          title: 'The colors of autumn are getting brighter',
          date: 'October 8, 2024',
          image: '/images/gallery/autumn3.jpg',
          description:
            'How the special atmosphere of the former royal residence changes in autumn: part two',
        },
        {
          title: 'The colors of autumn are getting brighter',
          date: 'October 7, 2024',
          image: '/images/gallery/autumn5.jpg',
          description:
            'How the special atmosphere of the former royal residence changes in autumn: part one',
        },
        {
          title: 'Light phenomena',
          date: 'October 6, 2024',
          image: '/images/first.jpeg',
          description:
            'A collection of photos of halos and unusual distortions',
        },
        {
          title: 'Exploring the story of the creation',
          date: 'October 4, 2024',
          image: '/images/second.jpg',
          description:
            'An immense ocean, a mysterious atmosphere and a cyber sermon',
        },
        {
          title: "Autumn's colours",
          date: 'October 1, 2024',
          image: '/images/third.jpeg',
          description: 'Autumn exudes golden light',
        },
        {
          title: 'Strangeways, here we come',
          date: 'September 29, 2024',
          image: '/images/fourth.jpg',
          description: 'A strange cast of modern art: what is hidden in it',
        },
      ],
      extraCss: ['/css/posts-style.css'],
      extraJsBody: ['/js/menu-activity.js'],
    };
  }

  @Get('gallery')
  @Render('gallery-page')
  getGallery(@Request() req) {
    return {
      title: 'gallery',
      isAuthenticated: !!req.user,
      images: [
        '/images/gallery/autumn1.jpg',
        '/images/gallery/autumn2.jpg',
        '/images/gallery/autumn3.jpg',
        '/images/gallery/autumn4.jpg',
        '/images/gallery/autumn5.jpg',
      ],
      extraCss: ['/css/gallery-style.css'],
      extraJsHead: [
        'https://unpkg.com/swiper/swiper-bundle.min.js',
        '/js/gallery.js',
      ],
      extraJsBody: ['/js/menu-activity.js'],
    };
  }

  @Get('goods')
  @Render('goods-page')
  getGoods(@Request() req) {
    return {
      title: 'goods',
      isAuthenticated: !!req.user,
      goods: [
        {
          name: 'Autumn Postcard A5',
          description: 'Description will be soon...',
          image: '/images/gallery/autumn1.jpg',
        },
        {
          name: 'Autumn Postcard A5',
          description: 'Description will be soon...',
          image: '/images/gallery/autumn2.jpg',
        },
      ],
      extraCss: ['/css/goods-style.css'],
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
