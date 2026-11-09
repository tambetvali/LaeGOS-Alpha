# Laegna acoustics / acústica

## Rests

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

| Rest Name | Laegna Base44 | Relative Duration |
| :--- | :--- | :--- |
| **Whole Rest** | E | **1** (Full measure in 4/4) |
| **Half Rest** | A | **1/2** |
| **Quarter Rest** | A squiggly line (often compared to a stylized 'Z' or a lightning bolt) | A filled-in oval with a vertical stem | **1/4** |
| **Eighth Rest** | A slash with one flag/branch curving out to the left | A filled-in oval with a stem and one flag | **1/8** |
| **Sixteenth Rest**| A slash with two flags/branches curving to the left | A filled-in oval with a stem and two flags | **1/16** |
