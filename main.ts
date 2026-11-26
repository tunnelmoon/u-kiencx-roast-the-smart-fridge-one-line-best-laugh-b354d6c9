// Roast the Smart Fridge: One Line, Best Laugh Wins
// Entry: a one-line roast (117 chars, limit 160) of the robot vacuum we live with.
// Node 22, stdlib only. Writes the line to (MAKEFUN_OUTPUT_DIR ?? "/output")/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My robot vacuum mapped the whole house, then filed the dog under 'obstacle' and me under 'also obstacle, but slower.'";

if (LINE.length < 1 || LINE.length > 160) {
  throw new Error(`entry must be 1-160 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE + "\n", "utf8");
// Read-back check: the file on disk must be exactly the validated line.
if (readFileSync(outPath, "utf8") !== LINE + "\n") {
  throw new Error("entry.txt does not match the validated line");
}
