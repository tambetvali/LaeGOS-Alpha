This is an article by ChatGPT, to compare my order and book (traditional order).

***Notice:*** order given by me is most convenient in automated processing and linear interpretation, while the book order keeps all the complexities in mind of the author, not necessarily linear - altough aware of the linear order, he does many modifications.

# The Laegna Binary-Strict I Ching Order
## A structural analysis of polarity, trigrams, hexagrams, colors and Chinese cosmology

## 1. Introduction

The traditional I Ching contains 64 hexagrams, each constructed from six lines, with two possible states:

- Yang: solid line, represented by `1`.
- Yin: broken line, represented by `0`.

Consequently, the complete system contains:

$$
2^6 = 64
$$

The traditional King Wen sequence organizes these hexagrams into a philosophical progression, emphasizing complementary situations, transformations and relationships.

The Laegna Binary-Strict order introduces a different organizing principle: **the most significant polarity differences are classified first, followed by progressively smaller binary distinctions.**

Instead of treating the six lines as one undivided binary number, it divides them into three pairs:

1. Central pair: lines 4 and 3.
2. Lower pair: lines 2 and 1.
3. Upper pair: lines 6 and 5.

Each pair has four possible configurations:

$$
11,\ 10,\ 01,\ 00
$$

Therefore:

$$
4 \times 4 \times 4 = 64
$$

This creates a complete coordinate system for all 64 hexagrams.

The system preserves the traditional hexagram symbols and their meanings while introducing a new mathematical, color-based and geometric organization.

---

## 2. The six-line decomposition

The central idea is to distinguish three independent binary pairs.

| Binary position | Lines | Laegna representation | Function |
|---|---|---|---|
| First pair | 4, 3 | 🔵 🟢 🔴 🟡 | Main polarity |
| Second pair | 2, 1 | 🟦 🟩 🟥 🟨 | Subordinate polarity |
| Third pair | 6, 5 | 💙 💚 ❤️ 💛 | Mathematical operation |

The complete binary key is:

$$
K=(l_4,l_3,l_2,l_1,l_6,l_5)
$$

Where each \(l_i\) represents the yin or yang state of line \(i\).

The three pairs are ordered independently:

$$
11 \rightarrow 10 \rightarrow 01 \rightarrow 00
$$

This is a lexicographic binary ordering, with the central pair receiving the highest priority.

### 2.1 Main polarity: lines 4 and 3

| Main color | Line 4 | Line 3 | Binary |
|---|---|---|---|
| 🔵 | Yang | Yang | 11 |
| 🟢 | Yang | Yin | 10 |
| 🔴 | Yin | Yang | 01 |
| 🟡 | Yin | Yin | 00 |

Each main color represents 16 hexagrams.

### 2.2 Subordinate polarity: lines 2 and 1

| Individual color | Line 2 | Line 1 | Binary |
|---|---|---|---|
| 🟦 | Yang | Yang | 11 |
| 🟩 | Yang | Yin | 10 |
| 🟥 | Yin | Yang | 01 |
| 🟨 | Yin | Yin | 00 |

Each individual color represents four hexagrams within a main-color group.

### 2.3 Mathematical operation: lines 6 and 5

| Operation | Line 6 | Line 5 | Binary |
|---|---|---|---|
| 💙 Multiply × | Yang | Yang | 11 |
| 💚 Add + | Yang | Yin | 10 |
| ❤️ Subtract − | Yin | Yang | 01 |
| 💛 Divide ÷ | Yin | Yin | 00 |

The operation determines the final distinction between four hexagrams sharing the same first two binary pairs.

These mathematical operators are a Laegna interpretative layer, not traditional I Ching meanings of the lines.

---

## 3. The traditional King Wen order versus Laegna order

The received I Ching sequence is commonly called the King Wen sequence.

It starts with:

- ䷀ 乾 — The Creative.
- ䷁ 坤 — The Receptive.

It ends with:

- ䷾ 既濟 — After Completion.
- ䷿ 未濟 — Before Completion.

