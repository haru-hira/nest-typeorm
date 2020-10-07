import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // exp(有効期限)を無視し、期限を過ぎていても認証できるようにする
      ignoreExpiration: true,
      secretOrKey: fs.readFileSync('./src/asset/key.pem'),
      algorithms: ['RS256'],
    });
  }

  async validate(payload: { sub: string }): Promise<{ name: string; isAdmin: boolean }> {
    if (payload.sub) {
      return { name: 'Tom', isAdmin: true };
    } else {
      throw new UnauthorizedException();
    }
  }
}
