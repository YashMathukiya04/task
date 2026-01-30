import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { StockEntry } from './stock-entry.entity';

@Entity('stock')
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_id: number;

  @ManyToOne(() => Product, (product) => product.stocks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'varchar', length: 100 })
  batch_number: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'date' })
  expiry_date: Date;

  @ManyToOne(() => StockEntry, (entry) => entry.stocks, {
      onDelete: 'CASCADE',
      nullable: true, 
  })
  @JoinColumn({ name: 'stock_entry_id' })
  stock_entry: StockEntry;

  @CreateDateColumn({ type: 'timestamp' })
  added_at: Date;
}
