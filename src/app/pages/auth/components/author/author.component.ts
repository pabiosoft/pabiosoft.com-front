
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Blog } from 'src/app/pages/models/blog.model';
import { BlogService } from 'src/app/pages/services/blog.service';
import { ImageHoverService } from 'src/app/pages/services/image-hover.service';
import { User } from '../../models/user';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-author',
  // standalone: true,
  // imports: [
  //   CommonModule, 
  //   FormsModule,
  //   MatIconModule,
  //   RouterModule
  // ],
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
})
export class AuthorComponent implements OnInit {
  author: User | null = null;
  authorBlogs: Blog[] = [];
  enlargedImageUrl: string | null = null;
  isSubscribed: boolean = false;
  subscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private blogService: BlogService,
    private router: Router,
    private http: HttpClient,
    private imageHoverService: ImageHoverService
  ) {}

  ngOnInit(): void {
    const authorId = Number(this.route.snapshot.paramMap.get('id')); // Convertir en nombre
    if (authorId) {
      this.loadAuthor(authorId);
      this.loadAuthorBlogs(authorId);
      this.checkSubscription(authorId.toString()); // Assurez-vous que checkSubscription utilise une chaîne si nécessaire
    }
    
  }

  loadAuthor(authorId: any) {
    this.authService.getUserById(authorId).subscribe({
      next: (user: User) => (this.author = user),
      error: (err) => console.error('Erreur lors du chargement de l\'auteur:', err),
    });
  } 
  loadAuthorBlogs(authorId: number) {
    this.blogService.getUserBlogs(authorId).subscribe({
      next: (blogs) => {
        this.authorBlogs = blogs.filter(blog => blog.status === 'published');
        console.log('Blogs de l\'auteur:', this.authorBlogs);
      },
      error: (err) => console.error('Erreur lors du chargement des blogs:', err),
    });
  }
   

  readBlog(blog: Blog) {
    this.router.navigate(['/blogs', blog.id]);
  }

  enlargeImage(imageUrl: string) {
    this.enlargedImageUrl = imageUrl;
  }

  closeImage() {
    this.enlargedImageUrl = null;
  }

  checkSubscription(authorId: string) {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.http.get<any[]>(`http://localhost:3000/abonment?userId=${currentUser.id}`).subscribe({
        next: (subscriptions) => {
          this.isSubscribed = subscriptions.some((sub) => sub.authorId === authorId);
        },
        error: (err) => console.error('Erreur lors de la vérification de l\'abonnement:', err),
      });
    }
  }

  toggleSubscription() {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      alert('Vous devez vous connecter pour vous abonner.');
      return;
    }

    if (this.isSubscribed) {
      this.unsubscribeUser(currentUser.id, this.author?.id);
    } else {
      this.subscribeUser(currentUser.id, this.author?.id);
    }
  }

  subscribeUser(userId: number, authorId: number | undefined) {
    if (!authorId) return;

    const subscription = { userId, authorId };
    this.http.post('http://localhost:3000/abonment', subscription).subscribe({
      next: () => {
        alert(`Abonné à ${this.author?.pseudo}.`);
        this.isSubscribed = true;
      },
      error: (err) => console.error('Erreur lors de l\'abonnement:', err),
    });
  }

  unsubscribeUser(userId: number, authorId: number | undefined) {
    if (!authorId) return;

    const confirmation = confirm(`Voulez-vous vous désabonner de ${this.author?.pseudo} ?`);

    if (confirmation) {
      this.http.get<any[]>(`http://localhost:3000/abonment?userId=${userId}`).subscribe({
        next: (subscriptions) => {
          const subToRemove = subscriptions.find((sub) => sub.authorId === authorId);
          if (subToRemove) {
            this.http.delete(`http://localhost:3000/abonment/${subToRemove.id}`).subscribe({
              next: () => {
                alert(`Désabonné de ${this.author?.pseudo}.`);
                this.isSubscribed = false;
              },
              error: (err) => console.error('Erreur lors du désabonnement:', err),
            });
          }
        },
        error: (err) => console.error('Erreur lors de la récupération des abonnements:', err),
      });
    }
  }

  abon() {
    const currentUser = this.authService.getCurrentUser(); // Récupérer l'utilisateur actuel
  
    if (!currentUser) {
      alert('Vous devez vous connecter pour pouvoir vous abonner.');
      return;
    }
  
    console.log(`Utilisateur connecté : ${currentUser.pseudo}, Email : ${currentUser.email}`);
    
    this.checkSubscription(this.author?.id); // Vérifiez l'abonnement avant d'abonner ou de désabonner
  
    if (this.isSubscribed) {
      this.unsubscribeUser(currentUser.id, this.author?.id);
    } else {
      this.subscribeUser(currentUser.id, this.author?.id);
    }
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