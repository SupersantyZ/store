import { Injectable, Inject } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import config from './config';
import { Client } from 'pg';

@Injectable()
export class AppService {
  constructor(
    //@Inject('API_KEY') private apikey: string,
    @Inject('TASKS') private tasks: any[],
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('PG') private clientPg: Client,
  ) { }
  getHello(): string {
    const apiKey = this.configService.apiKey; // Obtiene la API key
    const name = this.configService.database.databaseName; // Obtiene el nombre de la base de datos
    return `Hello world ${apiKey} y estas en ${name} con el apikey ${apiKey}`; // Devuelve un mensaje con los valores
  }

  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          console.error('Error en la consulta:', err);
          reject(err);
        } else {
          console.log('Resultado de la consulta:', res);
          resolve(res?.rows);
        }
      });
    })

  }
}
