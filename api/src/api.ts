import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { type ApiRequest } from 'shared/ApiRequest.js';
import { type ApiResponse } from 'shared/ApiResponse.js';

const api = new Hono();

/**
 * Enable CORS for all routes.
 */
api.use('/*', cors({ origin: '*' }));

/**
 * This endpoint returns a simple text response indicating that the API is working.
 */
api.get('/', (c) => {
  return c.text('It works!');
});

/**
 * This endpoint acts as a proxy to fetch data from another API.
 */
api.post('/fetch', async (c) => {
  const fetchRequest = await c.req.json() as ApiRequest;

  try {
    console.log('Processing request:', fetchRequest);

    const httpResponse = await fetch(fetchRequest.url, {
      method: fetchRequest.method || 'GET',
      headers: fetchRequest.headers,
      body: fetchRequest.body
    });

    console.log('Received response:', httpResponse);

    return c.json({
      status: httpResponse.status,
      statusText: httpResponse.statusText,
      headers: Object.fromEntries(httpResponse.headers),
      body: await httpResponse.text(),
    } as ApiResponse);

  } catch (error) {
    console.error('Error fetching:', error);
    return c.json({ error: 'Failed to fetch' }, 500);
  }
});

export default api;
