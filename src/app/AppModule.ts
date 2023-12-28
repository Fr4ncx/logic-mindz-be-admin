import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealthCheckModule } from '../health-check/health-check.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from '../common/common.module';
import { LoggerModule } from 'nestjs-pino';
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [
    CommonModule,
    ConfigModule.forRoot({
      envFilePath: './environments/.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `${configService.get('MONGODB_CONNECTION_STRING')}`,
      }),
      inject: [ConfigService],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.LOG_LEVEL || 'trace',
        redact: ['request.headers.authorization'],
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            singleLine: true,
            levelFirst: false,
            translateTime: "yyyy-MM-dd'T'HH:mm:ss.l'Z'",
            messageFormat: '[{req.id}] [{req.headers.x-correlation-id}] [{context}] {msg}',
            ignore: 'pid,hostname,context,req,res,responseTime', //fields to omit otherwise they will print automatically
            errorLikeObjectKeys: ['err', 'error'],
          },
        },
      },
    }),
    HealthCheckModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
