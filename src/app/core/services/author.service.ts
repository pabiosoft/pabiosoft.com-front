import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {Author} from "../models/author.model";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthorService {
    private authorsUrl = `${environment.apiUrl}/authors`; // Assurez-vous que l'URL correspond à votre API.
    private authors$ = new BehaviorSubject<Author[] | null>(null);

    constructor(private http: HttpClient) {}

    loadInitialData(): Observable<Author[]> {
        return this.http.get<Author[]>(this.authorsUrl).pipe(
            tap((authors) => this.authors$.next(authors)),
            catchError((error) => {
                console.error('Failed to load authors:', error);
                this.authors$.next(null);
                return of([]);
            })
        );
    }

    getAuthors(): Observable<Author[] | null> {
        return this.authors$.asObservable();
    }
}
