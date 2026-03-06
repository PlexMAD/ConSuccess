import { ConSuccessLogo } from "@/app/_icons";
import Image from "next/image";
import HeaderProfile from "./HeaderProfile";
import { Navlink } from "./Navlink";

const Header = () => {
  return (
    <header className="w-screen bg-white py-6 mb-3.25">
      <div className="container flex justify-between mx-auto">
        <Image alt="logo" src={ConSuccessLogo} />
        <nav className="p-6 bg-primary rounded-2xl items-center align-middle text-center ml-1">
          <ul className="flex flex-row justify-between gap-50 px-2 font-geist uppercase text-white">
            <Navlink href={"/"} title={"Главная"} />
            <Navlink href={"/universities"} title={"Вузы"} />
            <Navlink href={"/"} title={"Знания"} />
            <Navlink href={"/"} title={"О продукте"} />
          </ul>
        </nav>
        <HeaderProfile />
      </div>
    </header>
  );
};

export default Header;
