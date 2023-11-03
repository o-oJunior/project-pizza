import { Injectable } from '@nestjs/common'
import { FlavorRepository } from './repositories/flavor.repository'

@Injectable()
export class FlavorService {
  constructor(private readonly flavorRepository: FlavorRepository) {}

  async getAllFlavors(): Promise<object> {
    this.flavorRepository.connectDatabase()
    try {
      const response: object = await this.flavorRepository.getAllFlavors()
      return response
    } catch (error) {
      return error
    } finally {
      this.flavorRepository.disconnectDatabase()
    }
  }
}
