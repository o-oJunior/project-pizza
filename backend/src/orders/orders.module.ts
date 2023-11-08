import { Module } from '@nestjs/common'
import { OrdersController } from './orders.controller'
import { OrdersService } from './orders.service'
import { OrdersRespository } from './repositories/orders.respository'

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRespository],
})
export class OrdersModule {}
