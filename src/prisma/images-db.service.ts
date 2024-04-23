import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { images, Prisma } from "@prisma/client";

@Injectable()
export class ImagesDbService {
  constructor(private readonly prisma: PrismaService) {}

  async image(
    id: number,
    blurredOnly = true,
  ): Promise<{ blurred_person_image_blob: Buffer } | images | null> {
    if (blurredOnly) {
      return this.prisma.images.findUnique({
        select: { blurred_person_image_blob: true },
        where: { id },
      });
    }

    return this.prisma.images.findUnique({
      where: { id },
    });
  }

  async unArchivedPersonImages(
    blurred = false,
  ): Promise<
    { blurred_person_image_blob: Buffer }[] | { person_image_blob: Buffer }[]
  > {
    if (blurred) {
      return this.prisma.images.findMany({
        select: { blurred_person_image_blob: true },
        where: { archived: false },
      });
    }

    return this.prisma.images.findMany({
      select: { person_image_blob: true },
      where: { archived: false },
    });
  }

  async createImage(data: Prisma.imagesCreateInput): Promise<number> {
    const result = await this.prisma.images.create({
      data: { ...data, archived: false },
    });

    return result?.id;
  }

  async archiveImages(publish_id: number): Promise<void> {
    await this.prisma.images.updateMany({
      data: {
        archived: true,
        publish_id,
      },
      where: { archived: false },
    });
  }
}
