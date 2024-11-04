import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule, Location } from '@angular/common';
// import { ImageHoverService } from '../image-hover.service';

@Component({
  selector: 'app-technologies-details',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './technologies-details.component.html',
  styleUrls: ['./technologies-details.component.scss']
})
export class TechnologiesDetailsComponent implements OnInit {
  technologies: any[] = [];

  @ViewChildren('techSection') techSections!: QueryList<ElementRef>;

  constructor(
    private route: ActivatedRoute, 
    private http: HttpClient, 
    private location: Location,
    // private imageHoverService: ImageHoverService
  ) {}

  ngOnInit(): void {
    this.fetchTechnologies();
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        setTimeout(() => this.scrollToTechnology(fragment), 100);  // Petit délai pour s’assurer du rendu.
      }
    });
  }

  fetchTechnologies() {
    this.http.get<any[]>('http://localhost:4000/tech').subscribe({
      next: (data) => (this.technologies = data),
      error: (err) => console.error('Erreur lors du chargement des technologies', err),
    });
  }

  scrollToTechnology(techName: string) {
    const techElement = this.techSections.find(
      (section) => section.nativeElement.id === techName
    );

    if (techElement) {
      techElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn('Aucun élément trouvé pour:', techName);
    }
  }

  goBack() {
    this.location.back();  // Retour à la page précédente
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
