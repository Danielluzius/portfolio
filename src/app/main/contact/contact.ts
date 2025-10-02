import { Component } from '@angular/core';
import { ContactInfo } from './contact-info/contact-info';
import { ContactForm } from './contact-form/contact-form';

@Component({
  standalone: true,
  selector: 'app-contact',
  imports: [ContactInfo, ContactForm],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {}
