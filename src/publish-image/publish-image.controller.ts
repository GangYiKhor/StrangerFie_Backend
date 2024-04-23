import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common";
import { PublishImageService } from "./publish-image.service";
import { publishImageResponses } from "src/responses/publishImageResponses";

@Controller("publish-image")
export class PublishImageController {
  constructor(private readonly publishImageService: PublishImageService) {}

  @Get()
  async publishImage(): Promise<publishImageResponses> {
    try {
      return await this.publishImageService.publishImage();
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
