import { Component } from '@angular/core';
import {ResumeProfilsComponent} from "../../pages/resume-profils/resume-profils.component";

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [
    ResumeProfilsComponent
  ],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent {

}
