import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftLateral } from './left-lateral';

describe('LeftLateral', () => {
  let component: LeftLateral;
  let fixture: ComponentFixture<LeftLateral>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeftLateral]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeftLateral);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
