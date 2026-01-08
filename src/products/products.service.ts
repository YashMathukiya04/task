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
    console.log(product);
    return {
      status: true,
      statusCode: HttpStatus.CREATED,
      message: 'Product created successfully',
      data: product,
    };
  }

  async findAll() {
    const products = await this.productRepository.find({
      relations: ['stocks']
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

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
