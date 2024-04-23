import { Module } from "@nestjs/common";
import { UploadBackgroundController } from "./upload-background.controller";
import { UploadBackgroundService } from "./upload-background.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [UploadBackgroundController],
  providers: [UploadBackgroundService],
})
export class UploadBackgroundModule {}
