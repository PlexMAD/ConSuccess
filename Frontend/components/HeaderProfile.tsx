import Link from "next/link";

const HeaderProfile = () => {
  return (
    <div className="flex flex-row gap-2 items-center">
      <Link
        href={"/"}
        className="text-primary text-right font-geist text-base font-bold w-30"
      >
        Александр Петров
      </Link>
      <div className="rounded-full bg-primary w-20 h-20"></div>
    </div>
  );
};

export default HeaderProfile;
