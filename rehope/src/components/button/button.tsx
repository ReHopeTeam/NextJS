import { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  children: ReactNode;
  variant?: "default" | "icon";
};

const Botoes = ({
  className,
  children,
  variant = "default",
  ...props
}: ButtonProps) => {
  const combinedClasses =
    `${variant === "default" ? "btn" : ""} ${className || ""}`.trim();

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default Botoes;
