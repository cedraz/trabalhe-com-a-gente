import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { Repository } from '../../core/models/repository.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { APIService } from '../../core/services/api.service';
import { Issue } from '../../core/models/issue.model';
import { RepositoryList } from './repository-list/repository-list';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueList } from './issue-list/issue-list';
import { of, switchMap, tap, from } from 'rxjs';

type SearchCategory = 'repositories' | 'issues';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule, RepositoryList, IssueList],
  templateUrl: './search.html',
})
export class Search implements OnInit {
  private apiService = inject(APIService);

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public query: string = '';
  public currentSearchQuery: string = '';
  public activeCategory: SearchCategory = 'repositories';
  public isLoading: boolean = false;
  public hasSearched: boolean = false;

  public repositoriesTotalCount: number = 0;
  public issuesTotalCount: number = 0;

  public repositories: Repository[] = [];
  public issues: Issue[] = [];

  page: number = 1;
  perPage: number = 10;

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        tap((params) => {
          this.isLoading = true;
          this.query = params.get('q') || '';
          this.page = Number(params.get('page') || '1');
          this.activeCategory =
            (params.get('category') as SearchCategory) || 'repositories';
          this.hasSearched = !!this.query;
        }),
        switchMap(() => {
          if (!this.hasSearched) {
            this.isLoading = false;
            return of(null);
          }

          const isNewSearchTerm = this.query !== this.currentSearchQuery;
          if (isNewSearchTerm) {
            this.currentSearchQuery = this.query;
            return from(
              Promise.all([this.searchRepositories(), this.searchIssues()])
            );
          }

          if (this.activeCategory === 'repositories') {
            return from(this.searchRepositories());
          } else {
            return from(this.searchIssues());
          }
        })
      )
      .subscribe({
        next: () => {
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Ocorreu um erro no fluxo de busca:', err);
          this.isLoading = false;
        },
      });
  }

  public async onSubmit(): Promise<void> {
    if (!this.query.trim()) {
      return;
    }

    this.router.navigate([], {
      queryParams: { q: this.query, page: 1, category: 'repositories' },
    });
  }

  public async changePage(newPage: number): Promise<void> {
    this.router.navigate([], {
      queryParams: { page: newPage },
      queryParamsHandling: 'merge',
    });
  }

  public async selectCategory(category: SearchCategory): Promise<void> {
    if (this.activeCategory === category || !this.hasSearched) return;

    this.router.navigate([], {
      queryParams: { category: category, page: 1 },
      queryParamsHandling: 'merge',
    });
  }

  private async searchRepositories(): Promise<void> {
    try {
      const data = await this.apiService.searchRepositories({
        q: this.query,
        page: this.page,
        perPage: this.perPage,
      });
      this.repositories = data.items;
      this.repositoriesTotalCount = data.total_count;
    } catch (error) {
      console.error('Error fetching repositories:', error);
      this.repositories = [];
      this.repositoriesTotalCount = 0;
    }
  }

  private async searchIssues(): Promise<void> {
    try {
      const data = await this.apiService.searchIssues({
        q: this.query,
        page: this.page,
        perPage: this.perPage,
      });

      this.issues = data.items;
      this.issuesTotalCount = data.total_count;
    } catch (error) {
      console.error('Error fetching issues:', error);
      this.issues = [];
      this.issuesTotalCount = 0;
    }
  }
}
