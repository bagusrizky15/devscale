import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { prisma } from "../../utils/prisma";
import { CreateNoteSchema } from "./schema";

export const noteRouter = new Hono()
	.get("/", async (c) => {
		const notes = await prisma.note.findMany();
		return c.json(notes);
	})
	.post("/", zValidator("json", CreateNoteSchema), async (c) => {
		const body = c.req.valid("json");
		const newNote = await prisma.note.create({
			data: {
				content: body.content,
			},
		});
		return c.json(newNote);
	})
	.delete("/:id", zValidator("param", z.object({ id: z.coerce.number() })), async (c) => {
		const { id } = c.req.valid("param");
		const deletedNote = await prisma.note.delete({
			where: {
				id,
			},
		});
		return c.json(deletedNote);
	});
