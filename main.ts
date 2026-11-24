// Seventeen Syllables of Debugging
// A make.fun entry: one haiku about debugging, written to /output/entry.txt.
// The haiku is held in three line constants. Every word is counted by hand
// in the syllable table below, and the program fails loudly if any count
// is off, so the 5-7-5 shape is verified, not assumed.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The haiku. Three lines, five, seven and five syllables.
const LINE_1 = "Cursor blinks at three";
const LINE_2 = "the stack trace ends in my code";
const LINE_3 = "one line off by one";

// Syllable counts, word by word, counted by hand.
// Line 1: Cur-sor (2) blinks (1) at (1) three (1) = 5.
// Line 2: the (1) stack (1) trace (1) ends (1) in (1) my (1) code (1) = 7.
// Line 3: one (1) line (1) off (1) by (1) one (1) = 5.
const SYLLABLES: Record<string, number> = {
  "Cursor": 2,
  "blinks": 1,
  "at": 1,
  "three": 1,
  "the": 1,
  "stack": 1,
  "trace": 1,
  "ends": 1,
  "in": 1,
  "my": 1,
  "code": 1,
  "one": 1,
  "line": 1,
  "off": 1,
  "by": 1,
};

const EXPECTED_COUNTS = [5, 7, 5];
const EXPECTED_TOTAL = 17;
const MAX_CHARS = 200;

function countLine(line: string): number {
  let total = 0;
  for (const word of line.split(" ")) {
    const count = SYLLABLES[word];
    if (count === undefined) {
      throw new Error(`No syllable count recorded for word: ${word}`);
    }
    total += count;
  }
  return total;
}

function fail(message: string): never {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

function main(): void {
  const lines = [LINE_1, LINE_2, LINE_3];

  // Verify the 5-7-5 shape from the hand-counted table.
  const counts = lines.map(countLine);
  counts.forEach((count, index) => {
    if (count !== EXPECTED_COUNTS[index]) {
      fail(
        `Line ${index + 1} has ${count} syllables, expected ${EXPECTED_COUNTS[index]}: "${lines[index]}"`,
      );
    }
  });
  const totalSyllables = counts.reduce((sum, count) => sum + count, 0);
  if (totalSyllables !== EXPECTED_TOTAL) {
    fail(`Total is ${totalSyllables} syllables, expected ${EXPECTED_TOTAL}`);
  }

  // Build the entry text: the three lines joined by newlines.
  const text = lines.join("\n");

  // Gate validation: 1 to 200 characters, not whitespace only.
  if (text.length < 1 || text.length > MAX_CHARS) {
    fail(`Entry is ${text.length} characters, must be 1 to ${MAX_CHARS}`);
  }
  if (text.trim().length === 0) {
    fail("Entry is whitespace only");
  }

  // Write the entry, then read it back and verify it byte for byte.
  const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, text, "utf8");
  const roundTrip = readFileSync(outPath, "utf8");
  if (roundTrip !== text) {
    fail(`Read-back mismatch at ${outPath}`);
  }

  console.log(text);
  console.log(`---`);
  lines.forEach((line, index) => {
    const breakdown = line
      .split(" ")
      .map((word) => `${word}(${SYLLABLES[word]})`)
      .join(" ");
    console.log(`Line ${index + 1} (${counts[index]}): ${breakdown}`);
  });
  console.log(`Characters: ${text.length}`);
  console.log(`Syllables: ${counts.join("-")} = ${totalSyllables}`);
  console.log(`Wrote ${outPath} and verified the read-back byte for byte.`);
}

main();
