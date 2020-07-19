export interface Iblog {
    _id?: any;
    title: string;
    content: Array<Icontent>;
    image: string;
    createdDate?: Date;
    rate?: number;
    views?: number;
    authorId: number;
    author: string;
    media?: string;
    
    comments?: Array<Icomment>;
}
export interface Icontent {
    type: string,
    data: string
}

export interface Icomment {
username: string;
comment: string;
createdDate: Date
}

export interface Isession {
    session: string;
    duration: number;
    user: Iuser;
}
export interface Iuser {
    firstname: string;
    lastname: string;
    middlename?: string;
    username?: string;
    email?: string;
    country?: string | number;
    sex?: string | number;
    phone?: string;
    address?: string;
    type?: string | number;
    password?: string;
    id?: number;
    brithday: string | Date;
    createdDate: Date;
    dp: string;
    state: string | number;
}

