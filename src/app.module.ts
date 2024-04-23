import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CompleteImageController } from "./complete-image/complete-image.controller";
import { CompleteImageModule } from "./complete-image/complete-image.module";
import { CompleteImageService } from "./complete-image/complete-image.service";
import { GetLatestPublishedImageModule } from "./get-latest-published-image/get-latest-published-image.module";
import { GetLatestPublishedImageService } from "./get-latest-published-image/get-latest-published-image.service";
import { HasPublishedImageController } from "./has-published-image/has-published-image.controller";
import { HasPublishedImageModule } from "./has-published-image/has-published-image.module";
import { IsSetupController } from "./is-setup/is-setup.controller";
import { IsSetupModule } from "./is-setup/is-setup.module";
import { PublishImageController } from "./publish-image/publish-image.controller";
import { PublishImageModule } from "./publish-image/publish-image.module";
import { UploadBackgroundModule } from "./upload-background/upload-background.module";
import { UploadBackgroundService } from "./upload-background/upload-background.service";
import { UploadFileModule } from "./upload-file/upload-file.module";
import { GetLatestPublishedImageController } from "./get-latest-published-image/get-latest-published-image.controller";
import { UploadBackgroundController } from "./upload-background/upload-background.controller";
import { UploadFileController } from "./upload-file/upload-file.controller";
import { HasPublishedImageService } from "./has-published-image/has-published-image.service";
import { IsSetupService } from "./is-setup/is-setup.service";
import { PublishImageService } from "./publish-image/publish-image.service";
import { UploadFileService } from "./upload-file/upload-file.service";
import { ImagesDbService } from "./prisma/images-db.service";
import { PublishImageDbService } from "./prisma/publish-image-db.service";
import { PrismaModule } from "./prisma/prisma.module";
import { PrismaService } from "./prisma/prisma.service";

@Module({
  imports: [
    CompleteImageModule,
    GetLatestPublishedImageModule,
    HasPublishedImageModule,
    IsSetupModule,
    PublishImageModule,
    UploadBackgroundModule,
    UploadFileModule,
    PrismaModule,
  ],
  controllers: [
    AppController,
    CompleteImageController,
    GetLatestPublishedImageController,
    HasPublishedImageController,
    IsSetupController,
    PublishImageController,
    UploadBackgroundController,
    UploadFileController,
  ],
  providers: [
    AppService,
    CompleteImageService,
    GetLatestPublishedImageService,
    HasPublishedImageService,
    IsSetupService,
    PublishImageService,
    UploadBackgroundService,
    UploadFileService,
    PrismaService,
    ImagesDbService,
    PublishImageDbService,
  ],
})
export class AppModule {}
