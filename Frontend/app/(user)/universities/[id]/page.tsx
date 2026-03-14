import { fetchUniversities } from "@/shared/api/universities";

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

  return <div>Это страница университи под id {id}</div>;
};

export default UniversityPage;
