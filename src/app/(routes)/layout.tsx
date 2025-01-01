import { ReactNode } from "react";
import Sidebar from "@/components/navigation/Sidebar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={`flex h-screen bg-gray-50 ${inter.className}`}>
      <Sidebar />
      <main className="flex-1 h-full ">
        {children}
      </main>
    </div>
  );
};

export default Layout; 