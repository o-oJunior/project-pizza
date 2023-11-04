import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { CreateClientDto } from './dto/createClient.dto'
import { ClientService } from './client.service'
import { UpdateClientDto } from './dto/updateClient.dto'

@Controller('api/client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  getUserByID(@Query('id') id: number): object {
    return this.clientService.getUserByID(id)
  }

  @Post('create')
  createUser(@Body() createClientDto: CreateClientDto): object {
    return this.clientService.createUser(createClientDto)
  }

  @Put('update')
  updateUserByID(@Query('id') id: number, @Body() updateClientDto: UpdateClientDto): object {
    return this.clientService.updateUserByID(id, updateClientDto)
  }

  @Delete('delete')
  deleteUserByID(@Query('id') id: number): object {
    return this.clientService.deleteUserByID(id)
  }
}
