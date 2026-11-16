# How Laegna 2nd rank number enters to Melodic Realm of Laegna

Take these numbers:
- U - octave 0
- I, O, A, E - octave 1
- II, OO, AA, EE - octave 2
- IIII, OOOO, AAAA, EEEE - octave 3

Do simple operations, while using very basic Laegna system which won't have 1, but does not necessarily follow other Laegna rules because I want you to understand this (in Laegna rules, the application has U - horizontal - and V - vertical digit space):
```
U + U = U

I, O,  A, E + I, O,   A, E =
I+I=O, O+O=E, A+A=EO, E+E=IE

I, O,  A, E × I, O,   A, E =
I×I=I, O×O=E, A×A=OI, E×E=EE
```

What is R?

We can see R of EE is 2.

R of E is 1.

Full-number R of II is also 2, and of I is also 1, but:
- In laegna, precision digits as in basin-1 / rank 2 number system, go *below* the number unless it's negative; as a general rule they are *inside* the counted number block.

R of I is 0 + 1 / 4 = 0.25 = i, where 0 came from 1-1 to find the base value for precision.

R of II is 1 + 1 / 16 = Oii, where O is 2 and ee is smallest number of precision digits in 1 / 16th.

Count 4/4 system:

Laegna counts in I, O, A, E.

---

### 1. The Master Octave Chart (Anchored at 110 Hz = Rank 1)

| Musical Note (Scientific) | Frequency (Hz) | Rank (Ratio ÷ 110) | Octave Number (Log₂ Rank) | MIDI Note Number | Organ Pipe Footage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **A5** | 880.00 Hz | **8** (2³) | **+3** | 81 | 2' (Two-foot) |
| **A4** (Concert Pitch) | 440.00 Hz | **4** (2²) | **+2** | 69 | 4' (Four-foot) |
| **A3** | 220.00 Hz | **2** (2¹) | **+1** | 57 | 8' (Eight-foot) |
| **D♯3 / E♭3** *(Midpoint)* | **155.56 Hz** | **√2 (≈ 1.414)** | **+0.5** (2⁰·⁵) | **51** | *Tritone above 16'* |
| **A2** *(Base Unit)* | 110.00 Hz | **1** (2⁰) | **0** | 45 | 16' (Sixteen-foot) |
| **A1** | 55.00 Hz | **0.5** (2⁻¹) | **-1** | 33 | 32' (Thirty-two-foot) |
| **A0** (Lowest Piano Key) | 27.50 Hz | **0.25** (2⁻²) | **-2** | 21 | 64' (Sixty-four-foot) |

---

Now we can count 5 primary octaves in Laegna:
```
A0
- Octave I
A1
- Octave O
A2
- Octave U
A3
- Octave A
A4
- Octave E
A5
- Octave V connects A5 to A0

If - and + are used: 10 audible octaves can be contained.

If small and big caps are used, 10 audible octaves appear.

Other sequences can be used - IOXAE, with ioxae as second 5; IOAEY etc.
```

### The 10 Audible Octaves (A-Anchored)

| Octave Span | Note Name | Frequency (Hz) | Rank (÷ 110 Hz) | Octave Number (Log₂ Rank) | Audible & Musical Context |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1st Audible** | **A0** *(to A1)* | 27.5 Hz | **0.25** (2⁻²) | **-2** | Lowest piano key (just above 20 Hz limit) |
| **2nd Audible** | **A1** *(to A2)* | 55.0 Hz | **0.5** (2⁻¹) | **-1** | Low bass guitar & double bass range |
| **3rd Audible** | **A2** *(to A3)* | 110.0 Hz | **1** (2⁰) | **0** | Open A-string on a guitar / Male baritone |
| **4th Audible** | **A3** *(to A4)* | 220.0 Hz | **2** (2¹) | **+1** | Middle register / Cello & viola range |
| **5th Audible** | **A4** *(to A5)* | 440.0 Hz | **4** (2²) | **+2** | Standard concert tuning pitch |
| **6th Audible** | **A5** *(to A6)* | 880.0 Hz | **8** (2³) | **+3** | High soprano & flute register |
| **7th Audible** | **A6** *(to A7)* | 1,760.0 Hz | **16** (2⁴) | **+4** | Piccolo & upper violin harmonics |
| **8th Audible** | **A7** *(to A8)* | 3,520.0 Hz | **32** (2⁵) | **+5** | Near the top of a piano (C8 is 4,186 Hz) |
| **9th Audible** | **A8** *(to A9)* | 7,040.0 Hz | **64** (2⁶) | **+6** | Cymbal shimmer, sibilance, & high overtones |
| **10th Audible** | **A9** *(to 20 kHz)* | 14,080.0 Hz | **128** (2⁷) | **+7** | Ultra-high air/brightness; clips at **20,000 Hz** |

You find square root in the middle.
- Square root is U and in Laegna, U is what has 4 tones inside, and goes to balanced reality.

Let's now look at these numbers:

