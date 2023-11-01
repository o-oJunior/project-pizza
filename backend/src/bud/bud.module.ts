import { Module } from '@nestjs/common'
import { BudController } from './bud.controller'
import { BudService } from './bud.service'
import { BudRepository } from './repositories/bud.repository'

@Module({
  controllers: [BudController],
  providers: [BudService, BudRepository],
})
export class BudModule {}
