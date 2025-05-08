interface LogoProps {
  href?: string;
  src: string;
  alt?: string;
}

export const Logo = ({ href = "/dashboard", src, alt = "Logo" }: LogoProps) => {
  return (
    <div className="flex h-20 items-center justify-center py-0 px-4 flex-shrink-0">
      <a href={href} aria-label={`Go to ${href === "/" ? "homepage" : href}`}>
        <img src={src} alt={alt} className="h-16  w-auto max-h-full" />
      </a>
    </div>
  );
};
