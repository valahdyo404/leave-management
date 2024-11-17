import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/user.module';
import { LeaveModule } from './modules/leave/leave.module';

@Module({
  imports: [AuthModule, UserModule, LeaveModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
