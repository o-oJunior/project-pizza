import { Module } from '@nestjs/common'
import { FlavorController } from './flavor.controller'
import { FlavorService } from './flavor.service'
import { FlavorRepository } from './repositories/flavor.repository'

@Module({
  controllers: [FlavorController],
  providers: [FlavorService, FlavorRepository],
})
export class FlavorModule {}
