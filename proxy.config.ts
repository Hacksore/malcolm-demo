import { defineConfig } from "@nickhudkins/malcolm";

export default defineConfig({
  hosts: ["google.com"],
  handleRequest: async (req) => {
    const url = new URL(req.url);
    return {
      ctx: {
        requestURL: url,
      }
    }
  },
  handleResponse: (
    res: PassThroughResponse,
    ctx
  ) => {
    // I have `ctx`! which is provided by the above
    return;
  },
};
