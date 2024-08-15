import { IActionResponse, IApiError } from "@/types/action-return-generic";
import { type ClassValue, clsx } from "clsx";
import { resolve } from "path";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleErrorInAction(error: any): IActionResponse {
  if (error instanceof Error) {
    return {
      error: {
        message: error.message,
        errors: [],
        statusCode: 400,
      },
    };
  }
  return { error: error as IApiError };
}

export function sleep(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
