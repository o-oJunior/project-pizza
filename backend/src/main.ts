import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import 'dotenv/config'

const port = process.env.PORT

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
  app.use(cookieParser())
  await app.listen(port)
}
bootstrap()
