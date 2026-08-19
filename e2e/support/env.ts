import { readFileSync } from "node:fs";
import path from "node:path";

function loadEnvFile(file: string) {
  let contents: string;

  try {
    contents = readFileSync(path.resolve(process.cwd(), file), "utf8");
  } catch {
    return;
  }

  for (const line of contents.split("\n")) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);

    if (!match) continue;

    const [, key, rawValue] = match;

    if (process.env[key] !== undefined) continue;

    process.env[key] = rawValue.trim().replace(/^(["'])(.*)\1$/, "$2");
  }
}

loadEnvFile(".env.test");

export const supportFormEnv = {
  get apiKey() {
    return process.env.VITE_API_KEY ?? "";
  },
  get environment() {
    return process.env.VITE_ENVIRONMENT ?? "";
  },
  get termUrl() {
    return process.env.VITE_TERM_URL ?? "";
  },
  get artUploadEnabled() {
    return process.env.VITE_ENABLE_ART_UPLOAD === "true";
  },
};
