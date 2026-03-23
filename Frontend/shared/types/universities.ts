export type City = {
    id: number;
    name: string;
}

export type University = {
    id: number;
    name: string;
    cityId: number;
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

export type Post = {
    id: number;
    title: string;
    body: string;
    subjectId: number;
    userId: number;
    createdAt: string;
    attachments: Attachment[];
}