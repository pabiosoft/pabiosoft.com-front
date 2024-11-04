import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  private apiUrl = 'http://localhost:3000/users'; // API JSON Server

  constructor(private http: HttpClient, private router: Router) {}

  // Inscription avec connexion automatique
  register(user: User): Observable<User> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map(users => {
        const maxId = users.length ? Math.max(...users.map(u => u.id || 0)) : 0;
        user.id = maxId + 1; // Attribuer un ID séquentiel
        return user;
      }),
      switchMap(newUser => this.http.post<User>(this.apiUrl, newUser)),
      tap(createdUser => {
        this.setCurrentUser(createdUser); // Connexion automatique après inscription
        this.router.navigate(['/auth/user-dashboard']); // Rediriger vers le tableau de bord
      })
    );
  }

  // Connexion de l'utilisateur
  login(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}&password=${password}`);
  }

  // Déconnexion
  logout() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  // Stocker l'utilisateur connecté
  setCurrentUser(user: User) {
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  
  

  // Récupérer l'utilisateur connecté
  getCurrentUser(): User | any {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
  

  verifyPassword(email: string, password: string): Observable<boolean> {
    return this.http.get<User[]>(`http://localhost:3000/users?email=${email}`).pipe(
      map(users => users.length > 0 && users[0].password === password) // Compare le mot de passe
    );
  }
  
  // Récupérer un utilisateur par ID
  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

   // Méthode pour mettre à jour les informations de l'utilisateur
  updateUser(userId: number, userData: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${userId}`, userData);
  }

  // Méthode pour uploader la photo de profil
  uploadProfilePicture(imageUrl: string): Observable<User> {
    const currentUser = this.getCurrentUser(); // Récupérer l'utilisateur actuel

    if (!currentUser || !currentUser.id) {
        throw new Error('Utilisateur non trouvé ou ID manquant');
    }

    // Créer un nouvel objet userData avec la nouvelle image de profil en Base64
    const userData: User = {
        id: currentUser.id,
        email: currentUser.email,
        password: currentUser.password, // Assurez-vous que l'API ne demande pas un mot de passe lors de la mise à jour
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        role: currentUser.role,
        pseudo: currentUser.pseudo,
        profile: {
            imageUrl: imageUrl // Met à jour l'URL de l'image de profil
        }
    };

    // Faire une requête PUT vers l'API pour mettre à jour l'utilisateur
    return this.http.put<User>(`${this.apiUrl}/${currentUser.id}`, userData).pipe(
        tap(updatedUser => {
            this.setCurrentUser(updatedUser); // Mettez à jour l'utilisateur dans le BehaviorSubject
        })
    );
  }
}
