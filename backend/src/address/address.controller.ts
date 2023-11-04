import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common'
import { AddressService } from './address.service'
import { CreateAddressDto } from './dto/createAddress.dto'

@Controller('api/address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  getAddressByIDClient(@Query('idClient') idClient: number) {
    return this.addressService.getAddressByIDClient(idClient)
  }

  @Post('create')
  createAddress(@Body() createAddressDto: CreateAddressDto): object {
    return this.addressService.createAddress(createAddressDto)
  }

  @Delete('delete')
  deletedAddress(@Query('id') id: number, @Query('idClient') idClient: number) {
    return this.addressService.deleteAddress(id, idClient)
  }
}
