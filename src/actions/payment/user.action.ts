"use server";

import { baseUrl, frontUrl } from "@/constants/app.constant";
import { fetchProxy } from "@/lib/fetch";
import { handleErrorInAction } from "@/lib/utils";
import { IActionResponse } from "@/types/action-return-generic";
import { ICourse } from "@/types/course.type";
import { IResponse } from "@/types/response-generic";
import { IUser } from "@/types/user/user.type";
const resourceUrl = baseUrl + "/auth/register";
import crypto from "node:crypto";
import { paymentFormData } from "@/types/paymentFormData.type";
import { getUserAction } from "../auth/auth.action";

export const createPaymentUserAction = async (body: {
  remark: string;
  userId: number;
  transactionId: string;
  amount: number;
}): Promise<IActionResponse<IResponse<IUser>>> => {
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

export const getPaymentDetail = async (
  course: ICourse
): Promise<IActionResponse<Record<string, string|number>>> => {
  const user = await getUserAction();
  const uuid = `${course.id}_${user.id}_` + crypto.randomUUID();
  const data = `total_amount=${
    course.price
  },transaction_uuid=${uuid},product_code=${"EPAYTEST"}`;
  const signed_field_names = "total_amount,transaction_uuid,product_code";
  const hmac = crypto.createHmac("sha256", "8gBm/:&EnhH.1/q");
  hmac.update(data);

  // Get the digest in base64 format
  const encryptedData = hmac.digest("base64");
  const formData: paymentFormData = {
    amount: course.price.toString(),
    product_delivery_charge: "0",
    product_service_charge: "0",
    tax_amount: "0",
    product_code: "EPAYTEST",
    signature: encryptedData?.toString(),
    signed_field_names,
    success_url: frontUrl + "/payment/success",
    failure_url: frontUrl + "/payment/failure",
    total_amount: course.price.toString(),
    transaction_uuid: uuid,
    url: "https://rc-epay.esewa.com.np/api/epay/main/v2/form",
  };
  return { data: formData };
};
