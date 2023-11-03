import { Controller, Get } from '@nestjs/common'
import { DrinkService } from 'src/drinks/drink.service'

@Controller('api')
export class DrinkController {
  constructor(private readonly drinkService: DrinkService) {}

  @Get('drink')
  getAllDrinks(): object {
    return this.drinkService.getAllDrinks()
  }
}
