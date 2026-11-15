# Dimensional Units and Relative Basic Ranks
## Laegna space-time, relational dimensions and reciprocal scale tables

---

# 1. Basic dimensional units

A dimensional unit can be multiplied by itself or by another dimensional unit.

The exponent describes how many factors of the base unit are multiplied together.

| Structure | Operation | Resulting unit | Meaning |
|---|---|---|---|
| Length | $cm^1$ | cm | One spatial measure |
| Time | $s^1$ | s | One temporal measure |
| Area | $cm\times cm$ | $cm^2$ | Two lengths |
| Volume | $cm^2\times cm$ | $cm^3$ | Three lengths |
| Fourth-order length | $cm^3\times cm$ | $cm^4$ | Four length factors |
| Area of area | $cm^2\times cm^2$ | $cm^4$ | Two area factors |
| Volume of volume | $cm^3\times cm^3$ | $cm^6$ | Two volume factors |
| Time squared | $s\times s$ | $s^2$ | Two temporal factors |
| Time cubed | $s^2\times s$ | $s^3$ | Three temporal factors |
| Space-time | $cm\times s$ | $cm\cdot s$ | One spatial and one temporal factor |

The same resulting unit can arise from different constructions:

$$
cm^4=(cm)^4=(cm^2)^2
$$

The dimensional result is the same, but its construction can have a different interpretation.

---

# 2. Multiplication of dimensional units

| Initial unit | Multiplied by | Result |
|---|---|---|
| cm | cm | $cm^2$ |
| $cm^2$ | cm | $cm^3$ |
| $cm^3$ | cm | $cm^4$ |
| $cm^2$ | $cm^2$ | $cm^4$ |
| $cm^2$ | $cm^3$ | $cm^5$ |
| $cm^3$ | $cm^3$ | $cm^6$ |
| s | s | $s^2$ |
| $s^2$ | s | $s^3$ |
| $s^2$ | $s^2$ | $s^4$ |
| cm | s | $cm\cdot s$ |
| $cm^2$ | s | $cm^2\cdot s$ |
| $cm^2$ | $s^2$ | $cm^2\cdot s^2$ |

General rule:

$$
U^a\times U^b=U^{a+b}
$$

For different base units:

$$
L^aT^b\times L^cT^d=L^{a+c}T^{b+d}
$$

Here, $L$ denotes a length dimension and $T$ denotes a time dimension.

---

# 3. Inverse dimensional units

Every positive dimensional power has a corresponding inverse power.

| Forward unit | Inverse unit | Interpretation |
|---|---|---|
| cm | $cm^{-1}$ | Inverse length |
| $cm^2$ | $cm^{-2}$ | Inverse area |
| $cm^3$ | $cm^{-3}$ | Inverse volume |
| $cm^4$ | $cm^{-4}$ | Inverse fourth-order length |
| s | $s^{-1}$ | Frequency dimension |
| $s^2$ | $s^{-2}$ | Inverse squared time |
| $s^3$ | $s^{-3}$ | Inverse cubed time |
| $cm\cdot s$ | $cm^{-1}s^{-1}$ | Reciprocal compound unit |
| $cm^2s$ | $cm^{-2}s^{-1}$ | Reciprocal compound unit |

General rule:

$$
U^n\longleftrightarrow U^{-n}
$$

For compound dimensions:

$$
L^aT^b\longleftrightarrow L^{-a}T^{-b}
$$

The inverse is not another independent unit system. It is the reciprocal dimensional representation.

---

# 4. Dimensional and relational structures: 3, 4, 9, 16 and 64

We distinguish the number of components from the unit of each component.

Let the spatial coordinates be:

$$
q_s=(x,y,z)
$$

Each coordinate has units of length.

The spatial relational matrix is:

$$
R_3=q_sq_s^T
$$

$$
R_3=
\begin{bmatrix}
x^2&xy&xz\\
yx&y^2&yz\\
zx&zy&z^2
\end{bmatrix}
$$

It has nine entries, each with units of area.

For spacetime, use the four-coordinate representation:

$$
q=(ct,x,y,z)
$$

All four coordinates now have length units.

The corresponding relational matrix is:

$$
R_4=qq^T
$$

It has sixteen entries, each with units of area.

| Structure | Construction | Number of components | Unit per component |
|---|---:|---:|---|
| 1D space | 1 coordinate | 1 | cm |
| 3D space | 3 coordinates | 3 | cm |
| 3D spatial R-space | $3\times3$ | 9 | $cm^2$ |
| 3+1 spacetime | $3+1$ | 4 | cm |
| 4D spacetime R-space | $4\times4$ | 16 | $cm^2$ |
| Higher relational structure | $4\times16$ | 64 | Depends on construction |

The number of entries does not automatically determine the dimensional unit.

For example, nine separate area-valued entries are nine areas:

$$
9\times cm^2
$$

If we multiply all nine entries together, the result is:

$$
(cm^2)^9=cm^{18}
$$

If we add them, the result remains an area:

$$
cm^2+cm^2+\cdots+cm^2=cm^2
$$

provided the entries are quantities of the same dimension.

This distinction must be preserved throughout the Laegna tables.

---

# 5. Products of relational units

| Relational structure | Number of entries | Unit per entry | Product of all entries |
|---|---:|---|---|
| $3\times3$ | 9 | $cm^2$ | $cm^{18}$ |
| $4\times4$ | 16 | $cm^2$ | $cm^{32}$ |
| $4\times16$ | 64 | $cm^2$ | $cm^{128}$ |

The general formula is:

$$
U_{\mathrm{product}}=(U_{\mathrm{entry}})^N
$$

where $N$ is the number of entries.

For area-valued entries:

$$
U_{\mathrm{product}}=(cm^2)^N=cm^{2N}
$$

This is a possible higher-order dimensional construction, but it is not equivalent to merely counting the entries.

---

# 6. Temporal relational structures

If time is represented directly in seconds, the temporal coordinate has units of seconds.

| Structure | Number of components | Unit per component | Product of components |
|---|---:|---|---|
| One temporal coordinate | 1 | s | s |
| Three temporal coordinates | 3 | s | $s^3$ |
| Four temporal coordinates | 4 | s | $s^4$ |
| $3\times3$ temporal relations | 9 | $s^2$ | $s^{18}$ |
| $4\times4$ temporal relations | 16 | $s^2$ | $s^{32}$ |

However, relativistic spacetime can express time as a length coordinate:

$$
x_0=ct
$$

Then:

$$
[ct]=cm
$$

and:

$$
[(ct)^2]=cm^2
$$

This makes the spatial and temporal coordinate components dimensionally comparable.

The conversion is through the speed of light:

$$
c=299792458\ \mathrm{m/s}
$$

