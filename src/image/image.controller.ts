import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DataAccessGuard, JwtGuard } from 'src/auth/guard';
import { CreateImageDto, UpdateImageDto } from './dto';
import { ImageService } from './image.service';
import { CustomRequest } from 'src/user/models/request.models';

@UseGuards(JwtGuard)
@Controller('api/images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get('')
  @UseGuards(DataAccessGuard)
  async getImages(@Query() query: any, @Req() req: CustomRequest) {
    try {
      const user = req.userObj;
      if (user.role !== 'ADMIN') {
        query.userId = user.id;
      }
      return await this.imageService.getImagesWithParams(query);
    } catch (error) {
      throw new HttpException('No Images found', HttpStatus.NOT_FOUND);
    }
  }

  @Get('/:id')
  @UseGuards(DataAccessGuard)
  async getImage(@Param('id') id: string, @Req() req: CustomRequest) {
    try {
      const user = req.userObj;
      const image = await this.imageService.getImageById(id);
      if (!image) {
        throw new Error('Image not found');
      }
      if (user.id !== image.userId && user.role !== 'ADMIN') {
        throw new Error('Image belong to another user');
      }
      return image;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post('')
  async addImage(@Body() createImageDto: CreateImageDto) {
    try {
      return await this.imageService.addImage(createImageDto);
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('/:id')
  @UseGuards(DataAccessGuard)
  async updateImage(
    @Param('id') id: string,
    @Body() updateImageDto: UpdateImageDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const user = req.userObj;
      const image = await this.imageService.getImageById(id);

      if (!image) {
        throw new Error('Image not found');
      }

      if (user.id !== image.userId && user.role !== 'ADMIN') {
        throw new Error('Image belong to another user');
      }

      return await this.imageService.updateImage(id, updateImageDto);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/:id')
  @UseGuards(DataAccessGuard)
  async deleteImage(@Param('id') id: string, @Req() req: CustomRequest) {
    try {
      const user = req.userObj;
      const image = await this.imageService.getImageById(id);

      if (!image) {
        throw new Error('Image not found');
      }

      if (user.id !== image.userId && user.role !== 'ADMIN') {
        throw new Error('Image belong to another user');
      }
      return await this.imageService.removeImage(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
