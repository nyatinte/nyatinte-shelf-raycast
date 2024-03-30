import { showHUD, LocalStorage } from "@raycast/api";
import { apiKeyLocalStorageKey } from "./apiKey";
import { z } from "zod";
import fetch from "node-fetch";
import { LOCAL_SERVER_URL } from "./env";

const urlSchema = z
  .string()
  .url()
  .transform((url) => new URL(url));

export default async function main(props: {
  arguments: {
    url: string;
  };
}) {
  const apiKey = await LocalStorage.getItem(apiKeyLocalStorageKey);

  if (!apiKey) {
    await showHUD("⚙️API key not set. Run the 'Set API Key' command first.");
    return;
  }

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
      "x-api-key": apiKey.toString(),
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    await showHUD("🚨Failed to add document to your shelf. Check server");
    return;
  }

  await showHUD("🎉Successfully add document to your shelf");
}
