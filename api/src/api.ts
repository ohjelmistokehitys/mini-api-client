import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { type ApiRequest } from 'shared/ApiRequest.js';
import { type ApiResponse } from 'shared/ApiResponse.js';

const api = new Hono();

api.use(cors({ origin: '*' }));

api.get('/', (c) => {
  return c.text('It works!');
});

api.post('/fetch', async (c) => {
  const fetchRequest = await c.req.json() as ApiRequest;

  try {

    const httpResponse = await fetch(fetchRequest.url, {
      method: fetchRequest.method || 'GET',
      headers: fetchRequest.headers,
      body: fetchRequest.body
    });

    return c.json({
      status: httpResponse.status,
      headers: Object.fromEntries(httpResponse.headers),
      body: await httpResponse.text(),
    } as ApiResponse);

  } catch (error) {
    console.error('Error fetching:', error);
    return c.json({ error: 'Failed to fetch API' }, 500);
  }
});

export default api;
