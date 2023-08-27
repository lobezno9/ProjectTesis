import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountListComponent } from './count-list.component';

describe('CountListComponent', () => {
  let component: CountListComponent;
  let fixture: ComponentFixture<CountListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
