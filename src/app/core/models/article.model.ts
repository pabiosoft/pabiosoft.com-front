import {Technology} from "./technologies.model";

export interface ArticleModel {
    "@context": string;
    "@id": string;
    "@type": string;
    coverImageUrl: string;
    coverText: string;
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
    profileImageUrl: string
}

export interface Chapter {
    "@id": string;
    title: string;
    content: string;
}



export interface RelatedArticle {
    "@id": string;
    title: string;
    coverImageUrl: string;
    author: Author;
}
