import { Controller, Get } from '@nestjs/common'
import { FlavorService } from 'src/flavor/flavor.service'

@Controller('api/flavor')
export class FlavorController {
  constructor(private readonly flavorService: FlavorService) {}

  @Get()
  getAllFlavors(): object {
    return this.flavorService.getAllFlavors()
  }
}
