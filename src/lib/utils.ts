import { IActionResponse, IApiError } from "@/types/action-return-generic";
import { type ClassValue, clsx } from "clsx";
import { jwtDecode } from "jwt-decode";
import { UseFormSetValue } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleErrorInAction(error: any): IActionResponse {
  if (error instanceof Error) {
    return {
      error: {
        message: error?.message,
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

export async function handleUploadUtils(
  e: any,
  {
    setUploadingLoading,
    setValue,
    fieldName,
    isVideo = false,
  }: {
    setUploadingLoading: (args: boolean) => void;
    setValue: UseFormSetValue<any>;
    fieldName: string;
    isVideo?: boolean;
  }
) {
  setUploadingLoading(true);

  const formData = new FormData();
  formData.append("file", e.target.files[0]);
  formData.append("upload_preset", "course-cloud"); // Replace with your upload preset

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/dnnqnwwsp/${
      isVideo ? "video" : "image"
    }/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  if (data.secure_url) {
    setValue(fieldName, data.secure_url);
  } else {
    console.error("Upload failed");
  }

  setUploadingLoading(false);
}

export const getNameShortForm = (name: string): string => {
  const arr = name.split(" ");
  const shortForm: string = arr
    .map((word) => word[0])
    .join("")
    .toUpperCase();
  return shortForm;
};
