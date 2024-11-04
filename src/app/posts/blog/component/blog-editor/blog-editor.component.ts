// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
// import { User, AuthService } from 'src/app/pages/services/auth.service';
// import { interval, Subscription } from 'rxjs';
// import { TECHNOLOGIES } from '../../models/technologies.model';

// interface Chapter {
//   title: string;
//   content: string;
// }

// interface BlogTechnology {
//   name: string;
//   logoUrl: string;
// }

// @Component({
//   selector: 'app-blog-editor',
//   templateUrl: './blog-editor.component.html',
//   styleUrls: ['./blog-editor.component.scss']
// })
// export class BlogEditorComponent implements OnInit, OnDestroy {
//   editorContent: string = '';
//   coverImageUrl: string = '';
//   coverText: string = '';
//   isPreviewVisible: boolean = false;
//   isLocalImage: boolean = false;
//   currentUser: User | null = null;
//   maxCoverTextLength: number = 250;
//   chapters: Chapter[] = [{ title: '', content: '' }];
//   technologies: BlogTechnology[] = [];
//   newTechnology: string = '';
//   scheduledDate: string | null | any = null;
//   private publicationChecker$!: Subscription;
//   publishedBlogs: any[] = []; // ou utilisez un type plus spécifique, si possible

//   editorModules = {
//     toolbar: [
//       ['bold', 'italic', 'underline', 'strike'],
//       ['blockquote', 'code-block'],
//       [{ header: 1 }, { header: 2 }],
//       [{ list: 'ordered' }, { list: 'bullet' }],
//       [{ script: 'sub' }, { script: 'super' }],
//       [{ indent: '-1' }, { indent: '+1' }],
//       [{ direction: 'rtl' }],
//       [{ size: ['small', false, 'large', 'huge'] }],
//       [{ header: [1, 2, 3, 4, 5, 6, false] }],
//       [{ color: [] }, { background: [] }],
//       [{ font: [] }],
//       [{ align: [] }],
//       ['clean'],
//       ['link', 'image', 'video']
//     ]
//   };

//   constructor(
//     private http: HttpClient,
//     private authService: AuthService,
//     private sanitizer: DomSanitizer
//   ) {
//     this.currentUser = this.authService.getCurrentUser();
//   }

//   ngOnInit(): void {
//     this.startPublicationChecker();
//   }

//   ngOnDestroy() {
//     if (this.publicationChecker$) {
//       this.publicationChecker$.unsubscribe();
//     }
//   }

//   addTechnology() {
//     const tech = TECHNOLOGIES.find(t => t.name.toLowerCase() === this.newTechnology.toLowerCase());

//     if (tech) {
//       this.technologies.push({ name: tech.name, logoUrl: tech.logoUrl });
//     } else {
//       this.technologies.push({ name: this.newTechnology, logoUrl: 'assets/logos/default.png' });
//     }

//     this.newTechnology = '';
//   }

//   removeTechnology(index: number) {
//     this.technologies.splice(index, 1);
//   }

//   getSanitizedContent(content: string): SafeHtml {
//     return this.sanitizer.bypassSecurityTrustHtml(content);
//   }

//   addChapter() {
//     this.chapters.push({ title: '', content: '' });
//   }

//   removeChapter(index: number) {
//     if (this.chapters.length > 1) {
//       this.chapters.splice(index, 1);
//     }
//   }

//   togglePreview() {
//     this.isPreviewVisible = !this.isPreviewVisible;
//   }

//   onFileSelected(event: any) {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e: any) => {
//         this.coverImageUrl = e.target.result;
//         this.isLocalImage = true;
//       };
//       reader.readAsDataURL(file);
//     }
//   }

//   publishBlog() {
//     if (!this.coverText || !this.coverImageUrl || this.chapters.length === 0) {
//       alert('Veuillez remplir tous les champs avant de publier.');
//       return;
//     }

//     const newBlog = {
//       coverImageUrl: this.coverImageUrl,
//       coverText: this.coverText,
//       date: new Date().toISOString(),
//       status: 'published',
//       userId: this.currentUser?.id,
//       author: `${this.currentUser?.firstName || ''} ${this.currentUser?.lastName || ''}`.trim(),
//       chapters: this.chapters,
//       technologies: this.technologies,
//       profileImageUrl: this.currentUser?.profile?.imageUrl || 'assets/default-profile.png',
//     };

