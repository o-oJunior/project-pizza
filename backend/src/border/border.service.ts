import { Injectable } from '@nestjs/common'
import { BorderRepository } from './repositories/border.repository'

@Injectable()
export class BorderService {
  constructor(private readonly borderRepository: BorderRepository) {}

  async getAllBorders(): Promise<object> {
    try {
      const response = await this.borderRepository.getAllBorders()
      const values = Object.values(response)
      const bordersFormated = values.map((value) => {
        value.priceAdditional = value.priceadditional
        delete value.priceadditional
        return value
      })
      return { statusCode: 200, data: bordersFormated }
    } catch (error) {
      return this.borderRepository.statusCode500
    }
  }
}
