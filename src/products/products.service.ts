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
    return result.id as string;
  }

  async getProducts(): Promise<Product[]> {
    const products = await this.productModel.find().exec();
    return products.map((prod: Product) => ({ id: prod.id, title: prod.price, description: prod.description, price: prod.price }));
  }

  async getProduct(id: string): Promise<Product> {
    let product: Product;
    try {
      product = await this.productModel.findById(id).exec();
      return { id: product.id, title: product.title, description: product.description, price: product.price };
    } catch {
      throw new NotFoundException('Could not find product');
    }

  }

  async updateProduct(id: string, title: string, description: string, price: number): Promise<Product> {
    let updatedProduct = await this.getProduct(id);

    if (title) {
      updatedProduct.title = title;
    }
    if (description) {
      updatedProduct.description = description;
    }
    if (price) {
      updatedProduct.price = price;
    }
    
    await this.productModel.updateOne({ '_id': id }, { $set: { 'title': title, 'description': description, 'price': price } });
    return await this.getProduct(id);
    // return { id: product.id, title: product.title, description: product.description, price: product.price };
  }
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
