import { CommonModule, Location } from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';
import { ArticleModel } from 'src/app/core/models/article.model';

@Component({
  selector: 'app-resume-profils',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './resume-profils.component.html',
  styleUrl: './resume-profils.component.scss'
})
export class ResumeProfilsComponent implements OnInit{

  @Input() article!: ArticleModel;

  constructor(
    private location: Location
  ){}

  ngOnInit(): void {
  }
  
  goBack() {
    this.location.back();
  }
}
