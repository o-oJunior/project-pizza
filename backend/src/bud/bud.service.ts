import { Injectable } from '@nestjs/common'
import { BudRepository } from './repositories/bud.repository'

@Injectable()
export class BudService {
  constructor(private readonly budRepository: BudRepository) {}

  async getAllBuds(): Promise<object> {
    this.budRepository.connectDatabase()
    try {
      const response: object = await this.budRepository.getAllBuds()
      return { statusCode: 200, data: response }
    } catch (error) {
      return this.budRepository.statusCode500
    } finally {
      this.budRepository.disconnectDatabase()
    }
  }
}
