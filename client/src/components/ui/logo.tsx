import React from "react";

interface LogoProps {
  className?: string;
  color?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-8 w-8", color = "currentColor" }) => {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
    </svg>
  );
};

export default Logo;
