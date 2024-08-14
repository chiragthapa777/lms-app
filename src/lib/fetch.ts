import { getAccessToken } from "@/actions/auth/auth.action";

export const fetchProxy = async (url: string, options?: RequestInit) => {
  try {
    const headers = {
      "Content-type": "application/json",
      Authorization: "Bearer " + (await getAccessToken()),
      ...(options?.headers ?? {}),
    };
    console.log(
      "🚀 ~ fetchProxy ~ headers:",
      headers,
      options?.body,
      options?.method
    );
    const response = await fetch(url, { ...options, headers });
    const data = await response.json();
    const responseCode = response.status;
    if (!isSuccessResponseCode(responseCode)) {
      throw response;
    }

    return data;
  } catch (error) {
    console.error(`Fetch Error:`, error);
    throw error;
  }
};

const isSuccessResponseCode = (code: number) => {
  return code >= 200 && code <= 299;
};

const handleErrorResponse = () => {};
