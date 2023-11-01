import { Controller, Get } from '@nestjs/common'
import { FlavorService } from 'src/flavor/flavor.service'

@Controller('api')
export class FlavorController {
  constructor(private readonly flavorService: FlavorService) {}

  @Get('flavor')
  getAllFlavors(): object {
    return this.flavorService.getAllFlavors()
  }
}
