import { serve } from '@hono/node-server'
import { log } from '@devscale/logger'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  log("hello from api")
  return c.text('Hello Hono!')
})

serve({
  fetch: app.fetch,
  port: 8000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
