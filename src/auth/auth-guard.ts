import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { getSession } from 'supertokens-node/recipe/session';
import { SessionRequest } from 'supertokens-node/framework/express';

@Injectable()
export class SuperTokensAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<SessionRequest>();
    const response = context.switchToHttp().getResponse();

    try {
      const session = await getSession(request, response, {
        sessionRequired: true,
      });
      request.session = session;
      return true;
    } catch (err) {
      return false;
    }
  }
}
