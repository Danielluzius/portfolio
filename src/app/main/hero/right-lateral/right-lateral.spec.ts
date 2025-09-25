import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightLateral } from './right-lateral';

describe('RightLateral', () => {
  let component: RightLateral;
  let fixture: ComponentFixture<RightLateral>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RightLateral]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightLateral);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
