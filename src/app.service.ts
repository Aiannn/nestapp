import { Get, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getUsers() {
    return 'users';
  }
}
