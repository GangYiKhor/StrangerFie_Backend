import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { ImagesDbService } from "./images-db.service";
import { PublishImageDbService } from "./publish-image-db.service";

@Module({
  providers: [PrismaService, ImagesDbService, PublishImageDbService],
  exports: [ImagesDbService, PublishImageDbService],
})
export class PrismaModule {}
