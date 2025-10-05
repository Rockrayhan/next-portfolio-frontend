export interface IBlog {
    _id: string;
    title: string;
    content: string;
    image: string | null;
    tags: string[];
    views?: number;
    createdAt: Date;
    updatedAt: Date;
}



export interface IProject {
  _id: string;
  title: string;
  thumbnail?: string;
  projectLink?: string;
  liveSite?: string;
  description?: string;
  features?: string[];
  createdAt: string;
  updatedAt: string;
}