import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common";
import { IsSetupService } from "./is-setup.service";
import { isSetupResponses } from "src/responses/isSetupResponses";

@Controller("is-setup")
export class IsSetupController {
  constructor(private readonly isSetupService: IsSetupService) {}

  @Get()
  async isSetup(): Promise<isSetupResponses> {
    try {
      return await this.isSetupService.isSetup();
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
