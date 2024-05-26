import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';
import { AccessKey, AccessKeySchema } from '../../schemas/access-key.schema';
import { RateLimitMiddleware } from '../../middlewares/rate-limiting.middleware';
import { KeyValidationMiddleware } from '../../middlewares/key-validation.middleware';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL),  
    MongooseModule.forFeature([{ name: AccessKey.name, schema: AccessKeySchema }]),
  ],
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(KeyValidationMiddleware,RateLimitMiddleware)
      .forRoutes({ path: 'token', method: RequestMethod.GET });
  }
}
