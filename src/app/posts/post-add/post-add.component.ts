import {Component, OnInit} from '@angular/core';
import {AccordionModule} from "primeng/accordion";
import {NgFor, NgForOf, NgIf, NgStyle} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {Button, ButtonDirective} from "primeng/button";
import {ChipsModule} from "primeng/chips";
import {ArticleAdd} from "../../core/models/article-add.model";
import {InputTextareaModule} from "primeng/inputtextarea";
import {Technology} from "../../core/models/technologies.model";
import {TreeNode} from "primeng/api";
import {TechnologieService} from "../../core/services/technologie.service";
import {MultiSelectModule} from "primeng/multiselect";
import {AuthorService} from "../../core/services/author.service";
import {Author} from "../../core/models/author.model";
import {Status, StatusService} from "../../core/services/status.service";
import {Visibility, VisibilityService} from "../../core/services/visibiliy.service";
import {ArticleService} from "../../core/services/article.service";
import {TreeSelectModule} from "primeng/treeselect";
import {MessagesModule} from "primeng/messages";
import {HttpEventType} from "@angular/common/http";
import {Router} from "@angular/router";

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
    Button,
    MultiSelectModule,
    NgStyle,
    TreeSelectModule,
    MessagesModule
  ],
  templateUrl: './post-add.component.html',
  styleUrl: './post-add.component.scss'
})
export class PostAddComponent implements OnInit {
  messagesToast: any[] = []; // Propriété pour gérer les messages
  messagesToastArticleAddSucces: any[] = []; // Propriété pour gérer les messages
  article: ArticleAdd = {
    "@type": "Article", // Type par défaut
    coverImageUrl: '',
    coverText: '',
    profileImageUrl: '',
    date: new Date().toISOString(), // Date actuelle par défaut
    url: '',
    author: { "@id": '' }, // Objet avec clé "@id"
    chapters: [
      {
        title: '',
        content: [],
      },
    ],
    technologies: [], // Liste des IDs des technologies sélectionnées
    relatedArticles: [], // Liste des IDs des articles liés
    tags: [], // Liste des tags
    estimateTime: 0, // Temps estimé de lecture
    metaTitle: '',
    metaDescription: '',
    createdAt: new Date().toISOString(), // Date de création par défaut
    updatedAt: new Date().toISOString(), // Date de mise à jour par défaut
    status: '', // ID du statut sélectionné
    visibility: '', // ID de la visibilité sélectionnée
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

  statuses: Status[] = []; // Liste des statuts
  visibilities: Visibility[] = []; // Liste des visibilités


  // Load technologies
  technologies: Technology[] = [];
  technologyTree: TreeNode[] = [];
  selectedTechnologies: Technology[] = []; // Pour garder les technologies sélectionnées
  //
  authors: Author[] = []; // Liste des auteurs

  constructor(
      private technologieService: TechnologieService,
      private authorService: AuthorService,
      private statusService: StatusService,
      private visibilityService: VisibilityService,
      private articleService: ArticleService,
      private router: Router
      ) {}
  ngOnInit(): void {
    this.loadTechnologies();
    this.loadAuthors();
    this.loadStatuses();
    this.loadVisibilities();
  }

  loadTechnologies(): void {
    // Charger la liste des technologies
    this.technologieService.loadInitialData().subscribe({
      next: (data) => {
        this.technologies = data;
        console.log('Technologies loaded:', this.technologies);
      },
      error: (err) => console.error('Erreur lors du chargement des technologies:', err)
    });

    // Charger la structure en arbre
    this.technologieService.getTechnologiesTree().subscribe({
      next: (tree) => {
        this.technologyTree = tree;
        console.log('Technology tree:', this.technologyTree);
      },
      error: (err) => console.error('Erreur lors du chargement de la structure en arbre:', err)
    });
  }

  loadAuthors(): void {
    this.authorService.loadInitialData().subscribe({
      next: (data) => {
        this.authors = data;
        console.log('Authors loaded:', this.authors);
      },
      error: (err) => console.error('Erreur lors du chargement des auteurs:', err)
    });
  }
  loadStatuses(): void {
    this.statusService.loadInitialData().subscribe({
      next: (data) => {
        this.statuses = data;
        console.log('Statuses loaded:', this.statuses);
      },
      error: (err) => console.error('Erreur lors du chargement des statuts:', err)
    });
  }

  loadVisibilities(): void {
    this.visibilityService.loadInitialData().subscribe({
      next: (data) => {
        this.visibilities = data;
        console.log('Visibilities loaded:', this.visibilities);
      },
      error: (err) => console.error('Erreur lors du chargement des visibilités:', err)
    });
  }

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
  getTechnologyLabel(id: string): string | undefined {
    const tech = this.technologies.find((t) => t["@id"] === id);
    return tech ? tech.name : undefined;
  }


  // Méthode pour gérer le bouton "Discard"
  discardArticle(): void {
    // Réinitialise l'article avec les valeurs par défaut
    this.article = {
      "@type": "Article", // Type par défaut
      coverImageUrl: '',
      coverText: '',
      profileImageUrl: '',
      date: new Date().toISOString(), // Date actuelle par défaut
      url: '',
      author: { "@id": '' }, // Objet avec clé "@id"
      chapters: [
        {
          title: '',
          content: [],
        },
      ],
      technologies: [], // Liste des IDs des technologies sélectionnées
      relatedArticles: [], // Liste des IDs des articles liés
      tags: [], // Liste des tags
      estimateTime: 0, // Temps estimé de lecture
      metaTitle: '',
      metaDescription: '',
      createdAt: new Date().toISOString(), // Date de création par défaut
      updatedAt: new Date().toISOString(), // Date de mise à jour par défaut
      status: '', // ID du statut sélectionné
      visibility: '', // ID de la visibilité sélectionnée
    };
  }

  prepareArticlePayload(): ArticleAdd {
    const payload: any = {
      "@type": this.article["@type"],
      coverImageUrl: this.article.coverImageUrl,
      coverText: this.article.coverText,
      profileImageUrl: this.article.profileImageUrl,
      date: this.article.date,
      url: this.article.url,
      author: { "@id": this.article.author["@id"] },
      chapters: this.article.chapters,
      technologies: this.article.technologies.map((id) => ({ "@id": id })), // Correction ici
      relatedArticles: this.article.relatedArticles.map((id) => ({ "@id": id })), // Correction ici
      tags: this.article.tags,
      estimateTime: this.article.estimateTime,
      metaTitle: this.article.metaTitle,
      metaDescription: this.article.metaDescription,
      createdAt: this.article.createdAt,
      updatedAt: this.article.updatedAt,
      status: this.article.status,
      visibility: this.article.visibility,
    };
    console.log('Payload to send:', payload); // Vérifiez ici

    return payload;
  }

  addArticle(): void {
    const payload = this.prepareArticlePayload();
    this.articleService.addArticle(payload).subscribe({
      next: (response) => {
        console.log('Article added successfully:', response);
        this.messagesToast = [{ severity: 'success', summary: 'Succès', detail: 'Article ajouté avec succès.' }];

        // Mise à jour de l'URL de l'article
        const articleId = response.data['@id'];
        const generatedUrl = `https://pabiosoft.com/posts/article/${articleId}`;
        this.updateArticleUrl(articleId, generatedUrl);
      },
      error: (error) => {
        console.error('Failed to add article:', error);
        this.messagesToast = [{ severity: 'error', summary: 'Erreur', detail: 'Échec de l’ajout de l’article.' }];

      },
    });
  }

  clickToReadThisArticle!: string;
  updateArticleUrl(responseArticleId: string, generatedUrl: string): void {
    this.articleService.updateArticleUrl(responseArticleId, generatedUrl).subscribe({
      next: (response) => {
        console.log('Article URL updated successfully:', response);

        // Mettre à jour une propriété avec l'URL retournée
        this.article.url = response.url;
        this.clickToReadThisArticle = response.url

        // Afficher un message de succès
        this.messagesToastArticleAddSucces = [
          { severity: 'info', summary: 'Mise à jour', detail: `L’URL de partage de l’article a été mise à jour avec succès : ${response.url}` },
        ];
      },
      error: (error) => {
        console.error('Failed to update article URL de partage:', error);

        // Afficher un message d'avertissement en cas d'échec
        this.messagesToastArticleAddSucces = [
          { severity: 'warn', summary: 'Attention', detail: 'L’article a été ajouté, mais la mise à jour de l’URL de partage a échoué.' },
        ];
      },
    });
  }


  onCoverImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input?.files[0];

      // Vérifier le type MIME pour s'assurer qu'il s'agit d'une image
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validImageTypes.includes(file.type)) {
        console.error('Erreur : Le fichier sélectionné n\'est pas une image valide.');
        alert('Veuillez sélectionner une image au format JPEG, PNG ou GIF.');
        return;
      }

