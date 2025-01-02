import { Component } from '@angular/core';
import {ImageModule} from "primeng/image";

@Component({
  selector: 'app-logiciels',
  standalone: true,
    imports: [
        ImageModule
    ],
  templateUrl: './logiciels.component.html',
  styleUrl: './logiciels.component.scss'
})
export class LogicielsComponent {

    scrollToSection(id: string): void {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

}
