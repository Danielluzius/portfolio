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

  /**
   * Gets the translated error message for the name field.
   * @returns {string} The translated name error message.
   */
  get nameErrorMessage(): string {
    return this.translocoService.translate('contact.form.nameError');
  }

  /**
   * Gets the translated error message for the email field.
   * @returns {string} The translated email error message.
   */
  get emailErrorMessage(): string {
    return this.translocoService.translate('contact.form.emailError');
  }

  /**
   * Gets the translated error message for the message field.
   * @returns {string} The translated message error message.
   */
  get messageErrorMessage(): string {
    return this.translocoService.translate('contact.form.messageError');
  }

  /**
   * Handles input events on the name field and clears any existing error state.
   */
  onNameInput(): void {
    if (this.nameError) {
      this.nameError = false;
    }
  }

  /**
   * Handles input events on the email field and clears any existing error state.
   */
  onEmailInput(): void {
    if (this.emailError) {
      this.emailError = false;
    }
  }

  /**
   * Handles input events on the message field and clears any existing error state.
   */
  onMessageInput(): void {
    if (this.messageError) {
      this.messageError = false;
    }
  }

  /**
   * Handles changes to the privacy checkbox and clears any existing error state if accepted.
   */
  onPrivacyChange(): void {
    if (this.privacyAccepted) {
      this.privacyError = false;
    }
  }

  /**
   * Handles the form submission. Validates the form and sends the email if valid.
   * @returns {Promise<void>} A promise that resolves when the submission is complete.
   */
  async onSubmit(): Promise<void> {
    this.resetErrors();

    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting = true;
    await this.submitForm();
  }

  /**
   * Resets all error states and submission status flags.
   * @private
   */
  private resetErrors(): void {
    this.nameError = false;
    this.emailError = false;
    this.messageError = false;
    this.privacyError = false;
    this.submitSuccess = false;
    this.submitError = false;
  }

  /**
   * Validates all form fields.
   * @private
   * @returns {boolean} True if all fields are valid, false otherwise.
   */
  private validateForm(): boolean {
    const nameValid = this.validateName();
    const emailValid = this.validateEmail();
    const messageValid = this.validateMessage();
    const privacyValid = this.validatePrivacy();

    return nameValid && emailValid && messageValid && privacyValid;
  }

  /**
   * Validates the name field. Sets nameError flag if invalid.
   * @private
   * @returns {boolean} True if the name is valid, false otherwise.
   */
  private validateName(): boolean {
    if (!this.name || this.name.trim() === '') {
      this.nameError = true;
      return false;
    }
    return true;
  }

  /**
   * Validates the email field using regex pattern. Sets emailError flag if invalid.
   * @private
   * @returns {boolean} True if the email is valid, false otherwise.
   */
  private validateEmail(): boolean {
    if (!this.email || this.email.trim() === '') {
      this.emailError = true;
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.emailError = true;
      return false;
    }

    return true;
  }

  /**
   * Validates the message field. Sets messageError flag if invalid.
   * @private
   * @returns {boolean} True if the message is valid, false otherwise.
   */
  private validateMessage(): boolean {
    if (!this.message || this.message.trim() === '') {
      this.messageError = true;
      return false;
    }
    return true;
  }

  /**
   * Validates that the privacy policy has been accepted. Sets privacyError flag if not accepted.
   * @private
   * @returns {boolean} True if the privacy policy is accepted, false otherwise.
   */
  private validatePrivacy(): boolean {
    if (!this.privacyAccepted) {
      this.privacyError = true;
      return false;
    }
    return true;
  }

  /**
   * Submits the contact form by sending an email and handling the response.
   * @private
   * @returns {Promise<void>} A promise that resolves when the submission is complete.
   */
  private async submitForm(): Promise<void> {
    try {
      await this.sendEmail();
      this.handleSuccess();
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Sends the contact email using the email service with trimmed form data.
   * @private
   * @returns {Promise<void>} A promise that resolves when the email is sent.
   */
  private async sendEmail(): Promise<void> {
    await this.emailService.sendContactEmail(
      this.name.trim(),
      this.email.trim(),
      this.message.trim()
    );
  }

  /**
   * Handles successful email submission by setting success flags, resetting the form,
   * and scheduling automatic success message dismissal.
   * @private
   */
  private handleSuccess(): void {
    this.submitSuccess = true;
    this.isSubmitting = false;
    this.resetForm();
    this.scheduleSuccessReset();
  }

  /**
   * Handles email submission errors by setting error flags, logging the error,
   * and scheduling automatic error message dismissal.
   * @private
   * @param {unknown} error - The error that occurred during submission.
   */
  private handleError(error: unknown): void {
    this.submitError = true;
    this.isSubmitting = false;
    console.error('Failed to send email:', error);
    this.scheduleErrorReset();
  }

  /**
   * Resets all form fields to their initial empty state.
   * @private
   */
  private resetForm(): void {
    this.name = '';
    this.email = '';
    this.message = '';
    this.privacyAccepted = false;
  }

  /**
   * Schedules the automatic dismissal of the success message after 5 seconds.
   * @private
   */
  private scheduleSuccessReset(): void {
    setTimeout(() => {
      this.submitSuccess = false;
    }, 5000);
  }

  /**
   * Schedules the automatic dismissal of the error message after 5 seconds.
   * @private
   */
  private scheduleErrorReset(): void {
    setTimeout(() => {
      this.submitError = false;
    }, 5000);
  }
}
