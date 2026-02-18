import { Hono } from "hono";

export const categoriesRouter = new Hono()
.get("/", (c) => {
    return c.json({
        "message": "get all categories"
    })
})