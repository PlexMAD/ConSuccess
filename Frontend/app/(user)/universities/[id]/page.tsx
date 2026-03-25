import { fetchSubjectsByUniversity } from "@/shared/api/subjects";
import { fetchUniversities, fetchUniversity } from "@/shared/api/universities";
import Link from "next/link";
import AddSubjectButton from "./_components/AddSubjectButton";
import SubjectCard from "./_components/SubjectCard";

export async function generateStaticParams() {
  const universities = await fetchUniversities();

  return universities.map((university) => ({
    id: String(university.id),
  }));
}

const UniversityPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const universityId = Number(id);

  const [university, subjects] = await Promise.all([
    fetchUniversity(universityId),
    fetchSubjectsByUniversity(universityId),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Link
          href="/universities"
          className="self-start text-sm text-neutral-500 hover:text-neutral-800 transition"
        >
          ← Назад
        </Link>
        <h1 className="text-2xl font-bold">{university.name} — Предметы</h1>
        <p className="text-sm text-neutral-500">{university.city.name}</p>
        <AddSubjectButton universityId={id} />
      </div>

      {subjects.length === 0 ? (
        <p className="text-neutral-400">Предметов пока нет</p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default UniversityPage;
