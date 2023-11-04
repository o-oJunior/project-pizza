import { Injectable } from '@nestjs/common'
import { PizzaSizeRepository } from './repositories/pizzaSize.repository'

@Injectable()
export class PizzaSizeService {
  constructor(private readonly pizzaSizeRepository: PizzaSizeRepository) {}

  async getAllPizzaSizes(): Promise<object> {
    try {
      const response: object = await this.pizzaSizeRepository.getAllPizzaSizes()
      return { statusCode: 200, data: response }
    } catch (error) {
      return this.pizzaSizeRepository.statusCode500
    }
  }
}
