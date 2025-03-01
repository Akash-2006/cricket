import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import { generateCard } from "./card.js";
const data = Deno.readTextFileSync('html/index.html');
const router = new Router();
router.get('/', (context) => {
  const cards = generateCard();
  // console.log(cards);
  context.response.body = data.replaceAll('%cards%', cards.join('\n'));
});
router.get('/home', (context) => {
  context.response.body = 'emai ledhu abu';
});
router.get("/static/:path*", async (context) => {
  await send(context, context.params.path, {
    root: `${Deno.cwd()}/static`, // Set root to your static folder
  });
});
const server = new Application;
server.use(router.routes());
server.use(router.allowedMethods());
await server.listen({ port: 8000 });