import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import { generateCard } from "./card.js";
import { compare } from "../utilites/auticantaion.js";

const data = Deno.readTextFileSync('html/index.html');
const router = new Router();
const serverVaiables = { studentLogin: false };

router.get('/', (context) => {
  if (serverVaiables.studentLogin) {
    const page = Deno.readTextFileSync('html/existTemplate.html')
      .replaceAll("%message%", "you already login")
      .replaceAll('%link%', 'cards')
      .replaceAll("%returnPoint%", "cards");
    context.response.body = page;
    return "already Logged in";
  }

  const page = Deno.readTextFileSync('html/loginPage.html');
  context.response.body = page;
});

router.get('/createAcc', (context) => {
  const body = Deno.readTextFileSync('html/createAcc.html');
  context.response.body = body;
});

router.post("/createAccount", async (context) => {
  const body = await context.request.body.json();
  const data = JSON.parse(Deno.readTextFileSync('json/users.json'));
  if (body.userName in data) {
    context.body = alert("user already present");
  }

  data[body.userName] = body.password;
  Deno.writeTextFileSync('json/users.json', JSON.stringify(data));
});

const displayForVaild = (context, login) => {
  if (!login) {
    const page = Deno.readTextFileSync('html/existTemplate.html')
      .replaceAll("%message%", "please login first")
      .replaceAll('%link%', '')
      .replaceAll('%returnPoint%', "Back to login");
    return page;
  }

  const cards = generateCard();
  return data.replaceAll('%cards%', cards.join('\n'));
};

router.get('/cards', (context) => {
  context.response.body = displayForVaild(context, serverVaiables.studentLogin);
});

const displayLogin = async (context, login) => {
  const body = await context.request.body.json();
  const validUser = compare(body);
  serverVaiables.studentLogin = validUser;
  context.response.body = JSON.stringify(validUser);
  context.response.type = 'json';
  return context;
};

router.post("/login", async (context) => {
  await displayLogin(context, serverVaiables.studentLogin);
});

router.get("/getUsersNames", async (context) => {
  const userNames = JSON.parse(Deno.readTextFileSync('json/users.json'));
  context.response.body = JSON.stringify(userNames);
  context.response.type = 'json';
});

router.get("/static/:path*", async (context) => {
  await send(context, context.params.path, {
    root: `${Deno.cwd()}/static`,
  });
});

router.get("/forgetPassword", async (context) => {
  const page = Deno.readTextFileSync('html/forgetPassword.html');
  context.response.body = page;
});

const server = new Application;
server.use(router.routes());
server.use(router.allowedMethods());
await server.listen({ port: 8000 });