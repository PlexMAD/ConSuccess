export type City = {
    id: number;
    name: string;
}

export type University = {
    id: number;
    name: string;
    cityId: number;
    avatar: string | null;
    city: City;
}

export type Subject = {
    id: number;
    name: string;
    universityId: number;
}

export type Attachment = {
    id: number;
    url: string;
    postId: number;
}

export type PostAuthor = {
    id: number;
    username: string;
    avatar: string | null;
}

export type Post = {
    id: number;
    title: string;
    body: string;
    subjectId: number;
    userId: number;
    visible: boolean;
    createdAt: string;
    attachments: Attachment[];
    user?: PostAuthor;
}

export type FavoritePost = {
    userId: number;
    postId: number;
    post: {
        id: number;
        title: string;
        subjectId: number | null;
        subject: {
            id: number;
            universityId: number;
        } | null;
    };
}