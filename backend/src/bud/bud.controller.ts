import { Controller, Get } from '@nestjs/common'
import { BudService } from 'src/bud/bud.service'

@Controller('api/bud')
export class BudController {
  constructor(private readonly budService: BudService) {}

  @Get()
  getAllBuds(): object {
    return this.budService.getAllBuds()
  }
}
