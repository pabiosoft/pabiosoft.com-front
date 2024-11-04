import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from '../register/register.component';

@Component({
  // standalone: true,
  // imports: [
  //   CommonModule,
  //   FormsModule,
  //   ReactiveFormsModule,
  //   RegisterComponent,
  // ],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  showRegister: boolean = false; // Variable pour basculer entre login et register

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe((users) => {
      if (users.length > 0) {
        this.authService.setCurrentUser(users[0]);
        alert('Connexion réussie!');
        this.router.navigate(['/auth/user-dashboard']);
      } else {
        alert('Email ou mot de passe incorrect.');
      }
    });
  }

  toggleRegister(event: Event) {
    event.preventDefault();
    this.showRegister = !this.showRegister; // Alterne l'affichage entre login et register
  }
}
