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

export type RecentPost = Post & {
    subject: { id: number; universityId: number; name: string };
    user: PostAuthor;
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