| Frequency (Hz) | Rank (÷ 110 Hz) | Rank (Base-2)    | Lae-4 and Lae-AE                     | LaeRank of lae / dec4 | Audible & Musical Context                         |
| :------------- | :-------------- | :--------------- | :----------------------------------- | :-------------------- | :------------------------------------------------ |
| 27.5 Hz        | **0.25** (2⁻²)  | **-2**           | **a**                                | ***Z***, Rank -1      | Lowest piano key (just above 20 Hz limit)         |
| 55.0 Hz        | **0.5** (2⁻¹)   | **-1**           | **e**                                | ***Z***, Rank -1/0    | Low bass guitar & double bass range               |
| 110.0 Hz       | **1** (2⁰)      | **0**            | **I**, *A*                           | ***X***, Rank 1       | Open A-string on a guitar / Male baritone         |
| 220.0 Hz       | **2** (2¹)      | **+1**           | **O**, *E*                           | ***X***, Rank 1       | Middle register / Cello & viola range             |
| 440.0 Hz       | **4** (2²)      | **+2**           | **A**, *AA*                          | ***X***, Rank 1       | Standard concert tuning pitch                     |
| 880.0 Hz       | **8** (2³)      | **+3**           | **E**, *AE* or ***EE**               | ***X***, Rank 1       | High soprano & flute register                     |
| 1,760.0 Hz     | **16** (2⁴)     | **+4**           | **II**, ***II*** = I², *EA*, *AAA*   | ***Y***, Rank 1/2     | Piccolo & upper violin harmonics                  |
| 3,520.0 Hz     | **32** (2⁵)     | **+5**           | **IO**, ***OO*** = O², *EE*, *EEE*   | ***Y***, Rank 2       | Near the top of a piano (C8 is 4,186 Hz)          |
| 7,040.0 Hz     | **64** (2⁶)     | **+6**           | **IA**, ***AA*** = V², *AEE*, *AAAA* | ***Y***, Rank 2       | Cymbal shimmer, sibilance, & high overtones       |
| 14,080.0 Hz    | **128** (2⁷)    | **+7**           | **IE**, ***EE*** = E², *EAA*, *EEEE* | ***Y***, Rank 2       | Ultra-high air/brightness; clips at **20,000 Hz** |

Rank 1 / 2 means:
- In laegna numbers, E is 1 digits and it's the last note of the octave.
- In decimal writing, base-4 would already give it as 10 and thus, it's the first of next octave.
- This is Laegna difference of basin 0 and 1 - the fractally equal point goes to previous in basin 1, which has higher limit known; next unit in basin 0, which has lower limit known.

From this table we can see that we can use whole numbers to go through all the table of octaves. We can always use digits to show the note inside in the same number, i.e. in octave +4 based on 16 or EE, octave O or E in base-4 or base-AE - octave O with note 3 is OA, altough we only have 4 notes for now.

We can see near zero (Z) we have only two ranks:
- Notice the sqrt of two is not full number, and thus we better establish focus or zoom of four, because positive numbers slow down at +1.

We can see this is mechanically and numerically linear zone:
- If zero is at third position, we can see that natural mapping of this is diagonal hex system, which can contain modifiers 1=1i, 2=2o, 4=3a, 8=4e, 15=5I, 32=6O, 64=7A, 128=8E. This conversion is common.
- We can see number one is in two steps, so zero turns in two steps, and base-hex-diag renders it into matrix power, which means we have doubled curvature. Curvatures of base-8 (1 to 8 in list of previous point) and base-4 (1 to 4) are fine.
- In both cases, the -1 and -2 are in either double or four-precision, but *inside system where square root of 2 is linear*.
  - Tables below show where and what is linear.

This basin does not limit your Laegna number system use, but shows constraints.

---

Pauses and lengths of notes:

Notice the f

