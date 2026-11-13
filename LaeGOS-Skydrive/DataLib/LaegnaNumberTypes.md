# Some differences of Laegna number types of normal ones

Each digit is analyzed mathematically and can contain:
- Multiple bands
- Multiple dimensions

Yet, digit bits are also ordered and thus, there is also the full-number value which might not use those specifications. These two modes are highly compatible.

Counting in decimals involves positional zero:
```
-2
-1
0
+1
+2
...
10 - 10 also, contains zero, thus zero is positional.
```

Laegna numbers have non-positional zero:
```
Unsigned zero:
U - 0
I - 1
O - 2
A - 3
E - 4; with all positional values, I, O, A, E, none of them contains "U".
```

"U" is basically what needs to be displayed on empty screen in this version. If user adds explicit U's, we process them later, right now the full values.

# Capital and small case

Every digit can be capital or small case:
- Currently, let's just calculate the full number as if all where capital.

# Each digit length restarts counting

At each digit length, counting restarts.

## Conversion rules used by the current screens

- For the standard systems represented by `Examples/numbers.json`, a fixed-width sequence has the rank of its ordered base-B digit indices, plus one. Each width is a separate rank range; do not strip a leading `I` as if it were positional zero. In base 4, `IOOA` has indices `[0, 1, 1, 2]` and value 23 in the R=4 examples.
- `W` is the explicit zero value. An empty screen is displayed as `U` and also evaluates to zero; this does not make an entered unknown `U` an arithmetic digit.
- `O` and `A` have no universal visible-value interpretation. They are Laegna binary bit symbols internally (O/A), while signed and unsigned digit interpretations are separate modes. Do not substitute Latin/decimal values or a signed interpretation for the standard example conversion.
- Wave numbers are alternative representations, not a second positional base. Base-4 wave conversion follows `WaveweaverValueBase4` and `WaveweaverDigitsBase4` in `Examples/decoder.py`; the preceding wave digit selects the permutation. Base-16 wave conversion applies that transform to both base-4 axes. Base-2 wave conversion is not part of this implementation.
- Internal driver arrays are not user-facing number text. For example, B4 is followed by O/A bit positions; V is a known omitted position and U an unknown. Render the entered Laegna symbol in the screen and keep the driver form internal.
