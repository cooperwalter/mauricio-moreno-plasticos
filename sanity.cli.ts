import { defineCliConfig } from "sanity/cli";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "5zy7xqw9";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineCliConfig({
  api: { projectId, dataset },
  studioHost: "mauricio-moreno-plasticos",
  deployment: {
    appId: "vaovu5jn0wavwu3u60bdm28r",
  },
});
