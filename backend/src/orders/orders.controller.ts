import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { CreateOrdersDto } from './dto/createOrders.dto'

@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('idClient/:idClient')
  getOrdersByClient(@Param('idClient') idClient: number): object {
    return this.ordersService.getOrdersByClient(idClient)
  }

  @Get('code/:code')
  getOrdersByCode(@Param('code') code: number): object {
    console.log(code)
    return this.ordersService.getOrdersByCode(code)
  }

  @Post('create')
  createOrders(@Body() createOrdersDto: CreateOrdersDto): object {
    return this.ordersService.createOrders(createOrdersDto)
  }
}
