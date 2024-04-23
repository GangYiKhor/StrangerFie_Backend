import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from "@nestjs/common";
import { CompleteImageService } from "./complete-image.service";
import { completeImageResponses } from "src/responses/completeImageResponses";
import { completeImageDto } from "src/dto/completeImageDto";

@Controller("complete-image")
export class CompleteImageController {
  constructor(private readonly completeImageService: CompleteImageService) {}

  @Post()
  async completeImage(
    @Body() body: completeImageDto,
  ): Promise<completeImageResponses> {
    try {
      const id = parseInt(body?.id);

      if (!id) {
        if (process.env.NODE_ENV === "development") {
          console.log("Invalid Body:", body);
        }
        throw new HttpException("Invalid Request Body", HttpStatus.BAD_REQUEST);
      }

      return await this.completeImageService.completeImage(id);
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
