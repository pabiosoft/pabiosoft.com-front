import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from 'src/app/pages/services/auth.service';

export interface Like {
  id?: number;
  userId: number;
  blogId: number;
  date: string;
}

export interface Comment {
  id?: number;
  blogId: number;
  content: string;
  authorName: string;
  authorPhotoUrl: string;
  date: string;
}

export interface View {
  id?: string;
  blogId: string;
  date: string;
}

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() blogId!: any;

  comments: Comment[] = [];
  newCommentContent: string = '';

  likes: Like[] = [];
  hasLiked = false;

  currentUser: User | null = null;

  viewsCount: number = 0;  

  private apiUrl = 'http://localhost:3000/comments';
  private likeUrl = 'http://localhost:3000/likes';
  private viewsUrl = 'http://localhost:3000/vues'; 

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadComments();
    this.loadLikes();
    this.loadViews();  
  }

  // Charger les commentaires pour l'article
  loadComments(): void {
    this.http
      .get<Comment[]>(`${this.apiUrl}?blogId=${this.blogId}`)
      .subscribe((comments) => (this.comments = comments));
  }

  // Charger les vues
  loadViews(): void {
    this.http
      .get<View[]>(`${this.viewsUrl}?blogId=${this.blogId}`)
      .subscribe((views) => {
        this.viewsCount = views.length;  // Nombre de vues pour cet article
      });
  }

  // Ajouter un commentaire
  addComment(): void {
    if (!this.currentUser || !this.newCommentContent.trim()) {
      console.error('Utilisateur non connecté ou commentaire vide.');
      return;
    }

    const newComment: Comment = {
      blogId: this.blogId,
      content: this.newCommentContent.trim(),
      authorName: this.currentUser.pseudo || `${this.currentUser.firstName} ${this.currentUser.lastName}`,
      authorPhotoUrl: this.currentUser.profile?.imageUrl || 'assets/default-avatar.png',
      date: new Date().toISOString(),
    };

    this.http.post<Comment>(this.apiUrl, newComment).subscribe((comment) => {
      this.comments.push(comment);
      this.newCommentContent = '';
    });
  }

  // Charger les likes pour l'article
  loadLikes(): void {
    this.http
      .get<Like[]>(`${this.likeUrl}?blogId=${this.blogId}`)
      .subscribe((likes) => {
        this.likes = likes;
        this.hasLiked = this.currentUser
          ? this.likes.some((like) => like.userId === this.currentUser?.id)
          : false;
      });
  }

  // Gérer le like/unlike
  toggleLike(): void {
    if (!this.currentUser) {
      console.error('Utilisateur non connecté.');
      return;
    }

    if (this.hasLiked) {
      const like = this.likes.find((l) => l.userId === this.currentUser?.id);
      if (like) {
        this.http.delete(`${this.likeUrl}/${like.id}`).subscribe(() => {
          this.likes = this.likes.filter((l) => l.id !== like.id);
          this.hasLiked = false;
        });
      }
    } else {
      const newLike: Like = {
        userId: this.currentUser.id,
        blogId: this.blogId,
        date: new Date().toISOString(),
      };

      this.http.post<Like>(this.likeUrl, newLike).subscribe((like) => {
        this.likes.push(like);
        this.hasLiked = true;
      });
    }
  }
}
