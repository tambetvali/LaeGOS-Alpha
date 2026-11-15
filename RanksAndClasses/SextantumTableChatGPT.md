# Sextantum Master Table
## Laegna Rank, Scale, Dimension, Reciprocal and Residual Dataset

---

# 1. Purpose

This document defines a common data structure for the numerical research of Sextantum Physics.

Its purpose is to bring the following elements into one consistent measurement framework:

- Decimal values and digit patterns.
- Binary octave ranks.
- Base-4 representations.
- Reciprocal and logarithmic symmetry.
- Spatial and temporal dimensions.
- Golden-ratio recursion.
- Planck, metric, astronomical and cosmic references.
- Dimensional projections.
- Residuals and corrections.
- Internal and external scale positions.

The master record of a measurement is:

$$
\boxed{
M=(x,U,d,n,u,b,r,s)
}
$$

where:

| Symbol | Meaning |
|---|---|
| $x$ | Numerical magnitude |
| $U$ | Physical unit |
| $d$ | Physical dimension |
| $n$ | Laegna octave/rank coordinate |
| $u$ | Logarithmic scale coordinate |
| $b$ | Base-4 representation |
| $r$ | Residual or correction |
| $s$ | Status of the relationship |

A number can have several representations, but its physical dimension must not be lost.

For example, 4 metres, 4 seconds and 4 square metres are numerically equal but physically different.

---

# 2. Fundamental transformation rules

## 2.1 Octave coordinate

For a positive dimensionless quantity $q$, normalized to a reference value:

$$
q=\frac{x}{x_0}
$$

the binary rank is:

$$
\boxed{
n=\log_2(q)
}
$$

The inverse transformation is:

$$
q=2^n
$$

One octave step means multiplication by two:

$$
q_{n+1}=2q_n
$$

One negative octave step means division by two:

$$
q_{n-1}=\frac{q_n}{2}
$$

## 2.2 Reciprocal symmetry

For a normalized quantity:

$$
q\rightarrow\frac1q
$$

In logarithmic coordinates:

$$
n\rightarrow-n
$$

Therefore:

$$
\boxed{
\log_2(q)+\log_2(1/q)=0
}
$$

The reference point is $q=1$.

The two sides are exact reciprocal projections.

For a dimensional quantity, the reciprocal has inverse units. It should not be interpreted as the same physical measurement.

## 2.3 Decimal-band coordinate

For decimal scientific notation:

$$
x=a\times10^k
$$

where $1\leq|a|<10$, the decimal exponent is:

$$
e_{10}=k
$$

The significant coefficient and its decimal exponent should be stored separately.

This prevents values such as:

$$
0.000112
$$

and:

$$
0.000000112
$$

from being treated as equivalent merely because both contain the digit payload `112`.

## 2.4 Base-4 representation

An integer is represented as:

$$
N=\sum_{i=0}^{m}d_i4^i
$$

where:

$$
d_i\in\{0,1,2,3\}
$$

For a rational number:

$$
x=\frac pq
$$

we can store:

$$
x=\frac{p_4}{q_4}
$$

where $p_4$ and $q_4$ are the base-4 representations of the exact integer numerator and denominator.

This is an exact rational encoding.

It does not necessarily produce a finite base-4 fractional expansion.

---

# 3. Core octave master table

The octave sequence is the primary discrete scale structure.

$$
O_n=2^n
$$

| Rank $n$ | Decimal value | Base-4 integer | Reciprocal | Structural interpretation |
|---:|---:|---:|---:|---|
| -6 | 1/64 | 0.0001 | 64 | Internal |
| -5 | 1/32 | 0.0002 | 32 | Internal |
| -4 | 1/16 | 0.001 | 16 | Internal |
| -3 | 1/8 | 0.002 | 8 | Internal |
| -2 | 1/4 | 0.01 | 4 | Internal |
| -1 | 1/2 | 0.02 | 2 | Internal |
| 0 | 1 | 1 | 1 | Reference |
| 1 | 2 | 2 | 1/2 | External |
| 2 | 4 | 10 | 1/4 | External |
| 3 | 8 | 20 | 1/8 | External |
| 4 | 16 | 100 | 1/16 | External |
| 5 | 32 | 200 | 1/32 | External |
| 6 | 64 | 1000 | 1/64 | External |

