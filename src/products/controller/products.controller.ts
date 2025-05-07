import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { ProductService } from '../service/product.service';
import { Roles } from 'src/users/decorator/role.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/databases/entities/user.entity';
import { user } from 'src/users/decorator/user.decorator';
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  create(@user() user ,@Body() createProductDto: CreateProductDto) {
    console.log('user: ',user);
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
