import { Module } from '@nestjs/common'
import { ComboController } from './combo.controller'
import { ComboService } from './combo.service'
import { ComboRepository } from './repositories/combo.repository'

@Module({
  controllers: [ComboController],
  providers: [ComboService, ComboRepository],
})
export class ComboModule {}
