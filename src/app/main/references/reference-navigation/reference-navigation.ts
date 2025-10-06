import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reference-navigation',
  imports: [CommonModule],
  templateUrl: './reference-navigation.html',
  styleUrl: './reference-navigation.scss',
})
export class ReferenceNavigation {
  @Input({ required: true }) currentIndex: number = 0;
  @Input({ required: true }) totalItems: number = 0;
  @Output() navigate = new EventEmitter<'left' | 'right'>();

  onNavigate(direction: 'left' | 'right') {
    this.navigate.emit(direction);
  }
}
