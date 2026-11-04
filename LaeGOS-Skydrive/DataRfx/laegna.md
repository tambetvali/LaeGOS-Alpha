# Laegna

> Human-readable overview of `laegna.json`.
>
> This document explains the ideas, structures, numbering systems, logical states, and I Ching mappings used by the Laegna ecosystem. It is not a replacement for the JSON database itself. Instead, it helps a reader understand how to read, interpret, and work with the data.

---

# What is Laegna?

Laegna is a mathematical and logical framework which combines:

- Binary and multi-valued logic
- I Ching line structures
- Signed and unsigned numbering systems
- Symbolic alphabets
- Rank-based mathematics
- Scale and octave thinking
- Physical and informational interpretations

The system appears throughout:

- LaeChing
- LaGOS Physics Laegna
- LaeGOS Alpha
- Spireason
- Laegna Base Alphabet

These projects explore relationships between:

- number
- logic
- geometry
- frequency
- hierarchy
- symbolism
- consciousness models
- physical scales

Laegna should not be viewed merely as an alternative number notation.

Instead it acts as a shared coordinate system where:

- mathematics
- logic
- symbols
- I Ching structures
- information spaces

can be represented using the same ranking principles.

---

# The Role of `laegna.json`

`laegna.json` is intended as a machine-readable root database.

It contains:

- Laegna Base Alphabet
- Logic operators
- Number systems
- Four-value logic
- Unknown states
- I Ching structures
- Trigrams
- Hexagrams
- Alternative indexing systems

The JSON is designed for software.

This document is designed for humans.

---

# Four Fundamental States

The foundation of Laegna logic is:

| Symbol | Name | Value |
|----------|----------|----------|
| I | Negotion | -2 |
| O | Negation | -1 |
| A | Position | +1 |
| E | Posetion | +2 |

These are not simply "false" and "true".

Instead they form a four-state directional system:

```text
I → O → A → E
```

which may be interpreted simultaneously as:

```text
Negotion
Negation
Position
Posetion
```

```text
Division
Subtraction
Addition
Multiplication
```

```text
÷
-
+
×
```

```text
💛
❤️
💚
💙
```

```text
🟨
🟥
🟩
🟦
```

```text
Contract
Separate
Connect
Generate
```

Each interpretation describes the same four-coordinate structure viewed from a different mathematical, logical, symbolic, geometric, or operational perspective.

The same four-state system appears throughout:

- logic
- arithmetic
- color systems
- I Ching encoding
- hexadecimal encoding
- symbolic alphabets

---

# Unknown Space

Laegna treats unknowns as first-class mathematical objects.

| Symbol | Meaning |
|----------|----------|
| U | Unknown |
| Ո | Metaunknown |
| V | Known |
| W | Well-known |
| Ὦ | Final Unknown |

Rather than forcing every problem into true or false, Laegna allows uncertainty to occupy its own coordinates.

This becomes important in larger symbolic and physical models.

---

# The Laegna Base Alphabet

The simplified alphabet appears as:

```text
ABCDEFGHћ̵ℏIJKLMNμ𝜈OPQRST𝜏́UVWՈXYZ𝓩𝓧𝓨Ὦ
```

Grouped form:

```text
ABCD EFGH ћ̵ℏ IJKL MN μ𝜈 OPQR ST 𝜏́ UVWՈ XYZ 𝓩𝓧𝓨 Ὦ
```

The grouped form (`g-symbol`) reveals conceptual families.

Unlike ordinary alphabets, many Laegna symbols function simultaneously as:

- letters
- coordinates
- logical states
- mathematical operators
- symbolic concepts

Examples:

| Symbol | Approximate Meaning |
|----------|----------|
| A | Stable cycle |
| E | Outcome |
| I | Inner unit |
| O | Local world |
| T | Theorem |
| U | Unknown |
| X | Visible reality |
| Y | Realized future |
| Z | Potential space |
| Ὦ | Final unknown |

---

# Laegna Number Systems

## Laegna Binary (Lae2)

Digits:

```text
O A
```

Equivalent:

```text
0 1
```

Lowercase digits:

```json
"scdigits": ["o","a"]
```

The binary system is the root rank.

---

## Explicit Unknowns

Unlike classical binary, Laegna contains explicit unknown states.

```json
"udigits": ["U"]
```

Thus:

```text
O A U
```

can coexist inside a representation.

Unknown is not an error.

Unknown is information.

---

## Long Unknown Digits

The field:

```json
"ludigits"
```

contains higher-order unknowns:

```text
UU
UՈ
ՈU
ՈՈ
```

These allow uncertainty itself to become structured.

---

## Laegna Quaternary (Lae4)

Digits:

```text
I O A E
```

Color form:

```text
🟨 🟥 🟩 🟦
```

Operator form:

```text
÷ - + ×
```

Heart form:

```text
💛 ❤️ 💚 💙
```

One of the central observations of Laegna is that these are not unrelated encodings.

They are different views into the same coordinate system.

---

## Laegna Octal (Lae8)

Digits:

```text
1 2 3 4 5 6 7 8
```

