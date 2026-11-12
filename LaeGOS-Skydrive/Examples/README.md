# Laegna number-system examples

This folder collects learning examples and generators for Laegna number systems. `../DataLib` and `../DataCode` load their number-system definitions from `../DataRfx/laegna.json`; they do not load these example files. Keep the examples unchanged when working on those projects.

## Number datasets

- `numbers.json` enumerates base-4 Laegna and waveform forms over bounded ranges, with decimal values, digit indexes, and related binary/hex displays.
- `numbers.bin.json` contains the small base-2 example, including zero, known digits, unknown values, and infinity.
- `complete.json` combines the number records with additional bounds, float, and octave fields.
- `octaves.json` contains the separate base-3 octave examples.
- `lanes.json` describes lane axes and ranges.
- `animation.json` combines number records with animation data; `animation.js` consumes that data.

## Generators and readable forms

- `decoder.py` is the Python-side example generator and exporter. Runtime conversion behavior for the screen and keyboard library belongs in JavaScript in `../DataLib`; do not add conversion APIs there to replace the JavaScript implementation.
- `extensions.py` and `sheepcounter.js` are related generation/display examples.
- `laegna.md` and `laegnawaves.md` are human-readable enumerations of the standard and waveform forms.

The base-4 waveform encoding is context-sensitive. Its inverse must use the previously decoded waveform digit when selecting the current digit's inverse permutation. DataLib implements both directions based on the rules represented here; development tests may compare outputs with these bounded examples for correctness.

These datasets and example source files are learning-only references, not app runtime inputs. Do not edit or regenerate them as part of DataLib or DataCode work; make library changes in `../DataLib` and app integration changes in `../DataCode`.
