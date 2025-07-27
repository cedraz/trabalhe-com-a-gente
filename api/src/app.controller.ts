import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse } from '@nestjs/swagger';
import {
  IssuePaginationResponseDto,
  RepositoryPaginationResponse,
  SearchPaginationFilterDto,
} from './dto';

@Controller('search')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('repositories')
  @ApiOkResponse({
    type: RepositoryPaginationResponse,
  })
  async getRepositories(@Query() query: SearchPaginationFilterDto) {
    return this.appService.getRepositories(query);
  }

  @Get('issues')
  @ApiOkResponse({
    type: IssuePaginationResponseDto,
  })
  async getIssues(@Query() query: SearchPaginationFilterDto) {
    return this.appService.getIssues(query);
  }
}
