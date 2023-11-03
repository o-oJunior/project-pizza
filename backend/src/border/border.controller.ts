import { Controller, Get } from '@nestjs/common'
import { BorderService } from 'src/borders/border.service'

@Controller('api')
export class BorderController {
  constructor(private readonly borderService: BorderService) {}

  @Get('border')
  getAllBorders(): object {
    return this.borderService.getAllBorders()
  }
}
