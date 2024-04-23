import { Module } from "@nestjs/common";
import { GetLatestPublishedImageController } from "./get-latest-published-image.controller";
import { GetLatestPublishedImageService } from "./get-latest-published-image.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [GetLatestPublishedImageController],
  providers: [GetLatestPublishedImageService],
})
export class GetLatestPublishedImageModule {}
