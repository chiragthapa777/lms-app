"use server";

import { baseUrl } from "@/constants/app.constant";
import { fetchProxy } from "@/lib/fetch";
import { handleErrorInAction, objectToQueryString } from "@/lib/utils";
import { IActionResponse } from "@/types/action-return-generic";
import { ICourse } from "@/types/course.type";
import { IPaginationQuery } from "@/types/pagination.type";
import { IResponse, IResponsePagination } from "@/types/response-generic";

const resourceUrl = baseUrl + "/course";

export const listCourseActionUser = async (
  query: {} & IPaginationQuery
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

export const getCourseByIdUser = async (
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
