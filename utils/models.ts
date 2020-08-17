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
username: string;
comment: string;
createdDate: Date
}
export interface Itag {
    title: string;
    class: string;
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

export interface Ipost {
    _id?: any;
    post: string;
    image?: string;
    secureImage?: string;
    createdDate?: Date;
    likes?: number;
    dislikes?: number;
    userId?: number;
    publicId?: string;
    profilePics: string;
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
    description?: string;
    available?: boolean;
    author: string;
}

export interface IbookShelf {
    book_id: number;
    user_id: number;
    likes?: number;
    favorite?: boolean;
}

