import { Body, Controller, ParseFilePipeBuilder, Post, UploadedFiles } from "@nestjs/common";
import { ProductImageService } from "../service/productImage.service";
import { CreateProductImageDto } from "../dtos/create-product-image.dto";

@Controller('product-images')
export class ProductImageController {
  constructor(private productImageService: ProductImageService) { }
    
  @Post()
  async create(
    @Body() newPro: CreateProductImageDto, // Tham số này không nhận tệp
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /^image\/(jpg|jpeg|png)$/,
        })
        .addMaxSizeValidator({
          maxSize: 10_000_000,
        })
        .build(),
    )
    files: Array<Express.Multer.File>,  // Tệp sẽ được nhận ở đây
  ) {
    if (!files || files.length === 0) {
      throw new Error('Files are required');
    }
    console.log('files', files);
    return await this.productImageService.create(newPro, files);
  }
    }