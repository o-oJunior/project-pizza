import { Injectable } from '@nestjs/common'
import { FlavorRepository } from './repositories/flavor.repository'

@Injectable()
export class FlavorService {
  constructor(private readonly flavorRepository: FlavorRepository) {}

  async getAllFlavors(): Promise<object> {
    try {
      const response: object = await this.flavorRepository.getAllFlavors()
      const values = Object.values(response)
      const flavorsFormated = values.map((value) => {
        value.priceAdditional = value.priceadditional
        delete value.priceadditional
        return value
      })
      return { statusCode: 200, data: flavorsFormated }
    } catch (error) {
      return this.flavorRepository.statusCode500
    }
  }
}
