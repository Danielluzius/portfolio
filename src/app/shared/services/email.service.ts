import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private readonly PUBLIC_KEY = 'oNr2zKbhd4SQ0pALM';
  private readonly SERVICE_ID = 'service_ovzmbvo';
  private readonly TEMPLATE_ID = 'template_bg27gdc';

  /**
   * Initializes the EmailService and configures EmailJS with the public key.
   */
  constructor() {
    this.initializeEmailJS();
  }

  /**
   * Sends a contact email with the provided details.
   * @param {string} name - The name of the person sending the message.
   * @param {string} email - The email address of the sender.
   * @param {string} message - The message content.
   * @returns {Promise<void>} A promise that resolves when the email is sent.
   */
  async sendContactEmail(name: string, email: string, message: string): Promise<void> {
    const templateParams = this.buildTemplateParams(name, email, message);
    await this.sendEmail(templateParams);
  }

  /**
   * Initializes the EmailJS library with the service's public key.
   * @private
   */
  private initializeEmailJS(): void {
    emailjs.init(this.PUBLIC_KEY);
  }

  /**
   * Builds the template parameters object for the email.
   * @private
   * @param {string} name - The name of the person sending the message.
   * @param {string} email - The email address of the sender.
   * @param {string} message - The message content.
   * @returns {Object} The template parameters object with sender and recipient details.
   */
  private buildTemplateParams(name: string, email: string, message: string) {
    return {
      from_name: name,
      from_email: email,
      message: message,
      to_name: 'Daniel Luzius',
    };
  }

  /**
   * Sends an email using EmailJS with the provided template parameters.
   * @private
   * @param {any} templateParams - The template parameters for the email.
   * @returns {Promise<void>} A promise that resolves when the email is sent.
   * @throws {Error} Throws an error if the email fails to send.
   */
  private async sendEmail(templateParams: any): Promise<void> {
    try {
      const response = await emailjs.send(this.SERVICE_ID, this.TEMPLATE_ID, templateParams);
      console.log('Email successfully sent!', response.status, response.text);
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  }
}
