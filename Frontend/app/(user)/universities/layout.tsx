import { Heading } from "@/app/_components/typography/Heading";

const UniversitiesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Heading title="Вузы" />
      {children}
    </div>
  );
};

export default UniversitiesLayout;
