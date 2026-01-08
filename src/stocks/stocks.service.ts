import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class StocksService {

  constructor(
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ){}

  async create(createStockDto: CreateStockDto) {
    const product = await this.productRepository.findOne({
      where: {id: createStockDto.product_id}});
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const stock = await this.stockRepository.save(createStockDto);
    return {
      status: true,
      statusCode: HttpStatus.CREATED,
      message: 'Stock added successfully',
      data: stock,
    };
  }

  findAll() {
    return `This action returns all stocks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stock`;
  }

  update(id: number, updateStockDto: UpdateStockDto) {
    return `This action updates a #${id} stock`;
  }

  remove(id: number) {
    return `This action removes a #${id} stock`;
  }
}
