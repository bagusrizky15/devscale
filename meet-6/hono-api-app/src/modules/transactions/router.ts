import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createTransactionSchema } from "./schema.js";
import { prisma } from "../../utils/prisma.js";

export const transactionsRouter = new Hono()
    .get("/", async (c) => {
        try {
            const transactions = await prisma.transactions.findMany()
            return c.json({
                "message": "get all transactions",
                "data": transactions
            })
        } catch (error) {
            return c.json({
                "message": "internal server error",
                "error": error
            }, 500)
        }
    })
    .get("/:id", async (c) => {
        try {
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
        } catch (error) {
            return c.json({
                "message": "internal server error",
                "error": error
            }, 500)
        }
    })
    .post("/", zValidator("json", createTransactionSchema), async (c) => {
        try {
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
        } catch (error) {
            return c.json({
                "message": "internal server error",
                "error": error
            }, 500)
        }
    })
    .patch("/:id", zValidator("json", createTransactionSchema.partial()), async (c) => {
        try {
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
        } catch (error) {
            return c.json({
                "message": "internal server error",
                "error": error
            }, 500)
        }

    })
    .delete("/:id", async (c) => {
        try {
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

            return c.json({
                "message": "success delete transaction"
            })
        } catch (error) {
            return c.json({
                "message": "internal server error",
                "error": error
            }, 500)
        }
    })