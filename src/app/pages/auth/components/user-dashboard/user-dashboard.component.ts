import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Blog } from '../../../blog/models/blog.model';
import { BlogService } from 'src/app/pages/services/blog.service';
import { ImageHoverService } from 'src/app/pages/services/image-hover.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  userBlogs: Blog[] = [];
  filteredBlogs: Blog[] = [];
  showFilterOptions: boolean = false;
  currentUser: User | any = null;
  showSettings: boolean = false;
  activeView: 'blogs' | 'settings' = 'blogs';
  userForm: FormGroup;
  authorBlogs: Blog[] = [];

  constructor(
    private blogService: BlogService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private imageHoverService: ImageHoverService
  ) {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pseudo: [''],
      firstName: [''],
      lastName: [''],
      profile: [null]
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      // this.loadUserBlogs();
      this.loadUserBlogs(this.currentUser.id); // Assurez-vous que `this.currentUser.id` est bien défini
      this.userForm.patchValue(this.currentUser);
    }
  }

  toggleSettings() {
    this.showSettings = !this.showSettings;
  }

  toggleView(view: 'blogs' | 'settings') {
    this.activeView = view;
  }

  readBlog(blog: Blog) {
    this.router.navigate(['/blogs/blogs/', blog.id]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  editDraft(blog: Blog) {
    this.router.navigate(['blogs/editor/', blog.id]);
  }

  loadUserBlogs(authorId: number) {
    this.blogService.getUserBlogs(authorId).subscribe({
      next: (blogs) => {
        this.authorBlogs = blogs; 
        console.log('Blogs de l\'auteur:', this.authorBlogs);
        this.filterBlogs('all'); 
      },
      error: (err) => console.error('Erreur lors du chargement des blogs:', err),
    });
  }
  

  selectBlogs() {
    this.showFilterOptions = !this.showFilterOptions;
  }

  filterBlogs(type: string) {
    this.showFilterOptions = false;
  
    switch (type) {
      case 'published':
        this.filteredBlogs = this.authorBlogs.filter(blog => blog.status === 'published');
        break;
      case 'draft':
        this.filteredBlogs = this.authorBlogs.filter(blog => blog.status === 'draft');
        break;
      default:
        this.filteredBlogs = [...this.authorBlogs]; 
        break;
    }
  }
  

  deleteBlog(blogId: number) {
    const enteredPassword = prompt('Veuillez entrer votre mot de passe pour confirmer la suppression :');

    if (enteredPassword && this.currentUser) {
      this.authService.verifyPassword(this.currentUser.email, enteredPassword).subscribe(isValid => {
        if (isValid) {
          this.blogService.deleteBlog(blogId).subscribe(() => {
            this.userBlogs = this.userBlogs.filter(blog => blog.id !== blogId);
            this.filteredBlogs = this.filteredBlogs.filter(blog => blog.id !== blogId);
            alert('Blog supprimé avec succès.');
          });
        } else {
          alert('Mot de passe incorrect. Suppression annulée.');
        }
      });
    } else {
      alert('Suppression annulée.');
    }
  }

  updateUser() {
    if (this.userForm.valid && this.currentUser) {
      const updatedUser: User = {
        ...this.currentUser,
        ...this.userForm.value
      };
      this.authService.updateUser(this.currentUser.id, updatedUser).subscribe(
        () => {
          alert('Informations mises à jour avec succès.');
          this.currentUser = updatedUser;
        },
        (error) => {
          alert('Erreur lors de la mise à jour des informations.');
          console.error(error);
        }
      );
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64Image = reader.result as string;

        this.authService.uploadProfilePicture(base64Image).subscribe(
          (updatedUser: User) => {
            this.currentUser = updatedUser;
            alert('Photo de profil mise à jour avec succès.');
            this.loadUserBlogs(this.currentUser.id); 
          },
          (error) => {
            alert('Erreur lors de la mise à jour de la photo de profil.');
            console.error(error);
          }
        );
      };
      reader.readAsDataURL(file);
    }
  }

  onMouseOver(event: MouseEvent): void {
    const target = event.target as HTMLImageElement; // Assertion de type
    if (target) {
      this.imageHoverService.enlargeImage(target);
    }
  }

  onMouseOut(event: MouseEvent): void {
    const target = event.target as HTMLImageElement; // Assertion de type
    if (target) {
      this.imageHoverService.resetImage(target);
    }
  }
}