import { Heading } from "@/app/_components/_typography/Heading";

const UniversitiesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Heading title="Вузы" />
      {children}
    </>
  );
};

export default UniversitiesLayout;