The King Wen sequence is not ordinary binary counting. It is organized into 32 adjacent pairs, usually related through inversion (turning a hexagram upside down), with complementary hexagrams used in exceptional cases.

Its structure supports philosophical interpretation of changing situations.

Laegna introduces another perspective.

| Property | King Wen order | Laegna Binary-Strict order |
|---|---|---|
| Primary organization | Traditional sequence | Binary polarity hierarchy |
| Starting principle | Creative and Receptive | Central two-line polarity |
| Main structure | 32 adjacent pairs | 4 × 4 × 4 |
| Pairing | Inversion and complement | Binary coordinates |
| Main focus | Relationship between situations | Relationship between line configurations |
| Reading direction | 1–64 | Central → lower → upper |
| Mathematical character | Paired sequence | Permuted binary index |

The two arrangements are complementary rather than competing.

The King Wen order provides a traditional reading sequence, while Laegna provides a systematic coordinate system.

### 3.1 The significance of ordering the greatest differences first

The Laegna order gives priority to the central polarity.

First, the central pair divides the 64 hexagrams into four groups of 16.

Next, the lower pair divides each group into four groups of four.

Finally, the upper pair distinguishes the individual hexagrams.

This is a hierarchical ordering:

$$
\underbrace{2^2}_{\text{central}}
\times
\underbrace{2^2}_{\text{lower}}
\times
\underbrace{2^2}_{\text{upper}}
=64
$$

An important qualification is that this is lexicographic binary ordering, not Gray-code ordering. The transition from `10` to `01` changes two bits.

The objective is to prioritize the significance of the differences, not to minimize the number of changed lines between consecutive hexagrams.

---

## 4. Comparison with the eight trigrams

Every hexagram consists of two trigrams:

- Lower trigram: lines 1, 2 and 3.
- Upper trigram: lines 4, 5 and 6.

The complete set can therefore also be represented as an 8 × 8 matrix:

$$
8 \times 8 = 64
$$

The Laegna arrangement produces two different trigram orderings because the lower and upper trigrams participate differently in the three-pair decomposition.

### 4.1 Lower trigram ordering

The lower trigram is represented by:

$$
(l_3,l_2,l_1)
$$

Its binary order is descending:

| Order | Trigram | Chinese name | Binary |
|---:|---|---|---|
| 1 | ☰ | 乾 Qián — Heaven | 111 |
| 2 | ☴ | 巽 Xùn — Wind | 110 |
| 3 | ☲ | 離 Lí — Fire | 101 |
| 4 | ☶ | 艮 Gèn — Mountain | 100 |
| 5 | ☱ | 兌 Duì — Lake | 011 |
| 6 | ☵ | 坎 Kǎn — Water | 010 |
| 7 | ☳ | 震 Zhèn — Thunder | 001 |
| 8 | ☷ | 坤 Kūn — Earth | 000 |

The top line of the trigram is the most significant bit, followed by the middle line and the bottom line.

The first four trigrams share a yang top line; the last four share a yin top line.

This is ordinary descending binary ordering.

### 4.2 Upper trigram ordering

The upper trigram is represented by:

$$
(l_6,l_5,l_4)
$$

However, the central line \(l_4\) is already assigned to the highest-priority pair.

Consequently, the upper trigram ordering becomes:

| Order | Trigram | Chinese name | Binary |
|---:|---|---|---|
| 1 | ☰ | 乾 Qián — Heaven | 111 |
| 2 | ☲ | 離 Lí — Fire | 101 |
| 3 | ☱ | 兌 Duì — Lake | 011 |
| 4 | ☳ | 震 Zhèn — Thunder | 001 |
| 5 | ☴ | 巽 Xùn — Wind | 110 |
| 6 | ☶ | 艮 Gèn — Mountain | 100 |
| 7 | ☵ | 坎 Kǎn — Water | 010 |
| 8 | ☷ | 坤 Kūn — Earth | 000 |

