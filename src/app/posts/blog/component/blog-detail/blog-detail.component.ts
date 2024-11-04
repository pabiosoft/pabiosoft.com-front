import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ImageHoverService } from 'src/app/pages/services/image-hover.service';
import { AuthService, User } from 'src/app/pages/services/auth.service';
import { TECHNOLOGIES } from '../../models/technologies.model';
import { View } from '../blog-list/blog-list.component';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit, OnDestroy {
  blog: any = null;
  authorInfo: { 
    author: string; 
    profileImageUrl: string; 
    coverText: string; 
    date: string; 
  } | null = null;
  sanitizedContent!: SafeHtml;
  currentChapterIndex = 0;
  private viewTimer: any;
  private viewRecorded = false;
  currentUserId: number | string |undefined;
  blogId: any | null = null;
  showGroupSelect: boolean = false;

  @ViewChild('chapterTitle', { static: false }) chapterTitle!: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location,
    public sanitizer: DomSanitizer,
    private imageHoverService: ImageHoverService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUserId = user?.id;
    });

    const blogId = this.route.snapshot.paramMap.get('id');
    if (blogId) {
      this.loadBlogDetails(blogId);
      this.startViewTimer();
    } else {
      console.error('Aucun ID de blog fourni dans la route.');
      this.goBack(); // Redirige si aucun ID n'est fourni
    };
  }

  loadBlogDetails(id: string): void {
    this.http.get(`http://localhost:3000/blogs/${id}`).subscribe(
      (data: any) => {
        this.blog = data;
        this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(this.blog.content);

        if (this.blog.authorId) {
          this.loadAuthorInfo(this.blog.authorId);
        } else {
          console.warn('Aucun auteur trouvé pour ce blog.');
        }
      },
      (error) => {
        console.error('Erreur lors du chargement du blog:', error);
        this.goBack(); // Redirige en cas d'erreur
      }
    );
  }

  loadAuthorInfo(userId: number): void {
    this.http.get<User>(`http://localhost:3000/users/${userId}`).subscribe(
      (user) => {
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

  previousChapter(): void {
    if (this.currentChapterIndex > 0) {
      this.currentChapterIndex--;
      this.scrollToChapter();
    }
  }

  nextChapter(): void {
    if (this.currentChapterIndex < this.blog.chapters.length - 1) {
      this.currentChapterIndex++;
      this.scrollToChapter();
    }
  }

  scrollToChapter(): void {
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

  goBack(): void {
    this.location.back();
  }

  getTechnologyLogo(techName: string): string {
    const tech = TECHNOLOGIES.find(t => t.name.toLowerCase() === techName.toLowerCase());
    return tech ? tech.logoUrl : 'assets/logos/default.png';
  }

  finishReading(): void {
    const currentBlogTechnologies = this.blog.technologies;
    this.router.navigate(['/blogs/finish'], { queryParams: { technologies: JSON.stringify(currentBlogTechnologies) } });
  }

  startViewTimer(): void {
    this.viewTimer = setTimeout(() => {
      if (!this.viewRecorded) {
        this.recordView();
        this.viewRecorded = true;
      }
    }, 60000);
  }

  recordView(): void {
    if (this.blogId) {
      const newView: View = {
        blogId: this.blogId,
        date: new Date().toISOString()
      };

      this.http.post<View>('http://localhost:3000/vues', newView).subscribe(
        response => {
          console.log('Vue enregistrée', response);
        },
        error => {
          console.error('Erreur lors de l’enregistrement de la vue', error);
        }
      );
    }
  }

  PartageBlog(): void {
   console.log('Blog partager')
  }


  ngOnDestroy(): void {
    clearTimeout(this.viewTimer);
  }
}
