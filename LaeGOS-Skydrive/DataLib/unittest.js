import {
  DriverNumber,
  generateCapitalNumbers,
  numberTypesFromData
} from "./number-types.js";
import { ScreenCoordinator } from "./screen-keyboard.js";

const resultsElement = document.getElementById("results");
const summaryElement = document.getElementById("summary");
let passed = 0;
let failed = 0;
let skipped = 0;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function deepEqual(actual, expected, message) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${message}; expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

function test(name, callback) {
  const item = document.createElement("li");
  try {
    callback();
    item.className = "pass";
    item.textContent = `PASS ${name}`;
    passed += 1;
  } catch (error) {
    item.className = "fail";
    item.textContent = `FAIL ${name}: ${error instanceof Error ? error.message : String(error)}`;
    failed += 1;
  }
  resultsElement.append(item);
}

function optionalTest(name, callback) {
  return callback().then((ran) => {
    const item = document.createElement("li");
    if (ran) {
      item.className = "pass";
      item.textContent = `PASS ${name}`;
      passed += 1;
    } else {
      item.className = "skip";
      item.textContent = `SKIP ${name}: optional Examples JSON is not present in this checkout`;
      skipped += 1;
    }
    resultsElement.append(item);
  }).catch((error) => {
    const item = document.createElement("li");
    item.className = "fail";
    item.textContent = `FAIL ${name}: ${error instanceof Error ? error.message : String(error)}`;
    failed += 1;
    resultsElement.append(item);
  });
}

function positionalValue(digits, base, offset) {
  return digits.reduce((value, digit) => value * BigInt(base) + BigInt(digit), 0n) + BigInt(offset);
}

