import {
  Component,
  signal,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  Renderer2,
  HostListener,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements AfterViewInit, OnDestroy {
  protected readonly title = signal('portfolio');

  @ViewChild('cursorShadow') cursorShadow!: ElementRef<HTMLDivElement>;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.updateCursorPosition(window.innerWidth / 2, window.innerHeight / 2);
  }

  ngOnDestroy() {}

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.updateCursorPosition(event.clientX, event.clientY);
    this.checkHoverState(event);
  }

  @HostListener('document:mouseleave')
  onMouseLeave() {
    this.renderer.addClass(document.body, 'cursor-hidden');
  }

  @HostListener('document:mouseenter')
  onMouseEnter() {
    this.renderer.removeClass(document.body, 'cursor-hidden');
  }

  private updateCursorPosition(x: number, y: number) {
    if (this.cursorShadow) {
      this.renderer.setStyle(this.cursorShadow.nativeElement, 'left', `${x}px`);
      this.renderer.setStyle(this.cursorShadow.nativeElement, 'top', `${y}px`);
    }
  }

  private checkHoverState(event: MouseEvent) {
    const target = event.target as HTMLElement;

    const isInteractive = target.closest(
      'a, button, [role="button"], input, textarea, select, .clickable'
    );

    if (isInteractive) {
      this.renderer.addClass(this.cursorShadow.nativeElement, 'cursor-hover');
    } else {
      this.renderer.removeClass(this.cursorShadow.nativeElement, 'cursor-hover');
    }
  }
}
