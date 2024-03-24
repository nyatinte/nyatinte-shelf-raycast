import { showHUD, LocalStorage } from "@raycast/api";
import { apiKeyLocalStorageKey } from "./apiKey";
import { z } from "zod";

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

  /** TODO: Implement the API call */
  // await fetch("my-api-endpoint", {
  //   body: JSON.stringify({
  //     url: url.toString(),
  //   }),
  //   method: "POST",
  //   headers: {
  //     "x-api-key": apiKey.toString(),
  //   },
  // });

  await showHUD("🎉Successfully add document to your shelf");
}
