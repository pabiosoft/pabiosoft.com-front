// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-technologies',
//   standalone: true,
//   imports: [
//     CommonModule
//   ],
//   templateUrl: './technologies.component.html',
//   styleUrl: './technologies.component.scss'
// })
// export class TechnologiesComponent implements OnInit{
//   technologies: any[] = [];
//   constructor(
//     private router: Router, 
//     private http: HttpClient
//   ){}

//   ngOnInit(): void {
//     this.fetchTechnologies();
//   }

//   fetchTechnologies() {
//     this.http.get<any[]>('http://localhost:4000/tech').subscribe({
//       next: (data) => (this.technologies = data),
//       error: (err) => console.error('Erreur lors du chargement des technologies', err),
//     });
//   }

//   goToTechnology(tech: any) {
//     this.router.navigate(['/technologies'], { fragment: tech.name });
//   }

//   showMore(tech: any) {
//     alert(`Plus d'informations sur ${tech.name}.`);
//   }

//   isHovered = false;

//   toggleIcon(hover: boolean) {
//     this.isHovered = hover;
//   }

// }



import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { ImageHoverService } from '../image-hover.service';

@Component({
  selector: 'app-technologies',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.scss']  // Corrigé pour "styleUrls"
})
export class TechnologiesComponent implements OnInit {
  technologies: any[] = [];

  constructor(
    private router: Router, 
    private http: HttpClient,
    private route: ActivatedRoute,
    // private imageHoverService: ImageHoverService
  ) {}

  ngOnInit(): void {
    this.fetchTechnologies();
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  fetchTechnologies() {
    this.http.get<any[]>('http://localhost:4000/tech').subscribe({
      next: (data) => (this.technologies = data),
      error: (err) => console.error('Erreur lors du chargement des technologies', err),
    });
  }

  goToTechnology(tech: any) {
    this.router.navigate(['/technologies'], { fragment: tech.name });
  }

  showMore(tech: any) {
    alert(`Plus d'informations sur ${tech.name}.`);
  }

  isHovered = false;

  toggleIcon(hover: boolean) {
    this.isHovered = hover;
  }

  ListTech(){
    this.router.navigate(['/technologies']);
  }

  onMouseOver(event: MouseEvent): void {
    // const target = event.target as HTMLImageElement; // Assertion de type
    // if (target) {
    //   this.imageHoverService.enlargeImage(target);
    // }
  }

  onMouseOut(event: MouseEvent): void {
    // const target = event.target as HTMLImageElement; // Assertion de type
    // if (target) {
    //   this.imageHoverService.resetImage(target);
    // }
  }
}
