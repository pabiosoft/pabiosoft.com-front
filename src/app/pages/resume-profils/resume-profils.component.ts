import { CommonModule, Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ArticleModel } from 'src/app/core/models/article.model';
import { ShareButtons } from 'ngx-sharebuttons/buttons';

@Component({
  selector: 'app-resume-profils',
  standalone: true,
  imports: [
    CommonModule,
    ShareButtons
  ],
  templateUrl: './resume-profils.component.html',
  styleUrls: ['./resume-profils.component.scss']
})
export class ResumeProfilsComponent implements OnInit {

  @Input() article!: ArticleModel;
  isShareModalOpen = false;


  constructor(
    private location: Location,
  ) {}

  ngOnInit(): void {
  }


  openShareModal(): void {
    this.isShareModalOpen = true;
  }

  closeShareModal(): void {
    this.isShareModalOpen = false;
  }

  
  goBack() {
    this.location.back();
  }
}