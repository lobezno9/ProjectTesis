import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountInventoryComponent } from './count-inventory.component';

describe('CountInventoryComponent', () => {
  let component: CountInventoryComponent;
  let fixture: ComponentFixture<CountInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
