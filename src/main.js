import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import { compare } from "../utilites/auticantaion.js";

const page = Deno.readTextFileSync('index.html');
const router = new Router();
router.get('/', (context) => {
  context.response.body = page;
});

router.post("/login", async (context) => {
  const body = await context.request.body.json();
  const validUser = compare(body);
  context.response.body = JSON.stringify(validUser);
  context.response.type = 'json';
});

router.get('/static/:path*', async (context) => {
  await send(context, context.params.path, {
    root: `${Deno.cwd()}/static`,
  });
});
const server = new Application;
server.use(router.routes());
server.use(router.allowedMethods());
await server.listen({ port: 8000 });