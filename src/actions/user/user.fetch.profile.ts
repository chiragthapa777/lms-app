"use client";

import { baseUrl } from "@/constants/app.constant";
import { fetchProxy } from "@/lib/fetch";
import { handleErrorInAction } from "@/lib/utils";
import { IActionResponse } from "@/types/action-return-generic";
import { IResponse } from "@/types/response-generic";

export interface IProfileResponse {
  id: number;
  createdAt?: string | null;
  updatedAt?: string | null;
  deletedAt?: string | null;
  email: string;
  name: string;
  avatar: string;
  role: string;
}
const resourceUrl = baseUrl + "/auth/me";

export const fetchProfileUserAction = async (): Promise<
  IActionResponse<IResponse<IProfileResponse>>
> => {
  try {
    const response = await fetchProxy<IResponse<IProfileResponse>>(
      resourceUrl,
      {
        method: "get",
      }
    );

    return { data: response };
  } catch (error) {
    return handleErrorInAction(error);
  }
};
