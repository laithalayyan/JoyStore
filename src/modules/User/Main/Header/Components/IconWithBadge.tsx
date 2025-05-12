import React from "react";
import { Badge } from "primereact/badge";

interface IconWithBadgeProps {
  icon: string;
  count: number;
  text?: string;
  onClick?: () => void;
  ariaLabel?: string;
  badgeSeverity?: "success" | "info" | "warning" | "danger" | undefined;
}

export const IconWithBadge: React.FC<IconWithBadgeProps> = ({
  icon,
  count,
  text,
  onClick,
  ariaLabel,
  badgeSeverity = "danger",
}) => {
  return (
    <button
      type="button"
      className="p-link pl-1 pr-1 relative inline-flex items-center justify-center rounded-full text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-150"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <i className={`${icon} text-2xl`}></i>
      {text && <span className="hidden lg:inline mr-2 text-lg">{text}</span>}
      {count > 0 && (
        <Badge
          value={count}
          severity={badgeSeverity}
          className="absolute -top-1 -right-2 text-s transform scale-75 origin-top-right"
        />
      )}
      {count > 0 && <span className="sr-only">{count} items</span>}
    </button>
  );
};
