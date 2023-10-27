import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

/**
 * 인증을 위한 서드파티 모듈 추가
 */
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './jwt.strategy';

export const jwtSecret = process.env.JWT_OPENSSL_BASE64;

@Module({
    imports: [
        PrismaModule,
        PassportModule,
        JwtModule.register({
            secret: jwtSecret,
            signOptions: {
                expiresIn: '5m', // ex) 30s, 7d, 24h
            },
        }),
        UsersModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
