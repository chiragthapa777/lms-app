"use client";

import Viewer from "@/components/rich-text/viewer";
import { Button, ButtonWithLoading } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { rateByUserAction } from "@/actions/enrollment/user.action";
import Ratings from "@/components/app/rating";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useUserContext } from "@/providers/AuthUserProvider";
import { IChapter, ICourse } from "@/types/course.type";
import { ListVideo, Play } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import NoteView from "./NoteView";

export function AddReview({ course }: { course: ICourse }) {
  const { user } = useUserContext();
  const userEnrollment = useMemo(
    () => course.enrollments.find((e) => e.userId === user.id),
    [course, user]
  );
  const [rating, setRating] = useState(userEnrollment?.rating ?? 0);
  const [review, setReview] = useState(userEnrollment?.review ?? "");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const handleAddReview = async () => {
    setLoading(true);
    setError("");
    try {
      const body = { review, rating };
      const response = await rateByUserAction(body, course.id);
      if (response.error) {
        throw new Error(response.error.message);
      }
      toast.success("Review added successfully");
      setOpen(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : (error as string));
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        size={"xs"}
      >
        Add Review
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Review</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {error && <p className="error text-red-500">Error : {error}</p>}

          <div className="flex justify-start items-center gap-3">
            <p>Rate </p>
            <Ratings
              value={rating}
              variant="destructive"
              size={20}
              asInput={true}
              onValueChange={setRating}
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="message">Review</Label>
            <Textarea
              placeholder="Write your review..."
              id="message"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <ButtonWithLoading loading={loading} onClick={handleAddReview}>
            Save changes
          </ButtonWithLoading>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function TabsDemo({
  chapter,
  course,
}: {
  course?: ICourse;
  chapter?: IChapter;
}) {
  return (
    <Tabs defaultValue="content" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="content">Content</TabsTrigger>
        <TabsTrigger value="note">Notes</TabsTrigger>
      </TabsList>
      <TabsContent value="content">
        <div className="border p-2 m-2 rounded-md">
          <Viewer content={chapter?.content ?? ""} key={chapter?.content} />
        </div>
      </TabsContent>
      <TabsContent value="note">
        <div className="p-2 m-2 flex flex-col">
          <NoteView
            course={course as ICourse}
            chapter={chapter as IChapter}
            key={chapter?.id}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}

export function SheetDemo(props: {
  course?: ICourse;
  setActiveChapter: React.Dispatch<React.SetStateAction<number | undefined>>;
  activeChapter?: number;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="default"
          className="fixed bottom-10 right-10  rounded-full drop-shadow-md flex justify-center items-center h-[50px] w-[50px] md:hidden z-50"
        >
          <ListVideo />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="grid gap-4 py-4">
          <ListChapter
            setActiveChapter={props.setActiveChapter}
            activeChapter={props.activeChapter}
            chapters={props.course?.chapters}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function ListChapter(props: {
  chapters?: IChapter[];
  setActiveChapter: React.Dispatch<React.SetStateAction<number | undefined>>;
  activeChapter?: number;
}) {
  return (
    <>
      {" "}
      <h1 className="font-bold text-center p-2 text-xl border-b mb-2">
        Chapters
      </h1>
      <div className="flex flex-col gap-2 px-2">
        {props.chapters?.map((chapter: IChapter) => (
          <div
            key={chapter.id}
            className={`border rounded-md p-2 flex justify-start items-center gap-2 cursor-pointer  ${
              props.activeChapter === chapter.id
                ? "bg-slate-100 drop-shadow-sm"
                : "hover:drop-shadow-sm hover:bg-slate-50"
            }`}
            onClick={() => {
              props.setActiveChapter(chapter.id);
            }}
          >
            {props.activeChapter === chapter?.id && <Play size={20} />}
            <p>{chapter.title}</p>
          </div>
        ))}
      </div>
    </>
  );
}
