import { Injectable } from "@nestjs/common";
import { PublishImageDbService } from "src/prisma/publish-image-db.service";
import { isSetupResponses } from "src/responses/isSetupResponses";

@Injectable()
export class IsSetupService {
  constructor(private readonly publishImageDb: PublishImageDbService) {}

  async isSetup(): Promise<isSetupResponses> {
    return { status: await this.publishImageDb.hasBackgroundImage() };
  }
}
