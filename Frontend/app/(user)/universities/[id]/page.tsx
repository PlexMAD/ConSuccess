import React from "react";

const UniversityPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return <div>Это страница университи под id {id}</div>;
};

export default UniversityPage;