The physical meaning of a spacetime coordinate remains different from that of an ordinary spatial coordinate, even when both are expressed in length units.

---

# 7. Relative basic ranks: first-order octave scale

The following tables use the first-order rank structure from `64g_tables.md`.

The basic scale factor is:

$$
F(n)=2^n
$$

The spatial and temporal coordinates are:

$$
L_n=\ell_P2^n
$$

$$
T_n=t_P2^n
$$

The relative factors are dimensionless:

$$
F_L(n)=\frac{L_n}{\ell_P}=2^n
$$

$$
F_T(n)=\frac{T_n}{t_P}=2^n
$$

Therefore:

$$
\frac{L_n}{T_n}=\frac{\ell_P}{t_P}=c
$$

The same relative rank applies to space and time.

## 7.1 Positive and negative positions

The negative position is the reciprocal of the corresponding positive position:

$$
F(-n)=2^{-n}=\frac{1}{2^n}
$$

| Rank | Positive factor | Negative factor | Reciprocal relation |
|---:|---:|---:|---|
| 1 | 2 | $1/2$ | $2\times1/2=1$ |
| 2 | 4 | $1/4$ | $4\times1/4=1$ |
| 3 | 8 | $1/8$ | $8\times1/8=1$ |
| 4 | 16 | $1/16$ | $16\times1/16=1$ |
| 8 | 256 | $1/256$ | $256\times1/256=1$ |
| 16 | 65536 | $1/65536$ | $65536\times1/65536=1$ |

The two sides are symmetrical around the Planck reference:

$$
2^n\times2^{-n}=1
$$

---

# 8. Relative linear, area and volume ranks

The first-order scale generates three basic dimensional projections.

## Linear scale

$$
F_{1D}(n)=2^n
$$

## Area scale

$$
F_{2D}(n)=2^{2n}=4^n
$$

## Volume scale

$$
F_{3D}(n)=2^{3n}=8^n
$$

The dimensional quantities are:

$$
L_n=\ell_P2^n
$$

$$
A_n=\ell_P^2 4^n
$$

$$
V_n=\ell_P^3 8^n
$$

The units are respectively:

- Length: $m$
- Area: $m^2$
- Volume: $m^3$

The relative factors are dimensionless.

| Rank $n$ | Linear $2^n$ | Area $4^n$ | Volume $8^n$ |
|---:|---:|---:|---:|
| -16 | $1/65536$ | $1/4294967296$ | $1/281474976710656$ |
| -8 | $1/256$ | $1/65536$ | $1/16777216$ |
| -4 | $1/16$ | $1/256$ | $1/4096$ |
| -3 | $1/8$ | $1/64$ | $1/512$ |
| -2 | $1/4$ | $1/16$ | $1/64$ |
| -1 | $1/2$ | $1/4$ | $1/8$ |
| 0 | 1 | 1 | 1 |
| +1 | 2 | 4 | 8 |
| +2 | 4 | 16 | 64 |
| +3 | 8 | 64 | 512 |
| +4 | 16 | 256 | 4096 |
| +8 | 256 | 65536 | 16777216 |
| +16 | 65536 | 4294967296 | 281474976710656 |

This is the basic relative dimensional rank table.

It describes how the same octave position projects into one, two or three spatial dimensions.

---

# 9. Inverse dimensional ranks

The inverse length, inverse area and inverse volume factors are:

$$
F_{-1D}(n)=2^{-n}
$$

$$
F_{-2D}(n)=4^{-n}
$$

$$
F_{-3D}(n)=8^{-n}
$$

The corresponding dimensional quantities are:

$$
K_{1D}(n)=\frac{1}{L_n}
=\ell_P^{-1}2^{-n}
$$

$$
K_{2D}(n)=\frac{1}{L_n^2}
=\ell_P^{-2}4^{-n}
$$

$$
K_{3D}(n)=\frac{1}{L_n^3}
=\ell_P^{-3}8^{-n}
$$

| Rank $n$ | Inverse length $2^{-n}$ | Inverse area $4^{-n}$ | Inverse volume $8^{-n}$ |
|---:|---:|---:|---:|
| -16 | 65536 | 4294967296 | 281474976710656 |
| -8 | 256 | 65536 | 16777216 |
| -4 | 16 | 256 | 4096 |
| -3 | 8 | 64 | 512 |
| -2 | 4 | 16 | 64 |
| -1 | 2 | 4 | 8 |
| 0 | 1 | 1 | 1 |
| +1 | $1/2$ | $1/4$ | $1/8$ |
| +2 | $1/4$ | $1/16$ | $1/64$ |
| +3 | $1/8$ | $1/64$ | $1/512$ |
| +4 | $1/16$ | $1/256$ | $1/4096$ |
| +8 | $1/256$ | $1/65536$ | $1/16777216$ |
| +16 | $1/65536$ | $1/4294967296$ | $1/281474976710656$ |

The dimensional units are:

| Inverse projection | Unit |
|---|---|
| Inverse linear scale | $m^{-1}$ |
| Inverse area scale | $m^{-2}$ |
| Inverse volume scale | $m^{-3}$ |

The inverse-square scale is a characteristic inverse-area quantity. It is not automatically a physical curvature scalar.

---

# 10. Relative space-time rank table

Because the Planck length and Planck time satisfy:

$$
\ell_P=ct_P
$$

the same octave factor applies to both.

| Rank $n$ | Spatial factor | Temporal factor | Spatial coordinate | Temporal coordinate |
|---:|---:|---:|---|---|
| -4 | $1/16$ | $1/16$ | $\ell_P/16$ | $t_P/16$ |
| -3 | $1/8$ | $1/8$ | $\ell_P/8$ | $t_P/8$ |
| -2 | $1/4$ | $1/4$ | $\ell_P/4$ | $t_P/4$ |
| -1 | $1/2$ | $1/2$ | $\ell_P/2$ | $t_P/2$ |
| 0 | 1 | 1 | $\ell_P$ | $t_P$ |
| +1 | 2 | 2 | $2\ell_P$ | $2t_P$ |
| +2 | 4 | 4 | $4\ell_P$ | $4t_P$ |
| +3 | 8 | 8 | $8\ell_P$ | $8t_P$ |
| +4 | 16 | 16 | $16\ell_P$ | $16t_P$ |
| +8 | 256 | 256 | $256\ell_P$ | $256t_P$ |
| +16 | 65536 | 65536 | $65536\ell_P$ | $65536t_P$ |

The relationship remains:

$$
\frac{\ell_P2^n}{t_P2^n}=c
$$

This is a synchronized coordinate-scale relation, not a claim that all objects at these scales move at the speed of light.

---

# 11. Relative area-of-area and volume-of-volume ranks

The dimensional projections can themselves be multiplied.

For area:

$$
A_n=\ell_P^2 4^n
$$

