import { Module } from '@nestjs/common';
import { TokenModule } from './modules/token/token.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ConfigModule.forRoot()  , TokenModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