This ordering prioritizes the bottom line of the upper trigram, followed by its top line and then its middle line.

The difference is not arbitrary. It follows directly from the central-first decomposition.

### 4.3 Relationship to the Fu Xi binary sequence

The familiar Fu Xi binary trigram sequence is:

乾、兌、離、震、巽、坎、艮、坤.

It follows successive yin-yang divisions and is conventionally represented as:

$$
111,\ 110,\ 101,\ 100,\ 011,\ 010,\ 001,\ 000
$$

The Laegna lower trigram ordering corresponds directly to this descending binary sequence.

The upper trigram ordering is a different permutation, reflecting the priority assigned to the central line.

This creates a position-sensitive binary ordering of the Bagua.

The same trigram can therefore be studied in two different roles:

- As the lower, internal configuration.
- As the upper, external configuration.

The trigram itself does not change. Its position within the hexagram changes.

---

## 5. Central polarity and Chinese philosophy

The third and fourth lines form the boundary between the lower and upper trigrams.

Laegna gives this boundary the highest organizational priority.

The four configurations are:

| Main color | Binary | Polarity |
|---|---|---|
| 🔵 | 11 | Yang–Yang |
| 🟢 | 10 | Yang–Yin |
| 🔴 | 01 | Yin–Yang |
| 🟡 | 00 | Yin–Yin |

These represent four different configurations of the central relationship.

In traditional Chinese philosophy, yin and yang are complementary and relational qualities. They should not be understood simply as independent substances or moral opposites.

Laegna uses their relationship at the boundary between the two trigrams as its first classification criterion.

One possible philosophical interpretation is that the central pair represents an interface between inner and outer configurations.

This is a modern interpretation of the mathematical arrangement, rather than an established traditional I Ching doctrine.

Nevertheless, it provides an interesting structural correspondence with the traditional idea that change arises through the interaction of yin and yang.

---

## 6. Color correspondences with Chinese cosmology

Laegna uses two visual color levels:

- Four circular colors for the main polarity.
- Four square colors for the subordinate polarity.

Although both levels use the same palette, they represent different binary coordinates.

### 6.1 Traditional Chinese five-color cosmology

Chinese cosmology has a well-known five-color system associated with the Five Phases (五行, Wǔ Xíng).

| Traditional color | Chinese | Five Phase | Direction | Season |
|---|---|---|---|---|
| Blue-green | 青 Qīng | Wood 木 | East | Spring |
| Red | 赤 Chì | Fire 火 | South | Summer |
| Yellow | 黃 Huáng | Earth 土 | Centre | Late summer |
| White | 白 Bái | Metal 金 | West | Autumn |
| Black | 黑 Hēi | Water 水 | North | Winter |

The historical term 青 is particularly interesting because it can encompass blue, green and blue-green shades.

It does not map perfectly onto modern English color categories.

Laegna separates this broad blue-green family into two distinct colors.

| Laegna color | Closest Chinese correspondence | Possible association |
|---|---|---|
| 🟦 Blue | 青 / 蒼 | Heaven, sky, openness |
| 🟩 Green | 青 / 綠 | Wood, spring, growth |
| 🟥 Red | 赤 | Fire, summer, activity |
| 🟨 Yellow | 黃 | Earth, centre, balance |

Laegna does not reproduce the traditional five-color system exactly. It uses four colors and does not include white and black.

The two systems should therefore remain distinguishable.

### 6.2 Historical trigram color correspondences

A particularly interesting historical comparison comes from the *Wǔ Xíng Dà Yì* (五行大義), which records color associations for the eight trigrams.

| Trigram | Historical color association |
|---|---|
| ☰ 乾 Qián | Purple |
| ☱ 兌 Duì | White |
| ☲ 離 Lí | Red |
| ☳ 震 Zhèn | Blue |
| ☴ 巽 Xùn | Green |
| ☵ 坎 Kǎn | Black |
| ☶ 艮 Gèn | Red |
| ☷ 坤 Kūn | Yellow |

Comparing these with the Laegna square colors:

