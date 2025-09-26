import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Menu } from './menu';

describe('Menu', () => {
  let component: Menu;
  let fixture: ComponentFixture<Menu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Menu],
    }).compileComponents();

    fixture = TestBed.createComponent(Menu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set first item active by default', () => {
    expect(component.activeItem).toBe('about');
    const links = fixture.nativeElement.querySelectorAll('.menu__link');
    expect(links[0].classList).toContain('menu__link--active');
  });

  it('should activate clicked item', () => {
    const links: NodeListOf<HTMLAnchorElement> =
      fixture.nativeElement.querySelectorAll('.menu__link');

    links[1].click();
    fixture.detectChanges();

    expect(component.activeItem).toBe('skills');
    expect(links[1].classList).toContain('menu__link--active');
    expect(links[0].classList).not.toContain('menu__link--active');
  });
});
