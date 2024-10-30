// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { ActivatedRoute, Router } from '@angular/router';
// import { User } from '../../../auth/models/user';
// import { AuthService } from '../../../auth/service/auth.service';
// import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

// interface Chapter {
//   title: string;
//   content: string;
// }

// @Component({
//   selector: 'app-blog-draft-editor',
//   templateUrl: './blog-draft-editor.component.html',
//   styleUrls: ['./blog-draft-editor.component.scss']
// })
// export class BlogDraftEditorComponent implements OnInit {
//   editorContent: string = ''; 
//   coverImageUrl: string = '';  
//   coverText: string = '';     
//   isPreviewVisible: boolean = false;  
//   isLocalImage: boolean = false;     
//   blogId: string | null = null;      
//   currentUser: User | null = null;    
//   maxCoverTextLength = 250;
//   chapters: Chapter[] = [{ title: '', content: '' }]; // Liste des chapitres

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
//   blog: any;

//   constructor(
//     private http: HttpClient, 
//     private route: ActivatedRoute, 
//     private router: Router, 
//     private authService: AuthService,
//     private sanitizer: DomSanitizer
//   ) {
//     this.currentUser = this.authService.getCurrentUser();
//   }

  // validateCoverTextLength(text: string): boolean {
  //   return text.length <= this.maxCoverTextLength;
  // }

  // checkCoverTextLength() {
  //   if (this.coverText.length > this.maxCoverTextLength) {
  //   }
  // }

//   ngOnInit() {
//     this.blogId = this.route.snapshot.paramMap.get('id');
//     if (this.blogId) {
//       this.loadDraft(this.blogId);
//     }
//   }

//   getSanitizedContent(content: string): SafeHtml {
//     return this.sanitizer.bypassSecurityTrustHtml(content);
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

//   saveChanges() {
//     const updatedDraft = {
//       content: this.editorContent,
//       coverImageUrl: this.coverImageUrl,
//       coverText: this.coverText,
//       chapters: this.chapters, // Ajouter les chapitres
//       status: 'draft'
//     };
  
//     this.http.put(`http://localhost:3000/blogs/${this.blogId}`, updatedDraft).subscribe(
//       () => {
//         alert('Brouillon mis à jour avec succès !');
//         this.router.navigate(['/auth/user-dashboard']);
//       },
//       (error) => {
//         console.error('Erreur lors de l\'enregistrement des modifications:', error);
//       }
//     );
//   }
  

//   updateBlog() {
//     if (this.currentUser) {
//       const updatedBlog = {
//         content: this.editorContent,
//         coverImageUrl: this.coverImageUrl,
//         coverText: this.coverText,
//         chapters: this.chapters,  // Ajout des chapitres
//         date: new Date().toISOString(),
//         status: 'published',
//         userId: this.currentUser.id,
//         author: `${this.currentUser.firstName} ${this.currentUser.lastName}`
//       };
      
//       this.http.put(`http://localhost:3000/blogs/${this.blogId}`, updatedBlog).subscribe(
//         () => {
//           alert('Blog publié avec succès !');
//           this.router.navigate(['/blogs/list']);
//         },
//         (error) => {
//           console.error('Erreur lors de la mise à jour du blog:', error);
//           alert('Une erreur s\'est produite lors de la mise à jour. Veuillez réessayer.');
//         }
//       );
      
//     } else {
//       alert('Vous devez être connecté pour mettre à jour un blog.');
//     }
//   }

//   deleteDraft() {
//     this.http.delete(`http://localhost:3000/blogs/${this.blogId}`).subscribe(
//       () => {
//         alert('Brouillon supprimé avec succès !');
//         this.router.navigate(['/blog-list']);
//       },
//       (error) => {
//         console.error('Erreur lors de la suppression du brouillon:', error);
//       }
//     );
//   }

//   togglePreview() {
//     this.isPreviewVisible = !this.isPreviewVisible;
//   }

//   addChapter() {
//     this.chapters.push({ title: '', content: '' }); // Ajoute un nouveau chapitre
//   }

//   removeChapter(index: number) {
//     if (this.chapters.length > 1) {
//       this.chapters.splice(index, 1); // Supprime le chapitre spécifié
//     }
//   }

//   publishBlog() {
//     if (!this.coverText || !this.coverImageUrl || this.chapters.length === 0) {
//       alert('Veuillez remplir tous les champs avant de publier.');
//       return;
//     }
  
//     const userId = JSON.parse(localStorage.getItem('currentUser') || '{}').id;
  
//     this.http.get<User>(`http://localhost:3000/users/${userId}`).subscribe(
//       (user) => {
//         const blogToSave = {
//           id: this.blog?.id, // Conserve l'ID s'il existe déjà
//           coverImageUrl: this.coverImageUrl,
//           coverText: this.coverText,
//           date: new Date().toISOString(),
//           status: 'published', // Statut mis à jour
//           userId: user.id,
//           author: user.pseudo,
//           chapters: this.chapters,
//         };
  
//         const request = blogToSave.id 
//           ? this.http.put(`http://localhost:3000/blogs/${blogToSave.id}`, blogToSave) // Mise à jour
//           : this.http.post('http://localhost:3000/blogs', blogToSave); // Création
  
//         request.subscribe(
//           () => {
//             alert('Blog publié avec succès !');
//             this.resetForm();
//           },
//           (error) => {
//             console.error('Erreur lors de la publication du blog :', error);
//             alert('Erreur lors de la publication. Veuillez réessayer.');
//           }
//         );
//       },
//       (error) => {
//         console.error('Erreur lors de la récupération de l\'utilisateur :', error);
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
//         chapters: this.chapters // Ajout des chapitres au brouillon
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
//   }

