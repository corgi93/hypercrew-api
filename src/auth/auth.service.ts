import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthEntity } from './entity/auth.entity';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    async login(email: string, password: string): Promise<AuthEntity> {
        // 받은 email로 user data fetch
        const user = await this.prisma.user.findUnique({ where: { email } });

        if (!user) {
            throw new NotFoundException(`No user found for email: ${email}`);
        }

        // user password 체크
        const isPasswordValid = user.password === password;
        if (!isPasswordValid) {
            throw new UnauthorizedException(`invalid password`);
        }

        // user id가 담긴 jwt 생성해서 return
        return {
            accessToken: this.jwtService.sign({ userId: user.id }),
        };
    }
}
