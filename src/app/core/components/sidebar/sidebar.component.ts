import {Component, OnInit} from '@angular/core';
import {ResumeProfilsComponent} from "../../../pages/resume-profils/resume-profils.component";
import {CoreModule} from "../../core.module";
import {OverviewComponent} from "../../../pages/overview/overview.component";
import {SidebarService} from "../../services/sidebar.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    ResumeProfilsComponent,
    CoreModule,
    OverviewComponent,
    NgIf
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  isSidebarOpen = false;

  constructor(private sidebarService: SidebarService) {
  }

  ngOnInit(): void {
    this.sidebarService.sidebarOpen$.subscribe(isOpen=>{
      this.isSidebarOpen = isOpen
    })
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar(): void {
   this.sidebarService.closeSidebar()
  }

}
