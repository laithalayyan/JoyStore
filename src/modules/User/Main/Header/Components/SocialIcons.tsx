// src/modules/User/Main/components/SocialIcons.tsx
import React from "react";

const socialLinks = [
  {
    name: "Facebook",
    icon: "pi pi-facebook",
    href: "https://facebook.com/yourpage",
    color: "text-blue-600 hover:text-blue-700",
  },
  {
    name: "Instagram",
    icon: "pi pi-instagram",
    href: "https://instagram.com/yourpage",
    color: "text-pink-500 hover:text-pink-600",
  },
  {
    name: "TikTok",
    icon: "pi pi-tiktok",
    href: "https://tiktok.com/@yourpage",
    color:
      "text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300",
  }, // TikTok uses PrimeIcons default color
];

export const SocialIcons: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 px-2">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Follow us on ${social.name}`}
          className={`text-xl md:text-2xl transition-colors duration-150 ${social.color}`}
        >
          <div className=" px-1 md:p-2 md:px-3 rounded-full bg-gradient-to-r from-orange-500 via-white-800 to-orange-600 flex items-center justify-center transition-transform duration-200 transform hover:scale-110 hover:rotate-6 hover:translate-y-1">
            <i
              className={`${social.icon} text-white text-sm md:text-sm sm:text-sm`}
            ></i>
          </div>
        </a>
      ))}
    </div>
  );
};
