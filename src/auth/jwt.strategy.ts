import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { jwtSecret } from './auth.module';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtSecret,
        });
    }

    // 401 UnAuthorized :권한 없는 유저 validate함수로 검증
    async validate(payload: { userId: number }) {
        const user = await this.usersService.findOne(payload.userId);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
