import { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import Header from "./_components/header/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ConSuccess",
  description: "Description",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${inter.variable} antialiased font-inter h-screen flex flex-col overflow-hidden`}
      >
        <Header />
        <main className="--background container mx-auto flex-1 min-h-0 overflow-hidden">{children}</main>
      </body>
    </html>
  );
};

export default Layout;
