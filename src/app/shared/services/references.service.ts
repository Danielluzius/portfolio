import { Injectable } from '@angular/core';
import { Reference } from '../models/reference.model';

@Injectable({
  providedIn: 'root',
})
export class ReferencesService {
  private readonly references: Reference[] = [
    {
      name: 'references.items.heinze.name',
      role: 'references.items.heinze.role',
      text: 'references.items.heinze.text',
    },
    {
      name: 'references.items.schmidt.name',
      role: 'references.items.schmidt.role',
      text: 'references.items.schmidt.text',
    },
    {
      name: 'references.items.placeholder1.name',
      role: 'references.items.placeholder1.role',
      text: 'references.items.placeholder1.text',
    },
    {
      name: 'references.items.placeholder2.name',
      role: 'references.items.placeholder2.role',
      text: 'references.items.placeholder2.text',
    },
  ];

  /**
   * Returns all available references.
   * @returns {Reference[]} Array of all references.
   */
  getReferences(): Reference[] {
    return this.references;
  }

  /**
   * Returns a reference by its index.
   * @param {number} index - The index of the reference.
   * @returns {Reference | null} The reference at the given index or null if not found.
   */
  getReferenceByIndex(index: number): Reference | null {
    if (index < 0 || index >= this.references.length) {
      return null;
    }
    return this.references[index];
  }

  /**
   * Returns the total number of references.
   * @returns {number} The total count of references.
   */
  getReferenceCount(): number {
    return this.references.length;
  }
}