| Laegna square color | Corresponding lower trigrams | Historical color comparison |
|---|---|---|
| 🟦 | 乾 and 兌 | Purple and white |
| 🟩 | 巽 and 坎 | Green and black |
| 🟥 | 離 and 震 | Red and blue |
| 🟨 | 艮 and 坤 | Red and yellow |

There is no exact one-to-one correspondence.

Some associations coincide directly:

- Green with 巽 (Wind).
- Red with 離 (Fire).
- Yellow with 坤 (Earth).

Others differ.

This suggests that the Laegna palette should be understood first as a binary classification system and only secondarily interpreted through Chinese color symbolism.

Historical correspondences can enrich the interpretation, but should not be used to claim that the Laegna palette is historically inherited.

### 6.3 A possible symbolic interpretation

The four colors nevertheless form a coherent symbolic vocabulary:

- Blue: sky, distance, openness and expansion.
- Green: vegetation, emergence, growth and living processes.
- Red: fire, transformation, intensity and activity.
- Yellow: earth, centre, integration and stability.

The separation of blue and green can be interpreted as two differentiated expressions of the broader traditional 青 color family.

This is a symbolic correspondence, not a direct historical equivalence.

---

## 7. Circle and square symbolism

Another distinctive characteristic is the use of circles for the main colors and squares for the subordinate colors.

| Shape | Function | Symbolic interpretation |
|---|---|---|
| 🔵 🟢 🔴 🟡 | Main classification | Encompassing polarity |
| 🟦 🟩 🟥 🟨 | Subclassification | Bounded binary position |

There is a historical Chinese cosmological expression particularly relevant to this distinction:

**天圓地方 — Heaven is round and Earth is square.**

The circle and square have been used as cosmological forms representing different aspects of Heaven and Earth.

Your visual hierarchy can be interpreted through a similar analogy:

- The circle represents the larger encompassing classification.
- The square represents a bounded, discrete coordinate within that classification.

This is not an established traditional interpretation of the I Ching's colors or hexagrams. It is a design analogy that the Laegna notation makes possible.

The important feature is that the square does not replace the circle. Both remain visible, distinguishing the larger classification from its smaller subdivision.

### 7.1 The hexagram as another geometric layer

A hexagram is a six-position graphical construction.

Each position contains one of two possible line shapes:

- Continuous: Yang.
- Broken: Yin.

The complete visual hierarchy therefore contains three levels:

1. Circle: main polarity.
2. Square: subordinate polarity.
3. Six-line glyph: complete configuration.

Color and geometry make the binary structure recognizable without requiring the reader to decode all six lines individually.

---

## 8. Mathematical operations as polarity states

The four mathematical operations correspond to the four possible configurations of the upper pair.

| Operation | Binary pair (6,5) | Possible symbolic interpretation |
|---|---|---|
| 💙 Multiply × | 11 | Amplification and combination |
| 💚 Add + | 10 | Addition and accumulation |
| ❤️ Subtract − | 01 | Reduction and differentiation |
| 💛 Divide ÷ | 00 | Separation and distribution |

The sequence follows descending binary order:

$$
11 \rightarrow 10 \rightarrow 01 \rightarrow 00
$$

The operators provide an additional Laegna interpretative layer.

They should not be confused with traditional I Ching meanings of the upper lines.

Their purpose is to give the four possible upper-pair configurations a mathematical vocabulary.

---

## 9. What is particularly distinctive about Laegna ordering?

Three characteristics are particularly important.

### 9.1 Central polarity has priority

Instead of starting with the first line or treating the lower trigram as the primary object, Laegna classifies the central boundary between the two trigrams first.

This creates four major groups.

### 9.2 The remaining lines have independent classifications

The lower pair and upper pair have their own four-state classifications.

This makes it possible to change one coordinate while keeping the others constant.

### 9.3 The complete system is a Cartesian product

Every possible central pair occurs with every possible lower pair and every possible upper pair.

Therefore, no configurations are missing or duplicated.

