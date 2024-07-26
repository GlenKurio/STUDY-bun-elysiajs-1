import { Elysia, t } from "elysia";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "./handlers";

const postsRoutes = new Elysia({ prefix: "/posts" })
  .get("/", () => getPosts())
  .get("/:id", ({ params: { id } }) => getPostById(id), {
    params: t.Object({
      id: t.Numeric(),
    }),
  })
  .post("/", ({ body }) => createPost(body), {
    body: t.Object({
      title: t.String({ minLength: 3, maxLength: 100 }),
      content: t.String({
        minLength: 3,
        maxLength: 1000,
      }),
    }),
  })
  .patch("/:id", ({ params: { id }, body }) => updatePost(id, body), {
    params: t.Object({
      id: t.Numeric(),
    }),
    body: t.Object(
      {
        title: t.Optional(t.String({ minLength: 3, maxLength: 100 })),
        content: t.Optional(
          t.String({
            minLength: 3,
            maxLength: 1000,
          })
        ),
      },
      { minProperties: 1 }
    ),
  })
  .delete("/:id", ({ body }) => deletePost(body), {
    body: t.Object({ id: t.Numeric() }),
  });

export default postsRoutes;
