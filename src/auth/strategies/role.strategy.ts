import { PassportStrategy } from "@nestjs/passport";
import { AuthenticatedUser } from "../dto/ jwtPayload.dto";
import { UsersService } from "src/users/users.service";
import { Strategy } from "passport-custom";
import { Request } from "express";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class RoleStrategy extends PassportStrategy(Strategy, 'role') {
  constructor(private readonly userService: UsersService,
    private readonly authService:AuthService
  ) {
    super();
  }

  async validate(req: Request) {
    const user = req.user as AuthenticatedUser;
  
    if (!user || !user.id) {
      throw new UnauthorizedException('Invalid token or missing user ID');
    }
  
    //console.log('Extracted User ID:', user.id);
  
    const dbUser = await this.userService.getOneUser(user.id);
    if (!dbUser) {
      throw new UnauthorizedException('User not found');
    }
  
    const endpoint = req.route?.path;
    //console.log('Endpoint:', endpoint);
    //console.log("User : ",dbUser)
  
    const hasPermission = await this.authService.checkPermissions(user.id, endpoint);
    //console.log('Permission Check Result:', hasPermission);
  
    if (!hasPermission) {
      throw new UnauthorizedException('User not authorised for this endpoint');
    }
  
    //console.log('Authorized User ID:', user.id);
    return { id: user.id };
  }
  
}
