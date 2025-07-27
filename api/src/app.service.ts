import { Injectable } from '@nestjs/common';
import { GithubSearchResponse } from './dto/github-search-response.dto';
import { Issue, Repository } from './entity';
import { SearchPaginationFilterDto } from './dto/search-pagination-filter.dto';

@Injectable()
export class AppService {
  private githubBaseUrl = 'https://api.github.com';

  async getRepositories(
    dto: SearchPaginationFilterDto,
  ): Promise<GithubSearchResponse<Repository>> {
    const url = new URL(`${this.githubBaseUrl}/search/repositories`);

    url.searchParams.append('per_page', dto.per_page.toString());
    url.searchParams.append('page', dto.page.toString());
    url.searchParams.append('q', dto.q);

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(
        `Status Code: ${response.status},GitHub API request failed: ${response.statusText}`,
      );
    }

    return response.json() as Promise<GithubSearchResponse<Repository>>;
  }

  async getIssues(
    dto: SearchPaginationFilterDto,
  ): Promise<GithubSearchResponse<Issue>> {
    const url = new URL(`${this.githubBaseUrl}/search/issues`);

    url.searchParams.append('per_page', dto.per_page.toString());
    url.searchParams.append('page', dto.page.toString());
    url.searchParams.append('q', dto.q);

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`GitHub API request failed: ${response.statusText}`);
    }

    return response.json() as Promise<GithubSearchResponse<Issue>>;
  }
}
