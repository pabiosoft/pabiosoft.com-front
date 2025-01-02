import {Component, OnInit} from '@angular/core';
import {TechnologieService} from "../../core/services/technologie.service";
import {Technology} from "../../core/models/technologies.model";
import {OrganizationChartModule} from "primeng/organizationchart";
import {TreeNode} from "primeng/api";
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-technologies',
  standalone: true,
  imports: [
    OrganizationChartModule,
    CardModule
  ],
  templateUrl: './technologies.component.html',
  styleUrl: './technologies.component.scss'
})
export class TechnologiesComponent implements OnInit{

  technologies: Technology[] | null = null;

  data: TreeNode[] = [];
  frontendData: TreeNode[] = [];
  backendData: TreeNode[] = [];
  technoData: TreeNode[] = [];
  selectedNodes: TreeNode[] = [];


  constructor(private technologieService: TechnologieService) {
  }
  ngOnInit(): void {
    this.loadTechnologies();
  }

  loadTechnologies(): void {
    this.technologieService.getTechnologiesTree().subscribe({
      next: (treeData: TreeNode[]) => {
        this.data = treeData;
        // Filtrer les données pour chaque catégorie
        this.frontendData = this.data.filter(node => node.label === 'Frontend');
        this.backendData = this.data.filter(node => node.label === 'Backend');
        this.technoData = this.data.filter(node => node.label === 'Techno');
      },
      error: (error) => {
        console.error('Failed to load technology data:', error);
      }
    });
  }

}
