// import { initServer } from "ts-rest-hono";
import { initServer } from "@ts-rest/express";
import { contract } from "./contract";

const honoServer = initServer();
const expressServer = initServer();

honoServer.router(contract, {
  getPost: async ({ params: { id } }) => {
    return {
      status: 200,
      body: {
        body: "Hello",
        title: "Hello",
      },
    };
  },
  createPost: async ({}) => {
    return {
      status: 401,
      body: {},
    };
  },
});

// expressServer.router(contract, {
//   getPost: async ({ params: { id } }) => {
//     return {
//       status: 200,
//       body: {
//         body: "Hello",
//         title: "Hi",
//       },
//     };
//   },
//   createPost: async ({}) => {
//     return {
//       status: 200,
//       body: {},
//     };
//   },
// });