//     this.http.post('http://localhost:3000/blogs', newBlog).subscribe(
//       () => {
//         alert('Blog publié avec succès !');
//         this.resetForm();
//       },
//       (error) => {
//         console.error('Erreur lors de la publication du blog :', error);
//         alert('Erreur lors de la publication. Veuillez réessayer.');
//       }
//     );
//   }

//   saveDraft() {
//     if (this.currentUser) {
//       const draftBlog = {
//         coverImageUrl: this.coverImageUrl,
//         coverText: this.coverText,
//         date: new Date().toISOString(),
//         status: 'draft',
//         userId: this.currentUser.id,
//         author: this.currentUser.firstName + ' ' + this.currentUser.lastName,
//         chapters: this.chapters
//       };

//       this.http.post('http://localhost:3000/blogs', draftBlog).subscribe(
//         () => {
//           alert('Brouillon enregistré avec succès !');
//           this.resetForm();
//         },
//         (error) => {
//           console.error('Erreur lors de l\'enregistrement du brouillon:', error);
//         }
//       );
//     } else {
//       alert('Vous devez être connecté pour enregistrer un brouillon.');
//     }
//   }

//   resetForm() {
//     this.editorContent = '';
//     this.coverImageUrl = '';
//     this.coverText = '';
//     this.isLocalImage = false;
//     this.isPreviewVisible = false;
//     this.chapters = [{ title: '', content: '' }];
//     this.technologies = [];
//   }

//   schedulePublication() { 
//     if (this.scheduledDate) {
//       const publishDate = new Date(this.scheduledDate);

//       if (publishDate > new Date()) {
//         const newProgrammedBlog = {
//           coverImageUrl: this.coverImageUrl,
//           coverText: this.coverText,
//           date: publishDate.toISOString(),
//           status: 'scheduled', // Statut initial à "scheduled" pour éviter la publication immédiate
//           userId: this.currentUser?.id,
//           author: `${this.currentUser?.firstName || ''} ${this.currentUser?.lastName || ''}`.trim(),
//           chapters: this.chapters,
//           technologies: this.technologies,
//           profileImageUrl: this.currentUser?.profile?.imageUrl || 'assets/default-profile.png',
//         };

//         // Envoi de la requête de programmation
//         this.http.post('http://localhost:4000/program', newProgrammedBlog).subscribe(
//           (response) => {
//             console.log('Réponse de programmation:', response);
//             alert('Blog programmé avec succès pour la publication !');
//             this.resetForm();
//             this.refreshPublishedBlogs(); // Rafraîchit la liste des blogs programmés
//           },
//           (error) => {
//             console.error('Erreur lors de la programmation de la publication :', error);
//             alert('Erreur lors de la programmation. Veuillez vérifier le serveur de programmation.');
//           }
//         );
//       } else {
//         alert('Veuillez sélectionner une date future pour la publication.');
//       }
//     } else {
//       alert('Veuillez sélectionner une date pour la programmation de la publication.');
//     }
//   }

//   // Surveille la programmation des publications
//   startPublicationChecker() {
//     this.publicationChecker$ = interval(60000).subscribe(() => {
//       this.checkScheduledPublications();
//     });
//   }

//   // Vérifie et publie si la date est atteinte
//   checkScheduledPublications() {
//     this.http.get<any[]>('http://localhost:4000/program').subscribe(
//       (scheduledBlogs) => {
//         console.log('Blogs programmés récupérés:', scheduledBlogs);

//         const now = new Date();
//         scheduledBlogs.forEach((blog) => {
//           const publishDate = new Date(blog.date);
//           console.log(`Vérification de la date de publication pour le blog ID ${blog.id}: ${publishDate}`);

//           // Vérifie si la date programmée est passée
//           if (publishDate <= now) {
//             // Vérifie si le blog a déjà été publié
//             this.http.get<any[]>(`http://localhost:3000/blogs?id=${blog.id}`).subscribe((existingBlog) => {
//               if (existingBlog.length === 0) { // Vérifie si le blog n'est pas déjà publié
//                 const publishedBlog = { ...blog, status: 'published' };

