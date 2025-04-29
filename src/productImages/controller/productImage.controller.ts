import { Body, Controller, Delete, Param, ParseFilePipeBuilder, ParseIntPipe, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ProductImageService } from "../service/productImage.service";
import { CreateProductImageDto } from "../dtos/create-product-image.dto";
import { FilesInterceptor } from "@nestjs/platform-express";

@Controller('product-images')
export class ProductImageController {
  constructor(private productImageService: ProductImageService) { }
    
  @Post()
  @UseInterceptors(FilesInterceptor('files'))
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

  // Xóa 1 ảnh theo ImageID
  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number): Promise<string> {
    await this.productImageService.deleteOneImage(id);
    return `Deleted image with id ${id}`;
  }

  // Xóa tất cả ảnh theo ProductID
  @Delete('product/:productId')
  async deleteByProduct(@Param('productId', ParseIntPipe) productId: number): Promise<string> {
    await this.productImageService.deleteImagesByProductId(productId);
    return `Deleted all images for product ${productId}`;
  }
  }
