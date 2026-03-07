import { fetchUniversities } from "./_api/fetchUniversities";
import UniversityCard from "./_components/UniversityCard";

export const UniversitiesPage = async () => {
  const universities = await fetchUniversities();

  return (
    <ul className="grid grid-cols-4 gap-4">
      {universities.map((university) => (
        <UniversityCard key={university.id} university={university} />
      ))}
    </ul>
  );
};

export default UniversitiesPage;