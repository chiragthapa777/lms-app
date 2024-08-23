"use server";

import { baseUrl } from "@/constants/app.constant";
import { fetchProxy } from "@/lib/fetch";
import { decrypt, handleErrorInAction } from "@/lib/utils";
import { IActionResponse } from "@/types/action-return-generic";
import { LoginType } from "@/types/auth/auth.login.type";
import { RegisterType } from "@/types/auth/auth.register.type";
import { IResponse } from "@/types/response-generic";
import { cookies } from "next/headers";
import { getAndSetUserCookie, getSession } from "./auth.helper";
import { redirect } from "next/navigation";

export const loginAction = async (
  body: LoginType
): Promise<IActionResponse<any>> => {
  try {
    const response = await fetchProxy<IResponse<any>>(baseUrl + "/auth/login", {
      body: JSON.stringify(body),
      method: "post",
    });

    const accessToken = response?.data?.accessToken;

    const decrypted = decrypt(accessToken);
    const expiresMs = decrypted?.exp * 1000;

    cookies().set("accessToken", accessToken, {
      expires: expiresMs,
      httpOnly: true,
    });

    const user = await getAndSetUserCookie(expiresMs);

    return { data: user };
  } catch (error) {
    return handleErrorInAction(error);
  }
};

export async function getUserAction(): Promise<any | null> {
  try {
    const session = await getSession();
    if (!session) {
      return null;
    }
    let user = cookies().get("user")?.value;
    if (!user) {
      await getAndSetUserCookie(session.exp * 1000);
      user = cookies().get("user")?.value;
    }
    return user ? JSON.parse(user) : null;
  } catch (e) {
    return null;
  }
}

export const registerAction = async (body: RegisterType) => {
};
export const logoutAction = async () => {
  cookies().set("accessToken", "", {
    expires: Date.now() - 1000,
    httpOnly: true,
  });
  cookies().set("user", "", {
    expires: Date.now() - 1000,
    httpOnly: true,
  });
  redirect("/");
};
