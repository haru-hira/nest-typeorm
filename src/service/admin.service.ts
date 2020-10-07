import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(private readonly jwtService: JwtService) {}
  sign(): any {
    return { access_token: this.jwtService.sign({ sub: 'MJcbiFDNOfPpZz+6SxzL5IZ0O4iv' }) };
  }
}
