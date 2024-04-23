import { Injectable } from "@nestjs/common";
import { ImagesDbService } from "src/prisma/images-db.service";
import { PublishImageDbService } from "src/prisma/publish-image-db.service";
import { publishImageResponses } from "src/responses/publishImageResponses";
import mergeImages from "src/utils/mergeImages";

@Injectable()
export class PublishImageService {
  constructor(
    private readonly imagesDb: ImagesDbService,
    private readonly publishImageDb: PublishImageDbService,
  ) {}

  async publishImage(): Promise<publishImageResponses> {
    const allImages = await this.imagesDb.unArchivedPersonImages();

    const allPersonImage = allImages.map(
      (value: { person_image_blob?: Buffer }) => value.person_image_blob,
    );

    const result = await this.publishImageDb.getCurrentBackground();

    const mergedImage = await mergeImages(
      result?.background_image,
      allPersonImage,
    );
    await this.imagesDb.archiveImages(result?.id);
    await this.publishImageDb.publishImage(result?.id, mergedImage);

    return {
      image: "data:image/jpeg;base64," + mergedImage.toString("base64"),
    };
  }
}