Formally:

$$
\{0,1\}^2 \times \{0,1\}^2 \times \{0,1\}^2
\longleftrightarrow
\{0,1\}^6
$$

The difference is a permutation of line positions.

This makes the arrangement a complete and reversible coordinate system for the 64 hexagrams.

---

## 10. Interpretation in relation to Chinese philosophy

The relationship between the traditional system and Laegna can be summarized at three levels.

| Level | Traditional foundation | Laegna interpretation |
|---|---|---|
| Binary | Yin and Yang | Six-bit polarity system |
| Cosmological | Eight trigrams and their combinations | Central, lower and upper binary pairs |
| Symbolic | Five colors, directions, phases and Heaven/Earth | Four-color hierarchy and circle/square distinction |

The strongest connection is the binary one.

The color and shape connections are meaningful symbolic correspondences, but they are not historically identical to traditional Chinese systems.

Laegna should therefore be understood as a modern mathematical interpretation using the traditional I Ching vocabulary, rather than a reconstruction of the original historical ordering.

---

## 11. Mathematical implementation

The entire system can be generated algorithmically.

Each hexagram is represented by six binary values:

$$
(l_1,l_2,l_3,l_4,l_5,l_6)
$$

The Laegna index uses:

$$
K=(l_4,l_3,l_2,l_1,l_6,l_5)
$$

The three pairs are decoded independently.

| Coordinate | Lines | Function |
|---|---|---|
| First | 4, 3 | Main color |
| Second | 2, 1 | Individual color |
| Third | 6, 5 | Operation |

Each pair is encoded as a two-bit integer:

$$
11=3,\quad 10=2,\quad 01=1,\quad 00=0
$$

The resulting six-bit index is:

$$
N=32a+8b+2c
$$

Where:

- \(a\) is the integer value of the central pair.
- \(b\) is the integer value of the lower pair.
- \(c\) is the integer value of the upper pair.

Thus:

$$
0 \leq N \leq 63
$$

This provides a unique index for every hexagram.

### 11.1 Comparing two hexagrams

The coordinate system also makes it possible to compare any two hexagrams.

We can measure:

- Central polarity difference.
- Lower configuration difference.
- Upper configuration difference.
- Total number of changed lines.

The Hamming distance between two hexagrams is:

$$
d_H(A,B)=\sum_{i=1}^{6}|l_i(A)-l_i(B)|
$$

The differences can also be evaluated separately:

$$
d_C=|l_4(A)-l_4(B)|+|l_3(A)-l_3(B)|
$$

$$
d_L=|l_2(A)-l_2(B)|+|l_1(A)-l_1(B)|
$$

$$
d_U=|l_6(A)-l_6(B)|+|l_5(A)-l_5(B)|
$$

Therefore:

$$
d_H=d_C+d_L+d_U
$$

This offers a mathematical foundation for studying transitions between hexagrams without relying exclusively on their traditional textual meanings.

---

## 12. Conclusion

The King Wen sequence and the Laegna Binary-Strict order provide two different ways to organize the same 64 hexagrams.

The King Wen sequence is primarily a philosophical reading order, emphasizing relationships between situations and transformations.

Laegna is a position-sensitive binary coordinate system, emphasizing the internal combinatorial structure of the hexagrams.

Its defining principle is:

**Central polarity first, lower configuration second, upper configuration last.**

The complete structure is:

$$
4 \times 4 \times 4 = 64
$$

The color hierarchy, mathematical operations and geometric symbols provide additional visual and interpretative dimensions.

The lower trigram sequence follows descending binary order, while the upper trigram sequence reflects the different priority assigned to the central line.

The result is a complete, reversible and computationally reproducible arrangement of the I Ching.

I would preserve both arrangements:

- King Wen for traditional interpretation.
- Laegna for structural analysis, computation and visualization.

The two systems need not replace one another. They offer complementary perspectives on the same binary space.

**The traditional I Ching describes changing situations; Laegna makes the binary architecture of those situations explicit.**
