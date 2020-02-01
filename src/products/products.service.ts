import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {

  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

  async insertProduct(title: string, desc: string, price: number) {
    const newProduct = new this.productModel({ title, description: desc, price });
    const result = await newProduct.save();
    return result.id as string;
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products.map((prod: Product) => ({ id: prod.id, title: prod.title, description: prod.description, price: prod.price }));

  }

  async getProduct(id: string): Promise<Product> {
    let product: Product;
    try {
      product = await this.productModel.findById(id).exec();
    } catch {
      throw new NotFoundException('Could not find product');
    }
    if (!product) {
      throw new NotFoundException('Could not find product');
    }
    return product;
  }

  async getSingleProduct(productId: string) {
    const product = await this.getProduct(productId);
    return { id: product.id, title: product.title, description: product.description, price: product.price };
  }

  async updateProduct(id: string, title: string, description: string, price: number) {
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
    
    updatedProduct.save();
  }

  async deleteProduct(id: string) {
    const result = await this.productModel.deleteOne({_id: id}).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find product');
    }
  }
}
