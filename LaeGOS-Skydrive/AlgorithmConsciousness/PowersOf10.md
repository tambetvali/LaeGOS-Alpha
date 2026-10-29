# Powers of 10, Logarithms, and Fractional Exponents

## 1. The original sequence

The sequence is:

1, 10, 10,000, 1,000,000,000, 10,000,000,000,000,000, ...

Written as powers of 10:

10^0, 10^1, 10^4, 10^9, 10^16, ...

The exponents are square numbers:

0, 1, 4, 9, 16, 25, 36, 49, ...

Therefore, the general formula is:

a(n) = 10^(n^2)

where n = 0, 1, 2, 3, 4, ...

The exponent n^2 gives the number of zeros after the leading 1.

Examples:

- n = 0: 10^0 = 1
- n = 1: 10^1 = 10
- n = 2: 10^4 = 10,000
- n = 3: 10^9 = 1,000,000,000
- n = 4: 10^16 = 10,000,000,000,000,000
- n = 5: 10^25

## 2. The logarithmic relationship

The base-10 logarithm gives the exponent:

log10(10^x) = x

Therefore:

log10(a(n)) = n^2

The original numbers grow exponentially, while their logarithms follow the quadratic sequence:

0, 1, 4, 9, 16, 25, ...

Logarithms turn powers into multiplication:

log10(x^k) = k * log10(x)

They also turn multiplication into addition:

log10(x * y) = log10(x) + log10(y)

Note that the logarithmic sequence n^2 is quadratic, not linear.

## 3. Twenty examples using quarter steps

Use the formula:

a(n) = 10^(n^2)

Increase n by 0.25 each time.

| n    | n^2    | a(n) = 10^(n^2)             |
|------|--------|-----------------------------|
| 0    | 0      | 1                           |
| 0.25 | 0.0625 | approximately 1.155         |
| 0.5  | 0.25   | approximately 1.778         |
| 0.75 | 0.5625 | approximately 3.652         |
| 1    | 1      | 10                          |
| 1.25 | 1.5625 | approximately 36.52         |
| 1.5  | 2.25   | approximately 177.83        |
| 1.75 | 3.0625 | approximately 1,155         |
| 2    | 4      | 10,000                      |
| 2.25 | 5.0625 | approximately 115,478       |
| 2.5  | 6.25   | approximately 1,778,279     |
| 2.75 | 7.5625 | approximately 36,517,413    |
| 3    | 9      | 1,000,000,000               |
| 3.25 | 10.5625| approximately 3.652e10      |
| 3.5  | 12.25  | approximately 1.778e12      |
| 3.75 | 14.0625| approximately 1.155e14      |
| 4    | 16     | 10^16                       |
| 4.25 | 18.0625| approximately 1.155e18      |
| 4.5  | 20.25  | approximately 1.778e20      |
| 4.75 | 22.5625| approximately 3.652e22      |

Important: fractional exponents do not produce integers with a literal number of zeros. The zero-count interpretation applies when the exponent is a nonnegative integer.

## 4. Linear interpolation on a logarithmic scale

There is another way to generate intermediate values.

Suppose we want to interpolate between:

A = 10^1 = 10
B = 10^4 = 10,000

Their logarithms are 1 and 4.

Divide the logarithmic interval into four equal steps:

1, 1.75, 2.5, 3.25, 4

Exponentiate these values:

10^1, 10^1.75, 10^2.5, 10^3.25, 10^4

This gives approximately:

10, 56.23, 316.23, 1,778.28, 10,000

The numbers are not equally spaced by addition. Instead, each step multiplies the previous value by the same factor.

For positive numbers A and B, logarithmic interpolation is:

x(t) = 10^((1 - t) * log10(A) + t * log10(B))

where 0 <= t <= 1.

- t = 0: A
- t = 0.25: one-quarter of the way in logarithmic space
- t = 0.5: the geometric mean, sqrt(A * B)
- t = 0.75: three-quarters of the way in logarithmic space
- t = 1: B

## 5. The difference between the two methods

### Method A: Preserve the square-exponent pattern

a(n) = 10^(n^2)

This produces the original sequence when n is an integer. Using quarter steps samples the same curve at fractional values of n.

### Method B: Interpolate linearly in logarithmic space

x(t) = 10^((1 - t) * log10(A) + t * log10(B))

This places intermediate points evenly on a logarithmic scale between any two positive numbers.

## Conclusion

Use 10^(n^2) when you want to preserve the square-number exponent pattern.

Use logarithmic interpolation when you want evenly spaced intermediate values on a logarithmic scale.

Both methods use logarithms and exponentiation, but they describe different kinds of spacing.
