import { showHUD, LocalStorage } from "@raycast/api";
import { apiKeyLocalStorageKey } from "./apiKey";

export default async function setApiKey(props: { arguments: { apiKey: string } }) {
  try {
    await LocalStorage.setItem(apiKeyLocalStorageKey, props.arguments.apiKey);
    await showHUD("API key set");
  } catch (error) {
    console.error(error);
    await showHUD("Failed to set API key");
  }
}
