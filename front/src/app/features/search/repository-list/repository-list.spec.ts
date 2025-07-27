import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryList } from './repository-list';

describe('RepositoryList', () => {
  let component: RepositoryList;
  let fixture: ComponentFixture<RepositoryList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepositoryList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepositoryList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
