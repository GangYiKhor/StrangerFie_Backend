import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from "@nestjs/common";
import { UploadBackgroundService } from "./upload-background.service";
import { uploadFileDto } from "src/dto/uploadFileDto";

@Controller("upload-background")
export class UploadBackgroundController {
  constructor(
    private readonly uploadBackgroundService: UploadBackgroundService,
  ) {}

  @Post()
  async uploadBackground(@Body() body: uploadFileDto): Promise<void> {
    if (!body?.image) {
      if (process.env.NODE_ENV === "development") {
        console.error("Invalid Body:", body);
      }
      throw new HttpException("Invalid Request Body", HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.uploadBackgroundService.uploadBackground(body.image);
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