The negative values in the rank column identify reciprocal octave positions.

They are not negative physical magnitudes.

The central identity is:

$$
2^{-n}=\frac1{2^n}
$$

This table provides a common coordinate structure for the rest of the dataset.

---

# 4. The 2 + 2 = 2 × 2 construction

The first four-state closure has two complementary constructions.

$$
\boxed{2+2=2\times2=4}
$$

The additive construction joins two pairs.

The multiplicative construction combines two independent binary coordinates.

A two-coordinate state can be written:

$$
(i,j),\qquad i,j\in\{0,1\}
$$

Its four possible states are:

| First coordinate | Second coordinate | State |
|---:|---:|---|
| 0 | 0 | 00 |
| 0 | 1 | 01 |
| 1 | 0 | 10 |
| 1 | 1 | 11 |

The corresponding integer encoding is:

$$
q=2i+j
$$

The four states are:

$$
0,\quad1,\quad2,\quad3
$$

This gives the basic relationship between two binary dimensions and one four-state coordinate.

The next closure is:

$$
4\times4=16
$$

And the three-coordinate closure is:

$$
4\times4\times4=64
$$

Thus:

$$
\boxed{
2^6=4^3=8^2=64
}
$$

This is the central state-count equivalence of the Sextantum structure.

---

# 5. Principal decimal anchors

The following table records the decimal values appearing in the Sextantum numerical investigation.

For rational values, the base-4 column stores the exact numerator and denominator in base 4.

| Decimal value | Exact rational | Base-4 rational | Reciprocal |
|---:|---:|---:|---:|
| 8.8 | 44/5 | 230/11 | 5/44 |
| 4.4 | 22/5 | 112/11 | 5/22 |
| 2.2 | 11/5 | 23/11 | 5/11 |
| 1.1 | 11/10 | 23/22 | 10/11 |
| 0.55 | 11/20 | 23/110 | 20/11 |
| 44.1 | 441/10 | 12321/22 | 10/441 |
| 4.11 | 411/100 | 12123/1210 | 100/411 |
| 2.11 | 211/100 | 3103/1210 | 100/211 |
| 0.000112 | 7/62500 | 13/33100210 | 62500/7 |
| 0.000000112 | 7/62500000 | 13/3232122302200 | 62500000/7 |
| 0.0010995 | 2199/2000000 | 202113/13220102000 | 2000000/2199 |
| 30.94 | 1547/50 | 120023/302 | 50/1547 |

The base-4 fractions above mean:

$$
8.8=\frac{230_4}{11_4}
$$

and:

$$
0.000112=\frac{13_4}{33100210_4}
$$

The exact rational representation is preferable to rounded base-4 decimals.

It avoids losing precision when values are used in further transformations.

---

# 6. The 8.8 octave family

The exact octave family is:

$$
x_n=\frac{8.8}{2^n}
$$

| $n$ | Decimal value | Relation |
|---:|---:|---|
| 0 | 8.8 | Reference |
| 1 | 4.4 | 8.8 / 2 |
| 2 | 2.2 | 8.8 / 4 |
| 3 | 1.1 | 8.8 / 8 |
| 4 | 0.55 | 8.8 / 16 |
| 5 | 0.275 | 8.8 / 32 |
| 6 | 0.1375 | 8.8 / 64 |
| 7 | 0.06875 | 8.8 / 128 |

The ratio between consecutive values is always:

$$
\frac{x_n}{x_{n+1}}=2
$$

This is an exact octave relationship.

The decimal patterns 4.11 and 2.11 do not belong to this exact halving sequence.

They must be represented by separate projection operators if they are to become part of the same theory.

---

# 7. The 112 residual family

The first residual anchor is:

$$
r_0=0.000112
$$

Its scientific notation is:

$$
r_0=1.12\times10^{-4}
$$

The second positional projection is:

$$
r_1=0.000000112
$$

$$
r_1=1.12\times10^{-7}
$$

Their relationship is exact:

$$
\boxed{
r_0=1000r_1
}
$$

The payload is the same:

$$
112
$$

The decimal position differs by three places.

The complement of 112 in a three-digit decimal band is:

$$
1000-112=888
$$

Therefore:

$$
\boxed{
112+888=1000
}
$$

The corresponding decimal fractions are:

$$
0.000112+0.000888=0.001
$$

This is an exact positional complement.

It does not yet establish a physical relationship between the two residuals.

---

# 8. Dimensional projection table

The proposed 1:3:9 dimensional sequence is:

$$
r_D=r_1\,3^{D-1}
$$

Using:

$$
r_1=0.000112
$$

we obtain:

| Projection index $D$ | Factor | Value | Interpretation |
|---:|---:|---:|---|
| 1 | 1 | 0.000112 | Base residual |
| 2 | 3 | 0.000336 | First triplet projection |
| 3 | 9 | 0.001008 | Second triplet projection |
| 4 | 27 | 0.003024 | Third triplet projection |
| 5 | 81 | 0.009072 | Fourth triplet projection |
| 6 | 243 | 0.027216 | Fifth triplet projection |

The index $D$ is deliberately called a projection index.

It should only be called physical spatial dimension if a physical model defines why the factor of three corresponds to an additional spatial dimension.

The mathematical sequence is exact.

Its physical interpretation remains a hypothesis.

---

# 9. Golden-ratio master record

The golden ratio is:

$$
\varphi=\frac{1+\sqrt5}{2}
$$

$$
\varphi\approx1.618033988749895
$$

It is irrational, so it has no finite exact rational representation and no finite base-4 expansion.

Its symbolic representation should therefore be retained.

| Property | Value |
|---|---|
| Symbol | $\varphi$ |
| Exact expression | $(1+\sqrt5)/2$ |
| Approximation | 1.618033988749895 |
| Reciprocal | $(\sqrt5-1)/2$ |
| Reciprocal approximation | 0.618033988749895 |
| Square | $\varphi+1$ |
| Recursive relation | $1/\varphi+1/\varphi^2=1$ |

The fundamental fractional relation is:

$$
\boxed{
1=\frac1\varphi+\frac1{\varphi^2}
}
$$

For a whole $W$:

$$
L=\frac W\varphi
$$

$$
S=\frac W{\varphi^2}
$$

and:

$$
W=L+S
$$

The same ratio repeats:

$$
\frac WL=\frac LS=\varphi
$$

This is the golden-section self-similarity.

The additive identity:

$$
\varphi^2=\varphi+1
$$

is a consequence of this fractional relationship.

---

# 10. Physical reference scale table

The following values are approximate physical references.

They are not all exact mathematical constants.

| Reference | Approximate value | Unit | Physical dimension | Role |
|---|---:|---|---|---|
| Planck length | $1.616255\times10^{-35}$ | m | Length | Planck reference |
| Planck time | $5.391247\times10^{-44}$ | s | Time | Planck reference |
| Light speed | 299792458 | m/s | Velocity | Spatial-temporal conversion |
| Earth equatorial circumference | 40075 | km | Length | Planetary reference |
| Rounded Earth reference | 40000 | km | Length | Laegna comparison |
| Light-year | $9.46073\times10^{15}$ | m | Length | Astronomical reference |
| Observable-universe radius | $4.4\times10^{26}$ | m | Length | Approximate cosmic reference |
| Observable-universe diameter | $8.8\times10^{26}$ | m | Length | Approximate cosmic reference |

The observable-universe diameter is a model-dependent cosmological quantity, not a rigid physical boundary.

The Planck length and Planck time are derived from fundamental constants.

The speed of light in vacuum has an exact numerical value in SI units.

---

# 11. Normalized physical scale coordinates

A physical length $L$ can be normalized to a reference length $L_0$:

$$
q_L=\frac{L}{L_0}
$$

Its octave coordinate is:

$$
n_L=\log_2\left(\frac L{L_0}\right)
$$

Using the Planck length as the reference:

$$
n_P=\log_2\left(\frac L{l_P}\right)
$$

The following approximate scale positions illustrate the range.

