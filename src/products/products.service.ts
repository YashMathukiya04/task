import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository : Repository<Product>,
  ){}

  async create(createProductDto: CreateProductDto) {
    const product = await this.productRepository.save(createProductDto);
    // console.log(product);
    return {
      status: true,
      statusCode: HttpStatus.CREATED,
      message: 'Product created successfully',
      data: product,
    };
  }

  async findAll() {
    const products = await this.productRepository.find({
      // relations: ['stocks']
    });
    return {
      status: true,
      statusCode: HttpStatus.OK,
      message: 'Products fetched successfully',
      data: products,
    };
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
        where: { id },
        relations: ['stocks']
      });
    if(!product){
      throw new NotFoundException('product not found');
    }
   return {
      status: true,
      statusCode: HttpStatus.OK,
      message: 'Product fetched successfully',
      data: product,
    };
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({ where: { id } });
    if(!product){
      throw new NotFoundException('product not found');
    }
    const updatedProduct = await this.productRepository.update(id, updateProductDto);
    return {
      status: true,
      statusCode: HttpStatus.OK,
      message: 'Product updated successfully',
      data: updatedProduct,
    };
  }

  async remove(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if(!product){
      throw new NotFoundException('product not found');
    }
    const deletedProduct = await this.productRepository.delete(id);
    
    return {
      status: true,
      statusCode: HttpStatus.OK,
      message: 'Product deleted successfully',
      data: deletedProduct,
    };
  }
}
