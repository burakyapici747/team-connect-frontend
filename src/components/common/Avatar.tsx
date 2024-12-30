"use client";

import { getInitials, getAvatarColor } from "@/utils/getInitials";
import clsx from "clsx";

interface AvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
  showStatus?: boolean;
  isOnline?: boolean;
}

const sizeClasses = {
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-base",
  lg: "w-12 h-12 text-lg",
};

const Avatar = ({ name, size = "md", showStatus, isOnline }: AvatarProps) => {
  const initials = getInitials(name);
  const bgColor = getAvatarColor(name);

  return (
    <div className="relative flex-shrink-0">
      <div
        className={clsx(
          "relative flex items-center justify-center rounded-full font-medium text-white",
          sizeClasses[size],
          bgColor
        )}
      >
        {initials}
      </div>
      {showStatus && (
        <span
          className={clsx(
            "absolute bottom-0 right-0 block rounded-full border-2 border-white",
            size === "sm" ? "w-2.5 h-2.5" : "w-3 h-3",
            isOnline ? "bg-green-500" : "bg-gray-300"
          )}
        />
      )}
    </div>
  );
};

export default Avatar; 