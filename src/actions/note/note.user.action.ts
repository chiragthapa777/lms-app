"use server";

import { baseUrl } from "@/constants/app.constant";
import { fetchProxy } from "@/lib/fetch";
import { handleErrorInAction, objectToQueryString } from "@/lib/utils";
import { IActionResponse } from "@/types/action-return-generic";
import { INote } from "@/types/course.type";
import { IPaginationQuery } from "@/types/pagination.type";
import { IResponse, IResponsePagination } from "@/types/response-generic";
import { revalidatePath } from "next/cache";

const resourceUrl = baseUrl + "/note";

export const listNoteAction = async (
  query: {
    chapterId?: Number;
  } & IPaginationQuery
): Promise<IActionResponse<IResponsePagination<INote> | any>> => {
  try {
    const response = await fetchProxy<IResponsePagination<INote>>(
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

export const getNoteById = async (
  id: string
): Promise<IActionResponse<IResponse<INote>>> => {
  try {
    const response = await fetchProxy<IResponse<INote>>(
      resourceUrl + "/info/" + id,
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

export const createNoteAction = async (
  body: Partial<INote>
): Promise<IActionResponse<IResponse<INote>>> => {
  try {
    const response = await fetchProxy<IResponse<INote>>(
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

export const updateNoteAction = async (
  id: number,
  body: Partial<INote>
): Promise<IActionResponse<IResponse<INote>>> => {
  try {
    const response = await fetchProxy<IResponse<INote>>(
      resourceUrl + "/update/" + id,
      {
        method: "PATCH",
        body: JSON.stringify(body),
      }
    );
    return { data: response };
  } catch (error) {
    return handleErrorInAction(error);
  }
};

export const deleteNoteAction = async (
  id: number
): Promise<IActionResponse<IResponse<INote>>> => {
  try {
    const response = await fetchProxy<IResponse<INote>>(
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
