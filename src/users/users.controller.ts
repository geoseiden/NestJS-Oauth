import { Body, Controller, Delete, Get, Param, Post, Put, Req, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { CreateUserDTO } from './dto/creatUser.dto';
import { GetUserDTO } from './dto/getUser.dto';
import * as bcrypt from "bcrypt";


@Controller('users')
export class UsersController {
    constructor(private readonly userService:UsersService){}

    @Post("create")
    async addUser(
        @Body() creatUserDTO:CreateUserDTO)
        {
            const id=await this.userService.createUser(creatUserDTO.name,creatUserDTO.email,creatUserDTO.password,creatUserDTO.role);
            return {"id":id};
        }
    
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get("all")
    async getUsers(){
        const user = await this.userService.getUsers();
        return user.map(user => new GetUserDTO(user));
    }

    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get("profile")
    async getProfile(@Req() req): Promise<GetUserDTO>{
        const user =  await this.userService.getOneUser(req.user.id);
        const getUserDTO = new GetUserDTO(user);
        return getUserDTO;
    }

    @UseGuards(JwtAuthGuard,RolesGuard)
    @Put("update/:id")
    async updateUser(
        @Param('id') id:string,
        @Body() getUserDTO:GetUserDTO
    ):Promise<GetUserDTO>
        {
        const user = await this.userService.updateUser(id,getUserDTO.name,getUserDTO.email);
    
        return new GetUserDTO(user);
    }

    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get("one/:id")
    async getOneUser(
        @Param('id') id:string
    ):Promise<GetUserDTO>
    {
        const user = await this.userService.getOneUser(id);
        return new GetUserDTO(user);
    }

    @UseGuards(JwtAuthGuard,RolesGuard)
    @Delete("delete/:id")
    async deleteUser(
        @Param('id') id:string
    ){
        return this.userService.deleteUser(id);
    }

    //@Get('/hash')
    //async hashing(){
    //    console.log('Hash : ',await bcrypt.hash('123456789',10))
    //}
}