import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common";
import { GetLatestPublishedImageService } from "./get-latest-published-image.service";
import { completeImageResponses } from "src/responses/completeImageResponses";

@Controller("get-latest-published-image")
export class GetLatestPublishedImageController {
  constructor(
    private readonly getLatestPublishedImageService: GetLatestPublishedImageService,
  ) {}

  @Get()
  async getLatestPublishedImage(): Promise<completeImageResponses> {
    try {
      return await this.getLatestPublishedImageService.getLatestPublishedImage();
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.error(err);
      }
      throw new HttpException(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
