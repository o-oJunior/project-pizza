import { Controller, Get } from '@nestjs/common'
import { PizzaSizeService } from 'src/pizzaSize/pizzaSize.service'

@Controller('api')
export class ControllerPizzaSize {
  constructor(private readonly pizzaSizeService: PizzaSizeService) {}

  @Get('pizzaSize')
  getAllPizzaSizes(): object {
    return this.pizzaSizeService.getAllPizzaSizes()
  }
}