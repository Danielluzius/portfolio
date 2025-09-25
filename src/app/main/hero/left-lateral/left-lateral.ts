import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-left-lateral',
  imports: [],
  templateUrl: './left-lateral.html',
  styleUrl: './left-lateral.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftLateral {}
