"use server";

import { baseUrl } from "@/constants/app.constant";
import { fetchProxy } from "@/lib/fetch";
import { LoginType } from "@/types/auth/auth.login.type";
import { RegisterType } from "@/types/auth/auth.register.type";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export async function decrypt(input: string) {
  const payload = jwtDecode(input);
  return payload;
}

export const loginAction = async (body: LoginType) => {
  const response = await fetchProxy(baseUrl + "/auth/login", {
    body: JSON.stringify(body),
    headers: {
      Test: (await getAccessToken()) as string,
    },
    method: "post",
  });
  cookies().set("accessToken", response?.token?.accessToken, {
    expires: response?.token?.expiresIn,
    httpOnly: true,
  });
  console.log("Test", await getSession());
};

export async function getSession() {
  const session = await getAccessToken();
  if (!session) return null;
  return decrypt(session);
}

export async function getAccessToken(): Promise<string | undefined> {
  return cookies().get("accessToken")?.value;
}
export const registerAction = (body: RegisterType) => {};
export const getMeAction = () => {};
