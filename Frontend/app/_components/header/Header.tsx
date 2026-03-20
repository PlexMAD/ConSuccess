import { ConSuccessLogo } from "@/app/_icons";
import Image from "next/image";
import HeaderProfile from "./HeaderProfile";
import { Navlink } from "./Navlink";

const Header = () => {
  return (
    <header className="w-screen bg-white py-3 mb-3.25">
      <div className="container flex justify-between items-center mx-auto px-4">
        <Image alt="logo" src={ConSuccessLogo} />
        <nav className="hidden md:flex px-5.5 py-5.5 bg-primary rounded-2xl items-center text-center ml-1">
          <ul className="flex flex-row justify-between gap-40 px-4 font-geist uppercase text-white">
            <Navlink href={"/"} title={"Главная"} />
            <Navlink href={"/universities"} title={"Вузы"} />
            <Navlink href={"/knowledge"} title={"Знания"} />
            <Navlink href={"/about"} title={"О продукте"} />
          </ul>
        </nav>
        <HeaderProfile />
      </div>
    </header>
  );
};

export default Header;
