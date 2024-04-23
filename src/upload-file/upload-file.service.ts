import removeBackground, { Config } from "@imgly/background-removal-node";
import { Injectable } from "@nestjs/common";
import axios from "axios";
import { ImagesDbService } from "src/prisma/images-db.service";
import { PublishImageDbService } from "src/prisma/publish-image-db.service";
import { uploadFileResponses } from "src/responses/uploadFileResponses";
import mergeImages from "src/utils/mergeImages";
import * as fs from "fs";
import {
  BG_REMOVE_URL,
  BG_REMOVE_HOST,
  BLUR_FACE_URL,
  BLUR_FACE_HOST,
} from "src/utils/constants";
import * as FormData from "form-data";

@Injectable()
export class UploadFileService {
  constructor(
    private readonly imagesDb: ImagesDbService,
    private readonly publishImageDb: PublishImageDbService,
  ) {}

  async uploadFile(image: string): Promise<uploadFileResponses> {
    const removeBgFunc =
      process.env.BG_REMOVE_METHOD === "local"
        ? this.localRemoveBg
        : this.removeBg;

    const imageBuffer = Buffer.from(image.split(",")[1], "base64");
    const blurredImageBuffer = await this.blurFaces(imageBuffer);
    const personImageBuffer = await removeBgFunc(imageBuffer);
    const blurredPersonImageBuffer = await removeBgFunc(blurredImageBuffer);

    const id = await this.imagesDb.createImage({
      image_blob: imageBuffer,
      blurred_image_blob: blurredImageBuffer,
      person_image_blob: personImageBuffer,
      blurred_person_image_blob: blurredPersonImageBuffer,
    });

    const result = await this.publishImageDb.getCurrentImage();
    const backgroundImageResult =
      await this.publishImageDb.getCurrentBackground();

    const mergedImage = await mergeImages(result.image, [personImageBuffer]);
    const onlyCurrentImage = await mergeImages(
      backgroundImageResult.background_image,
      [personImageBuffer],
    );

    return {
      mergedImage: "data:image/jpeg;base64," + mergedImage.toString("base64"),
      onlyCurrentImage:
        "data:image/jpeg;base64," + onlyCurrentImage.toString("base64"),
      id: id.toString(),
    };
  }

  async localRemoveBg(imageBuffer: Buffer): Promise<Buffer> {
    const config: Config = { output: { format: "image/png" } };
    const blob = new Blob([imageBuffer], { type: "image/jpeg" });

    const removedBackground = await removeBackground(blob, config);

    return Buffer.from(await removedBackground.arrayBuffer());
  }

  async removeBg(imageBuffer: Buffer): Promise<Buffer> {
    const data = new FormData();
    const tmpFilePath =
      process.env.PLATFORM === "server" ? "/tmp/img1.jpg" : "./tmp_img1.jpg";
    fs.writeFileSync(tmpFilePath, imageBuffer);
    data.append("image", fs.createReadStream(tmpFilePath));

    const response = await axios.post(BG_REMOVE_URL, data, {
      params: { mode: "fg-image" },
      headers: {
        "X-RapidAPI-Key": process.env.RAPID_API_KEY ?? "",
        "X-RapidAPI-Host": BG_REMOVE_HOST,
        ...data.getHeaders(),
      },
    });

    return Buffer.from(
      response?.data?.results?.[0]?.entities?.[0]?.image,
      "base64",
    );
  }

  async blurFaces(imageBuffer: Buffer): Promise<Buffer> {
    const data = new FormData();
    const tmpFilePath =
      process.env.PLATFORM === "server" ? "/tmp/img2.jpg" : "./tmp_img2.jpg";
    fs.writeFileSync(tmpFilePath, imageBuffer);
    data.append("image", fs.createReadStream(tmpFilePath));

    const response = await axios.post(BLUR_FACE_URL, data, {
      headers: {
        "X-RapidAPI-Key": process.env.RAPID_API_KEY ?? "",
        "X-RapidAPI-Host": BLUR_FACE_HOST,
        ...data.getHeaders(),
      },
    });

    return Buffer.from(
      response?.data?.results?.[0]?.entities?.[0]?.image,
      "base64",
    );
  }
}
