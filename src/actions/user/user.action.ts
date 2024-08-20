"use server";

import { baseUrl } from "@/constants/app.constant";
import { fetchProxy } from "@/lib/fetch";
import { handleErrorInAction } from "@/lib/utils";
import { IActionResponse } from "@/types/action-return-generic";
import { RegisterType } from "@/types/auth/auth.register.type";
import { IResponse } from "@/types/response-generic";
import { IUser } from "@/types/user/user.type";
const resourceUrl = baseUrl + "/auth/register";
export const registerUserAction = async (
  body: RegisterType
): Promise<IActionResponse<IResponse<IUser>>> => {
  try {
    const response = await fetchProxy<IResponse<IUser>>(resourceUrl, {
      method: "post",
      body: JSON.stringify(body),
    });

    return { data: response };
  } catch (error) {
    return handleErrorInAction(error);
  }
};
