// export interface Section {
//     type: 'text' | 'code' | 'media';
//     value?: string; // Contenu du texte ou du code
//     language?: string; // Langage pour le code (ex: 'javascript')
//     mediaType?: 'image' | 'video'; // Type de média
//     src?: string; // URL du média
//     altText?: string; // Texte alternatif pour le média
// }
//
// export interface Chapter {
//     title: string; // Titre du chapitre
//     content: Section[]; // Sections incluses dans le chapitre
// }

export interface Section {
    type: 'text' | 'code' | 'media'; // Type de section : texte, code ou média
    value?: string; // Contenu du texte ou du code
    language?: string; // Langage pour le code (exemple : 'javascript', 'bash')
    mediaType?: 'image' | 'video'; // Type de média (image ou vidéo)
    src?: string; // URL du média
    altText?: string; // Texte alternatif pour le média
}

export interface Chapter {
    title: string; // Titre du chapitre
    content: Section[]; // Liste des sections incluses dans le chapitre
}

export interface ArticleAdd {
    "@type": string; // Type de l'article (par exemple : 'LesTags')
    coverImageUrl: string; // URL de l'image de couverture
    coverText: string; // Texte de couverture ou titre de l'article
    profileImageUrl: string; // URL de l'image de profil associée à l'article
    date: string; // Date de publication de l'article (au format ISO 8601)
    url: string; // URL externe liée à l'article
    author: { "@id": string }; // Objet avec l'ID de l'auteur (correspond à "@id" de l'API)
    chapters: Chapter[]; // Liste des chapitres
    technologies: { "@id": string }[]; // Correction ici
    relatedArticles: { "@id": string }[]; // Correction ici
    tags: string[]; // Liste des tags associés
    estimateTime: number; // Temps estimé de lecture en minutes
    metaTitle?: string; // Meta-titre pour le SEO
    metaDescription?: string; // Meta-description pour le SEO
    createdAt?: string; // Date de création (format ISO 8601)
    updatedAt?: string; // Date de mise à jour (format ISO 8601)
    status: string; // ID du statut de l'article (correspond à "@id" de l'API)
    visibility: string; // ID de la visibilité de l'article (correspond à "@id" de l'API)
}


// export interface ArticleAdd {
//     coverImageUrl: string; // URL de l'image de couverture
//     coverText: string; // Titre de l'article (texte de couverture)
//     author: string; // Auteur de l'article
//     technologies: string[]; // Technologies associées
//     estimateTime: number; // Temps estimé pour lire l'article en minutes
//     chapters: Chapter[]; // Liste des chapitres
//     status: string; // Statut de l'article
//     visibility: string; // Visibilité de l'article
//     tags: string[]; // Liste des tags associés
//     metaTitle?: string; // Meta-titre pour le SEO
//     metaDescription?: string; // Meta-description pour le SEO
//     createdAt?: string; // Date de création
//     updatedAt?: string; // Date de mise à jour
// }
