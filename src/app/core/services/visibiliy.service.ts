import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {environment} from "../../../environments/environment";

export interface Visibility {
    "@id": string;
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class VisibilityService {
    private visibilitiesUrl = `${environment.apiUrl}/visibilities`;
    private visibilities$ = new BehaviorSubject<Visibility[] | null>(null);

    constructor(private http: HttpClient) {}

    loadInitialData(): Observable<Visibility[]> {
        return this.http.get<Visibility[]>(this.visibilitiesUrl).pipe(
            tap((visibilities) => this.visibilities$.next(visibilities)),
            catchError((error) => {
                console.error('Failed to load visibilities:', error);
                this.visibilities$.next(null);
                return of([]);
            })
        );
    }

    getVisibilities(): Observable<Visibility[] | null> {
        return this.visibilities$.asObservable();
    }
}
