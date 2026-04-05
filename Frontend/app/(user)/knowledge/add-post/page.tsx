import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AddKnowledgePostForm from "./_components/AddKnowledgePostForm";

const AddKnowledgePostPage = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) redirect("/login");

  return <AddKnowledgePostForm />;
};

export default AddKnowledgePostPage;