//                 // Publie le blog
//                 this.http.post('http://localhost:3000/blogs', publishedBlog).subscribe(
//                   (response) => {
//                     console.log(`Blog ID ${blog.id} publié avec succès:`, response);
//                     this.refreshPublishedBlogs(); // Rafraîchit les blogs publiés

//                     // Supprime l'entrée de la programmation
//                     this.http.delete(`http://localhost:4000/program/${blog.id}`).subscribe(
//                       () => console.log(`Blog ID ${blog.id} supprimé des programmations`),
//                       (deleteError) => console.error('Erreur lors de la suppression de la programmation :', deleteError)
//                     );
//                   },
//                   (publishError) => console.error('Erreur de publication de blog :', publishError)
//                 );
//               }
//             });
//           }
//         });
//       },
//       (error) => console.error('Erreur récupération de publications programmées :', error)
//     );
//   }

//   refreshPublishedBlogs() {
//     this.http.get<any[]>('http://localhost:3000/blogs').subscribe(
//       (publishedBlogs) => {
//         this.publishedBlogs = publishedBlogs;
//         console.log('Liste des blogs publiés mise à jour:', this.publishedBlogs);
//       },
//       (error) => console.error('Erreur lors de la récupération des blogs publiés :', error)
//     );
//   } 
// }
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { User, AuthService } from 'src/app/pages/services/auth.service';
import { interval, Subscription } from 'rxjs';
import { TECHNOLOGIES } from '../../models/technologies.model';

interface Chapter {
  title: string;
  content: string;
}

interface BlogTechnology {
  name: string;
  logoUrl: string;
}

