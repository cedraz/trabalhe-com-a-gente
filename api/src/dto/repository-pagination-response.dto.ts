import { Repository } from 'src/entity';
import { ApiProperty } from '@nestjs/swagger';
import { GithubSearchResponse } from './github-search-response.dto';

export class RepositoryPaginationResponse extends GithubSearchResponse<Repository> {
  @ApiProperty({
    type: [Repository],
  })
  declare items: Repository[];
}
