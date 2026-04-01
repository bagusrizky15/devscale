import { createFileRoute, useRouter } from "@tanstack/react-router";
import { api } from "#/utils/api";
import { Button } from "@devscale/ui";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: App,
  loader: async () => {
    const res = await api.notes.$get();
    const notes = await res.json();
    return notes;
  },
});

function App() {
  const router = useRouter();
  const notes = Route.useLoaderData();
  const [noteContent, setNoteContent] = useState("");

  async function handleCreateNote() {
    const res = await api.notes.$post({
      json: {
        content: noteContent,
      },
    });

    await res.json();
    setNoteContent("");
    router.invalidate();
  }

  async function handleDeleteNote(id: number) {
    const res = await api.notes[":id"].$delete({
      param: {
        id: id.toString(),
      },
    });

    await res.json();
    router.invalidate();
  }

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto md:max-w-7xl p-20 grid grid-cols-2 gap-2">
        <div className="">
          {notes.map((note) => {
            return (
              <div className="border border-gray-400 rounded-[6px] p-2 mb-2 flex items-start justify-between gap-3" key={note.id}>
                <div>{note.content}</div>
                <Button onClick={() => handleDeleteNote(note.id)}>Delete</Button>
              </div>
            );
          })}
        </div>
        <div className="flex flex-row">
          <div className="mr-2">
            <textarea className="border border-gray-400 h-[200px]" name="" id="" value={noteContent} onChange={(e) => setNoteContent(e.target.value)}></textarea>
          </div>
          <div>
            <Button onClick={handleCreateNote}>Add Note</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
