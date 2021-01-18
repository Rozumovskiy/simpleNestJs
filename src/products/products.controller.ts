import { Controller, Get, Param, Post, Body, Delete, Put, HttpCode, HttpStatus, Header } from '@nestjs/common';
import { CreateProdutDto } from './dto/create-product.dto';
import { UpdateProdutDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductsController {

    constructor(private readonly productService: ProductsService ) {

    }

    @Get()
    // @Redirect('https://google.com', 301)
    getAll(): Promise<Product[]>{
        return this.productService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<Product> {   
        return this.productService.getById(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Cash-Control', 'none')
    create(@Body() createProdutDto: CreateProdutDto): Promise<Product> {
        return this.productService.create(createProdutDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<Product>  {
        return this.productService.remove(id)
    }

    @Put(':id')
    update(@Body() updateProductDto: UpdateProdutDto, @Param('id') id:string): Promise<Product>  {
        return this.productService.update(id, updateProductDto)
    }

}
