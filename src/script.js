import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import { generateCard } from "./card.js";
const data = Deno.readTextFileSync('html/index.html');
const router = new Router();

router.get('/', (context) => {
  const cards = generateCard();
  context.response.body = data.replaceAll('%cards%', cards.join('\n'));
});

router.get("/static/:path*", async (context) => {
  await send(context, context.params.path, {
    root: `${Deno.cwd()}/static`,
  });
});

const server = new Application;
server.use(router.routes());
server.use(router.allowedMethods());
await server.listen({ port: 8000 });