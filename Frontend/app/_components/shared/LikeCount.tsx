import { Heart } from "lucide-react";

const LikeCount = ({ count }: { count: number }) => (
  <span className="inline-flex items-center gap-1 text-xs text-neutral-400">
    <Heart aria-hidden="true" className="h-3.5 w-3.5" />
    {count}
  </span>
);

export default LikeCount;
