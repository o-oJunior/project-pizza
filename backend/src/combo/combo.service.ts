import { Injectable } from '@nestjs/common'
import { ComboRepository } from './repositories/combo.repository'

@Injectable()
export class ComboService {
  constructor(private readonly comboRepository: ComboRepository) {}

  async getAllCombos(): Promise<object> {
    this.comboRepository.connectDatabase()
    try {
      const response: object = await this.comboRepository.getAllCombos()
      return response
    } catch (error) {
      return error
    } finally {
      this.comboRepository.disconnectDatabase()
    }
  }
}
