export interface Section {
    type: 'text' | 'code' | 'media';
    value?: string; // Contenu du texte ou du code
    language?: string; // Langage pour le code (ex: 'javascript')
    mediaType?: 'image' | 'video'; // Type de média
    src?: string; // URL du média
    altText?: string; // Texte alternatif pour le média
}

export interface Chapter {
    title: string; // Titre du chapitre
    content: Section[]; // Sections incluses dans le chapitre
}

export interface ArticleAdd {
    coverImageUrl: string; // URL de l'image de couverture
    coverText: string; // Titre de l'article (texte de couverture)
    author: string; // Auteur de l'article
    technologies: string[]; // Technologies associées
    estimateTime: number; // Temps estimé pour lire l'article en minutes
    chapters: Chapter[]; // Liste des chapitres
    status: 'draft' | 'published'; // Statut de l'article
    visibility: 'private' | 'public'; // Visibilité de l'article
    tags: string[]; // Liste des tags associés
    metaTitle?: string; // Meta-titre pour le SEO
    metaDescription?: string; // Meta-description pour le SEO
    createdAt?: string; // Date de création
    updatedAt?: string; // Date de mise à jour
}
