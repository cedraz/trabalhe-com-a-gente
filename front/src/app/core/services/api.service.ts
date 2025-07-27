import { Injectable } from '@angular/core';
import { PaginationQuery } from '../models/pagination-query.model';
import { SearchResponse } from '../models/search-response.model';
import { Repository } from '../models/repository.model';
import { Issue } from '../models/issue.model';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private apiUrl = 'http://localhost:3000';

  async searchRepositories(
    query: PaginationQuery
  ): Promise<SearchResponse<Repository>> {
    const url = new URL(`${this.apiUrl}/search/repositories`);
    url.searchParams.append('q', query.q);
    url.searchParams.append('page', query.page.toString());
    url.searchParams.append('per_page', query.perPage.toString());

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch repositories');
    }

    const data: SearchResponse<Repository> = await response.json();
    return data;
  }

  async searchIssues(query: PaginationQuery): Promise<SearchResponse<Issue>> {
    const url = new URL(`${this.apiUrl}/search/issues`);
    url.searchParams.append('q', query.q);
    url.searchParams.append('page', query.page.toString());
    url.searchParams.append('per_page', query.perPage.toString());

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch issues');
    }

    const data: SearchResponse<Issue> = await response.json();
    return data;
  }
}