//   loadDraft(id: string) {
//     this.http.get(`http://localhost:3000/blogs/${id}`).subscribe((blog: any) => {
//       this.editorContent = blog.content || ''; // Assigner le contenu principal
//       this.coverImageUrl = blog.coverImageUrl || ''; 
//       this.coverText = blog.coverText || ''; 
//       this.chapters = blog.chapters || [{ title: '', content: '' }]; // Charger les chapitres
  
//       console.log('Brouillon chargé:', blog); // Debug pour vérifier les données récupérées
//     }, (error) => {
//       console.error('Erreur lors du chargement du brouillon:', error);
//     });
//   }
// }










import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { User, AuthService } from 'src/app/pages/services/auth.service';

interface Chapter {
  title: string;
  content: string;
}

@Component({
  selector: 'app-blog-draft-editor',
  templateUrl: './blog-draft-editor.component.html',
  styleUrls: ['./blog-draft-editor.component.scss'],
})
export class BlogDraftEditorComponent implements OnInit {
  editorContent: string = '';
  coverImageUrl: string = '';
  coverText: string = '';
  isPreviewVisible: boolean = false;
  isLocalImage: boolean = false;
  blogId: string | null = null;
  currentUser: User | null = null;
  maxCoverTextLength = 250;
  chapters: Chapter[] = [{ title: '', content: '' }];
  blog: any;

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
      ['link', 'image', 'video'],
    ],
  };

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit() {
    this.blogId = this.route.snapshot.paramMap.get('id');
    if (this.blogId) {
      this.loadDraft(this.blogId);
    }
  }

  getSanitizedContent(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
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

  saveChanges() {
    if (!this.blogId) return; // Assure-toi que l'ID est présent

    const updatedDraft = {
      content: this.editorContent,
      coverImageUrl: this.coverImageUrl,
      coverText: this.coverText,
      chapters: this.chapters,
      status: 'draft',
    };

    this.http.put(`http://localhost:3000/blogs/${this.blogId}`, updatedDraft).subscribe(
      () => {
        alert('Brouillon mis à jour avec succès !');
        this.router.navigate(['/auth/user-dashboard']);
      },
      (error) => {
        console.error('Erreur lors de l\'enregistrement des modifications:', error);
      }
    );
  }

  publishBlog() {
    if (!this.coverText || !this.coverImageUrl || this.chapters.length === 0) {
      alert('Veuillez remplir tous les champs avant de publier.');
      return;
    }

    const blogToSave = {
      id: this.blog?.id || undefined, // Conserve l'ID si existant
      coverImageUrl: this.coverImageUrl,
      coverText: this.coverText,
      date: new Date().toISOString(),
      status: 'published',
      userId: this.currentUser?.id,
      author: `${this.currentUser?.firstName} ${this.currentUser?.lastName}`,
      chapters: this.chapters,
      profileImageUrl: this.currentUser?.profile?.imageUrl
    };

    const request = blogToSave.id
      ? this.http.put(`http://localhost:3000/blogs/${blogToSave.id}`, blogToSave)
      : this.http.post('http://localhost:3000/blogs', blogToSave);

    request.subscribe(
      () => {
        alert('Blog publié avec succès !');
        this.resetForm();
        this.router.navigate(['/blogs/list']);
      },
      (error) => {
        console.error('Erreur lors de la publication du blog :', error);
        alert('Erreur lors de la publication. Veuillez réessayer.');
      }
    );
  }

  deleteDraft() {
    if (!this.blogId) return;

    this.http.delete(`http://localhost:3000/blogs/${this.blogId}`).subscribe(
      () => {
        alert('Brouillon supprimé avec succès !');
        this.router.navigate(['/blog-list']);
      },
      (error) => {
        console.error('Erreur lors de la suppression du brouillon:', error);
      }
    );
  }

  togglePreview() {
    this.isPreviewVisible = !this.isPreviewVisible;
  }

  addChapter() {
    this.chapters.push({ title: '', content: '' });
  }

  removeChapter(index: number) {
    if (this.chapters.length > 1) {
      this.chapters.splice(index, 1);
    }
  }

  saveDraft() {
    if (!this.currentUser) {
      alert('Vous devez être connecté pour enregistrer un brouillon.');
      return;
    }

    const draftBlog = {
      coverImageUrl: this.coverImageUrl,
      coverText: this.coverText,
      date: new Date().toISOString(),
      status: 'draft',
      userId: this.currentUser.id,
      author: `${this.currentUser.firstName} ${this.currentUser.lastName}`,
      chapters: this.chapters,
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
  }

  resetForm() {
    this.editorContent = '';
    this.coverImageUrl = '';
    this.coverText = '';
    this.isLocalImage = false;
    this.isPreviewVisible = false;
    this.chapters = [{ title: '', content: '' }];
  }

  loadDraft(id: string) {
    this.http.get<any>(`http://localhost:3000/blogs/${id}`).subscribe(
      (blog) => {
        this.blog = blog;
        this.editorContent = blog.content || '';
        this.coverImageUrl = blog.coverImageUrl || '';
        this.coverText = blog.coverText || '';
        this.chapters = blog.chapters || [{ title: '', content: '' }];
      },
      (error) => {
        console.error('Erreur lors du chargement du brouillon:', error);
      }
    );
  }

  validateCoverTextLength(text: string): boolean {
    return text.length <= this.maxCoverTextLength;
  }

  checkCoverTextLength() {
    if (this.coverText.length > this.maxCoverTextLength) {
    }
  }
}