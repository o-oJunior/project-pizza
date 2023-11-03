import { Controller, Get } from '@nestjs/common'
import { ComboService } from 'src/combo/combo.service'

@Controller('api/combo')
export class ComboController {
  constructor(private readonly comboService: ComboService) {}

  @Get()
  getAllCombos(): object {
    return this.comboService.getAllCombos()
  }
}
