import { Injectable, NestMiddleware, BadRequestException, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RedisClientType, createClient } from 'redis';


@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private redisClient: RedisClientType;

  constructor() {
    this.redisClient = createClient({
      password: process.env.REDIS_PASSWORD,
      socket: {
          host: process.env.REDIS_HOST,
          port: parseInt(process.env.REDIS_PORT,10)
      }
    }); 
    this.redisClient.connect();
  }

  async use(req: Request, res: Response, next: NextFunction) {
   const keyDetails = req.body['keyDetails'];
   if(keyDetails.rateLimit===0){
    throw new BadRequestException('Rate limit exceeded');
   }
   const accessKey = req.headers['x-access-key'];
   // publish rate limit -1
   await this.redisClient.publish('rate-limit',JSON.stringify({accessKey:accessKey}))
    next();
  }
}
