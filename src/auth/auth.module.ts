import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from "dotenv";
import { JwtStrategy } from './strategies/jwt.strategy';
import { RoleStrategy } from './strategies/role.strategy';
import { UserroleModule } from 'src/userrole/userrole.module';

dotenv.config()

@Module({
  imports:[UsersModule,UserroleModule,
    JwtModule.register({
      secret:process.env.SECRET_KEY,
      signOptions:{
        expiresIn:"1h"
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy,RoleStrategy],
  exports:[RoleStrategy]
})
export class AuthModule {}