| Length | Reference ratio | Approximate binary rank |
|---|---:|---:|
| $l_P$ | 1 | 0 |
| 1 m | $1/l_P$ | 115.6 |
| 40000 km | $4\times10^7/l_P$ | 141.1 |
| 1 light-year | $9.46\times10^{15}/l_P$ | 168.6 |
| 8.8×10²⁶ m | $8.8\times10^{26}/l_P$ | 205.2 |

These are logarithmic scale coordinates.

They do not mean that the physical universe contains exactly 205.2 discrete octave steps.

They express the continuous ratio between lengths in a binary logarithmic coordinate.

---

# 12. Earth residual calculation

Use the rounded comparison:

$$
C_{\mathrm{ref}}=40000\ \mathrm{km}
$$

and the approximate equatorial circumference:

$$
C_E=40075\ \mathrm{km}
$$

The total difference is:

$$
\Delta C=40075-40000
$$

$$
\Delta C=75\ \mathrm{km}
$$

The Planck/golden-ratio fractional correction considered in Sextantum is approximately:

$$
\epsilon_\varphi=0.0010995
$$

Applying it:

$$
\Delta_\varphi=C_E\epsilon_\varphi
$$

$$
\Delta_\varphi\approx44.06\ \mathrm{km}
$$

The remaining difference is:

$$
\Delta_2=75-44.06
$$

$$
\boxed{\Delta_2\approx30.94\ \mathrm{km}}
$$

The complete correction is:

$$
75\approx44.06+30.94
$$

The corresponding normalized residuals are:

$$
\frac{44.06}{40075}\approx0.0010995
$$

and:

$$
\frac{30.94}{40075}\approx0.000772
$$

The values depend on the chosen Earth circumference and rounded reference.

They should not be treated as universal constants.

---

# 13. Dimensional synchronization

A measurement should retain its physical dimension through every transformation.

For example:

$$
L\rightarrow2L
$$

implies:

$$
A\rightarrow4A
$$

and:

$$
V\rightarrow8V
$$

when the corresponding linear dimensions are scaled isotropically.

The general relationship is:

$$
Q_d\propto L^d
$$

where $d$ is the spatial dimension of the measured geometric quantity.

| Linear scale factor | 1D | 2D | 3D |
|---:|---:|---:|---:|
| 2 | 2 | 4 | 8 |
| 3 | 3 | 9 | 27 |
| 4 | 4 | 16 | 64 |
| 8 | 8 | 64 | 512 |

This table shows how the binary and triplet structures can meet through dimensional powers.

For a factor of four:

$$
4^1=4
$$

$$
4^2=16
$$

$$
4^3=64
$$

The 64-state closure is therefore also the cubic projection of a fourfold linear scale.

---

# 14. Light-speed synchronization

The speed of light connects spatial and temporal measurements:

$$
L=ct
$$

The Planck definitions give:

$$
c=\frac{l_P}{t_P}
$$

This is an exact relationship within the definitions of the Planck units.

The light-year is approximately the distance light travels in one Julian year:

$$
1\ \mathrm{ly}=c\times1\ \mathrm{Julian\ year}
$$

The master record should therefore preserve both:

- spatial magnitude;
- corresponding propagation time.

A useful normalized coordinate is:

$$
\beta=\frac vc
$$

For a massive object in special relativity:

$$
0\leq\beta<1
$$

The boundary $\beta=1$ is the light-speed limit.

A Laegna coordinate can remap this interval, but such a remapping must not change the underlying physical speed.

---

# 15. Machine-readable JSON schema

The following JSON structure is intended as a common record format.

```json
{
  "schema": "SextantumMasterTable",
  "version": "1.0",
  "system": "Laegna",
  "fields": {
    "id": "Stable record identifier",
    "name": "Human-readable name",
    "value": "Numerical value or symbolic expression",
    "exact": "Exact rational or symbolic representation",
    "unit": "Physical unit, or null for dimensionless values",
    "dimension": "Physical dimension",
    "decimal_exponent": "Base-10 exponent when applicable",
    "base4": "Exact base-4 representation or symbolic form",
    "reciprocal": "Reciprocal of the dimensionless value",
    "octave_rank": "Logarithmic rank relative to a declared reference",
    "projection_index": "Laegna projection index",
    "residual": "Residual or correction",
    "status": "Exact, derived, approximate, measured, or hypothesis",
    "notes": "Interpretation and limitations"
  }
}
```

