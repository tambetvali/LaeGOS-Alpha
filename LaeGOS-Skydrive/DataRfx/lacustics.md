# Laegna acoustics / acústica

## Rests and lengths

| Rest Name | What the Rest Looks Like | What the Note Looks Like | Relative Duration |
| :--- | :--- | :--- | :--- |
| **Whole Rest** | A block hanging down from the 4th staff line (looks like an upside-down hat) | An open oval with no stem | **1** (Full measure in 4/4) |
| **Half Rest** | A block sitting up on the 3rd staff line (looks like a right-side-up hat) | An open oval with a vertical stem | **1/2** |
| **Quarter Rest** | A squiggly line (often compared to a stylized 'Z' or a lightning bolt) | A filled-in oval with a vertical stem | **1/4** |
| **Eighth Rest** | A slash with one flag/branch curving out to the left | A filled-in oval with a stem and one flag | **1/8** |
| **Sixteenth Rest**| A slash with two flags/branches curving to the left | A filled-in oval with a stem and two flags | **1/16** |

We can see we have 1/4 here.

We can use hexademicals of Laegna:
```
GFEH - 13, 14, 15, 16
CBAD - 9, 10, 11, 12
QPOR - 5, 6, 7, 8
KJIL - 1, 2, 3, 4
```

We can use diagonal hexademicals of Laegna:
```
HGFE H-flip
CDAB
ROPQ H-flip + V-flip
ILKJ V-flip

Diagonal shape:

hgf E
cd A b
r O pq
 I lkj
```

Count (r / r - real, number; t / i - imaginary, fraction):
- Latin numbers come from 1 to 5, Laegna from E to I "backwards".
- ***Y***, $E^+$: $1 * 1 = 1$
- ***A***, $E^-$: $sqrt(2) * sqrt(2) = 1 / 2$
- ***X***, $A^-$: $0.5 * 0.5 = 1 / 4$
- ***O***, $O^-$: $\sqrt{1/8} \times \sqrt{1/8} = \mathbf{1/8}$
- ***Z***, $I^-$: $0.25 * 0.25 = 1 / 16$

I, O, A, E: ***I*** = $I^-$ to $O^-$ (0 to 1); ***I*** = $I^-$ to $O^-$ (1 to 2); ***I*** = $O^-$ to $A^-$ (2 to 3); ***I*** = $E^-$ to $E^+$ (3 to 4). Notice each Letter = $Letter^-$ to $Letter^+$, like E, because E+ means upper and E- means lower boundary of the letter, but boundaries touch. For example if in physical scale, numbered scales are divided by 2.5 octaves ($2^0$, $2^{2.5}$, $2^5$, $2^{7.5}$, $2^{10}), which is normal behaviour of decimals, one can count $I, O, A, E = 0, 2.5, 7.5, 10$ into laegna numbers, where positonal $5$ is replaced by missing zero (U=5), $O^+ = A^-$ is now 5, etc. Multiply this range by 2 and you get 0, 5, 10, 15, 20; now, each number has 4 around it - between each group, there are 4 numbers, so instead of 1 value, 1 laegna digit fits inside each span. This digit is written with small letter - now, first digit gives span number I, O, A, E; second digit gives double-precision octave so it can flip between time and space; the number is i, o, a, e. Now, the last number: basin-0 would count $i^-, i^+, o^+, a^+, e^+$, while basin-1 counts $i^-, o^-, a^-, e^-, e^+$, while most generically these are the same numbers.

Paradigms:
- E: Top-down.
- A: Exter-in, external-in, outside-in.
- U: Dao, balanced flow inside-out and outside-in, with observer inside.
- O: Inside-out, middle-out.
- I: Bottom-up.
- ∩: Tao, balanced flow bottom-up and top-down, with observer outside.
- ☯, _, or black circle with white surrounding like vulcanoe from top, for example this: ◉. Missing letter means *any* value goes, and it's U + ∩ combined into hexagonal giving-taking raising-falling (spiritual giving-taking) flow.

Horizontal system counts squares in balanced way; diagonal system counts outside-in

