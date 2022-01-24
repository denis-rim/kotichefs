import React from "react";
import cn from "classnames";

export interface ButtonProps {
  appearance?: "primary" | "secondary" | "danger";
  href?: string;
  isActive?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

function Button({
  appearance = "primary",
  children,
  href,
  className,
  disabled,
  isActive,
  type,
  loading = false,
  ...props
}: ButtonProps): JSX.Element {
  const styles = {
    button:
      "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-600",
    primary: "text-white bg-yellow-500 hover:bg-yellow-600",
    secondary: "",
    danger: "",
  };
  return (
    <div>
      <button
        className={cn(styles.button, className, {
          [styles.primary]: appearance === "primary",
          [styles.secondary]: appearance === "secondary",
          [styles.danger]: appearance === "danger",
        })}
        {...props}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
