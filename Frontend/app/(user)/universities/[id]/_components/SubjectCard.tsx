import { FolderIcon } from "@/app/_icons";
import { Subject } from "@/shared/types/universities";
import Image from "next/image";
import Link from "next/link";

const SubjectCard = ({ subject }: { subject: Subject }) => {
  return (
    <li className="list-none">
      <div className="flex h-full min-h-45 w-full flex-col rounded-2xl bg-white p-5 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50">
          <Image src={FolderIcon} alt="folder" width={32} height={32} />
        </div>

        <div className="flex flex-1 flex-col">
          <h3 className="mb-2 line-clamp-2 text-base font-semibold leading-5 text-slate-900">
            {subject.name}
          </h3>
        </div>

        <Link
          className="mt-4 text-sm font-medium text-primary"
          href={`/universities/${subject.universityId}/subjects/${subject.id}`}
        >
          Открыть материалы →
        </Link>
      </div>
    </li>
  );
};

export default SubjectCard;
