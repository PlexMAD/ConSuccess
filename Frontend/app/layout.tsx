import { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import { Toaster } from "sonner";
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
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#067bc2",
              border: "1px solid #0569a8",
              borderRadius: "16px",
              color: "white",
              fontSize: "14px",
              boxShadow: "0 4px 16px -2px rgb(6 123 194 / 0.4)",
            },
            classNames: {
              error: "!bg-red-500 !border-red-600 !shadow-red-200",
            },
          }}
        />
        <Header />
        <main className="--background container mx-auto flex-1 min-h-0 overflow-hidden">{children}</main>
        <footer className="shrink-0 text-center text-neutral-400 py-5">
          Сделано в Московском Политехе. 2026
        </footer>
      </body>
    </html>
  );
};

export default Layout;
