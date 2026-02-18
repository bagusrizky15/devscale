import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createTransactionSchema } from "./schema.js";
import { prisma } from "../../utils/prisma.js";

export const transactionsRouter = new Hono()
    .get("/", async (c) => {
        const transactions = await prisma.transactions.findMany()

        return c.json({
            "message": "get all transactions",
            "data": transactions
        })
    })
    .get("/:id", async (c) => {

        const transactionId = c.req.param("id")
        const transaction = await prisma.transactions.findUnique({
            where: {
                id: Number(transactionId)
            }
        })

        if (!transaction) {
            return c.json({
                "message": "transaction not found"
            }, 404)
        }

        return c.json({
            "message": "get transaction by id",
            "data": transaction
        })
    })
    .post("/", zValidator("json", createTransactionSchema), async (c) => {
        const body = c.req.valid("json")

        const newTransaction = await prisma.transactions.create({
            data: {
                description: body.description,
                price: body.price
            }
        })

        return c.json({
            "message": "success create new transaction",
            "data": newTransaction
        }, 201)
    })
    .patch("/:id", zValidator("json", createTransactionSchema.partial()), async (c) => {
        const transactionId = c.req.param("id")
        const body = c.req.valid("json")

        const extTransaction = await prisma.transactions.findUnique({
            where: {
                id: Number(transactionId)
            }
        })

        if (!extTransaction) {
            return c.json({
                "message": "transaction not found"
            }, 404)
        }

        const updatedTransaction = await prisma.transactions.update({
            where: {
                id: Number(transactionId)
            },
            data: {
                description: body.description,
                price: body.price
            }
        })

        return c.json({
            "message": "success update transaction",
            "data": updatedTransaction
        })
    })
    .delete("/:id", async (c) => {
        const transactionId = c.req.param("id")

        const extTransaction = await prisma.transactions.findUnique({
            where: {
                id: Number(transactionId)
            }
        })

        if (!extTransaction) {
            return c.json({
                "message": "transaction not found"
            }, 404)
        }

        await prisma.transactions.delete({
            where: {
                id: Number(transactionId)
            }
        })
        return c.json({ "message": "success delete transaction" })
    })