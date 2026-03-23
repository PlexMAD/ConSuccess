import { fetchSubject } from "@/shared/api/subjects";
import AddPostForm from "./_components/AddPostForm";

const AddPostPage = async ({
  params,
}: {
  params: Promise<{ id: string; subjectId: string }>;
}) => {
  const { id, subjectId } = await params;
  const subject = await fetchSubject(Number(id), Number(subjectId));

  return (
    <AddPostForm
      universityId={id}
      subjectId={subjectId}
      subjectName={subject.name}
    />
  );
};

export default AddPostPage;
