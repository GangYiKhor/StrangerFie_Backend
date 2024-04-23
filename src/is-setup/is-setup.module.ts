import { Module } from "@nestjs/common";
import { IsSetupController } from "./is-setup.controller";
import { IsSetupService } from "./is-setup.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [IsSetupController],
  providers: [IsSetupService],
})
export class IsSetupModule {}
