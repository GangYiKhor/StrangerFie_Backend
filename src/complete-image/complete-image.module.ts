import { Module } from "@nestjs/common";
import { CompleteImageController } from "./complete-image.controller";
import { CompleteImageService } from "./complete-image.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [CompleteImageController],
  providers: [CompleteImageService],
})
export class CompleteImageModule {}