async function run() {
  try {
    const response = await fetch("../DataRfx/laegna.json");
    if (!response.ok) throw new Error(`Could not load laegna.json (HTTP ${response.status}).`);
    const types = numberTypesFromData(await response.json());
    const base2 = types.find((type) => type.id === "base2");
    const base4 = types.find((type) => type.id === "base4");
    const base8 = types.find((type) => type.id === "base8");
    const base16 = types.find((type) => type.id === "base16");
    const base16d = types.find((type) => type.id === "base16d");
    const wave4 = types.find((type) => type.id === "base4-wave");
    const base16wave = types.find((type) => type.id === "base16-wave");

    test("capital-only generation round-trips base-2 values", () => {
      for (const number of generateCapitalNumbers(base2, 4)) {
        assert(number.value === positionalValue(number.digits, 2, 1), `Unexpected b2 value ${number.value}`);
        deepEqual(number.roundTrip, number.digits, "b2 digit sequence changed");
        deepEqual(number.encoded, ["B2", ...number.digits.map((digit) => base2.digits[digit])], "b2 driver encoding changed");
      }
    });

    test("capital-only generation round-trips base-4 values", () => {
      for (const number of generateCapitalNumbers(base4, 3)) {
        assert(number.value === positionalValue(number.digits, 4, 1), `Unexpected b4 value ${number.value}`);
        deepEqual(number.roundTrip, number.digits, "b4 digit sequence changed");
      }
      assert(base4.toValue([0, 1, 1, 2]) === 23n, "Base-4 IOOA must match the Examples value 23.");
      deepEqual(base4.fromValue(23n, 4), [0, 1, 1, 2], "Base-4 value 23 must retain the four-place IOOA representation.");
      assert(base4.convertWidthTo(3, base16) === 2, "Three base-4 positions should convert to two base-16 positions.");
      assert(base16.toValue(base16.fromValue(23n, base4.convertWidthTo(4, base16))) === 23n, "Base conversion must retain the same number value.");
      deepEqual(base4.encodeDigits([0, 1, 2, 3]), ["B4", "O", "O", "O", "A", "A", "O", "A", "A"], "Base-4 driver bits must use Laegna O/A digits.");
      deepEqual(base4.encodeUnknownSymbol("U"), ["B4", "V", "U"], "Base-4 U must use V for the omitted known bit.");
      deepEqual(base4.encodeUnknownSymbol("∩"), ["B4", "U", "V"], "Base-4 ∩ must reverse the unknown and known-omitted bit positions.");
    });

    test("capital-only generation round-trips base-8 values", () => {
      for (const number of generateCapitalNumbers(base8, 2)) {
        assert(number.value === positionalValue(number.digits, 8, 1), `Unexpected b8 value ${number.value}`);
        deepEqual(number.roundTrip, number.digits, "b8 digit sequence changed");
      }
    });

    test("capital-only generation round-trips base-16 values", () => {
      for (const number of generateCapitalNumbers(base16, 2)) {
        assert(number.value === positionalValue(number.digits, 16, 1), `Unexpected b16 value ${number.value}`);
        deepEqual(number.roundTrip, number.digits, "b16 digit sequence changed");
        assert(number.encoded.slice(1).every((digit) => digit === digit.toUpperCase()), "Generated a non-capital digit.");
      }
    });

    test("B16D maps A/O bits and retains unknown versus unset positions", () => {
      const known = new DriverNumber(["B16D", "A", "A", "O"]);
      const unknown = new DriverNumber(["B16D", "A", "U", "O"]);
      deepEqual(base16d.unknowns, ["V", "U"], "B16D should expose known-omitted and unknown bit keys.");
      assert(known.toBinaryString() === "110", "B16D A/A/O should encode binary 110.");
      assert(known.toBinaryValue() === 6n, "B16D 110 should have value 6.");
      assert(unknown.toBinaryString() === "1U0", "B16D must retain an unknown at its position.");
      assert(unknown.toBinaryValue() === null, "Unknown bits must not produce a known numeric value.");
      assert(new DriverNumber(["B16D", "A", "V", "O"]).toBinaryString() === "1V0", "Known omitted bits must remain distinct from unknown bits.");
      const binaryNumber = [...generateCapitalNumbers(base16d, 3)].find((number) => number.value === 6n);
      deepEqual(binaryNumber.encoded, ["B16D", "A", "A", "O"], "Generated B16D value 6 should be A/A/O.");
    });

    test("screen input preserves driven unknown and unset positions", () => {
      const binaryScreen = new ScreenCoordinator(base16d);
      binaryScreen.enterDigit(1);
      binaryScreen.enterUnknown("U");
      binaryScreen.enterDigit(0);
      deepEqual(binaryScreen.getDisplaySnapshot().driverEntry, ["B16D", "A", "U", "O"], "B16D screen entry lost its unknown bit position.");

      const base4Screen = new ScreenCoordinator(base4);
      base4Screen.enterUnknown("U");
      deepEqual(base4Screen.getDisplaySnapshot().driverEntry, ["B4", "V", "U"], "Base-4 U should leave the first bit known but omitted.");
      assert(base4Screen.getDisplaySnapshot().question === "U", "The screen should show U, not its internal driver encoding.");
      base4Screen.enterSpecial("∩");
      deepEqual(base4Screen.getDisplaySnapshot().driverEntry, ["B4", "U", "V"], "Base-4 ∩ should leave the second bit known but omitted.");
      assert(base4Screen.getDisplaySnapshot().question === "∩", "The screen should show ∩, not its internal driver encoding.");

      const emptyAfterZero = new ScreenCoordinator(base16d);
      emptyAfterZero.enterSpecial("W");
      emptyAfterZero.enterUnknown("U");
      deepEqual(emptyAfterZero.getDisplaySnapshot().driverEntry, ["B16D", "U"], "Unknown input after W should not retain W as a binary bit.");
    });

    test("base changes preserve values and scale current and answer widths", () => {
      const screen = new ScreenCoordinator(base4);
      for (const digit of [0, 1, 1, 2]) screen.enterDigit(digit);
      screen.applyOperator("+");
      for (const digit of [1, 2]) screen.enterDigit(digit);

      screen.setNumberType(base16);
      assert(screen.getCurrentValue() === 7n, "Changing base should preserve the current value.");
      assert(screen.currentDigits.length === 1, "Two base-4 positions should convert to one base-16 position.");
      assert(screen.answerWidth === 2, "Four base-4 answer positions should convert to two base-16 positions.");
      assert(screen.getDisplaySnapshot().answer === base16.format(base16.fromValue(23n, 2)), "The stored answer should retain its value and converted width.");

      screen.setNumberType(base4);
      assert(screen.getCurrentValue() === 7n, "Changing back should preserve the current value.");
      assert(screen.currentDigits.length === 2, "One base-16 position should convert back to two base-4 positions.");
      assert(screen.answerWidth === 4, "The stored answer width should convert back to four base-4 positions.");
      assert(screen.getDisplaySnapshot().answer === "IOOA", "The stored base-4 answer should retain its four-position representation.");
    });

    test("base-4 waveform inverse uses the previous decoded waveform digit", () => {
      deepEqual(wave4.fromValue(5n, 2), [1, 2], "Example value 5 should waveform-encode as OA.");
      deepEqual(wave4.fromSourceDigits([1, 0]), [1, 2], "Laegna OI should map to waveform OA.");
      deepEqual(wave4.toSourceDigits([1, 2]), [1, 0], "Waveform OA should map back to Laegna OI.");
      for (let width = 1; width <= 4; width += 1) {
        for (const number of generateCapitalNumbers(wave4, width)) {
          deepEqual(number.roundTrip, number.digits, `Waveform digits changed at width ${width}.`);
        }
      }
    });

    test("base-16 waveform applies the base-4 transform on both digit axes", () => {
      const standard = base16.fromValue(23n, 2);
      const waveform = base16wave.fromValue(23n, 2);
      assert(base16wave.toValue(waveform) === 23n, "Base-16 waveform axes must round-trip the standard value.");
      deepEqual(base16wave.toSourceDigits(waveform), standard, "Base-16 waveform inverse must retain both axes.");
      for (let width = 1; width <= 2; width += 1) {
        for (const number of generateCapitalNumbers(base16wave, width)) {
          deepEqual(number.roundTrip, number.digits, `Base-16 waveform digits changed at width ${width}.`);
        }
      }
    });

    await optionalTest("Examples/numbers.json matches generated base-4 and waveform values", async () => {
      const response = await fetch("../Examples/numbers.json");
      if (response.status === 404) return false;
      if (!response.ok) throw new Error(`Could not load numbers.json (HTTP ${response.status}).`);
      const examples = await response.json();
      for (const chapter of examples.chapters.filter((entry) => entry.base === 4)) {
        for (const row of chapter.numbers) {
          const value = typeof row.Decimal.Num === "string" && /^\d+$/.test(row.Decimal.Num)
            ? BigInt(row.Decimal.Num)
            : typeof row.Decimal.Num === "number" && Number.isInteger(row.Decimal.Num)
              ? BigInt(row.Decimal.Num)
              : null;
          if (value === null) continue;
          deepEqual(base4.format(base4.fromValue(value, chapter.R)), row.Laegna.Num, `Laegna mismatch at R=${chapter.R}, value=${value}.`);
          deepEqual(wave4.format(wave4.fromValue(value, chapter.R)), row.Wave.Num, `Waveform mismatch at R=${chapter.R}, value=${value}.`);
          if (Array.isArray(row.Laegna.Digits)) {
            deepEqual(base4.fromValue(value, chapter.R), row.Laegna.Digits, `Laegna digit indexes changed at R=${chapter.R}, value=${value}.`);
          }
          if (Array.isArray(row.Wave.Digits)) {
            deepEqual(wave4.fromValue(value, chapter.R), row.Wave.Digits, `Waveform digit indexes changed at R=${chapter.R}, value=${value}.`);
            assert(wave4.toValue(row.Wave.Digits) === value, `Waveform value mismatch at R=${chapter.R}, value=${value}.`);
          }
        }
      }
      return true;
    });

    await optionalTest("Examples/numbers.bin.json matches generated base-2 values", async () => {
      const response = await fetch("../Examples/numbers.bin.json");
      if (response.status === 404) return false;
      if (!response.ok) throw new Error(`Could not load numbers.bin.json (HTTP ${response.status}).`);
      const examples = await response.json();
      for (const chapter of examples.chapters.filter((entry) => entry.base === 2)) {
        for (const row of chapter.numbers) {
          const value = typeof row.Decimal.Num === "string" && /^\d+$/.test(row.Decimal.Num)
            ? BigInt(row.Decimal.Num)
            : typeof row.Decimal.Num === "number" && Number.isInteger(row.Decimal.Num)
              ? BigInt(row.Decimal.Num)
              : null;
          if (value === null) continue;
          deepEqual(base2.format(base2.fromValue(value)), row.Laegna.Bin, `Base-2 mismatch at value=${value}.`);
        }
      }
      return true;
    });
  } catch (error) {
    failed += 1;
    const item = document.createElement("li");
    item.className = "fail";
    item.textContent = `FAIL test initialization: ${error instanceof Error ? error.message : String(error)}`;
    resultsElement.append(item);
  }

  summaryElement.dataset.kind = failed ? "fail" : "pass";
  summaryElement.textContent = `${passed} passed · ${failed} failed · ${skipped} skipped`;
}

run();