A null value means that the field is not defined or has not yet been calculated.

It must not be silently replaced with zero.

---

# 16. Initial JSON dataset

```json
{
  "schema": "SextantumMasterTable",
  "version": "1.0",
  "system": "Laegna",
  "records": [
    {
      "id": "octave_0",
      "name": "Identity",
      "value": 1,
      "exact": "1",
      "unit": null,
      "dimension": "dimensionless",
      "base4": "1",
      "reciprocal": 1,
      "octave_rank": 0,
      "status": "exact"
    },
    {
      "id": "octave_1",
      "name": "Duality",
      "value": 2,
      "exact": "2",
      "unit": null,
      "dimension": "dimensionless",
      "base4": "2",
      "reciprocal": 0.5,
      "octave_rank": 1,
      "status": "exact"
    },
    {
      "id": "octave_2",
      "name": "Four-state closure",
      "value": 4,
      "exact": "2^2",
      "unit": null,
      "dimension": "dimensionless",
      "base4": "10",
      "reciprocal": 0.25,
      "octave_rank": 2,
      "status": "exact"
    },
    {
      "id": "octave_3",
      "name": "Eight-state closure",
      "value": 8,
      "exact": "2^3",
      "unit": null,
      "dimension": "dimensionless",
      "base4": "20",
      "reciprocal": 0.125,
      "octave_rank": 3,
      "status": "exact"
    },
    {
      "id": "octave_4",
      "name": "Sixteen-state closure",
      "value": 16,
      "exact": "2^4",
      "unit": null,
      "dimension": "dimensionless",
      "base4": "100",
      "reciprocal": 0.0625,
      "octave_rank": 4,
      "status": "exact"
    },
    {
      "id": "octave_5",
      "name": "Thirty-two-state midpoint",
      "value": 32,
      "exact": "2^5",
      "unit": null,
      "dimension": "dimensionless",
      "base4": "200",
      "reciprocal": 0.03125,
      "octave_rank": 5,
      "status": "exact"
    },
    {
      "id": "octave_6",
      "name": "Sixty-four-state closure",
      "value": 64,
      "exact": "2^6 = 4^3 = 8^2",
      "unit": null,
      "dimension": "dimensionless",
      "base4": "1000",
      "reciprocal": 0.015625,
      "octave_rank": 6,
      "status": "exact"
    },
    {
      "id": "anchor_8_8",
      "name": "Macroscopic coefficient",
      "value": 8.8,
      "exact": "44/5",
      "unit": null,
      "dimension": "dimensionless",
      "base4": "230/11",
      "reciprocal": 0.1136363636363636,
      "octave_rank": null,
      "status": "exact rational",
      "notes": "Used as a coefficient in the approximate observable-universe diameter."
    },
    {
      "id": "anchor_4_4",
      "name": "First octave subdivision",
      "value": 4.4,
      "exact": "22/5",
      "unit": null,
      "dimension": "dimensionless",
      "base4": "112/11",
      "reciprocal": 0.2272727272727273,
      "octave_rank": null,
      "status": "exact rational",
      "notes": "Exactly half of 8.8."
    },
    {
      "id": "anchor_2_2",
      "name": "Second octave subdivision",
      "value": 2.2,
      "exact": "11/5",
      "unit": null,
      "dimension": "dimensionless",
      "base4": "23/11",
      "reciprocal": 0.4545454545454545,
      "octave_rank": null,
      "status": "exact rational",
      "notes": "Exactly half of 4.4."
    },
    {
      "id": "anchor_1_1",
      "name": "Third octave subdivision",
      "value": 1.1,
      "exact": "11/10",
      "unit": null,
      "dimension": "dimensionless",
      "base4": "23/22",
      "reciprocal": 0.9090909090909091,
      "octave_rank": null,
      "status": "exact rational",
      "notes": "Exactly half of 2.2."
    },
    {
      "id": "anchor_112",
      "name": "Primary fractional residual",
      "value": 0.000112,
      "exact": "7/62500",
      "unit": null,
      "dimension": "dimensionless",
      "base4": "13/33100210",
      "reciprocal": 8928.571428571429,
      "octave_rank": null,
      "status": "exact rational",
      "notes": "Decimal payload 112 at the 10^-4 scale."
    },
    {
      "id": "anchor_112_lower",
      "name": "Lower decimal-band projection",
      "value": 0.000000112,
      "exact": "7/62500000",
      "unit": null,
      "dimension": "dimensionless",
      "base4": "13/3232122302200",
      "reciprocal": 8928571.428571429,
      "octave_rank": null,
      "status": "exact rational",
      "notes": "Same significant payload as 0.000112, shifted three decimal places."
    },
    {
      "id": "golden_ratio",
      "name": "Golden ratio",
      "value": 1.618033988749895,
      "exact": "(1+sqrt(5))/2",
      "unit": null,
      "dimension": "dimensionless",
      "base4": "symbolic: (1+sqrt(5))/2",
      "reciprocal": 0.6180339887498948,
      "octave_rank": 0.6942419136306174,
      "status": "exact algebraic irrational",
      "notes": "Recursive proportional invariant; not an octave power."
    },
    {
      "id": "earth_circumference",
      "name": "Earth equatorial circumference",
      "value": 40075,
      "exact": null,
      "unit": "km",
      "dimension": "length",
      "base4": null,
      "reciprocal": null,
      "octave_rank": null,
      "status": "approximate reference",
      "notes": "Use a specified geodetic source and epoch for precision work."
    },
    {
      "id": "earth_rounded_reference",
      "name": "Rounded Earth reference",
      "value": 40000,
      "exact": "40000",
      "unit": "km",
      "dimension": "length",
      "base4": "2131000",
      "reciprocal": null,
      "octave_rank": null,
      "status": "defined model reference",
      "notes": "Convenient rounded comparison, not Earth's measured circumference."
    },
    {
      "id": "earth_first_residual",
      "name": "Golden-ratio-related correction",
      "value": 44.06,
      "exact": null,
      "unit": "km",
      "dimension": "length",
      "base4": null,
      "reciprocal": null,
      "octave_rank": null,
      "status": "derived approximate",
      "notes": "Approximately 40075 km multiplied by 0.0010995."
    },
    {
      "id": "earth_second_residual",
      "name": "Remaining Earth comparison residual",
      "value": 30.94,
      "exact": "1547/50",
      "unit": "km",
      "dimension": "length",
      "base4": "120023/302",
      "reciprocal": null,
      "octave_rank": null,
      "status": "derived approximate",
      "notes": "Approximately 75 km minus 44.06 km."
    },
    {
      "id": "light_speed",
      "name": "Speed of light in vacuum",
      "value": 299792458,
      "exact": "299792458",
      "unit": "m/s",
      "dimension": "length/time",
      "base4": "1020310312212022",
      "reciprocal": null,
      "octave_rank": null,
      "status": "exact SI value",
      "notes": "Connects spatial and temporal measurement through L=ct."
    },
    {
      "id": "planck_length",
      "name": "Planck length",
      "value": 1.616255e-35,
      "exact": null,
      "unit": "m",
      "dimension": "length",
      "base4": null,
      "reciprocal": null,
      "octave_rank": 0,
      "status": "derived physical constant",
      "notes": "Use the selected CODATA release and uncertainty in precision calculations."
    },
    {
      "id": "observable_universe_diameter",
      "name": "Approximate observable-universe diameter",
      "value": 8.8e26,
      "exact": null,
      "unit": "m",
      "dimension": "length",
      "base4": null,
      "reciprocal": null,
      "octave_rank": 205.2,
      "status": "approximate cosmological reference",
      "notes": "8.8 is the rounded coefficient; the diameter is model-dependent."
    }
  ]
}
```

