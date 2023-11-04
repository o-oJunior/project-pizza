import { Injectable } from '@nestjs/common'
import { BorderRepository } from './repositories/border.repository'

@Injectable()
export class BorderService {
  constructor(private readonly borderRepository: BorderRepository) {}

  async getAllBorders(): Promise<object> {
    this.borderRepository.connectDatabase()
    try {
      const response = await this.borderRepository.getAllBorders()
      return { statusCode: 200, data: response }
    } catch (error) {
      return this.borderRepository.statusCode500
    } finally {
      this.borderRepository.disconnectDatabase()
    }
  }
}
