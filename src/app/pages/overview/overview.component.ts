import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit{

  ngOnInit(): void {
  }

  truncateActeDescription(acte: string): string {
    const words = acte.split(' ');
    if (words.length > 2) {
      return words.slice(0, 3).join(' ') + '...';
    }
    return acte;
  }



}
