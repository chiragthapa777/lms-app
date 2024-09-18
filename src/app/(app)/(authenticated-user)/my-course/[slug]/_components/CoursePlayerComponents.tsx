"use client";

import Viewer from "@/components/rich-text/viewer";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IChapter, ICourse } from "@/types/course.type";
import { ListVideo, Play } from "lucide-react";

export function TabsDemo({
  course,
  chapter,
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
        <div className="border p-2 m-2 rounded-md">
          <Viewer content={chapter?.notes[0]?.title ?? ""} />
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
          className="absolute bottom-10 right-10  rounded-full drop-shadow-md flex justify-center items-center h-[50px] w-[50px] md:hidden"
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
                ? "bg-slate-100 drop-shadow-md"
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
