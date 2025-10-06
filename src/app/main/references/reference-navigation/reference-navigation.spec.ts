import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceNavigation } from './reference-navigation';

describe('ReferenceNavigation', () => {
  let component: ReferenceNavigation;
  let fixture: ComponentFixture<ReferenceNavigation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferenceNavigation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferenceNavigation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
