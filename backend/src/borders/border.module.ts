import { Module } from '@nestjs/common'
import { BorderController } from './border.controller'
import { BorderService } from './border.service'
import { BorderRepository } from './repositories/border.repository'

@Module({
  controllers: [BorderController],
  providers: [BorderService, BorderRepository],
})
export class BorderModule {}
