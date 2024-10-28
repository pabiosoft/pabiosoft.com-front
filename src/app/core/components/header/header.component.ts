import {Component, OnInit} from '@angular/core';
import {SidebarService} from "../../services/sidebar.service";

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  isDropdownOpen = false;

  constructor(private sidebarService: SidebarService) {
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
