"use client";
import { ICourse } from "@/types/course.type";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";

import { getPaymentDetail } from "@/actions/payment/user.action";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { esewaImgUrl } from "@/constants/app.constant";
import { useUserContext } from "@/providers/AuthUserProvider";
import { useRouter } from "next/navigation";

type Props = { course: ICourse; defaultOpen?: boolean };

export default function CourseEnrollButton({ course, defaultOpen }: Props) {
  const router = useRouter();
  const { user } = useUserContext();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {}, [open]);

  const isEnroll = useMemo(() => {
    return !course.enrollments.find((e) => e.user.id === user.id);
  }, [course.id]);

  const processPayment = async () => {
    setLoading(true);

    try {
      // Fetch payment details
      const data = await getPaymentDetail(course);
      console.log("🚀 ~ processPayment ~ data:", data);

      // Check if data contains the necessary fields
      if (data.data) {
        var form = document.createElement("form");
        form.setAttribute("method", "POST");
        form.setAttribute("action", data.data.url);

        for (var key in data.data) {
          const val: string = data.data[key] as unknown as string;
          if (key === "url") continue;
          var hiddenField = document.createElement("input");
          hiddenField.setAttribute("type", "hidden");
          hiddenField.setAttribute("name", key);
          hiddenField.setAttribute("value", val);
          form.appendChild(hiddenField);
        }

        document.body.appendChild(form);
        form.submit();
      }
    } catch (error) {
      console.error("Error fetching payment details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = () => {
    if (isEnroll) {
      setOpen(true);
    } else {
      router.push("/my-course");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
      }}
      defaultOpen={defaultOpen}
    >
      {/* <DialogTrigger asChild> */}
      <Button
        variant={"secondary"}
        size={"sm"}
        className="w-full md:w-auto"
        onClick={handleEnroll}
      >
        {isEnroll ? "Enroll Now" : "Go to course"}
      </Button>
      {/* </DialogTrigger> */}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Purchase This Course</DialogTitle>
          <DialogDescription>
            You can purchase this course using ESEWA wallet
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex justify-start items-center gap-2">
            <div className={`bg-slate-800 p-2 rounded-md w-auto  border-2`}>
              <img src={esewaImgUrl} alt="" />
            </div>
          </div>
          <div className="text-2xl font-semibold">
            Total Price Rs. {course.price}
          </div>
          <Button onClick={processPayment}>Pay using esewa</Button>
        </div>
        <DialogFooter className="sm:justify-start">
          {/* <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
