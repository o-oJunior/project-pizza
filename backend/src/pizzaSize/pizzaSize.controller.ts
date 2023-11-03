import { Controller, Get } from '@nestjs/common'
import { PizzaSizeService } from 'src/pizzaSize/pizzaSize.service'

@Controller('api/pizzaSize')
export class ControllerPizzaSize {
  constructor(private readonly pizzaSizeService: PizzaSizeService) {}

  @Get()
  getAllPizzaSizes(): object {
    return this.pizzaSizeService.getAllPizzaSizes()
  }
}
