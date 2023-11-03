import { Controller, Get } from '@nestjs/common'
import { BorderService } from 'src/border/border.service'

@Controller('api/border')
export class BorderController {
  constructor(private readonly borderService: BorderService) {}

  @Get()
  getAllBorders(): object {
    return this.borderService.getAllBorders()
  }
}
