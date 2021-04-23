import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplayCardComponent } from './replay-card.component';

describe('ReplayCardComponent', () => {
  let component: ReplayCardComponent;
  let fixture: ComponentFixture<ReplayCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplayCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
