import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UserroleModule } from './userrole/userrole.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import * as dotenv from "dotenv";
import { addTimestampsToSchema } from './mongoose-timestamps.plugin';

dotenv.config()

@Module({
  imports: [UsersModule, UserroleModule,MongooseModule.forRoot('mongodb://localhost:27017/fm', {
    connectionFactory: (connection) => {
      connection.plugin(addTimestampsToSchema);
      return connection;
    },
  }), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}