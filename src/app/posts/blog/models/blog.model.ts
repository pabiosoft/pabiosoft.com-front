export interface Blog {
  id?: any;
  content: string;
  coverImageUrl: string;
  coverText: string;
  date: string;
  status: string;
  userId: any;
  author: string;
  chapters: { title: string; content: string }[];
  profileImageUrl?: string;
  technologies?: {name: string; logoUrl: string}[]
  likesCount?: number; // Ajout du nombre de likes
  commentsCount?: number; // Ajout du nombre de commentaires
}