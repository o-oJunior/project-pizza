import { Injectable } from '@nestjs/common'
import { DrinkRepository } from './repositories/drink.repository'

@Injectable()
export class DrinkService {
  constructor(private readonly drinkRepository: DrinkRepository) {}

  async getAllDrinks(): Promise<object> {
    this.drinkRepository.connectDatabase()
    try {
      const response: object = await this.drinkRepository.getAllDrinks()
      return response
    } catch (error) {
      return error
    } finally {
      this.drinkRepository.disconnectDatabase()
    }
  }
}
