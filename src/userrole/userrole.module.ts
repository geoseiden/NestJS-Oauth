import { Module } from '@nestjs/common';
import { UserroleController } from './userrole.controller';
import { UserroleService } from './userrole.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRoleSchema } from './userrole.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:'UserRole',schema:UserRoleSchema}])],
  controllers: [UserroleController],
  providers: [UserroleService],
  exports:[UserroleService]
})
export class UserroleModule {}
