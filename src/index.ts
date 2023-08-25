import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { createHonoEndpoints } from "ts-rest-hono";
import { contract } from "./contract";
import router from "./honoRouter";

const app = new Hono();

app.get("/", (c) => {
  return c.text("🔥 Hello Hono!");
});

createHonoEndpoints(contract, router, app);

serve(app, (info) => {
  console.log(`Listening on http://localhost:${info.port}`);
});
