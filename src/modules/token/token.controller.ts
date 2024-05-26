import { Controller, Get, Req, UseGuards, UseInterceptors, Headers } from '@nestjs/common';
import { Request } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';

@ApiTags('token')
@Controller('token')
export class TokenController {
  @ApiOperation({ summary: 'Fetch token information' })
  @ApiResponse({ status: 200, description: 'Token information fetched successfully' })
  @Get()
  @ApiHeader({name:'x-access-key',description:"access key.", required:true})
  getTokenInfo(@Headers() headers:any,@Req() req: Request): any {
    // Mock response for token information
    return {
      token: req.headers['x-access-key'],
      info: 'This is mock token information',
      issuedAt: new Date(),
    };
  }
}
