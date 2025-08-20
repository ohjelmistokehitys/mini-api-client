import { serve } from '@hono/node-server'
import api from './api.js'

/**
 * Starts a "traditional" HTTP server. The API is intended to be used in a
 * serverless environment, but can be run with Node.js in development.
 */
serve({
    fetch: api.fetch,
    port: 3000
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
})
