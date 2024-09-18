"use server";

import { baseUrl } from "@/constants/app.constant";
import { fetchProxy } from "@/lib/fetch";
import { handleErrorInAction } from "@/lib/utils";
import { IActionResponse } from "@/types/action-return-generic";
import { IResponse } from "@/types/response-generic";
import { IUser } from "@/types/user/user.type";
const resourceUrl = baseUrl;

export const enrollUserAction = async (body: {
  transactionId: string;
  courseId: number;
}): Promise<IActionResponse<IResponse<IUser>>> => {
  console.log("🚀 ~ body:", body);
  try {
    const response = await fetchProxy<IResponse<IUser>>(
      resourceUrl + "/course/enroll/" + body.courseId.toString(),
      {
        method: "PATCH",
        body: JSON.stringify({ transactionId: body.transactionId }),
      }
    );
    console.log("🚀 ~ response:", response);

    return { data: response };
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return handleErrorInAction(error);
  }
};
