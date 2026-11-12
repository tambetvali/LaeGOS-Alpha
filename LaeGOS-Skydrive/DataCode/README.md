# LaGOS Alpha 1 — DataCode iteration

This folder contains the static LaGOS interface. Open `index.html` from a static web server; the app fetches `../DataRfx/laegna.json`. Browsers generally block that request when the page is opened directly as a `file://` URL.

## Entry points and address behavior

- The repository root links to this app directly and through the Skydrive landing page.
- `../index.html` is the Skydrive landing page and links to both DataCode and the DataLib development sandbox.
- The root page derives a path relative to its configurable `data-website-root` from `location.pathname`. Its web link starts at `https://spireason.neocities.org/LaeGOS-Alpha/`; the configurable repository root defaults to `https://github.com/tambetvali/LaeGOS-Alpha/`.
- The Skydrive page uses the repository's `LaGOS-Hypothetical-Logo.png` as its background and displayed logo. The 📟 text logo is a literal UTF-8 character.

## Desktop and window behavior

- The top calculator screen spans the complete app width. Below it, the desktop contains the number keyboard, a center area with app tabs and content blocks, and a focus/settings panel.
- The three implemented apps are fixed: **Parity**, **Divisibility**, and **Number facts**. Their named tabs select and open/raise that app; there is no user-selectable app count or workspace grouping.
- All three app blocks are visible in the desktop content at startup. Clicking a block or selecting its tab opens the block as a movable window inside the desktop. Closing a window returns its block to the page content; minimizing/restoring uses the desktop dock.
- Windows can be dragged, resized, minimized, restored, closed, and reopened. Other app blocks remain available while a block is open as a window.

## Number representation

- Keyboard glyphs and operation signs come from `../DataRfx/laegna.json`; `DataCode` imports the number types from `../DataLib/number-types.js`.
- The app uses the example files as the conversion reference. For a fixed-width base-B sequence, the value is its ordered digit indices interpreted in base B, plus one. Thus base-4 `IOOA` (indices `[0, 1, 1, 2]`, width four) is value 23 in `Examples/numbers.json`; it is not Latin decimal digit input. `W` denotes zero, while an empty screen displays `U` and evaluates to zero.
- A selected base conversion preserves bit capacity: for example, three base-4 positions become two base-16 positions. Number text shown to users is the selected Laegna glyph sequence; the internal driver format is not shown as a substitute for the number.
- Internal bit-driver entries begin with the system class (`B4`, for example), followed by Laegna binary symbols `O`/`A`. `V` marks a known omitted bit position and `U` marks an unknown bit. The unknown/special keypad is separate from the digit keys and uses a 2×2 layout for V, U, W, and ∩.
- Standard base-4 and base-16 systems and their waveform alternatives are separate types. Base-4 waveform conversion follows `Examples/decoder.py`'s `WaveweaverValueBase4` permutation. Base-16 waveform conversion applies that permutation independently to both axes of a base-16 digit. Base-2 waveform conversion is not implemented.
- Arithmetic uses arbitrary-precision integer values from the Laegna conversion. Division truncates toward zero, and division by zero is reported in the screen status. The input is capped at 256 positions per entry.
- The loader validates required JSON entries and reports fetch, schema, and calculation errors in the screen status rather than silently substituting a keyboard.

## Source notes

The interface is informed by `Task1.md` and `Task1Special1.md`, the number-system/sign records in `../DataRfx/laegna.json`, and the read-only number references and generator in `../Examples`. Do not reinterpret O/A as Latin 0/1 glyphs in visible number strings or treat the internal driver sequence as user-facing content.
