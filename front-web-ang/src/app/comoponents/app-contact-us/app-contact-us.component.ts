import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contact-us',
  templateUrl: './app-contact-us.component.html',
})
export class AppContactUs {
  successMessage: string | null = null;
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.contactForm = this.fb.group({
      from_name: '',
      subject: '',
      from_email: '',
      message: '',
    });
  }

  public sendEmail(e: Event) {
    e.preventDefault();
    emailjs
      .sendForm(
        'service_axq7dwf',
        'template_t8vr7tw',
        e.target as HTMLFormElement,
        'bJ0oaAt8cw54nAxne'
      )
      .then(
        (result: EmailJSResponseStatus) => {
          console.log(result.text);
          this.successMessage = result.text;
          setTimeout(() => {
            this.successMessage = null;
          }, 3000);
          this.resetForm();
        },
        (error) => {
          this.successMessage = null;
          console.log(error.text);
        }
      );
  }
  private resetForm() {
    this.contactForm.reset();
  }
}
