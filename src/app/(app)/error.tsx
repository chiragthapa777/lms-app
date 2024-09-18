"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  const router = useRouter();

  return (
    <div className="error w-full h-screen flex justify-center items-center">
      <div className="flex flex-col gap-2 p-4 border rounded-md">
        <h2 className="text-xl text font-bold">
          Sorry could not fulfill the request
        </h2>
        <p>{error?.message}</p>
        <div className="flex gap-2"></div>
        <div className="flex gap-2">
          <Button onClick={() => reset()}>Try again</Button>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    </div>
  );
}
