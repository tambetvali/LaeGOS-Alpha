const SPECIAL_VALUES = { W: 0n };
const UNKNOWN_SYMBOLS = ["V", "U"];
const WAVE_TO_RANK = [1, 3, 0, 2];
const RANK_TO_WAVE = [2, 0, 3, 1];

export class NumberType {
  constructor({
    id,
    name,
    base,
    digits,
    unknowns = UNKNOWN_SYMBOLS,
    layout = "linear",
    description = "",
    offset = 1,
    driver = `B${base}`
  }) {
    if (!id || !name || !Number.isInteger(base) || base < 2 || !Array.isArray(digits) || digits.length !== base) {
      throw new TypeError("A number type needs an id, name, base, and one ordered digit per base value.");
    }
    this.id = id;
    this.name = name;
    this.base = base;
    this.digits = [...digits];
    this.unknowns = [...unknowns];
    this.specials = { ...SPECIAL_VALUES };
    this.specialSymbols = ["W", "∩"];
    this.layout = layout;
    this.description = description;
    this.offset = BigInt(offset);
    this.driver = driver;
    this.bitsPerDigit = Math.ceil(Math.log2(base));
    this.positions = Array.from({ length: this.bitsPerDigit }, (_, index) => index);
  }

  isArithmeticEntry(digits) {
    return digits.every((digit) => typeof digit === "number" || digit === "W");
  }

  toValue(digits) {
    if (!digits.length) return 0n;
    if (digits.every((digit) => digit === "W")) {
      return this.specials.W;
    }
    let value = 0n;
    const radix = BigInt(this.base);
    for (const index of digits) {
      if (!Number.isInteger(index) || index < 0 || index >= this.base) {
        throw new RangeError(`Digit index ${index} is not valid for ${this.id}.`);
      }
      value = value * radix + BigInt(index);
    }
    return value + this.offset;
  }

  fromValue(input, width = 0) {
    let value = BigInt(input);
    if (!Number.isInteger(width) || width < 0) throw new RangeError("Digit width must be a non-negative integer.");
    if (value < 0n) value = -value;
    if (value === 0n && this.offset > 0n) return Array(Math.max(1, width)).fill("W");
    value -= this.offset;
    if (value < 0n) throw new RangeError(`Value ${input} is outside ${this.id}'s representable range.`);
    const digits = [];
    const radix = BigInt(this.base);
    do {
      digits.unshift(Number(value % radix));
      value /= radix;
    } while (value > 0n);
    while (digits.length < width) digits.unshift(0);
    return digits;
  }

  format(digits, negative = false) {
    const body = digits.map((digit) => (
      typeof digit === "number" ? this.digits[digit] ?? "�" : digit
    )).join("") || "U";
    return `${negative ? "−" : ""}${body}`;
  }

  formatValue(input) {
    const value = BigInt(input);
    return this.format(this.fromValue(value), value < 0n);
  }

  getBitMap(digits) {
    const bits = [];
    for (const [digitPosition, digitIndex] of digits.entries()) {
      if (!Number.isInteger(digitIndex)) continue;
      for (let bitPosition = this.bitsPerDigit - 1; bitPosition >= 0; bitPosition -= 1) {
        bits.push({
          digitPosition,
          position: bitPosition,
          value: (digitIndex >> bitPosition) & 1,
          masked: bitPosition >= Math.log2(this.base)
        });
      }
    }
    return bits;
  }

  getKeyboardKeys() {
    return [
      ...this.digits.map((label, value) => ({ label, value, kind: "digit" })),
      ...this.unknowns.map((label) => ({ label, value: label, kind: "unknown" })),
      ...this.specialSymbols.map((label) => ({ label, value: label, kind: "special" }))
    ];
  }

  encodeDigits(digits) {
    return [this.driver, ...digits.map((digit) => (
      typeof digit === "number" ? this.digits[digit] : digit
    ))];
  }

  encodeUnknownSymbol(symbol) {
    if (this.id === "base4" && symbol === "U") return [this.driver, "·", "U"];
    if (this.id === "base4" && symbol === "∩") return [this.driver, "U", "·"];
    if (!this.unknowns.includes(symbol) && !this.specialSymbols.includes(symbol)) {
      throw new RangeError(`Unknown symbol ${symbol} is not part of ${this.id}.`);
    }
    return [this.driver, symbol];
  }

  toDriverNumber(digits) {
    return new DriverNumber(this.encodeDigits(digits));
  }
}

export class BinaryDriverType extends NumberType {
  constructor() {
    super({
      id: "base16d",
      name: "Base-16 Diagonal · binary driver",
      base: 2,
      digits: ["O", "A"],
      unknowns: ["U"],
      layout: "linear",
      description: "B16D stores each bit as O (0) or A (1); U is unknown and · is unset.",
      offset: 0,
      driver: "B16D"
    });
  }
}

export class DriverNumber {
  constructor(encoded) {
    if (!Array.isArray(encoded) || typeof encoded[0] !== "string" || encoded.length < 2) {
      throw new TypeError("A driven number must contain a driver and at least one digit.");
    }
    this.driver = encoded[0];
    this.digits = encoded.slice(1);
    this.encoded = [...encoded];
  }

