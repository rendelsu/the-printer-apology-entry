import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const LINE = "Sorry I ate page 2 of your contract: damp paper, empty Tray 2. You call it a jam; I call it breakfast.";
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const file = join(outDir, "entry.txt");
writeFileSync(file, LINE, "utf8");
chmodSync(file, 0o644);