| Rest Name | Laegna 5-Basin | Relative Duration |
| :--- | :--- | :--- |
| **Whole Rest** | E+ / 5 | **1** (Full measure in 4/4) |
| **Half Rest** | E- / A+ / 4 | **1/2** |
| **Quarter Rest** | A- / O+ / 3 | **1/4** |
| **Eighth Rest** | O- / I+ / 2 | **1/8** |
| **Sixteenth Rest**| I- / 0 | **1/16** |

## Laegna Rest and Length Table

This gives that we have the following table:

| Rest Name | Laegna B4 Top-Down | Laegna B4 Bottom-Up | Laegna B5 Decimal Compability | Relative Duration |
| :--- | :--- | :--- | :--- | :--- |
| **Whole Rest** | E | EE | E+ / 5 | **4/4** |
| **Half Rest** | A | E | E- / A+ / 4 | **1/2** |
| **Quarter Rest** | O | A | | A- / O+ / 3 | **1/4** |
| **Eighth Rest** | I | O | | O- / I+ / 2 | **1/8** |
| **Sixteenth Rest** | II | I | | I- | **1/16** |

Notice to use "$E$" for $4/4$ to set $4/4$ as central is most trivial thing to do with key $4/4$, which is also highly compatible for using $EE$ as it equals $E^E$ (Laegna) or $E^2$ (Laegna signed) / $E^4$ (Laegna unsigned).

# Laegna Notes

## AI assisted theory

Western music standardizes tuning using **12-Tone Equal Temperament (12-TET)**. This means an octave is split into **12 equal steps (semitones)**. Because human hearing perceives pitch logarithmically rather than linearly, you cannot simply add numbers to change pitches; you must **multiply** them.

---

Google AI:

> These terms—**frequency, octave, and value**—*form the backbone of **how sound, music, and digital audio math interact***.
> 
> Here is what they mean and how the formulas tie them together.
> 
> ## 1. The Core Definitions
> *   **Frequency:** The physical measurement of a sound wave. It is measured in **Hertz (Hz)**, which counts how many times a sound wave vibrates per second. Higher frequency sounds like a whistle; lower frequency sounds like a bass guitar.
> *   **Octave:** The fundamental musical interval representing a **doubling or halving of a frequency**. If Note A is at $440\text{ Hz}$, the note an octave above is exactly $880\text{ Hz}$ ($440 \times 2$), and the octave below is $220\text{ Hz}$ ($440 \div 2$).
> *   **Value:** In this context, "value" refers either to the **calculated pitch frequency (Hz)** or the **specific multiplier** used to calculate notes.
> 
> ## 2. Deconstructing the Formulas
> Western music standardizes tuning using **12-Tone Equal Temperament (12-TET)**. This means an octave is split into **12 equal steps (semitones)**. Because human hearing perceives pitch logarithmically rather than linearly, you cannot simply add numbers to change pitches; you must **multiply** them.
> 
> #### The $n/12$ Formula (Semitone Math)
> To find the exact frequency of a note, the foundational formula is:
> 
> $$\text{Frequency} = \text{Reference Frequency} \times 2^{(n/12)}$$
> 
> *   **$n$ (The Value):** The number of semitones (or piano keys) away from your starting reference note.
> *   **$n/12$:** The fractional portion of an octave you are moving.
> *   **$2^{(1/12)}$ ($\approx 1.059463$):** This is the **12th root of 2**. It is the magical step value. If you multiply any note's frequency by $1.059463$, you get the exact frequency of the very next note up. Doing this 12 times in a row multiplies the starting frequency by exactly $2$—completing **one full octave**.

> #### What about $\sqrt{o}$ or $\sqrt{n/12}$?
> When you see square roots ($\sqrt{}$) in audio engineering or DSP (Digital Signal Processing), it typically represents a **half-step mapping** or a **bandwidth constraint**:
> 
> *   **Moving Half an Octave:** Mathematically, $2^{(6/12)}$ simplifies to $2^{(1/2)}$, which is the **square root of 2** ($\sqrt{2} \approx 1.414$). Moving up exactly half an octave (a musical tritone interval) means multiplying the frequency by $\sqrt{2}$.
> *   **Audio Filters and Crossovers:** In acoustic engineering, formulas like $\sqrt{f_1 \cdot f_2}$ are used to find the "geometric center frequency" of an **octave band filter**.
> 
> ## Summary Table
> 
> | **Term** | **What it is** | **Math Context** |
> |---|---|---|
> | **Frequency** | Physical speed of pitch vibrations (Hz) | The resulting output of the equation |
> | **Octave** | Sound doubling interval | Represented by the base number **$2$** in the exponential equation |
> | **$n$ or Value** | Number of semitone steps moved | The input variable changing the final pitch exponent |

