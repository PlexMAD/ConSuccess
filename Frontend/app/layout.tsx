import Header from "@/components/Header";
import { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
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
      <body className={`${geistSans.variable} ${inter.variable} antialiased font-inter`}>
        <Header />
        <main className="--background container mx-auto">{children}</main>
      </body>
    </html>
  );
};

export default Layout;