---

# 17. CSV-style compact dataset

For spreadsheet work, the following columns are recommended:

```csv
id,name,value,exact,unit,dimension,base4,reciprocal,octave_rank,projection_index,residual,status
octave_0,Identity,1,1,,dimensionless,1,1,0,,0,exact
octave_1,Duality,2,2,,dimensionless,2,0.5,1,,0,exact
octave_2,Four-state closure,4,2^2,,dimensionless,10,0.25,2,,0,exact
octave_3,Eight-state closure,8,2^3,,dimensionless,20,0.125,3,,0,exact
octave_4,Sixteen-state closure,16,2^4,,dimensionless,100,0.0625,4,,0,exact
octave_5,Thirty-two-state midpoint,32,2^5,,dimensionless,200,0.03125,5,,0,exact
octave_6,Sixty-four-state closure,64,2^6,,dimensionless,1000,0.015625,6,,0,exact
anchor_8_8,Macroscopic coefficient,8.8,44/5,,dimensionless,230/11,0.11363636,,, ,exact rational
anchor_4_4,First subdivision,4.4,22/5,,dimensionless,112/11,0.22727273,,, ,exact rational
anchor_2_2,Second subdivision,2.2,11/5,,dimensionless,23/11,0.45454545,,, ,exact rational
anchor_1_1,Third subdivision,1.1,11/10,,dimensionless,23/22,0.90909091,,, ,exact rational
anchor_112,Primary residual,0.000112,7/62500,,dimensionless,13/33100210,8928.5714,,, ,exact rational
anchor_112_lower,Lower decimal projection,0.000000112,7/62500000,,dimensionless,13/3232122302200,8928571.4286,,, ,exact rational
golden_ratio,Golden ratio,1.618033988749895,(1+sqrt(5))/2,,dimensionless,symbolic,0.61803399,0.69424191,,,exact algebraic irrational
earth_circumference,Earth equatorial circumference,40075,,km,length,,,,,,approximate reference
earth_rounded_reference,Rounded Earth reference,40000,40000,km,length,2131000,,,,,defined model reference
earth_first_residual,First correction,44.06,,km,length,,,,,44.06,derived approximate
earth_second_residual,Second correction,30.94,1547/50,km,length,120023/302,,,,30.94,derived approximate
light_speed,Speed of light,299792458,299792458,m/s,length/time,1020310312212022,,,,,exact SI value
planck_length,Planck length,1.616255e-35,,m,length,,,,0,,,,derived physical constant
observable_universe_diameter,Observable-universe diameter,8.8e26,,m,length,,,,205.2,,,,approximate cosmological reference
```

