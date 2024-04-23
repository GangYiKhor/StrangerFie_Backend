import { Module } from "@nestjs/common";
import { UploadFileController } from "./upload-file.controller";
import { UploadFileService } from "./upload-file.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [UploadFileController],
  providers: [UploadFileService],
})
export class UploadFileModule {}
