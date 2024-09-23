import Viewer from "@/components/rich-text/viewer";
import { INote } from "@/types/course.type";

import { Edit, EllipsisVertical, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NoteCardPopup } from "./NoteCardPopup";
import { useState } from "react";
import { deleteNoteAction } from "@/actions/note/note.user.action";
import { toast } from "sonner";

type Props = {
  note: INote;
  triggerFetch: () => void;
};

export function NoteOptionMenu({
  onSelect,
}: {
  onSelect: (name: string) => void;
}) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <EllipsisVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => onSelect("EDIT")}>
              <Edit className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSelect("DELETE")}>
              <Trash className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default function NoteCard({ note, triggerFetch }: Props) {
  const [openEdit, setOpenEdit] = useState(false);
  return (
    <div className="border rounded-md p-4 flex flex-col gap-2 ">
      {openEdit && (
        <NoteCardPopup
          chapterId={note.chapterId}
          note={note}
          key={note.id}
          triggerFetch={() => {
            setOpenEdit(false);
            triggerFetch();
          }}
          isOpen={true}
        />
      )}
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold">{note.title}</h3>
        <NoteOptionMenu
          onSelect={(name) => {
            switch (name) {
              case "EDIT": {
                setOpenEdit(true);
                return;
              }
              case "DELETE": {
                deleteNoteAction(note.id).then(() => {
                  triggerFetch();
                  toast.success("Note deleted");
                });
                toast.info("Note deletion in progress");
                return;
              }
            }
          }}
        />
      </div>
      <Viewer content={note.content} key={note.id} />
    </div>
  );
}