Multiplying area by area gives:

$$
A_n^2=\ell_P^4 16^n
$$

The resulting unit is:

$$
m^4
$$

For volume:

$$
V_n=\ell_P^3 8^n
$$

Multiplying volume by volume gives:

$$
V_n^2=\ell_P^6 64^n
$$

The resulting unit is:

$$
m^6
$$

| Construction | Relative factor | Dimensional unit |
|---|---|---|
| Length | $2^n$ | m |
| Area | $4^n$ | $m^2$ |
| Volume | $8^n$ | $m^3$ |
| Area of area | $16^n$ | $m^4$ |
| Area × volume | $32^n$ | $m^5$ |
| Volume of volume | $64^n$ | $m^6$ |

The corresponding negative ranks are reciprocal:

$$
16^{-n}=\frac{1}{16^n}
$$

$$
32^{-n}=\frac{1}{32^n}
$$

$$
64^{-n}=\frac{1}{64^n}
$$

This extends the basic dimensional rank system beyond the familiar 1D, 2D and 3D projections.

---

# 12. The 3, 4, 9, 16 and 64 correspondence

The dimensional and relational structures can now be compared with the relative unit system.

| Value | Construction | Possible structural meaning | Unit interpretation |
|---:|---|---|---|
| 3 | Three coordinates | Spatial dimensions | Three length coordinates |
| 4 | $3+1$ | Spacetime coordinates | Four length-valued coordinates when time is expressed as $ct$ |
| 9 | $3\times3$ | Spatial R-space | Nine area-valued entries |
| 16 | $4\times4$ | Spacetime R-space | Sixteen area-valued entries |
| 64 | $4\times16$ | Higher relational structure | Depends on the definition of its entries |

The exponent-linearized values can be represented as:

$$
10^4=10000
$$

$$
10^9=1000000000
$$

$$
10^{16}=10000000000000000
$$

These are numerical scale constructions, not dimensional units.

The number of entries in a matrix does not itself give the physical dimension of its entries.

For example:

$$
3\times3=9
$$

counts nine entries, while:

$$
(cm^2)^9=cm^{18}
$$

is the product of nine area-valued quantities.

Those are different operations.

---

# 13. Relative rank symmetry

The central symmetry of the first-order scale is:

$$
2^n2^{-n}=1
$$

For area:

$$
4^n4^{-n}=1
$$

For volume:

$$
8^n8^{-n}=1
$$

For area of area:

$$
16^n16^{-n}=1
$$

For volume of volume:

$$
64^n64^{-n}=1
$$

The same relationship applies to the physical quantities after normalization:

$$
\frac{L_nL_{-n}}{\ell_P^2}=1
$$

$$
\frac{A_nA_{-n}}{\ell_P^4}=1
$$

$$
\frac{V_nV_{-n}}{\ell_P^6}=1
$$

This means that opposite relative ranks have a constant normalized product.

The absolute dimensional products retain the appropriate reference-unit powers.

---

# 14. Logarithmic interpretation

Let the linear relative scale be:

$$
F=2^n
$$

Then:

$$
n=\log_2(F)
$$

For area:

$$
F_{2D}=4^n=2^{2n}
$$

Therefore:

$$
\log_2(F_{2D})=2n
$$

For volume:

$$
F_{3D}=8^n=2^{3n}
$$

Therefore:

$$
\log_2(F_{3D})=3n
$$

The inverse side simply changes the sign:

$$
\log_2(F^{-1})=-\log_2(F)
$$

This is the relationship between forward and external ranks.

| Projection | Forward logarithmic rank | Inverse logarithmic rank |
|---|---:|---:|
| Linear | $n$ | $-n$ |
| Area | $2n$ | $-2n$ |
| Volume | $3n$ | $-3n$ |
| Area of area | $4n$ | $-4n$ |
| Area × volume | $5n$ | $-5n$ |
| Volume of volume | $6n$ | $-6n$ |

Thus, the dimensional exponent and the logarithmic rank are connected directly.

---

# 15. Final unified table

| Rank construction | Forward factor | Inverse factor | Forward unit | Inverse unit |
|---|---|---|---|---|
| Linear | $2^n$ | $2^{-n}$ | m | $m^{-1}$ |
| Area | $4^n$ | $4^{-n}$ | $m^2$ | $m^{-2}$ |
| Volume | $8^n$ | $8^{-n}$ | $m^3$ | $m^{-3}$ |
| Area of area | $16^n$ | $16^{-n}$ | $m^4$ | $m^{-4}$ |
| Area × volume | $32^n$ | $32^{-n}$ | $m^5$ | $m^{-5}$ |
| Volume of volume | $64^n$ | $64^{-n}$ | $m^6$ | $m^{-6}$ |
| Time | $2^n$ | $2^{-n}$ | s | $s^{-1}$ |
| Time squared | $4^n$ | $4^{-n}$ | $s^2$ | $s^{-2}$ |
| Time cubed | $8^n$ | $8^{-n}$ | $s^3$ | $s^{-3}$ |
| Space-time | $2^n$ | $2^{-n}$ | m·s | $m^{-1}s^{-1}$ |

The factors in this table are relative scale factors. The units identify the dimensions of the quantities being scaled.

---

# 16. Final principle

The Laegna scale system should preserve three separate but connected structures:

1. **Rank:** the relative position $n$ and its scale factor.
2. **Dimensionality:** whether the quantity is length, area, volume, time or a compound dimension.
3. **Direction:** whether the scale is forward or reciprocal.

The general relative dimensional scale is:

$$
F_D(n)=2^{Dn}
$$

Its inverse is:

$$
F_D(-n)=2^{-Dn}
$$

For a physical reference unit $U_0$:

$$
U_D(n)=U_0^D2^{Dn}
$$

and:

$$
U_D(-n)=U_0^D2^{-Dn}
$$

Therefore:

$$
U_D(n)U_D(-n)=U_0^{2D}
$$

The normalized product is always one.

This gives a unified mathematical foundation for linear, area, volume, higher compound units and their inverse counterparts.

The positive and negative ranks are not unrelated systems. They are opposite orientations of the same relative scale.

---

# Tables for Code, Automation, AI.

***ChatGPT.***

---

# 17. Laegna Machine-Readable Data Model
## JSON, computational definitions, rank generation and AI-readable relations

---

# 17.1 Purpose

This section defines a machine-readable representation of the Laegna dimensional and relative-rank system.

The data is designed for:

- Python and numerical computation.
- JavaScript and browser-based calculators.
- JSON databases and APIs.
- AI-assisted interpretation and retrieval.
- Automatic generation of rank tables.
- Dimensional consistency checks.
- Forward and inverse scale transformations.
- Relational matrices and higher-order projections.
- Future integration with LaeGOS.

