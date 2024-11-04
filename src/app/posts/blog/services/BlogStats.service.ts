import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogStatsService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Obtenir le nombre de vues d'un blog
  getViews(blogId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/views?blogId=${blogId}`);
  }

  // Obtenir les likes d'un blog
  getLikes(blogId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/likes?blogId=${blogId}`);
  }

  // Obtenir les commentaires d'un blog
  getComments(blogId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/comments?blogId=${blogId}`);
  }
}
