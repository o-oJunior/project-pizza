import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { AddressService } from './address.service'
import { CreateAddressDto } from './dto/createAddress.dto'

@Controller('api/address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('idClient/:idClient')
  getAddressByIDClient(@Param('idClient') idClient: number): object {
    return this.addressService.getAddressByIDClient(idClient)
  }

  @Post('create')
  createAddress(@Body() createAddressDto: CreateAddressDto): object {
    return this.addressService.createAddress(createAddressDto)
  }

  @Delete('delete/:id')
  deletedAddress(@Param('id') id: number): object {
    return this.addressService.deleteAddress(id)
  }
}
