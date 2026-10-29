# Different Sequences, One Motif: Powers, Indices, and Transformations

## 1. Introduction: The same numbers can tell different stories

Consider these sequences:

- 1, 2, 4, 16, indexed by 0, 1, 2, 3
- 0, 1, 2, 16, indexed by 0, 1, 2, 3
- 1, 2, 4, 8, 16, indexed by 1, 2, 3, 4, 5

They may look like variations on the same idea, but they represent different mathematical rules.

The key is to distinguish three things:

1. The **values** in the sequence.
2. The **indices** that identify each position.
3. The **rule** that connects an index to its value.

A sequence is not defined by its values alone. Its indexing and generating rule matter, too.

---

## 2. Sequence A: 1, 2, 4, 16 at indices 0, 1, 2, 3

| Index n | Value a(n) | Power of 2 |
|--------:|-----------:|------------|
| 0 | 1 | 2^0 |
| 1 | 2 | 2^1 |
| 2 | 4 | 2^2 |
| 3 | 16 | 2^4 |

The first three values follow the rule:

a(n) = 2^n

However, the fourth value breaks that rule. At index 3, the rule would give 2^3 = 8, not 16.

There is a possible alternative interpretation:

a(n) = 2^(n^2)

This gives:

- n = 0: 2^0 = 1
- n = 1: 2^1 = 2
- n = 2: 2^4 = 16

But it does not produce 4 at index 2.

Therefore, the sequence 1, 2, 4, 16 does not consistently follow either of these simple rules.

A finite list can always be fitted by more complicated formulas, but without an explicit generating rule, its continuation is ambiguous.

For example, if the intended sequence were:

1, 2, 4, 16, 256, ...

then the exponents would be:

0, 1, 2, 4, 8, ...

This is a different exponent pattern, and its rule would need to be specified separately.

---

## 3. Sequence B: 0, 1, 2, 16 at indices 0, 1, 2, 3

| Index n | Value a(n) |
|--------:|-----------:|
| 0 | 0 |
| 1 | 1 |
| 2 | 2 |
| 3 | 16 |

This sequence is even less consistent with a simple exponential pattern.

The values begin with 0, 1, 2, then jump to 16.

One could construct a formula that reproduces these four values, but many different formulas would fit them.

For instance, a polynomial can be constructed to pass through all four points. That does not mean the polynomial is necessarily the intended rule.

The lesson is that a sequence of values does not automatically reveal its generating function.

### A useful distinction

The index 0 does not have to correspond to the value 1, and the index 1 does not have to correspond to the value 2.

Those relationships arise only when a particular formula defines them.

---

## 4. Sequence C: 1, 2, 4, 8, 16 at indices 1, 2, 3, 4, 5

This sequence has a clear and consistent rule:

a(n) = 2^(n - 1)

| Index n | Value a(n) | Power of 2 |
|--------:|-----------:|------------|
| 1 | 1 | 2^0 |
| 2 | 2 | 2^1 |
| 3 | 4 | 2^2 |
| 4 | 8 | 2^3 |
| 5 | 16 | 2^4 |

Every time the index increases by 1, the value doubles.

This is a geometric sequence with common ratio 2.

The exponent is shifted by one position because indexing begins at 1 rather than 0.

If we instead used zero-based indexing, the same values would be:

| Index n | Value a(n) |
|--------:|-----------:|
| 0 | 1 |
| 1 | 2 |
| 2 | 4 |
| 3 | 8 |
| 4 | 16 |

The formula would then simply be:

a(n) = 2^n

Nothing about the values or their growth has changed. Only the labels assigned to their positions have changed.

---

## 5. One motif, several mathematical structures

All three examples can be discussed using the broader motif of relating an index to a value.

However, they represent different structures.

### A. Exponential growth

a(n) = b^n

The index appears in the exponent.

For b = 2:

1, 2, 4, 8, 16, 32, ...

The ratio between consecutive terms is constant.

### B. A shifted exponential sequence

a(n) = b^(n - 1)

For b = 2:

1, 2, 4, 8, 16, ...

The growth is exactly the same as in the previous example. The index has simply been shifted by one.

### C. Exponential growth with a quadratic exponent

a(n) = b^(n^2)

For b = 2:

1, 2, 16, 512, 65,536, ...

The exponent grows quadratically rather than linearly.

The gaps between exponents increase:

0, 1, 4, 9, 16, ...

Consequently, the ratio between consecutive terms is not constant.

---

## 6. The connection to logarithms

Logarithms let us examine the exponent pattern directly.

For an exponential sequence:

a(n) = b^n

we have:

log_b(a(n)) = n

The logarithm of the value is linear in the index.

For a shifted exponential:

a(n) = b^(n - 1)

we have:

log_b(a(n)) = n - 1

This is still linear. The only difference is the offset.

For an exponential with a quadratic exponent:

a(n) = b^(n^2)

we have:

log_b(a(n)) = n^2

Now the logarithm is quadratic.

This is a powerful way to distinguish the patterns:

| Sequence type | Formula | Logarithm of value |
|---------------|---------|---------------------|
| Exponential | b^n | n |
| Shifted exponential | b^(n - 1) | n - 1 |
| Quadratic exponent | b^(n^2) | n^2 |

The logarithm removes the outer exponential growth and exposes the structure of the exponent.

---

## 7. The deeper motif: transforming the index

The same general framework can generate many different sequences:

a(n) = b^(f(n))

Here:

- n is the index.
- f(n) is a function of the index.
- b is the exponential base.
- a(n) is the resulting value.

Examples:

| Function f(n) | Sequence formula | Initial values for n = 0, 1, 2, 3 |
|---------------|------------------|-------------------------------------|
| n | 2^n | 1, 2, 4, 8 |
| n + 1 | 2^(n + 1) | 2, 4, 8, 16 |
| n - 1 | 2^(n - 1) | 0.5, 1, 2, 4 |
| n^2 | 2^(n^2) | 1, 2, 16, 512 |
| 2n | 2^(2n) | 1, 4, 16, 64 |
| n^2 + n | 2^(n^2 + n) | 1, 4, 64, 4,096 |

The motif remains the same: transform the index, then use the transformed index as an exponent.

Changing f(n) changes the sequence. Changing the starting index changes the labels and may also change how the formula is written.

---

## 8. Conclusion

The sequences 1, 2, 4, 16 and 1, 2, 4, 8, 16 may share a general exponential motif, but that alone does not make them instances of the same exact rule.

The essential questions are:

1. What is the index?
2. What function transforms the index?
3. What base is being exponentiated?
4. Does the rule reproduce every term?

The cleanest general expression is:

a(n) = b^(f(n))

Taking logarithms gives:

log_b(a(n)) = f(n)

This equation separates the exponential part from the index pattern. It shows precisely how sequences can share a mathematical motif while differing in their indexing, exponent functions, and resulting growth.
