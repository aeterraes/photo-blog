import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Render,
  Req,
  Res,
} from '@nestjs/common';
import { PostService } from './post/post.service';
import { UserService } from './user/user.service';
import { Request, Response } from 'express';
import Session, { getSession } from 'supertokens-node/recipe/session';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import { SessionRequest } from 'supertokens-node/framework/express';
import SuperTokens from 'supertokens-node';

@Controller()
export class AppController {
  constructor(
    private postService: PostService,
    private userService: UserService,
  ) {}

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      const { email, password } = body;
      const user = await this.userService.findOneByEmail(email);
      if (!user) {
        return res.status(HttpStatus.UNAUTHORIZED);
      }
      const response = await EmailPassword.signIn('', email, password);
      if (response.status === 'WRONG_CREDENTIALS_ERROR') {
        return res.status(HttpStatus.UNAUTHORIZED);
      }
      const recipeUserId = SuperTokens.convertToRecipeUserId(response.user.id);
      await Session.createNewSession(
        req,
        res,
        '',
        recipeUserId,
        { id: user.id, email: user.email },
        { userData: { id: user.id, email: user.email } },
        {},
      );
      return res.redirect('/profile');
    } catch (error) {
      console.error('err:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('login')
  @Render('login')
  getLogin() {
    return {};
  }

  @Post('logout')
  async logout(@Req() req: SessionRequest, @Res() res: Response) {
    try {
      const session = await getSession(req, res);
      await session.revokeSession();
      return res.status(200);
    } catch (err) {}
  }

  @Get('profile')
  @Render('profile')
  async getProfile(@Req() req: Request, @Res() res: Response) {
    try {
      const session = await getSession(req, res);
      const accessTokenPayload = session.getAccessTokenPayload();
      const user = await this.userService.findOneByEmail(
        accessTokenPayload.email,
      );
      return { user };
    } catch (error) {
      console.error('err', error);
      return res.status(401);
    }
  }

  @Get()
  @Render('index')
  async getIndex(@Req() req) {
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
  getTableForm(@Req() req) {
    return {
      title: 'table-form',
      isAuthenticated: !!req.user,
      extraCss: ['/css/table-style.css'],
      extraJsBody: ['/js/menu-activity.js', '/js/table.js'],
    };
  }
}
