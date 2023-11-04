import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { CreateClientDto } from './dto/createClient.dto'
import { ClientService } from './client.service'
import { UpdateClientDto } from './dto/updateClient.dto'

@Controller('api/client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  getClientByID(@Query('id') id: number): object {
    return this.clientService.getClientByID(id)
  }

  @Post('create')
  createClient(@Body() createClientDto: CreateClientDto): object {
    return this.clientService.createClient(createClientDto)
  }

  @Put('update')
  updateClientByID(@Query('id') id: number, @Body() updateClientDto: UpdateClientDto): object {
    return this.clientService.updateClientByID(id, updateClientDto)
  }

  @Delete('delete')
  deleteClientByID(@Query('id') id: number): object {
    return this.clientService.deleteClientByID(id)
  }
}
