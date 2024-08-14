import React from "react";

export default function Container({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="max-w-[1200px] w-full mx-auto">{children}</div>;
}
