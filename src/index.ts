import { showHUD } from "@raycast/api";

import { z } from "zod";
import fetch from "node-fetch";
import { API_KEY, LOCAL_SERVER_URL } from "./env";

const urlSchema = z
  .string()
  .url()
  .transform((url) => new URL(url));

export default async function main(props: {
  arguments: {
    url: string;
  };
}) {
  const urlParseResult = urlSchema.safeParse(props.arguments.url);
  if (!urlParseResult.success) {
    await showHUD("🚨Invalid URL");
    return;
  }
  const url = urlParseResult.data;

  const res = await fetch(new URL("/api/articles", LOCAL_SERVER_URL), {
    body: JSON.stringify({
      url: url.toString(),
    }),
    method: "POST",
    headers: {
      "x-api-key": API_KEY,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    await showHUD("🚨Failed to add document to your shelf. Check server");
    return;
  }

  await showHUD("🎉Successfully add document to your shelf");
}
