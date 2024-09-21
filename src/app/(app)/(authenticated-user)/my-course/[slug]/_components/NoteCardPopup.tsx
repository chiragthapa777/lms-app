import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { INote } from "@/types/course.type";
import { PlusCircle } from "lucide-react";
import NoteForm from "./NoteForm";

type Props = {
  note?: INote;
  chapterId: number;
  triggerFetch: () => void;
  isOpen?: boolean;
};

export function NoteCardPopup(props: Props) {
  const [open, setOpen] = useState(props.isOpen ?? false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!props.isOpen && (
        <Button
          size={"sm"}
          className="flex gap-2"
          onClick={() => setOpen(true)}
        >
          <p>Create New Note</p>
          <PlusCircle size={20} />
        </Button>
      )}

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{props?.note ? "Edit Note" : "Create Note"}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <NoteForm
            key={props.note?.id ?? props.chapterId}
            {...props}
            onComplete={(done) => {
              setOpen(false);
              if (done) {
                props.triggerFetch();
              }
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
