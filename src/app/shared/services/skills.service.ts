import { Injectable } from '@angular/core';
import { Skill } from '../models/skill.model';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  private readonly skills: Skill[] = [
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
  ];

  /**
   * Returns all available skills.
   * @returns {Skill[]} Array of all skills.
   */
  getSkills(): Skill[] {
    return this.skills;
  }

  /**
   * Returns a skill by its index.
   * @param {number} index - The index of the skill.
   * @returns {Skill | null} The skill at the given index or null if not found.
   */
  getSkillByIndex(index: number): Skill | null {
    if (index < 0 || index >= this.skills.length) {
      return null;
    }
    return this.skills[index];
  }

  /**
   * Returns the total number of skills.
   * @returns {number} The total count of skills.
   */
  getSkillCount(): number {
    return this.skills.length;
  }
}