---

# Laegna Octaves, Frequencies and Values

Normally, we count them this way:
- Octave is counted in full steps such as 1=440Hz, 2=880Hz etc.
  - Octaves in frequencies look like this: 1=A, 2=E, 3=EE, 4=EEEE, 5=EEEE EEEE.
  - Octaves in octaves look like this: 1=A, 2=E, 3=EA, 4=EE, 5=EAA, 6=EAE, 7=EEA, 8=EEE, 9=EAAA:
    - Octave is space, while frequency is time:
      - Space is time squared, thus it's expression is converting number length into it's digit value - in Laegna we call this "one octave down" most normally, in most standard octaves (because if you change the math, you often end up in same digits).

- Frequency is counted in precision substeps such as 1=440, 13 or 17 (number after last) = 880.
  - Frequencies in frequencies look like this: 1=A, 2=E, 3=EE, 4=EEEE, 5=EEEE EEEE.
  - Frequencies in octaves look like this (here, octave is divided into 4): 1=Ai, 2=Ao, 3=Aa, 4=Ae; if number is converted to spatial expression, the temporal one (the remaining part of full number) remains after comma - Ai to Ae is basically A.0 to A.(9), equal to A to E, thus depending on format after comma, octave is divided to pieces.

Frequency, most normally if 1 / value - frequency 2 gives value 0.5, frequency 4 gives value 0.25. This is the repeating length.

In Laegna this is not so trivial:
- Instead, we have numbers counting from up or down:
  - Top-down numbers count from up, spiritually in Yang:
    - E=100% (4); A=75% (3), O=25% or 50% (2), I = 0% or 25% (1).
      - Notice we might omit 0.5, or make numbers linear either in basin0 or basin1 (basin0 - I to E is 0 to 3, basin1 - I to E is 1 to 4).
    - Counting from top to bottom in topdown model "basin0":
      - Means that new digits come *inwards* - if first digit is 25% to 100%, then previous digit is 400% to the same 100%, so EE is 400% and the same 100% inside, makes 300% + 100%, makes 16; BUT: to make it COMPLETELY top-down, we can have it in percentage: EE% is 100%, because the 16 is divided by 4 - equivalently to Ee, first digit is the wholes digit and next digit approximate inwards. This is what **value** means in Laegna - indeed, it's one octave down or two, from frequencies.
  - Bottom up numbers count from bottom, materially in Yin:
    - E=4, A=3, O=2, I=1; or in basin-0 from 3 to 0, or in basin0.5 not having 3, counting from 1, 2, 4, 5.
    - Notice if we add digits here, EE is 16, and completely 16:
      - As this grows upwards, we count *octaves* here.

This is the whole Laegna conception except:
- Frequencies are often used to count numbers, not repetitions. As above so below - as you can see Laegna *does not* make value minus and frequency plus, but it decides to be higher rank than this minus and plus - each of three, at least opposed normally, are same-directional, which makes use of this language:
  - Z: *value*.
  - X: ***frequency***.
  - Y: **octave**.
  - In Laegna: Z, X, Y are completely playable, so while this three is etalon symmetry, you can construct all kinds of other things.

What is below 1:
- In decimal system, unless you use mantissa for unit, the sub-1 precision is always equal and by this, you cannot easily count real numbers.
- In Laegna, precision grows with equal speed in two ways:
  - Over 1, with 1 digit precision is 2, with 2 digits 4 etc.
  - Under 1, with 1 digit precision is ||0.5||, with 2 digits ||0.25|| etc. - use "||" for vector or 2nd-rank absolute, where absolute is not addition-subtraction distance from 0, but multiplication-division distance from 1.

