import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from "@nestjs/common";
import { UploadFileService } from "./upload-file.service";
import { uploadFileDto } from "src/dto/uploadFileDto";
import { uploadFileResponses } from "src/responses/uploadFileResponses";

@Controller("upload-file")
export class UploadFileController {
  constructor(private readonly uploadFileService: UploadFileService) {}

  @Post()
  async uploadFile(@Body() body: uploadFileDto): Promise<uploadFileResponses> {
    if (!body?.image) {
      if (process.env.NODE_ENV === "development") {
        console.error("Invalid Body:", body);
      }
      throw new HttpException("Invalid Request Body", HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.uploadFileService.uploadFile(body.image);
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
