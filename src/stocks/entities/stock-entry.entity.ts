import { Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, Column } from 'typeorm';
import { Stock } from './stock.entity';

@Entity('stock_entry')
export class StockEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  added_at: Date;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @OneToMany(() => Stock, (stock) => stock.stock_entry)
  stocks: Stock[];
}