This whole thing was discrete, but it can be continuous:
- Value: a number. unit.
- Frequency: $2^{number}$, $4^{number}$ - basin-A and basin-E, 1 or 2 band octaves.
- Octave: ${number}^2$, ${number}^4$ - basin-A and basin-E, 1 or 2 band octaves.
- Notice that this writing in Laegna number digits is so symmetric and linear in conversion to operations as given before, that it's used almost interchangeably in language - basically, because you need to convert units to Basin-0 for the previous, more linear writing, or Basin-1 from this one of higher math; first and second order octaves are these two types of numbers whose mathematics can be different.

Basin 0.5:
- *Z*: ${Value}^0$ - this is the value which is always "1".
- ***X***: ${Value}^1$ - this is the frequency which is growing linearly.
- **Y**: ${Value}^2$ - this is the octave which is growing "exponentially".
- Value is always 1 is acceptable because:
  - This is the form ${scalar}^{mantissa}$ ${unit}^{mantissa}$
    - Value 0, 1 or 2 goes to mantissa.
    - Unit decides the internal (*Z*) curvature underthreshold, while mantissa decides the directional (**X**) curvature linear, and value decides the actual 2nd order or external curvature in relation to 1st order curvature - as you make it bigger, you come closer to *external* end in logarithmic speed.

These three representations which all convert to Z, X, Y are basin for Laegna Musical Theory:
- Laegna is based on visual and auditory thinking.
- Some people see my words "frequencies", "octaves" as referring to some kind of symbolical magic or fake science, because some people "use these in random places":
  - For real, for auditory thinking to understand relations of these things, and how they model the world, is exactly the same as use of images, symbols and visual relations for visual, or semantics, expressions and syntax for abstract thinkers. I am studied to utilize each modus.

# 440 - the Laegna interpretation.

We have various Laegna Rank Theories around which state:
- External ranks are counted in trailing zeroes:
  - Order 1 (Life-close) linear for:
    - Unit of years and other units: 1 = Animal; 10 = Human; 100 = Family / Tradition; 1000 = Civilization.
      - 1, 0.1, 0.01, 0.001 - such relation can compare $H_int$ and $H_ext$, so if number is scaled down to it's vector opposite the original scale might become external scale - this is often visible in ranked decimal numbers.
      - This is hidden complexity: changing unit to those degrees changes hidden complexity.
      - 1, 2, 3, 4: a linear count which occurs at Octave 0.
        - Multiplied by 1, 2, 3, 4 or 1, 2, 4, 8 etc for 2-based channel.
  - Order 2 (Observable Universe):
    - Unit of light years and other units:
      - Light year vs. year raises the internal complexity.
      - 0=1, 1=10, 2=1 00 00, 3=1 000 000 000, 4=1 0000 0000 0000 0000
      - This is multiplied with binary-same order:
        - 0=1, 1=2, 2=4, 3=16, 4=64, 256 or other.
  - Order 3 (Non Observable Universe):
    - Unit of 10 ^ 16, multiplied by 1, 16 or other number, of light years for example. Except, that it's not really an unit - 1o, where o is order 3 unit, is 10^16 ly; o * o, now replaces o + o; o + o or 2o is octave normally, but o * o is octave now - in higher rank operation, the internal complexity gets the plus above, into multiplication below, so that if it grows linearly, the unit component is not completely internal, but it *grows exponentially then like a lower channel*.
      - In visible, if f is order 2 unit, and o is order 3 unit, in terms of themselves they have same numbers for 5 orders.
        - Really, while the binary might repeat as lower channel which *still* might count as original order 1, 2, 4 etc., the exponent part outside looks the same (1, 10, 10000 etc. for 0, 1, 2), but what it really is:
          - 1, 00 00, 00 00, 00 00, 00 00 - 16 zeroes are first grouped like this. For next steps, length of each group is multiplied by two, and number of groups is multiplied by two: if order 2 is 10^(f\*f), where f is the rank of frequency, then order 4 starts from 1 rank up and becomes 10^(f\*f\*f\*f). Rank 1 might or might not start from zero, but counts 10^(f).

