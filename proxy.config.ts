import { defineConfig } from "@nickhudkins/malcolm";
import { load } from "cheerio";

export default defineConfig({
  hosts: ["malcolm-demo.vercel.app"],
  shouldIntercept: () => true,
  handleRequest: async (req) => {
    const url = new URL(req.url);
    return {
      ctx: {
        requestURL: url,
      },
    };
  },
  handleResponse: (res) => {
    if (!res.headers["content-type"]?.startsWith("text/html")) {
      return;
    }

    const $ = load(res.body.buffer.toString("utf-8"));
    const ele = $("#header");

    ele.text("weeen woa");

    return {
      body: $.html(),
    };
  },
});
