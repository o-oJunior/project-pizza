import { Injectable } from '@nestjs/common'
import { BorderRepository } from './repositories/border.repository'

@Injectable()
export class BorderService {
  constructor(private readonly borderRepository: BorderRepository) {}

  async getAllBorders(): Promise<object> {
    this.borderRepository.connectDatabase()
    try {
      const response = await this.borderRepository.getAllBorders()
      this.borderRepository.disconnectDatabase()
      return response
    } catch (error) {
      this.borderRepository.disconnectDatabase()
      return error
    }
  }
}
