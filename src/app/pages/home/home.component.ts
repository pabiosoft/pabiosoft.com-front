import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { BlogService } from '../services/blog.service';
import { ImageHoverService } from '../services/image-hover.service';
import { TechnologiesComponent } from '../technologies/technologies.component';
import { TechnologiesDetailsComponent } from '../technologies-details/technologies-details.component';

export interface Blog {
  id?: any;
  content: string;
  coverImageUrl: string;
  coverText: string;
  date: string;
  status: string;
  userId: any;
  author: string;
  chapters: { title: string; content: string }[];
  profileImageUrl?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);

  constructor(
    private olympicService: OlympicService,
    private blogService: BlogService,
    private imageHoverService: ImageHoverService
  ) {}

  
  blogs: Blog[] = [];
  loading: boolean = true;  // Pour afficher un indicateur de chargement
  error: string | null = null;  // Gestion des erreurs

  email: string = '';
  confirmationMessage: string | null = null;
  iconAtEnd: boolean = false; // Pour gérer la position de l'icône

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.getBlogs();
  }

  getBlogs(): void {
    this.blogService.getBlogs().subscribe({
      next: (data) => {
        this.blogs = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Une erreur est survenue lors du chargement des blogs.';
        console.error(err);
        this.loading = false;
      },
    });
  }

  sendEmail() {
    if (this.email) {
      console.log(`Email envoyé à : ${this.email}`);
      this.confirmationMessage = 'Votre email a été envoyé avec succès ! 🎉';

      this.email = '';

      setTimeout(() => {
        this.confirmationMessage = null;
      }, 5000);
    }
  }

  moveIconToEnd() {
    this.iconAtEnd = true;
  }

  moveIconToStart() {
    this.iconAtEnd = false;
  }

  onMouseOver(event: MouseEvent): void {
    const target = event.target as HTMLImageElement; // Assertion de type
    if (target) {
      this.imageHoverService.enlargeImage(target);
    }
  }

  onMouseOut(event: MouseEvent): void {
    const target = event.target as HTMLImageElement; // Assertion de type
    if (target) {
      this.imageHoverService.resetImage(target);
    }
  }
}










// import { Component, OnInit } from '@angular/core';
// import { Observable, of } from 'rxjs';
// import { OlympicService } from 'src/app/core/services/olympic.service';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.scss'],
// })
// export class HomeComponent implements OnInit {
//   public olympics$: Observable<any> = of(null);

//   constructor(private olympicService: OlympicService) {}

//   ngOnInit(): void {
//     this.olympics$ = this.olympicService.getOlympics();
//   }
// }
