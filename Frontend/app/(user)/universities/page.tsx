import { fetchUniversities } from "@/shared/api/universities";
import UniversityCard from "./_components/UniversityCard";
import Link from "next/link";

export const UniversitiesPage = async () => {
  const universities = await fetchUniversities();

  return (
    <div className="flex flex-col gap-4">
      <Link
        className="self-start px-4 py-2 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition"
        href={"/universities/add"}
      >
        Добавить
      </Link>
      <ul className="grid grid-cols-4 gap-4">
        {universities.map((university) => (
          <UniversityCard key={university.id} university={university} />
        ))}
      </ul>
    </div>
  );
};

export default UniversitiesPage;
