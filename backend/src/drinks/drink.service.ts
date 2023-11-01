import { Injectable } from '@nestjs/common'
import { DrinkRepository } from './repositories/drink.repository'

@Injectable()
export class DrinkService {
  constructor(private readonly drinkRepository: DrinkRepository) {}

  async getAllDrinks(): Promise<object> {
    this.drinkRepository.connectDatabase()
    try {
      const response: object = await this.drinkRepository.getAllDrinks()
      this.drinkRepository.disconnectDatabase()
      return response
    } catch (error) {
      this.drinkRepository.disconnectDatabase()
      return error
    }
  }
}
