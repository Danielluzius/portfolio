import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProjects } from './all-projects';

describe('AllProjects', () => {
  let component: AllProjects;
  let fixture: ComponentFixture<AllProjects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllProjects],
    }).compileComponents();

    fixture = TestBed.createComponent(AllProjects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
