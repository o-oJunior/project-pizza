import { Injectable } from '@nestjs/common'
import { BudRepository } from './repositories/bud.repository'

@Injectable()
export class BudService {
  constructor(private readonly budRepository: BudRepository) {}

  async getAllBuds(): Promise<object> {
    try {
      const response: object = await this.budRepository.getAllBuds()
      const values = Object.values(response)
      const budsFormated = values.map((value) => {
        value.priceAdditional = value.priceadditional
        delete value.priceadditional
        return value
      })
      return { statusCode: 200, data: budsFormated }
    } catch (error) {
      return this.budRepository.statusCode500
    }
  }
}
