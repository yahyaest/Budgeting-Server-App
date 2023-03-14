import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateImageDto, UpdateImageDto } from './dto';
import { ImageService } from './image.service';

@UseGuards(JwtGuard)
@Controller('api/images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get('')
  async getImages(@Query() query: Object) {
    try {
      return await this.imageService.getImagesWithParams(query);
    } catch (error) {
      throw new HttpException('No Images found', HttpStatus.NOT_FOUND);
    }
  }

  @Get('/:id')
  async getImage(@Param('id') id: string) {
    try {
      const image = await this.imageService.getImageById(id);
      if (!image) {
        throw new Error('Image not found');
      }
      return image;
    } catch (error) {
      throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
    }
  }

  @Post('')
  async addImage(@Body() createImageDto: CreateImageDto) {
    try {
      return await this.imageService.addImage(createImageDto);
    } catch (error) {
      throw new HttpException(
        'Unexpected error occured',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch('/:id')
  async updateImage(
    @Param('id') id: string,
    @Body() updateImageDto: UpdateImageDto,
  ) {
    try {
      return await this.imageService.updateImage(id, updateImageDto);
    } catch (error) {
      throw new HttpException(
        'Unexpected error occured',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('/:id')
  async deleteImage(@Param('id') id: string) {
    try {
      const image = await this.imageService.removeImage(id);
      if (!image) {
        throw new Error('Image not found');
      }
      return image;
    } catch (error) {
      throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
    }
  }
}
