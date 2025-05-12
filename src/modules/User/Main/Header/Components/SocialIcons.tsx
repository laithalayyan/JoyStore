import React from "react";

const socialLinks = [
  {
    name: "TikTok",
    icon: "pi pi-tiktok",
    href: "https://tiktok.com/@yourpage",
  },
  {
    name: "Instagram",
    icon: "pi pi-instagram",
    href: "https://instagram.com/yourpage",
  },
  {
    name: "Facebook",
    icon: "pi pi-facebook",
    href: "https://facebook.com/yourpage",
  },
];

export const SocialIcons: React.FC = () => {
  return (
    <div className="flex items-center gap-x-3">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`تابعنا على ${social.name}`}
          className="block group rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          <div
            className="
          w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11  /* Responsive sizing for the circle */
          flex items-center justify-center rounded-full 
          bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 
          dark:from-orange-500 dark:via-orange-600 dark:to-red-600 /* Dark mode gradient */
          shadow-md group-hover:shadow-lg /* Shadow effect */
          transition-all duration-300 ease-out 
          transform group-hover:scale-105 group-hover:-translate-y-px /* Subtle hover: scale up, lift slightly */
          ltr:group-hover:rotate-[2deg] rtl:group-hover:-rotate-[2deg] /* Very subtle rotation, RTL aware */
        "
          >
            <i
              className={`${social.icon} text-white text-sm sm:text-base md:text-lg`}
            ></i>
          </div>
        </a>
      ))}
    </div>
  );
};
