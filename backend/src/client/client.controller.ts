import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common'
import { CreateClientDto } from './dto/createClient.dto'
import { ClientService } from './client.service'
import { UpdateClientDto } from './dto/updateClient.dto'
import { AuthClientDto } from './dto/authClient.dto'
import { Request, Response } from 'express'

@Controller('api/client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get('get/:id')
  getClientByID(@Param('id') id: number): object {
    return this.clientService.getClientByID(id)
  }

  @Get('token/validate')
  validateToken(@Req() req: Request) {
    const token = req.cookies && req.cookies['token']
    return this.clientService.validateToken(token)
  }

  @Get('logout')
  logout(@Res() res: Response) {
    res.cookie('token', {
      httpOnly: true,
      expires: new Date(0),
    })

    res.json({ statusCode: 200, message: 'Usuário desconectado com sucesso!' })
  }

  @Post('create')
  createClient(@Body() createClientDto: CreateClientDto): object {
    return this.clientService.createClient(createClientDto)
  }

  @Post('auth')
  async authClient(
    @Body() authClientDto: AuthClientDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    type TResults = {
      statusCode?: number
      data?: object
      token?: string
    }
    const results: TResults = await this.clientService.authClient(authClientDto)
    const expires = 1000 * 60 * 60 * 24 * 30
    const token = results.token
    delete results.token

    if (token) {
      res
        .cookie('token', token, {
          httpOnly: true,
          maxAge: expires,
          sameSite: 'none',
          secure: false,
        })
        .status(200)
        .json(results)
    } else {
      res.status(401).json(results)
    }
  }

  @Put('update/:id')
  updateClientByID(@Param('id') id: number, @Body() updateClientDto: UpdateClientDto): object {
    return this.clientService.updateClientByID(id, updateClientDto)
  }

  @Delete('delete/:id')
  deleteClientByID(@Param('id') id: number): object {
    return this.clientService.deleteClientByID(id)
  }
}
