import { Module } from '@nestjs/common'
import { ControllerPizzaSize } from './pizzaSize.controller'
import { PizzaSizeService } from './pizzaSize.service'
import { PizzaSizeRepository } from './repositories/pizzaSize.repository'

@Module({
  controllers: [ControllerPizzaSize],
  providers: [PizzaSizeService, PizzaSizeRepository],
})
export class PizzaSizeModule {}
