# Data Library

Library for Laegna Data supports Laegna numeric conversions.

## Standalone screen and keyboard demo

Open `index.html` from a static web server (not directly as `file://`) to use the standalone WinBox demonstration. It reads ordered digit definitions from `../DataRfx/laegna.json`; `Examples` is learning/reference material and is not loaded by the app or library. The browser tests may compare against those reference examples, but they are not runtime inputs. The page uses the requested `/static/js/winbox.bundle.min.js` path when that asset is available, and provides in-page windows when it is not.

Use the **Run DataLib unit tests** link on the page to open `unittest.html`. The test page checks generated number ranges, driver/unknown handling, waveform round trips, and optional comparisons with the example data.

The demo has an Answer / Question / Oracle screen coordinator, digit and operator keyboard classes, a current-entry sign setter, and number types for the Laegna base-2, base-4, base-8, and base-16 digit orders. Encoded digits use the Examples' one-based ordinal value convention (`digits as base-B indices + 1`; `W` represents zero). Base-16 keeps its 4×4 keypad shape. The base-4 waveform type uses the Examples' previous-digit permutation in both directions. Its inverse selects each digit using the already-decoded previous waveform digit, so conversion back produces the matching waveform shape. B16D encodes binary digits as A/O; its driver arrays preserve U (unknown) and · (unset) positions, including the base-4 U and ∩ patterns.

This is a single-user, in-memory sandbox. `DataCode` imports the same classes through `../DataLib/number-types.js`; the library is not copied into that app. Symbolic unknown arithmetic, mixed-base free-entry semantics, conversion masks, and the full origin-preserving bit model remain extension points rather than being implied as implemented.

This is going to support two operational modes:
- Fixed base formats:
  - Number systems on screen and in processing in fixed base format.
  - If digits were originally entered in different base, it will do the best it can:
    - Delete number of least significant bits from number, reaching another form.
    - When different base is selected, such as base-16, than where numbers were entered, such as base-4, for example 3 digit number is shown as 2 digit number in base-hex, because two bits of added padding in the beginning resolves this.
      - Because Laegna normally avoids zero:
        - V-equivalent replacement character is used for padding, i.e. "known".
        - If sign established convention, this is used:
          - For base-2 sign such as - and +, for numbers above zero, A is added as preceding padding and for numbers below it, O is added;
            - If first number is basically sign, deciding either in base-2 whether the following is plus or minus, above or below median; the padding digit would ensure the number does not change it's relation in major regions where signs appear - if four digits are used, also four base-4 digits, for example, could pad it internally, and the missing half of base-16 digit is replaced with such padding.
  - Fixed base formats are useful for base system conversions, very typical operation in Laegna:
    - Initially it supports T change of basin, such that new base system is selected and *value* of number remains constant, i.e. equivalent numeric value is shown in new base.
    - For T is temporal, value based operation, causative logic;

      > for every T, R exists (or a virtual R, because it has coordinates, thus it exists in mathematical sense of attributing that R);
      
      > Doing an operation, or base system change in R, means an opposite:
      > - Numeric form looks the same, but basin has changed.
      >   - Laegna base-2, base-4 and base-16 numbers overlap as much as they can; base-8 differs from each as much as it can.
      >     - TR vs OA and MNST vs IOAE as $base_{2_{2}}$ have this:
      >       - OA and IOAE position in the *internal* coordinates.
      >       - TR and MNST do their best to be each in position of *metacoordinate*, external and superior.
      >         - I.e. T and R, for the same number, fact, object, relation or metaphor, always constitute in it's value and space, not mixing with it's internals in competition - if internal is added acceleration of factor 2, but the metatemplate instantly gets factor 4;
      >           - This seems mathematically a little bit hard but it's actually much simpler:
      >             - Special base system is used with high-level separate coordinates, in relation to current digit, with proportional added external space.
      >         - R is roughly $H_{ext}$ and T is $H_{int}$, which form an equivalence pair - normally, exponent-linearized $H_{ext}$ is with same power of $H_{int}$, which allows us to use only the more significant bit of more significant channel, but we also keep E factor 2 of A - this provides consistent logarithm-exponent relation in the whole scenario.
