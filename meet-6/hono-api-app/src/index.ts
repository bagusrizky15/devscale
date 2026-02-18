import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { transactionsRouter } from './modules/transactions/router.js'
import { categoriesRouter } from './modules/categories/route.js'

const app = new Hono()
.route("/transactions", transactionsRouter)
.route("/categories", categoriesRouter )

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
