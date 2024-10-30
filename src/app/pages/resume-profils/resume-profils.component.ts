import { CommonModule } from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';
import { User } from '../services/auth.service';

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

  @Input() authorInfo: {
    author: any;
    profileImageUrl: string;
    coverText: string;
    date: string;
  } | null = null;

  @Input() technologies: { name: string; logoUrl: string }[] = [];

  ngOnInit(): void {   
  }

  getAuthorInfo(user: User | undefined): { 
    author: any; 
    profileImageUrl: string; 
    coverText: string; 
    date: string; 
  } | null {
    if (!user) return null;
  
    return {
      author: user.pseudo || `${user.firstName || ''} ${user.lastName || ''}`.trim(),
      profileImageUrl: user.profile?.imageUrl || 'assets/img/pmp.png',
      coverText: `Rôle : ${user.role}`, 
      date: new Date().toLocaleDateString() 
    };
  }  
}