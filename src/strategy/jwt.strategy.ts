import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
export const JWT_SECRET_KEY = 'jwtSecretKey';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // exp(有効期限)を無視し、期限を過ぎていても認証できるようにする
      ignoreExpiration: true,
      secretOrKey: JWT_SECRET_KEY,
    });
  }

  async validate(payload: { isAdmin: boolean }): Promise<boolean> {
    if (payload.isAdmin === true) {
      return true;
    } else {
      return false;
    }
  }
}
