import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, catchError, map, Observable, of} from 'rxjs';
import { tap } from 'rxjs/operators';
import {Technology} from "../models/technologies.model";
import {TreeNode} from "primeng/api";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class TechnologieService {

    private technologiesUrl = `${environment.apiUrl}/technologies`;
    private technologies$ = new BehaviorSubject<Technology[] | null>(null);

    constructor(private http: HttpClient) {}

    loadInitialData(): Observable<Technology[]> {
        return this.http.get<Technology[]>(this.technologiesUrl).pipe(
            tap((data) => this.technologies$.next(data)),
            catchError((error) => {
                console.error('Failed to load technologies:', error);
                this.technologies$.next(null);
                return of([]);
            })
        );
    }

    getTechnologies(): Observable<Technology[] | null> {
        return this.technologies$.asObservable();
    }

    getTechnologiesTree(): Observable<TreeNode[]> {
        return this.technologies$.pipe(
            map((technologies) => {
                if (!technologies) return [];

                // Group technologies by category
                const grouped = technologies.reduce((acc, tech) => {
                    (acc[tech.category] = acc[tech.category] || []).push(tech);
                    return acc;
                }, {} as Record<string, Technology[]>);

                // Convert grouped object into TreeNode array for each category
                return Object.keys(grouped).map((category) => ({
                    label: category,
                    expanded: true,
                    type: 'category',
                    children: grouped[category].map((tech) => ({
                        label: tech.name,
                        type: 'technology',
                        data: {
                            image: tech.logoUrl,
                            name: tech.name,
                            title: tech.category
                        }
                    }))
                }));
            })
        );
    }
}

/*
export class TechnologieService {




    // private technologiesUrl = './assets/mock/technologies.json';
    private technologiesUrl = `${environment.apiUrl}/technologies`;
    private technologies$ = new BehaviorSubject<Technology[] | null>(null);

    constructor(private http: HttpClient) {}

    loadInitialData(): Observable<Technology[]> {
        return this.http.get<Technology[]>(this.technologiesUrl).pipe(
            tap((data) => this.technologies$.next(data)),
            catchError((error) => {
                console.error('Failed to load technologies:', error);
                this.technologies$.next(null);
                return of([]);
            })
        );
    }

    getTechnologies(): Observable<Technology[] | null> {
        return this.technologies$.asObservable();
    }

    // technologie.service.ts
    getTechnologiesTree(): Observable<TreeNode[]> {
        return this.technologies$.pipe(
            map((technologies) => {
                if (!technologies) return [];

                // Group technologies by category
                const grouped = technologies.reduce((acc, tech) => {
                    (acc[tech.category] = acc[tech.category] || []).push(tech);
                    return acc;
                }, {} as Record<string, Technology[]>);

                // Convert grouped object into TreeNode array for each category
                return Object.keys(grouped).map((category) => ({
                    label: category,
                    expanded: true,
                    type: 'category',
                    children: grouped[category].map((tech) => ({
                        label: tech.name,
                        type: 'person',
                        data: {
                            image: tech.logoUrl,
                            name: tech.name,
                            title: tech.category
                        }
                    }))
                }));
            })
        );
    }
}
*/
