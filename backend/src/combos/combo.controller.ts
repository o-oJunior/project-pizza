import { Controller, Get } from '@nestjs/common'
import { ComboService } from 'src/combos/combo.service'

@Controller('api')
export class ComboController {
  constructor(private readonly comboService: ComboService) {}

  @Get('combo')
  getAllCombos(): object {
    return this.comboService.getAllCombos()
  }
}
