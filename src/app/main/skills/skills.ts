import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';
import { SkillsService } from '../../shared/services/skills.service';

@Component({
  standalone: true,
  selector: 'app-skills',
  imports: [NgFor, TranslocoPipe],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  private readonly skillsService = inject(SkillsService);

  public readonly skillIcons = this.skillsService.getSkills();
}
