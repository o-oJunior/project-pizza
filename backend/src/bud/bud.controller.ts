import { Controller, Get } from '@nestjs/common'
import { BudService } from 'src/bud/bud.service'

@Controller('api')
export class BudController {
  constructor(private readonly budService: BudService) {}

  @Get('bud')
  getAllBuds(): object {
    return this.budService.getAllBuds()
  }
}
