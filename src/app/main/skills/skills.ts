import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-skills',
  imports: [NgFor],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  public readonly skillIcons = [
    { label: 'HTML', icon: 'assets/icon/skill-icon/html_icon.png' },
    { label: 'CSS', icon: 'assets/icon/skill-icon/css_icon.png' },
    { label: 'JavaScript', icon: 'assets/icon/skill-icon/javascript_icon.png' },
    { label: 'Material Design', icon: 'assets/icon/skill-icon/material_design_icon.png' },
    { label: 'TypeScript', icon: 'assets/icon/skill-icon/typescript_icon.png' },
    { label: 'Angular', icon: 'assets/icon/skill-icon/angular_icon.png' },
    { label: 'Firebase', icon: 'assets/icon/skill-icon/firebase_icon.png' },
    { label: 'Git', icon: 'assets/icon/skill-icon/git_icon.png' },
    { label: 'REST-API', icon: 'assets/icon/skill-icon/api_icon.png' },
    { label: 'Scrum', icon: 'assets/icon/skill-icon/scrum_icon.png' },
    { label: 'Growth mindset', icon: 'assets/icon/skill-icon/mindset_icon.png' },
  ] as const;
}
