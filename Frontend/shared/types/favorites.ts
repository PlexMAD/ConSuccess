import type { Role } from "./users";

export type FavoritePost = {
    userId: number;
    postId: number;
    post: {
        id: number;
        title: string;
        subjectId: number | null;
        isPrivate: boolean;
        user?: {
            role: Role;
        };
        subject: {
            id: number;
            universityId: number;
        } | null;
    };
}
