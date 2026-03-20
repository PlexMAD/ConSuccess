import { fetchUniversity } from "@/shared/api/universities";
import AddSubjectForm from "./_components/AddSubjectForm";

const AddSubjectPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const university = await fetchUniversity(Number(id));

  return <AddSubjectForm universityId={id} universityName={university.name} />;
};

export default AddSubjectPage;
