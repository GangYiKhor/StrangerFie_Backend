import { Injectable } from "@nestjs/common";
import { ImagesDbService } from "src/prisma/images-db.service";
import { PublishImageDbService } from "src/prisma/publish-image-db.service";
import { completeImageResponses } from "src/responses/completeImageResponses";
import mergeImages from "src/utils/mergeImages";

@Injectable()
export class CompleteImageService {
  constructor(
    private readonly imagesDb: ImagesDbService,
    private readonly publishImageDb: PublishImageDbService,
  ) {}

  async completeImage(id: number): Promise<completeImageResponses> {
    const personImage = await this.imagesDb.image(id);
    const publishImage = await this.publishImageDb.getCurrentImage();

    const merged = await mergeImages(publishImage.image, [
      personImage.blurred_person_image_blob,
    ]);
    await this.publishImageDb.updateImage(publishImage.id, { image: merged });

    return { image: "data:image/jpeg;base64," + merged.toString("base64") };
  }
}
