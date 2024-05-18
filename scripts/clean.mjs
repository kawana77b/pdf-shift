import { existsSync,rm } from "node:fs";
import { resolve } from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Cleans up the release directory.
 */

const __dirname = dirname(fileURLToPath(import.meta.url));

const releaseDir = resolve(__dirname, "../", "release");
if (existsSync(releaseDir)) {
  rm(releaseDir, { recursive: true, force: true }, (err) => {
    if (err) {
      console.error("Error cleaning up release directory", err);
      return;
    }
  });
  console.log("Cleaned up release directory");
}
