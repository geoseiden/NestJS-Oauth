import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as dotenv from "dotenv";
import { jwtPayload } from "../dto/ jwtPayload.dto";
import { Injectable } from "@nestjs/common";

dotenv.config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:process.env.SECRET_KEY
        })
    }
    async validate(payload:jwtPayload) {
        return {id:payload.userId}
    }
}