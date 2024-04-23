import { Module } from "@nestjs/common";
import { PublishImageController } from "./publish-image.controller";
import { PublishImageService } from "./publish-image.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [PublishImageController],
  providers: [PublishImageService],
})
export class PublishImageModule {}
