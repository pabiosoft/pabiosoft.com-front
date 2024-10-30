import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SidebarService} from "../../services/sidebar.service";
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  isDropdownOpen: boolean = false; 

  constructor(
    private sidebarService: SidebarService) {
  }
  ngOnInit(): void {
  }

  toggleSidebar(){
    this.sidebarService.toggleSidebar();
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
