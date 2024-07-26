import { Elysia } from "elysia";
import postsRoutes from "./routes/posts";

const app = new Elysia();
const plugin = new Elysia().derive({ as: "scoped" }, () => {
  return { hi: "ok" };
});
app
  .use(plugin)
  .group("/api", (app) => app.use(postsRoutes))
  .listen(3049);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