---

# 18. Data validation rules

The dataset should follow these rules.

## Rule 1: No dimensionless assumption for physical quantities

A length cannot be directly compared with a frequency or a time.

A conversion requires a defined physical relationship.

## Rule 2: Reciprocal operations require normalization

The reciprocal of a dimensionless ratio is meaningful as a scale inversion.

The reciprocal of a length has units of inverse length.

## Rule 3: Rank requires a reference

A logarithmic rank must identify its reference:

$$
n=\log_2(x/x_0)
$$

Without $x_0$, the rank is incomplete.

## Rule 4: Base-4 encoding must preserve exactness

Use exact fractions or symbolic expressions where possible.

Do not silently round an irrational number into a finite base-4 approximation.

## Rule 5: Residuals must identify their reference

A residual must state:

- the original measurement;
- the reference measurement;
- the transformation;
- the resulting difference;
- the uncertainty.

## Rule 6: A projection index is not automatically a physical dimension

The 1:3:9 sequence is a valid mathematical progression.

Its interpretation as a spatial-dimensional progression requires a physical model.

## Rule 7: Approximate resonances must remain approximate

A numerical resemblance is not an exact equality.

It must not be converted into a physical law without an independent test.

---

# 19. Suggested Laegna computational functions

A future Laegna calculator can implement these operations directly.

