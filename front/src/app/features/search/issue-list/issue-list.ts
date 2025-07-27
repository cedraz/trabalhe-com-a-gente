import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Issue } from '../../../core/models/issue.model';
import { DatePipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroInformationCircle } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-issue-list',
  imports: [DatePipe, NgIcon],
  viewProviders: [
    provideIcons({
      heroInformationCircle,
    }),
  ],
  templateUrl: './issue-list.html',
})
export class IssueList {
  @Input() issues: Issue[] = [];
  @Input() currentPage: number = 1;
  @Input() totalResults: number = 0;
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
