import { Module } from '@nestjs/common'
import { DrinkController } from './drink.controller'
import { DrinkService } from './drink.service'
import { DrinkRepository } from './repositories/drink.repository'

@Module({
  controllers: [DrinkController],
  providers: [DrinkService, DrinkRepository],
})
export class DrinkModule {}