Lae8 is commonly associated with:

- trigrams
- three-bit structures
- octave mathematics
- rank-3 coordinates

---

## Laegna Hexadecimal (Lae44)

Digits:

```text
G F E H
C B A D
Q P O R
K J I L
```

Unlike conventional hexadecimal:

```text
0 1 2 3 4 5 6 7 8 9 A B C D E F
```

Lae44 is derived from nested four-state coordinates.

The notation reflects a:

```text
4 × 4
```

view of reality rather than a:

```text
2 × 2 × 2 × 2
```

view.

Both contain sixteen states, but organize them differently.

---

# Rank and Complexity

Throughout Laegna:

| System | Rank | Complexity |
|----------|----------|----------|
| Lae2 | 1 | 1 |
| Lae4 | 2 | 2 |
| Lae8 | 2.5 | 3 |
| Lae44 | 3 | 4 |

Rank describes informational depth.

Complexity describes dimensional structure.

This distinction becomes important when comparing symbolic systems to physical or logical systems.

---

# Z, X and Y Space

Laegna often uses:

```text
Z → X → Y
```

instead of:

```text
Small → Normal → Large
```

or:

```text
Past → Present → Future
```

Typical interpretation:

| Symbol | Meaning |
|----------|----------|
| Z | Logarithmic |
| X | Linear |
| Y | Exponential |

Thus:

```text
Potential
→
Manifestation
→
Expansion
```

---

# Relationship to I Ching

Laegna is heavily influenced by I Ching.

However, its ordering is intentionally different.

Traditional systems usually employ:

- King Wen ordering
- Fu Xi ordering

Laegna introduces a mathematically indexed ordering.

---

## Binary Reading Rule

Lines are read:

```text
bottom → top
```

Each line acts as a binary bit.

Example:

```text
☷ = 000
☰ = 111
```

This permits direct numerical encoding.

---

# Signed and Unsigned Indexes

Each hexagram contains both:

```json
"count"
```

and

```json
"number"
```

They are intentionally different.

### Count

Unsigned ordering:

```text
1 → 64
```

### Number

Signed ordering:

```text
-32 → +32
```

This introduces symmetry around a center.

---

# Why IDs Differ From I Ching

Each hexagram stores:

```json
"id"
```

and

```json
"iching_idx"
```

The first is Laegna ordering.

The second preserves classical ordering.

Thus:

```text
id ≠ iching_idx
```

by design.

Both are needed because they solve different problems.

---

# Hexagram Organization

Instead of seeing sixty-four hexagrams only as:

```text
2^6
```

Laegna organizes them conceptually as:

```text
4 × 4 × 4
```

The outer level corresponds to:

```text
÷ - + ×
```

or:

```text
I O A E
```

The next level corresponds to another four-state coordinate.

The final level resolves the remaining variation.

This produces a navigable symbolic space.

---

# Relationship to LaeChing

LaeChing primarily develops:

- trigram theory
- hexagram theory
- line transformations
- symbolic interpretation

In simplified form:

```text
LaeChing
=
symbolic layer
```

while:

```text
Laegna
=
mathematical layer
```

---

# Relationship to LaGOS Physics

LaGOS Physics explores:

- physical scales
- octave mathematics
- frequency systems
- particles
- dimensions
- physical correlatives

Laegna provides the coordinate language used by those investigations.

---

# Relationship to LaeGOS Alpha

LaeGOS Alpha represents the first software-oriented implementation.

Within that ecosystem:

`laegna.json` functions as a canonical ontology.

It centralizes:

- symbols
- logic
- numbering systems
- unknown structures
- trigram definitions
- hexagram definitions

allowing future engines, visualizers, simulations, and mathematical tooling to share a common source.

---

# Reading a Hexagram Record

Example:

```json
{
  "id": 1,
  "iching_idx": 1,
  "lae8": "88",
  "number": 32,
  "count": 64,
  "symbol": "䷀",
  "lae2": "AAA AAA",
  "lae4": "EEE",
  "lae44": "×H"
}
```

Interpretation:

- `symbol` = I Ching symbol
- `iching_idx` = traditional position
- `id` = Laegna position
- `count` = unsigned coordinate
- `number` = signed coordinate
- `lae2` = binary representation
- `lae4` = quaternary representation
- `lae44` = hexadecimal/quaternary coordinate

The same object therefore exists simultaneously in several mathematical languages.

---

# Current Status

The database should be viewed as an evolving foundation.

Relatively stable components include:

- four-state logic
- rank structure
- unknown mathematics
- Laegna alphabet
- binary-indexed I Ching ordering

More exploratory components include:

- consciousness models
- physical correspondences
- scale theories
- frequency interpretations
- symbolic ontologies

The overall goal is to make such correspondences explicit, comparable, computable, and testable.

---

# Summary

At its core, Laegna is a coordinate system built around:

```text
I O A E
```

and their extensions into:

```text
logic
mathematics
color
operator systems
symbolic alphabets
I Ching structures
unknown states
physical scales
```

`laegna.json` is the machine-readable source.

`laegna.md` is the human-readable map.
