import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getVersion(
    query: { all?: boolean },
    params: { type: string }): string | { number: number; date: string; creator: string } {

    if (params.type === 'raw') {
      return '<h1>Version1</h1>'
    }

    if (query.all || params.type === 'json') {
      return {
        number: 1,
        date: new Date().toLocaleString(),
        creator: "John P."
      }
    }
    throw new HttpException('Tipo no encontrado', 404)
  }
}
