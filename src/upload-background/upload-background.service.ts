import { Injectable } from "@nestjs/common";
import { ImagesDbService } from "src/prisma/images-db.service";
import { PublishImageDbService } from "src/prisma/publish-image-db.service";
import mergeImages from "src/utils/mergeImages";

@Injectable()
export class UploadBackgroundService {
  constructor(
    private readonly imagesDb: ImagesDbService,
    private readonly publishImageDb: PublishImageDbService,
  ) {}

  async uploadBackground(image: string): Promise<void> {
    const imageBuffer = Buffer.from(image.split(",")[1], "base64");
    const result = await this.publishImageDb.getCurrentBackground();
    const id = result?.id;

    if (id) {
      const data: { background_image: Buffer; image?: Buffer } = {
        background_image: imageBuffer,
        image: imageBuffer,
      };

      const existingPerson = await this.imagesDb.unArchivedPersonImages(true);
      if (existingPerson.length > 0) {
        data["image"] = await mergeImages(
          imageBuffer,
          existingPerson.map(
            (value: { blurred_person_image_blob?: Buffer }) =>
              value.blurred_person_image_blob,
          ),
        );
      }

      await this.publishImageDb.updateImage(id, data);
    } else {
      await this.publishImageDb.createImageSet(imageBuffer);
    }
  }
}
