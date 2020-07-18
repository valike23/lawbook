export interface Iblog {
    _id?: any;
    title: string;
    content: string;
    image: string;
    createdDate?: Date;
    rate?: number;
    views?: number;
    authorId: number;
    author: string;
    media?: string;
    comments?: Array<Icomment>;
}

export interface Icomment {
username: string;
comment: string;
createdDate: Date
}

