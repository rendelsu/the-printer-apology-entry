import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Sorry I ate page 2 of your contract: damp paper, empty Tray 2. You call it a jam; I call it breakfast.";

// The gate only accepts UTF-8 text of 1-120 characters, a single line,
// not only whitespace. Fail loudly here instead of shipping an invalid entry.
if (LINE.length < 1 || LINE.length > 120) {
  throw new Error(`entry line is ${LINE.length} characters, must be 1-120`);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("entry line must be one non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const file = join(outDir, "entry.txt");
writeFileSync(file, LINE, "utf8");
chmodSync(file, 0o644);

// Confirm what landed on disk is exactly the line, byte for byte.
const written = readFileSync(file, "utf8");
if (written !== LINE) {
  throw new Error("written entry does not match the apology line");
}
