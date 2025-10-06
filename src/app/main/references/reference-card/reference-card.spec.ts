import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceCard } from './reference-card';

describe('ReferenceCard', () => {
  let component: ReferenceCard;
  let fixture: ComponentFixture<ReferenceCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferenceCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferenceCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
