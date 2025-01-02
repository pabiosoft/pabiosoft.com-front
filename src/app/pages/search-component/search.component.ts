import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {AlgoliaService} from "../../core/services/algolia.service";
import {NgForOf, NgIf, SlicePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {SidebarModule} from "primeng/sidebar";
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-search',
  standalone: true,
    imports: [
        NgForOf,
        NgIf,
        RouterLink,
        SidebarModule,
        DialogModule,
        FormsModule,
        SlicePipe
    ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
    modalVisible = false;
    searchQuery = '';
    results: Array<{ objectID:string, title: string; content: string; tags: string; author: string }> = [];
    private isModalOpening = false; // Drapeau pour empêcher les doubles ouvertures

    constructor(private algoliaService: AlgoliaService) {}

    openSearchModal(): void {
        console.log('Tentative d\'ouverture du modal');
        if (!this.modalVisible && !this.isModalOpening) {
            this.isModalOpening = true;
            console.log('Modal ouvert');
            this.modalVisible = true;
            setTimeout(() => {
                this.isModalOpening = false;
            }, 100);
        }
    }


    closeSearchModal(): void {
        if (this.modalVisible) {
            console.log('Modal fermé');
            this.modalVisible = false;
            this.searchQuery = '';
            this.results = [];
        }
    }

    onSearch(): void {
        if (this.searchQuery.trim().length > 0) {
            this.algoliaService
                .search('articles', this.searchQuery)
                .then((response) => {
                    console.log('Réponse Algolia :', response); // Assurez-vous que la réponse est conforme

                    // Vérifiez que `results` et `hits` existent
                    if (response.results && response.results[0].hits) {
                        this.results = response.results[0].hits.map((hit: any) => ({
                            objectID: hit.objectID,
                            title: hit.title || 'Titre non disponible',
                            content: hit.content || 'Contenu non disponible',
                            tags: hit.tags ? hit.tags.join(', ') : 'Aucun tag',
                            author: hit.author || 'Auteur inconnu',
                        }));
                    } else {
                        console.warn('Structure inattendue ou aucun résultat.');
                        this.results = [];
                    }
                })
                .catch((error) => {
                    console.error('Erreur de recherche :', error);
                    this.results = [];
                });
        } else {
            this.results = [];
        }
    }

    // Capture les raccourcis clavier

    @HostListener('window:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent): void {
        const isCtrlOrCmd = event.ctrlKey || event.metaKey;
        if (isCtrlOrCmd && event.key.toLowerCase() === 'k') {
            event.preventDefault();
            event.stopImmediatePropagation(); // Empêche tout autre listener d'agir
            this.openSearchModal();
        }
    }


}
