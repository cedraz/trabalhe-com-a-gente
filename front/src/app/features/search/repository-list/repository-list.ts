import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Repository } from '../../../core/models/repository.model';
import { DatePipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroStar } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-repository-list',
  imports: [DatePipe, NgIcon],
  templateUrl: './repository-list.html',
  viewProviders: [
    provideIcons({
      heroStar,
    }),
  ],
})
export class RepositoryList {
  @Input() repositories: Repository[] = [];
  @Input() currentPage: number = 1;
  @Input() totalResults: number = 0;
  @Input() changePage: (page: number) => void = () => {};
  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    if (this.totalResults === 0) {
      return 0;
    }

    return Math.ceil(this.totalResults / 10);
  }

  public previousPage(): void {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  public nextPage(): void {
    this.pageChange.emit(this.currentPage + 1);
  }
}
