import { Injectable } from '@nestjs/common';

@Injectable()
// diceService.ts
export class DiceService {
  lanzarDado(lados: number): number {
    return Math.floor(Math.random() * lados) + 1;
  }

  lanzarVariosDados(lados: number, cantidad: number): number[] {
    const resultados: number[] = [];
    for (let i = 0; i < cantidad; i++) {
      resultados.push(this.lanzarDado(lados));
    }
    return resultados;
  }
}
