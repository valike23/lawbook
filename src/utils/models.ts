import type { ConnectionConfig } from 'mysql';
import type {ConfigOptions } from "cloudinary";
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
    formatedDate?: string;
    tags?: Array<Itag>;
    comments?: Array<Icomment>;
}
export interface Icontent {
    type: string,
    data: string
}

export interface Ipersonality {
    _id?: any;
    image: string;
    name: string;
    bio: string;
    createdDate?: Date
}

export interface Icomment {
    username?: string;
    name?: string;
    comment?: string;
    createdDate?: Date;
    userId?: number;
    blogId?: string;
    id?: number; 
    _id?: any;
    profilePics?: string;
}
export interface Itag {
    title: string;
    class: string;
}

export interface Isession {
    session?: string;
    duration?: number;
    user?: Iuser;
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

export interface Ipost {
    _id?: any;
    post: string;
    image?: string;
    name?: string;
    secureImage?: string;
    createdDate?: Date;
    likes?: number;
    dislikes?: number;
    userId?: number;
    publicId?: string;
    profilePics?: string;
}

export interface Ireply {
    userId?: number;
    profilePics: string;
    comment: string;
    createdDate?: Date;
    likes?: number;
    dislikes?: number;
}

export interface Ibook {
    id?: number;
    title: string;
    pages: number;
    category_id: string| number;
    type: string;
    picture: string;
    content: string;
    secure_content: string;
    secured_picture: string;
    public_picture: string;
    public_content: string;
    created_time?: Date;
    price?: string;
    country?: string ;
    description?: string;
    available?: boolean;
    author?: string;
    publisher?: string;
    ISBN?: string
}

export interface IbookShelf {
    book_id: number;
    user_id: number;
    likes?: number;
    favorite?: boolean;
}

export interface IblogShelf {
    blog_id: string;
    user_id: number;
    title: string;
    createdDate: Date | string;
    favorite: boolean
}
export interface Ihome {
    articles?: Iblog[];
    books?: Ibook[];
    user?: any

}

let mongoAtlas: string = 'mongodb+srv://lawbook_user:G9yJAwyId0D0Xky5@cluster0-rrnxg.mongodb.net/<lawbook>?retryWrites=true&w=majority'
let mongoLocal: string = 'mongodb://localhost:27017/?readPreference=primary&ssl=false';
export let mongoURI = mongoAtlas;

let localMysql: ConnectionConfig = {
    host: "127.0.0.1",
    password: "",
    user: "root",
    database: "lawbook"
};

let db4free: ConnectionConfig = {
    host: "db4free.net",
    password: "law_book",
    user: "law_book",
    database: "law_book"
};
export interface Ilogin {
    email: string;
    password: string;
}

export const CLOUDINARY_CONFIG : ConfigOptions = {
    api_key: "556459332373436",
    api_secret: "-vfzmuQdlkLrB1rdqR5hTAf5wJg",
    provisioning_api_key: "556459332373436",
    provisioning_api_secret: "-vfzmuQdlkLrB1rdqR5hTAf5wJg",
    cloud_name: "tjconnect"
}

export let mysqlConnection: ConnectionConfig = db4free;
