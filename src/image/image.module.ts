import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [ImageController],
  providers: [ImageService],
  imports: [UserModule],
})
export class ImageModule {}
