import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { Blog } from '../home/home.component';
import { AuthService } from './auth.service';
import { Blog } from '../blog/models/blog.model';


export interface publishBlog {
  id: number;
  title: string;
  content: any[]; 
  published: boolean; 
  author?: {
    id: any;
    email: string;
    username: any;
    profile?: {
      imageUrl?: string | any;
    };
  };
}


@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrl = 'http://localhost:3000/blogs';

  constructor(private http: HttpClient, private authService: AuthService) {}

  publishBlog(blog: publishBlog): Observable<publishBlog> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      return throwError(() => new Error('Aucun utilisateur connecté.'));
    }

    return this.getBlogs().pipe(
      map((blogs) => {
        const maxId = blogs.length ? Math.max(...blogs.map((b) => b.id || 0)) : 0;
        blog.id = maxId + 1;
        blog.published = true;
        blog.author = {
          id: currentUser.id,
          email: currentUser.email,
          username: currentUser.pseudo || `${currentUser.firstName} ${currentUser.lastName}`
        };
        return blog;
      }),
      switchMap((newBlog) => this.http.post<publishBlog>(this.apiUrl, newBlog)),
      catchError((error) => {
        console.error('Erreur lors de la publication:', error);
        return throwError(() => error);
      })
    );
  }

  // Récupérer les blogs par technologies
  getBlogsByTechnologies(technologies: any[]): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiUrl).pipe(
      map(blogs => blogs.filter(blog => 
        blog.technologies?.some(tech => technologies.some(t => t.name === tech.name))
      ))
    );
  }
  

  // Enregistrer un brouillon
  saveBlog(blog: publishBlog): Observable<publishBlog> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      return throwError(() => new Error('Aucun utilisateur connecté.'));
    }

    return this.getBlogs().pipe(
      map((blogs) => {
        const maxId = blogs.length ? Math.max(...blogs.map((b) => b.id || 0)) : 0;
        blog.id = maxId + 1;
        blog.published = false;
        blog.author = {
          id: currentUser.id,
          email: currentUser.email,
          username: `${currentUser.firstName} ${currentUser.lastName}`,
        };
        return blog;
      }),
      switchMap((newBlog) => this.http.post<publishBlog>(this.apiUrl, newBlog)),
      catchError((error) => {
        console.error('Erreur lors de l\'enregistrement du brouillon:', error);
        return throwError(() => error);
      })
    );
  }

  // Récupérer les blogs publiés
  getPublishedBlogs(): Observable<publishBlog[]> {
    return this.http.get<publishBlog[]>(`${this.apiUrl}?published=true`);
  }

  // Récupérer tous les blogs
  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiUrl);
  }

  // Récupérer un blog par ID
  getBlogById(id: number): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/${id}`);
  }

  getUserBlogs(userId: number): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.apiUrl}?userId=${userId}`);
  }

  // getUserBlogs(userId: number): Observable<Blog[]> {
  //   return this.http.get<Blog[]>(`http://localhost:3000/blogs?userId=${userId}`);
  // }  

  // Mettre à jour un blog
  updateBlog(blog: publishBlog): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${blog.id}`, blog).pipe(
      catchError((error) => {
        console.error('Erreur lors de la mise à jour:', error);
        return throwError(() => error);
      })
    );
  }

  // Supprimer un blog
  deleteBlog(blogId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${blogId}`).pipe(
      catchError((error) => {
        console.error('Erreur lors de la suppression:', error);
        return throwError(() => error);
      })
    );
  }
}