The existing rank tables are the reference for the established rank sequence:

[64g_tables.md](https://github.com/tambetvali/LaeGOS-Alpha/blob/main/LaeGOS-Skydrive/DataLib/64g_tables.md)

This section adds a complementary relative representation: positive and negative rank factors, normalized units, dimensional powers and explicit transformation rules.

The JSON definitions below are a proposed computational schema. They should be validated against the canonical source tables before being treated as a synchronized data export.

---

# 17.2 Core data principles

The model distinguishes five different objects:

| Object | Example | Meaning |
|---|---|---|
| Rank | $n=3$ | Position in the scale |
| Relative factor | $2^3=8$ | Dimensionless multiplier |
| Physical quantity | $8\ell_P$ | Reference unit multiplied by factor |
| Dimensional unit | $m^2$ | Physical dimension |
| Relational count | $3\times3=9$ | Number of matrix positions |

These objects must not be merged into one numerical field.

For example:

$$
3\times3=9
$$

means nine matrix positions.

If each position contains an area-valued quantity:

$$
9\text{ entries of }cm^2
$$

The entries do not automatically become:

$$
cm^{18}
$$

Only multiplication of all nine entries produces that unit:

$$
(cm^2)^9=cm^{18}
$$

The data model therefore stores the entry count and the entry unit separately.

---

# 17.3 Canonical JSON structure

The following object defines the main system.

~~~json
{
  "system": {
    "name": "Laegna Dimensional and Relative Rank System",
    "schema_version": "1.0.0",
    "document": "64h",
    "language": "en",
    "status": "proposed_computational_schema",
    "reference_rank_document": "64g_tables.md",
    "rank_base": 2,
    "default_relative_reference": 1,
    "principles": [
      "rank_is_not_a_unit",
      "relative_factor_is_dimensionless",
      "physical_quantity_requires_reference_unit",
      "matrix_entry_count_is_not_dimensional_power",
      "inverse_rank_is_negative_rank",
      "physical_interpretations_require_separate_validation"
    ]
  },
  "coordinate_system": {
    "spatial_dimensions": 3,
    "temporal_dimensions": 1,
    "spacetime_coordinates": 4,
    "spatial_coordinates": ["x", "y", "z"],
    "spacetime_coordinates": ["ct", "x", "y", "z"],
    "time_conversion": "ct",
    "light_speed_unit": "m/s"
  },
  "reference_constants": {
    "speed_of_light": {
      "symbol": "c",
      "value": 299792458,
      "unit": "m/s",
      "exact": true
    },
    "planck_length": {
      "symbol": "l_P",
      "value": 1.616255e-35,
      "unit": "m",
      "exact": false
    },
    "planck_time": {
      "symbol": "t_P",
      "value": 5.391247e-44,
      "unit": "s",
      "exact": false
    },
    "planck_length_time_relation": {
      "formula": "l_P = c * t_P",
      "type": "physical_reference_relation"
    }
  },
  "rank_models": {
    "linear": {
      "formula": "2^n",
      "unit_power": 1
    },
    "area": {
      "formula": "4^n",
      "unit_power": 2
    },
    "volume": {
      "formula": "8^n",
      "unit_power": 3
    },
    "fourth_order": {
      "formula": "16^n",
      "unit_power": 4
    },
    "fifth_order": {
      "formula": "32^n",
      "unit_power": 5
    },
    "sixth_order": {
      "formula": "64^n",
      "unit_power": 6
    }
  },
  "inverse_rule": {
    "formula": "factor(-n) = 1 / factor(n)",
    "logarithmic_rule": "log2(inverse_factor) = -log2(forward_factor)",
    "involution": "inverse(inverse(x)) = x"
  }
}
~~~

The numerical Planck constants above are rounded reference values. A production implementation should store their source, precision and CODATA version separately.

---

# 17.4 Unit registry

A unit should be represented as a combination of base dimensions rather than as an isolated string.

Use the dimension vector:

$$
\mathbf d=(L,T,M)
$$

where:

- $L$ is length.
- $T$ is time.
- $M$ is mass.

For example:

$$
cm^2\rightarrow(2,0,0)
$$

$$
s^{-1}\rightarrow(0,-1,0)
$$

$$
cm\cdot s\rightarrow(1,1,0)
$$

The numerical conversion factor is stored separately from the dimensional vector.

~~~json
{
  "base_dimensions": {
    "length": "L",
    "time": "T",
    "mass": "M"
  },
  "units": {
    "m": {
      "dimension": [1, 0, 0],
      "scale_to_si": 1
    },
    "cm": {
      "dimension": [1, 0, 0],
      "scale_to_si": 0.01
    },
    "km": {
      "dimension": [1, 0, 0],
      "scale_to_si": 1000
    },
    "s": {
      "dimension": [0, 1, 0],
      "scale_to_si": 1
    },
    "kg": {
      "dimension": [0, 0, 1],
      "scale_to_si": 1
    },
    "Hz": {
      "dimension": [0, -1, 0],
      "scale_to_si": 1
    },
    "N": {
      "dimension": [1, -2, 1],
      "scale_to_si": 1
    },
    "J": {
      "dimension": [2, -2, 1],
      "scale_to_si": 1
    }
  },
  "derived_units": {
    "area": {
      "dimension": [2, 0, 0],
      "example": "cm^2"
    },
    "volume": {
      "dimension": [3, 0, 0],
      "example": "cm^3"
    },
    "inverse_length": {
      "dimension": [-1, 0, 0],
      "example": "m^-1"
    },
    "inverse_area": {
      "dimension": [-2, 0, 0],
      "example": "m^-2"
    },
    "inverse_volume": {
      "dimension": [-3, 0, 0],
      "example": "m^-3"
    },
    "space_time": {
      "dimension": [1, 1, 0],
      "example": "m*s"
    }
  }
}
~~~

The dimension vector is more reliable for software than attempting to infer dimensions from arbitrary unit strings.

For example, the software can establish that:

$$
cm^2\times cm^2=cm^4
$$

without having to understand the human wording "area of area".

---

# 17.5 Unit algebra rules

A computational system should support the following operations.

~~~json
{
  "unit_operations": {
    "multiply": {
      "dimension_rule": "add_exponents",
      "example": {
        "left": [2, 0, 0],
        "right": [2, 0, 0],
        "result": [4, 0, 0]
      }
    },
    "divide": {
      "dimension_rule": "subtract_exponents",
      "example": {
        "left": [3, 0, 0],
        "right": [1, 0, 0],
        "result": [2, 0, 0]
      }
    },
    "power": {
      "dimension_rule": "multiply_exponents",
      "example": {
        "input": [2, 0, 0],
        "power": 2,
        "result": [4, 0, 0]
      }
    },
    "inverse": {
      "dimension_rule": "negate_exponents",
      "example": {
        "input": [2, 0, 0],
        "result": [-2, 0, 0]
      }
    },
    "addition": {
      "dimension_rule": "dimensions_must_match",
      "example": {
        "left": [2, 0, 0],
        "right": [2, 0, 0],
        "allowed": true
      }
    }
  }
}
~~~

Important: addition of unlike dimensions is invalid.

For example:

$$
cm^2+cm^2
$$

is dimensionally valid.

But:

$$
cm^2+cm^3
$$

is not.

---

# 17.6 Relative rank records

The basic rank factor is:

$$
F_D(n)=2^{Dn}
$$

where:

- $n$ is the rank.
- $D$ is the dimensional power.
- $F_D(n)$ is dimensionless.

The negative rank gives:

$$
F_D(-n)=2^{-Dn}
$$

The normalized forward and inverse product is:

$$
F_D(n)F_D(-n)=1
$$

The following JSON contains representative records. The full table should be generated from the formulas rather than manually maintained.

~~~json
{
  "rank_records": [
    {
      "rank": -4,
      "linear": 0.0625,
      "area": 0.00390625,
      "volume": 0.000244140625
    },
    {
      "rank": -3,
      "linear": 0.125,
      "area": 0.015625,
      "volume": 0.001953125
    },
    {
      "rank": -2,
      "linear": 0.25,
      "area": 0.0625,
      "volume": 0.015625
    },
    {
      "rank": -1,
      "linear": 0.5,
      "area": 0.25,
      "volume": 0.125
    },
    {
      "rank": 0,
      "linear": 1,
      "area": 1,
      "volume": 1
    },
    {
      "rank": 1,
      "linear": 2,
      "area": 4,
      "volume": 8
    },
    {
      "rank": 2,
      "linear": 4,
      "area": 16,
      "volume": 64
    },
    {
      "rank": 3,
      "linear": 8,
      "area": 64,
      "volume": 512
    },
    {
      "rank": 4,
      "linear": 16,
      "area": 256,
      "volume": 4096
    }
  ]
}
~~~

These are relative factors, not physical measurements.

For example, at rank 3:

$$
F_1(3)=8
$$

$$
F_2(3)=64
$$

$$
F_3(3)=512
$$

With a Planck reference, the corresponding quantities are:

$$
L_3=8\ell_P
$$

$$
A_3=64\ell_P^2
$$

$$
V_3=512\ell_P^3
$$

---

# 17.7 Relative basic ranks in opposite directions

The inverse rank table can be generated automatically.

~~~json
{
  "rank_symmetry": {
    "center": 0,
    "forward_direction": "positive_rank",
    "inverse_direction": "negative_rank",
    "rule": "F_D(-n) = 1 / F_D(n)",
    "examples": [
      {
        "rank": 1,
        "forward": 2,
        "inverse": 0.5
      },
      {
        "rank": 2,
        "forward": 4,
        "inverse": 0.25
      },
      {
        "rank": 3,
        "forward": 8,
        "inverse": 0.125
      },
      {
        "rank": 4,
        "forward": 16,
        "inverse": 0.0625
      }
    ]
  }
}
~~~

The same rule applies to every dimensional projection.

For example:

$$
4^3=64
$$

and:

$$
4^{-3}=\frac{1}{64}
$$

Therefore:

$$
4^3\times4^{-3}=1
$$

The inverse direction is a relative scale, not automatically a physical inverse-area or inverse-volume observable. The actual unit must be included.

---

# 17.8 Physical quantities and reference units

A relative factor becomes a physical quantity only when multiplied by a reference quantity.

The general formula is:

$$
Q_D(n)=Q_{D,0}\times2^{Dn}
$$

where $Q_{D,0}$ is the reference quantity with the correct dimension.

For length:

$$
L_n=\ell_P2^n
$$

For area:

$$
A_n=\ell_P^2 4^n
$$

For volume:

$$
V_n=\ell_P^3 8^n
$$

For time:

$$
t_n=t_P2^n
$$

For inverse length:

$$
K_n=\ell_P^{-1}2^{-n}
$$

For inverse area:

$$
K_{2,n}=\ell_P^{-2}4^{-n}
$$

For inverse volume:

$$
K_{3,n}=\ell_P^{-3}8^{-n}
$$

~~~json
{
  "physical_rank_models": {
    "length": {
      "reference": "l_P",
      "reference_unit": "m",
      "formula": "l_P * 2^n",
      "dimension": [1, 0, 0]
    },
    "area": {
      "reference": "l_P^2",
      "reference_unit": "m^2",
      "formula": "l_P^2 * 4^n",
      "dimension": [2, 0, 0]
    },
    "volume": {
      "reference": "l_P^3",
      "reference_unit": "m^3",
      "formula": "l_P^3 * 8^n",
      "dimension": [3, 0, 0]
    },
    "time": {
      "reference": "t_P",
      "reference_unit": "s",
      "formula": "t_P * 2^n",
      "dimension": [0, 1, 0]
    },
    "inverse_length": {
      "reference": "1/l_P",
      "reference_unit": "m^-1",
      "formula": "l_P^-1 * 2^-n",
      "dimension": [-1, 0, 0]
    },
    "inverse_area": {
      "reference": "1/l_P^2",
      "reference_unit": "m^-2",
      "formula": "l_P^-2 * 4^-n",
      "dimension": [-2, 0, 0]
    },
    "inverse_volume": {
      "reference": "1/l_P^3",
      "reference_unit": "m^-3",
      "formula": "l_P^-3 * 8^-n",
      "dimension": [-3, 0, 0]
    }
  }
}
~~~

---

# 17.9 Relational matrix definitions

A relational matrix is defined by its coordinate vector.

For spatial coordinates:

$$
q_s=(x,y,z)
$$

The spatial relation matrix is:

$$
R_3=q_sq_s^T
$$

For spacetime:

$$
q=(ct,x,y,z)
$$

The spacetime relation matrix is:

$$
R_4=qq^T
$$

The matrix entries are coordinate products.

~~~json
{
  "relational_structures": [
    {
      "id": "spatial_R3",
      "name": "Three-dimensional spatial relational matrix",
      "coordinate_count": 3,
      "matrix_shape": [3, 3],
      "entry_count": 9,
      "coordinate_unit": "m",
      "entry_unit": "m^2",
      "construction": "q * transpose(q)",
      "interpretation_status": "mathematical_construction"
    },
    {
      "id": "spacetime_R4",
      "name": "Four-coordinate spacetime relational matrix",
      "coordinate_count": 4,
      "matrix_shape": [4, 4],
      "entry_count": 16,
      "coordinate_unit": "m",
      "entry_unit": "m^2",
      "construction": "q * transpose(q)",
      "interpretation_status": "mathematical_construction"
    },
    {
      "id": "higher_R64",
      "name": "Four by sixteen higher relational structure",
      "factor_count": 2,
      "factor_sizes": [4, 16],
      "entry_count": 64,
      "entry_unit": null,
      "construction": "4 * 16",
      "interpretation_status": "proposed_structure",
      "requires_definition_of_entry_unit": true
    }
  ]
}
~~~

The 64-position structure deliberately has no assigned unit yet.

Its unit depends on what each position contains.

---

# 17.10 Matrix operations and unit propagation

A matrix's entry count does not determine its dimensional unit.

The following operations have different outcomes.

| Operation | Input | Output |
|---|---|---|
| Matrix construction | 9 coordinate pairs | 9 entries |
| Matrix sum | Entries in $m^2$ | Result in $m^2$ |
| Matrix elementwise product | Two matrices in $m^2$ | Entries in $m^4$ |
| Product of all 9 entries | 9 entries in $m^2$ | $m^{18}$ |
| Product of all 16 entries | 16 entries in $m^2$ | $m^{32}$ |
| Determinant of a 3 × 3 matrix in $m^2$ | 3 rows and columns | $m^6$ |
| Determinant of a 4 × 4 matrix in $m^2$ | 4 rows and columns | $m^8$ |

The determinant rule is:

$$
[\det(A)]=[A]^N
$$

for an $N\times N$ matrix whose entries all have the same unit.

This is another important distinction.

The product of every matrix entry is not the determinant.

For a 3 × 3 matrix:

$$
[\det(R_3)]=(m^2)^3=m^6
$$

For a 4 × 4 matrix:

$$
[\det(R_4)]=(m^2)^4=m^8
$$

However, the particular outer-product matrices $q q^T$ are rank-one matrices when $q$ is nonzero. Their determinants vanish for dimensions greater than one. Their formal determinant unit still follows the dimensional rule, but their numerical determinant is zero.

This is an example of why structural mathematics and physical interpretation need separate fields.

---

# 17.11 Exponent-linearized values

The relational values can be mapped into decimal exponent scales.

Define:

$$
E(k)=10^k
$$

The values are:

| Structure | Exponent | Decimal value |
|---|---:|---:|
| Spacetime coordinates | 4 | 10,000 |
| Spatial R-space | 9 | 1,000,000,000 |
| Spacetime R-space | 16 | 10,000,000,000,000,000 |
| Higher relational structure | 64 | $10^{64}$ |

The corresponding inverse values are:

$$
E(-k)=10^{-k}
$$

~~~json
{
  "exponent_linearization": {
    "base": 10,
    "operation": "10^k",
    "records": [
      {
        "structure": "spacetime_coordinates",
        "exponent": 4,
        "expression": "10^4",
        "decimal": "10000"
      },
      {
        "structure": "spatial_R_space",
        "exponent": 9,
        "expression": "10^9",
        "decimal": "1000000000"
      },
      {
        "structure": "spacetime_R_space",
        "exponent": 16,
        "expression": "10^16",
        "decimal": "10000000000000000"
      },
      {
        "structure": "higher_R64",
        "exponent": 64,
        "expression": "10^64",
        "decimal": null
      }
    ],
    "inverse_rule": "10^(-k)",
    "note": "Exponent-linearized values are numerical representations, not dimensional units."
  }
}
~~~

The 64 exponent is a proposed extension of the relational sequence. It should not be confused with the relative volume factor $64^n$.

These are different operations:

$$
10^{64}\neq64^n
$$

The first is a decimal exponent-linearization of 64.

The second is a rank-dependent relative scale factor.

---

# 17.12 Space-time synchronization

The synchronized Planck references are:

$$
\ell_P=ct_P
$$

Define normalized coordinates:

$$
S=\frac{L}{\ell_P}
$$

$$
T=\frac{t}{t_P}
$$

For a light-travel interval:

$$
L=ct
$$

Therefore:

$$
S=T
$$

The JSON representation is:

~~~json
{
  "space_time_synchronization": {
    "spatial_reference": "l_P",
    "temporal_reference": "t_P",
    "conversion_constant": "c",
    "reference_relation": "l_P = c * t_P",
    "normalized_space": "S = L / l_P",
    "normalized_time": "T = t / t_P",
    "light_path_relation": "L = c * t",
    "normalized_light_path": "S = T",
    "status": "physical_unit_relation"
  }
}
~~~

This synchronization does not mean that all spatial and temporal intervals are equal.

It means that they are equal in normalized Planck coordinates along a light-travel interval.

---

# 17.13 Logarithmic and inverse transformations

For a positive dimensionless scale:

$$
u=\log_2(x)
$$

The inverse transformation is:

$$
x=2^u
$$

The reciprocal is:

$$
x^{-1}=2^{-u}
$$

Therefore:

$$
\log_2(x^{-1})=-u
$$

The inverse operation is a reflection in logarithmic coordinates.

~~~json
{
  "transformations": {
    "logarithmic": {
      "input": "x",
      "output": "u",
      "formula": "u = log2(x)",
      "domain": "x > 0"
    },
    "exponential": {
      "input": "u",
      "output": "x",
      "formula": "x = 2^u"
    },
    "reciprocal": {
      "input": "x",
      "output": "inverse_x",
      "formula": "inverse_x = 1/x",
      "domain": "x != 0"
    },
    "logarithmic_inverse": {
      "formula": "log2(1/x) = -log2(x)"
    },
    "logarithmic_reflection": {
      "formula": "u -> -u"
    },
    "involution": {
      "formula": "inverse(inverse(x)) = x"
    }
  }
}
~~~

These operations should remain separate in implementations:

- `log2(x)` changes representation.
- `1/x` reverses multiplicative scale.
- `-u` reverses logarithmic orientation.
- `2^u` reconstructs the scale.

---

# 17.14 Higher-order exponential scales

The higher-order scale sequence can be represented recursively.

$$
X_1(n)=2^n
$$

$$
X_2(n)=2^{X_1(n)}
$$

$$
X_3(n)=2^{X_2(n)}
$$

$$
X_4(n)=2^{X_3(n)}
$$

The logarithm reduces one order:

$$
\log_2(X_k(n))=X_{k-1}(n)
$$

~~~json
{
  "higher_order_scales": {
    "base": 2,
    "definition": "X_1(n) = 2^n; X_(k+1)(n) = 2^(X_k(n))",
    "levels": [
      {
        "order": 1,
        "formula": "2^n"
      },
      {
        "order": 2,
        "formula": "2^(2^n)"
      },
      {
        "order": 3,
        "formula": "2^(2^(2^n))"
      },
      {
        "order": 4,
        "formula": "2^(2^(2^(2^n)))"
      }
    ],
    "reduction": "log2(X_k(n)) = X_(k-1)(n)",
    "reciprocal": "X_inverse(k,n) = 1 / X_k(n)",
    "status": "mathematical_scale_construction"
  }
}
~~~

For computation, large values should be represented symbolically or through logarithms.

Do not calculate a huge tower directly if the application only needs its logarithm or order.

---

# 17.15 AI-readable concept graph

A knowledge graph can connect the concepts without confusing their roles.

~~~json
{
  "nodes": [
    {
      "id": "space_3d",
      "type": "dimensional_structure",
      "value": 3
    },
    {
      "id": "spacetime_4d",
      "type": "dimensional_structure",
      "value": 4
    },
    {
      "id": "spatial_R9",
      "type": "relational_structure",
      "value": 9
    },
    {
      "id": "spacetime_R16",
      "type": "relational_structure",
      "value": 16
    },
    {
      "id": "higher_R64",
      "type": "relational_structure",
      "value": 64
    },
    {
      "id": "planck_length",
      "type": "reference_quantity",
      "symbol": "l_P",
      "unit": "m"
    },
    {
      "id": "planck_time",
      "type": "reference_quantity",
      "symbol": "t_P",
      "unit": "s"
    },
    {
      "id": "light_speed",
      "type": "physical_constant",
      "symbol": "c",
      "unit": "m/s"
    },
    {
      "id": "inverse_scale",
      "type": "transformation",
      "formula": "1/x"
    }
  ],
  "edges": [
    {
      "from": "space_3d",
      "to": "spacetime_4d",
      "relation": "extended_by_temporal_coordinate",
      "formula": "3 + 1 = 4"
    },
    {
      "from": "space_3d",
      "to": "spatial_R9",
      "relation": "relational_matrix",
      "formula": "3 * 3 = 9"
    },
    {
      "from": "spacetime_4d",
      "to": "spacetime_R16",
      "relation": "relational_matrix",
      "formula": "4 * 4 = 16"
    },
    {
      "from": "spacetime_4d",
      "to": "higher_R64",
      "relation": "combined_relational_projection",
      "formula": "4 * 16 = 64",
      "status": "proposed"
    },
    {
      "from": "planck_length",
      "to": "planck_time",
      "relation": "light_speed_conversion",
      "formula": "l_P = c * t_P"
    },
    {
      "from": "spatial_R9",
      "to": "inverse_scale",
      "relation": "reciprocal",
      "formula": "1/9"
    },
    {
      "from": "spacetime_R16",
      "to": "inverse_scale",
      "relation": "reciprocal",
      "formula": "1/16"
    }
  ]
}
~~~

The graph is suitable for AI retrieval because every relation has:

- A source node.
- A target node.
- A relation type.
- A mathematical expression.
- An optional epistemic status.

An AI system should not infer that every mathematical relation is a physical law.

---

# 17.16 Epistemic status and provenance

Every important claim should carry a status.

Recommended statuses:

| Status | Meaning |
|---|---|
| `established_physics` | Supported by established physical theory |
| `established_mathematics` | Mathematical identity or definition |
| `derived` | Follows from declared definitions |
| `proposed` | Suggested Laegna construction |
| `hypothesis` | Proposed physical interpretation |
| `unverified` | Not yet checked against source data |
| `rejected` | Known to be inconsistent |

Example:

~~~json
{
  "claims": [
    {
      "id": "planck_light_relation",
      "formula": "l_P = c * t_P",
      "status": "established_physics",
      "domain": "planck_units"
    },
    {
      "id": "three_plus_one",
      "formula": "3 + 1 = 4",
      "status": "established_mathematics",
      "domain": "spacetime_coordinates"
    },
    {
      "id": "spatial_R9",
      "formula": "3 * 3 = 9",
      "status": "established_mathematics",
      "interpretation": "spatial_relational_matrix"
    },
    {
      "id": "spacetime_R16",
      "formula": "4 * 4 = 16",
      "status": "established_mathematics",
      "interpretation": "spacetime_relational_matrix"
    },
    {
      "id": "higher_R64",
      "formula": "4 * 16 = 64",
      "status": "proposed",
      "interpretation": "higher_relational_structure"
    },
    {
      "id": "temporal_cubic_projection",
      "formula": "T^3",
      "status": "proposed",
      "interpretation": "temporal_dimensional_projection"
    }
  ]
}
~~~

This allows automated systems to distinguish facts, derivations and hypotheses.

---

# 17.17 Validation rules

The following invariants should be checked automatically.

~~~json
{
  "validation_rules": [
    {
      "id": "rank_reciprocity",
      "formula": "F_D(n) * F_D(-n) = 1",
      "severity": "error"
    },
    {
      "id": "linear_area_consistency",
      "formula": "(2^n)^2 = 4^n",
      "severity": "error"
    },
    {
      "id": "linear_volume_consistency",
      "formula": "(2^n)^3 = 8^n",
      "severity": "error"
    },
    {
      "id": "area_of_area",
      "formula": "(cm^2)^2 = cm^4",
      "severity": "error"
    },
    {
      "id": "matrix_entry_count_3",
      "formula": "3 * 3 = 9",
      "severity": "error"
    },
    {
      "id": "matrix_entry_count_4",
      "formula": "4 * 4 = 16",
      "severity": "error"
    },
    {
      "id": "higher_relational_count",
      "formula": "4 * 16 = 64",
      "severity": "warning",
      "note": "Mathematical construction; physical interpretation is not established."
    },
    {
      "id": "space_time_reference",
      "formula": "l_P = c * t_P",
      "severity": "error",
      "tolerance": "based_on_stored_constant_precision"
    },
    {
      "id": "addition_dimension_match",
      "rule": "addition_requires_equal_dimension_vectors",
      "severity": "error"
    }
  ]
}
~~~

---

# 17.18 Python reference implementation

The following implementation generates relative ranks, inverse ranks and dimensional unit powers.

It uses exact fractions for powers of two whenever possible.

~~~python
from fractions import Fraction
from math import log2


def relative_factor(rank: int, dimension: int = 1) -> Fraction:
    """
    Dimensionless relative rank factor.

    D=1: linear
    D=2: area
    D=3: volume
    """
    exponent = rank * dimension

    if exponent >= 0:
        return Fraction(2 ** exponent, 1)

    return Fraction(1, 2 ** (-exponent))


def rank_record(rank: int) -> dict:
    return {
        "rank": rank,
        "linear": relative_factor(rank, 1),
        "area": relative_factor(rank, 2),
        "volume": relative_factor(rank, 3),
        "fourth_order": relative_factor(rank, 4),
        "fifth_order": relative_factor(rank, 5),
        "sixth_order": relative_factor(rank, 6),
    }


def generate_rank_table(min_rank: int, max_rank: int) -> list:
    return [
        rank_record(rank)
        for rank in range(min_rank, max_rank + 1)
    ]


def reciprocal(value: Fraction) -> Fraction:
    return 1 / value


def dimension_multiply(a: tuple, b: tuple) -> tuple:
    return tuple(x + y for x, y in zip(a, b))


def dimension_power(a: tuple, power: int) -> tuple:
    return tuple(x * power for x in a)


def dimension_inverse(a: tuple) -> tuple:
    return tuple(-x for x in a)


def validate_reciprocity(rank: int, dimension: int) -> bool:
    forward = relative_factor(rank, dimension)
    backward = relative_factor(-rank, dimension)

    return forward * backward == 1


def validate_all():
    for rank in range(-20, 21):
        for dimension in range(1, 7):
            assert validate_reciprocity(rank, dimension)

    assert dimension_multiply(
        (2, 0, 0),
        (2, 0, 0)
    ) == (4, 0, 0)

    assert dimension_power(
        (2, 0, 0),
        2
    ) == (4, 0, 0)

    assert dimension_inverse(
        (2, 0, 0)
    ) == (-2, 0, 0)

    assert 3 * 3 == 9
    assert 4 * 4 == 16
    assert 4 * 16 == 64

    return True


if __name__ == "__main__":
    assert validate_all()

    for record in generate_rank_table(-4, 4):
        print(record)
~~~

The Python implementation deliberately does not calculate physical quantities without their reference units.

For example, `relative_factor(3, 2)` returns 64, but the physical quantity is:

$$
64\ell_P^2
$$

not simply the number 64.

---

# 17.19 Suggested automated outputs

A Laegna data-generation script can produce the following files:

| Output | Purpose |
|---|---|
| `LaegnaUnits.json` | Unit registry and dimensional vectors |
| `LaegnaRanks.json` | Relative rank factors |
| `LaegnaInverseRanks.json` | Reciprocal rank factors |
| `LaegnaRankTables.json` | Generated rank tables |
| `LaegnaRelationalStructures.json` | 3, 4, 9, 16 and 64 structures |
| `LaegnaSpaceTime.json` | Planck synchronization and light conversion |
| `LaegnaTransformations.json` | Logarithmic and inverse operations |
| `LaegnaClaims.json` | Epistemic status and provenance |
| `LaegnaValidation.json` | Test results and consistency checks |

Recommended directory structure:

~~~text
DataRfx/
    LaegnaUnits.json
    LaegnaRanks.json
    LaegnaInverseRanks.json
    LaegnaRankTables.json
    LaegnaRelationalStructures.json
    LaegnaSpaceTime.json
    LaegnaTransformations.json
    LaegnaClaims.json
    LaegnaValidation.json
    schemas/
        LaegnaUnits.schema.json
        LaegnaRanks.schema.json
        LaegnaRelationalStructures.schema.json
~~~

The generated tables should be treated as derived data.

The canonical definitions should be maintained once, and all derived JSON files should be regenerated from those definitions.

This avoids having different files silently develop inconsistent values.

---

# 17.20 AI interpretation instructions

An AI system processing these data should follow these rules:

~~~json
{
  "ai_interpretation_policy": {
    "rules": [
      {
        "id": "preserve_dimensions",
        "instruction": "Never remove physical unit information when transforming a quantity."
      },
      {
        "id": "preserve_rank",
        "instruction": "Treat rank as a scale coordinate, not as a physical unit."
      },
      {
        "id": "separate_counts",
        "instruction": "Distinguish matrix entry counts from products, sums and determinants."
      },
      {
        "id": "respect_reciprocals",
        "instruction": "Generate inverse ranks by reciprocal transformation, not by arbitrary subtraction."
      },
      {
        "id": "preserve_provenance",
        "instruction": "Do not upgrade proposed interpretations into established physical facts."
      },
      {
        "id": "preserve_reference_units",
        "instruction": "A relative factor requires a reference quantity before it becomes a physical measurement."
      },
      {
        "id": "preserve_operation_order",
        "instruction": "Do not assume that matrix construction, exponentiation and dimensional multiplication are interchangeable."
      },
      {
        "id": "check_logarithms",
        "instruction": "Apply logarithmic transformations only to positive dimensionless numerical ratios, or to quantities after normalization."
      }
    ],
    "preferred_output": {
      "include_formula": true,
      "include_unit": true,
      "include_rank": true,
      "include_inverse": true,
      "include_interpretation_status": true
    }
  }
}
~~~

For example, if asked:

"What is the inverse of rank 3 area?"

The AI should return:

$$
F_2(3)=4^3=64
$$

$$
F_2(-3)=4^{-3}=\frac{1}{64}
$$

If the reference area is $\ell_P^2$:

$$
A_3=64\ell_P^2
$$

The inverse relative factor is $1/64$, while the inverse physical unit is $m^{-2}$.

The distinction must remain explicit.

---

# 17.21 Final computational principle

The whole system can be expressed through a small set of general operations.

## Relative scale

$$
F_D(n)=2^{Dn}
$$

## Physical quantity

$$
Q_D(n)=Q_{D,0}F_D(n)
$$

## Reciprocal scale

$$
F_D(-n)=\frac{1}{F_D(n)}
$$

## Dimensional multiplication

$$
\mathbf d(A\times B)=\mathbf d(A)+\mathbf d(B)
$$

## Dimensional exponentiation

$$
\mathbf d(A^k)=k\mathbf d(A)
$$

## Logarithmic rank

$$
n=\frac{\log_2(F_D)}{D}
$$

## Relational matrix size

$$
N=D^2
$$

for a square $D\times D$ matrix.

## Higher relational construction

$$
N=4\times16=64
$$

The last construction remains a proposed structural extension until its entries and operations are explicitly defined.

---

# 17.22 Closing: one system, multiple representations

Laegna should not need separate unrelated mathematics for:

- Spatial dimensions.
- Temporal dimensions.
- Area and volume.
- Higher-order dimensional units.
- Inverse units.
- Relative ranks.
- Relational matrices.
- Exponent-linearized scales.
- Logarithmic and exponential transformations.

They can be represented through a common computational framework.

The central distinction is:

**Rank describes where a scale is. Unit describes what is being measured. Dimensional power describes how the quantity is constructed. Relational structure describes how components are connected.**

The positive and negative ranks form reciprocal branches.

The spatial and temporal coordinates can be synchronized through light.

The dimensional units can be multiplied, inverted and projected using explicit algebra.

The relational structures can be stored as matrices and graphs.

The exponent-linearized values can be generated from their declared numerical construction.

Finally, AI systems can read the definitions, reproduce the tables, validate the identities and explore new relationships without confusing mathematical possibilities with established physical observations.

This is the computational foundation for extending the Laegna rank system into an automatable dimensional and relational scale model.
