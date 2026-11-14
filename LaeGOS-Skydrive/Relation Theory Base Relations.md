# Curvature-Linearized Fractal Scales
## Repeating Planck-to-Cosmological Measurements Through Reciprocal Geometry

---

## 1. The new measurement scope

We introduce two reference scales:

- Lower reference: $L_{\min}=0.25$ light-years.
- Upper reference: $L_{\max}=16,000,000,000$ light-years.

The first reference establishes the local linear measurement:

$$
1\text{ ly}=4\text{ local units}
$$

$$
0.25\text{ ly}=1\text{ local unit}
$$

The second establishes the curvature measurement:

$$
C(0.25\text{ ly})=4
$$

$$
C(16\text{ billion ly})=1
$$

These are two different coordinate descriptions of the same interval.

The first measures expansion. The second measures curvature relative to a cosmological reference.

The total ratio is:

$$
R=\frac{L_{\max}}{L_{\min}}
=\frac{16\times10^9}{0.25}
=64\times10^9
$$

In base 2:

$$
\log_2(R)\approx35.89735
$$

In base 4:

$$
\log_4(R)\approx17.94868
$$

Thus, the entire interval contains approximately 35.9 binary octaves or 17.95 base-4 octaves.

---

## 2. First coordinate: repeat the linear measurement

Define the local linearized coordinate:

$$
Q(L)=\frac{L}{0.25\text{ ly}}
$$

This gives:

| Physical scale | Local coordinate |
|---|---:|
| 0.25 ly | 1 |
| 1 ly | 4 |
| 4 ly | 16 |
| 16 ly | 64 |
| 64 ly | 256 |
| 256 ly | 1,024 |
| 1,024 ly | 4,096 |
| 16 billion ly | 64 billion |

The important property is that every fourfold expansion produces the same linearized result.

$$
Q(4L)=4Q(L)
$$

This is the first repetition rule.

The physical distances change, but the normalized mathematical relationship remains unchanged.

This allows us to repeat the same measurement at higher scales without changing its fundamental structure.

---

## 3. Second coordinate: curvature normalization

Now we reverse the reference direction.

Instead of measuring how large a distance becomes relative to the lower reference, we measure its curvature index relative to the upper reference.

We want:

$$
C(L_{\max})=1
$$

$$
C(L_{\min})=4
$$

The simplest power-law mapping satisfying these two conditions is:

$$
C(L)=\left(\frac{L_{\max}}{L}\right)^\alpha
$$

where:

$$
\alpha=
\frac{\ln4}{\ln(L_{\max}/L_{\min})}
$$

Numerically:

$$
\boxed{\alpha\approx0.0557144}
$$

Therefore:

$$
\boxed{
C(L)=
\left(\frac{16\times10^9}{L}\right)^{0.0557144}
}
$$

Here, $L$ is expressed in light-years.

The resulting curvature measurements are:

| Physical scale | Local coordinate Q | Curvature C |
|---|---:|---:|
| 0.25 ly | 1 | 4.000 |
| 1 ly | 4 | 3.703 |
| 4 ly | 16 | 3.548 |
| 16 ly | 64 | 3.399 |
| 64 ly | 256 | 3.257 |
| 256 ly | 1,024 | 3.122 |
| 1,024 ly | 4,096 | 2.992 |
| 16 billion ly | 64 billion | 1.000 |

Notice something important:

The local coordinate increases exponentially with repeated multiplication, while the curvature index decreases through a power-law transformation.

This is how the same physical interval can be viewed as either an expanding linear system or a contracting curvature system.

The exponent is small because the cosmological interval is enormous.

---

## 4. Reciprocal symmetry and the geometric midpoint

The two endpoints are not equally distant in ordinary linear coordinates.

However, they are equally distant in logarithmic coordinates if we use their geometric midpoint.

Define:

$$
L_*=\sqrt{L_{\min}L_{\max}}
$$

$$
\boxed{L_*=63,245.55\text{ ly}}
$$

Now define:

$$
\xi(L)=\log_2\left(\frac{L}{L_*}\right)
$$

This gives:

$$
\xi(L_{\min})=-17.94868
$$

$$
\xi(L_*)=0
$$

$$
\xi(L_{\max})=+17.94868
$$

This is a particularly important result.

The lower and upper boundaries are now mathematically symmetric.

For every distance $L$, define its reciprocal partner:

$$
L'=\frac{L_*^2}{L}
$$

Then:

