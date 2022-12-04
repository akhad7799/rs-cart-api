import { Module } from '@nestjs/common';
import { Client } from 'pg';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';
import { DB } from '../common/params';

const client = new Client({
  user: 'postgres',
  host: DB.DB_HOST,
  database: DB.DB_NAME,
  password: DB.DB_PASSWORD,
  port: 5432,
});

client.connect();

@Module({
  imports: [OrderModule],
  providers: [
    CartService,
    {
      provide: 'PG',
      useValue: client,
    },
  ],
  controllers: [CartController],
  exports: ['PG'],
})
export class CartModule {}
