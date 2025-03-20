import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserRole } from './userrole.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserroleService {
    constructor(@InjectModel('UserRole') private userRoleModel:Model<UserRole>){}

    async create(){
        const newRole = new this.userRoleModel({
            role:'L1',
            permissions:["/users/all/"]
        })
        //return await newRole.save()
    }

    async findPermissions(role:string){
        const permission=await this.userRoleModel.findOne({role}).exec();
        return permission.permissions;
    }
}