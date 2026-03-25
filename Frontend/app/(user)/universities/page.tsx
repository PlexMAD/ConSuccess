import { fetchUniversities } from "@/shared/api/universities";
import AddUniversityButton from "./_components/AddUniversityButton";
import UniversityCard from "./_components/UniversityCard";

export const UniversitiesPage = async () => {
  const universities = await fetchUniversities();

  return (
    <div className="flex flex-col gap-4">
      <AddUniversityButton />
      <ul className="grid grid-cols-4 gap-4">
        {universities.map((university) => (
          <UniversityCard key={university.id} university={university} />
        ))}
      </ul>
    </div>
  );
};

export default UniversitiesPage;