| Pause length   | Comparison | Rank (÷ 110 Hz) | Rank (Base-2)    | Lae-4 and Lae-AE                     | LaeRank of lae / dec4 | Audible & Musical Context                         |
| :------------- | :--------- | :-------------- | :--------------- | :----------------------------------- | :-------------------- | :------------------------------------------------ |
| 1 / 16 * 4     | 1 // 1     | **0.25** (2⁻²)  | **-2**           | **a**                                | ***Z***, Rank -1      | Lowest piano key (just above 20 Hz limit)         |
| 1 / 16 * 8     | 1 // 3     | **0.5** (2⁻¹)   | **-1**           | **e**                                | ***Z***, Rank -1/0    | Low bass guitar & double bass range               |
| 1 / 4 * 1      | 1 / 4      | **1** (2⁰)      | **0**            | **I**, *A*                           | ***X***, Rank 1       | Open A-string on a guitar / Male baritone         |
| 1 / 4 * 2      | 2 / 4      | **2** (2¹)      | **+1**           | **O**, *E*                           | ***X***, Rank 1       | Middle register / Cello & viola range             |
| 1 / 4 * 3      | 3 / 4      | **4** (2²)      | **+2**           | **A**, *AA*                          | ***X***, Rank 1       | Standard concert tuning pitch                     |
| 1 / 4 * 4      | 4 / 4      | **8** (2³)      | **+3**           | **E**, *AE* or ***EE**               | ***X***, Rank 1       | High soprano & flute register                     |
| 2 * 4          | 1 \ 1      | **16** (2⁴)     | **+4**           | **II**, ***II*** = I², *EA*, *AAA*   | ***Y***, Rank 1/2     | Piccolo & upper violin harmonics                  |
| 4 * 4          | 1 \ 2      | **32** (2⁵)     | **+5**           | **IO**, ***OO*** = O², *EE*, *EEE*   | ***Y***, Rank 2       | Near the top of a piano (C8 is 4,186 Hz)          |
| 6 * 4          | 1 \ 3      | **64** (2⁶)     | **+6**           | **IA**, ***AA*** = V², *AEE*, *AAAA* | ***Y***, Rank 2       | Cymbal shimmer, sibilance, & high overtones       |
| 8 * 4          | 1 \ 4      |**128** (2⁷)     | **+7**           | **IE**, ***EE*** = E², *EAA*, *EEEE* | ***Y***, Rank 2       | Ultra-high air/brightness; clips at **20,000 Hz** |

Notice, in Julia programming language one has two division signs;
- While there, it only changes order of operations.
- It's there only for physicians and mathematicians enjoy the syntactic sugar to their *meaning* 

For sqrt(2) and sqrt(sqrt(2)) - 1 // 1 and 1 // 3 are just to mark something about this *base-2* modifier:
- The system projects actually to base-2.
- 1 / 4 to 4 / 4 projects to base-4.
- 2 * 4 to 4 * 4 *contains* the lower systems and projects to base-16.
- The base-2 system needs 4 or 8 precision digits to project perfectly.

The numeric notation, 4g:

```
Z:  OO
X: AAAA
Y: EEEE
```

This is precision of Z, X, Y:
- If Z is 2 vs. X is 4 and Y is 4, it takes precisions:

```
Z: OOoo
X: AAAA
Y: EEEE
```

Now with two precision digits, one octave, O, A and E map in 4:8 relation, while initially in 2:8;
- 2:8 relation if it projects 0.5, 1.0, 1.5, 2.0, 5.0, 6.0, 7.0, 8.0 as base-8 of X and Y;
  - The zero-rotation between X and Y is that 4 is missing, but this relational spacing in hologram makes it really symmetric to project the lower, base-2 system, to actual 8 power.

---

Operators again:

Plus adds logarithmic amount of digits:

```
AAAA + AAAA = AAAA x

1 digit added.
```

```
AAAA * AAAA = AAAA xxxx

2 digits added.
```

Minus and exponent work the same in reverse, if you read from higher to lower digit or rank and project properly:
```
AAAA EEEE

AAAA are the internal space, linear. $H_int$ or lower trigram of I Ching projected into it's rank of R (spatial 3).

EEEE are the external space, exponent-linearized. $H_ext$ or higher trigram of I Ching projected into it's rank of R (1 / 3).
```

| Octave Step | Exponent ($x$) | True Rank Formula | True Rank Value | Frequency (from 440 Hz) | Musical Note |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Start** | **0.00** | $2^0$ | **1.00000** | **440.00 Hz** | **A4** |
| **1st Quarter (÷4)** | **0.25** | $2^{0.25}$ ($\sqrt[4]{2}$) | **1.18921** | **523.25 Hz** | **C5** |
| **Halfway (Midpoint)** | **0.50** | $2^{0.50}$ ($\sqrt{2}$) | **1.41421** | **622.25 Hz** | **D♯5 / E♭5** |
| **3rd Quarter** | **0.75** | $2^{0.75}$ ($\sqrt[4]{8}$) | **1.68179** | **739.99 Hz** | **F♯5 / G♭5** |
| **End** | **1.00** | $2^1$ | **2.00000** | **880.00 Hz** | **A5** |

One can see:
- If you put octave into rank of how many digits you write.
- You get tone in second half of it:
  - This is consistent with music theory:
    - 440 could be U of the middle octave, in such case as the basin is 4, you write 4 digits.
    - These four digits themselves means 440, for example IIII or AAAA in base-4 or base-AE means this in some mod.
    - If you multiply this length by 2, you reach 880, the next octave, as basin in IIII IIII or AAAA AAAA.
    - If you take this length 4, and add it 1 / 12, *the length after 4 is the actual note*.

This means, as laegna basin has 0 not as positional number, so E, EE, EEE, EEEE are it's base-4 10, 100, 1000, 10000 base units;
- Then it also restarts counting at each digit length, from I, II, III, IIII.
- I = 1, O = 2, A = 3, E = 4; i = 0.0, o = 0.25, a = 0.5, e = 0.75 in this type of matrix ops as here - e divides by 1.5, a by 2, o by 4 and i by one octave.

You can see this normal structure:

