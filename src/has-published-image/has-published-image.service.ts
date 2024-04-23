import { Injectable } from "@nestjs/common";
import { PublishImageDbService } from "src/prisma/publish-image-db.service";
import { hasPublishedImageResponses } from "src/responses/hasPublishedImageResponses";

@Injectable()
export class HasPublishedImageService {
  constructor(private readonly publishImageDb: PublishImageDbService) {}

  async hasPublishedImage(): Promise<hasPublishedImageResponses> {
    return { status: await this.publishImageDb.hasPublishedImage() };
  }
}
