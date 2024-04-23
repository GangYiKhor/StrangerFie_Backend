import { Injectable } from "@nestjs/common";
import { PublishImageDbService } from "src/prisma/publish-image-db.service";
import { completeImageResponses } from "src/responses/completeImageResponses";

@Injectable()
export class GetLatestPublishedImageService {
  constructor(private readonly publishImageDb: PublishImageDbService) {}

  async getLatestPublishedImage(): Promise<completeImageResponses> {
    const image = await this.publishImageDb.latestPublishImage();
    return { image: "data:image/jpeg;base64," + image.toString("base64") };
  }
}