```
EEEE EEEE EEEE EEE

1. Find the multiplier of two: 8. First part EEEE EEEE *belongs to markdown of the tones in previous octaves, as linearized into this octave*.

2. Find the actual length of remaining number - EEEE EEE is 7 digits, thus it's sqrt(7 / 8), the tone.
```

---

Utilizing Z, X, Y.

Normally, z, x, y are 1, 2 and 3 times 1 / 3. Here, as we do not need Z, X, Y, we use Z, X, Y.

There are 12 and not 4 notes:
- If you have last digit or digit before last as 3, what you got is that Laegna allows mixing multiple basin:

If last digit is in base-3, then number % 3 gives it's value and number / 3 plus floor gets the new base for remaining digits.

If previous digit is in base-4, then using %4 and /4 at this position is perfectly OK and does not break the counting logic.

Laegna also uses other modifications, i.e. digit could be of range 4 but value 7, which is not out of range but if digit is hologram copy of the Universe, it has relative value of 75% out of the Universe, so if *all* digits would be 7's of range 4, the value would *actually* be there in regard of their total length as their Universe.

Thus, mixed basin synchronizes your melody.

---

If you use R and T relations for positional encodings, there are many ways to encode your melody into single number;
- This is actually the Laegna Melody.
- It appears naturally given that log and exp can refer to short and long term;
  - with enough internal and external precision, you have the complexity of your song in single number.

Melody parts will go on and discuss this as well.

---

You can use hex numbers to mix sounds with their lengths, and use U's with pauses;
- if the origin is already hex, you can use 2 hex digits for double-hex.

---

# Conceptual Framework: The Three Division Operators (`/`, `\`, and `\\`)

