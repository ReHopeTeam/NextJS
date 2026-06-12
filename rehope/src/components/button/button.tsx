import { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "default" | "icon";
};

const Botoes = ({
  className,
  variant = "default",
  ...props
}: ButtonProps) => {
  const combinedClasses =
    `${variant === "default" ? "btn" : ""} ${className || ""}`.trim();

  return (
    <button className={combinedClasses} {...props}></button>
  );
};

export default Botoes;
