import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
    constructor(@InjectModel('user') private userModel:Model<User>){}

    async createUser(name:string,email:string,password:string,role:string){
        const hashed_password=  await bcrypt.hash(password,10);
        const newUser = new this.userModel(
            {
                name:name,
                email:email,
                hashed_password:hashed_password,
                role:role
            }
        )
        const createdUser=await newUser.save();
        return createdUser._id as string;
    }

    async getUsers(){
        const users = await this.userModel.find().exec();
        return users;
    }

    async updateUser(id:string,name:string,email:string){
        const updatedUser = await this.userModel.findById(id);
        if (!updatedUser){
            return "Cannot update user,User Does Not exist";
        }

        if (name){
            updatedUser.name=name;
        }
        if (email){
            updatedUser.email=email;
        }

        return updatedUser.save(); 
    }

    async getOneUser(id: string) {
        const user = await this.userModel.findById(id);
        //console.log(user);
        return user;
    }    

    async deleteUser(id:string){
        try {
            const user=await this.userModel.findById(id);
            if (!user){
                return "Cannot delete user, User Does Not exist";
            }
            await user.deleteOne({_id:id}).exec();   
        } catch (error) {
            return error;
        }
    }
    async getByEmail(email:string){
        const user=await this.userModel.findOne({email}).exec();
        return user;
    }
}