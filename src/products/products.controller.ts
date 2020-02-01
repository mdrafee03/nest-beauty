import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }
  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number) {
    const generatedId = await this.productsService.insertProduct(prodTitle, prodDescription, prodPrice);
    return { id: generatedId };
  }

  @Get()
  async getAllProduct() {
    return { data: await this.productsService.getProducts() };
  }

  @Get(':id')
  async GetProduct(@Param('id') id: string) {
    return await this.productsService.getSingleProduct(id);
  }

  @Patch(':id')
  async UpdateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number
  ) {
    try {
      await this.productsService.updateProduct(prodId, prodTitle, prodDescription, prodPrice);
      return 'prodcut updated';
    } catch (error) {
      return error;
    }
  }
  @Delete(':id')
  async DeleteProduct(@Param('id') prodId: string) {
    await this.productsService.deleteProduct(prodId);
    return 'Product deleted'
  }
}
