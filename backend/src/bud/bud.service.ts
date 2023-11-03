import { Injectable } from '@nestjs/common'
import { BudRepository } from './repositories/bud.repository'

@Injectable()
export class BudService {
  constructor(private readonly budRepository: BudRepository) {}

  async getAllBuds(): Promise<object> {
    this.budRepository.connectDatabase()
    try {
      const response: object = await this.budRepository.getAllBuds()
      return response
    } catch (error) {
      return error
    } finally {
      this.budRepository.disconnectDatabase()
    }
  }
}
