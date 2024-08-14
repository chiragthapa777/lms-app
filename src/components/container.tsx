import { cn } from "@/lib/utils";
import React from "react";

export interface containerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Container({
  children,
  className,
  ...props
}: Readonly<containerProps>) {
  return (
    <div className={cn("max-w-[1200px] w-full mx-auto", className)} {...props}>
      {children}
    </div>
  );
}
