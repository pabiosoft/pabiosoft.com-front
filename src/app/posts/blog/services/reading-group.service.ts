import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { ReadingGroup, Invitation } from '../models/partage.model';

@Injectable({
  providedIn: 'root'
})
export class ReadingGroupService {
  private apiUrl = 'http://localhost:3000/readingGroups'; // URL du serveur JSON
  private invitationsUrl = 'http://localhost:3000/invitations'; // URL pour les invitations

  constructor(private http: HttpClient) {}

  getUserGroups(userId: any): Observable<ReadingGroup[]> {
    return this.http.get<ReadingGroup[]>(`${this.apiUrl}?members_like=${userId}`).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des groupes de lecture:', error);
        return throwError(() => new Error('Erreur lors de la récupération des groupes de lecture.'));
      })
    );
  }

  createGroup(group: ReadingGroup): Observable<ReadingGroup> {
    return this.http.post<ReadingGroup>(this.apiUrl, group).pipe(
      catchError(error => {
        console.error('Erreur lors de la création du groupe:', error);
        return throwError(() => new Error('Erreur lors de la création du groupe.'));
      })
    );
  }

  shareBlogInGroup(groupId: number, blogId: number): Observable<ReadingGroup> {
    return this.http.get<ReadingGroup>(`${this.apiUrl}/${groupId}`).pipe(
      switchMap(existingGroup => {
        const updatedBlogs = existingGroup.blogsShared.includes(blogId)
          ? existingGroup.blogsShared
          : [...existingGroup.blogsShared, blogId];
        
        return this.http.patch<ReadingGroup>(`${this.apiUrl}/${groupId}`, { blogsShared: updatedBlogs });
      }),
      catchError(error => {
        console.error('Erreur lors du partage du blog dans le groupe:', error);
        return throwError(() => new Error('Erreur lors du partage du blog dans le groupe.'));
      })
    );
  }

  inviteUser(invitation: Invitation): Observable<Invitation> {
    return this.http.post<Invitation>(this.invitationsUrl, invitation).pipe(
      catchError(error => {
        console.error('Erreur lors de l\'envoi de l\'invitation:', error);
        return throwError(() => new Error('Erreur lors de l\'envoi de l\'invitation.'));
      })
    );
  }
}
