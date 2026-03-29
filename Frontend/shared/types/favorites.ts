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
