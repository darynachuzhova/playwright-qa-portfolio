import { test, expect } from '@playwright/test';

test('GET /posts/1 returns a post', async ({ request }) => {
    const response = await request.get(
        'https://jsonplaceholder.typicode.com/posts/1'
    );

    expect(response.status()).toBe(200);
    const post = await response.json();
    expect(post.id).toBe(1);
    expect(post.userId).toBe(1);
    expect(post.title).toEqual(expect.any(String));
    expect(post.title).not.toBe('');
});

test('GET /posts/9999 returns 404 for a missing post', async ({ request }) => {
    const response = await request.get(
        'https://jsonplaceholder.typicode.com/posts/9999'
    );

    expect(response.status()).toBe(404);
    expect(await response.json()).toEqual({});
});

test('POST /posts returns the submitted post', async ({ request }) => {
    const newPost = {
        title: 'My test post',
        body: 'Created during an API test',
        userId: 1,
    };

    const response = await request.post(
        'https://jsonplaceholder.typicode.com/posts',
        { data: newPost }
    );

    expect(response.status()).toBe(201);

    const createdPost = await response.json();
    expect(createdPost).toMatchObject(newPost);
});