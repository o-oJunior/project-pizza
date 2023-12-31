import { Controller, Get, Query } from '@nestjs/common'
import { DrinkService } from 'src/drink/drink.service'

@Controller('api/drink')
export class DrinkController {
  constructor(private readonly drinkService: DrinkService) {}

  @Get()
  getAllDrinks(): object {
    return this.drinkService.getAllDrinks()
  }

  @Get('filter')
  getDrinkByType(@Query('type') type: string): object {
    return this.drinkService.getDrinkByType(type)
  }
}
