import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { CreateProdutDto } from "./dto/create-product.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Product, ProductDocument } from "./schemas/product.schema";
import { UpdateProdutDto } from "./dto/update-product.dto";

@Injectable()
export class ProductsService {

    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {

    }

    async getAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async getById(id: string): Promise<Product> {
        return this.productModel.findById(id);
    }

    async create(productDto: CreateProdutDto): Promise<Product> {
       const newProduct = new this.productModel(productDto);
       return newProduct.save()
    }

    async remove(id: string): Promise<Product> {
        return this.productModel.findByIdAndDelete(id);
    }

    async update(id: string, productDto: UpdateProdutDto): Promise<Product> {
        return this.productModel.findByIdAndUpdate(id, productDto, {new: true})
    }
}