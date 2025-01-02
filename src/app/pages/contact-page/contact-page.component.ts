import { CommonModule } from '@angular/common';
import {Component, HostListener, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { Contact } from 'src/app/core/models/contact.model';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit{

  ngOnInit(): void {
    // Vérifie si le script existe déjà pour éviter les doublons
    if (!document.querySelector('script[src="https://tally.so/widgets/embed.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://tally.so/widgets/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }

}
