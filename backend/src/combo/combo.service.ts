import { Injectable } from '@nestjs/common'
import { ComboRepository } from './repositories/combo.repository'

@Injectable()
export class ComboService {
  constructor(private readonly comboRepository: ComboRepository) {}

  async getAllCombos(): Promise<object> {
    this.comboRepository.connectDatabase()
    try {
      const response: object = await this.comboRepository.getAllCombos()
      return { statusCode: 200, data: response }
    } catch (error) {
      return this.comboRepository.statusCode500
    } finally {
      this.comboRepository.disconnectDatabase()
    }
  }
}
