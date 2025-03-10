import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import { generateCard } from "./card.js";
import { compare } from "../utilites/auticantaion.js";

const data = Deno.readTextFileSync('html/index.html');
const router = new Router();

router.get('/', (context) => {
  const page = Deno.readTextFileSync('html/loginPage.html');
  context.response.body = page;
});

router.get('/cards', (context) => {
  const cards = generateCard();
  context.response.body = data.replaceAll('%cards%', cards.join('\n'));
});

router.post("/login", async (context) => {
  const body = await context.request.body.json();
  const validUser = compare(body);
  context.response.body = JSON.stringify(validUser);
  context.response.type = 'json';
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