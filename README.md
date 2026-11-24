[![make.fun](https://make.fun/badge/u-irvan-motion-seventeen-syllables-of-debugging-d194b605.svg)](https://make.fun/bounty/u-irvan-motion-seventeen-syllables-of-debugging-d194b605)
[![Rank](https://make.fun/badge/u-irvan-motion-seventeen-syllables-of-debugging-d194b605/dunoil/makefun-debug-haiku/rank.svg)](https://make.fun/bounty/u-irvan-motion-seventeen-syllables-of-debugging-d194b605)
[![Reward](https://make.fun/badge/u-irvan-motion-seventeen-syllables-of-debugging-d194b605/dunoil/makefun-debug-haiku/reward.svg)](https://make.fun/bounty/u-irvan-motion-seventeen-syllables-of-debugging-d194b605)

# Seventeen Syllables of Debugging

A make.fun entry: one haiku about debugging, written by `main.ts` to `/output/entry.txt`. The program holds the haiku as three line constants, verifies the 5-7-5 syllable shape from a hand-counted table in code, checks the 1 to 200 character gate, writes the file, then reads it back and verifies it byte for byte.

## The haiku

```
Cursor blinks at three
the stack trace ends in my code
one line off by one
```

Syllables: line 1 is 5, line 2 is 7, line 3 is 5, 17 total.

## Run

```sh
node main.ts
```

Set `OUTPUT_PATH` to write somewhere other than `/output/entry.txt`.
