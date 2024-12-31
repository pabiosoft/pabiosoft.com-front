import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {environment} from "../../../environments/environment";

export interface Status {
    "@id": string;
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class StatusService {
    private statusesUrl = `${environment.apiUrl}/statuses`;
    private statuses$ = new BehaviorSubject<Status[] | null>(null);

    constructor(private http: HttpClient) {}

    loadInitialData(): Observable<Status[]> {
        return this.http.get<Status[]>(this.statusesUrl).pipe(
            tap((statuses) => this.statuses$.next(statuses)),
            catchError((error) => {
                console.error('Failed to load statuses:', error);
                this.statuses$.next(null);
                return of([]);
            })
        );
    }

    getStatuses(): Observable<Status[] | null> {
        return this.statuses$.asObservable();
    }
}
