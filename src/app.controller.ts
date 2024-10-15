import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('App') // Agrupa los endpoints bajo una etiqueta llamada 'App'
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @ApiOperation({ summary: 'Get hello message' }) // Describe la operación
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/ruta/')
  @ApiOperation({ summary: 'Get hola message' })
  hello(): string {
    return 'hola';
  }

  @Get('tasks')
  tasks() {
    return this.appService.getTasks();
  }
  @Get('hello')
  @ApiOperation({ summary: 'Another hello message' })
  getHello2(): string {
    return 'hola';
  }
}
