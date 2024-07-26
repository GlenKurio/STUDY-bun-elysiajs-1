import { NotFoundError } from "elysia";
import { db } from "../../db";

export async function getPosts() {
  try {
    return await db.post.findMany({ orderBy: { createdAt: "asc" } });
  } catch (error: unknown) {
    console.log(error);
  }
}

export const getPostById = async (id: number) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    const post = await db.post.findUnique({ where: { id } });
    if (!post) {
      throw new NotFoundError("Post not found");
    }

    return post;
  } catch (error) {
    console.log(error);
  }
};

export async function createPost(options: { title: string; content: string }) {
  const { title, content } = options;
  try {
    const post = await db.post.create({ data: { title, content } });
    return post;
  } catch (error) {
    console.log(error);
  }
}
export async function updatePost(
  id: number,
  options: { title?: string; content?: string }
) {
  const { title, content } = options;
  try {
    const post = await db.post.update({
      where: { id },
      data: { ...(title ? { title } : {}), ...(content ? { content } : {}) },
    });
    return post;
  } catch (error) {
    console.log(error);
  }
}

export async function deletePost(options: { id: number }) {
  try {
    const { id } = options;
    return await db.post.delete({ where: { id } });
  } catch (error) {
    console.log(error);
  }
}
