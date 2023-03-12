import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateImageDto, UpdateImageDto } from './dto';

@Injectable()
export class ImageService {
  constructor(private readonly prisma: PrismaService) {}

  async getImages() {
    return await this.prisma.image.findMany();
  }

  async getImageById(id: string) {
    return await this.prisma.image.findUnique({ where: { id: +id } });
  }

  async getImagesWithParams(query: Object) {
    return await this.prisma.image.findMany({ where: query });
  }

  async addImage(body: CreateImageDto) {
    return await this.prisma.image.create({ data: body });
  }

  async updateImage(id: string, body: UpdateImageDto) {
    return await this.prisma.image.update({
      where: { id: +id },
     data:body
    });
  }

  async removeImage(id: string) {
    return await this.prisma.image.delete({ where: { id: +id } });
  }
}
