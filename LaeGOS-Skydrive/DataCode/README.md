# LaGOS Alpha 1 — DataCode iteration

This folder contains the static, runnable OS interface. Open `index.html` from a static web server or the deployed site; the JavaScript loader fetches `../DataRfx/laegna.json`. Browsers generally block this fetch when the page is opened directly as a `file://` URL, so serve the repository root (for example with `python -m http.server`) for local testing.

## Entry points and address behavior

- Repository root `index.html` links to this app directly and through the Skydrive landing page.
- `../index.html` is the Skydrive landing page; its “Open LaGOS OS” link opens this folder's `index.html`.
- The root page derives a path relative to its configurable `data-website-root` from `location.pathname`. Its web link starts at `https://spireason.neocities.org/LaeGOS-Alpha/`. Its configurable `data-repository-root` defaults to `https://github.com/tambetvali/LaeGOS-Alpha/`; with no relative path it links directly to the repository, and only nonempty paths append `tree/main/` plus the encoded path.
- The Skydrive page uses the repository's `LaGOS-Hypothetical-Logo.png` as its background and displayed logo. The 📟 text logo is a literal UTF-8 character.

## Current interaction and implementation choices

- The top calculator screen spans the complete app width. Below it, the shared desktop contains a left keyboard panel, centered workspace, and right focus/settings panel.
- Workspace 1, 2, and 3 have distinct wallpaper colors. The group-count selector exposes two or three tabs. All open windows remain visible when a tab changes; selecting a tab raises its whole window group, while selecting a window changes to and raises that window's group.
- Winbox windows can be dragged and resized, minimized to the desktop dock, restored from the dock, closed, and reopened from the app launcher. Closing removes only that window; minimizing preserves it.
- The initial windows show parity, divisibility by three, and other number facts. They update from the current number. The shared screen treats an empty `U` as zero.
- Keyboard layouts and operation signs are loaded from `laegna.json`, not hard-coded as digit arrays. Base-2, base-4, base-8, and base-16 use each JSON object's digit order. A digit's array index is its ordinal component; DataLib applies the Examples' one-based full-number value rule, so an entered digit at index zero represents one and `W` represents zero.
- `base44` is read from the `alt-id` on the JSON `base16` entry. It uses the same sixteen glyphs in a linear layout (not a 4×4 keypad); both the Base-16 entry and its JSON-declared Base-44 alias appear in the selector.
- The operation controls map the JSON `digits-values-sign` names to the four arithmetic operations: divide, minus, plus, and times. The default is `signs4`; `signs8` is selectable and its four additional symbols are shown as variants, not extra arithmetic operations. The two-sign `signs2` remains in the JSON but is not offered as a four-operation system.
- The screen imports number types from `../DataLib/number-types.js`; DataLib remains separate and is not copied into DataCode. The app supplies `../DataRfx/laegna.json` digit definitions to DataLib and uses the one-based ordinal encoding (`digits as base-B indices + 1`; `W` represents zero), including the reversible base-4 waveform type. `../Examples` is learning/reference material only and is not loaded by the app.
- The selector also exposes DataLib's base-4 waveform and B16D types. B16D uses O/A for binary 0/1 and retains U as unknown and · as unset in driven entries; symbolic entries are displayed with their driver array and are not arithmetic operands.
- Arithmetic uses arbitrary-precision integers. Division truncates toward zero, and division by zero is reported in the screen status. The input is capped at 256 digits per entry.
- The loader validates required JSON entries and reports fetch, schema, and calculation errors in the screen status rather than silently substituting a keyboard.

## Source notes

The interface was shaped by `Task1.md` and `Task1Special1.md` in this folder, the number-system/sign records in `../DataRfx/laegna.json`, and the read-only number references in `../Examples`. This iteration implements the initial calculator registers, DataLib-backed base selection, keyboard clear/delete, side panels, shared winbox, workspace groups, and number-inspection windows. Advanced I Ching, animation, history, scientific operations, and future number bases remain out of scope for this first working iteration.
