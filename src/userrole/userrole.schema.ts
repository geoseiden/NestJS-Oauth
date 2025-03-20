import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class UserRole extends Document{
    @Prop({required:true,unique:true,type:String})
    role:string;

    @Prop({required:true,type:[String]})
    permissions:string;
}

export const UserRoleSchema = SchemaFactory.createForClass(UserRole);