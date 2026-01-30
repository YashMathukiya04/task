import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';
import { In, Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { StockEntry } from './entities/stock-entry.entity';

@Injectable()
export class StocksService {

  constructor(
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(StockEntry)
    private readonly stockEntryRepository: Repository<StockEntry>,
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

  async findAll() {
    const stocks = await this.stockRepository.find(
      {
        relations: ['product']
      }
    );
    return {
      status: true,
      statusCode: HttpStatus.OK,
      message: 'Stocks fetched successfully',
      data: stocks,
    };
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

  async addBulkStocks(dtos: CreateStockDto[], description? : string){
  
  if (!dtos || dtos.length === 0) {
    throw new BadRequestException('Stock list cannot be empty');
  }

  const stockEntry = await this.stockEntryRepository.save(
      this.stockEntryRepository.create({
        description: description,
      })  
  );

  const stocks = dtos.map((dto) => {
    return this.stockRepository.create({
      ...dto,
      stock_entry: stockEntry,
    });
  });

  const savedStocks = await this.stockRepository.save(stocks);
  
  return {
    status: true,
    statusCode: HttpStatus.CREATED,
    message: 'Stocks added successfully',
    stock_entry: stockEntry,
    data: savedStocks,
  };
  }

  async getStockEntry(){
    const stockEntry = await this.stockEntryRepository.find({
      relations : ['stocks.product']
    });
    if(!stockEntry){
      throw new NotFoundException('Stock entry not found');
    }
    console.log("call");
    console.log(stockEntry);
    return {
      status: true,
      statusCode: HttpStatus.OK,
      message: 'Stock entry with product fetched successfully',
      data: stockEntry,
    };
  }

  async getstock(id: number|any){
    const stock = await this.stockEntryRepository.find({
      where : {id : id},
      relations : ['stocks.product']
    });
    if(!stock){
      throw new NotFoundException('Stock not found');
    }
    console.log(stock);
    return {
      status: true,
      statusCode: HttpStatus.OK,
      message: 'Entry fetched successfully',
      data: stock,
    };
  }
}
