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
      },
      {
        label: 'Bibliothèque',
        icon: 'pi pi-bookmark',
      },
      {
        label: 'Logiciels',
        icon: 'pi pi-desktop',
        link: 'logiciels'
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
        link: 'contact',
      }
    ];

  }
  ngOnInit(): void {
    this.darkMode = localStorage.getItem('darkMode') === 'true';
    if (this.darkMode) {
      document.documentElement.classList.add('dark');
    }
  }

  removeFocus(event: Event): void {
    const target = event.target as HTMLElement;
    target.blur(); // Supprime le focus
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
