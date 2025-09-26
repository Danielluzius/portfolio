import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageSwitch } from './language-switch';

describe('LanguageSwitch', () => {
  let component: LanguageSwitch;
  let fixture: ComponentFixture<LanguageSwitch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageSwitch],
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageSwitch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit and update active language when switching', () => {
    const emitSpy = spyOn(component.languageChange, 'emit');

    component.setLanguage('DE');

    expect(component.activeLanguage).toBe('DE');
    expect(emitSpy).toHaveBeenCalledOnceWith('DE');
  });

  it('should ignore redundant language selection', () => {
    const emitSpy = spyOn(component.languageChange, 'emit');

    component.setLanguage('EN');

    expect(component.activeLanguage).toBe('EN');
    expect(emitSpy).not.toHaveBeenCalled();
  });
});
