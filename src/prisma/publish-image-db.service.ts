import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Injectable()
export class PublishImageDbService {
  constructor(private readonly prisma: PrismaService) {}

  async latestPublishImage(): Promise<Buffer | null> {
    const result = await this.prisma.publish_image.findFirst({
      select: { image: true },
      where: { archived: true },
      orderBy: [{ publish_date: "desc" }],
    });
    return result?.image;
  }

  async hasPublishedImage(): Promise<boolean> {
    const count = await this.prisma.publish_image.count({
      where: { archived: true },
    });
    return count > 0;
  }

  async hasBackgroundImage(): Promise<boolean> {
    const count = await this.prisma.publish_image.count({
      where: { archived: false },
    });
    return count > 0;
  }

  async getCurrentBackground(): Promise<{
    id: number;
    background_image: Buffer;
  }> {
    return this.prisma.publish_image.findFirst({
      select: { id: true, background_image: true },
      where: { archived: false },
    });
  }

  async getCurrentImage(): Promise<{ id: number; image: Buffer }> {
    return this.prisma.publish_image.findFirst({
      select: { id: true, image: true },
      where: { archived: false },
    });
  }

  async updateImage(
    id: number,
    data: { background_image?: Buffer; image?: Buffer },
  ): Promise<void> {
    await this.prisma.publish_image.update({
      data,
      where: { id },
    });
  }

  async createImageSet(
    background_image: Buffer,
    image?: Buffer,
  ): Promise<void> {
    await this.prisma.publish_image.create({
      data: {
        background_image,
        image: image ?? background_image,
        archived: false,
      },
    });
  }

  async publishImage(id: number, image: Buffer): Promise<void> {
    await this.prisma.publish_image.update({
      data: { image, publish_date: new Date(), archived: true },
      where: { id },
    });
  }
}
