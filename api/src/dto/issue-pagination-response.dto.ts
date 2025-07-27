import { ApiProperty } from '@nestjs/swagger';
import { Issue } from 'src/entity';
import { GithubSearchResponse } from './github-search-response.dto';

export class IssuePaginationResponseDto extends GithubSearchResponse<Issue> {
  @ApiProperty({
    type: [Issue],
  })
  declare items: Issue[];
}