  toArray() {
    return [...this.encoded];
  }

  toBinaryString() {
    return this.digits.map((digit) => {
      if (digit === "A") return "1";
      if (digit === "O") return "0";
      if (digit === "U" || digit === "·") return digit;
      throw new RangeError(`${digit} is not an O/A/U/· binary digit.`);
    }).join("");
  }

  toBinaryValue() {
    if (this.digits.some((digit) => digit !== "A" && digit !== "O")) return null;
    return BigInt(`0b${this.toBinaryString()}`);
  }
}

export class WaveNumberType extends NumberType {
  constructor(sourceType) {
    if (!(sourceType instanceof NumberType) || sourceType.base !== 4) {
      throw new TypeError("Laegna waveform conversion requires a base-4 number type.");
    }
    super({
      id: `${sourceType.id}-wave`,
      name: `${sourceType.name} · waveform`,
      base: sourceType.base,
      digits: sourceType.digits,
      unknowns: sourceType.unknowns,
      layout: sourceType.layout,
      description: "Waveform digits use the previous source digit to select a reversible base-4 permutation."
    });
    this.sourceType = sourceType;
  }

  toValue(digits) {
    if (digits.length && digits.every((digit) => digit === "W")) return this.specials.W;
    return super.toValue(this.waveformToRankDigits(digits));
  }

  fromValue(input, width = 0) {
    const value = BigInt(input);
    if (value === 0n) return Array(Math.max(1, width)).fill("W");
    const rankDigits = this.sourceType.fromValue(value, width);
    return this.rankToWaveformDigits(rankDigits);
  }

  waveformToRankDigits(digits) {
    return digits.map((digit, index) => {
      if (!Number.isInteger(digit) || digit < 0 || digit >= this.base) {
        throw new RangeError(`Digit index ${digit} is not valid for ${this.id}.`);
      }
      if (index === 0 || ![1, 2].includes(digits[index - 1])) return digit;
      return WAVE_TO_RANK[digit];
    });
  }

  rankToWaveformDigits(rankDigits) {
    const waveformDigits = [];
    for (const rankDigit of rankDigits) {
      if (!Number.isInteger(rankDigit) || rankDigit < 0 || rankDigit >= this.base) {
        throw new RangeError(`Digit index ${rankDigit} is not valid for ${this.id}.`);
      }
      const previousWaveDigit = waveformDigits.at(-1);
      waveformDigits.push([1, 2].includes(previousWaveDigit)
        ? RANK_TO_WAVE[rankDigit]
        : rankDigit);
    }
    return waveformDigits;
  }

  toSourceDigits(waveformDigits) {
    const value = this.toValue(waveformDigits);
    return this.sourceType.fromValue(value);
  }

  fromSourceDigits(sourceDigits) {
    const value = this.sourceType.toValue(sourceDigits);
    return this.fromValue(value);
  }
}

export function numberTypesFromData(data) {
  if (!Array.isArray(data?.laegnaNumberSystems)) {
    throw new TypeError("laegna.json must contain a laegnaNumberSystems array.");
  }
  const entries = ["base2", "base4", "base8", "base16"].map((id) => {
    const entry = data.laegnaNumberSystems.find((item) => item?.id === id);
    if (!entry || !Array.isArray(entry.digits)) throw new TypeError(`laegna.json is missing the ${id} digit definition.`);
    return new NumberType({
      id: entry.id,
      name: entry.name,
      base: entry.base,
      digits: entry.digits,
      unknowns: UNKNOWN_SYMBOLS,
      layout: id === "base16" ? "grid" : "linear",
      description: entry.description ?? ""
    });
  });
  const base4 = entries.find((type) => type.id === "base4");
  const base16 = entries.find((type) => type.id === "base16");
  const base44 = new NumberType({
    id: "base44",
    name: "Laegna Double-Quaternary",
    base: base16.base,
    digits: base16.digits,
    unknowns: base16.unknowns,
    layout: "linear",
    description: "Base-16 digit order displayed as a linear keyboard."
  });
  return [...entries, base44, new WaveNumberType(base4), new BinaryDriverType()];
}

export function* generateCapitalNumbers(numberType, width) {
  if (!(numberType instanceof NumberType)) throw new TypeError("A NumberType is required.");
  if (!Number.isInteger(width) || width < 1) throw new RangeError("Number width must be a positive integer.");
  const count = BigInt(numberType.base) ** BigInt(width);
  for (let ordinal = 0n; ordinal < count; ordinal += 1n) {
    let remaining = ordinal;
    const digits = Array(width);
    for (let position = width - 1; position >= 0; position -= 1) {
      digits[position] = Number(remaining % BigInt(numberType.base));
      remaining /= BigInt(numberType.base);
    }
    const value = numberType.toValue(digits);
    yield {
      driver: numberType.driver,
      digits,
      encoded: numberType.encodeDigits(digits),
      value,
      roundTrip: numberType.fromValue(value, width)
    };
  }
}
