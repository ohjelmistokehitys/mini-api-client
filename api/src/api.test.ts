import { describe, expect, test } from 'vitest';
import api from './api.js';
import { type ApiRequest } from 'shared/ApiRequest.js';
import type { ApiResponse } from 'shared/ApiResponse.js';

describe('server root', () => {
    test('responds with 200', async () => {
        const res = await api.request('/', { method: 'GET' });
        expect(res.status).toBe(200);
        expect(await res.text()).toContain('It works!');
    });
});

describe('fetch endpoint', () => {
    test('retrieves data successfully from external API', async () => {
        const res = await api.request('/fetch', {
            method: 'POST',
            body: JSON.stringify({
                url: "https://jsonplaceholder.typicode.com/users/1",
            } as ApiRequest)
        });

        expect(res.status).toBe(200);
        const data = await res.json() as ApiResponse;

        expect(data.status).toBe(200);
        expect(data.headers['content-type']).toContain('application/json');
        expect(data.body).toContain('username');
    });

    test('handles error responses successfully', async () => {
        const res = await api.request('/fetch', {
            method: 'POST',
            body: JSON.stringify({
                url: "https://www.haaga-helia.fi/error/not/found"
            } as ApiRequest)
        });

        expect(res.status).toBe(200);

        const data = await res.json() as ApiResponse;
        expect(data.status).toBe(404);
    });

    test('responds with 500 on fetch error', async () => {
        const res = await api.request('/fetch', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                url: "http://nonexistent/",
                method: "GET",
                headers: {}
            } as ApiRequest)
        });

        expect(res.status).toBe(500);

        const data = await res.json();
        expect(data).toHaveProperty('error');
    });
});
