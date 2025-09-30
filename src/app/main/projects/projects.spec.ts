import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Projects } from './projects';

describe('Projects', () => {
  let component: Projects;
  let fixture: ComponentFixture<Projects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Projects],
    }).compileComponents();

    fixture = TestBed.createComponent(Projects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compute preview alignment based on active project index', () => {
    const instance = component as unknown as {
      previewAlignment: string;
      setActiveProject: (index: number) => void;
      clearActiveProject: () => void;
      projects: unknown[];
    };

    expect(instance.previewAlignment).toBe('center');

    instance.setActiveProject(0);
    expect(instance.previewAlignment).toBe('top');

    instance.setActiveProject(1);
    expect(instance.previewAlignment).toBe('center');

    instance.setActiveProject(instance.projects.length - 1);
    expect(instance.previewAlignment).toBe('bottom');

    instance.clearActiveProject();
    expect(instance.previewAlignment).toBe('center');
  });
});
