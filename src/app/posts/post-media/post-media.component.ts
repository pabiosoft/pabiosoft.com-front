import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-post-media',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './post-media.component.html',
  styleUrl: './post-media.component.scss'
})
export class PostMediaComponent {
  @Input() mediaType: 'image' | 'video' = 'image';
  @Input() src!: string;
  @Input() altText: string = 'Media content';
}
