import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Blog } from '../../models/blog.model';
import { User } from 'src/app/pages/services/auth.service';
import { ImageHoverService } from 'src/app/pages/services/image-hover.service';
import { Comment, Like } from '../comment/comment.component';

export interface View {
  id?: any;
  blogId: any;
  date: string; // ou un timestamp, selon ta préférence
}


@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  blogs: Blog[] = [];
  likes: Like[] = [];
  comments: Comment[] = [];
  views: { [key: number]: number } = {};
  users: User[] = []; 
  isLoading = true;

  constructor(
    private http: HttpClient, 
    private router: Router,
    private imageHoverService: ImageHoverService
  ) {}

  ngOnInit() {
    this.loadPublishedBlogs();
    this.loadUsers();
    this.loadLikes();
    this.loadComments();
    this.loadViews();
  }

  loadPublishedBlogs() {
    this.isLoading = true;
    this.http.get<Blog[]>('http://localhost:3000/blogs').subscribe(
      (data) => {
        this.blogs = data.filter(blog => blog.status === 'published');
        this.isLoading = false;
        this.associateLikesAndComments(); 
      },
      (error) => {
        console.error('Erreur lors de la récupération des blogs:', error);
        this.isLoading = false;
      }
    );
  }
  
  loadUsers() {
    this.http.get<User[]>('http://localhost:3000/users').subscribe(
      (data) => {
        this.users = data;
      },
      (error) => console.error('Erreur lors de la récupération des utilisateurs:', error)
    );
  }

  // Retourne l'utilisateur correspondant à un blog
  getUserById(userId: number): User | undefined {
    return this.users.find(user => user.id === userId);
  }

  // Naviguer vers la page de l'auteur
  goToAuthor(authorId: number) {
    this.router.navigate(['/author', authorId]);
  }

  loadLikes() {
    this.http.get<Like[]>('http://localhost:3000/likes').subscribe(
      (data) => {
        this.likes = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des likes:', error);
      }
    );
  }

  loadComments() {
    this.http.get<Comment[]>('http://localhost:3000/comments').subscribe(
      (data) => {
        this.comments = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des commentaires:', error);
      }
    );
  }

  associateLikesAndComments() {
    this.blogs.forEach(blog => {
      blog.likesCount = this.likes.filter(like => like.blogId === blog.id).length; // Compte des likes
      blog.commentsCount = this.comments.filter(comment => comment.blogId === blog.id).length; // Compte des commentaires
    });
  }

  onMouseOver(event: MouseEvent): void {
    const target = event.target as HTMLImageElement; // Assertion de type
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

  onReadMore(blogId: string): void {
    this.recordView(blogId); // Enregistre la vue
    this.router.navigate(['/blogs/blogs', blogId]); // Navigue vers les détails
  }

  recordView(blogId: string): void {
    const newView: View = { blogId, date: new Date().toISOString() };
   setTimeout(() => {
    this.http.post('http://localhost:3000/vues', newView).subscribe(
      (error) => console.error('Erreur lors de l\'enregistrement de la vue POST:', error)
    );
   }, 60000);
  }
  

  loadViews(): void {
    this.http.get<View[]>('http://localhost:3000/vues').subscribe(
      (data) => {
        data.forEach(view => {
          const blogId = view.blogId; 
          if (!this.views[blogId]) {
            this.views[blogId] = 1;
          } else {
            this.views[blogId]++;
          }
        });
      },
      (error) => {
        console.error('Erreur lors du chargement des vues GET:', error);
      }
    );
  }
  
  getViewsForBlog(blogId: string | any): number {
    return this.views[blogId] || 0;
  }
  
  

}
