"use server";

import { baseUrl } from "@/constants/app.constant";
import { fetchProxy } from "@/lib/fetch";
import { handleErrorInAction, objectToQueryString } from "@/lib/utils";
import { IActionResponse } from "@/types/action-return-generic";
import { IChapter } from "@/types/course.type";
import { IPaginationQuery } from "@/types/pagination.type";
import { IResponse, IResponsePagination } from "@/types/response-generic";
import { ROLE_ENUM } from "@/types/user/user.type";
import { revalidatePath } from "next/cache";

const resourceUrl = baseUrl + "/admin/chapter";

export const listChapterAction = async (
  query: {
    role?: ROLE_ENUM;
  } & IPaginationQuery
): Promise<IActionResponse<IResponsePagination<IChapter> | any>> => {
  try {
    const response = await fetchProxy<IResponsePagination<IChapter>>(
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

export const getChapterById = async (
  id: number
): Promise<IActionResponse<IResponse<IChapter>>> => {
  try {
    const response = await fetchProxy<IResponse<IChapter>>(
      resourceUrl + "/info/" + id,
      {
        method: "get",
      }
    );
    return { data: response };
  } catch (error) {
    return handleErrorInAction(error);
  }
};

export const createChapterAction = async (
  body: any
): Promise<IActionResponse<IResponse<IChapter>>> => {
  try {
    const response = await fetchProxy<IResponse<IChapter>>(
      resourceUrl + "/create",
      {
        method: "post",
        body: JSON.stringify(body),
      }
    );
    revalidatePath("/admin/course" + body.courseId);
    return { data: response };
  } catch (error) {
    return handleErrorInAction(error);
  }
};

export const updateChapterAction = async (
  id: number,
  body: Partial<IChapter>
): Promise<IActionResponse<IResponse<IChapter>>> => {
  try {
    const response = await fetchProxy<IResponse<IChapter>>(
      resourceUrl + "/update/" + id,
      {
        method: "PATCH",
        body: JSON.stringify(body),
      }
    );
    revalidatePath("/admin/course" + body.courseId);
    return { data: response };
  } catch (error) {
    return handleErrorInAction(error);
  }
};

export const deleteChapterAction = async (
  id: number
): Promise<IActionResponse<IResponse<IChapter>>> => {
  try {
    const response = await fetchProxy<IResponse<IChapter>>(
      resourceUrl + "/delete/" + id,
      {
        method: "PATCH",
      }
    );
    return { data: response };
  } catch (error) {
    return handleErrorInAction(error);
  }
};
