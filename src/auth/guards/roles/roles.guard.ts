import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RolesGuard extends AuthGuard('role') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAllowed = await super.canActivate(context);
  
    if (!isAllowed) {
      return false;
    }
  
    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      throw new UnauthorizedException('No user found in request');
    }
  
    return true;
  }
  
}