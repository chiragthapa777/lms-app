import { IActionResponse, IApiError } from "@/types/action-return-generic";
import { type ClassValue, clsx } from "clsx";
import { jwtDecode } from "jwt-decode";
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

export function decrypt(input: string): { exp: number; id: number } {
  const payload = jwtDecode<{ exp: number; id: number }>(input);
  return payload;
}

export function objectToQueryString(obj: any): string {
  const newCleanObj: any = {};

  for (const key in obj) {
    if (key && obj[key] && obj[key] !== "undefined") {
      newCleanObj[key] = obj[key];
    }
  }

  const query = Object.keys(newCleanObj)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]))
    .join("&");

  return query;
}
