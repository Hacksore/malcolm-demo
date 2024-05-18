import { defineConfig } from "@nickhudkins/malcolm";
import { load } from 'cheerio';


export default defineConfig({
  hosts: ["malcolm-demo.vercel.app"],
  shouldIntercept: (req) => {
    // // if it's a get and document request
    // if (req.method === "GET" && req.headers["content-type"]?.startsWith("text/html")) {
    //   // TODO:
    //   return true
    // }
    // return false

    return true
  },
  handleRequest: async (req) => {
    const url = new URL(req.url);
    return {
      ctx: {
        requestURL: url,
      }
    }
  },
  handleResponse: (
    res,
    ctx
  ) => {

    if (!res.headers["content-type"]?.startsWith("text/html")) {
      return;
    }

    const $ = load(res.body.buffer.toString('utf-8'));

    console.log($.html())
    const ele = $("#header");

    ele.text("ayo lmao git hacked")

    return {
      body: $.html()
    }
  },
});
