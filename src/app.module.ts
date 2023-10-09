import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { CommonModule } from './common/common.module';
import { PrismaModule } from './prisma/prisma.module';
import { ArticlesModule } from './articles/articles.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        // Service Module
        PrismaModule,
        ArticlesModule,
        UsersModule,
        AuthModule,

        // Middleware Module
        // CommonModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
