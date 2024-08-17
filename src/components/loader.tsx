import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import React from "react";

export default function Loader({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        className,
        "w-full h-full  flex items-center justify-center"
      )}
    >
      <LoaderCircle className="animate-spin text-primary" />
    </div>
  );
}
