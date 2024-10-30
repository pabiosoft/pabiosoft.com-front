import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title!: any 
  showSidebar: boolean = false;
  currentRoute: string = '';

  constructor(
    private olympicService: OlympicService, 
    private router: Router) {
      // Écoute les changements de route pour détecter la page active
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = event.urlAfterRedirects;
          // Affiche la sidebar uniquement si la route est '/' ou ''
          this.showSidebar = this.currentRoute === '/' || this.currentRoute === '';
        }
      });
    }

  ngOnInit(): void {
    this.olympicService.loadInitialData().pipe(take(1)).subscribe();
  }

  affichageSidebar() {
    this.showSidebar = !this.showSidebar; // Alterner l'affichage de la sidebar
  }
}


// import { Component, OnInit } from '@angular/core';
// import { take } from 'rxjs';
// import { OlympicService } from './core/services/olympic.service';
// import { NavigationEnd, Router } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss'],
// })
// export class AppComponent implements OnInit {
//   title!: any;
//   afficherSidebar: boolean = false; // Nouvelle variable en français
//   routeActuelle: string = ''; // Route actuelle en français

//   constructor(
//     private olympicService: OlympicService, 
//     private router: Router
//   ) {
//     // Écouter les changements de route pour détecter la page active
//     this.router.events.subscribe((event) => {
//       if (event instanceof NavigationEnd) {
//         this.routeActuelle = event.urlAfterRedirects;
//         // Afficher la sidebar uniquement si la route est '/' ou ''
//         this.afficherSidebar = this.routeActuelle === '/' || this.routeActuelle === '';
//       }
//     });
//   }

//   ngOnInit(): void {
//     // Charger les données initiales depuis le service
//     this.olympicService.loadInitialData().pipe(take(1)).subscribe();
//   }

//   basculerSidebar() {
//     this.afficherSidebar = !this.afficherSidebar; // Basculer l'état de la sidebar
//   }
// }
