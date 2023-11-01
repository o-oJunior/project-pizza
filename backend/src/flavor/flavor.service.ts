import { Injectable } from '@nestjs/common'
import { FlavorRepository } from './repositories/flavor.repository'

@Injectable()
export class FlavorService {
  constructor(private readonly flavorRepository: FlavorRepository) {}

  async getAllFlavors(): Promise<object> {
    this.flavorRepository.connectDatabase()
    try {
      const response: object = await this.flavorRepository.getAllFlavors()
      this.flavorRepository.disconnectDatabase()
      return response
    } catch (error) {
      this.flavorRepository.disconnectDatabase()
      return error
    }
  }
}
