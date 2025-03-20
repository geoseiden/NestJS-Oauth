import * as mongoose from "mongoose";

export const userSchema= new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    hashed_password:{type:String,required:true},
    role:{type:String,required:true}
})

export interface User extends mongoose.Document{
    id:string,
    name:string,
    email:string,
    hashed_password:string,
    role:string
}