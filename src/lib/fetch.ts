import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function fetchProxy<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const headers = {
      "Content-type": "application/json",
      Authorization: "Bearer " + cookies().get("accessToken")?.value,
      ...(options?.headers ?? {}),
    };
    const response = await fetch(url, { ...options, headers });

    const data: Record<string, any> = await response.json();

    const responseCode = response.status;

    if (!isSuccessResponseCode(responseCode)) {
      if (response.status === 401) {
        return redirect("/login");
      }
      throw data;
    }

    return data as T;
  } catch (error) {
    console.log("🚀 ~ error:", error);
    if (error instanceof Error) {
      throw {
        message: "Internal Server Error",
        errors: [],
      };
    }
    throw error;
  }
}

const isSuccessResponseCode = (code: number) => {
  return code >= 200 && code <= 299;
};
