import { Injectable } from '@nestjs/common'
import { DrinkRepository } from './repositories/drink.repository'

@Injectable()
export class DrinkService {
  constructor(private readonly drinkRepository: DrinkRepository) {}

  async getAllDrinks(): Promise<object> {
    try {
      const response: object = await this.drinkRepository.getAllDrinks()
      return { statusCode: 200, data: response }
    } catch (error) {
      return this.drinkRepository.statusCode500
    }
  }
}
