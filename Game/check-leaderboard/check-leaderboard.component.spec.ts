import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckLeaderboardComponent } from './check-leaderboard.component';

describe('CheckLeaderboardComponent', () => {
  let component: CheckLeaderboardComponent;
  let fixture: ComponentFixture<CheckLeaderboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckLeaderboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
