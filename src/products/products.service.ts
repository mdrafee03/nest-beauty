import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  prodId = 0

  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }
  async insertProduct(title: string, desc: string, price: number) {
    const newProduct = new this.productModel({ title, description: desc, price });
    const result = await newProduct.save();
    // console.log(result);
    return result.id as string;
  }
  // getProducts() {
  //   return [...this.products];
  // }
  // getProduct(id: number) {
  //   const product = this.findProduct(id)[0];
  //   return { ...product };
  // }
  // updateProduct(id: number, title: string, description: string, price: number) {
  //   const [product, index] = this.findProduct(id);

  //   const updatedProduct = { ...product };
  //   if (title) {
  //     updatedProduct.title = title;
  //   }
  //   if (description) {
  //     updatedProduct.description = description;
  //   }
  //   if (price) {
  //     updatedProduct.price = price;
  //   }
  //   this.products[index] = updatedProduct;
  //   return { ...updatedProduct };
  // }
  // deleteProduct(id: number) {
  //   const index = this.findProduct(id)[1];
  //   return this.products.splice(index, 1);
  // }

  // private findProduct(id: number): [Product, number] {
  //   const prodIndex = this.products.findIndex(product => product.id === id);
  //   const product = this.products[prodIndex];

  //   if (!product) {
  //     throw new NotFoundException('Could not find product');
  //   }
  //   return [product, prodIndex];
  // }
}
