import type { Role } from "./users";

export type Attachment = {
    id: number;
    url: string;
    postId: number;
}

export type PostAuthor = {
    id: number;
    username: string;
    avatar: string | null;
    role: Role;
}

export type PostCounts = {
    likes: number;
}

export type RecentPost = Post & {
    subject: { id: number; universityId: number; name: string; university: { name: string } } | null;
    user: PostAuthor;
}

export type Post = {
    id: number;
    title: string;
    body: string;
    subjectId: number | null;
    userId: number;
    visible: boolean;
    isPrivate: boolean;
    createdAt: string;
    attachments: Attachment[];
    _count?: PostCounts;
    user?: PostAuthor;
}
