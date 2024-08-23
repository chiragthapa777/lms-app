"use server";

import { baseUrl } from "@/constants/app.constant";
import { fetchProxy } from "@/lib/fetch";
import { handleErrorInAction, objectToQueryString } from "@/lib/utils";
import { IActionResponse } from "@/types/action-return-generic";
import { ICourse } from "@/types/course.type";
import { IPaginationQuery } from "@/types/pagination.type";
import { IResponse, IResponsePagination } from "@/types/response-generic";
import { ROLE_ENUM } from "@/types/user/user.type";
import { revalidatePath } from "next/cache";

const resourceUrl = baseUrl + "/admin/course";

export const listCourseAction = async (
  query: {
    role?: ROLE_ENUM;
  } & IPaginationQuery
): Promise<IActionResponse<IResponsePagination<ICourse> | any>> => {
  try {
    const response = await fetchProxy<IResponsePagination<ICourse>>(
      resourceUrl + "/list?" + objectToQueryString(query),
      {
        method: "get",
        cache: "no-store",
      }
    );
    return { data: response };
  } catch (error) {
    return handleErrorInAction(error);
  }
};

export const getCourseById = async (
  id: string
): Promise<IActionResponse<IResponse<ICourse>>> => {
  try {
    const response = await fetchProxy<IResponse<ICourse>>(
      resourceUrl + "/info/" + id,
      {
        method: "get",
        cache:'no-store'
      }
    );
    return { data: response };
  } catch (error) {
    return handleErrorInAction(error);
  }
};

export const createCourseAction = async (
  body: any
): Promise<IActionResponse<IResponse<ICourse>>> => {
  try {
    const response = await fetchProxy<IResponse<ICourse>>(
      resourceUrl + "/create",
      {
        method: "post",
        body: JSON.stringify(body),
      }
    );
    revalidatePath("/admin/course");
    return { data: response };
  } catch (error) {
    return handleErrorInAction(error);
  }
};

export const updateCourseAction = async (
  id: number,
  body: Partial<ICourse>
): Promise<IActionResponse<IResponse<ICourse>>> => {
  try {
    const response = await fetchProxy<IResponse<ICourse>>(
      resourceUrl + "/update/" + id,
      {
        method: "PATCH",
        body: JSON.stringify(body),
      }
    );
    revalidatePath("/admin/course");
    return { data: response };
  } catch (error) {
    return handleErrorInAction(error);
  }
};

export const deleteCourseAction = async (
  id: number
): Promise<IActionResponse<IResponse<ICourse>>> => {
  try {
    const response = await fetchProxy<IResponse<ICourse>>(
      resourceUrl + "/delete/" + id,
      {
        method: "PATCH",
      }
    );
    revalidatePath("/admin/course");
    return { data: response };
  } catch (error) {
    return handleErrorInAction(error);
  }
};
