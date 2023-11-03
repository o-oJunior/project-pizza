import { Injectable } from '@nestjs/common'
import { PizzaSizeRepository } from './repositories/pizzaSize.repository'

@Injectable()
export class PizzaSizeService {
  constructor(private readonly pizzaSizeRepository: PizzaSizeRepository) {}

  async getAllPizzaSizes(): Promise<object> {
    this.pizzaSizeRepository.connectDatabase()
    try {
      const response: object = await this.pizzaSizeRepository.getAllPizzaSizes()
      return response
    } catch (error) {
      return error
    } finally {
      this.pizzaSizeRepository.disconnectDatabase()
    }
  }
}
