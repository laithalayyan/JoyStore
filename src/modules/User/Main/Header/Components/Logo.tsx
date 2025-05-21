import React from "react";
import { Link } from "react-router-dom";

interface LogoProps {
  src: string;
  alt?: string;
  href?: string; 
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  src,
  alt = "Store Logo",
  href = "/",
  className = "h-12 md:h-24 w-auto px-2", 
}) => {
  return (
    <Link to={href} aria-label="اذهب الى الصفحة الرئيسية">
      <img src={src} alt={alt} className={className} />
    </Link>
  );
};
