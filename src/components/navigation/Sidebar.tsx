"use client";

import { IconType } from "react-icons";
import { BiMessageSquareDots } from "react-icons/bi";
import { HiUserGroup } from "react-icons/hi";
import { MdVideoCall } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface NavItem {
  icon: IconType;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  {
    icon: BiMessageSquareDots,
    label: "Chat",
    href: "/chat",
  },
  {
    icon: HiUserGroup,
    label: "Teams",
    href: "/teams",
  },
  {
    icon: MdVideoCall,
    label: "Meetings",
    href: "/meetings",
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <nav className="w-[72px] bg-white border-r border-gray-200 flex flex-col items-center py-6">
      <div className="mb-8">
        <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
          <BiMessageSquareDots className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center gap-2 w-full px-3">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "w-full aspect-square rounded-xl flex flex-col items-center justify-center gap-1",
                "group relative transition-all duration-200",
                "hover:bg-gray-50",
                isActive && "bg-primary-50 text-primary-500",
                !isActive && "text-gray-500 hover:text-gray-900"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[11px] font-medium">{item.label}</span>
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-500 rounded-r-full" />
              )}
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs font-medium rounded-md
                opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
                {item.label}
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Sidebar; 