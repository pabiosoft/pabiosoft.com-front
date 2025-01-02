import { Injectable } from '@angular/core';
import {algoliasearch, SearchClient} from "algoliasearch";

@Injectable({
    providedIn: 'root',
})
export class AlgoliaService {
    private searchClient: SearchClient;

    constructor() {
        // Initialiser le client Algolia avec vos identifiants
        this.searchClient = algoliasearch(
            'YLVS5BS6XW', // Remplacez par votre App ID
            '1bc2b8a1336a3881228edaa47f33666d' // Remplacez par votre clé API
        );
    }

    search(indexName: string, q: string): Promise<any> {
        return this.searchClient.search([
            {
                indexName: indexName,
                params: {
                    query: q, // Correctement structuré ici
                    hitsPerPage: 10,
                    attributesToRetrieve: ['title', 'content', 'tags', 'author', 'createdAt','objectID'], // Assurez-vous que ces attributs existent dans Algolia
                },
            },
        ]);
    }


}