$$
\boxed{\xi(L')=-\xi(L)}
$$

The two scales have opposite logarithmic positions but identical absolute displacement.

This creates a reciprocal geometry.

The midpoint is the neutral reference, while the lower and upper directions represent opposite orientations of scale.

### Curvature magnitude

We can also define a symmetric curvature magnitude:

$$
K_s(L)=
\exp\left(
\alpha\left|\ln\frac{L}{L_*}\right|
\right)
$$

At the midpoint:

$$
K_s(L_*)=1
$$

At both boundaries:

$$
K_s(L_{\min})=K_s(L_{\max})=2
$$

This distinction matters:

- The directional curvature coordinate C distinguishes the lower and upper boundaries.
- The symmetric curvature magnitude measures their equal displacement from the midpoint.

Consequently, the two boundaries can have different directional values while possessing the same absolute curvature displacement.

---

## 5. Exponent-linearized coordinates

Ordinary logarithmic coordinates already make multiplicative expansion linear.

But we can go further.

Let:

$$
D=\frac{L}{L_{\min}}
$$

Define the exponent-linearized coordinate:

$$
V(L)=\log_2(\log_2(1+D))
$$

The addition of 1 regularizes the lower reference, giving it a finite coordinate.

This is a coordinate transformation, not a new physical distance.

It gives:

| Physical scale | D | V |
|---|---:|---:|
| 0.25 ly | 1 | 0 |
| 1 ly | 4 | 1.2153 |
| 63,245.55 ly | 252,982 | 4.1658 |
| 16 billion ly | 64 billion | 5.1658 |

The striking property is that the original 64-billion-fold expansion occupies only approximately 5.17 exponent-linearized coordinate units.

We have compressed a huge multiplicative interval into a relatively small numerical domain.

This is useful for examining the higher-integral levels of the system.

### Why this matters

In ordinary coordinates, a difference of billions of light-years dominates the representation.

In logarithmic coordinates, multiplicative ratios become additive differences.

In exponent-linearized coordinates, differences between orders of magnitude become compressed once again.

We therefore obtain three complementary descriptions:

1. Linear: measures proportional expansion.
2. Logarithmic: measures multiplicative rank.
3. Exponent-linearized: measures hierarchical rank compression.

These are not interchangeable measurements. They are different coordinate systems over the same underlying scale hierarchy.

---

## 6. Repeating the measurement at higher integral levels

The original measurement is:

$$
0.25\rightarrow1\rightarrow4
$$

The same pattern can be repeated:

$$
1\rightarrow4\rightarrow16\rightarrow64
$$

Each subsequent step has the same multiplicative relationship.

For a repeated integral transformation:

$$
Q_n=4^nQ_0
$$

The logarithmic coordinate becomes:

$$
q_n=\log_4 Q_n
$$

Therefore:

$$
q_n=n+\log_4Q_0
$$

The exponential sequence becomes a linear sequence in the logarithmic representation.

This is the central principle of the repetition:

**Higher-integral expansion can reproduce lower-scale linear behaviour when observed in the corresponding normalized coordinate system.**

The same principle works in reverse.

A decreasing curvature coordinate can be transformed into an increasing logarithmic coordinate.

The direction of measurement changes, but the underlying ratios remain available.

---

## 7. What happens at the observable boundaries?

The 16-billion-light-year boundary should be treated as a chosen cosmological reference, not automatically as the edge of the observable universe.

For comparison, consider an approximate present-day observable-universe comoving radius of 46.5 billion light-years.

Using the same curvature mapping:

$$
C(46.5\times10^9) = \left( \frac{16}{46.5} \right)^{0.0557144}
$$

$$
\boxed{C\approx0.9423}
$$

The corresponding exponent-linearized coordinate is:

$$
V(46.5\times10^9)\approx5.2264
$$

This demonstrates that the same coordinate transformation can be extended beyond the selected 16-billion-light-year reference.

There is no mathematical discontinuity at that boundary.

However, the cosmological interpretation changes: comoving distance, particle-horizon distance, light-travel distance and proper distance are different quantities. They must not be substituted for one another without a cosmological model.

### The important distinction

A coordinate system can extend beyond an observational boundary even when the corresponding physical observations cannot.

The mathematical continuation does not establish that we can observe beyond the particle horizon.

It establishes that the coordinate representation itself does not need to stop there.

---

## 8. The Planck boundary and the physical interpretation

There is another important distinction between the proposed local unit and the actual Planck length.

The actual Planck length is approximately:

$$
l_P=1.6163\times10^{-35}\text{ m}
$$

A light-year contains approximately:

$$
\frac{1\text{ ly}}{l_P}
\approx5.85\times10^{50}
$$

Planck lengths.

Therefore, four actual Planck lengths are not one light-year.

Your four-unit relationship should be interpreted as a Laegna normalized rank correspondence.

This distinction is useful because it allows two separate investigations:

- Physical measurements using actual Planck and cosmological units.
- Structural measurements using the proposed Laegna scale transformation.

We can compare their resulting ratios without confusing their physical dimensions.

At the Planck boundary, actual quantum-gravity physics becomes relevant. At cosmological boundaries, relativistic geometry and cosmological expansion become relevant.

Neither boundary automatically validates the proposed power-law curvature index as a physical curvature measurement.

---

## 9. New interpretation: three views of the same universe

The complete mapping now has three complementary views.

### A. Internal view — linear repetition

$$
Q(L)=\frac{L}{0.25}
$$

The lower reference is the unit.

Higher scales are repetitions of the same linear relationship.

This is the natural view for examining integral expansion.

### B. External view — curvature normalization

$$
C(L)=
\left(\frac{16\times10^9}{L}\right)^{0.0557144}
$$

The cosmological reference is the unit.

Smaller scales acquire larger curvature indices.

This is the natural view for examining inverse scale relationships.

### C. Exponent view — hierarchical compression

$$
V(L)=
\log_2\left[
\log_2\left(1+\frac{L}{0.25}\right)
\right]
$$

This representation compresses the hierarchy itself.

It is useful for comparing vastly different integral levels and investigating whether repeated patterns persist after exponent-linearization.

---

## 10. Conclusions

The most important discovery in this construction is not a new numerical value, but a new way of organizing the measurements.

The same interval can be represented using:

- A lower-reference linear coordinate.
- An upper-reference curvature coordinate.
- A midpoint-centered reciprocal coordinate.
- An exponent-linearized hierarchical coordinate.

The geometric midpoint provides the natural center of reciprocal symmetry.

The power-law exponent provides a conversion between the two selected directional curvature references.

The exponent-linearized coordinate allows the same investigation to continue across much larger scales.

This suggests a useful general research principle:

**Do not compare two scales only by their absolute sizes. Compare their normalized ratios, reciprocal positions, curvature indices and exponent-linearized ranks.**

The physical universe may have observational boundaries, but its mathematical coordinate representations can be continued beyond them.

The next task is to test whether the same normalized structures recur at genuinely independent physical scales, rather than assuming that mathematical similarity alone establishes physical equivalence.
