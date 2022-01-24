import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";

interface HeaderButtonProps {
  appearance?: "primary" | "secondary";
  href: string;
  isActive?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function HeaderButton({
  appearance = "primary",
  href,
  isActive,
  className,
  children,
  ...props
}: HeaderButtonProps) {
  const classes = {
    button:
      "whitespace-nowrap mx-2 my-t inline-flex items-center justify-center px-4 py-2 rounded-md text-base font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-600",
    primary:
      "bg-gray-100 hover:bg-gray-200 border border-transparent shadow-sm",
    secondary: "hover:bg-gray-600/20",
  };
  return (
    <Link to={href}>
      <a
        className={cn(classes.button, className, {
          [classes.primary]: appearance === "primary",
          [classes.secondary]: appearance === "secondary",
        })}
        {...props}
      >
        {children}
      </a>
    </Link>
  );
}
