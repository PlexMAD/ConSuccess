import { University } from "@/shared/types/universities";
import Link from "next/link";

const UniversityCard = ({ university }: { university: University }) => {
  return (
    <li className="list-none">
      <button
        type="button"
        className="flex h-full min-h-45 w-full cursor-pointer flex-col rounded-2xl bg-white p-5 text-left shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
      >
        {/* <UniversityLogo logoUrl={university.logoUrl} alt={university.name} /> */}

        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 text-sm text-slate-400">
          Лого
        </div>

        <div className="flex flex-1 flex-col">
          <h3 className="mb-2 line-clamp-2 text-base font-semibold leading-5 text-slate-900">
            {university.name}
          </h3>

          <p className="text-sm text-slate-500">{university.city}</p>
        </div>

        <Link
          className="mt-4 text-sm font-medium text-primary"
          href={`/universities/${university.id}`}
        >
          Открыть материалы →
        </Link>
      </button>
    </li>
  );
};

export default UniversityCard;
