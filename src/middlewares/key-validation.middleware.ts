import { Injectable, NestMiddleware, BadRequestException, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TokenService } from 'src/modules/token/token.service';

@Injectable()
export class KeyValidationMiddleware implements NestMiddleware {
  constructor(private readonly tokenService: TokenService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const accessKey = req.headers['x-access-key'];
    if (!accessKey) {
      throw new BadRequestException('Access key is required');
    }

    const keyDetails = await this.tokenService.getPlanDetails(accessKey.toString());
    if (!keyDetails) {
      throw new NotFoundException('Invalid access key');
    }
    req.body['keyDetails'] = keyDetails;

    if (new Date(keyDetails.expirationTime) < new Date()) {
      throw new BadRequestException('Access key expired');
    }
    if(keyDetails.status!=='active'){
        throw new BadRequestException('Access key not Active.');


    }

    next();
  }
}
