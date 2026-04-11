import Image from "next/image";
import { ConSuccessLogo } from "@/app/_icons";
import HeaderProfile from "./HeaderProfile";
import MobileMenu from "./mobile/MobileMenu";
import { Navlink } from "./Navlink";

const Header = () => {
  return (
    <header className="w-full bg-white py-3 mb-3.25">
      <div className="container flex items-center gap-4 mx-auto px-4">
        <MobileMenu />
        <span className="shrink-0 font-bold text-primary text-lg md:hidden">ConSuccess</span>
        <Image alt="logo" src={ConSuccessLogo} className="hidden md:block shrink-0" />
        <nav className="hidden md:flex flex-1 px-4 py-3 bg-primary rounded-2xl items-center justify-center">
          <ul className="flex flex-row gap-6 lg:gap-10 xl:gap-16 px-2 font-geist uppercase text-white">
            <Navlink href={"/"} title={"Главная"} />
            <Navlink href={"/universities"} title={"Вузы"} />
            <Navlink href={"/knowledge"} title={"Знания"} />
            <Navlink href={"/about"} title={"О продукте"} />
          </ul>
        </nav>
        <div className="shrink-0 ml-auto md:ml-0">
          <HeaderProfile />
        </div>
      </div>
    </header>
  );
};

export default Header;
