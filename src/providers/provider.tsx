"use client";

import { UserContextProvider } from "./AuthUserProvider";
import ToasterProvider from "./ToasterProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UserContextProvider>{children}</UserContextProvider>
      <ToasterProvider />
    </>
  );
}
