import { apiURL } from "@/shared/api/config";
import { Post } from "@/shared/types/posts";
import Image from "next/image";
import Link from "next/link";

const PostCard = ({
  post,
  universityId,
  subjectId,
  universityName,
  subjectName,
}: {
  post: Post;
  universityId: number;
  subjectId: number;
  universityName?: string;
  subjectName?: string;
}) => {
  const firstImage = post.attachments?.[0];

  return (
    <li className="list-none">
      <div className="flex h-full w-full flex-col rounded-2xl bg-white shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg overflow-hidden">
        {firstImage && (
          <div className="relative w-full h-36 bg-neutral-50">
            <Image
              src={`${apiURL}${firstImage.url}`}
              alt={post.title}
              fill
              unoptimized
              className="object-contain"
            />
            {post.attachments.length > 1 && (
              <span className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-1.5 py-0.5 rounded">
                +{post.attachments.length - 1} изображений
              </span>
            )}
          </div>
        )}
        <div className="flex flex-1 flex-col gap-2 p-4">
          {universityName && subjectName && (
            <p className="text-xs text-neutral-400 truncate">
              {universityName} · {subjectName}
            </p>
          )}
          <h3 className="line-clamp-2 text-base font-semibold leading-5 text-slate-900">
            {post.title}
          </h3>
          <p className="line-clamp-2 text-sm text-neutral-500">{post.body}</p>
          <p className="text-xs text-neutral-400">
            {new Date(post.createdAt).toLocaleDateString("ru-RU")}
          </p>
          <Link
            className="mt-auto text-sm font-medium text-primary"
            href={`/universities/${universityId}/subjects/${subjectId}/posts/${post.id}`}
          >
            Открыть →
          </Link>
        </div>
      </div>
    </li>
  );
};

export default PostCard;
