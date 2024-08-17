"use server";

import { baseUrl } from "@/constants/app.constant";
import { fetchProxy } from "@/lib/fetch";
import { decrypt, handleErrorInAction } from "@/lib/utils";
import { IActionResponse } from "@/types/action-return-generic";
import { IResponse } from "@/types/response-generic";
import { IUser } from "@/types/user/user.type";
import { cookies } from "next/headers";

export const getMeAction = async (): Promise<
  IActionResponse<IResponse<IUser>>
> => {
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

export async function getAccessToken(): Promise<string | undefined> {
  return cookies().get("accessToken")?.value;
}

export async function getAndSetUserCookie(expires?: number): Promise<IUser> {
  const user = await getMeAction();

  cookies().set("user", JSON.stringify(user.data?.data), {
    expires,
    httpOnly: true,
  });
  return user.data?.data as IUser;
}

export async function getSession(): Promise<null | {
  exp: number;
  id: number;
}> {
  const session = await getAccessToken();
  if (!session) return null;
  return decrypt(session);
}
