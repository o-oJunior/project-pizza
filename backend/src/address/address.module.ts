import { Module } from '@nestjs/common'
import { AddressController } from './address.controller'
import { AddressService } from './address.service'
import { AddressRepository } from './repositories/address.repository'
import { ClientRepository } from 'src/client/repositories/client.repository'

@Module({
  controllers: [AddressController],
  providers: [AddressService, AddressRepository, ClientRepository],
})
export class AddressModule {}
