import { Injectable } from '@nestjs/common'
import { BudRepository } from './repositories/bud.repository'

@Injectable()
export class BudService {
  constructor(private readonly budRepository: BudRepository) {}

  async getAllBuds(): Promise<object> {
    this.budRepository.connectDatabase()
    try {
      const response: object = await this.budRepository.getAllBuds()
      this.budRepository.disconnectDatabase()
      return response
    } catch (error) {
      this.budRepository.disconnectDatabase()
      return error
    }
  }
}
