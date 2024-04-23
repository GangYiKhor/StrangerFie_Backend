import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common";
import { HasPublishedImageService } from "./has-published-image.service";
import { hasPublishedImageResponses } from "src/responses/hasPublishedImageResponses";

@Controller("has-published-image")
export class HasPublishedImageController {
  constructor(
    private readonly hasPublishedImageService: HasPublishedImageService,
  ) {}

  @Get()
  async hasPublishedImageHandler(): Promise<hasPublishedImageResponses> {
    try {
      return await this.hasPublishedImageService.hasPublishedImage();
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
