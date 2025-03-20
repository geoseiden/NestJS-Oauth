import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { jwtPayload } from './dto/ jwtPayload.dto';
import { UserroleService } from 'src/userrole/userrole.service';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService:UsersService,
    private readonly jwtService:JwtService,
private readonly userRoleService:UserroleService){}

    async validateUser(email:string,password:string){
        const user = await this.userService.getByEmail(email);
        if(!user){
            throw new UnauthorizedException("Invalid credentials");
        }

        const isMatch = await bcrypt.compare(password, user.hashed_password);
        if (!isMatch){
            throw new UnauthorizedException("Invalid credentials");
        }
        return {"id":user.id};
    }

    async login(userId:string){
        const payload:jwtPayload={userId:userId}
        return this.jwtService.sign(payload)
    }

    async checkPermissions(userId:string,endpoint:string){
        const user = await this.userService.getOneUser(userId);
        
        const permissions=await this.userRoleService.findPermissions(user.role);

        return permissions.includes(endpoint);
    }
}