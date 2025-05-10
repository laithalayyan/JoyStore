// src/modules/User/Main/components/Logo.tsx
import React from "react";
import { Link } from "react-router-dom"; // Assuming you'll use React Router

interface LogoProps {
  src: string;
  alt?: string;
  href?: string; // If not using React Router Link
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  src,
  alt = "Store Logo",
  href = "/",
  className = "h-14 md:h-24 w-auto px-2", // Default sizing for user header
}) => {
  return (
    <Link to={href} aria-label="اذهب الى الصفحة الرئيسية">
      <img src={src} alt={alt} className={className} />
    </Link>
  );
};
