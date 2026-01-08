import { Module } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { StocksController } from './stocks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';
import { Product } from 'src/products/entities/product.entity';
import { StockEntry } from './entities/stock-entry.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Stock,Product,StockEntry])],
  controllers: [StocksController],
  providers: [StocksService],
})
export class StocksModule {}
