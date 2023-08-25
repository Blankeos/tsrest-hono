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

// Run the server!
try {
  serve(app, (info) => {
    console.log(`Listening on http://localhost:${info.port}`);
  });
} catch (err) {
  console.log(err);
  process.exit(1);
}
