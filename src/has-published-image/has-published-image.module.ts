import { Module } from "@nestjs/common";
import { HasPublishedImageController } from "./has-published-image.controller";
import { HasPublishedImageService } from "./has-published-image.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [HasPublishedImageController],
  providers: [HasPublishedImageService],
})
export class HasPublishedImageModule {}
