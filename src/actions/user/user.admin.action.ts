"use server";

import { baseUrl } from "@/constants/app.constant";
import { fetchProxy } from "@/lib/fetch";
import { handleErrorInAction, objectToQueryString } from "@/lib/utils";
import { IActionResponse } from "@/types/action-return-generic";
import { IPaginationQuery } from "@/types/pagination.type";
import { IResponse, IResponsePagination } from "@/types/response-generic";
import { IUser, ROLE_ENUM } from "@/types/user/user.type";

const resourceUrl = baseUrl + "/admin/user";

export const listUserAction = async (
  query: {
    role?: ROLE_ENUM;
  } & IPaginationQuery
): Promise<IActionResponse<IResponsePagination<IUser> | any>> => {
  try {
    const response = await fetchProxy<IResponsePagination<IUser>>(
      resourceUrl + "/list?" + objectToQueryString(query),
      {
        method: "get",
        cache: "no-cache",
      }
    );
    return { data: response };
  } catch (error) {
    return handleErrorInAction(error);
  }
};

export const createUserAction = async (
  body: any
): Promise<IActionResponse<IResponse<IUser>>> => {
  try {
    const response = await fetchProxy<IResponse<IUser>>(
      resourceUrl + "/create",
      {
        method: "post",
        body: JSON.stringify(body),
      }
    );

    return { data: response };
  } catch (error) {
    return handleErrorInAction(error);
  }
};
