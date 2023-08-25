import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

type Post = {
  title: string;
  body: string;
};

export const contract = c.router({
  createPost: {
    method: "POST",
    path: "/posts",
    responses: {
      201: c.type<Post>(),
    },
    body: c.type<{ title: string }>(),
    summary: "Create a post",
  },
  getPost: {
    method: "GET",
    path: `/posts/:id`,
    responses: {
      200: c.type<Post | null>(),
    },
    summary: "Get a post by id",
  },
});
