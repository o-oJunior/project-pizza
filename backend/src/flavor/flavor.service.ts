import { Injectable } from '@nestjs/common'
import { FlavorRepository } from './repositories/flavor.repository'

@Injectable()
export class FlavorService {
  constructor(private readonly flavorRepository: FlavorRepository) {}

  async getAllFlavors(): Promise<object> {
    try {
      const response: object = await this.flavorRepository.getAllFlavors()
      return { statusCode: 200, data: response }
    } catch (error) {
      return this.flavorRepository.statusCode500
    }
  }
}
