import { Controller, Get, Request, Response, Query } from '@nestjs/common';
import { DiceService } from './dados.service';

@Controller('dados')
export class DiceController {
  // Inyección del servicio de dados
  constructor(private readonly diceService: DiceService) {}

  @Get('/d20')
  getD20() {
    return this.diceService.lanzarDado(20);
  }

  @Get('d6')
  getD6() {
    return this.diceService.lanzarDado(6);
  }

  @Get('d4')
  getD4() {
    return this.diceService.lanzarDado(4);
  }

  @Get('d8')
  getD8() {
    return this.diceService.lanzarDado(8);
  }

  @Get('d10')
  getD10() {
    return this.diceService.lanzarDado(10);
  }

  @Get('d12')
  getD12() {
    return this.diceService.lanzarDado(12);
  }

  @Get('d100')
  getD100() {
    return this.diceService.lanzarDado(100);
  }
}
