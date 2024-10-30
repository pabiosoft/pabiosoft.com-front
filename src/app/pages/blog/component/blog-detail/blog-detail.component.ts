import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ImageHoverService } from 'src/app/pages/services/image-hover.service';
import { User } from 'src/app/pages/services/auth.service';
import { TECHNOLOGIES } from '../../models/technologies.model';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  blog: any; 
  sanitizedContent!: SafeHtml;
  currentChapterIndex: number = 0;

  authorInfo: { 
    author: string; 
    profileImageUrl: string; 
    coverText: string; 
    date: string; 
  } | null = null;

  @ViewChild('chapterTitle', { static: false }) chapterTitle!: ElementRef; 

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location,
    public sanitizer: DomSanitizer,
    private imageHoverService: ImageHoverService,
  ) {}

  ngOnInit(): void {
    const blogId = this.route.snapshot.paramMap.get('id');
    if (blogId) {
      this.loadBlogDetails(blogId);
    }
  }

  


  previousChapter() {
    if (this.currentChapterIndex > 0) {
      this.currentChapterIndex--;
      this.scrollToChapter();
    }
  }

  nextChapter() {
    if (this.currentChapterIndex < (this.blog.chapters.length - 1)) {
      this.currentChapterIndex++;
      this.scrollToChapter();
    }
  }

  scrollToChapter() {
    if (this.chapterTitle) {
      this.chapterTitle.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onMouseOver(event: MouseEvent): void {
    const target = event.target as HTMLImageElement;
    if (target) {
      this.imageHoverService.enlargeImage(target);
    }
  }

  onMouseOut(event: MouseEvent): void {
    const target = event.target as HTMLImageElement; 
    if (target) {
      this.imageHoverService.resetImage(target);
    }
  }

  goBack() {
    this.location.back();
  }


  loadBlogDetails(id: string) {
    this.http.get(`http://localhost:3000/blogs/${id}`).subscribe(
      (data: any) => {
        console.log('Blog Data:', data); // Debug
        this.blog = data;
        this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(this.blog.content);
  
        // Utilisation correcte de 'authorId'
        if (this.blog.authorId) {
          this.loadAuthorInfo(this.blog.authorId);
        } else {
          console.warn('Aucun ID d’auteur trouvé dans le blog.');
        }
      },
      (error) => console.error('Erreur lors du chargement du blog:', error)
    );
  }
  
  loadAuthorInfo(userId: number) {
    this.http.get<User>(`http://localhost:3000/users/${userId}`).subscribe(
      (user) => {
        console.log('User Data:', user); // Debug
        this.authorInfo = this.mapUserToAuthorInfo(user);
      },
      (error) => {
        console.error('Erreur lors du chargement des infos de l’auteur:', error);
        this.authorInfo = null;
      }
    );
  }
  
  mapUserToAuthorInfo(user: User): {
    author: string;
    profileImageUrl: string;
    coverText: string;
    date: string;
  } {
    return {
      author: user.pseudo || `${user.firstName || ''} ${user.lastName || ''}`.trim(),
      profileImageUrl: user.profile?.imageUrl || 'assets/default-profile.png',
      coverText: `Rôle : ${user.role}`,
      date: new Date().toLocaleDateString(),
    };
  }

  getTechnologyLogo(techName: string): string {
    const tech = TECHNOLOGIES.find(t => t.name.toLowerCase() === techName.toLowerCase());
    return tech ? tech.logoUrl : 'assets/logos/default.png';
  }

  finishReading() {
    const currentBlogTechnologies = this.blog.technologies; // Récupérez les technologies du blog actuel
    this.router.navigate(['/finished-reading'], { queryParams: { technologies: JSON.stringify(currentBlogTechnologies) } });
  }
}
