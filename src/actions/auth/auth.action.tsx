"use server";

import { baseUrl } from "@/constants/app.constant";
import { fetchProxy } from "@/lib/fetch";
import { handleErrorInAction, sleep } from "@/lib/utils";
import { IActionResponse } from "@/types/action-return-generic";
import { LoginType } from "@/types/auth/auth.login.type";
import { RegisterType } from "@/types/auth/auth.register.type";
import { IResponse } from "@/types/response-generic";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export async function decrypt(input: string) {
  const payload = jwtDecode(input);
  return payload;
}

export const loginAction = async (
  body: LoginType
): Promise<IActionResponse> => {
  try {
    const response = await fetchProxy<IResponse<any>>(baseUrl + "/auth/login", {
      body: JSON.stringify(body),
      headers: {
        Test: (await getAccessToken()) as string,
      },
      method: "post",
    });

    cookies().set("accessToken", response?.data?.accessToken, {
      expires: response?.data?.expiresIn,
      httpOnly: true,
    });

    await getAndSetUserCookie(response?.data?.accessToken);

    return { data: response };
  } catch (error) {
    return handleErrorInAction(error);
  }
};

async function getAndSetUserCookie(expires?: number) {
  const user = await getMeAction();

  cookies().set("user", JSON.stringify(user.data?.data), {
    expires,
    httpOnly: true,
  });
}

export async function getSession() {
  const session = await getAccessToken();
  if (!session) return null;
  return await decrypt(session);
}

export async function getAccessToken(): Promise<string | undefined> {
  return cookies().get("accessToken")?.value;
}

export async function getUser(): Promise<any | null> {
  const session = await getSession();
  if (!session) {
    return null;
  }
  let user = cookies().get("user")?.value;
  if (!user) {
    await getAndSetUserCookie(session.exp);
    user = cookies().get("user")?.value;
  }
  return user ? JSON.parse(user) : null;
}

export const registerAction = (body: RegisterType) => {};

export const getMeAction = async (): Promise<IActionResponse> => {
  try {
    const data = await fetchProxy<IResponse>(baseUrl + "/auth/me", {
      headers: {
        Test: (await getAccessToken()) as string,
      },
      method: "get",
      cache: "no-cache",
    });
    return { data };
  } catch (error) {
    return handleErrorInAction(error);
  }
};
