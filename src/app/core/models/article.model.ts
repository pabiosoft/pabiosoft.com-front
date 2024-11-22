import { Technology } from "./technologies.model";
export interface ArticleModel {
    "@context": string;
    "@id": string;
    "@type": string;
    coverImageUrl: string;
    coverText: string;
    url: string; //  ajout d'une propriete url 
    date: string;
    status: string;
    author: Author;
    chapters: Chapter[];
    technologies: Technology[];
    profileImageUrl: string;
    relatedArticles: RelatedArticle[];
    estimateTime: number;
}

export interface Author {
    "@id": string;
    name: string;
    country: string;
    profileImageUrl: string;
}

export interface Chapter {
    "@id": string;
    title: string;
    content: ContentBlock[]; // Prise en charge de plusieurs types de contenu
}

export type ContentBlock =
    | TextContentBlock
    | CodeContentBlock
    | MediaContentBlock;

export interface TextContentBlock {
    type: 'text';
    value: string; // Contenu textuel
}

export interface CodeContentBlock {
    type: 'code';
    language: string; // Langage pour le code
    value: string; // Contenu du code
}

export interface MediaContentBlock {
    type: 'media';
    mediaType: 'image' | 'video'; // Type du média (image ou vidéo)
    src: string; // URL du média
    altText?: string; // Texte alternatif pour l'accessibilité
}

export interface RelatedArticle {
    "@id": string;
    title: string;
    coverImageUrl: string;
    author: Author;
}