      // Appeler le service pour uploader l'image
      this.articleService.uploadCoverImage(file).subscribe({
        next: (response) => {
          // Mettre à jour l'URL de l'image
          this.article.coverImageUrl = response.url;
          console.log('Image URL updated:', response.url);
        },
        error: (error) => {
          console.error('Erreur lors de l\'upload :', error);
        },
      });
    }
  }





  // Méthode pour gérer le bouton "Publish"
  publishArticle(): void {
    if (this.validateArticle()) {
      console.log('Article publié :', this.article);
      this.addArticle();
    } else {
      console.error('Veuillez remplir tous les champs requis avant de publier.');
      this.messagesToast = [{ severity: 'warn', summary: 'Attention', detail: 'Veuillez remplir tous les champs requis avant de publier.' }];

    }
  }
  onTagAdded(event: any): void {
    console.log('Tag added:', event.value);
    console.log(this.article.tags)
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

  // Fonction pour déterminer si l'input doit être désactivé
  isInputDisabled(): boolean {
    return !!this.article.coverImageUrl;
  }

  isFieldDisabled(fieldName: keyof typeof this.article): boolean {
    // Désactiver le champ si une valeur est présente
    return !!this.article[fieldName];
  }

  openArticle(): void {
    // http://localhost:4200/posts/articles/71a6a73b-6c62-4128-9178-141193bf98dc
    if (this.article.url) {
      // Base URL à retirer
      const baseUrl = 'https://pabiosoft.com/';
      const relativePath = this.article.url.startsWith(baseUrl)
          ? this.article.url.replace(baseUrl, '')
          : this.article.url;

      // Naviguer vers le chemin relatif
      this.router.navigateByUrl(relativePath);
    }
  }
}
