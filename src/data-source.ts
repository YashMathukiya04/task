import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();
import { DataSource } from "typeorm";
import { Product } from "./products/entities/product.entity";
import { Stock } from "./stocks/entities/stock.entity";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Product,Stock],
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
});