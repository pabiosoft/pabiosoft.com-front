import { Component } from '@angular/core';
import {AccordionModule} from "primeng/accordion";
import {NgFor, NgForOf, NgIf} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {Button, ButtonDirective} from "primeng/button";
import {ChipsModule} from "primeng/chips";
import {ArticleAdd} from "../../core/models/article-add.model";
import {InputTextareaModule} from "primeng/inputtextarea";

@Component({
  selector: 'app-post-add',
  standalone: true,
  imports: [
    AccordionModule,
    NgFor,
    InputTextModule,
    FormsModule,
    DropdownModule,
    ButtonDirective,
    ChipsModule,
    InputTextareaModule,
    NgIf,
    Button
  ],
  templateUrl: './post-add.component.html',
  styleUrl: './post-add.component.scss'
})
export class PostAddComponent {
  article: ArticleAdd = {
    coverImageUrl: '',
    coverText: '',
    author: '',
    technologies: [],
    estimateTime: 0,
    chapters: [
      {
        title: '',
        content: [],
      },
    ],
    status: 'draft',
    visibility: 'private',
    tags: [],
    metaTitle: '',
    metaDescription: '',
    createdAt: new Date().toISOString(), // Date de création par défaut
    updatedAt: new Date().toISOString(), // Date de mise à jour par défaut
  };

  activeChapterIndex = 0; // Indice actif pour le p-accordion

  // Options pour le type de section
  sectionTypes = [
    { label: 'Text', value: 'text' },
    { label: 'Code', value: 'code' },
    { label: 'Media', value: 'media' },
  ];

  // Options pour le type de média
  mediaTypes = [
    { label: 'Image', value: 'image' },
    { label: 'Video', value: 'video' },
  ];

  // Options pour le statut
  statuses = [
    { label: 'Draft', value: 'draft' },
    { label: 'Published', value: 'published' },
  ];

  // Ajoute un nouveau chapitre
  addChapter(): void {
    this.article.chapters.push({
      title: '',
      content: [],
    });
  }
  // Ajoute une nouvelle section à un chapitre spécifique
  addSection(chapterIndex: number): void {
    this.article.chapters[chapterIndex].content.push({
      type: 'text', // Par défaut, le type est 'text'
      value: '',
    });
  }

  // Supprime une section d'un chapitre spécifique
  removeSection(chapterIndex: number, sectionIndex: number): void {
    this.article.chapters[chapterIndex].content.splice(sectionIndex, 1);
  }

  // Supprime un chapitre entier
  removeChapter(chapterIndex: number): void {
    this.article.chapters.splice(chapterIndex, 1);
  }

  // Méthode pour gérer le bouton "Discard"
  discardArticle(): void {
    // Réinitialise l'article avec les valeurs par défaut
    this.article = {
      coverImageUrl: '',
      coverText: '',
      author: '',
      technologies: [],
      estimateTime: 0,
      chapters: [
        {
          title: '',
          content: [],
        },
      ],
      status: 'draft',
      visibility: 'private',
      tags: [],
      metaTitle: '',
      metaDescription: '',
      createdAt: new Date().toISOString(), // Réinitialisation à la date actuelle
      updatedAt: new Date().toISOString(), // Réinitialisation à la date actuelle
    };
  }


  // Méthode pour gérer le bouton "Publish"
  publishArticle(): void {
    if (this.validateArticle()) {
      console.log('Article publié :', this.article);
      // Ajoutez ici la logique pour envoyer l'article à un backend ou à une API
    } else {
      console.error('Veuillez remplir tous les champs requis avant de publier.');
    }
  }

  // Valide l'article avant publication
  validateArticle(): boolean {
    if (!this.article.coverImageUrl || !this.article.coverText || !this.article.author) {
      return false;
    }
    if (this.article.chapters.length === 0) {
      return false;
    }
    for (const chapter of this.article.chapters) {
      if (!chapter.title || chapter.content.length === 0) {
        return false;
      }
    }
    return true;
  }
  // Méthode pour suivre les indices des éléments dans les boucles *ngFor
  trackByIndex(index: number): number {
    return index;
  }
}
