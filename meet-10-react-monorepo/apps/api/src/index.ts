import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { noteRouter } from "./modules/notes/router";
import { cors } from "hono/cors";

const app = new Hono().use(
	cors({
		origin: "*",
		allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
	})
).route("/notes", noteRouter);

export type AppType = typeof app;

serve(
	{
		fetch: app.fetch,
		port: 8000,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
