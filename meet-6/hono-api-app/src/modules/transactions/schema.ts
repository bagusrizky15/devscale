import z from 'zod'

export const createTransactionSchema = z.object({
    description: z.string().min(1, "Masukan description"),
    price: z.number().positive("Harga harus positif")
})