@Component({
  selector: 'app-blog-editor',
  templateUrl: './blog-editor.component.html',
  styleUrls: ['./blog-editor.component.scss']
})
export class BlogEditorComponent implements OnInit, OnDestroy {
  editorContent: string = '';
  coverImageUrl: string = '';
  coverText: string = '';
  isPreviewVisible: boolean = false;
  isLocalImage: boolean = false;
  currentUser: User | null = null;
  maxCoverTextLength: number = 250;
  chapters: Chapter[] = [{ title: '', content: '' }];
  technologies: BlogTechnology[] = [];
  newTechnology: string = '';
  scheduledDate: string | null | any = null;
  private publicationChecker$!: Subscription;
  publishedBlogs: any[] = [];

  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ['clean'],
      ['link', 'image', 'video']
    ]
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    this.startPublicationChecker();
  }

  ngOnDestroy() {
    if (this.publicationChecker$) {
      this.publicationChecker$.unsubscribe();
    }
  }

  addTechnology() {
    const tech = TECHNOLOGIES.find(t => t.name.toLowerCase() === this.newTechnology.toLowerCase());

    if (tech) {
      this.technologies.push({ name: tech.name, logoUrl: tech.logoUrl });
    } else {
      this.technologies.push({ name: this.newTechnology, logoUrl: 'assets/logos/default.png' });
    }

    this.newTechnology = '';
  }

  removeTechnology(index: number) {
    this.technologies.splice(index, 1);
  }

  getSanitizedContent(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  addChapter() {
    this.chapters.push({ title: '', content: '' });
  }

  removeChapter(index: number) {
    if (this.chapters.length > 1) {
      this.chapters.splice(index, 1);
    }
  }

  togglePreview() {
    this.isPreviewVisible = !this.isPreviewVisible;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.coverImageUrl = e.target.result;
        this.isLocalImage = true;
      };
      reader.readAsDataURL(file);
    }
  }

  publishBlog() {
    if (!this.coverText || !this.coverImageUrl || this.chapters.length === 0) {
      alert('Veuillez remplir tous les champs avant de publier.');
      return;
    }

    const newBlog = {
      coverImageUrl: this.coverImageUrl,
      coverText: this.coverText,
      date: new Date().toISOString(),
      status: 'published',
      userId: this.currentUser?.id,
      author: `${this.currentUser?.firstName || ''} ${this.currentUser?.lastName || ''}`.trim(),
      chapters: this.chapters,
      technologies: this.technologies,
      profileImageUrl: this.currentUser?.profile?.imageUrl || 'assets/default-profile.png',
    };

    this.http.post('http://localhost:3000/blogs', newBlog).subscribe(
      () => {
        alert('Blog publié avec succès !');
        this.resetForm();
      },
      (error) => {
        console.error('Erreur lors de la publication du blog :', error);
        alert('Erreur lors de la publication. Veuillez réessayer.');
      }
    );
  }

  saveDraft() {
    if (this.currentUser) {
      const draftBlog = {
        coverImageUrl: this.coverImageUrl,
        coverText: this.coverText,
        date: new Date().toISOString(),
        status: 'draft',
        userId: this.currentUser.id,
        author: this.currentUser.firstName + ' ' + this.currentUser.lastName,
        chapters: this.chapters
      };

      this.http.post('http://localhost:3000/blogs', draftBlog).subscribe(
        () => {
          alert('Brouillon enregistré avec succès !');
          this.resetForm();
        },
        (error) => {
          console.error('Erreur lors de l\'enregistrement du brouillon:', error);
        }
      );
    } else {
      alert('Vous devez être connecté pour enregistrer un brouillon.');
    }
  }

  resetForm() {
    this.editorContent = '';
    this.coverImageUrl = '';
    this.coverText = '';
    this.isLocalImage = false;
    this.isPreviewVisible = false;
    this.chapters = [{ title: '', content: '' }];
    this.technologies = [];
  }

  schedulePublication() { 
    if (this.scheduledDate) {
      const publishDate = new Date(this.scheduledDate);

      if (publishDate > new Date()) {
        const newProgrammedBlog = {
          coverImageUrl: this.coverImageUrl,
          coverText: this.coverText,
          date: publishDate.toISOString(),
          status: 'scheduled',
          userId: this.currentUser?.id,
          author: `${this.currentUser?.firstName || ''} ${this.currentUser?.lastName || ''}`.trim(),
          chapters: this.chapters,
          technologies: this.technologies,
          profileImageUrl: this.currentUser?.profile?.imageUrl || 'assets/default-profile.png',
        };

        this.http.post('http://localhost:4000/program', newProgrammedBlog).subscribe(
          (response) => {
            console.log('Réponse de programmation:', response);
            alert('Blog programmé avec succès pour la publication !');
            this.resetForm();
            this.refreshPublishedBlogs();
          },
          (error) => {
            console.error('Erreur lors de la programmation de la publication :', error);
            alert('Erreur lors de la programmation. Veuillez vérifier le serveur de programmation.');
          }
        );
      } else {
        alert('Veuillez sélectionner une date future pour la publication.');
      }
    } else {
      alert('Veuillez sélectionner une date pour la programmation de la publication.');
    }
  }

  startPublicationChecker() {
    this.publicationChecker$ = interval(60000).subscribe(() => {
      this.checkScheduledPublications();
    });
  }

  checkScheduledPublications() {
    this.http.get<any[]>('http://localhost:4000/program').subscribe(
      (scheduledBlogs) => {
        console.log('Blogs programmés récupérés:', scheduledBlogs);

        const now = new Date();
        scheduledBlogs.forEach((blog) => {
          const publishDate = new Date(blog.date);
          console.log(`Vérification de la date de publication pour le blog ID ${blog.id}: ${publishDate}`);

          if (publishDate <= now) {
            this.http.get<any[]>(`http://localhost:3000/blogs?id=${blog.id}`).subscribe((existingBlog) => {
              if (existingBlog.length === 0) {
                const publishedBlog = { ...blog, status: 'published' };

                this.http.post('http://localhost:3000/blogs', publishedBlog).subscribe(
                  (response) => {
                    console.log(`Blog ID ${blog.id} publié avec succès:`, response);
                    this.refreshPublishedBlogs();

                    this.http.delete(`http://localhost:4000/program/${blog.id}`).subscribe(
                      () => console.log(`Blog ID ${blog.id} supprimé des programmations`),
                      (deleteError) => console.error('Erreur lors de la suppression de la programmation :', deleteError)
                    );
                  },
                  (publishError) => console.error('Erreur de publication de blog :', publishError)
                );
              }
            });
          }
        });
      },
      (error) => console.error('Erreur récupération de publications programmées :', error)
    );
  }

  refreshPublishedBlogs() {
    this.http.get<any[]>('http://localhost:3000/blogs').subscribe(
      (publishedBlogs) => {
        this.publishedBlogs = publishedBlogs;
        console.log('Liste des blogs publiés mise à jour:', this.publishedBlogs);
      },
      (error) => console.error('Erreur lors de la récupération des blogs publiés :', error)
    );
  }
}
