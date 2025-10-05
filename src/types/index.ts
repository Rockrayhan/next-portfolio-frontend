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

