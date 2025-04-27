import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { ProductImage } from 'src/databases/entities/product-image.entity';
import { Product } from 'src/databases/entities/product.entity';
import { CreateProductImageDto } from '../dtos/create-product-image.dto';


@Injectable()
export class ProductImageService {
  constructor(
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
    
    @InjectRepository(Product)
    private productRepository :Repository<Product>,
  ) {}

  async create(createDto: CreateProductImageDto , files: Express.Multer.File[]): Promise<ProductImage[]> {
    const product = await this.productRepository.findOne({ where: { ProductID: createDto.ProductID } });
    if (!product) {
      throw new Error('Product not found'); // hoặc ném một exception phù hợp
    }
    
    const folderDir = path.join(process.cwd(), 'public', 'products', product.ProductID.toString());
    try {
      if (!fs.existsSync(folderDir)) {
        fs.mkdirSync(folderDir,{ recursive: true });
      }
    } catch (err) {
      console.error(err);
    }

    const savedImages = await Promise.all(
      files.map(async (file) => {
        const filePath =`${folderDir}/${file.originalname}`;
        try {
           fs.writeFileSync(filePath, file.buffer);
        } catch (err) {
          console.error('Error writing file:', err);
          throw new Error('Failed to save file');
        }
        const image = this.productImageRepository.create({
          ...createDto, 
          ImageURL: `products/${product.ProductID.toString()}/${file.originalname}`,
          ProductID: product.ProductID,
        });
        const saved = await this.productImageRepository.save(image);
        console.log('Image after save:', saved);
        return saved;
        
      })
    );
    return savedImages; 
  }
  
  async deleteOneImage(imageId: number): Promise<void> {
    const image = await this.productImageRepository.findOne({ where: { ImageID: imageId } });
    if (!image) {
      throw new Error('Image not found');
    }
  
    const filePath = path.join(process.cwd(), image.ImageURL); 

    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Xóa file vật lý
      }
    } catch (err) {
      console.error('Failed to delete file:', err);
      throw new Error('Failed to delete image file');
    }
  
    await this.productImageRepository.delete(imageId); // Xóa bản ghi DB
  }

  // Hàm xóa tất cả ảnh của 1 product
  async deleteImagesByProductId(productId: number): Promise<void> {
    const images = await this.productImageRepository.find({ where: { ProductID :productId } });
    
    if (images.length === 0) {
      console.log('No images to delete');
      return;  
    }

    for (const image of images) {
      const filePath = path.join(process.cwd(), image.ImageURL);
      
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath); // Xóa file vật lý
          console.log(`Deleted image: ${filePath}`);
        }
      } catch (err) {
        console.error(`Failed to delete image file: ${filePath}, err`);
      }
    }

    await this.productImageRepository.delete(productId);
    console.log(`All images for product ${productId} deleted successfully`);
  }

  async findByProduct(productId: number): Promise<ProductImage[]> {
    return await this.productImageRepository.find({
      where: { ProductID: productId },
    });
  }


  
}


