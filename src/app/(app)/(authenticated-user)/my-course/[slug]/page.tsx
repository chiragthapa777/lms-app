"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListVideo } from "lucide-react";

export function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="content">Content</TabsTrigger>
        <TabsTrigger value="note">Notes</TabsTrigger>
      </TabsList>
      <TabsContent value="content">Content</TabsContent>
      <TabsContent value="note">Note</TabsContent>
    </Tabs>
  );
}

export function SheetDemo() {
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
          <ListChapter />
        </div>
      </SheetContent>
    </Sheet>
  );
}

function ListChapter() {
  return (
    <>
      {" "}
      <h1 className="font-bold text-center p-2 text-xl border-b mb-2">
        Chapters
      </h1>
      <div className="flex flex-col gap-2 px-2">
        <div className="border rounded-md p-2">this is title</div>
        <div className="border rounded-md p-2">this is title</div>
      </div>
    </>
  );
}

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div className="grid grid-cols-12 gap-2 relative flex-1">
      <SheetDemo />
      <div className="col-span-12 md:col-span-9 flex flex-col gap-2">
        <div>
          <video
            width="320"
            height="240"
            controls
            className="w-full max-h-[370px] object-scale-down rounded-lg border"
          >
            <source
              src={`https://videos.pexels.com/video-files/27865902/12248500_1920_1080_30fps.mp4`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
        <div>
          <TabsDemo />
        </div>
      </div>
      <div className="col-span-3 flex flex-col gap-2 border-l hidden md:block">
        <ListChapter />
      </div>
    </div>
  );
}
