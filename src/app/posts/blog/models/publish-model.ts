import { Blog } from "./blog.model";

export interface publishBlog {
    id: number;
    title: string;
    content: any[]; 
    published: boolean; 
    author?: {
      id: any;
      email: string;
      username: any;
      profile?: {
        imageUrl?: string | any;
      };
    };
  }
  