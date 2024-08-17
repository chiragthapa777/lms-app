import Loader from "@/components/loader";
import React from "react";

type Props = {};

export default function Loading({}: Props) {
  return (
    <main className="w-screen h-screen">
      <Loader />
    </main>
  );
}