```python
from fractions import Fraction
from math import log2, sqrt

def octave(value, rank):
    """Apply an integer or fractional binary octave shift."""
    return value * (2 ** rank)


def reciprocal(value):
    """Return reciprocal of a nonzero normalized value."""
    if value == 0:
        raise ValueError("Reciprocal is undefined at zero.")
    return 1 / value


def octave_rank(value, reference=1):
    """Return binary logarithmic rank."""
    if value <= 0 or reference <= 0:
        raise ValueError("Logarithmic rank requires positive values.")
    return log2(value / reference)


def golden_ratio():
    return (1 + sqrt(5)) / 2


def golden_split(whole):
    """Return golden larger and smaller parts."""
    phi = golden_ratio()
    larger = whole / phi
    smaller = whole / (phi ** 2)
    return larger, smaller


def dimensional_projection(value, index):
    """Apply the proposed 1:3:9 projection ladder."""
    if index < 1:
        raise ValueError("Projection index must be >= 1.")
    return value * (3 ** (index - 1))


def base4_integer(number):
    """Convert a nonnegative integer to base 4."""
    if number < 0:
        return "-" + base4_integer(-number)
    if number == 0:
        return "0"

    digits = ""
    while number:
        digits = str(number % 4) + digits
        number //= 4

    return digits


def base4_fraction(value):
    """Represent a rational exactly as base-4 numerator/denominator."""
    value = Fraction(value)
    return (
        base4_integer(value.numerator)
        + "/"
        + base4_integer(value.denominator)
    )


def relative_residual(value, reference):
    """Relative additive residual."""
    if reference == 0:
        raise ValueError("Reference cannot be zero.")
    return (value - reference) / reference


def logarithmic_residual(value, reference):
    """Multiplicative residual in natural-log coordinates."""
    if value <= 0 or reference <= 0:
        raise ValueError("Both values must be positive.")
    from math import log
    return log(value / reference)


# Example checks

assert octave(8.8, -1) == 4.4
assert octave(4.4, -1) == 2.2

assert Fraction(112, 1000) + Fraction(888, 1000) == 1

assert Fraction(112, 1_000_000) * 1000 == Fraction(
    112, 1_000
)

assert Fraction(44, 5) == Fraction(230, 11) * Fraction(1, 1)
assert base4_fraction(Fraction(44, 5)) == "230/11"

phi = golden_ratio()
larger, smaller = golden_split(1)

assert abs(larger + smaller - 1) < 1e-12
assert abs((1 / larger) - phi) < 1e-12
assert abs((larger / smaller) - phi) < 1e-12

assert base4_integer(64) == "1000"

print("Sextantum core checks passed.")
```

---

# 20. Research priorities

The master dataset should be expanded in the following order.

| Priority | Task | Purpose |
|---:|---|---|
| 1 | Complete octave rank table | Establish the exact binary coordinate system |
| 2 | Complete base-4 conversion | Connect numeric ranks with Laegna notation |
| 3 | Add physical dimensions | Prevent invalid cross-unit comparisons |
| 4 | Add reciprocal coordinates | Establish internal/external symmetry |
| 5 | Add decimal-band coordinates | Track digit payloads across scales |
| 6 | Add golden-section projections | Test recursive fractional relationships |
| 7 | Add 1:3:9 projections | Formalize the proposed dimensional ladder |
| 8 | Add physical reference uncertainty | Separate measurement from rounding |
| 9 | Add residual propagation | Track corrections across transformations |
| 10 | Test independent predictions | Determine whether the model has physical content |

The most important next step is to define every transformation once and apply it to every anchor.

That prevents the model from acquiring a different rule for each attractive numerical correspondence.

---

# 21. Final master principle

The Sextantum dataset should not be a collection of isolated numbers.

It should be a connected system of typed measurements.

Every number must retain:

- its magnitude;
- its unit;
- its dimension;
- its rank;
- its reference;
- its base representation;
- its reciprocal position;
- its transformation history;
- its residual;
- its evidential status.

The mathematical objective is:

$$
\boxed{
\text{One measurement}
\longleftrightarrow
\text{Multiple consistent projections}
}
$$

The central symmetry is:

$$
2+2=2\times2=4
$$

The central state closure is:

$$
64=2^6=4^3=8^2
$$

The central fractional recursion is:

$$
1=\frac1\varphi+\frac1{\varphi^2}
$$

The central reciprocal transformation is:

$$
u\leftrightarrow-u
$$

And the central physical synchronization is:

$$
L=ct
$$

Together, these relationships provide the mathematical foundation for a Laegna system of symmetric scales and measures.

**Sextantum's task is to establish which of these structures can be connected by exact transformations, which correspond approximately, and which produce new physical predictions.**
