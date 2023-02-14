import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import Role from 'src/Users/enum/role.enum';

@Injectable()
export class jwtstrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SPI',
    });
  }
  async validate(payload: { userId: number; role: Role[] }) {
    // check if user in the token actually exist

    return {
      userId: payload.userId,
      role: payload.role,
    };
  }
}