- Dynamic base formats are useful for many things:
  - This means, that each entered character will:
    - Actually be it's own type, such as base system digit type or base system zero-infinity-unknown type
      >   - Odd systems are:
      >     - Base-3: Z, X, Y; log-lin-exp and many related threes;
      >       - ZXY is pattern for this.
      >       - Yinyang symbol and Dao is what I see.
      >     - Base-5: IOUAE was called base-5 in some of my text, but rather call it base 04 and IOUAE⋂ 004 - i.e. rather some variation of the original basin.
      >       - IOXAE is pattern for this.
      >       - 5 elements is what I see.
      >     - Base-7: In original Laegna, this format did not exist;
      >       - IZOXAYE is pattern which has always existed; it's top-down counterpart IOAEZXY as well:
      >         - I invented this long time, decided to use exactly these two patterns; for seven is twice odd, one external tree, plus twice even, one internal tree - 1, 3 is twice odd; 2, 4 is twice even, and 4 + 3 = 7, linearized in this plancktum scale.
      >         - Normally, zxy are *internal* three-projection, such as the one in music.
      >           - The big question: is sound a shape of physical wave which has external and internal both projected inwards; then has it's own external of halved pair.
      >             - In this question we can soon find sound of anything, such as hearing in quantum space and astrospace, or hearing the framework itself - just put it to the division.

These bases will support:

If one mixes digits of different spaces:
- The curvatures are applied to each separate digit, each has it's *unit* curvature (mantissa or empowered multiplier, R), *internal* complexity (number in unit, H), and value (value, T).
  - Finally it has S, which I have to define:
    - Where the zero is?
      - One way is to see at which frequency it becomes zero, and in which frequency it becomes part of finite scales.
      - Other way is apply S shaped modifiers to area of 0..1 and below.
    - Other multiplications which curve the space.

$$
scalar^{mantissa}_{base} * unit^{mantissa}_{base}
$$

Here, base shows the scalar factor of change, such as 2 for octave or 4 for 2D octave, if exists;
- Internal complexity of growth.
- This curvature maintains itself as unit, but unit 1 is presumed to exist.
  - This happens if laegna digit value is assigned a decimal number, such as `A = speed of light`; in terms of curvature, A remains 1 - it's 1 degree number; but it's internal and external values are variables, as well as many other aspects.

Same way, arranging Laegna letters:
- R => T
- R => S => T
- These are different, because chosen sequence will be *linear*, and include their relations, as well as common denominator frequency, which means R of one sequence is not always interchangeable with R in other, altough good understanding of one's variable keeps single letters rather interchangeable with their values in common framework.

Mantissa shows external curvature, which is included into operations:
- This curvature is consirered to exist in operations.

I am resolving this, that my oracle mind *strongly suggested* the mixed-base I did not want so much; now I'm on compromise:
- But it involves some decisions about encoding;
  - because basically it's meant to be open source essential code.

For this, I implement in this folder some basic libraries for Laegna number manipulations, and possibly multiple containers. Rather I do not want to make it fully customizable, because I want to show trivial and stable laegna numbers rather than what, for most, becomes a speculation - wery reliable, internally symmetric, simple relations an advanced user / hacker simply extends and reshapes, but whose simplistic shape keeps them understanding even the big picture of what they are doing, then - agains, normalizing it to single base-4 digit, 4\*4 2D base-16 number etc.

So I implement:
- The basic number structure.
- Keyboards.
- Number input and screen logic.
- Basic operations.

Systems:
- Base-4 and Base-16 wave numbers.
- Base-2, Base-4, Base-8 and Base-16 standard numbers. (actually wave numbers follow the original standard better, but these ones have simpler rules - wave number adds one complex rule)
- Base-4D and Base-16D - diagonals.
- I Ching relations symbolism for 8 and 64, reaching external combinators.
  - Essentially, one should able to choose single I Ching symbol into *sign*, or enumerate 64-digit with I Ching hexagrams for *fourier discomposition* of it's ranks;
    - Inside dimension, in both cases:
      - For sign, user can operate in local coordinate system of this scope or I-Ching-relative position.
      - For 64-digit positioning, user can turn this to fourier decomposition which finds precise value of I Ching supercomposition of function trajectories, then calculate also a single I Ching symbol for the whole, with the two trigrams; or change, if situation is acceleratable for this user.

This will be completely a Javascript library with less and less missing pieces - even less and less information you miss to replicate the *complete functionality* rather easily; and it essentially allows one to develop laegna calculations.
