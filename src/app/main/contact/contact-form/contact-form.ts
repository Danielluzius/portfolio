import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';

@Component({
  standalone: true,
  selector: 'app-contact-form',
  imports: [FormsModule, CommonModule, RouterLink, TranslocoPipe],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactForm {
  private translocoService = inject(TranslocoService);

  // Form data
  name = '';
  email = '';
  message = '';
  privacyAccepted = false;

  // Error states
  nameError = false;
  emailError = false;
  messageError = false;
  privacyError = false;

  // Error messages - will be translated
  get nameErrorMessage(): string {
    return this.translocoService.translate('contact.form.nameError');
  }

  get emailErrorMessage(): string {
    return this.translocoService.translate('contact.form.emailError');
  }

  get messageErrorMessage(): string {
    return this.translocoService.translate('contact.form.messageError');
  }

  onNameInput(): void {
    if (this.nameError) {
      this.nameError = false;
    }
  }

  onEmailInput(): void {
    if (this.emailError) {
      this.emailError = false;
    }
  }

  onMessageInput(): void {
    if (this.messageError) {
      this.messageError = false;
    }
  }

  onPrivacyChange(): void {
    if (this.privacyAccepted) {
      this.privacyError = false;
    }
  }

  onSubmit(): void {
    // Reset all errors
    this.nameError = false;
    this.emailError = false;
    this.messageError = false;
    this.privacyError = false;

    let hasError = false;

    // Validate name
    if (!this.name || this.name.trim() === '') {
      this.nameError = true;
      hasError = true;
    }

    // Validate email
    if (!this.email || this.email.trim() === '') {
      this.emailError = true;
      hasError = true;
    }

    // Validate message
    if (!this.message || this.message.trim() === '') {
      this.messageError = true;
      hasError = true;
    }

    // Validate privacy
    if (!this.privacyAccepted) {
      this.privacyError = true;
      hasError = true;
    }

    if (hasError) {
      return;
    }

    // Form is valid - submit
    console.log('Form submitted', {
      name: this.name,
      email: this.email,
      message: this.message,
    });
    // TODO: Implementieren Sie hier die Formular-Logik
  }
}
