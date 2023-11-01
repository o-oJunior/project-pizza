import { Injectable } from '@nestjs/common'
import { ComboRepository } from './repositories/combo.repository'

@Injectable()
export class ComboService {
  constructor(private readonly comboRepository: ComboRepository) {}

  async getAllCombos(): Promise<object> {
    this.comboRepository.connectDatabase()
    try {
      const response: object = await this.comboRepository.getAllCombos()
      this.comboRepository.disconnectDatabase()
      return response
    } catch (error) {
      this.comboRepository.disconnectDatabase()
      return error
    }
  }
}
