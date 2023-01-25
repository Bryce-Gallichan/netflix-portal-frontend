import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  CARDS = [
    {
      title: 'Angular Material',
      subtitle: 'Styling | Components',
      image: 'angular-logo.svg',
      description: 'Angular Material components are used to ensure a consistent and high quality user interface',
      link: 'https://material.angular.io/'
    },
    {
      title: 'Material Icons',
      subtitle: 'Icons',
      image: 'google-fonts.png',
      description: 'Google Fonts Material Icons are used to ensure consistent icons',
      link: 'https://fonts.google.com/icons?selected=Material+Icons'
    },
    {
      title: 'Firebase Auth',
      subtitle: 'Authentication',
      image: 'firebase-logo.svg',
      description: 'Firebase authentication is used to authenticate users and all requests made to a back-end API',
      link: 'https://firebase.google.com/products/auth'
    },
    {
      title: 'Tailwind CSS',
      subtitle: 'Layout',
      image: 'tailwindcss-icon.svg',
      description: 'Tailwind CSS utility libraries are used for styling custom components and responsive layout options',
      link: 'https://tailwindcss.com/docs/utility-first'
    }
  ]

  constructor() { }

  ngOnInit(): void {

  }

}
