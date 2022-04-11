import React, { ReactPropTypes } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";

export interface ButtonProps {
  appearance?:
    | "primary"
    | "primary-big"
    | "secondary"
    | "secondary-big"
    | "danger";
  href?: string;
  isActive?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void | undefined;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
  props?: ReactPropTypes;
}

function Button({
  appearance = "primary",
  children,
  href,
  className,
  style,
  disabled,
  isActive,
  type = "button",
  loading = false,
  ...props
}: ButtonProps): JSX.Element {
  const styles = {
    button:
      "w-full flex justify-center border border-transparent rounded-md shadow-sm text-sm font-medium",
    primary: "py-2 px-4 bg-yellow-400 hover:bg-yellow-500",
    primaryBig: "py-3 px-8 text-medium  bg-yellow-400 hover:bg-yellow-500",
    secondary: "py-2 px-4 text-gray-700 bg-gray-100 hover:bg-gray-300",
    secondaryBig:
      "py-3 px-8 text-medium text-gray-700 bg-gray-100 hover:bg-gray-300",
    danger: "",
  };

  if (href) {
    return (
      <Link
        to={href}
        className={cn(styles.button, className, {
          [styles.primary]: appearance === "primary",
          [styles.primaryBig]: appearance === "primary-big",
          [styles.secondary]: appearance === "secondary",
          [styles.secondaryBig]: appearance === "secondary-big",
          [styles.danger]: appearance === "danger",
        })}
        style={style}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: appearance === "primary",
        [styles.primaryBig]: appearance === "primary-big",
        [styles.secondary]: appearance === "secondary",
        [styles.secondaryBig]: appearance === "secondary-big",
        [styles.danger]: appearance === "danger",
      })}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
