import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { MulterModule } from '@nestjs/platform-express';


@Module({

  controllers: [ProfileController],
  providers: [ProfileService],
  exports:[ProfileService]
})
export class ProfileModule {}