We can see this:
- Ranks 1, 2, 3 of growth with complexities 1, 2, 4 (how many v's and f's and o's are multiplied).
  - We measure it with certain rank of octaves.
  - Frequently, different growth ratios are mixed.
- This growth is spatial, already, because adding zeroes roughly grows R even in decimal system and gives many rank compabilities:
  - 1, 10, 100 - these do not count like 1, 2, 3, which grow temporarly, but each adds whole new scope of values, or dimension, for which we can use each digit now, and thus grows spatially like a domain and not like it's member.
    - Thus, the spatial part is number of components in it's mantissa multiplication, which decides *external* dimensions because the mantissa itself is exponent-linearized by nature and already; so multiplying it's count by 2, spatially grows into *next power of it's dimension*, around number 3 and 0 as ranks. We see that scoped 3 or 4 dimensions (number of zeroes) and 3 or 4 superdimensions (number of their multiplications) give us *externally* a quite linear number, worth two dimensions - thus, we can use single Laegna Hex number to write any of these most important ranks of 4\*4 or 5\*5 digits in base-4 of laegna or compound base-5 of decimal / basin-5 of laegna (let's use word "basin" to express, that it's completely the externness of 5).
      - Now we see working back from logarithms and exponents, we get 2-dimensional, actually 2-band externality-linear measure, a spatial attitude.
     
- (0), 1, 2, 4, (8), 16: grow normally as they are temporal, and each doubling counts an octave.

Now what is 4.4 and 440?

In Laegna, they are composed like this:
- 4.4 has basin unit 10, which makes up two bands - 10 and 0.1.
  - 4 itself is 2*2, external basin for this system.
  - We can see two channels 10 = IE and 0.1 = OA are configured, both assigned "4":
    - 4 is value E, 4, in unsigned laegna numbers: 40 and 400 both are *full* ranges.
    - 4 is value E, 2, in signed laegna numbers: 40 and 400 both are *half* ranges.

- 440:
  - 10 is spatial 2nd rank with 4 being temporal 2nd;
    - 100 is spatial 3rd rank with 4 being temporal 2nd;
      - Two metaoctaves must have same amplitude, same frequency - octaves d10 and d100 (d means base-dec, base-10); both have frequency 4 which is either four, or doubled 2.
     
Theory:
- [Doubling of 2](https://github.com/tambetvali/LaeArve/blob/main/Books/ClassicTraditions/LeonorPlusAndMinus.md) - why 4 might mean 2 for 1st-order spaces, such as 1, 10, 100 and 1000 in linear (Z or X) ranks.
- [Algorithm Consciousness](https://github.com/tambetvali/LaeGOS-Alpha/blob/main/TerminalMode/AlgorithmConsciousness.md) - there are several texts with this name around Laegna; each gives you the basic reasoning about basic ranks in various systems; to understand basics of these counters in Physics, second order spatiality, one can read more or less any of them; or this specific one.

## Laegna Number Systems for 440

If we use O and A:
- A - there is 440 Hz sound.
- O - there is no 440 Hz sound.

If we use I, O, A, E for two channels:
- Vertically silence-up:
  - E: 400 + 40 = 440.
  - A: 400 = 400.
  - O: 40 = 40.
  - I: silence = silence.
- Horizontally between-bands:
  - E: 400 + 40 = 440.
  - A: 100 + 10 = 110.
  - O: 4 + 40 = 88.
  - I: 4 + 4 = 8.

What is the reason for division by 2?
- 440 is full frequency;
  - 220 is actually already previous octave not half of this frequency - but exact zero;
    - Thus, that it spans 220, 200 + 20, and half octaves spans 100 + 10, is more realistic.
    - If 220, 200 + 20, is the center, then *it itself* counts 100 + 100 and 10 + 10 into plus and minus from center.

Combined number is hexadecimal:
- Of hex number:
  - First band decides the spatiality, whether 100 or 10 is there for two spatial bands.
  - Second band decides the temporality, whether 100 or 4 in one, 10 or 4 in other are there.

There is one more hexadecimal presentation:
- We have Laegna way of dividing spatial growth to 2.5 parts to achieve decimal emulation;
  - This takes 1 b4 digit for whole 20 span 5+5+5+5 deciding which 5, and 1 digit for every subspan to differentiate 4 in the group;
    - 1 digit is efficiently free.
    - This counts through 20's and *knows the major bit of this 2 which was divided by two*:
      - 2 as component, initial four, now has one bit and we add one bit to make it countable like 1, 2, 3, 4 in every octave.
- This means the note in the score is very perfectly fourier-decomposed here in spatial and temporal aspect, and Laegna can express the major two-octave-spanning temporarly and spatially, notes on music score.

Why a note should span 2 actual octaves itself?

Because zero is one - it can instead of single spot, track for a harmonic effect of two suboctaves, spatially and temporarly; 2\*2 table of spatiality and value, each of four cells 0 or 1, gives one hex number able to express this thing minimally; two hex numbers express it in it's own and internal precision.

## Scores

The scores have two naming mechanisms:
- One puts the threes to higher, fours to lower position:
  - Counting like this is top-down vision, where external is projected to higher band.
- One puts the fours to higher, threes to lower position:
  - Counting like this is bottom-up vision, where imagination of exponent might appear in logarithmic head of actor of such Universe;
    - i.e. if you put the three *inside*, then as three is symmetric to space as odd domain, while four is even domain - odd and even domains are straight one in every second, other in ones between, integral or differential.

What this changes?
- It's transposing the higher and lower band of *spatiality*, because frequency-octave measures in Laegna are first half-spatial, other full-spatial; but like classic music theory, both are measured in octave-linear single space, and octavian projection of both is more common in this tradition which we can often follow.

Number itself is channel-transposed of IOAE becomes OIEA, which makes it a diagonal number instantly.
- Matrix becomes diagonal matrix this way.
- Because digit is Laegna "world model", to traversal the worlds we often change digits, but we do this conventionally - 2, 4, 16 based, rank based and internal-external-symmetric projections are still quite critical if one wants to take an aggregator to decide their world object's general value.

Naturally, this space-transaction is based on idea that these conversions *project* into this as imaginary-real, and real-imaginary switch;
- Laegna, is able to describe space curvature as rotation between those channels in every temporal, second-order octave;
  - While the rotation then, is next-order parallel to normal wave in spatial, first-order spaces of waves themselves not just the curvature of space they travel.
- This in turn, to see this rotation clearly, is a strong reason to believe that one wants these basic two types of numbers interchangeably and co-usably, in different form; trivially, having these as opposition angulars, one can project whole circle, for example because Laegna Digit Space is known in terms of affine transformations and such things, it's first order members and their natural zeroes, infinities, and coordinates. They can yet, rotate around each other in various ways.

Most common rotation:
- Imagine a Sphere.
- Project Laegna numbers on Sphere: [laGEOsis](https://github.com/tambetvali/laGEOsis).
- At north and south pole, there are I and E, in their diagonal space, perfectly vertical in alignment;
  - Traversal from I to E, exactly at half, splits to O and A to left and right, twice longer of I/E distance in this lower-octave reality.
  - Noticing this, one constructs base-16, $base_{4_{4}}$ symmetries:
    - O and A as there are four-fold positions for these two letters, in this higher octave, are added one layer of complexity outwards, so that it becomes 8 in step of 2. This is equator.
    - I and E, the poles, split it to two in two-fold traversal of shortest line from south to north pole:
      - This is 2; we divide it into four equal parts as well so we got 2 made of four halves, 0.5's.
    - Now divide the spatial complexity by two to make it planarly-projectible, at least to our little bit idealized geometry:
      - 2 becomes 1, which is one rank down or one octave down 2.
      - 0.5 becomes 1, which is one rank down it's negative complexity.
      - 8 becomes 4.
      - We got ranked zero of matrix here - downwards complexity, if it's only twice (square unit, such as $0.25 {cm}^2$), so at 0.25 instead of 0.5, it *still just turned downwards in matrix, in vector relation to it's zero*.
      - 0.5 becomes 0.25.
     - Results:
       - I, O, A, E: base-4 only keeps the higher band;
         - Or one can take averages of two high-band, two low-band bits in each case, and form base-4 two band complexity-reduced number (reducing band complexity is equal to reducing dimensional complexity, i.e. dimensional reduction and expansion, but in channel space and not dimension space - one exists in time, other in space).
       - Base-8 hase:
         - 1, 2, 3, 4, 5, 6, 7, 8
         - 0, 0.25, 0.5, 0.75, 1, 2, 3, 4.
         - Or: 0.25, 0.5, 0.75, 1, 1, 2, 3, 4.
           - This appears more naturally and this is why I say 14 means from 1 to 4, but 48 means from 5 to 8 - because the first zero is actually *proper number*, and the last eight is *square of it*, but 5 becomes *something irrational which looks like infinitesimal*, so I cannot just vocally put those letters together, actually from my auditory thinking - it's impossible to associate sound of 58, with anything, even the shape; while 48 is half eight and full eight - what is (1 + 1/4) / 2 of 8 is 5, and saying 58 *I make long chain of ugly calculus to understand it at all*, while 48 is simply 2^2 and 2^3, and 8 divides by two giving 4 - and in all this, equally numeric "1".
           - But in this example I made 1 become 0, actually meaning plus infinitesimal, which is continuous shape of the same thing.

And repeating the idea:
- Maybe, sound is normal wave in space in this phase, at integrals somewhere between ranked signs, where:
  - $H_int$ is halved by it's size, then $H_ext$ is projected to it's higher half in exponent-linearized fashion; new $H_ext$ now is magnitude larger.
  - The resulting wave shape is normal hologram, in terms of having internal-external window halved and thus, capability of virtualization to a degree.
    - This makes it sound.

What to do if it's not so?
- But we can use this projection and it's compatible with this *information complexity* of separating two wave forms, and virtually still having 3 *inside* the commonly used system, which is actually not typical with physical systems - 3, as a number, is most easy to map to *scales* or *spatial dimensions on linear scale*, but very hard to it's complexity itself.
  - For sound, the $H_ext$ of the new system is long-term, intermeditate-term and short-term projection of the same sound wave, whose unitary dimension needs window into it's changes in future and past; where in sound, major scales are dimensions - they map exactly, like complex number to exponent $e^x$ or logarithm $log(x)$, in various ways, and also to 2D space; $H_ext$ - this is more or less a dimension, which appears anyway.
  - Sound is also a hologram of space:
    - If we move our hears through various points, and can recover spatial information in each point, as we don't carry the wave with us:
      - We can see all these points correspond to spatial and temporal information, and have sound memory (echoes, vibrational synchronicities and dissynchronicities which exist in lasting moment, rather than point of space).
        - This internal int and ext absorbs the parallels from it's higher-scope int and ext.

I Laegna I promise you: this all gets just linear.
- Laegna number is *not aware* whether it's projecting scalars or dimensions, in it's essential operations, altough conventionally one uses Z, X, Y for ranked scales and X, Y, Z in classic way for 3D dimensions;
  - What I mean by "not aware":
    - Any differences in visible operations are not defined, so only an unit can express that.

First naming:
- zI 1
- zO 2
- zA 3
- zE 4
- xI 5
- xO 6
- xA 7
- xE 8
- yI 9
- yO 10
- yA 11
- yE 12

Second naming:
- Iz 1
- Ix 2
- Iy 3
- Oz 4
- Ox 5
- Oy 6
- Az 7
- Ax 8
- Ay 9
- Ez 10
- Ex 11
- Ey 12

Third naming:
- Linearized zone at beginning as I:
  - II - 0.0
    - One smallcase precision digit can be added to go precise with previous octave.
  - IO - 0.25
  - IA - 0.5
  - IE - 0.75
- OI 1
- OO 2
- OA 3
- OE 4
- AI 5
- AO 6
- AA 7
- AE 8
- EI 9
- EO 10
- EA 11
- EE 12

In third naming, I gives previous octave:
- Octaves, here, can be linearized to rank them through zero at given precision.
- On Hologram, the logarithm-linearized dimension below does what I told about linearizing of space under 1; it makes them travellable with equal precision. We can see *this actually meets the view inside octave, giving another parallel*, and that *when plus and minus become higher-rank sign, we travel over this*, and that *in Laegna, zone below 1 can have different growth ratio, which is now logarithm-linearized*.
  - With every R, changed octave and frequency, zero moves around - it's either unreachable, or becomes ranked digit and overcomable.

This allows the construction of Laegna musical score in numbers.
