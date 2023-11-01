import { Injectable } from '@nestjs/common'
import { PizzaSizeRepository } from './repositories/pizzaSize.repository'

@Injectable()
export class PizzaSizeService {
  constructor(private readonly pizzaSizeRepository: PizzaSizeRepository) {}

  async getAllPizzaSizes(): Promise<object> {
    this.pizzaSizeRepository.connectDatabase()
    try {
      const response: object = await this.pizzaSizeRepository.getAllPizzaSizes()
      this.pizzaSizeRepository.disconnectDatabase()
      return response
    } catch (error) {
      this.pizzaSizeRepository.disconnectDatabase()
      return error
    }
  }
}
