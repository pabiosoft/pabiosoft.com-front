import {Component, Input} from '@angular/core';
import {NgFor} from "@angular/common";

@Component({
  selector: 'app-post-texte',
  standalone: true,
  imports: [
    NgFor
  ],
  templateUrl: './post-texte.component.html',
  styleUrl: './post-texte.component.scss'
})
export class PostTexteComponent {
  @Input() content: string = ''; // Texte à afficher

}
