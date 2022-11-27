import { rest } from 'msw';

export const handlers = [
  rest.get(`/api/v1/community/search`, (req, res, ctx) => {
    return res(ctx.json({ hello: 'world' }));
  }),
];
