import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccessKey, AccessKeyDocument } from 'src/schemas/access-key.schema';

@Injectable()
export class TokenService {
    constructor(
        @InjectModel(AccessKey.name) private accessKeyModel: Model<AccessKeyDocument>,
      ) {}

      async getPlanDetails(keyValue: string): Promise<AccessKey> {
        try {
          const accessKey = await this.accessKeyModel.findOne({name:keyValue}).exec();
          if (!accessKey) {
            throw new NotFoundException('Access key not found');
          }
          return accessKey;
        } catch (error) {
          if (error instanceof NotFoundException) {
            throw error;
          } else {
            throw new InternalServerErrorException('Failed to retrieve plan details');
          }
        }
      }


}
