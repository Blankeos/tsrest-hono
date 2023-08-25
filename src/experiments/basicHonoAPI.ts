import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/api/hello", (c) => {
  return c.json({
    ok: true,
    message: "Hello Hono!",
  });
});

app.get("/api/carlo", (c) => {
  return c.json({
    ok: true,
    message: "Hello carlo!",
  });
});

serve(app, (info) => {
  console.log(`Listening on http://localhost:${info.port}`);
});
