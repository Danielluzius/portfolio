import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { EmailService } from '../../../shared/services/email.service';

@Component({
  standalone: true,
  selector: 'app-contact-form',
  imports: [FormsModule, CommonModule, RouterLink, TranslocoPipe],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactForm {
  private translocoService = inject(TranslocoService);
  private emailService = inject(EmailService);

  name = '';
  email = '';
  message = '';
  privacyAccepted = false;

  nameError = false;
  emailError = false;
  messageError = false;
  privacyError = false;

  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

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

  async onSubmit(): Promise<void> {
    this.nameError = false;
    this.emailError = false;
    this.messageError = false;
    this.privacyError = false;
    this.submitSuccess = false;
    this.submitError = false;

    let hasError = false;

    if (!this.name || this.name.trim() === '') {
      this.nameError = true;
      hasError = true;
    }

    if (!this.email || this.email.trim() === '') {
      this.emailError = true;
      hasError = true;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        this.emailError = true;
        hasError = true;
      }
    }

    if (!this.message || this.message.trim() === '') {
      this.messageError = true;
      hasError = true;
    }

    if (!this.privacyAccepted) {
      this.privacyError = true;
      hasError = true;
    }

    if (hasError) {
      return;
    }

    this.isSubmitting = true;

    try {
      await this.emailService.sendContactEmail(
        this.name.trim(),
        this.email.trim(),
        this.message.trim()
      );

      this.submitSuccess = true;
      this.isSubmitting = false;

      this.name = '';
      this.email = '';
      this.message = '';
      this.privacyAccepted = false;

      setTimeout(() => {
        this.submitSuccess = false;
      }, 5000);
    } catch (error) {
      this.submitError = true;
      this.isSubmitting = false;
      console.error('Failed to send email:', error);

      setTimeout(() => {
        this.submitError = false;
      }, 5000);
    }
  }
}
