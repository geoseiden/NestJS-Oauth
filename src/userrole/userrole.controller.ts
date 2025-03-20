import { Controller, Get, Param, Req } from '@nestjs/common';
import { UserroleService } from './userrole.service';

@Controller('userrole')
export class UserroleController {

    constructor(private readonly userRoleService:UserroleService){}

    @Get('create')
    async createRole(){
        return await this.userRoleService.create();
    }

    @Get('find/:role')
    async getPermissions(@Param('role') role:string){
        return await this.userRoleService.findPermissions(role);
    }
}