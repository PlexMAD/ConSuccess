import Logo from "../assets/ConSuccessLogo.svg";
import Image from "next/image";
import Link from "next/link";
import HeaderProfile from "./HeaderProfile";

const Header = () => {
  return (
    <header className="w-screen bg-white py-6">
      <div className="container flex justify-between mx-auto">
        <Image alt="logo" src={Logo} />
        <nav className="p-6 bg-primary rounded-2xl items-center align-middle text-center ml-1">
          <ul className="flex flex-row justify-between gap-50 px-2 font-geist uppercase text-white">
            <li className="text-2xl">
              <Link href={"/"}>Главная</Link>
            </li>
            <li className="text-2xl">
              <Link href={"/"}>Вузы</Link>
            </li>
            <li className="text-2xl">
              <Link href={"/"}>Знания</Link>
            </li>
            <li className="text-2xl">
              <Link href={"/"}>О проекте</Link>
            </li>
          </ul>
        </nav>
        <HeaderProfile />
      </div>
    </header>
  );
};

export default Header;