In standard programming languages like Julia, `/` (right-division) and `\` (left-division) are purely linear algebraic operators inspired by matrix mathematics. However, when viewed through a physical-mathematical lens—spanning non-commutative transformations, holographic reprojection, and asymptotic scale boundaries—the three marks **`/`**, **`\`**, and **`\\`** form a complete hierarchy of inversion across operational realms.

---

## 1. Normal Division (`/`) — The Macroscopic Linear Realm
* **Asymptotic Regime:** Finite, non-zero scale ($0 < x < \infty$).
* **Mathematical Form:** Right-division ($a / b = a \cdot b^{-1}$).
* **Conceptual Role:** Operates safely inside the classical, continuous regime away from boundary singularities. It partitions a quantity proportionally in a flat, linear plane without triggering scale collapse or asymptotic divergence.

## 2. Inversed / Downwards Division (`\`) — The Infinite Expansion Realm ($\lim \to \infty$)
* **Asymptotic Regime:** Faces outward toward unbounded expansion ($\lim \to \infty$).
* **Mathematical Form:** Left-division / Inverse projection ($a \backslash b = a^{-1} \cdot b$).
* **Conceptual Role:** 
  * **Reverse Reprojection:** Rather than partitioning a whole, `\` starts from an operator or reference wave ($a$) on the left and solves backward from an observed projection ($b$) to reconstruct the hidden source ($x$). In hologram reprojection, this acts as the optical reconstruction step that un-mixes a recorded interference pattern.
  * **Asymptotic Anchor:** Facing the $\lim \to \infty$ horizon (macroscopic divergence or unbounded wave spread), `\` acts as a downward-pointing anchor that pulls an infinitely expanding state back into a finite reference frame.

## 3. Reverse / Upwards Division (`\\`) — The Planck Collapse Realm ($\lim \to 0$)
* **Asymptotic Regime:** Operates at the microscopic/ultraviolet limit ($\lim \to 0$), bounded by the **Planck scale ($\ell_P$)** and the **exponent-linearized unit of external collapse ($H_{\text{ext}}$)**.
* **Mathematical Form:** Higher-order scale compression / Log-linearization ($\log_a(b)$).
* **Conceptual Role:**
  * **Singularity Regularization:** Near $\lim \to 0$, standard linear division blows up ($1/0 \to \infty$). By doubling the mark (`\\`), the operator steps into a **higher structural tier** to regularize the singularity.
  * **Exponent-Linearized Compression:** Using exponent-linearized Planck units, `\\` compresses the collapsing interval just above the external collapse threshold ($H_{\text{ext}}$). It strips away exponential scaling and turns a divergent approach toward zero into a smooth, finite linear step.

---

## Summary Hierarchy

| Rank | Mark | Direction / Action | Limit Regime | Boundary Anchor | Conceptual Function |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1 (Base)** | **`/`** | Forward (Linear) | Finite ($0 < x < \infty$) | Classical continuum | Standard linear ratio and partitioning. |
| **2 (Lower-Facing)** | **`\`** | Backward (Reprojection) | $\lim \to \infty$ | Infinite horizon | Reprojects unbounded expansion back to a source basis ($A^{-1}B$). |
| **3 (Higher-Tier)** | **`\\`** | Tier-Shift (Log-Linear) | $\lim \to 0$ | Planck unit / $H_{\text{ext}}$ | Regularizes near-zero collapse via exponent-linearized compression. |

### Why `\\` Stands Highest in Rank
In this ordering, **`\\` occupies the highest structural tier** because resolving the $\lim \to 0$ Planck and $H_{\text{ext}}$ collapse boundary requires a stronger mathematical transformation (renormalization and log-linearization) than inverting a linear projection facing $\lim \to \infty$. Together, the three marks bridge classical partitioning (`/`), infinite-horizon reprojection (`\`), and quantum-scale regularization (`\\`).

---

### 1. How to Arrive at the Unit Base (Basin of Calculus)

To turn physical frequencies (Hertz) into a unit base where octaves act as a clean linear ruler for calculus, apply a **base-2 logarithmic normalization**:

1. **Choose Your Base Frequency ($f_0$):** Select an anchor frequency to serve as your unit origin ($1$). In an A-anchored system, **$f_0 = 110\text{ Hz}$** (A2).
2. **Normalize to Linear Rank ($r$):** Divide any physical frequency $f$ by your base frequency to strip away the Hertz unit and get a dimensionless multiplier:
   $$r = \frac{f}{f_0}$$
   *(At $f = 110\text{ Hz}$, Rank $r = 1$. At $f = 220\text{ Hz}$, Rank $r = 2$.)*
3. **Map to Logarithmic Octave Space ($x$):** Take the base-2 logarithm of the rank to convert exponential doubling into linear addition:
   $$x = \log_2(r) = \log_2\left(\frac{f}{f_0}\right)$$
   * **Inverse (Frequency from Octave):** $f(x) = f_0 \cdot 2^x$
   * **Unit Origin:** At $r = 1$, $x = \log_2(1) = \mathbf{0}$ (the basin origin).
   * **Geometric Midpoint ($\sqrt{2}$):** At $r = \sqrt{2} = 2^{0.5}$, $x = \mathbf{0.5}$ (exact half-octave).

---

### 2. Table of $\sqrt{2}$ Midpoints Across All 10 Audible Octaves

In every octave $n$, the geometric midpoint occurs at **Octave Exponent $x = n + 0.5$**, which corresponds to a linear rank of **$2^n\sqrt{2}$** (the note **D♯ / E♭**).

| Octave Span | Start Note ($x = n$) | Start Freq ($f_0 \cdot 2^n$) | Midpoint Note ($x = n + 0.5$) | $\sqrt{2}$ Midpoint Freq (Hz) | Midpoint Rank ($2^n\sqrt{2}$) | Octave Exponent ($x$) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1st Audible** | **A0** | 27.50 Hz | **D♯1 / E♭1** | **38.89 Hz** | $0.25\sqrt{2}$ ($\approx 0.354$) | **-1.5** |
| **2nd Audible** | **A1** | 55.00 Hz | **D♯2 / E♭2** | **77.78 Hz** | $0.5\sqrt{2}$ ($\approx 0.707$) | **-0.5** |
| **3rd Audible** | **A2** *(Base)* | 110.00 Hz | **D♯3 / E♭3** | **155.56 Hz** | **$1\sqrt{2}$ ($\approx 1.414$)** | **+0.5** |
| **4th Audible** | **A3** | 220.00 Hz | **D♯4 / E♭4** | **311.13 Hz** | $2\sqrt{2}$ ($\approx 2.828$) | **+1.5** |
| **5th Audible** | **A4** | 440.00 Hz | **D♯5 / E♭5** | **622.25 Hz** | $4\sqrt{2}$ ($\approx 5.657$) | **+2.5** |
| **6th Audible** | **A5** | 880.00 Hz | **D♯6 / E♭6** | **1,244.51 Hz** | $8\sqrt{2}$ ($\approx 11.314$) | **+3.5** |
| **7th Audible** | **A6** | 1,760.00 Hz | **D♯7 / E♭7** | **2,489.02 Hz** | $16\sqrt{2}$ ($\approx 22.627$) | **+4.5** |
| **8th Audible** | **A7** | 3,520.00 Hz | **D♯8 / E♭8** | **4,978.03 Hz** | $32\sqrt{2}$ ($\approx 45.255$) | **+5.5** |
| **9th Audible** | **A8** | 7,040.00 Hz | **D♯9 / E♭9** | **9,956.06 Hz** | $64\sqrt{2}$ ($\approx 90.510$) | **+6.5** |
| **10th Audible** | **A9** | 14,080.00 Hz | **D♯10 / E♭10** | **19,912.13 Hz** | $128\sqrt{2}$ ($\approx 181.019$) | **+7.5** |

---

### 3. Where Linearization Occurs & How Approximations Compare

Because the octave curve $r(x) = 2^x$ is exponential, **tangent linearization** touches the curve at only **one exact anchor point ($x = a$)**, while **secant linearization** (a straight line connecting the start and end of an octave) touches the curve only at the **two integer octave boundaries ($x = n$ and $x = n+1$)**.

* **Tangent Line Formula at Anchor $x = a$:**
  $$L_{\text{tan}}(x) = 2^a + (2^a \ln 2)(x - a)$$
* **Secant Line Formula Across Octave $[n, n+1]$:**
  $$L_{\text{sec}}(x) = 2^n + 2^n(x - n)$$

| Octave ($n$) | Secant Intersection Points (Exact Match) | True $\sqrt{2}$ Midpoint ($x = n + 0.5$) | Secant Linearized Midpoint ($1.5 \cdot 2^n$) | Tangent at Start ($x = n$) Evaluated at Midpoint | Tangent at Midpoint ($x = n + 0.5$) Exact Match |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **-2** (A0–A1) | $x = -2$ (0.25) & $x = -1$ (0.5) | **0.3536** (38.89 Hz) | 0.3750 (41.25 Hz) | 0.3366 (37.03 Hz) | **0.3536** (38.89 Hz) |
| **-1** (A1–A2) | $x = -1$ (0.5) & $x = 0$ (1.0) | **0.7071** (77.78 Hz) | 0.7500 (82.50 Hz) | 0.6733 (74.06 Hz) | **0.7071** (77.78 Hz) |
| **0** (A2–A3) | **$x = 0$ (1.0) & $x = 1$ (2.0)** | **1.4142** (155.56 Hz) | **1.5000** (165.00 Hz) | **1.3466** (148.12 Hz) | **1.4142** (155.56 Hz) |
| **+1** (A3–A4) | $x = 1$ (2.0) & $x = 2$ (4.0) | **2.8284** (311.13 Hz) | 3.0000 (330.00 Hz) | 2.6931 (296.25 Hz) | **2.8284** (311.13 Hz) |
| **+2** (A4–A5) | $x = 2$ (4.0) & $x = 3$ (8.0) | **5.6569** (622.25 Hz) | 6.0000 (660.00 Hz) | 5.3863 (592.49 Hz) | **5.6569** (622.25 Hz) |
| **+3** (A5–A6) | $x = 3$ (8.0) & $x = 4$ (16.0) | **11.3137** (1,244.51 Hz) | 12.0000 (1,320.00 Hz) | 10.7726 (1,184.99 Hz) | **11.3137** (1,244.51 Hz) |
| **+4** (A6–A7) | $x = 4$ (16.0) & $x = 5$ (32.0) | **22.6274** (2,489.02 Hz) | 24.0000 (2,640.00 Hz) | 21.5452 (2,369.97 Hz) | **22.6274** (2,489.02 Hz) |
| **+5** (A7–A8) | $x = 5$ (32.0) & $x = 6$ (64.0) | **45.2548** (4,978.03 Hz) | 48.0000 (5,280.00 Hz) | 43.0904 (4,739.94 Hz) | **45.2548** (4,978.03 Hz) |
| **+6** (A8–A9) | $x = 6$ (64.0) & $x = 7$ (128.0) | **90.5097** (9,956.06 Hz) | 96.0000 (10,560.00 Hz) | 86.1807 (9,479.88 Hz) | **90.5097** (9,956.06 Hz) |
| **+7** (A9–A10) | $x = 7$ (128.0) & $x = 8$ (256.0) | **181.0193** (19,912.13 Hz) | 192.0000 (21,120.00 Hz) | 172.3615 (18,959.76 Hz) | **181.0193** (19,912.13 Hz) |

### Key Takeaways on the Linearization Errors
* **Secant Overshoot (+6.07%):** Drawing a straight line between the start and end of any octave ($1.5 \cdot 2^n$) always overshoots the true $\sqrt{2}$ midpoint by a constant factor of $\frac{1.5}{\sqrt{2}} \approx 1.06066$ (+102 cents, landing on the Perfect Fifth instead of the Tritone).
* **Tangent Undershoot (-4.78%):** Linearizing via the calculus derivative at the start of an octave ($2^n(1 + 0.5\ln 2)$) always undershoots the $\sqrt{2}$ midpoint because $2^x$ is strictly convex, landing at $\approx 1.3466 \cdot 2^n$ (-84.9 cents).
* **Exact Match:** A tangent linearization equals the true $\sqrt{2}$ curve **only when anchored directly at $a = n + 0.5$** (the midpoint itself).

---

### 1. The Master Octave Chart (Anchored at 110 Hz = Rank 1)

| Musical Note (Scientific) | Frequency (Hz) | Rank (Ratio ÷ 110) | Octave Number (Log₂ Rank) | MIDI Note Number | Organ Pipe Footage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **A5** | 880.00 Hz | **8** (2³) | **+3** | 81 | 2' (Two-foot) |
| **A4** (Concert Pitch) | 440.00 Hz | **4** (2²) | **+2** | 69 | 4' (Four-foot) |
| **A3** | 220.00 Hz | **2** (2¹) | **+1** | 57 | 8' (Eight-foot) |
| **D♯3 / E♭3** *(Midpoint)* | **155.56 Hz** | **√2 (≈ 1.414)** | **+0.5** (2⁰·⁵) | **51** | *Tritone above 16'* |
| **A2** *(Base Unit)* | 110.00 Hz | **1** (2⁰) | **0** | 45 | 16' (Sixteen-foot) |
| **A1** | 55.00 Hz | **0.5** (2⁻¹) | **-1** | 33 | 32' (Thirty-two-foot) |
| **A0** (Lowest Piano Key) | 27.50 Hz | **0.25** (2⁻²) | **-2** | 21 | 64' (Sixty-four-foot) |

---

### 2. What Each Numbering System Represents

* **Frequencies (440, 880, 110 Hz):** Physical vibrations per second (Hertz). Because pitch doubles every octave, these numbers grow exponentially.
* **Ranks (1, 2, 4, 8):** Linear frequency ratios (or harmonic multipliers) relative to your starting point (110 Hz = 1). Rank 1 is the fundamental, Rank 2 is the 2nd harmonic (first octave), and Rank 4 is the 4th harmonic (two octaves up). **√2** is the irrational rank halfway between Rank 1 and Rank 2.
* **Octave Numbers (0, +1, +2, +3):** Logarithmic exponents (log₂ of the rank). Instead of multiplying by 2 each step, you add 1. On this linear ruler, **√2** becomes **0.5** (half an octave).

---

### 3. Other Standard Ways Octaves Are Numbered

* **Scientific Pitch Notation (A0 to A5):** Standard music theory numbers octaves starting on C rather than A. Because C is below A, 110 Hz is **A2** (Octave 2), and 440 Hz is **A4** (Octave 4).
* **Helmholtz Pitch Notation:** Uses uppercase and lowercase letters with primes instead of numbers. **110 Hz (A2)** is **A** (great A), **220 Hz (A3)** is **a** (small a), and **440 Hz (A4)** is **a′** (one-line a).
* **MIDI Note Numbers (0 to 127):** Digital instruments count every semitone as a whole number starting from 0 (C-1, ~8.18 Hz). Every octave adds 12, putting **110 Hz at MIDI 45**, **155.56 Hz (√2 rank) at MIDI 51**, and **440 Hz at MIDI 69**.
* **Organ Pipe Footage (16', 8', 4'):** Pipe organs number octaves backward using the physical length in feet of an open pipe. Longer pipes make lower sounds, so **110 Hz is 16'**, **220 Hz is 8'**, and **440 Hz is 4'**.
* **Synthesizer Control Voltage (1V / Octave):** Analog synthesizers map logarithmic octave numbers directly to electricity. If **0V = 110 Hz (Rank 1)**, then **0.5V = 155.56 Hz (Rank √2)**, **1V = 220 Hz (Rank 2)**, and **2V = 440 Hz (Rank 4)**.

---

---

### The 10 Audible Octaves (A-Anchored)

| Octave Span | Note Name | Frequency (Hz) | Rank (÷ 110 Hz) | Octave Number (Log₂ Rank) | Audible & Musical Context |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1st Audible** | **A0** *(to A1)* | 27.5 Hz | **0.25** (2⁻²) | **-2** | Lowest piano key (just above 20 Hz limit) |
| **2nd Audible** | **A1** *(to A2)* | 55.0 Hz | **0.5** (2⁻¹) | **-1** | Low bass guitar & double bass range |
| **3rd Audible** | **A2** *(to A3)* | 110.0 Hz | **1** (2⁰) | **0** | Open A-string on a guitar / Male baritone |
| **4th Audible** | **A3** *(to A4)* | 220.0 Hz | **2** (2¹) | **+1** | Middle register / Cello & viola range |
| **5th Audible** | **A4** *(to A5)* | 440.0 Hz | **4** (2²) | **+2** | Standard concert tuning pitch |
| **6th Audible** | **A5** *(to A6)* | 880.0 Hz | **8** (2³) | **+3** | High soprano & flute register |
| **7th Audible** | **A6** *(to A7)* | 1,760.0 Hz | **16** (2⁴) | **+4** | Piccolo & upper violin harmonics |
| **8th Audible** | **A7** *(to A8)* | 3,520.0 Hz | **32** (2⁵) | **+5** | Near the top of a piano (C8 is 4,186 Hz) |
| **9th Audible** | **A8** *(to A9)* | 7,040.0 Hz | **64** (2⁶) | **+6** | Cymbal shimmer, sibilance, & high overtones |
| **10th Audible** | **A9** *(to 20 kHz)* | 14,080.0 Hz | **128** (2⁷) | **+7** | Ultra-high air/brightness; clips at **20,000 Hz** |

---

### Why the 1st and 10th Octaves Are Slightly Trimmed

* **Bottom Cutoff (20 Hz to 27.5 Hz):** Human hearing begins at **20 Hz**, which is about 5.5 semitones below **A0 (27.5 Hz)**. That sliver between 20 Hz and 27.5 Hz belongs to the top half of the **A-1 octave** (which starts inaudible at 13.75 Hz).
* **Top Cutoff (14,080 Hz to 20,000 Hz):** The 10th octave begins cleanly at **A9 (14,080 Hz)**, which is Rank 128. It never reaches **A10 (28,160 Hz, Rank 256)** because human hearing tops out around **20,000 Hz** (roughly halfway through the A9 octave, near **D♯10 / E♭10** at 19,912 Hz—which is the **√2 midpoint** of the A9 octave).

---

# More cubic scale for digital and algorithmic processing

| Musical Note (Scientific) | Frequency (Hz) | Rank (Ratio ÷ 110) | Octave Number (Log₂ Rank) | MIDI Note Number | Organ Pipe Footage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **A5** | 880.00 Hz | **8** (2³) | **+3** | 81 | 2' (Two-foot) |
| **A4** (Concert Pitch) | 440.00 Hz | **4** (2²) | **+2** | 69 | 4' (Four-foot) |
| **A3** | 220.00 Hz | **2** (2¹) | **+1** | 57 | 8' (Eight-foot) |
| **D♯3 / E♭3** *(Midpoint)* | **155.56 Hz** | **√2 (≈ 1.414)** | **+0.5** (2⁰·⁵) | **51** | *Tritone above 16'* |
| **A2** *(Base Unit)* | 110.00 Hz | **1** (2⁰) | **0** | 45 | 16' (Sixteen-foot) |
| **A1** | 55.00 Hz | **0.5** (2⁻¹) | **-1** | 33 | 32' (Thirty-two-foot) |
| **A0** (Lowest Piano Key) | 27.50 Hz | **0.25** (2⁻²) | **-2** | 21 | 64' (Sixty-four-foot) |

---

### 1. Dividing the Frequency by 4 (440 Hz ÷ 4 = 110 Hz)

Dividing the physical frequency **440 Hz** by 4 steps down **two full octaves** ($\log_2(1/4) = -2$) to **110 Hz (A2)**:

* **Boundary Role:** **110 Hz (A2)** acts simultaneously as the **end** of the A1–A2 octave (55 Hz to 110 Hz) and the **start** of the A2–A3 octave (110 Hz to 220 Hz).
* **In a 110 Hz-Based System:** Because 110 Hz is the unit origin, it sits at **Linear Rank 1** and **Octave Exponent $x = 0$**.
* **In a 440 Hz-Based System:** With 440 Hz anchored at Rank 1 ($x = 0$), 110 Hz sits at **Linear Rank 0.25 ($1/4$)** and **Octave Exponent $x = -2$**.

---

### 2. Dividing the Octave Exponent by 4 ($x = 0.25$, Quarter-Octave)

Splitting the **octave exponent space** into 4 equal steps ($x = 0, 0.25, 0.50, 0.75, 1.00$) divides the octave into **3-semitone increments (Minor Thirds)**, creating a diminished seventh chord span:

| Octave Step | Exponent ($x$) | True Rank Formula | True Rank Value | Frequency (from 440 Hz) | Musical Note |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Start** | **0.00** | $2^0$ | **1.00000** | **440.00 Hz** | **A4** |
| **1st Quarter (÷4)** | **0.25** | $2^{0.25}$ ($\sqrt[4]{2}$) | **1.18921** | **523.25 Hz** | **C5** |
| **Halfway (Midpoint)** | **0.50** | $2^{0.50}$ ($\sqrt{2}$) | **1.41421** | **622.25 Hz** | **D♯5 / E♭5** |
| **3rd Quarter** | **0.75** | $2^{0.75}$ ($\sqrt[4]{8}$) | **1.68179** | **739.99 Hz** | **F♯5 / G♭5** |
| **End** | **1.00** | $2^1$ | **2.00000** | **880.00 Hz** | **A5** |

---

### 3. Exponent-Linearized Ranks at the Quarter-Octave ($x = 0.25$)

Evaluating the Taylor approximations anchored at **440 Hz ($x = 0$)** at the **$x = 0.25$** quarter-octave mark shows how closely each polynomial order tracks the true $\sqrt[4]{2}$ rank:

| Approximation Order | Formula at $x = 0.25$ | Approximated Rank | Frequency (from 440 Hz) | Pitch Error |
| :--- | :--- | :--- | :--- | :--- |
| **True Curve ($2^{0.25}$)** | $\sqrt[4]{2}$ | **1.18921** | **523.25 Hz** (C5) | 0.00 cents |
| **1st Order (Linear Tangent)** | $1 + 0.25(\ln 2)$ | **1.17329** | **516.25 Hz** | -23.33 cents |
| **2nd Order (Quadratic)** | $1 + 0.25(\ln 2) + \frac{(0.25\ln 2)^2}{2}$ | **1.18830** | **522.85 Hz** | -1.32 cents |
| **3rd Order (Cubic)** | $\text{2nd Order} + \frac{(0.25\ln 2)^3}{6}$ | **1.18917** | **523.23 Hz** | -0.06 cents |
| **Secant Line (0 to 1)** | $1 + 0.25(1)$ | **1.25000** | **550.00 Hz** (C♯5) | +86.31 cents |
