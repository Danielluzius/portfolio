import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private readonly PUBLIC_KEY = 'oNr2zKbhd4SQ0pALM';
  private readonly SERVICE_ID = 'service_ovzmbvo';
  private readonly TEMPLATE_ID = 'template_bg27gdc';

  constructor() {
    emailjs.init(this.PUBLIC_KEY);
  }

  async sendContactEmail(name: string, email: string, message: string): Promise<void> {
    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
      to_name: 'Daniel Luzius',
    };

    try {
      const response = await emailjs.send(this.SERVICE_ID, this.TEMPLATE_ID, templateParams);
      console.log('Email successfully sent!', response.status, response.text);
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  }
}
