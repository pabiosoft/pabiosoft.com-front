import {Component, OnInit} from '@angular/core';
import {SidebarService} from "../../services/sidebar.service";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  items: MenuItem[] | undefined;

  isDropdownOpen = false;
  //
  darkMode: boolean = false;

  constructor(private sidebarService: SidebarService) {
    this.items = [
      {
        label: 'Articles',
        icon: 'pi pi-book',
        link:'posts'
        // items: [
        //   { label: 'API Platform', icon: 'pi pi-code', routerLink: '/articles/php' },
        //   { label: 'Angular', icon: 'pi pi-code', routerLink: '/articles/angular' },
        //   { label: 'React', icon: 'pi pi-code', routerLink: '/articles/react' },
        //   { label: 'Flutter', icon: 'pi pi-code', routerLink: '/articles/flutter' },
        //   { label: 'CI/CD', icon: 'pi pi-cog', routerLink: '/articles/cicd' },
        //   { label: 'DevOps', icon: 'pi pi-server', routerLink: '/articles/devops' },
        //   { label: 'Gestion de Projet', icon: 'pi pi-calendar', routerLink: '/articles/project-management' },
        // ]
      },
      {
        label: 'Bibliothèque',
        icon: 'pi pi-bookmark',
        // items: [
        //   { label: 'Toutes les librairies', icon: 'pi pi-folder', routerLink: '/libraries' },
        // ]
      },
      {
        label: 'Logiciels',
        icon: 'pi pi-desktop',
        // items: [
        //   { label: 'Catalogue des logiciels', icon: 'pi pi-shopping-cart', routerLink: '/software' },
        // ]
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
        routerLink: '/contact',
      }
    ];

  }
  ngOnInit(): void {
    this.darkMode = localStorage.getItem('darkMode') === 'true';
    if (this.darkMode) {
      document.documentElement.classList.add('dark');
    }
  }


  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkMode', String(this.darkMode));
    if (this.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
  toggleSidebar(){
    this.sidebarService.toggleSidebar();
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }



}
