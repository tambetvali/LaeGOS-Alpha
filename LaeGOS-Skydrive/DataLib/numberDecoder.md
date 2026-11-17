# Decoder.py

This is reference to this code file:
- [decoder.py](https://github.com/tambetvali/LaeGOS-Alpha/blob/main/LaeGOS-Skydrive/Examples/decoder.py)
- Here is the original reference: [Sheep Counting](https://spireason.neocities.org/#sheep) with [Inference Counter](https://spireason.neocities.org/Playground/InferenceCounter/)'s folder having the decoder.py and it's [HTML Interface](https://spireason.neocities.org/Playground/InferenceCounter/decoderlisting).

```python
import json
```

This prepares that after we decode the number system into manageable json list, we need to include decoder logic into our universe.

```python
def LaegnaValueBase4(digits):
    mult = 4**(len(digits)-1)
    value = 0
    for dig in range(len(digits)):
        value += digits[dig] * mult
        mult //= 4
    return value + 1
```

We define that to read Laegna values in base-4 encoding, we use $4^n$ digit recursion, and 1 gets added to value as 0 is not positional.

```python
def WaveweaverValueBase4(digits):
    mult = 4**(len(digits)-1)
    value = 0
    for dig in range(len(digits)):
        digit = digits[dig]
        if dig > 0:
            if digits[dig-1] in [1, 2]:
                if digit == 1: digit = 2
                elif digit == 2: digit = 1
            if digits[dig-1] in [1, 2]:
                if digit == 0: digit = 1
                elif digit == 1: digit = 0
                elif digit == 2: digit = 3
                elif digit == 3: digit = 2
        value += digit * mult
        mult //= 4
    return value + 1
```

Moreover, we state that if previous digit was O or A (in \[1, 2\]), then for this digit, to convert laegna base-4 to laegna wave-weaver base-4, we would change I into O, O into I, A into E and E into A, which is meaning of digit values 0, 1, 2, 3 as internal representation of 1, 2, 3, 4 - I, O, A, E. Because adding one is done separately and the 1 is kept as recursive base, internals can work on basin-0, representing yet laegna basin-1 in it's highest, wave weaver numbers.

```
def WaveweaverDigitsBase4(digitsin):
    digitsout = []
    for dig in range(len(digitsin)):
        digit = digitsin[dig]
        if dig > 0:
            if digitsin[dig-1] in [1, 2]:
                if digit == 1: digit = 2
                elif digit == 2: digit = 1
            if digitsin[dig-1] in [1, 2]:
                if digit == 0: digit = 1
                elif digit == 1: digit = 0
                elif digit == 2: digit = 3
                elif digit == 3: digit = 2
        digitsout.append(digit)
    return digitsout
```

Here, we provide the same service with clients of different data type, adding output digits to laegna digit list of wave number instead of converting them to decimal representation.

```python
def num2let(digits):
    let = ["I", "O", "A", "E"]
    return "".join(let[d] for d in digits)
```

Let digits be I, O, A, E, then solve 0, 1, 2, 3 into those digits.

```python
HEX_TABLE = [
    ["K", "J", "I", "L"],
    ["Q", "P", "O", "P"],
    ["C", "B", "A", "B"],
    ["G", "F", "E", "F"],
]
```

Register 4\*4 matrix of Laegna $base_{4_{4}}$, so that 2D base-4 can be shown as base-16 or both can be converted.

```python
# YOUR EXACT BINARY TABLE
BIN_TABLE = {
    0: [1,1],  # I -> OO
    1: [1,2],  # O -> OA
    2: [2,1],  # A -> AO
    3: [2,2],  # E -> AA
}
```

CoPilot said it's my exact binary table, which is not removed; this converts between 1 and 2 based base-2 and 0, 1, 2, 3 based base-4 representations.

```python
def normalize_digits(digits):
    out = []
    for d in digits:
        if isinstance(d, (list,tuple)) and len(d)==2:
            out.append(d[1])
        else:
            out.append(d)
    return out
```

Flatten the digit list, so that whether it was inside list or tuple or not, the result is not.

```python
def num2hex(digits):
    digits = normalize_digits(digits)
    if len(digits)%2 != 0:
        return None
    out=""
    for i in range(0,len(digits),2):
        out += HEX_TABLE[digits[i]][digits[i+1]]
    return out
```

Utilize the hex table before to convert laegna base-4 numeral into (lae)hex.

```python
def num2bin(digits):
    digits = normalize_digits(digits)
    out=[]
    for d in digits:
        pair = BIN_TABLE[d]
        out.append("O" if pair[0]==1 else "A")
        out.append("O" if pair[1]==1 else "A")
    return "".join(out)
```

Utilize the binary table to convert laegna base-4 number into (lae)bin.

```python
def extreme_bin(label):
    return label*2
```

Turn U into UU, V into VV etc.

```python
def decimal_hex_label(decimal_num):
    try:
        if isinstance(decimal_num,str):
            val=int(decimal_num)
        elif isinstance(decimal_num,(int,float)) and float(decimal_num).is_integer():
            val=int(decimal_num)
        else:
            return None
        return format(val,"X")
    except:
        return None

def decimal_bin_label(decimal_num):
    try:
        if isinstance(decimal_num,str):
            val=int(decimal_num)
        elif isinstance(decimal_num,(int,float)) and float(decimal_num).is_integer():
            val=int(decimal_num)
        else:
            return None
        return format(val,"b")
    except:
        return None

def countR(R=1,prefix=None):
    if prefix is None:
        prefix=[]
    for dig in range(4):
        if R==1:
            yield prefix+[dig]
        else:
            for num in countR(R-1,prefix+[dig]):
                yield num
```

Common mainteance of pythonic structures.

```python
def laegna_wave_hex_label(num_str,R):
    if all(ch==num_str[0] for ch in num_str) and num_str[0] in "WVU∩" and len(num_str)%2==0:
        return num_str[0]*(len(num_str)//2)
    if R%2!=0:
        return None
    let_to_digit={"I":0,"O":1,"A":2,"E":3}
    digits=[let_to_digit[ch] for ch in num_str if ch in let_to_digit]
    if len(digits)%2!=0:
        return None
    return num2hex(digits)
```

Converts pairs of base-4 digits into single base-16 digit, or does not provide it for even-digit lengths (any even R) because result is not unambigious.

```python
def numberlist(R=1):
    fullnumbers=[]
    for _ in range(4**R):
        fullnumbers.append({"Decimal":{},"Wave":{},"Laegna":{}})

    for num in countR(R):
        w_idx = WaveweaverValueBase4(num) - 1
        l_idx = LaegnaValueBase4(num) - 1
    
        wave_str = num2let(num)
        laeg_str = num2let(num)
    
        fullnumbers[w_idx]["Wave"]["Num"] = wave_str
        fullnumbers[w_idx]["Wave"]["Digits"] = num          # ← FIX
    
        fullnumbers[l_idx]["Laegna"]["Num"] = laeg_str
        fullnumbers[l_idx]["Laegna"]["Digits"] = num

    numbers=[]

    # -inf
    numbers.append({
        "Decimal":{"Num":"0","Signed":"-inf","Hex":decimal_hex_label("0"),"Bin":decimal_bin_label("0")},
        "Wave":{"Num":"W"*R,"Hex":laegna_wave_hex_label("W"*R,R),"Bin":extreme_bin("W"*R)},
        "Laegna":{"Num":"W"*R,"Hex":laegna_wave_hex_label("W"*R,R),"Bin":extreme_bin("W"*R)}
    })

    half=4**R//2
    offset_signed=4**2//2

    # negative side
    for idx in range(half):
        dec=str(idx+1)
        signed=str(idx-offset_signed)
        fullnumbers[idx]["Decimal"]={
            "Num":dec,
            "Signed":signed,
            "Hex":decimal_hex_label(dec),
            "Bin":decimal_bin_label(dec)
        }

        # Wave
        w=fullnumbers[idx]["Wave"]
        w["Hex"]=laegna_wave_hex_label(w["Num"],R)
        w["Bin"]=num2bin(w["Digits"])

        # Laegna
        l=fullnumbers[idx]["Laegna"]
        l["Hex"]=laegna_wave_hex_label(l["Num"],R)
        l["Bin"]=num2bin(l["Digits"])

        numbers.append(fullnumbers[idx])

    # -0
    mid_val=4**R//2+0.5
    numbers.append({
        "Decimal":{"Num":mid_val,"Signed":"-0","Hex":decimal_hex_label(mid_val),"Bin":None},
        "Wave":{"Num":"V"*R,"Hex":laegna_wave_hex_label("V"*R,R),"Bin":extreme_bin("V"*R)},
        "Laegna":{"Num":"V"*R,"Hex":laegna_wave_hex_label("V"*R,R),"Bin":extreme_bin("V"*R)}
    })

    # +0
    numbers.append({
        "Decimal":{"Num":mid_val,"Signed":"+0","Hex":decimal_hex_label(mid_val),"Bin":None},
        "Wave":{"Num":"U"*R,"Hex":laegna_wave_hex_label("U"*R,R),"Bin":extreme_bin("U"*R)},
        "Laegna":{"Num":"U"*R,"Hex":laegna_wave_hex_label("U"*R,R),"Bin":extreme_bin("U"*R)}
    })

    # positive side
    for idx in range(half):
        base=idx+half
        dec=str(base+1)
        signed="+"+str(idx+1)
        fullnumbers[base]["Decimal"]={
            "Num":dec,
            "Signed":signed,
            "Hex":decimal_hex_label(dec),
            "Bin":decimal_bin_label(dec)
        }

        w=fullnumbers[base]["Wave"]
        w["Hex"]=laegna_wave_hex_label(w["Num"],R)
        w["Bin"]=num2bin(w["Digits"])

        l=fullnumbers[base]["Laegna"]
        l["Hex"]=laegna_wave_hex_label(l["Num"],R)
        l["Bin"]=num2bin(l["Digits"])

        numbers.append(fullnumbers[base])

    # +inf
    numbers.append({
        "Decimal":{"Num":"2inf","Signed":"+inf","Hex":None,"Bin":None},
        "Wave":{"Num":"∩"*R,"Hex":laegna_wave_hex_label("∩"*R,R),"Bin":extreme_bin("∩"*R)},
        "Laegna":{"Num":"∩"*R,"Hex":laegna_wave_hex_label("∩"*R,R),"Bin":extreme_bin("∩"*R)}
    })

    return numbers
```

Utilizing conventions before, turns it into basic number database.

```python
class Rib:
    def __init__(self,R,b=4):
        self.R=R
        self.b=b
        self.numbers=numberlist(R)
        self.B=b**R
        self.halfB=self.B/2
        self.W=(0,-self.halfB-2)
        self.V=(self.halfB,-1)
        self.U=(self.halfB+1,+1)
        self.UU=(self.B,self.halfB+2)

    def __len__(self):
        return len(self.numbers)

    def to_list(self):
        return self.numbers

    def to_json(self):
        return {"R":self.R,"base":self.b,"B":self.B,"numbers":self.numbers}
```

Ribs of the range, such as it's medians, zeroes, external zeroes - all boundaries, such as minimae, maximae and two medievaes.

```python
class MathScript:
    def __init__(self,R_list=None,base=4):
        if R_list is None:
            R_list=[1,2,3,4]
        self.R_list=R_list
        self.base=base
        self.chapters=[Rib(R,base) for R in R_list]

    def __len__(self):
        return sum(len(ch) for ch in self.chapters)

    def to_list(self):
        return [ch.to_list() for ch in self.chapters]

    def to_json(self):
        return {
            "meta":{"version":1,"description":"Laegna / Waveweaver number system export"},
            "chapters":[{"R":ch.R,"base":ch.b,"numbers":ch.to_list()} for ch in self.chapters]
        }
```

This utilizes already the top-level structures, and controls the real work to use the number data structure and other sources and just produce a single file.

```python
if __name__=="__main__":
    script=MathScript()
    print(json.dumps(script.to_json(),ensure_ascii=False,indent=2))
```

Finally calling the whole generator.

---

This is the result:

```json
{
  "meta": {
    "version": 1,
    "description": "Laegna / Waveweaver number system export"
  },
  "chapters": [
    {
      "R": 1,
      "base": 4,
      "numbers": [
        {
          "Decimal": {
            "Num": "0",
            "Signed": "-inf",
            "Hex": "0",
            "Bin": "0"
          },
          "Wave": {
            "Num": "W",
            "Hex": null,
            "Bin": "WW"
          },
          "Laegna": {
            "Num": "W",
            "Hex": null,
            "Bin": "WW"
          }
        },
        {
          "Decimal": {
            "Num": "1",
            "Signed": "-8",
            "Hex": "1",
            "Bin": "1"
          },
          "Wave": {
            "Num": "I",
            "Digits": [
              0
            ],
            "Hex": null,
            "Bin": "OO"
          },
          "Laegna": {
            "Num": "I",
            "Digits": [
              0
            ],
            "Hex": null,
            "Bin": "OO"
          }
        },
        {
          "Decimal": {
            "Num": "2",
            "Signed": "-7",
            "Hex": "2",
            "Bin": "10"
          },
          "Wave": {
            "Num": "O",
            "Digits": [
              1
            ],
            "Hex": null,
            "Bin": "OA"
          },
          "Laegna": {
            "Num": "O",
            "Digits": [
              1
            ],
            "Hex": null,
            "Bin": "OA"
          }
        },
        {
          "Decimal": {
            "Num": 2.5,
            "Signed": "-0",
            "Hex": null,
            "Bin": null
          },
          "Wave": {
            "Num": "V",
            "Hex": null,
            "Bin": "VV"
          },
          "Laegna": {
            "Num": "V",
            "Hex": null,
            "Bin": "VV"
          }
        },
        {
          "Decimal": {
            "Num": 2.5,
            "Signed": "+0",
            "Hex": null,
            "Bin": null
          },
          "Wave": {
            "Num": "U",
            "Hex": null,
            "Bin": "UU"
          },
          "Laegna": {
            "Num": "U",
            "Hex": null,
            "Bin": "UU"
          }
        },
        {
          "Decimal": {
            "Num": "3",
            "Signed": "+1",
            "Hex": "3",
            "Bin": "11"
          },
          "Wave": {
            "Num": "A",
            "Digits": [
              2
            ],
            "Hex": null,
            "Bin": "AO"
          },
          "Laegna": {
            "Num": "A",
            "Digits": [
              2
            ],
            "Hex": null,
            "Bin": "AO"
          }
        },
        {
          "Decimal": {
            "Num": "4",
            "Signed": "+2",
            "Hex": "4",
            "Bin": "100"
          },
          "Wave": {
            "Num": "E",
            "Digits": [
              3
            ],
            "Hex": null,
            "Bin": "AA"
          },
          "Laegna": {
            "Num": "E",
            "Digits": [
              3
            ],
            "Hex": null,
            "Bin": "AA"
          }
        },
        {
          "Decimal": {
            "Num": "2inf",
            "Signed": "+inf",
            "Hex": null,
            "Bin": null
          },
          "Wave": {
            "Num": "∩",
            "Hex": null,
            "Bin": "∩∩"
          },
          "Laegna": {
            "Num": "∩",
            "Hex": null,
            "Bin": "∩∩"
          }
        }
      ]
    },
    {
      "R": 2,
      "base": 4,
      "numbers": [
        {
          "Decimal": {
            "Num": "0",
            "Signed": "-inf",
            "Hex": "0",
            "Bin": "0"
          },
          "Wave": {
            "Num": "WW",
            "Hex": "W",
            "Bin": "WWWW"
          },
          "Laegna": {
            "Num": "WW",
            "Hex": "W",
            "Bin": "WWWW"
          }
        },
        {
          "Decimal": {
            "Num": "1",
            "Signed": "-8",
            "Hex": "1",
            "Bin": "1"
          },
          "Wave": {
            "Num": "II",
            "Digits": [
              0,
              0
            ],
            "Hex": "K",
            "Bin": "OOOO"
          },
          "Laegna": {
            "Num": "II",
            "Digits": [
              0,
              0
            ],
            "Hex": "K",
            "Bin": "OOOO"
          }
        },
        {
          "Decimal": {
            "Num": "2",
            "Signed": "-7",
            "Hex": "2",
            "Bin": "10"
          },
          "Wave": {
            "Num": "IO",
            "Digits": [
              0,
              1
            ],
            "Hex": "J",
            "Bin": "OOOA"
          },
          "Laegna": {
            "Num": "IO",
            "Digits": [
              0,
              1
            ],
            "Hex": "J",
            "Bin": "OOOA"
          }
        },
        {
          "Decimal": {
            "Num": "3",
            "Signed": "-6",
            "Hex": "3",
            "Bin": "11"
          },
          "Wave": {
            "Num": "IA",
            "Digits": [
              0,
              2
            ],
            "Hex": "I",
            "Bin": "OOAO"
          },
          "Laegna": {
            "Num": "IA",
            "Digits": [
              0,
              2
            ],
            "Hex": "I",
            "Bin": "OOAO"
          }
        },
        {
          "Decimal": {
            "Num": "4",
            "Signed": "-5",
            "Hex": "4",
            "Bin": "100"
          },
          "Wave": {
            "Num": "IE",
            "Digits": [
              0,
              3
            ],
            "Hex": "L",
            "Bin": "OOAA"
          },
          "Laegna": {
            "Num": "IE",
            "Digits": [
              0,
              3
            ],
            "Hex": "L",
            "Bin": "OOAA"
          }
        },
        {
          "Decimal": {
            "Num": "5",
            "Signed": "-4",
            "Hex": "5",
            "Bin": "101"
          },
          "Wave": {
            "Num": "OA",
            "Digits": [
              1,
              2
            ],
            "Hex": "O",
            "Bin": "OAAO"
          },
          "Laegna": {
            "Num": "OI",
            "Digits": [
              1,
              0
            ],
            "Hex": "Q",
            "Bin": "OAOO"
          }
        },
        {
          "Decimal": {
            "Num": "6",
            "Signed": "-3",
            "Hex": "6",
            "Bin": "110"
          },
          "Wave": {
            "Num": "OI",
            "Digits": [
              1,
              0
            ],
            "Hex": "Q",
            "Bin": "OAOO"
          },
          "Laegna": {
            "Num": "OO",
            "Digits": [
              1,
              1
            ],
            "Hex": "P",
            "Bin": "OAOA"
          }
        },
        {
          "Decimal": {
            "Num": "7",
            "Signed": "-2",
            "Hex": "7",
            "Bin": "111"
          },
          "Wave": {
            "Num": "OE",
            "Digits": [
              1,
              3
            ],
            "Hex": "P",
            "Bin": "OAAA"
          },
          "Laegna": {
            "Num": "OA",
            "Digits": [
              1,
              2
            ],
            "Hex": "O",
            "Bin": "OAAO"
          }
        },
        {
          "Decimal": {
            "Num": "8",
            "Signed": "-1",
            "Hex": "8",
            "Bin": "1000"
          },
          "Wave": {
            "Num": "OO",
            "Digits": [
              1,
              1
            ],
            "Hex": "P",
            "Bin": "OAOA"
          },
          "Laegna": {
            "Num": "OE",
            "Digits": [
              1,
              3
            ],
            "Hex": "P",
            "Bin": "OAAA"
          }
        },
        {
          "Decimal": {
            "Num": 8.5,
            "Signed": "-0",
            "Hex": null,
            "Bin": null
          },
          "Wave": {
            "Num": "VV",
            "Hex": "V",
            "Bin": "VVVV"
          },
          "Laegna": {
            "Num": "VV",
            "Hex": "V",
            "Bin": "VVVV"
          }
        },
        {
          "Decimal": {
            "Num": 8.5,
            "Signed": "+0",
            "Hex": null,
            "Bin": null
          },
          "Wave": {
            "Num": "UU",
            "Hex": "U",
            "Bin": "UUUU"
          },
          "Laegna": {
            "Num": "UU",
            "Hex": "U",
            "Bin": "UUUU"
          }
        },
        {
          "Decimal": {
            "Num": "9",
            "Signed": "+1",
            "Hex": "9",
            "Bin": "1001"
          },
          "Wave": {
            "Num": "AA",
            "Digits": [
              2,
              2
            ],
            "Hex": "A",
            "Bin": "AOAO"
          },
          "Laegna": {
            "Num": "AI",
            "Digits": [
              2,
              0
            ],
            "Hex": "C",
            "Bin": "AOOO"
          }
        },
        {
          "Decimal": {
            "Num": "10",
            "Signed": "+2",
            "Hex": "A",
            "Bin": "1010"
          },
          "Wave": {
            "Num": "AI",
            "Digits": [
              2,
              0
            ],
            "Hex": "C",
            "Bin": "AOOO"
          },
          "Laegna": {
            "Num": "AO",
            "Digits": [
              2,
              1
            ],
            "Hex": "B",
            "Bin": "AOOA"
          }
        },
        {
          "Decimal": {
            "Num": "11",
            "Signed": "+3",
            "Hex": "B",
            "Bin": "1011"
          },
          "Wave": {
            "Num": "AE",
            "Digits": [
              2,
              3
            ],
            "Hex": "B",
            "Bin": "AOAA"
          },
          "Laegna": {
            "Num": "AA",
            "Digits": [
              2,
              2
            ],
            "Hex": "A",
            "Bin": "AOAO"
          }
        },
        {
          "Decimal": {
            "Num": "12",
            "Signed": "+4",
            "Hex": "C",
            "Bin": "1100"
          },
          "Wave": {
            "Num": "AO",
            "Digits": [
              2,
              1
            ],
            "Hex": "B",
            "Bin": "AOOA"
          },
          "Laegna": {
            "Num": "AE",
            "Digits": [
              2,
              3
            ],
            "Hex": "B",
            "Bin": "AOAA"
          }
        },
        {
          "Decimal": {
            "Num": "13",
            "Signed": "+5",
            "Hex": "D",
            "Bin": "1101"
          },
          "Wave": {
            "Num": "EI",
            "Digits": [
              3,
              0
            ],
            "Hex": "G",
            "Bin": "AAOO"
          },
          "Laegna": {
            "Num": "EI",
            "Digits": [
              3,
              0
            ],
            "Hex": "G",
            "Bin": "AAOO"
          }
        },
        {
          "Decimal": {
            "Num": "14",
            "Signed": "+6",
            "Hex": "E",
            "Bin": "1110"
          },
          "Wave": {
            "Num": "EO",
            "Digits": [
              3,
              1
            ],
            "Hex": "F",
            "Bin": "AAOA"
          },
          "Laegna": {
            "Num": "EO",
            "Digits": [
              3,
              1
            ],
            "Hex": "F",
            "Bin": "AAOA"
          }
        },
        {
          "Decimal": {
            "Num": "15",
            "Signed": "+7",
            "Hex": "F",
            "Bin": "1111"
          },
          "Wave": {
            "Num": "EA",
            "Digits": [
              3,
              2
            ],
            "Hex": "E",
            "Bin": "AAAO"
          },
          "Laegna": {
            "Num": "EA",
            "Digits": [
              3,
              2
            ],
            "Hex": "E",
            "Bin": "AAAO"
          }
        },
        {
          "Decimal": {
            "Num": "16",
            "Signed": "+8",
            "Hex": "10",
            "Bin": "10000"
          },
          "Wave": {
            "Num": "EE",
            "Digits": [
              3,
              3
            ],
            "Hex": "F",
            "Bin": "AAAA"
          },
          "Laegna": {
            "Num": "EE",
            "Digits": [
              3,
              3
            ],
            "Hex": "F",
            "Bin": "AAAA"
          }
        },
        {
          "Decimal": {
            "Num": "2inf",
            "Signed": "+inf",
            "Hex": null,
            "Bin": null
          },
          "Wave": {
            "Num": "∩∩",
            "Hex": "∩",
            "Bin": "∩∩∩∩"
          },
          "Laegna": {
            "Num": "∩∩",
            "Hex": "∩",
            "Bin": "∩∩∩∩"
          }
        }
      ]
    },
    {
      "R": 3,
      "base": 4,
      "numbers": [
        {
          "Decimal": {
            "Num": "0",
            "Signed": "-inf",
            "Hex": "0",
            "Bin": "0"
          },
          "Wave": {
            "Num": "WWW",
            "Hex": null,
            "Bin": "WWWWWW"
          },
          "Laegna": {
            "Num": "WWW",
            "Hex": null,
            "Bin": "WWWWWW"
          }
        },
        {
          "Decimal": {
            "Num": "1",
            "Signed": "-8",
            "Hex": "1",
            "Bin": "1"
          },
          "Wave": {
            "Num": "III",
            "Digits": [
              0,
              0,
              0
            ],
            "Hex": null,
            "Bin": "OOOOOO"
          },
          "Laegna": {
            "Num": "III",
            "Digits": [
              0,
              0,
              0
            ],
            "Hex": null,
            "Bin": "OOOOOO"
          }
        },
        {
          "Decimal": {
            "Num": "2",
            "Signed": "-7",
            "Hex": "2",
            "Bin": "10"
          },
          "Wave": {
            "Num": "IIO",
            "Digits": [
              0,
              0,
              1
            ],
            "Hex": null,
            "Bin": "OOOOOA"
          },
          "Laegna": {
            "Num": "IIO",
            "Digits": [
              0,
              0,
              1
            ],
            "Hex": null,
            "Bin": "OOOOOA"
          }
        },
        {
          "Decimal": {
            "Num": "3",
            "Signed": "-6",
            "Hex": "3",
            "Bin": "11"
          },
          "Wave": {
            "Num": "IIA",
            "Digits": [
              0,
              0,
              2
            ],
            "Hex": null,
            "Bin": "OOOOAO"
          },
          "Laegna": {
            "Num": "IIA",
            "Digits": [
              0,
              0,
              2
            ],
            "Hex": null,
            "Bin": "OOOOAO"
          }
        },
        {
          "Decimal": {
            "Num": "4",
            "Signed": "-5",
            "Hex": "4",
            "Bin": "100"
          },
          "Wave": {
            "Num": "IIE",
            "Digits": [
              0,
              0,
              3
            ],
            "Hex": null,
            "Bin": "OOOOAA"
          },
          "Laegna": {
            "Num": "IIE",
            "Digits": [
              0,
              0,
              3
            ],
            "Hex": null,
            "Bin": "OOOOAA"
          }
        },
        {
          "Decimal": {
            "Num": "5",
            "Signed": "-4",
            "Hex": "5",
            "Bin": "101"
          },
          "Wave": {
            "Num": "IOA",
            "Digits": [
              0,
              1,
              2
            ],
            "Hex": null,
            "Bin": "OOOAAO"
          },
          "Laegna": {
            "Num": "IOI",
            "Digits": [
              0,
              1,
              0
            ],
            "Hex": null,
            "Bin": "OOOAOO"
          }
        },
        {
          "Decimal": {
            "Num": "6",
            "Signed": "-3",
            "Hex": "6",
            "Bin": "110"
          },
          "Wave": {
            "Num": "IOI",
            "Digits": [
              0,
              1,
              0
            ],
            "Hex": null,
            "Bin": "OOOAOO"
          },
          "Laegna": {
            "Num": "IOO",
            "Digits": [
              0,
              1,
              1
            ],
            "Hex": null,
            "Bin": "OOOAOA"
          }
        },
        {
          "Decimal": {
            "Num": "7",
            "Signed": "-2",
            "Hex": "7",
            "Bin": "111"
          },
          "Wave": {
            "Num": "IOE",
            "Digits": [
              0,
              1,
              3
            ],
            "Hex": null,
            "Bin": "OOOAAA"
          },
          "Laegna": {
            "Num": "IOA",
            "Digits": [
              0,
              1,
              2
            ],
            "Hex": null,
            "Bin": "OOOAAO"
          }
        },
        {
          "Decimal": {
            "Num": "8",
            "Signed": "-1",
            "Hex": "8",
            "Bin": "1000"
          },
          "Wave": {
            "Num": "IOO",
            "Digits": [
              0,
              1,
              1
            ],
            "Hex": null,
            "Bin": "OOOAOA"
          },
          "Laegna": {
            "Num": "IOE",
            "Digits": [
              0,
              1,
              3
            ],
            "Hex": null,
            "Bin": "OOOAAA"
          }
        },
        {
          "Decimal": {
            "Num": "9",
            "Signed": "0",
            "Hex": "9",
            "Bin": "1001"
          },
          "Wave": {
            "Num": "IAA",
            "Digits": [
              0,
              2,
              2
            ],
            "Hex": null,
            "Bin": "OOAOAO"
          },
          "Laegna": {
            "Num": "IAI",
            "Digits": [
              0,
              2,
              0
            ],
            "Hex": null,
            "Bin": "OOAOOO"
          }
        },
        {
          "Decimal": {
            "Num": "10",
            "Signed": "1",
            "Hex": "A",
            "Bin": "1010"
          },
          "Wave": {
            "Num": "IAI",
            "Digits": [
              0,
              2,
              0
            ],
            "Hex": null,
            "Bin": "OOAOOO"
          },
          "Laegna": {
            "Num": "IAO",
            "Digits": [
              0,
              2,
              1
            ],
            "Hex": null,
            "Bin": "OOAOOA"
          }
        },
        {
          "Decimal": {
            "Num": "11",
            "Signed": "2",
            "Hex": "B",
            "Bin": "1011"
          },
          "Wave": {
            "Num": "IAE",
            "Digits": [
              0,
              2,
              3
            ],
            "Hex": null,
            "Bin": "OOAOAA"
          },
          "Laegna": {
            "Num": "IAA",
            "Digits": [
              0,
              2,
              2
            ],
            "Hex": null,
            "Bin": "OOAOAO"
          }
        },
        {
          "Decimal": {
            "Num": "12",
            "Signed": "3",
            "Hex": "C",
            "Bin": "1100"
          },
          "Wave": {
            "Num": "IAO",
            "Digits": [
              0,
              2,
              1
            ],
            "Hex": null,
            "Bin": "OOAOOA"
          },
          "Laegna": {
            "Num": "IAE",
            "Digits": [
              0,
              2,
              3
            ],
            "Hex": null,
            "Bin": "OOAOAA"
          }
        },
        {
          "Decimal": {
            "Num": "13",
            "Signed": "4",
            "Hex": "D",
            "Bin": "1101"
          },
          "Wave": {
            "Num": "IEI",
            "Digits": [
              0,
              3,
              0
            ],
            "Hex": null,
            "Bin": "OOAAOO"
          },
          "Laegna": {
            "Num": "IEI",
            "Digits": [
              0,
              3,
              0
            ],
            "Hex": null,
            "Bin": "OOAAOO"
          }
        },
        {
          "Decimal": {
            "Num": "14",
            "Signed": "5",
            "Hex": "E",
            "Bin": "1110"
          },
          "Wave": {
            "Num": "IEO",
            "Digits": [
              0,
              3,
              1
            ],
            "Hex": null,
            "Bin": "OOAAOA"
          },
          "Laegna": {
            "Num": "IEO",
            "Digits": [
              0,
              3,
              1
            ],
            "Hex": null,
            "Bin": "OOAAOA"
          }
        },
        {
          "Decimal": {
            "Num": "15",
            "Signed": "6",
            "Hex": "F",
            "Bin": "1111"
          },
          "Wave": {
            "Num": "IEA",
            "Digits": [
              0,
              3,
              2
            ],
            "Hex": null,
            "Bin": "OOAAAO"
          },
          "Laegna": {
            "Num": "IEA",
            "Digits": [
              0,
              3,
              2
            ],
            "Hex": null,
            "Bin": "OOAAAO"
          }
        },
        {
          "Decimal": {
            "Num": "16",
            "Signed": "7",
            "Hex": "10",
            "Bin": "10000"
          },
          "Wave": {
            "Num": "IEE",
            "Digits": [
              0,
              3,
              3
            ],
            "Hex": null,
            "Bin": "OOAAAA"
          },
          "Laegna": {
            "Num": "IEE",
            "Digits": [
              0,
              3,
              3
            ],
            "Hex": null,
            "Bin": "OOAAAA"
          }
        },
        {
          "Decimal": {
            "Num": "17",
            "Signed": "8",
            "Hex": "11",
            "Bin": "10001"
          },
          "Wave": {
            "Num": "OAA",
            "Digits": [
              1,
              2,
              2
            ],
            "Hex": null,
            "Bin": "OAAOAO"
          },
          "Laegna": {
            "Num": "OII",
            "Digits": [
              1,
              0,
              0
            ],
            "Hex": null,
            "Bin": "OAOOOO"
          }
        },
        {
          "Decimal": {
            "Num": "18",
            "Signed": "9",
            "Hex": "12",
            "Bin": "10010"
          },
          "Wave": {
            "Num": "OAI",
            "Digits": [
              1,
              2,
              0
            ],
            "Hex": null,
            "Bin": "OAAOOO"
          },
          "Laegna": {
            "Num": "OIO",
            "Digits": [
              1,
              0,
              1
            ],
            "Hex": null,
            "Bin": "OAOOOA"
          }
        },
        {
          "Decimal": {
            "Num": "19",
            "Signed": "10",
            "Hex": "13",
            "Bin": "10011"
          },
          "Wave": {
            "Num": "OAE",
            "Digits": [
              1,
              2,
              3
            ],
            "Hex": null,
            "Bin": "OAAOAA"
          },
          "Laegna": {
            "Num": "OIA",
            "Digits": [
              1,
              0,
              2
            ],
            "Hex": null,
            "Bin": "OAOOAO"
          }
        },
        {
          "Decimal": {
            "Num": "20",
            "Signed": "11",
            "Hex": "14",
            "Bin": "10100"
          },
          "Wave": {
            "Num": "OAO",
            "Digits": [
              1,
              2,
              1
            ],
            "Hex": null,
            "Bin": "OAAOOA"
          },
          "Laegna": {
            "Num": "OIE",
            "Digits": [
              1,
              0,
              3
            ],
            "Hex": null,
            "Bin": "OAOOAA"
          }
        },
        {
          "Decimal": {
            "Num": "21",
            "Signed": "12",
            "Hex": "15",
            "Bin": "10101"
          },
          "Wave": {
            "Num": "OII",
            "Digits": [
              1,
              0,
              0
            ],
            "Hex": null,
            "Bin": "OAOOOO"
          },
          "Laegna": {
            "Num": "OOI",
            "Digits": [
              1,
              1,
              0
            ],
            "Hex": null,
            "Bin": "OAOAOO"
          }
        },
        {
          "Decimal": {
            "Num": "22",
            "Signed": "13",
            "Hex": "16",
            "Bin": "10110"
          },
          "Wave": {
            "Num": "OIO",
            "Digits": [
              1,
              0,
              1
            ],
            "Hex": null,
            "Bin": "OAOOOA"
          },
          "Laegna": {
            "Num": "OOO",
            "Digits": [
              1,
              1,
              1
            ],
            "Hex": null,
            "Bin": "OAOAOA"
          }
        },
        {
          "Decimal": {
            "Num": "23",
            "Signed": "14",
            "Hex": "17",
            "Bin": "10111"
          },
          "Wave": {
            "Num": "OIA",
            "Digits": [
              1,
              0,
              2
            ],
            "Hex": null,
            "Bin": "OAOOAO"
          },
          "Laegna": {
            "Num": "OOA",
            "Digits": [
              1,
              1,
              2
            ],
            "Hex": null,
            "Bin": "OAOAAO"
          }
        },
        {
          "Decimal": {
            "Num": "24",
            "Signed": "15",
            "Hex": "18",
            "Bin": "11000"
          },
          "Wave": {
            "Num": "OIE",
            "Digits": [
              1,
              0,
              3
            ],
            "Hex": null,
            "Bin": "OAOOAA"
          },
          "Laegna": {
            "Num": "OOE",
            "Digits": [
              1,
              1,
              3
            ],
            "Hex": null,
            "Bin": "OAOAAA"
          }
        },
        {
          "Decimal": {
            "Num": "25",
            "Signed": "16",
            "Hex": "19",
            "Bin": "11001"
          },
          "Wave": {
            "Num": "OEI",
            "Digits": [
              1,
              3,
              0
            ],
            "Hex": null,
            "Bin": "OAAAOO"
          },
          "Laegna": {
            "Num": "OAI",
            "Digits": [
              1,
              2,
              0
            ],
            "Hex": null,
            "Bin": "OAAOOO"
          }
        },
        {
          "Decimal": {
            "Num": "26",
            "Signed": "17",
            "Hex": "1A",
            "Bin": "11010"
          },
          "Wave": {
            "Num": "OEO",
            "Digits": [
              1,
              3,
              1
            ],
            "Hex": null,
            "Bin": "OAAAOA"
          },
          "Laegna": {
            "Num": "OAO",
            "Digits": [
              1,
              2,
              1
            ],
            "Hex": null,
            "Bin": "OAAOOA"
          }
        },
        {
          "Decimal": {
            "Num": "27",
            "Signed": "18",
            "Hex": "1B",
            "Bin": "11011"
          },
          "Wave": {
            "Num": "OEA",
            "Digits": [
              1,
              3,
              2
            ],
            "Hex": null,
            "Bin": "OAAAAO"
          },
          "Laegna": {
            "Num": "OAA",
            "Digits": [
              1,
              2,
              2
            ],
            "Hex": null,
            "Bin": "OAAOAO"
          }
        },
        {
          "Decimal": {
            "Num": "28",
            "Signed": "19",
            "Hex": "1C",
            "Bin": "11100"
          },
          "Wave": {
            "Num": "OEE",
            "Digits": [
              1,
              3,
              3
            ],
            "Hex": null,
            "Bin": "OAAAAA"
          },
          "Laegna": {
            "Num": "OAE",
            "Digits": [
              1,
              2,
              3
            ],
            "Hex": null,
            "Bin": "OAAOAA"
          }
        },
        {
          "Decimal": {
            "Num": "29",
            "Signed": "20",
            "Hex": "1D",
            "Bin": "11101"
          },
          "Wave": {
            "Num": "OOA",
            "Digits": [
              1,
              1,
              2
            ],
            "Hex": null,
            "Bin": "OAOAAO"
          },
          "Laegna": {
            "Num": "OEI",
            "Digits": [
              1,
              3,
              0
            ],
            "Hex": null,
            "Bin": "OAAAOO"
          }
        },
        {
          "Decimal": {
            "Num": "30",
            "Signed": "21",
            "Hex": "1E",
            "Bin": "11110"
          },
          "Wave": {
            "Num": "OOI",
            "Digits": [
              1,
              1,
              0
            ],
            "Hex": null,
            "Bin": "OAOAOO"
          },
          "Laegna": {
            "Num": "OEO",
            "Digits": [
              1,
              3,
              1
            ],
            "Hex": null,
            "Bin": "OAAAOA"
          }
        },
        {
          "Decimal": {
            "Num": "31",
            "Signed": "22",
            "Hex": "1F",
            "Bin": "11111"
          },
          "Wave": {
            "Num": "OOE",
            "Digits": [
              1,
              1,
              3
            ],
            "Hex": null,
            "Bin": "OAOAAA"
          },
          "Laegna": {
            "Num": "OEA",
            "Digits": [
              1,
              3,
              2
            ],
            "Hex": null,
            "Bin": "OAAAAO"
          }
        },
        {
          "Decimal": {
            "Num": "32",
            "Signed": "23",
            "Hex": "20",
            "Bin": "100000"
          },
          "Wave": {
            "Num": "OOO",
            "Digits": [
              1,
              1,
              1
            ],
            "Hex": null,
            "Bin": "OAOAOA"
          },
          "Laegna": {
            "Num": "OEE",
            "Digits": [
              1,
              3,
              3
            ],
            "Hex": null,
            "Bin": "OAAAAA"
          }
        },
        {
          "Decimal": {
            "Num": 32.5,
            "Signed": "-0",
            "Hex": null,
            "Bin": null
          },
          "Wave": {
            "Num": "VVV",
            "Hex": null,
            "Bin": "VVVVVV"
          },
          "Laegna": {
            "Num": "VVV",
            "Hex": null,
            "Bin": "VVVVVV"
          }
        },
        {
          "Decimal": {
            "Num": 32.5,
            "Signed": "+0",
            "Hex": null,
            "Bin": null
          },
          "Wave": {
            "Num": "UUU",
            "Hex": null,
            "Bin": "UUUUUU"
          },
          "Laegna": {
            "Num": "UUU",
            "Hex": null,
            "Bin": "UUUUUU"
          }
        },
        {
          "Decimal": {
            "Num": "33",
            "Signed": "+1",
            "Hex": "21",
            "Bin": "100001"
          },
          "Wave": {
            "Num": "AAA",
            "Digits": [
              2,
              2,
              2
            ],
            "Hex": null,
            "Bin": "AOAOAO"
          },
          "Laegna": {
            "Num": "AII",
            "Digits": [
              2,
              0,
              0
            ],
            "Hex": null,
            "Bin": "AOOOOO"
          }
        },
        {
          "Decimal": {
            "Num": "34",
            "Signed": "+2",
            "Hex": "22",
            "Bin": "100010"
          },
          "Wave": {
            "Num": "AAI",
            "Digits": [
              2,
              2,
              0
            ],
            "Hex": null,
            "Bin": "AOAOOO"
          },
          "Laegna": {
            "Num": "AIO",
            "Digits": [
              2,
              0,
              1
            ],
            "Hex": null,
            "Bin": "AOOOOA"
          }
        },
        {
          "Decimal": {
            "Num": "35",
            "Signed": "+3",
            "Hex": "23",
            "Bin": "100011"
          },
          "Wave": {
            "Num": "AAE",
            "Digits": [
              2,
              2,
              3
            ],
            "Hex": null,
            "Bin": "AOAOAA"
          },
          "Laegna": {
            "Num": "AIA",
            "Digits": [
              2,
              0,
              2
            ],
            "Hex": null,
            "Bin": "AOOOAO"
          }
        },
        {
          "Decimal": {
            "Num": "36",
            "Signed": "+4",
            "Hex": "24",
            "Bin": "100100"
          },
          "Wave": {
            "Num": "AAO",
            "Digits": [
              2,
              2,
              1
            ],
            "Hex": null,
            "Bin": "AOAOOA"
          },
          "Laegna": {
            "Num": "AIE",
            "Digits": [
              2,
              0,
              3
            ],
            "Hex": null,
            "Bin": "AOOOAA"
          }
        },
        {
          "Decimal": {
            "Num": "37",
            "Signed": "+5",
            "Hex": "25",
            "Bin": "100101"
          },
          "Wave": {
            "Num": "AII",
            "Digits": [
              2,
              0,
              0
            ],
            "Hex": null,
            "Bin": "AOOOOO"
          },
          "Laegna": {
            "Num": "AOI",
            "Digits": [
              2,
              1,
              0
            ],
            "Hex": null,
            "Bin": "AOOAOO"
          }
        },
        {
          "Decimal": {
            "Num": "38",
            "Signed": "+6",
            "Hex": "26",
            "Bin": "100110"
          },
          "Wave": {
            "Num": "AIO",
            "Digits": [
              2,
              0,
              1
            ],
            "Hex": null,
            "Bin": "AOOOOA"
          },
          "Laegna": {
            "Num": "AOO",
            "Digits": [
              2,
              1,
              1
            ],
            "Hex": null,
            "Bin": "AOOAOA"
          }
        },
        {
          "Decimal": {
            "Num": "39",
            "Signed": "+7",
            "Hex": "27",
            "Bin": "100111"
          },
          "Wave": {
            "Num": "AIA",
            "Digits": [
              2,
              0,
              2
            ],
            "Hex": null,
            "Bin": "AOOOAO"
          },
          "Laegna": {
            "Num": "AOA",
            "Digits": [
              2,
              1,
              2
            ],
            "Hex": null,
            "Bin": "AOOAAO"
          }
        },
        {
          "Decimal": {
            "Num": "40",
            "Signed": "+8",
            "Hex": "28",
            "Bin": "101000"
          },
          "Wave": {
            "Num": "AIE",
            "Digits": [
              2,
              0,
              3
            ],
            "Hex": null,
            "Bin": "AOOOAA"
          },
          "Laegna": {
            "Num": "AOE",
            "Digits": [
              2,
              1,
              3
            ],
            "Hex": null,
            "Bin": "AOOAAA"
          }
        },
        {
          "Decimal": {
            "Num": "41",
            "Signed": "+9",
            "Hex": "29",
            "Bin": "101001"
          },
          "Wave": {
            "Num": "AEI",
            "Digits": [
              2,
              3,
              0
            ],
            "Hex": null,
            "Bin": "AOAAOO"
          },
          "Laegna": {
            "Num": "AAI",
            "Digits": [
              2,
              2,
              0
            ],
            "Hex": null,
            "Bin": "AOAOOO"
          }
        },
        {
          "Decimal": {
            "Num": "42",
            "Signed": "+10",
            "Hex": "2A",
            "Bin": "101010"
          },
          "Wave": {
            "Num": "AEO",
            "Digits": [
              2,
              3,
              1
            ],
            "Hex": null,
            "Bin": "AOAAOA"
          },
          "Laegna": {
            "Num": "AAO",
            "Digits": [
              2,
              2,
              1
            ],
            "Hex": null,
            "Bin": "AOAOOA"
          }
        },
        {
          "Decimal": {
            "Num": "43",
            "Signed": "+11",
            "Hex": "2B",
            "Bin": "101011"
          },
          "Wave": {
            "Num": "AEA",
            "Digits": [
              2,
              3,
              2
            ],
            "Hex": null,
            "Bin": "AOAAAO"
          },
          "Laegna": {
            "Num": "AAA",
            "Digits": [
              2,
              2,
              2
            ],
            "Hex": null,
            "Bin": "AOAOAO"
          }
        },
        {
          "Decimal": {
            "Num": "44",
            "Signed": "+12",
            "Hex": "2C",
            "Bin": "101100"
          },
          "Wave": {
            "Num": "AEE",
            "Digits": [
              2,
              3,
              3
            ],
            "Hex": null,
            "Bin": "AOAAAA"
          },
          "Laegna": {
            "Num": "AAE",
            "Digits": [
              2,
              2,
              3
            ],
            "Hex": null,
            "Bin": "AOAOAA"
          }
        },
        {
          "Decimal": {
            "Num": "45",
            "Signed": "+13",
            "Hex": "2D",
            "Bin": "101101"
          },
          "Wave": {
            "Num": "AOA",
            "Digits": [
              2,
              1,
              2
            ],
            "Hex": null,
            "Bin": "AOOAAO"
          },
          "Laegna": {
            "Num": "AEI",
            "Digits": [
              2,
              3,
              0
            ],
            "Hex": null,
            "Bin": "AOAAOO"
          }
        },
        {
          "Decimal": {
            "Num": "46",
            "Signed": "+14",
            "Hex": "2E",
            "Bin": "101110"
          },
          "Wave": {
            "Num": "AOI",
            "Digits": [
              2,
              1,
              0
            ],
            "Hex": null,
            "Bin": "AOOAOO"
          },
          "Laegna": {
            "Num": "AEO",
            "Digits": [
              2,
              3,
              1
            ],
            "Hex": null,
            "Bin": "AOAAOA"
          }
        },
        {
          "Decimal": {
            "Num": "47",
            "Signed": "+15",
            "Hex": "2F",
            "Bin": "101111"
          },
          "Wave": {
            "Num": "AOE",
            "Digits": [
              2,
              1,
              3
            ],
            "Hex": null,
            "Bin": "AOOAAA"
          },
          "Laegna": {
            "Num": "AEA",
            "Digits": [
              2,
              3,
              2
            ],
            "Hex": null,
            "Bin": "AOAAAO"
          }
        },
        {
          "Decimal": {
            "Num": "48",
            "Signed": "+16",
            "Hex": "30",
            "Bin": "110000"
          },
          "Wave": {
            "Num": "AOO",
            "Digits": [
              2,
              1,
              1
            ],
            "Hex": null,
            "Bin": "AOOAOA"
          },
          "Laegna": {
            "Num": "AEE",
            "Digits": [
              2,
              3,
              3
            ],
            "Hex": null,
            "Bin": "AOAAAA"
          }
        },
        {
          "Decimal": {
            "Num": "49",
            "Signed": "+17",
            "Hex": "31",
            "Bin": "110001"
          },
          "Wave": {
            "Num": "EII",
            "Digits": [
              3,
              0,
              0
            ],
            "Hex": null,
            "Bin": "AAOOOO"
          },
          "Laegna": {
            "Num": "EII",
            "Digits": [
              3,
              0,
              0
            ],
            "Hex": null,
            "Bin": "AAOOOO"
          }
        },
        {
          "Decimal": {
            "Num": "50",
            "Signed": "+18",
            "Hex": "32",
            "Bin": "110010"
          },
          "Wave": {
            "Num": "EIO",
            "Digits": [
              3,
              0,
              1
            ],
            "Hex": null,
            "Bin": "AAOOOA"
          },
          "Laegna": {
            "Num": "EIO",
            "Digits": [
              3,
              0,
              1
            ],
            "Hex": null,
            "Bin": "AAOOOA"
          }
        },
        {
          "Decimal": {
            "Num": "51",
            "Signed": "+19",
            "Hex": "33",
            "Bin": "110011"
          },
          "Wave": {
            "Num": "EIA",
            "Digits": [
              3,
              0,
              2
            ],
            "Hex": null,
            "Bin": "AAOOAO"
          },
          "Laegna": {
            "Num": "EIA",
            "Digits": [
              3,
              0,
              2
            ],
            "Hex": null,
            "Bin": "AAOOAO"
          }
        },
        {
          "Decimal": {
            "Num": "52",
            "Signed": "+20",
            "Hex": "34",
            "Bin": "110100"
          },
          "Wave": {
            "Num": "EIE",
            "Digits": [
              3,
              0,
              3
            ],
            "Hex": null,
            "Bin": "AAOOAA"
          },
          "Laegna": {
            "Num": "EIE",
            "Digits": [
              3,
              0,
              3
            ],
            "Hex": null,
            "Bin": "AAOOAA"
          }
        },
        {
          "Decimal": {
            "Num": "53",
            "Signed": "+21",
            "Hex": "35",
            "Bin": "110101"
          },
          "Wave": {
            "Num": "EOA",
            "Digits": [
              3,
              1,
              2
            ],
            "Hex": null,
            "Bin": "AAOAAO"
          },
          "Laegna": {
            "Num": "EOI",
            "Digits": [
              3,
              1,
              0
            ],
            "Hex": null,
            "Bin": "AAOAOO"
          }
        },
        {
          "Decimal": {
            "Num": "54",
            "Signed": "+22",
            "Hex": "36",
            "Bin": "110110"
          },
          "Wave": {
            "Num": "EOI",
            "Digits": [
              3,
              1,
              0
            ],
            "Hex": null,
            "Bin": "AAOAOO"
          },
          "Laegna": {
            "Num": "EOO",
            "Digits": [
              3,
              1,
              1
            ],
            "Hex": null,
            "Bin": "AAOAOA"
          }
        },
        {
          "Decimal": {
            "Num": "55",
            "Signed": "+23",
            "Hex": "37",
            "Bin": "110111"
          },
          "Wave": {
            "Num": "EOE",
            "Digits": [
              3,
              1,
              3
            ],
            "Hex": null,
            "Bin": "AAOAAA"
          },
          "Laegna": {
            "Num": "EOA",
            "Digits": [
              3,
              1,
              2
            ],
            "Hex": null,
            "Bin": "AAOAAO"
          }
        },
        {
          "Decimal": {
            "Num": "56",
            "Signed": "+24",
            "Hex": "38",
            "Bin": "111000"
          },
          "Wave": {
            "Num": "EOO",
            "Digits": [
              3,
              1,
              1
            ],
            "Hex": null,
            "Bin": "AAOAOA"
          },
          "Laegna": {
            "Num": "EOE",
            "Digits": [
              3,
              1,
              3
            ],
            "Hex": null,
            "Bin": "AAOAAA"
          }
        },
        {
          "Decimal": {
            "Num": "57",
            "Signed": "+25",
            "Hex": "39",
            "Bin": "111001"
          },
          "Wave": {
            "Num": "EAA",
            "Digits": [
              3,
              2,
              2
            ],
            "Hex": null,
            "Bin": "AAAOAO"
          },
          "Laegna": {
            "Num": "EAI",
            "Digits": [
              3,
              2,
              0
            ],
            "Hex": null,
            "Bin": "AAAOOO"
          }
        },
        {
          "Decimal": {
            "Num": "58",
            "Signed": "+26",
            "Hex": "3A",
            "Bin": "111010"
          },
          "Wave": {
            "Num": "EAI",
            "Digits": [
              3,
              2,
              0
            ],
            "Hex": null,
            "Bin": "AAAOOO"
          },
          "Laegna": {
            "Num": "EAO",
            "Digits": [
              3,
              2,
              1
            ],
            "Hex": null,
            "Bin": "AAAOOA"
          }
        },
        {
          "Decimal": {
            "Num": "59",
            "Signed": "+27",
            "Hex": "3B",
            "Bin": "111011"
          },
          "Wave": {
            "Num": "EAE",
            "Digits": [
              3,
              2,
              3
            ],
            "Hex": null,
            "Bin": "AAAOAA"
          },
          "Laegna": {
            "Num": "EAA",
            "Digits": [
              3,
              2,
              2
            ],
            "Hex": null,
            "Bin": "AAAOAO"
          }
        },
        {
          "Decimal": {
            "Num": "60",
            "Signed": "+28",
            "Hex": "3C",
            "Bin": "111100"
          },
          "Wave": {
            "Num": "EAO",
            "Digits": [
              3,
              2,
              1
            ],
            "Hex": null,
            "Bin": "AAAOOA"
          },
          "Laegna": {
            "Num": "EAE",
            "Digits": [
              3,
              2,
              3
            ],
            "Hex": null,
            "Bin": "AAAOAA"
          }
        },
        {
          "Decimal": {
            "Num": "61",
            "Signed": "+29",
            "Hex": "3D",
            "Bin": "111101"
          },
          "Wave": {
            "Num": "EEI",
            "Digits": [
              3,
              3,
              0
            ],
            "Hex": null,
            "Bin": "AAAAOO"
          },
          "Laegna": {
            "Num": "EEI",
            "Digits": [
              3,
              3,
              0
            ],
            "Hex": null,
            "Bin": "AAAAOO"
          }
        },
        {
          "Decimal": {
            "Num": "62",
            "Signed": "+30",
            "Hex": "3E",
            "Bin": "111110"
          },
          "Wave": {
            "Num": "EEO",
            "Digits": [
              3,
              3,
              1
            ],
            "Hex": null,
            "Bin": "AAAAOA"
          },
          "Laegna": {
            "Num": "EEO",
            "Digits": [
              3,
              3,
              1
            ],
            "Hex": null,
            "Bin": "AAAAOA"
          }
        },
        {
          "Decimal": {
            "Num": "63",
            "Signed": "+31",
            "Hex": "3F",
            "Bin": "111111"
          },
          "Wave": {
            "Num": "EEA",
            "Digits": [
              3,
              3,
              2
            ],
            "Hex": null,
            "Bin": "AAAAAO"
          },
          "Laegna": {
            "Num": "EEA",
            "Digits": [
              3,
              3,
              2
            ],
            "Hex": null,
            "Bin": "AAAAAO"
          }
        },
        {
          "Decimal": {
            "Num": "64",
            "Signed": "+32",
            "Hex": "40",
            "Bin": "1000000"
          },
          "Wave": {
            "Num": "EEE",
            "Digits": [
              3,
              3,
              3
            ],
            "Hex": null,
            "Bin": "AAAAAA"
          },
          "Laegna": {
            "Num": "EEE",
            "Digits": [
              3,
              3,
              3
            ],
            "Hex": null,
            "Bin": "AAAAAA"
          }
        },
        {
          "Decimal": {
            "Num": "2inf",
            "Signed": "+inf",
            "Hex": null,
            "Bin": null
          },
          "Wave": {
            "Num": "∩∩∩",
            "Hex": null,
            "Bin": "∩∩∩∩∩∩"
          },
          "Laegna": {
            "Num": "∩∩∩",
            "Hex": null,
            "Bin": "∩∩∩∩∩∩"
          }
        }
      ]
    },
    {
      "R": 4,
      "base": 4,
      "numbers": [
        {
          "Decimal": {
            "Num": "0",
            "Signed": "-inf",
            "Hex": "0",
            "Bin": "0"
          },
          "Wave": {
            "Num": "WWWW",
            "Hex": "WW",
            "Bin": "WWWWWWWW"
          },
          "Laegna": {
            "Num": "WWWW",
            "Hex": "WW",
            "Bin": "WWWWWWWW"
          }
        },
        {
          "Decimal": {
            "Num": "1",
            "Signed": "-8",
            "Hex": "1",
            "Bin": "1"
          },
          "Wave": {
            "Num": "IIII",
            "Digits": [
              0,
              0,
              0,
              0
            ],
            "Hex": "KK",
            "Bin": "OOOOOOOO"
          },
          "Laegna": {
            "Num": "IIII",
            "Digits": [
              0,
              0,
              0,
              0
            ],
            "Hex": "KK",
            "Bin": "OOOOOOOO"
          }
        },
        {
          "Decimal": {
            "Num": "2",
            "Signed": "-7",
            "Hex": "2",
            "Bin": "10"
          },
          "Wave": {
            "Num": "IIIO",
            "Digits": [
              0,
              0,
              0,
              1
            ],
            "Hex": "KJ",
            "Bin": "OOOOOOOA"
          },
          "Laegna": {
            "Num": "IIIO",
            "Digits": [
              0,
              0,
              0,
              1
            ],
            "Hex": "KJ",
            "Bin": "OOOOOOOA"
          }
        },
        {
          "Decimal": {
            "Num": "3",
            "Signed": "-6",
            "Hex": "3",
            "Bin": "11"
          },
          "Wave": {
            "Num": "IIIA",
            "Digits": [
              0,
              0,
              0,
              2
            ],
            "Hex": "KI",
            "Bin": "OOOOOOAO"
          },
          "Laegna": {
            "Num": "IIIA",
            "Digits": [
              0,
              0,
              0,
              2
            ],
            "Hex": "KI",
            "Bin": "OOOOOOAO"
          }
        },
        {
          "Decimal": {
            "Num": "4",
            "Signed": "-5",
            "Hex": "4",
            "Bin": "100"
          },
          "Wave": {
            "Num": "IIIE",
            "Digits": [
              0,
              0,
              0,
              3
            ],
            "Hex": "KL",
            "Bin": "OOOOOOAA"
          },
          "Laegna": {
            "Num": "IIIE",
            "Digits": [
              0,
              0,
              0,
              3
            ],
            "Hex": "KL",
            "Bin": "OOOOOOAA"
          }
        },
        {
          "Decimal": {
            "Num": "5",
            "Signed": "-4",
            "Hex": "5",
            "Bin": "101"
          },
          "Wave": {
            "Num": "IIOA",
            "Digits": [
              0,
              0,
              1,
              2
            ],
            "Hex": "KO",
            "Bin": "OOOOOAAO"
          },
          "Laegna": {
            "Num": "IIOI",
            "Digits": [
              0,
              0,
              1,
              0
            ],
            "Hex": "KQ",
            "Bin": "OOOOOAOO"
          }
        },
        {
          "Decimal": {
            "Num": "6",
            "Signed": "-3",
            "Hex": "6",
            "Bin": "110"
          },
          "Wave": {
            "Num": "IIOI",
            "Digits": [
              0,
              0,
              1,
              0
            ],
            "Hex": "KQ",
            "Bin": "OOOOOAOO"
          },
          "Laegna": {
            "Num": "IIOO",
            "Digits": [
              0,
              0,
              1,
              1
            ],
            "Hex": "KP",
            "Bin": "OOOOOAOA"
          }
        },
        {
          "Decimal": {
            "Num": "7",
            "Signed": "-2",
            "Hex": "7",
            "Bin": "111"
          },
          "Wave": {
            "Num": "IIOE",
            "Digits": [
              0,
              0,
              1,
              3
            ],
            "Hex": "KP",
            "Bin": "OOOOOAAA"
          },
          "Laegna": {
            "Num": "IIOA",
            "Digits": [
              0,
              0,
              1,
              2
            ],
            "Hex": "KO",
            "Bin": "OOOOOAAO"
          }
        },
        {
          "Decimal": {
            "Num": "8",
            "Signed": "-1",
            "Hex": "8",
            "Bin": "1000"
          },
          "Wave": {
            "Num": "IIOO",
            "Digits": [
              0,
              0,
              1,
              1
            ],
            "Hex": "KP",
            "Bin": "OOOOOAOA"
          },
          "Laegna": {
            "Num": "IIOE",
            "Digits": [
              0,
              0,
              1,
              3
            ],
            "Hex": "KP",
            "Bin": "OOOOOAAA"
          }
        },
        {
          "Decimal": {
            "Num": "9",
            "Signed": "0",
            "Hex": "9",
            "Bin": "1001"
          },
          "Wave": {
            "Num": "IIAA",
            "Digits": [
              0,
              0,
              2,
              2
            ],
            "Hex": "KA",
            "Bin": "OOOOAOAO"
          },
          "Laegna": {
            "Num": "IIAI",
            "Digits": [
              0,
              0,
              2,
              0
            ],
            "Hex": "KC",
            "Bin": "OOOOAOOO"
          }
        },
        {
          "Decimal": {
            "Num": "10",
            "Signed": "1",
            "Hex": "A",
            "Bin": "1010"
          },
          "Wave": {
            "Num": "IIAI",
            "Digits": [
              0,
              0,
              2,
              0
            ],
            "Hex": "KC",
            "Bin": "OOOOAOOO"
          },
          "Laegna": {
            "Num": "IIAO",
            "Digits": [
              0,
              0,
              2,
              1
            ],
            "Hex": "KB",
            "Bin": "OOOOAOOA"
          }
        },
        {
          "Decimal": {
            "Num": "11",
            "Signed": "2",
            "Hex": "B",
            "Bin": "1011"
          },
          "Wave": {
            "Num": "IIAE",
            "Digits": [
              0,
              0,
              2,
              3
            ],
            "Hex": "KB",
            "Bin": "OOOOAOAA"
          },
          "Laegna": {
            "Num": "IIAA",
            "Digits": [
              0,
              0,
              2,
              2
            ],
            "Hex": "KA",
            "Bin": "OOOOAOAO"
          }
        },
        {
          "Decimal": {
            "Num": "12",
            "Signed": "3",
            "Hex": "C",
            "Bin": "1100"
          },
          "Wave": {
            "Num": "IIAO",
            "Digits": [
              0,
              0,
              2,
              1
            ],
            "Hex": "KB",
            "Bin": "OOOOAOOA"
          },
          "Laegna": {
            "Num": "IIAE",
            "Digits": [
              0,
              0,
              2,
              3
            ],
            "Hex": "KB",
            "Bin": "OOOOAOAA"
          }
        },
        {
          "Decimal": {
            "Num": "13",
            "Signed": "4",
            "Hex": "D",
            "Bin": "1101"
          },
          "Wave": {
            "Num": "IIEI",
            "Digits": [
              0,
              0,
              3,
              0
            ],
            "Hex": "KG",
            "Bin": "OOOOAAOO"
          },
          "Laegna": {
            "Num": "IIEI",
            "Digits": [
              0,
              0,
              3,
              0
            ],
            "Hex": "KG",
            "Bin": "OOOOAAOO"
          }
        },
        {
          "Decimal": {
            "Num": "14",
            "Signed": "5",
            "Hex": "E",
            "Bin": "1110"
          },
          "Wave": {
            "Num": "IIEO",
            "Digits": [
              0,
              0,
              3,
              1
            ],
            "Hex": "KF",
            "Bin": "OOOOAAOA"
          },
          "Laegna": {
            "Num": "IIEO",
            "Digits": [
              0,
              0,
              3,
              1
            ],
            "Hex": "KF",
            "Bin": "OOOOAAOA"
          }
        },
        {
          "Decimal": {
            "Num": "15",
            "Signed": "6",
            "Hex": "F",
            "Bin": "1111"
          },
          "Wave": {
            "Num": "IIEA",
            "Digits": [
              0,
              0,
              3,
              2
            ],
            "Hex": "KE",
            "Bin": "OOOOAAAO"
          },
          "Laegna": {
            "Num": "IIEA",
            "Digits": [
              0,
              0,
              3,
              2
            ],
            "Hex": "KE",
            "Bin": "OOOOAAAO"
          }
        },
        {
          "Decimal": {
            "Num": "16",
            "Signed": "7",
            "Hex": "10",
            "Bin": "10000"
          },
          "Wave": {
            "Num": "IIEE",
            "Digits": [
              0,
              0,
              3,
              3
            ],
            "Hex": "KF",
            "Bin": "OOOOAAAA"
          },
          "Laegna": {
            "Num": "IIEE",
            "Digits": [
              0,
              0,
              3,
              3
            ],
            "Hex": "KF",
            "Bin": "OOOOAAAA"
          }
        },
        {
          "Decimal": {
            "Num": "17",
            "Signed": "8",
            "Hex": "11",
            "Bin": "10001"
          },
          "Wave": {
            "Num": "IOAA",
            "Digits": [
              0,
              1,
              2,
              2
            ],
            "Hex": "JA",
            "Bin": "OOOAAOAO"
          },
          "Laegna": {
            "Num": "IOII",
            "Digits": [
              0,
              1,
              0,
              0
            ],
            "Hex": "JK",
            "Bin": "OOOAOOOO"
          }
        },
        {
          "Decimal": {
            "Num": "18",
            "Signed": "9",
            "Hex": "12",
            "Bin": "10010"
          },
          "Wave": {
            "Num": "IOAI",
            "Digits": [
              0,
              1,
              2,
              0
            ],
            "Hex": "JC",
            "Bin": "OOOAAOOO"
          },
          "Laegna": {
            "Num": "IOIO",
            "Digits": [
              0,
              1,
              0,
              1
            ],
            "Hex": "JJ",
            "Bin": "OOOAOOOA"
          }
        },
        {
          "Decimal": {
            "Num": "19",
            "Signed": "10",
            "Hex": "13",
            "Bin": "10011"
          },
          "Wave": {
            "Num": "IOAE",
            "Digits": [
              0,
              1,
              2,
              3
            ],
            "Hex": "JB",
            "Bin": "OOOAAOAA"
          },
          "Laegna": {
            "Num": "IOIA",
            "Digits": [
              0,
              1,
              0,
              2
            ],
            "Hex": "JI",
            "Bin": "OOOAOOAO"
          }
        },
        {
          "Decimal": {
            "Num": "20",
            "Signed": "11",
            "Hex": "14",
            "Bin": "10100"
          },
          "Wave": {
            "Num": "IOAO",
            "Digits": [
              0,
              1,
              2,
              1
            ],
            "Hex": "JB",
            "Bin": "OOOAAOOA"
          },
          "Laegna": {
            "Num": "IOIE",
            "Digits": [
              0,
              1,
              0,
              3
            ],
            "Hex": "JL",
            "Bin": "OOOAOOAA"
          }
        },
        {
          "Decimal": {
            "Num": "21",
            "Signed": "12",
            "Hex": "15",
            "Bin": "10101"
          },
          "Wave": {
            "Num": "IOII",
            "Digits": [
              0,
              1,
              0,
              0
            ],
            "Hex": "JK",
            "Bin": "OOOAOOOO"
          },
          "Laegna": {
            "Num": "IOOI",
            "Digits": [
              0,
              1,
              1,
              0
            ],
            "Hex": "JQ",
            "Bin": "OOOAOAOO"
          }
        },
        {
          "Decimal": {
            "Num": "22",
            "Signed": "13",
            "Hex": "16",
            "Bin": "10110"
          },
          "Wave": {
            "Num": "IOIO",
            "Digits": [
              0,
              1,
              0,
              1
            ],
            "Hex": "JJ",
            "Bin": "OOOAOOOA"
          },
          "Laegna": {
            "Num": "IOOO",
            "Digits": [
              0,
              1,
              1,
              1
            ],
            "Hex": "JP",
            "Bin": "OOOAOAOA"
          }
        },
        {
          "Decimal": {
            "Num": "23",
            "Signed": "14",
            "Hex": "17",
            "Bin": "10111"
          },
          "Wave": {
            "Num": "IOIA",
            "Digits": [
              0,
              1,
              0,
              2
            ],
            "Hex": "JI",
            "Bin": "OOOAOOAO"
          },
          "Laegna": {
            "Num": "IOOA",
            "Digits": [
              0,
              1,
              1,
              2
            ],
            "Hex": "JO",
            "Bin": "OOOAOAAO"
          }
        },
        {
          "Decimal": {
            "Num": "24",
            "Signed": "15",
            "Hex": "18",
            "Bin": "11000"
          },
          "Wave": {
            "Num": "IOIE",
            "Digits": [
              0,
              1,
              0,
              3
            ],
            "Hex": "JL",
            "Bin": "OOOAOOAA"
          },
          "Laegna": {
            "Num": "IOOE",
            "Digits": [
              0,
              1,
              1,
              3
            ],
            "Hex": "JP",
            "Bin": "OOOAOAAA"
          }
        },
        {
          "Decimal": {
            "Num": "25",
            "Signed": "16",
            "Hex": "19",
            "Bin": "11001"
          },
          "Wave": {
            "Num": "IOEI",
            "Digits": [
              0,
              1,
              3,
              0
            ],
            "Hex": "JG",
            "Bin": "OOOAAAOO"
          },
          "Laegna": {
            "Num": "IOAI",
            "Digits": [
              0,
              1,
              2,
              0
            ],
            "Hex": "JC",
            "Bin": "OOOAAOOO"
          }
        },
        {
          "Decimal": {
            "Num": "26",
            "Signed": "17",
            "Hex": "1A",
            "Bin": "11010"
          },
          "Wave": {
            "Num": "IOEO",
            "Digits": [
              0,
              1,
              3,
              1
            ],
            "Hex": "JF",
            "Bin": "OOOAAAOA"
          },
          "Laegna": {
            "Num": "IOAO",
            "Digits": [
              0,
              1,
              2,
              1
            ],
            "Hex": "JB",
            "Bin": "OOOAAOOA"
          }
        },
        {
          "Decimal": {
            "Num": "27",
            "Signed": "18",
            "Hex": "1B",
            "Bin": "11011"
          },
          "Wave": {
            "Num": "IOEA",
            "Digits": [
              0,
              1,
              3,
              2
            ],
            "Hex": "JE",
            "Bin": "OOOAAAAO"
          },
          "Laegna": {
            "Num": "IOAA",
            "Digits": [
              0,
              1,
              2,
              2
            ],
            "Hex": "JA",
            "Bin": "OOOAAOAO"
          }
        },
        {
          "Decimal": {
            "Num": "28",
            "Signed": "19",
            "Hex": "1C",
            "Bin": "11100"
          },
          "Wave": {
            "Num": "IOEE",
            "Digits": [
              0,
              1,
              3,
              3
            ],
            "Hex": "JF",
            "Bin": "OOOAAAAA"
          },
          "Laegna": {
            "Num": "IOAE",
            "Digits": [
              0,
              1,
              2,
              3
            ],
            "Hex": "JB",
            "Bin": "OOOAAOAA"
          }
        },
        {
          "Decimal": {
            "Num": "29",
            "Signed": "20",
            "Hex": "1D",
            "Bin": "11101"
          },
          "Wave": {
            "Num": "IOOA",
            "Digits": [
              0,
              1,
              1,
              2
            ],
            "Hex": "JO",
            "Bin": "OOOAOAAO"
          },
          "Laegna": {
            "Num": "IOEI",
            "Digits": [
              0,
              1,
              3,
              0
            ],
            "Hex": "JG",
            "Bin": "OOOAAAOO"
          }
        },
        {
          "Decimal": {
            "Num": "30",
            "Signed": "21",
            "Hex": "1E",
            "Bin": "11110"
          },
          "Wave": {
            "Num": "IOOI",
            "Digits": [
              0,
              1,
              1,
              0
            ],
            "Hex": "JQ",
            "Bin": "OOOAOAOO"
          },
          "Laegna": {
            "Num": "IOEO",
            "Digits": [
              0,
              1,
              3,
              1
            ],
            "Hex": "JF",
            "Bin": "OOOAAAOA"
          }
        },
        {
          "Decimal": {
            "Num": "31",
            "Signed": "22",
            "Hex": "1F",
            "Bin": "11111"
          },
          "Wave": {
            "Num": "IOOE",
            "Digits": [
              0,
              1,
              1,
              3
            ],
            "Hex": "JP",
            "Bin": "OOOAOAAA"
          },
          "Laegna": {
            "Num": "IOEA",
            "Digits": [
              0,
              1,
              3,
              2
            ],
            "Hex": "JE",
            "Bin": "OOOAAAAO"
          }
        },
        {
          "Decimal": {
            "Num": "32",
            "Signed": "23",
            "Hex": "20",
            "Bin": "100000"
          },
          "Wave": {
            "Num": "IOOO",
            "Digits": [
              0,
              1,
              1,
              1
            ],
            "Hex": "JP",
            "Bin": "OOOAOAOA"
          },
          "Laegna": {
            "Num": "IOEE",
            "Digits": [
              0,
              1,
              3,
              3
            ],
            "Hex": "JF",
            "Bin": "OOOAAAAA"
          }
        },
        {
          "Decimal": {
            "Num": "33",
            "Signed": "24",
            "Hex": "21",
            "Bin": "100001"
          },
          "Wave": {
            "Num": "IAAA",
            "Digits": [
              0,
              2,
              2,
              2
            ],
            "Hex": "IA",
            "Bin": "OOAOAOAO"
          },
          "Laegna": {
            "Num": "IAII",
            "Digits": [
              0,
              2,
              0,
              0
            ],
            "Hex": "IK",
            "Bin": "OOAOOOOO"
          }
        },
        {
          "Decimal": {
            "Num": "34",
            "Signed": "25",
            "Hex": "22",
            "Bin": "100010"
          },
          "Wave": {
            "Num": "IAAI",
            "Digits": [
              0,
              2,
              2,
              0
            ],
            "Hex": "IC",
            "Bin": "OOAOAOOO"
          },
          "Laegna": {
            "Num": "IAIO",
            "Digits": [
              0,
              2,
              0,
              1
            ],
            "Hex": "IJ",
            "Bin": "OOAOOOOA"
          }
        },
        {
          "Decimal": {
            "Num": "35",
            "Signed": "26",
            "Hex": "23",
            "Bin": "100011"
          },
          "Wave": {
            "Num": "IAAE",
            "Digits": [
              0,
              2,
              2,
              3
            ],
            "Hex": "IB",
            "Bin": "OOAOAOAA"
          },
          "Laegna": {
            "Num": "IAIA",
            "Digits": [
              0,
              2,
              0,
              2
            ],
            "Hex": "II",
            "Bin": "OOAOOOAO"
          }
        },
        {
          "Decimal": {
            "Num": "36",
            "Signed": "27",
            "Hex": "24",
            "Bin": "100100"
          },
          "Wave": {
            "Num": "IAAO",
            "Digits": [
              0,
              2,
              2,
              1
            ],
            "Hex": "IB",
            "Bin": "OOAOAOOA"
          },
          "Laegna": {
            "Num": "IAIE",
            "Digits": [
              0,
              2,
              0,
              3
            ],
            "Hex": "IL",
            "Bin": "OOAOOOAA"
          }
        },
        {
          "Decimal": {
            "Num": "37",
            "Signed": "28",
            "Hex": "25",
            "Bin": "100101"
          },
          "Wave": {
            "Num": "IAII",
            "Digits": [
              0,
              2,
              0,
              0
            ],
            "Hex": "IK",
            "Bin": "OOAOOOOO"
          },
          "Laegna": {
            "Num": "IAOI",
            "Digits": [
              0,
              2,
              1,
              0
            ],
            "Hex": "IQ",
            "Bin": "OOAOOAOO"
          }
        },
        {
          "Decimal": {
            "Num": "38",
            "Signed": "29",
            "Hex": "26",
            "Bin": "100110"
          },
          "Wave": {
            "Num": "IAIO",
            "Digits": [
              0,
              2,
              0,
              1
            ],
            "Hex": "IJ",
            "Bin": "OOAOOOOA"
          },
          "Laegna": {
            "Num": "IAOO",
            "Digits": [
              0,
              2,
              1,
              1
            ],
            "Hex": "IP",
            "Bin": "OOAOOAOA"
          }
        },
        {
          "Decimal": {
            "Num": "39",
            "Signed": "30",
            "Hex": "27",
            "Bin": "100111"
          },
          "Wave": {
            "Num": "IAIA",
            "Digits": [
              0,
              2,
              0,
              2
            ],
            "Hex": "II",
            "Bin": "OOAOOOAO"
          },
          "Laegna": {
            "Num": "IAOA",
            "Digits": [
              0,
              2,
              1,
              2
            ],
            "Hex": "IO",
            "Bin": "OOAOOAAO"
          }
        },
        {
          "Decimal": {
            "Num": "40",
            "Signed": "31",
            "Hex": "28",
            "Bin": "101000"
          },
          "Wave": {
            "Num": "IAIE",
            "Digits": [
              0,
              2,
              0,
              3
            ],
            "Hex": "IL",
            "Bin": "OOAOOOAA"
          },
          "Laegna": {
            "Num": "IAOE",
            "Digits": [
              0,
              2,
              1,
              3
            ],
            "Hex": "IP",
            "Bin": "OOAOOAAA"
          }
        },
        {
          "Decimal": {
            "Num": "41",
            "Signed": "32",
            "Hex": "29",
            "Bin": "101001"
          },
          "Wave": {
            "Num": "IAEI",
            "Digits": [
              0,
              2,
              3,
              0
            ],
            "Hex": "IG",
            "Bin": "OOAOAAOO"
          },
          "Laegna": {
            "Num": "IAAI",
            "Digits": [
              0,
              2,
              2,
              0
            ],
            "Hex": "IC",
            "Bin": "OOAOAOOO"
          }
        },
        {
          "Decimal": {
            "Num": "42",
            "Signed": "33",
            "Hex": "2A",
            "Bin": "101010"
          },
          "Wave": {
            "Num": "IAEO",
            "Digits": [
              0,
              2,
              3,
              1
            ],
            "Hex": "IF",
            "Bin": "OOAOAAOA"
          },
          "Laegna": {
            "Num": "IAAO",
            "Digits": [
              0,
              2,
              2,
              1
            ],
            "Hex": "IB",
            "Bin": "OOAOAOOA"
          }
        },
        {
          "Decimal": {
            "Num": "43",
            "Signed": "34",
            "Hex": "2B",
            "Bin": "101011"
          },
          "Wave": {
            "Num": "IAEA",
            "Digits": [
              0,
              2,
              3,
              2
            ],
            "Hex": "IE",
            "Bin": "OOAOAAAO"
          },
          "Laegna": {
            "Num": "IAAA",
            "Digits": [
              0,
              2,
              2,
              2
            ],
            "Hex": "IA",
            "Bin": "OOAOAOAO"
          }
        },
        {
          "Decimal": {
            "Num": "44",
            "Signed": "35",
            "Hex": "2C",
            "Bin": "101100"
          },
          "Wave": {
            "Num": "IAEE",
            "Digits": [
              0,
              2,
              3,
              3
            ],
            "Hex": "IF",
            "Bin": "OOAOAAAA"
          },
          "Laegna": {
            "Num": "IAAE",
            "Digits": [
              0,
              2,
              2,
              3
            ],
            "Hex": "IB",
            "Bin": "OOAOAOAA"
          }
        },
        {
          "Decimal": {
            "Num": "45",
            "Signed": "36",
            "Hex": "2D",
            "Bin": "101101"
          },
          "Wave": {
            "Num": "IAOA",
            "Digits": [
              0,
              2,
              1,
              2
            ],
            "Hex": "IO",
            "Bin": "OOAOOAAO"
          },
          "Laegna": {
            "Num": "IAEI",
            "Digits": [
              0,
              2,
              3,
              0
            ],
            "Hex": "IG",
            "Bin": "OOAOAAOO"
          }
        },
        {
          "Decimal": {
            "Num": "46",
            "Signed": "37",
            "Hex": "2E",
            "Bin": "101110"
          },
          "Wave": {
            "Num": "IAOI",
            "Digits": [
              0,
              2,
              1,
              0
            ],
            "Hex": "IQ",
            "Bin": "OOAOOAOO"
          },
          "Laegna": {
            "Num": "IAEO",
            "Digits": [
              0,
              2,
              3,
              1
            ],
            "Hex": "IF",
            "Bin": "OOAOAAOA"
          }
        },
        {
          "Decimal": {
            "Num": "47",
            "Signed": "38",
            "Hex": "2F",
            "Bin": "101111"
          },
          "Wave": {
            "Num": "IAOE",
            "Digits": [
              0,
              2,
              1,
              3
            ],
            "Hex": "IP",
            "Bin": "OOAOOAAA"
          },
          "Laegna": {
            "Num": "IAEA",
            "Digits": [
              0,
              2,
              3,
              2
            ],
            "Hex": "IE",
            "Bin": "OOAOAAAO"
          }
        },
        {
          "Decimal": {
            "Num": "48",
            "Signed": "39",
            "Hex": "30",
            "Bin": "110000"
          },
          "Wave": {
            "Num": "IAOO",
            "Digits": [
              0,
              2,
              1,
              1
            ],
            "Hex": "IP",
            "Bin": "OOAOOAOA"
          },
          "Laegna": {
            "Num": "IAEE",
            "Digits": [
              0,
              2,
              3,
              3
            ],
            "Hex": "IF",
            "Bin": "OOAOAAAA"
          }
        },
        {
          "Decimal": {
            "Num": "49",
            "Signed": "40",
            "Hex": "31",
            "Bin": "110001"
          },
          "Wave": {
            "Num": "IEII",
            "Digits": [
              0,
              3,
              0,
              0
            ],
            "Hex": "LK",
            "Bin": "OOAAOOOO"
          },
          "Laegna": {
            "Num": "IEII",
            "Digits": [
              0,
              3,
              0,
              0
            ],
            "Hex": "LK",
            "Bin": "OOAAOOOO"
          }
        },
        {
          "Decimal": {
            "Num": "50",
            "Signed": "41",
            "Hex": "32",
            "Bin": "110010"
          },
          "Wave": {
            "Num": "IEIO",
            "Digits": [
              0,
              3,
              0,
              1
            ],
            "Hex": "LJ",
            "Bin": "OOAAOOOA"
          },
          "Laegna": {
            "Num": "IEIO",
            "Digits": [
              0,
              3,
              0,
              1
            ],
            "Hex": "LJ",
            "Bin": "OOAAOOOA"
          }
        },
        {
          "Decimal": {
            "Num": "51",
            "Signed": "42",
            "Hex": "33",
            "Bin": "110011"
          },
          "Wave": {
            "Num": "IEIA",
            "Digits": [
              0,
              3,
              0,
              2
            ],
            "Hex": "LI",
            "Bin": "OOAAOOAO"
          },
          "Laegna": {
            "Num": "IEIA",
            "Digits": [
              0,
              3,
              0,
              2
            ],
            "Hex": "LI",
            "Bin": "OOAAOOAO"
          }
        },
        {
          "Decimal": {
            "Num": "52",
            "Signed": "43",
            "Hex": "34",
            "Bin": "110100"
          },
          "Wave": {
            "Num": "IEIE",
            "Digits": [
              0,
              3,
              0,
              3
            ],
            "Hex": "LL",
            "Bin": "OOAAOOAA"
          },
          "Laegna": {
            "Num": "IEIE",
            "Digits": [
              0,
              3,
              0,
              3
            ],
            "Hex": "LL",
            "Bin": "OOAAOOAA"
          }
        },
        {
          "Decimal": {
            "Num": "53",
            "Signed": "44",
            "Hex": "35",
            "Bin": "110101"
          },
          "Wave": {
            "Num": "IEOA",
            "Digits": [
              0,
              3,
              1,
              2
            ],
            "Hex": "LO",
            "Bin": "OOAAOAAO"
          },
          "Laegna": {
            "Num": "IEOI",
            "Digits": [
              0,
              3,
              1,
              0
            ],
            "Hex": "LQ",
            "Bin": "OOAAOAOO"
          }
        },
        {
          "Decimal": {
            "Num": "54",
            "Signed": "45",
            "Hex": "36",
            "Bin": "110110"
          },
          "Wave": {
            "Num": "IEOI",
            "Digits": [
              0,
              3,
              1,
              0
            ],
            "Hex": "LQ",
            "Bin": "OOAAOAOO"
          },
          "Laegna": {
            "Num": "IEOO",
            "Digits": [
              0,
              3,
              1,
              1
            ],
            "Hex": "LP",
            "Bin": "OOAAOAOA"
          }
        },
        {
          "Decimal": {
            "Num": "55",
            "Signed": "46",
            "Hex": "37",
            "Bin": "110111"
          },
          "Wave": {
            "Num": "IEOE",
            "Digits": [
              0,
              3,
              1,
              3
            ],
            "Hex": "LP",
            "Bin": "OOAAOAAA"
          },
          "Laegna": {
            "Num": "IEOA",
            "Digits": [
              0,
              3,
              1,
              2
            ],
            "Hex": "LO",
            "Bin": "OOAAOAAO"
          }
        },
        {
          "Decimal": {
            "Num": "56",
            "Signed": "47",
            "Hex": "38",
            "Bin": "111000"
          },
          "Wave": {
            "Num": "IEOO",
            "Digits": [
              0,
              3,
              1,
              1
            ],
            "Hex": "LP",
            "Bin": "OOAAOAOA"
          },
          "Laegna": {
            "Num": "IEOE",
            "Digits": [
              0,
              3,
              1,
              3
            ],
            "Hex": "LP",
            "Bin": "OOAAOAAA"
          }
        },
        {
          "Decimal": {
            "Num": "57",
            "Signed": "48",
            "Hex": "39",
            "Bin": "111001"
          },
          "Wave": {
            "Num": "IEAA",
            "Digits": [
              0,
              3,
              2,
              2
            ],
            "Hex": "LA",
            "Bin": "OOAAAOAO"
          },
          "Laegna": {
            "Num": "IEAI",
            "Digits": [
              0,
              3,
              2,
              0
            ],
            "Hex": "LC",
            "Bin": "OOAAAOOO"
          }
        },
        {
          "Decimal": {
            "Num": "58",
            "Signed": "49",
            "Hex": "3A",
            "Bin": "111010"
          },
          "Wave": {
            "Num": "IEAI",
            "Digits": [
              0,
              3,
              2,
              0
            ],
            "Hex": "LC",
            "Bin": "OOAAAOOO"
          },
          "Laegna": {
            "Num": "IEAO",
            "Digits": [
              0,
              3,
              2,
              1
            ],
            "Hex": "LB",
            "Bin": "OOAAAOOA"
          }
        },
        {
          "Decimal": {
            "Num": "59",
            "Signed": "50",
            "Hex": "3B",
            "Bin": "111011"
          },
          "Wave": {
            "Num": "IEAE",
            "Digits": [
              0,
              3,
              2,
              3
            ],
            "Hex": "LB",
            "Bin": "OOAAAOAA"
          },
          "Laegna": {
            "Num": "IEAA",
            "Digits": [
              0,
              3,
              2,
              2
            ],
            "Hex": "LA",
            "Bin": "OOAAAOAO"
          }
        },
        {
          "Decimal": {
            "Num": "60",
            "Signed": "51",
            "Hex": "3C",
            "Bin": "111100"
          },
          "Wave": {
            "Num": "IEAO",
            "Digits": [
              0,
              3,
              2,
              1
            ],
            "Hex": "LB",
            "Bin": "OOAAAOOA"
          },
          "Laegna": {
            "Num": "IEAE",
            "Digits": [
              0,
              3,
              2,
              3
            ],
            "Hex": "LB",
            "Bin": "OOAAAOAA"
          }
        },
        {
          "Decimal": {
            "Num": "61",
            "Signed": "52",
            "Hex": "3D",
            "Bin": "111101"
          },
          "Wave": {
            "Num": "IEEI",
            "Digits": [
              0,
              3,
              3,
              0
            ],
            "Hex": "LG",
            "Bin": "OOAAAAOO"
          },
          "Laegna": {
            "Num": "IEEI",
            "Digits": [
              0,
              3,
              3,
              0
            ],
            "Hex": "LG",
            "Bin": "OOAAAAOO"
          }
        },
        {
          "Decimal": {
            "Num": "62",
            "Signed": "53",
            "Hex": "3E",
            "Bin": "111110"
          },
          "Wave": {
            "Num": "IEEO",
            "Digits": [
              0,
              3,
              3,
              1
            ],
            "Hex": "LF",
            "Bin": "OOAAAAOA"
          },
          "Laegna": {
            "Num": "IEEO",
            "Digits": [
              0,
              3,
              3,
              1
            ],
            "Hex": "LF",
            "Bin": "OOAAAAOA"
          }
        },
        {
          "Decimal": {
            "Num": "63",
            "Signed": "54",
            "Hex": "3F",
            "Bin": "111111"
          },
          "Wave": {
            "Num": "IEEA",
            "Digits": [
              0,
              3,
              3,
              2
            ],
            "Hex": "LE",
            "Bin": "OOAAAAAO"
          },
          "Laegna": {
            "Num": "IEEA",
            "Digits": [
              0,
              3,
              3,
              2
            ],
            "Hex": "LE",
            "Bin": "OOAAAAAO"
          }
        },
        {
          "Decimal": {
            "Num": "64",
            "Signed": "55",
            "Hex": "40",
            "Bin": "1000000"
          },
          "Wave": {
            "Num": "IEEE",
            "Digits": [
              0,
              3,
              3,
              3
            ],
            "Hex": "LF",
            "Bin": "OOAAAAAA"
          },
          "Laegna": {
            "Num": "IEEE",
            "Digits": [
              0,
              3,
              3,
              3
            ],
            "Hex": "LF",
            "Bin": "OOAAAAAA"
          }
        },
        {
          "Decimal": {
            "Num": "65",
            "Signed": "56",
            "Hex": "41",
            "Bin": "1000001"
          },
          "Wave": {
            "Num": "OAAA",
            "Digits": [
              1,
              2,
              2,
              2
            ],
            "Hex": "OA",
            "Bin": "OAAOAOAO"
          },
          "Laegna": {
            "Num": "OIII",
            "Digits": [
              1,
              0,
              0,
              0
            ],
            "Hex": "QK",
            "Bin": "OAOOOOOO"
          }
        },
        {
          "Decimal": {
            "Num": "66",
            "Signed": "57",
            "Hex": "42",
            "Bin": "1000010"
          },
          "Wave": {
            "Num": "OAAI",
            "Digits": [
              1,
              2,
              2,
              0
            ],
            "Hex": "OC",
            "Bin": "OAAOAOOO"
          },
          "Laegna": {
            "Num": "OIIO",
            "Digits": [
              1,
              0,
              0,
              1
            ],
            "Hex": "QJ",
            "Bin": "OAOOOOOA"
          }
        },
        {
          "Decimal": {
            "Num": "67",
            "Signed": "58",
            "Hex": "43",
            "Bin": "1000011"
          },
          "Wave": {
            "Num": "OAAE",
            "Digits": [
              1,
              2,
              2,
              3
            ],
            "Hex": "OB",
            "Bin": "OAAOAOAA"
          },
          "Laegna": {
            "Num": "OIIA",
            "Digits": [
              1,
              0,
              0,
              2
            ],
            "Hex": "QI",
            "Bin": "OAOOOOAO"
          }
        },
        {
          "Decimal": {
            "Num": "68",
            "Signed": "59",
            "Hex": "44",
            "Bin": "1000100"
          },
          "Wave": {
            "Num": "OAAO",
            "Digits": [
              1,
              2,
              2,
              1
            ],
            "Hex": "OB",
            "Bin": "OAAOAOOA"
          },
          "Laegna": {
            "Num": "OIIE",
            "Digits": [
              1,
              0,
              0,
              3
            ],
            "Hex": "QL",
            "Bin": "OAOOOOAA"
          }
        },
        {
          "Decimal": {
            "Num": "69",
            "Signed": "60",
            "Hex": "45",
            "Bin": "1000101"
          },
          "Wave": {
            "Num": "OAII",
            "Digits": [
              1,
              2,
              0,
              0
            ],
            "Hex": "OK",
            "Bin": "OAAOOOOO"
          },
          "Laegna": {
            "Num": "OIOI",
            "Digits": [
              1,
              0,
              1,
              0
            ],
            "Hex": "QQ",
            "Bin": "OAOOOAOO"
          }
        },
        {
          "Decimal": {
            "Num": "70",
            "Signed": "61",
            "Hex": "46",
            "Bin": "1000110"
          },
          "Wave": {
            "Num": "OAIO",
            "Digits": [
              1,
              2,
              0,
              1
            ],
            "Hex": "OJ",
            "Bin": "OAAOOOOA"
          },
          "Laegna": {
            "Num": "OIOO",
            "Digits": [
              1,
              0,
              1,
              1
            ],
            "Hex": "QP",
            "Bin": "OAOOOAOA"
          }
        },
        {
          "Decimal": {
            "Num": "71",
            "Signed": "62",
            "Hex": "47",
            "Bin": "1000111"
          },
          "Wave": {
            "Num": "OAIA",
            "Digits": [
              1,
              2,
              0,
              2
            ],
            "Hex": "OI",
            "Bin": "OAAOOOAO"
          },
          "Laegna": {
            "Num": "OIOA",
            "Digits": [
              1,
              0,
              1,
              2
            ],
            "Hex": "QO",
            "Bin": "OAOOOAAO"
          }
        },
        {
          "Decimal": {
            "Num": "72",
            "Signed": "63",
            "Hex": "48",
            "Bin": "1001000"
          },
          "Wave": {
            "Num": "OAIE",
            "Digits": [
              1,
              2,
              0,
              3
            ],
            "Hex": "OL",
            "Bin": "OAAOOOAA"
          },
          "Laegna": {
            "Num": "OIOE",
            "Digits": [
              1,
              0,
              1,
              3
            ],
            "Hex": "QP",
            "Bin": "OAOOOAAA"
          }
        },
        {
          "Decimal": {
            "Num": "73",
            "Signed": "64",
            "Hex": "49",
            "Bin": "1001001"
          },
          "Wave": {
            "Num": "OAEI",
            "Digits": [
              1,
              2,
              3,
              0
            ],
            "Hex": "OG",
            "Bin": "OAAOAAOO"
          },
          "Laegna": {
            "Num": "OIAI",
            "Digits": [
              1,
              0,
              2,
              0
            ],
            "Hex": "QC",
            "Bin": "OAOOAOOO"
          }
        },
        {
          "Decimal": {
            "Num": "74",
            "Signed": "65",
            "Hex": "4A",
            "Bin": "1001010"
          },
          "Wave": {
            "Num": "OAEO",
            "Digits": [
              1,
              2,
              3,
              1
            ],
            "Hex": "OF",
            "Bin": "OAAOAAOA"
          },
          "Laegna": {
            "Num": "OIAO",
            "Digits": [
              1,
              0,
              2,
              1
            ],
            "Hex": "QB",
            "Bin": "OAOOAOOA"
          }
        },
        {
          "Decimal": {
            "Num": "75",
            "Signed": "66",
            "Hex": "4B",
            "Bin": "1001011"
          },
          "Wave": {
            "Num": "OAEA",
            "Digits": [
              1,
              2,
              3,
              2
            ],
            "Hex": "OE",
            "Bin": "OAAOAAAO"
          },
          "Laegna": {
            "Num": "OIAA",
            "Digits": [
              1,
              0,
              2,
              2
            ],
            "Hex": "QA",
            "Bin": "OAOOAOAO"
          }
        },
        {
          "Decimal": {
            "Num": "76",
            "Signed": "67",
            "Hex": "4C",
            "Bin": "1001100"
          },
          "Wave": {
            "Num": "OAEE",
            "Digits": [
              1,
              2,
              3,
              3
            ],
            "Hex": "OF",
            "Bin": "OAAOAAAA"
          },
          "Laegna": {
            "Num": "OIAE",
            "Digits": [
              1,
              0,
              2,
              3
            ],
            "Hex": "QB",
            "Bin": "OAOOAOAA"
          }
        },
        {
          "Decimal": {
            "Num": "77",
            "Signed": "68",
            "Hex": "4D",
            "Bin": "1001101"
          },
          "Wave": {
            "Num": "OAOA",
            "Digits": [
              1,
              2,
              1,
              2
            ],
            "Hex": "OO",
            "Bin": "OAAOOAAO"
          },
          "Laegna": {
            "Num": "OIEI",
            "Digits": [
              1,
              0,
              3,
              0
            ],
            "Hex": "QG",
            "Bin": "OAOOAAOO"
          }
        },
        {
          "Decimal": {
            "Num": "78",
            "Signed": "69",
            "Hex": "4E",
            "Bin": "1001110"
          },
          "Wave": {
            "Num": "OAOI",
            "Digits": [
              1,
              2,
              1,
              0
            ],
            "Hex": "OQ",
            "Bin": "OAAOOAOO"
          },
          "Laegna": {
            "Num": "OIEO",
            "Digits": [
              1,
              0,
              3,
              1
            ],
            "Hex": "QF",
            "Bin": "OAOOAAOA"
          }
        },
        {
          "Decimal": {
            "Num": "79",
            "Signed": "70",
            "Hex": "4F",
            "Bin": "1001111"
          },
          "Wave": {
            "Num": "OAOE",
            "Digits": [
              1,
              2,
              1,
              3
            ],
            "Hex": "OP",
            "Bin": "OAAOOAAA"
          },
          "Laegna": {
            "Num": "OIEA",
            "Digits": [
              1,
              0,
              3,
              2
            ],
            "Hex": "QE",
            "Bin": "OAOOAAAO"
          }
        },
        {
          "Decimal": {
            "Num": "80",
            "Signed": "71",
            "Hex": "50",
            "Bin": "1010000"
          },
          "Wave": {
            "Num": "OAOO",
            "Digits": [
              1,
              2,
              1,
              1
            ],
            "Hex": "OP",
            "Bin": "OAAOOAOA"
          },
          "Laegna": {
            "Num": "OIEE",
            "Digits": [
              1,
              0,
              3,
              3
            ],
            "Hex": "QF",
            "Bin": "OAOOAAAA"
          }
        },
        {
          "Decimal": {
            "Num": "81",
            "Signed": "72",
            "Hex": "51",
            "Bin": "1010001"
          },
          "Wave": {
            "Num": "OIII",
            "Digits": [
              1,
              0,
              0,
              0
            ],
            "Hex": "QK",
            "Bin": "OAOOOOOO"
          },
          "Laegna": {
            "Num": "OOII",
            "Digits": [
              1,
              1,
              0,
              0
            ],
            "Hex": "PK",
            "Bin": "OAOAOOOO"
          }
        },
        {
          "Decimal": {
            "Num": "82",
            "Signed": "73",
            "Hex": "52",
            "Bin": "1010010"
          },
          "Wave": {
            "Num": "OIIO",
            "Digits": [
              1,
              0,
              0,
              1
            ],
            "Hex": "QJ",
            "Bin": "OAOOOOOA"
          },
          "Laegna": {
            "Num": "OOIO",
            "Digits": [
              1,
              1,
              0,
              1
            ],
            "Hex": "PJ",
            "Bin": "OAOAOOOA"
          }
        },
        {
          "Decimal": {
            "Num": "83",
            "Signed": "74",
            "Hex": "53",
            "Bin": "1010011"
          },
          "Wave": {
            "Num": "OIIA",
            "Digits": [
              1,
              0,
              0,
              2
            ],
            "Hex": "QI",
            "Bin": "OAOOOOAO"
          },
          "Laegna": {
            "Num": "OOIA",
            "Digits": [
              1,
              1,
              0,
              2
            ],
            "Hex": "PI",
            "Bin": "OAOAOOAO"
          }
        },
        {
          "Decimal": {
            "Num": "84",
            "Signed": "75",
            "Hex": "54",
            "Bin": "1010100"
          },
          "Wave": {
            "Num": "OIIE",
            "Digits": [
              1,
              0,
              0,
              3
            ],
            "Hex": "QL",
            "Bin": "OAOOOOAA"
          },
          "Laegna": {
            "Num": "OOIE",
            "Digits": [
              1,
              1,
              0,
              3
            ],
            "Hex": "PL",
            "Bin": "OAOAOOAA"
          }
        },
        {
          "Decimal": {
            "Num": "85",
            "Signed": "76",
            "Hex": "55",
            "Bin": "1010101"
          },
          "Wave": {
            "Num": "OIOA",
            "Digits": [
              1,
              0,
              1,
              2
            ],
            "Hex": "QO",
            "Bin": "OAOOOAAO"
          },
          "Laegna": {
            "Num": "OOOI",
            "Digits": [
              1,
              1,
              1,
              0
            ],
            "Hex": "PQ",
            "Bin": "OAOAOAOO"
          }
        },
        {
          "Decimal": {
            "Num": "86",
            "Signed": "77",
            "Hex": "56",
            "Bin": "1010110"
          },
          "Wave": {
            "Num": "OIOI",
            "Digits": [
              1,
              0,
              1,
              0
            ],
            "Hex": "QQ",
            "Bin": "OAOOOAOO"
          },
          "Laegna": {
            "Num": "OOOO",
            "Digits": [
              1,
              1,
              1,
              1
            ],
            "Hex": "PP",
            "Bin": "OAOAOAOA"
          }
        },
        {
          "Decimal": {
            "Num": "87",
            "Signed": "78",
            "Hex": "57",
            "Bin": "1010111"
          },
          "Wave": {
            "Num": "OIOE",
            "Digits": [
              1,
              0,
              1,
              3
            ],
            "Hex": "QP",
            "Bin": "OAOOOAAA"
          },
          "Laegna": {
            "Num": "OOOA",
            "Digits": [
              1,
              1,
              1,
              2
            ],
            "Hex": "PO",
            "Bin": "OAOAOAAO"
          }
        },
        {
          "Decimal": {
            "Num": "88",
            "Signed": "79",
            "Hex": "58",
            "Bin": "1011000"
          },
          "Wave": {
            "Num": "OIOO",
            "Digits": [
              1,
              0,
              1,
              1
            ],
            "Hex": "QP",
            "Bin": "OAOOOAOA"
          },
          "Laegna": {
            "Num": "OOOE",
            "Digits": [
              1,
              1,
              1,
              3
            ],
            "Hex": "PP",
            "Bin": "OAOAOAAA"
          }
        },
        {
          "Decimal": {
            "Num": "89",
            "Signed": "80",
            "Hex": "59",
            "Bin": "1011001"
          },
          "Wave": {
            "Num": "OIAA",
            "Digits": [
              1,
              0,
              2,
              2
            ],
            "Hex": "QA",
            "Bin": "OAOOAOAO"
          },
          "Laegna": {
            "Num": "OOAI",
            "Digits": [
              1,
              1,
              2,
              0
            ],
            "Hex": "PC",
            "Bin": "OAOAAOOO"
          }
        },
        {
          "Decimal": {
            "Num": "90",
            "Signed": "81",
            "Hex": "5A",
            "Bin": "1011010"
          },
          "Wave": {
            "Num": "OIAI",
            "Digits": [
              1,
              0,
              2,
              0
            ],
            "Hex": "QC",
            "Bin": "OAOOAOOO"
          },
          "Laegna": {
            "Num": "OOAO",
            "Digits": [
              1,
              1,
              2,
              1
            ],
            "Hex": "PB",
            "Bin": "OAOAAOOA"
          }
        },
        {
          "Decimal": {
            "Num": "91",
            "Signed": "82",
            "Hex": "5B",
            "Bin": "1011011"
          },
          "Wave": {
            "Num": "OIAE",
            "Digits": [
              1,
              0,
              2,
              3
            ],
            "Hex": "QB",
            "Bin": "OAOOAOAA"
          },
          "Laegna": {
            "Num": "OOAA",
            "Digits": [
              1,
              1,
              2,
              2
            ],
            "Hex": "PA",
            "Bin": "OAOAAOAO"
          }
        },
        {
          "Decimal": {
            "Num": "92",
            "Signed": "83",
            "Hex": "5C",
            "Bin": "1011100"
          },
          "Wave": {
            "Num": "OIAO",
            "Digits": [
              1,
              0,
              2,
              1
            ],
            "Hex": "QB",
            "Bin": "OAOOAOOA"
          },
          "Laegna": {
            "Num": "OOAE",
            "Digits": [
              1,
              1,
              2,
              3
            ],
            "Hex": "PB",
            "Bin": "OAOAAOAA"
          }
        },
        {
          "Decimal": {
            "Num": "93",
            "Signed": "84",
            "Hex": "5D",
            "Bin": "1011101"
          },
          "Wave": {
            "Num": "OIEI",
            "Digits": [
              1,
              0,
              3,
              0
            ],
            "Hex": "QG",
            "Bin": "OAOOAAOO"
          },
          "Laegna": {
            "Num": "OOEI",
            "Digits": [
              1,
              1,
              3,
              0
            ],
            "Hex": "PG",
            "Bin": "OAOAAAOO"
          }
        },
        {
          "Decimal": {
            "Num": "94",
            "Signed": "85",
            "Hex": "5E",
            "Bin": "1011110"
          },
          "Wave": {
            "Num": "OIEO",
            "Digits": [
              1,
              0,
              3,
              1
            ],
            "Hex": "QF",
            "Bin": "OAOOAAOA"
          },
          "Laegna": {
            "Num": "OOEO",
            "Digits": [
              1,
              1,
              3,
              1
            ],
            "Hex": "PF",
            "Bin": "OAOAAAOA"
          }
        },
        {
          "Decimal": {
            "Num": "95",
            "Signed": "86",
            "Hex": "5F",
            "Bin": "1011111"
          },
          "Wave": {
            "Num": "OIEA",
            "Digits": [
              1,
              0,
              3,
              2
            ],
            "Hex": "QE",
            "Bin": "OAOOAAAO"
          },
          "Laegna": {
            "Num": "OOEA",
            "Digits": [
              1,
              1,
              3,
              2
            ],
            "Hex": "PE",
            "Bin": "OAOAAAAO"
          }
        },
        {
          "Decimal": {
            "Num": "96",
            "Signed": "87",
            "Hex": "60",
            "Bin": "1100000"
          },
          "Wave": {
            "Num": "OIEE",
            "Digits": [
              1,
              0,
              3,
              3
            ],
            "Hex": "QF",
            "Bin": "OAOOAAAA"
          },
          "Laegna": {
            "Num": "OOEE",
            "Digits": [
              1,
              1,
              3,
              3
            ],
            "Hex": "PF",
            "Bin": "OAOAAAAA"
          }
        },
        {
          "Decimal": {
            "Num": "97",
            "Signed": "88",
            "Hex": "61",
            "Bin": "1100001"
          },
          "Wave": {
            "Num": "OEII",
            "Digits": [
              1,
              3,
              0,
              0
            ],
            "Hex": "PK",
            "Bin": "OAAAOOOO"
          },
          "Laegna": {
            "Num": "OAII",
            "Digits": [
              1,
              2,
              0,
              0
            ],
            "Hex": "OK",
            "Bin": "OAAOOOOO"
          }
        },
        {
          "Decimal": {
            "Num": "98",
            "Signed": "89",
            "Hex": "62",
            "Bin": "1100010"
          },
          "Wave": {
            "Num": "OEIO",
            "Digits": [
              1,
              3,
              0,
              1
            ],
            "Hex": "PJ",
            "Bin": "OAAAOOOA"
          },
          "Laegna": {
            "Num": "OAIO",
            "Digits": [
              1,
              2,
              0,
              1
            ],
            "Hex": "OJ",
            "Bin": "OAAOOOOA"
          }
        },
        {
          "Decimal": {
            "Num": "99",
            "Signed": "90",
            "Hex": "63",
            "Bin": "1100011"
          },
          "Wave": {
            "Num": "OEIA",
            "Digits": [
              1,
              3,
              0,
              2
            ],
            "Hex": "PI",
            "Bin": "OAAAOOAO"
          },
          "Laegna": {
            "Num": "OAIA",
            "Digits": [
              1,
              2,
              0,
              2
            ],
            "Hex": "OI",
            "Bin": "OAAOOOAO"
          }
        },
        {
          "Decimal": {
            "Num": "100",
            "Signed": "91",
            "Hex": "64",
            "Bin": "1100100"
          },
          "Wave": {
            "Num": "OEIE",
            "Digits": [
              1,
              3,
              0,
              3
            ],
            "Hex": "PL",
            "Bin": "OAAAOOAA"
          },
          "Laegna": {
            "Num": "OAIE",
            "Digits": [
              1,
              2,
              0,
              3
            ],
            "Hex": "OL",
            "Bin": "OAAOOOAA"
          }
        },
        {
          "Decimal": {
            "Num": "101",
            "Signed": "92",
            "Hex": "65",
            "Bin": "1100101"
          },
          "Wave": {
            "Num": "OEOA",
            "Digits": [
              1,
              3,
              1,
              2
            ],
            "Hex": "PO",
            "Bin": "OAAAOAAO"
          },
          "Laegna": {
            "Num": "OAOI",
            "Digits": [
              1,
              2,
              1,
              0
            ],
            "Hex": "OQ",
            "Bin": "OAAOOAOO"
          }
        },
        {
          "Decimal": {
            "Num": "102",
            "Signed": "93",
            "Hex": "66",
            "Bin": "1100110"
          },
          "Wave": {
            "Num": "OEOI",
            "Digits": [
              1,
              3,
              1,
              0
            ],
            "Hex": "PQ",
            "Bin": "OAAAOAOO"
          },
          "Laegna": {
            "Num": "OAOO",
            "Digits": [
              1,
              2,
              1,
              1
            ],
            "Hex": "OP",
            "Bin": "OAAOOAOA"
          }
        },
        {
          "Decimal": {
            "Num": "103",
            "Signed": "94",
            "Hex": "67",
            "Bin": "1100111"
          },
          "Wave": {
            "Num": "OEOE",
            "Digits": [
              1,
              3,
              1,
              3
            ],
            "Hex": "PP",
            "Bin": "OAAAOAAA"
          },
          "Laegna": {
            "Num": "OAOA",
            "Digits": [
              1,
              2,
              1,
              2
            ],
            "Hex": "OO",
            "Bin": "OAAOOAAO"
          }
        },
        {
          "Decimal": {
            "Num": "104",
            "Signed": "95",
            "Hex": "68",
            "Bin": "1101000"
          },
          "Wave": {
            "Num": "OEOO",
            "Digits": [
              1,
              3,
              1,
              1
            ],
            "Hex": "PP",
            "Bin": "OAAAOAOA"
          },
          "Laegna": {
            "Num": "OAOE",
            "Digits": [
              1,
              2,
              1,
              3
            ],
            "Hex": "OP",
            "Bin": "OAAOOAAA"
          }
        },
        {
          "Decimal": {
            "Num": "105",
            "Signed": "96",
            "Hex": "69",
            "Bin": "1101001"
          },
          "Wave": {
            "Num": "OEAA",
            "Digits": [
              1,
              3,
              2,
              2
            ],
            "Hex": "PA",
            "Bin": "OAAAAOAO"
          },
          "Laegna": {
            "Num": "OAAI",
            "Digits": [
              1,
              2,
              2,
              0
            ],
            "Hex": "OC",
            "Bin": "OAAOAOOO"
          }
        },
        {
          "Decimal": {
            "Num": "106",
            "Signed": "97",
            "Hex": "6A",
            "Bin": "1101010"
          },
          "Wave": {
            "Num": "OEAI",
            "Digits": [
              1,
              3,
              2,
              0
            ],
            "Hex": "PC",
            "Bin": "OAAAAOOO"
          },
          "Laegna": {
            "Num": "OAAO",
            "Digits": [
              1,
              2,
              2,
              1
            ],
            "Hex": "OB",
            "Bin": "OAAOAOOA"
          }
        },
        {
          "Decimal": {
            "Num": "107",
            "Signed": "98",
            "Hex": "6B",
            "Bin": "1101011"
          },
          "Wave": {
            "Num": "OEAE",
            "Digits": [
              1,
              3,
              2,
              3
            ],
            "Hex": "PB",
            "Bin": "OAAAAOAA"
          },
          "Laegna": {
            "Num": "OAAA",
            "Digits": [
              1,
              2,
              2,
              2
            ],
            "Hex": "OA",
            "Bin": "OAAOAOAO"
          }
        },
        {
          "Decimal": {
            "Num": "108",
            "Signed": "99",
            "Hex": "6C",
            "Bin": "1101100"
          },
          "Wave": {
            "Num": "OEAO",
            "Digits": [
              1,
              3,
              2,
              1
            ],
            "Hex": "PB",
            "Bin": "OAAAAOOA"
          },
          "Laegna": {
            "Num": "OAAE",
            "Digits": [
              1,
              2,
              2,
              3
            ],
            "Hex": "OB",
            "Bin": "OAAOAOAA"
          }
        },
        {
          "Decimal": {
            "Num": "109",
            "Signed": "100",
            "Hex": "6D",
            "Bin": "1101101"
          },
          "Wave": {
            "Num": "OEEI",
            "Digits": [
              1,
              3,
              3,
              0
            ],
            "Hex": "PG",
            "Bin": "OAAAAAOO"
          },
          "Laegna": {
            "Num": "OAEI",
            "Digits": [
              1,
              2,
              3,
              0
            ],
            "Hex": "OG",
            "Bin": "OAAOAAOO"
          }
        },
        {
          "Decimal": {
            "Num": "110",
            "Signed": "101",
            "Hex": "6E",
            "Bin": "1101110"
          },
          "Wave": {
            "Num": "OEEO",
            "Digits": [
              1,
              3,
              3,
              1
            ],
            "Hex": "PF",
            "Bin": "OAAAAAOA"
          },
          "Laegna": {
            "Num": "OAEO",
            "Digits": [
              1,
              2,
              3,
              1
            ],
            "Hex": "OF",
            "Bin": "OAAOAAOA"
          }
        },
        {
          "Decimal": {
            "Num": "111",
            "Signed": "102",
            "Hex": "6F",
            "Bin": "1101111"
          },
          "Wave": {
            "Num": "OEEA",
            "Digits": [
              1,
              3,
              3,
              2
            ],
            "Hex": "PE",
            "Bin": "OAAAAAAO"
          },
          "Laegna": {
            "Num": "OAEA",
            "Digits": [
              1,
              2,
              3,
              2
            ],
            "Hex": "OE",
            "Bin": "OAAOAAAO"
          }
        },
        {
          "Decimal": {
            "Num": "112",
            "Signed": "103",
            "Hex": "70",
            "Bin": "1110000"
          },
          "Wave": {
            "Num": "OEEE",
            "Digits": [
              1,
              3,
              3,
              3
            ],
            "Hex": "PF",
            "Bin": "OAAAAAAA"
          },
          "Laegna": {
            "Num": "OAEE",
            "Digits": [
              1,
              2,
              3,
              3
            ],
            "Hex": "OF",
            "Bin": "OAAOAAAA"
          }
        },
        {
          "Decimal": {
            "Num": "113",
            "Signed": "104",
            "Hex": "71",
            "Bin": "1110001"
          },
          "Wave": {
            "Num": "OOAA",
            "Digits": [
              1,
              1,
              2,
              2
            ],
            "Hex": "PA",
            "Bin": "OAOAAOAO"
          },
          "Laegna": {
            "Num": "OEII",
            "Digits": [
              1,
              3,
              0,
              0
            ],
            "Hex": "PK",
            "Bin": "OAAAOOOO"
          }
        },
        {
          "Decimal": {
            "Num": "114",
            "Signed": "105",
            "Hex": "72",
            "Bin": "1110010"
          },
          "Wave": {
            "Num": "OOAI",
            "Digits": [
              1,
              1,
              2,
              0
            ],
            "Hex": "PC",
            "Bin": "OAOAAOOO"
          },
          "Laegna": {
            "Num": "OEIO",
            "Digits": [
              1,
              3,
              0,
              1
            ],
            "Hex": "PJ",
            "Bin": "OAAAOOOA"
          }
        },
        {
          "Decimal": {
            "Num": "115",
            "Signed": "106",
            "Hex": "73",
            "Bin": "1110011"
          },
          "Wave": {
            "Num": "OOAE",
            "Digits": [
              1,
              1,
              2,
              3
            ],
            "Hex": "PB",
            "Bin": "OAOAAOAA"
          },
          "Laegna": {
            "Num": "OEIA",
            "Digits": [
              1,
              3,
              0,
              2
            ],
            "Hex": "PI",
            "Bin": "OAAAOOAO"
          }
        },
        {
          "Decimal": {
            "Num": "116",
            "Signed": "107",
            "Hex": "74",
            "Bin": "1110100"
          },
          "Wave": {
            "Num": "OOAO",
            "Digits": [
              1,
              1,
              2,
              1
            ],
            "Hex": "PB",
            "Bin": "OAOAAOOA"
          },
          "Laegna": {
            "Num": "OEIE",
            "Digits": [
              1,
              3,
              0,
              3
            ],
            "Hex": "PL",
            "Bin": "OAAAOOAA"
          }
        },
        {
          "Decimal": {
            "Num": "117",
            "Signed": "108",
            "Hex": "75",
            "Bin": "1110101"
          },
          "Wave": {
            "Num": "OOII",
            "Digits": [
              1,
              1,
              0,
              0
            ],
            "Hex": "PK",
            "Bin": "OAOAOOOO"
          },
          "Laegna": {
            "Num": "OEOI",
            "Digits": [
              1,
              3,
              1,
              0
            ],
            "Hex": "PQ",
            "Bin": "OAAAOAOO"
          }
        },
        {
          "Decimal": {
            "Num": "118",
            "Signed": "109",
            "Hex": "76",
            "Bin": "1110110"
          },
          "Wave": {
            "Num": "OOIO",
            "Digits": [
              1,
              1,
              0,
              1
            ],
            "Hex": "PJ",
            "Bin": "OAOAOOOA"
          },
          "Laegna": {
            "Num": "OEOO",
            "Digits": [
              1,
              3,
              1,
              1
            ],
            "Hex": "PP",
            "Bin": "OAAAOAOA"
          }
        },
        {
          "Decimal": {
            "Num": "119",
            "Signed": "110",
            "Hex": "77",
            "Bin": "1110111"
          },
          "Wave": {
            "Num": "OOIA",
            "Digits": [
              1,
              1,
              0,
              2
            ],
            "Hex": "PI",
            "Bin": "OAOAOOAO"
          },
          "Laegna": {
            "Num": "OEOA",
            "Digits": [
              1,
              3,
              1,
              2
            ],
            "Hex": "PO",
            "Bin": "OAAAOAAO"
          }
        },
        {
          "Decimal": {
            "Num": "120",
            "Signed": "111",
            "Hex": "78",
            "Bin": "1111000"
          },
          "Wave": {
            "Num": "OOIE",
            "Digits": [
              1,
              1,
              0,
              3
            ],
            "Hex": "PL",
            "Bin": "OAOAOOAA"
          },
          "Laegna": {
            "Num": "OEOE",
            "Digits": [
              1,
              3,
              1,
              3
            ],
            "Hex": "PP",
            "Bin": "OAAAOAAA"
          }
        },
        {
          "Decimal": {
            "Num": "121",
            "Signed": "112",
            "Hex": "79",
            "Bin": "1111001"
          },
          "Wave": {
            "Num": "OOEI",
            "Digits": [
              1,
              1,
              3,
              0
            ],
            "Hex": "PG",
            "Bin": "OAOAAAOO"
          },
          "Laegna": {
            "Num": "OEAI",
            "Digits": [
              1,
              3,
              2,
              0
            ],
            "Hex": "PC",
            "Bin": "OAAAAOOO"
          }
        },
        {
          "Decimal": {
            "Num": "122",
            "Signed": "113",
            "Hex": "7A",
            "Bin": "1111010"
          },
          "Wave": {
            "Num": "OOEO",
            "Digits": [
              1,
              1,
              3,
              1
            ],
            "Hex": "PF",
            "Bin": "OAOAAAOA"
          },
          "Laegna": {
            "Num": "OEAO",
            "Digits": [
              1,
              3,
              2,
              1
            ],
            "Hex": "PB",
            "Bin": "OAAAAOOA"
          }
        },
        {
          "Decimal": {
            "Num": "123",
            "Signed": "114",
            "Hex": "7B",
            "Bin": "1111011"
          },
          "Wave": {
            "Num": "OOEA",
            "Digits": [
              1,
              1,
              3,
              2
            ],
            "Hex": "PE",
            "Bin": "OAOAAAAO"
          },
          "Laegna": {
            "Num": "OEAA",
            "Digits": [
              1,
              3,
              2,
              2
            ],
            "Hex": "PA",
            "Bin": "OAAAAOAO"
          }
        },
        {
          "Decimal": {
            "Num": "124",
            "Signed": "115",
            "Hex": "7C",
            "Bin": "1111100"
          },
          "Wave": {
            "Num": "OOEE",
            "Digits": [
              1,
              1,
              3,
              3
            ],
            "Hex": "PF",
            "Bin": "OAOAAAAA"
          },
          "Laegna": {
            "Num": "OEAE",
            "Digits": [
              1,
              3,
              2,
              3
            ],
            "Hex": "PB",
            "Bin": "OAAAAOAA"
          }
        },
        {
          "Decimal": {
            "Num": "125",
            "Signed": "116",
            "Hex": "7D",
            "Bin": "1111101"
          },
          "Wave": {
            "Num": "OOOA",
            "Digits": [
              1,
              1,
              1,
              2
            ],
            "Hex": "PO",
            "Bin": "OAOAOAAO"
          },
          "Laegna": {
            "Num": "OEEI",
            "Digits": [
              1,
              3,
              3,
              0
            ],
            "Hex": "PG",
            "Bin": "OAAAAAOO"
          }
        },
        {
          "Decimal": {
            "Num": "126",
            "Signed": "117",
            "Hex": "7E",
            "Bin": "1111110"
          },
          "Wave": {
            "Num": "OOOI",
            "Digits": [
              1,
              1,
              1,
              0
            ],
            "Hex": "PQ",
            "Bin": "OAOAOAOO"
          },
          "Laegna": {
            "Num": "OEEO",
            "Digits": [
              1,
              3,
              3,
              1
            ],
            "Hex": "PF",
            "Bin": "OAAAAAOA"
          }
        },
        {
          "Decimal": {
            "Num": "127",
            "Signed": "118",
            "Hex": "7F",
            "Bin": "1111111"
          },
          "Wave": {
            "Num": "OOOE",
            "Digits": [
              1,
              1,
              1,
              3
            ],
            "Hex": "PP",
            "Bin": "OAOAOAAA"
          },
          "Laegna": {
            "Num": "OEEA",
            "Digits": [
              1,
              3,
              3,
              2
            ],
            "Hex": "PE",
            "Bin": "OAAAAAAO"
          }
        },
        {
          "Decimal": {
            "Num": "128",
            "Signed": "119",
            "Hex": "80",
            "Bin": "10000000"
          },
          "Wave": {
            "Num": "OOOO",
            "Digits": [
              1,
              1,
              1,
              1
            ],
            "Hex": "PP",
            "Bin": "OAOAOAOA"
          },
          "Laegna": {
            "Num": "OEEE",
            "Digits": [
              1,
              3,
              3,
              3
            ],
            "Hex": "PF",
            "Bin": "OAAAAAAA"
          }
        },
        {
          "Decimal": {
            "Num": 128.5,
            "Signed": "-0",
            "Hex": null,
            "Bin": null
          },
          "Wave": {
            "Num": "VVVV",
            "Hex": "VV",
            "Bin": "VVVVVVVV"
          },
          "Laegna": {
            "Num": "VVVV",
            "Hex": "VV",
            "Bin": "VVVVVVVV"
          }
        },
        {
          "Decimal": {
            "Num": 128.5,
            "Signed": "+0",
            "Hex": null,
            "Bin": null
          },
          "Wave": {
            "Num": "UUUU",
            "Hex": "UU",
            "Bin": "UUUUUUUU"
          },
          "Laegna": {
            "Num": "UUUU",
            "Hex": "UU",
            "Bin": "UUUUUUUU"
          }
        },
        {
          "Decimal": {
            "Num": "129",
            "Signed": "+1",
            "Hex": "81",
            "Bin": "10000001"
          },
          "Wave": {
            "Num": "AAAA",
            "Digits": [
              2,
              2,
              2,
              2
            ],
            "Hex": "AA",
            "Bin": "AOAOAOAO"
          },
          "Laegna": {
            "Num": "AIII",
            "Digits": [
              2,
              0,
              0,
              0
            ],
            "Hex": "CK",
            "Bin": "AOOOOOOO"
          }
        },
        {
          "Decimal": {
            "Num": "130",
            "Signed": "+2",
            "Hex": "82",
            "Bin": "10000010"
          },
          "Wave": {
            "Num": "AAAI",
            "Digits": [
              2,
              2,
              2,
              0
            ],
            "Hex": "AC",
            "Bin": "AOAOAOOO"
          },
          "Laegna": {
            "Num": "AIIO",
            "Digits": [
              2,
              0,
              0,
              1
            ],
            "Hex": "CJ",
            "Bin": "AOOOOOOA"
          }
        },
        {
          "Decimal": {
            "Num": "131",
            "Signed": "+3",
            "Hex": "83",
            "Bin": "10000011"
          },
          "Wave": {
            "Num": "AAAE",
            "Digits": [
              2,
              2,
              2,
              3
            ],
            "Hex": "AB",
            "Bin": "AOAOAOAA"
          },
          "Laegna": {
            "Num": "AIIA",
            "Digits": [
              2,
              0,
              0,
              2
            ],
            "Hex": "CI",
            "Bin": "AOOOOOAO"
          }
        },
        {
          "Decimal": {
            "Num": "132",
            "Signed": "+4",
            "Hex": "84",
            "Bin": "10000100"
          },
          "Wave": {
            "Num": "AAAO",
            "Digits": [
              2,
              2,
              2,
              1
            ],
            "Hex": "AB",
            "Bin": "AOAOAOOA"
          },
          "Laegna": {
            "Num": "AIIE",
            "Digits": [
              2,
              0,
              0,
              3
            ],
            "Hex": "CL",
            "Bin": "AOOOOOAA"
          }
        },
        {
          "Decimal": {
            "Num": "133",
            "Signed": "+5",
            "Hex": "85",
            "Bin": "10000101"
          },
          "Wave": {
            "Num": "AAII",
            "Digits": [
              2,
              2,
              0,
              0
            ],
            "Hex": "AK",
            "Bin": "AOAOOOOO"
          },
          "Laegna": {
            "Num": "AIOI",
            "Digits": [
              2,
              0,
              1,
              0
            ],
            "Hex": "CQ",
            "Bin": "AOOOOAOO"
          }
        },
        {
          "Decimal": {
            "Num": "134",
            "Signed": "+6",
            "Hex": "86",
            "Bin": "10000110"
          },
          "Wave": {
            "Num": "AAIO",
            "Digits": [
              2,
              2,
              0,
              1
            ],
            "Hex": "AJ",
            "Bin": "AOAOOOOA"
          },
          "Laegna": {
            "Num": "AIOO",
            "Digits": [
              2,
              0,
              1,
              1
            ],
            "Hex": "CP",
            "Bin": "AOOOOAOA"
          }
        },
        {
          "Decimal": {
            "Num": "135",
            "Signed": "+7",
            "Hex": "87",
            "Bin": "10000111"
          },
          "Wave": {
            "Num": "AAIA",
            "Digits": [
              2,
              2,
              0,
              2
            ],
            "Hex": "AI",
            "Bin": "AOAOOOAO"
          },
          "Laegna": {
            "Num": "AIOA",
            "Digits": [
              2,
              0,
              1,
              2
            ],
            "Hex": "CO",
            "Bin": "AOOOOAAO"
          }
        },
        {
          "Decimal": {
            "Num": "136",
            "Signed": "+8",
            "Hex": "88",
            "Bin": "10001000"
          },
          "Wave": {
            "Num": "AAIE",
            "Digits": [
              2,
              2,
              0,
              3
            ],
            "Hex": "AL",
            "Bin": "AOAOOOAA"
          },
          "Laegna": {
            "Num": "AIOE",
            "Digits": [
              2,
              0,
              1,
              3
            ],
            "Hex": "CP",
            "Bin": "AOOOOAAA"
          }
        },
        {
          "Decimal": {
            "Num": "137",
            "Signed": "+9",
            "Hex": "89",
            "Bin": "10001001"
          },
          "Wave": {
            "Num": "AAEI",
            "Digits": [
              2,
              2,
              3,
              0
            ],
            "Hex": "AG",
            "Bin": "AOAOAAOO"
          },
          "Laegna": {
            "Num": "AIAI",
            "Digits": [
              2,
              0,
              2,
              0
            ],
            "Hex": "CC",
            "Bin": "AOOOAOOO"
          }
        },
        {
          "Decimal": {
            "Num": "138",
            "Signed": "+10",
            "Hex": "8A",
            "Bin": "10001010"
          },
          "Wave": {
            "Num": "AAEO",
            "Digits": [
              2,
              2,
              3,
              1
            ],
            "Hex": "AF",
            "Bin": "AOAOAAOA"
          },
          "Laegna": {
            "Num": "AIAO",
            "Digits": [
              2,
              0,
              2,
              1
            ],
            "Hex": "CB",
            "Bin": "AOOOAOOA"
          }
        },
        {
          "Decimal": {
            "Num": "139",
            "Signed": "+11",
            "Hex": "8B",
            "Bin": "10001011"
          },
          "Wave": {
            "Num": "AAEA",
            "Digits": [
              2,
              2,
              3,
              2
            ],
            "Hex": "AE",
            "Bin": "AOAOAAAO"
          },
          "Laegna": {
            "Num": "AIAA",
            "Digits": [
              2,
              0,
              2,
              2
            ],
            "Hex": "CA",
            "Bin": "AOOOAOAO"
          }
        },
        {
          "Decimal": {
            "Num": "140",
            "Signed": "+12",
            "Hex": "8C",
            "Bin": "10001100"
          },
          "Wave": {
            "Num": "AAEE",
            "Digits": [
              2,
              2,
              3,
              3
            ],
            "Hex": "AF",
            "Bin": "AOAOAAAA"
          },
          "Laegna": {
            "Num": "AIAE",
            "Digits": [
              2,
              0,
              2,
              3
            ],
            "Hex": "CB",
            "Bin": "AOOOAOAA"
          }
        },
        {
          "Decimal": {
            "Num": "141",
            "Signed": "+13",
            "Hex": "8D",
            "Bin": "10001101"
          },
          "Wave": {
            "Num": "AAOA",
            "Digits": [
              2,
              2,
              1,
              2
            ],
            "Hex": "AO",
            "Bin": "AOAOOAAO"
          },
          "Laegna": {
            "Num": "AIEI",
            "Digits": [
              2,
              0,
              3,
              0
            ],
            "Hex": "CG",
            "Bin": "AOOOAAOO"
          }
        },
        {
          "Decimal": {
            "Num": "142",
            "Signed": "+14",
            "Hex": "8E",
            "Bin": "10001110"
          },
          "Wave": {
            "Num": "AAOI",
            "Digits": [
              2,
              2,
              1,
              0
            ],
            "Hex": "AQ",
            "Bin": "AOAOOAOO"
          },
          "Laegna": {
            "Num": "AIEO",
            "Digits": [
              2,
              0,
              3,
              1
            ],
            "Hex": "CF",
            "Bin": "AOOOAAOA"
          }
        },
        {
          "Decimal": {
            "Num": "143",
            "Signed": "+15",
            "Hex": "8F",
            "Bin": "10001111"
          },
          "Wave": {
            "Num": "AAOE",
            "Digits": [
              2,
              2,
              1,
              3
            ],
            "Hex": "AP",
            "Bin": "AOAOOAAA"
          },
          "Laegna": {
            "Num": "AIEA",
            "Digits": [
              2,
              0,
              3,
              2
            ],
            "Hex": "CE",
            "Bin": "AOOOAAAO"
          }
        },
        {
          "Decimal": {
            "Num": "144",
            "Signed": "+16",
            "Hex": "90",
            "Bin": "10010000"
          },
          "Wave": {
            "Num": "AAOO",
            "Digits": [
              2,
              2,
              1,
              1
            ],
            "Hex": "AP",
            "Bin": "AOAOOAOA"
          },
          "Laegna": {
            "Num": "AIEE",
            "Digits": [
              2,
              0,
              3,
              3
            ],
            "Hex": "CF",
            "Bin": "AOOOAAAA"
          }
        },
        {
          "Decimal": {
            "Num": "145",
            "Signed": "+17",
            "Hex": "91",
            "Bin": "10010001"
          },
          "Wave": {
            "Num": "AIII",
            "Digits": [
              2,
              0,
              0,
              0
            ],
            "Hex": "CK",
            "Bin": "AOOOOOOO"
          },
          "Laegna": {
            "Num": "AOII",
            "Digits": [
              2,
              1,
              0,
              0
            ],
            "Hex": "BK",
            "Bin": "AOOAOOOO"
          }
        },
        {
          "Decimal": {
            "Num": "146",
            "Signed": "+18",
            "Hex": "92",
            "Bin": "10010010"
          },
          "Wave": {
            "Num": "AIIO",
            "Digits": [
              2,
              0,
              0,
              1
            ],
            "Hex": "CJ",
            "Bin": "AOOOOOOA"
          },
          "Laegna": {
            "Num": "AOIO",
            "Digits": [
              2,
              1,
              0,
              1
            ],
            "Hex": "BJ",
            "Bin": "AOOAOOOA"
          }
        },
        {
          "Decimal": {
            "Num": "147",
            "Signed": "+19",
            "Hex": "93",
            "Bin": "10010011"
          },
          "Wave": {
            "Num": "AIIA",
            "Digits": [
              2,
              0,
              0,
              2
            ],
            "Hex": "CI",
            "Bin": "AOOOOOAO"
          },
          "Laegna": {
            "Num": "AOIA",
            "Digits": [
              2,
              1,
              0,
              2
            ],
            "Hex": "BI",
            "Bin": "AOOAOOAO"
          }
        },
        {
          "Decimal": {
            "Num": "148",
            "Signed": "+20",
            "Hex": "94",
            "Bin": "10010100"
          },
          "Wave": {
            "Num": "AIIE",
            "Digits": [
              2,
              0,
              0,
              3
            ],
            "Hex": "CL",
            "Bin": "AOOOOOAA"
          },
          "Laegna": {
            "Num": "AOIE",
            "Digits": [
              2,
              1,
              0,
              3
            ],
            "Hex": "BL",
            "Bin": "AOOAOOAA"
          }
        },
        {
          "Decimal": {
            "Num": "149",
            "Signed": "+21",
            "Hex": "95",
            "Bin": "10010101"
          },
          "Wave": {
            "Num": "AIOA",
            "Digits": [
              2,
              0,
              1,
              2
            ],
            "Hex": "CO",
            "Bin": "AOOOOAAO"
          },
          "Laegna": {
            "Num": "AOOI",
            "Digits": [
              2,
              1,
              1,
              0
            ],
            "Hex": "BQ",
            "Bin": "AOOAOAOO"
          }
        },
        {
          "Decimal": {
            "Num": "150",
            "Signed": "+22",
            "Hex": "96",
            "Bin": "10010110"
          },
          "Wave": {
            "Num": "AIOI",
            "Digits": [
              2,
              0,
              1,
              0
            ],
            "Hex": "CQ",
            "Bin": "AOOOOAOO"
          },
          "Laegna": {
            "Num": "AOOO",
            "Digits": [
              2,
              1,
              1,
              1
            ],
            "Hex": "BP",
            "Bin": "AOOAOAOA"
          }
        },
        {
          "Decimal": {
            "Num": "151",
            "Signed": "+23",
            "Hex": "97",
            "Bin": "10010111"
          },
          "Wave": {
            "Num": "AIOE",
            "Digits": [
              2,
              0,
              1,
              3
            ],
            "Hex": "CP",
            "Bin": "AOOOOAAA"
          },
          "Laegna": {
            "Num": "AOOA",
            "Digits": [
              2,
              1,
              1,
              2
            ],
            "Hex": "BO",
            "Bin": "AOOAOAAO"
          }
        },
        {
          "Decimal": {
            "Num": "152",
            "Signed": "+24",
            "Hex": "98",
            "Bin": "10011000"
          },
          "Wave": {
            "Num": "AIOO",
            "Digits": [
              2,
              0,
              1,
              1
            ],
            "Hex": "CP",
            "Bin": "AOOOOAOA"
          },
          "Laegna": {
            "Num": "AOOE",
            "Digits": [
              2,
              1,
              1,
              3
            ],
            "Hex": "BP",
            "Bin": "AOOAOAAA"
          }
        },
        {
          "Decimal": {
            "Num": "153",
            "Signed": "+25",
            "Hex": "99",
            "Bin": "10011001"
          },
          "Wave": {
            "Num": "AIAA",
            "Digits": [
              2,
              0,
              2,
              2
            ],
            "Hex": "CA",
            "Bin": "AOOOAOAO"
          },
          "Laegna": {
            "Num": "AOAI",
            "Digits": [
              2,
              1,
              2,
              0
            ],
            "Hex": "BC",
            "Bin": "AOOAAOOO"
          }
        },
        {
          "Decimal": {
            "Num": "154",
            "Signed": "+26",
            "Hex": "9A",
            "Bin": "10011010"
          },
          "Wave": {
            "Num": "AIAI",
            "Digits": [
              2,
              0,
              2,
              0
            ],
            "Hex": "CC",
            "Bin": "AOOOAOOO"
          },
          "Laegna": {
            "Num": "AOAO",
            "Digits": [
              2,
              1,
              2,
              1
            ],
            "Hex": "BB",
            "Bin": "AOOAAOOA"
          }
        },
        {
          "Decimal": {
            "Num": "155",
            "Signed": "+27",
            "Hex": "9B",
            "Bin": "10011011"
          },
          "Wave": {
            "Num": "AIAE",
            "Digits": [
              2,
              0,
              2,
              3
            ],
            "Hex": "CB",
            "Bin": "AOOOAOAA"
          },
          "Laegna": {
            "Num": "AOAA",
            "Digits": [
              2,
              1,
              2,
              2
            ],
            "Hex": "BA",
            "Bin": "AOOAAOAO"
          }
        },
        {
          "Decimal": {
            "Num": "156",
            "Signed": "+28",
            "Hex": "9C",
            "Bin": "10011100"
          },
          "Wave": {
            "Num": "AIAO",
            "Digits": [
              2,
              0,
              2,
              1
            ],
            "Hex": "CB",
            "Bin": "AOOOAOOA"
          },
          "Laegna": {
            "Num": "AOAE",
            "Digits": [
              2,
              1,
              2,
              3
            ],
            "Hex": "BB",
            "Bin": "AOOAAOAA"
          }
        },
        {
          "Decimal": {
            "Num": "157",
            "Signed": "+29",
            "Hex": "9D",
            "Bin": "10011101"
          },
          "Wave": {
            "Num": "AIEI",
            "Digits": [
              2,
              0,
              3,
              0
            ],
            "Hex": "CG",
            "Bin": "AOOOAAOO"
          },
          "Laegna": {
            "Num": "AOEI",
            "Digits": [
              2,
              1,
              3,
              0
            ],
            "Hex": "BG",
            "Bin": "AOOAAAOO"
          }
        },
        {
          "Decimal": {
            "Num": "158",
            "Signed": "+30",
            "Hex": "9E",
            "Bin": "10011110"
          },
          "Wave": {
            "Num": "AIEO",
            "Digits": [
              2,
              0,
              3,
              1
            ],
            "Hex": "CF",
            "Bin": "AOOOAAOA"
          },
          "Laegna": {
            "Num": "AOEO",
            "Digits": [
              2,
              1,
              3,
              1
            ],
            "Hex": "BF",
            "Bin": "AOOAAAOA"
          }
        },
        {
          "Decimal": {
            "Num": "159",
            "Signed": "+31",
            "Hex": "9F",
            "Bin": "10011111"
          },
          "Wave": {
            "Num": "AIEA",
            "Digits": [
              2,
              0,
              3,
              2
            ],
            "Hex": "CE",
            "Bin": "AOOOAAAO"
          },
          "Laegna": {
            "Num": "AOEA",
            "Digits": [
              2,
              1,
              3,
              2
            ],
            "Hex": "BE",
            "Bin": "AOOAAAAO"
          }
        },
        {
          "Decimal": {
            "Num": "160",
            "Signed": "+32",
            "Hex": "A0",
            "Bin": "10100000"
          },
          "Wave": {
            "Num": "AIEE",
            "Digits": [
              2,
              0,
              3,
              3
            ],
            "Hex": "CF",
            "Bin": "AOOOAAAA"
          },
          "Laegna": {
            "Num": "AOEE",
            "Digits": [
              2,
              1,
              3,
              3
            ],
            "Hex": "BF",
            "Bin": "AOOAAAAA"
          }
        },
        {
          "Decimal": {
            "Num": "161",
            "Signed": "+33",
            "Hex": "A1",
            "Bin": "10100001"
          },
          "Wave": {
            "Num": "AEII",
            "Digits": [
              2,
              3,
              0,
              0
            ],
            "Hex": "BK",
            "Bin": "AOAAOOOO"
          },
          "Laegna": {
            "Num": "AAII",
            "Digits": [
              2,
              2,
              0,
              0
            ],
            "Hex": "AK",
            "Bin": "AOAOOOOO"
          }
        },
        {
          "Decimal": {
            "Num": "162",
            "Signed": "+34",
            "Hex": "A2",
            "Bin": "10100010"
          },
          "Wave": {
            "Num": "AEIO",
            "Digits": [
              2,
              3,
              0,
              1
            ],
            "Hex": "BJ",
            "Bin": "AOAAOOOA"
          },
          "Laegna": {
            "Num": "AAIO",
            "Digits": [
              2,
              2,
              0,
              1
            ],
            "Hex": "AJ",
            "Bin": "AOAOOOOA"
          }
        },
        {
          "Decimal": {
            "Num": "163",
            "Signed": "+35",
            "Hex": "A3",
            "Bin": "10100011"
          },
          "Wave": {
            "Num": "AEIA",
            "Digits": [
              2,
              3,
              0,
              2
            ],
            "Hex": "BI",
            "Bin": "AOAAOOAO"
          },
          "Laegna": {
            "Num": "AAIA",
            "Digits": [
              2,
              2,
              0,
              2
            ],
            "Hex": "AI",
            "Bin": "AOAOOOAO"
          }
        },
        {
          "Decimal": {
            "Num": "164",
            "Signed": "+36",
            "Hex": "A4",
            "Bin": "10100100"
          },
          "Wave": {
            "Num": "AEIE",
            "Digits": [
              2,
              3,
              0,
              3
            ],
            "Hex": "BL",
            "Bin": "AOAAOOAA"
          },
          "Laegna": {
            "Num": "AAIE",
            "Digits": [
              2,
              2,
              0,
              3
            ],
            "Hex": "AL",
            "Bin": "AOAOOOAA"
          }
        },
        {
          "Decimal": {
            "Num": "165",
            "Signed": "+37",
            "Hex": "A5",
            "Bin": "10100101"
          },
          "Wave": {
            "Num": "AEOA",
            "Digits": [
              2,
              3,
              1,
              2
            ],
            "Hex": "BO",
            "Bin": "AOAAOAAO"
          },
          "Laegna": {
            "Num": "AAOI",
            "Digits": [
              2,
              2,
              1,
              0
            ],
            "Hex": "AQ",
            "Bin": "AOAOOAOO"
          }
        },
        {
          "Decimal": {
            "Num": "166",
            "Signed": "+38",
            "Hex": "A6",
            "Bin": "10100110"
          },
          "Wave": {
            "Num": "AEOI",
            "Digits": [
              2,
              3,
              1,
              0
            ],
            "Hex": "BQ",
            "Bin": "AOAAOAOO"
          },
          "Laegna": {
            "Num": "AAOO",
            "Digits": [
              2,
              2,
              1,
              1
            ],
            "Hex": "AP",
            "Bin": "AOAOOAOA"
          }
        },
        {
          "Decimal": {
            "Num": "167",
            "Signed": "+39",
            "Hex": "A7",
            "Bin": "10100111"
          },
          "Wave": {
            "Num": "AEOE",
            "Digits": [
              2,
              3,
              1,
              3
            ],
            "Hex": "BP",
            "Bin": "AOAAOAAA"
          },
          "Laegna": {
            "Num": "AAOA",
            "Digits": [
              2,
              2,
              1,
              2
            ],
            "Hex": "AO",
            "Bin": "AOAOOAAO"
          }
        },
        {
          "Decimal": {
            "Num": "168",
            "Signed": "+40",
            "Hex": "A8",
            "Bin": "10101000"
          },
          "Wave": {
            "Num": "AEOO",
            "Digits": [
              2,
              3,
              1,
              1
            ],
            "Hex": "BP",
            "Bin": "AOAAOAOA"
          },
          "Laegna": {
            "Num": "AAOE",
            "Digits": [
              2,
              2,
              1,
              3
            ],
            "Hex": "AP",
            "Bin": "AOAOOAAA"
          }
        },
        {
          "Decimal": {
            "Num": "169",
            "Signed": "+41",
            "Hex": "A9",
            "Bin": "10101001"
          },
          "Wave": {
            "Num": "AEAA",
            "Digits": [
              2,
              3,
              2,
              2
            ],
            "Hex": "BA",
            "Bin": "AOAAAOAO"
          },
          "Laegna": {
            "Num": "AAAI",
            "Digits": [
              2,
              2,
              2,
              0
            ],
            "Hex": "AC",
            "Bin": "AOAOAOOO"
          }
        },
        {
          "Decimal": {
            "Num": "170",
            "Signed": "+42",
            "Hex": "AA",
            "Bin": "10101010"
          },
          "Wave": {
            "Num": "AEAI",
            "Digits": [
              2,
              3,
              2,
              0
            ],
            "Hex": "BC",
            "Bin": "AOAAAOOO"
          },
          "Laegna": {
            "Num": "AAAO",
            "Digits": [
              2,
              2,
              2,
              1
            ],
            "Hex": "AB",
            "Bin": "AOAOAOOA"
          }
        },
        {
          "Decimal": {
            "Num": "171",
            "Signed": "+43",
            "Hex": "AB",
            "Bin": "10101011"
          },
          "Wave": {
            "Num": "AEAE",
            "Digits": [
              2,
              3,
              2,
              3
            ],
            "Hex": "BB",
            "Bin": "AOAAAOAA"
          },
          "Laegna": {
            "Num": "AAAA",
            "Digits": [
              2,
              2,
              2,
              2
            ],
            "Hex": "AA",
            "Bin": "AOAOAOAO"
          }
        },
        {
          "Decimal": {
            "Num": "172",
            "Signed": "+44",
            "Hex": "AC",
            "Bin": "10101100"
          },
          "Wave": {
            "Num": "AEAO",
            "Digits": [
              2,
              3,
              2,
              1
            ],
            "Hex": "BB",
            "Bin": "AOAAAOOA"
          },
          "Laegna": {
            "Num": "AAAE",
            "Digits": [
              2,
              2,
              2,
              3
            ],
            "Hex": "AB",
            "Bin": "AOAOAOAA"
          }
        },
        {
          "Decimal": {
            "Num": "173",
            "Signed": "+45",
            "Hex": "AD",
            "Bin": "10101101"
          },
          "Wave": {
            "Num": "AEEI",
            "Digits": [
              2,
              3,
              3,
              0
            ],
            "Hex": "BG",
            "Bin": "AOAAAAOO"
          },
          "Laegna": {
            "Num": "AAEI",
            "Digits": [
              2,
              2,
              3,
              0
            ],
            "Hex": "AG",
            "Bin": "AOAOAAOO"
          }
        },
        {
          "Decimal": {
            "Num": "174",
            "Signed": "+46",
            "Hex": "AE",
            "Bin": "10101110"
          },
          "Wave": {
            "Num": "AEEO",
            "Digits": [
              2,
              3,
              3,
              1
            ],
            "Hex": "BF",
            "Bin": "AOAAAAOA"
          },
          "Laegna": {
            "Num": "AAEO",
            "Digits": [
              2,
              2,
              3,
              1
            ],
            "Hex": "AF",
            "Bin": "AOAOAAOA"
          }
        },
        {
          "Decimal": {
            "Num": "175",
            "Signed": "+47",
            "Hex": "AF",
            "Bin": "10101111"
          },
          "Wave": {
            "Num": "AEEA",
            "Digits": [
              2,
              3,
              3,
              2
            ],
            "Hex": "BE",
            "Bin": "AOAAAAAO"
          },
          "Laegna": {
            "Num": "AAEA",
            "Digits": [
              2,
              2,
              3,
              2
            ],
            "Hex": "AE",
            "Bin": "AOAOAAAO"
          }
        },
        {
          "Decimal": {
            "Num": "176",
            "Signed": "+48",
            "Hex": "B0",
            "Bin": "10110000"
          },
          "Wave": {
            "Num": "AEEE",
            "Digits": [
              2,
              3,
              3,
              3
            ],
            "Hex": "BF",
            "Bin": "AOAAAAAA"
          },
          "Laegna": {
            "Num": "AAEE",
            "Digits": [
              2,
              2,
              3,
              3
            ],
            "Hex": "AF",
            "Bin": "AOAOAAAA"
          }
        },
        {
          "Decimal": {
            "Num": "177",
            "Signed": "+49",
            "Hex": "B1",
            "Bin": "10110001"
          },
          "Wave": {
            "Num": "AOAA",
            "Digits": [
              2,
              1,
              2,
              2
            ],
            "Hex": "BA",
            "Bin": "AOOAAOAO"
          },
          "Laegna": {
            "Num": "AEII",
            "Digits": [
              2,
              3,
              0,
              0
            ],
            "Hex": "BK",
            "Bin": "AOAAOOOO"
          }
        },
        {
          "Decimal": {
            "Num": "178",
            "Signed": "+50",
            "Hex": "B2",
            "Bin": "10110010"
          },
          "Wave": {
            "Num": "AOAI",
            "Digits": [
              2,
              1,
              2,
              0
            ],
            "Hex": "BC",
            "Bin": "AOOAAOOO"
          },
          "Laegna": {
            "Num": "AEIO",
            "Digits": [
              2,
              3,
              0,
              1
            ],
            "Hex": "BJ",
            "Bin": "AOAAOOOA"
          }
        },
        {
          "Decimal": {
            "Num": "179",
            "Signed": "+51",
            "Hex": "B3",
            "Bin": "10110011"
          },
          "Wave": {
            "Num": "AOAE",
            "Digits": [
              2,
              1,
              2,
              3
            ],
            "Hex": "BB",
            "Bin": "AOOAAOAA"
          },
          "Laegna": {
            "Num": "AEIA",
            "Digits": [
              2,
              3,
              0,
              2
            ],
            "Hex": "BI",
            "Bin": "AOAAOOAO"
          }
        },
        {
          "Decimal": {
            "Num": "180",
            "Signed": "+52",
            "Hex": "B4",
            "Bin": "10110100"
          },
          "Wave": {
            "Num": "AOAO",
            "Digits": [
              2,
              1,
              2,
              1
            ],
            "Hex": "BB",
            "Bin": "AOOAAOOA"
          },
          "Laegna": {
            "Num": "AEIE",
            "Digits": [
              2,
              3,
              0,
              3
            ],
            "Hex": "BL",
            "Bin": "AOAAOOAA"
          }
        },
        {
          "Decimal": {
            "Num": "181",
            "Signed": "+53",
            "Hex": "B5",
            "Bin": "10110101"
          },
          "Wave": {
            "Num": "AOII",
            "Digits": [
              2,
              1,
              0,
              0
            ],
            "Hex": "BK",
            "Bin": "AOOAOOOO"
          },
          "Laegna": {
            "Num": "AEOI",
            "Digits": [
              2,
              3,
              1,
              0
            ],
            "Hex": "BQ",
            "Bin": "AOAAOAOO"
          }
        },
        {
          "Decimal": {
            "Num": "182",
            "Signed": "+54",
            "Hex": "B6",
            "Bin": "10110110"
          },
          "Wave": {
            "Num": "AOIO",
            "Digits": [
              2,
              1,
              0,
              1
            ],
            "Hex": "BJ",
            "Bin": "AOOAOOOA"
          },
          "Laegna": {
            "Num": "AEOO",
            "Digits": [
              2,
              3,
              1,
              1
            ],
            "Hex": "BP",
            "Bin": "AOAAOAOA"
          }
        },
        {
          "Decimal": {
            "Num": "183",
            "Signed": "+55",
            "Hex": "B7",
            "Bin": "10110111"
          },
          "Wave": {
            "Num": "AOIA",
            "Digits": [
              2,
              1,
              0,
              2
            ],
            "Hex": "BI",
            "Bin": "AOOAOOAO"
          },
          "Laegna": {
            "Num": "AEOA",
            "Digits": [
              2,
              3,
              1,
              2
            ],
            "Hex": "BO",
            "Bin": "AOAAOAAO"
          }
        },
        {
          "Decimal": {
            "Num": "184",
            "Signed": "+56",
            "Hex": "B8",
            "Bin": "10111000"
          },
          "Wave": {
            "Num": "AOIE",
            "Digits": [
              2,
              1,
              0,
              3
            ],
            "Hex": "BL",
            "Bin": "AOOAOOAA"
          },
          "Laegna": {
            "Num": "AEOE",
            "Digits": [
              2,
              3,
              1,
              3
            ],
            "Hex": "BP",
            "Bin": "AOAAOAAA"
          }
        },
        {
          "Decimal": {
            "Num": "185",
            "Signed": "+57",
            "Hex": "B9",
            "Bin": "10111001"
          },
          "Wave": {
            "Num": "AOEI",
            "Digits": [
              2,
              1,
              3,
              0
            ],
            "Hex": "BG",
            "Bin": "AOOAAAOO"
          },
          "Laegna": {
            "Num": "AEAI",
            "Digits": [
              2,
              3,
              2,
              0
            ],
            "Hex": "BC",
            "Bin": "AOAAAOOO"
          }
        },
        {
          "Decimal": {
            "Num": "186",
            "Signed": "+58",
            "Hex": "BA",
            "Bin": "10111010"
          },
          "Wave": {
            "Num": "AOEO",
            "Digits": [
              2,
              1,
              3,
              1
            ],
            "Hex": "BF",
            "Bin": "AOOAAAOA"
          },
          "Laegna": {
            "Num": "AEAO",
            "Digits": [
              2,
              3,
              2,
              1
            ],
            "Hex": "BB",
            "Bin": "AOAAAOOA"
          }
        },
        {
          "Decimal": {
            "Num": "187",
            "Signed": "+59",
            "Hex": "BB",
            "Bin": "10111011"
          },
          "Wave": {
            "Num": "AOEA",
            "Digits": [
              2,
              1,
              3,
              2
            ],
            "Hex": "BE",
            "Bin": "AOOAAAAO"
          },
          "Laegna": {
            "Num": "AEAA",
            "Digits": [
              2,
              3,
              2,
              2
            ],
            "Hex": "BA",
            "Bin": "AOAAAOAO"
          }
        },
        {
          "Decimal": {
            "Num": "188",
            "Signed": "+60",
            "Hex": "BC",
            "Bin": "10111100"
          },
          "Wave": {
            "Num": "AOEE",
            "Digits": [
              2,
              1,
              3,
              3
            ],
            "Hex": "BF",
            "Bin": "AOOAAAAA"
          },
          "Laegna": {
            "Num": "AEAE",
            "Digits": [
              2,
              3,
              2,
              3
            ],
            "Hex": "BB",
            "Bin": "AOAAAOAA"
          }
        },
        {
          "Decimal": {
            "Num": "189",
            "Signed": "+61",
            "Hex": "BD",
            "Bin": "10111101"
          },
          "Wave": {
            "Num": "AOOA",
            "Digits": [
              2,
              1,
              1,
              2
            ],
            "Hex": "BO",
            "Bin": "AOOAOAAO"
          },
          "Laegna": {
            "Num": "AEEI",
            "Digits": [
              2,
              3,
              3,
              0
            ],
            "Hex": "BG",
            "Bin": "AOAAAAOO"
          }
        },
        {
          "Decimal": {
            "Num": "190",
            "Signed": "+62",
            "Hex": "BE",
            "Bin": "10111110"
          },
          "Wave": {
            "Num": "AOOI",
            "Digits": [
              2,
              1,
              1,
              0
            ],
            "Hex": "BQ",
            "Bin": "AOOAOAOO"
          },
          "Laegna": {
            "Num": "AEEO",
            "Digits": [
              2,
              3,
              3,
              1
            ],
            "Hex": "BF",
            "Bin": "AOAAAAOA"
          }
        },
        {
          "Decimal": {
            "Num": "191",
            "Signed": "+63",
            "Hex": "BF",
            "Bin": "10111111"
          },
          "Wave": {
            "Num": "AOOE",
            "Digits": [
              2,
              1,
              1,
              3
            ],
            "Hex": "BP",
            "Bin": "AOOAOAAA"
          },
          "Laegna": {
            "Num": "AEEA",
            "Digits": [
              2,
              3,
              3,
              2
            ],
            "Hex": "BE",
            "Bin": "AOAAAAAO"
          }
        },
        {
          "Decimal": {
            "Num": "192",
            "Signed": "+64",
            "Hex": "C0",
            "Bin": "11000000"
          },
          "Wave": {
            "Num": "AOOO",
            "Digits": [
              2,
              1,
              1,
              1
            ],
            "Hex": "BP",
            "Bin": "AOOAOAOA"
          },
          "Laegna": {
            "Num": "AEEE",
            "Digits": [
              2,
              3,
              3,
              3
            ],
            "Hex": "BF",
            "Bin": "AOAAAAAA"
          }
        },
        {
          "Decimal": {
            "Num": "193",
            "Signed": "+65",
            "Hex": "C1",
            "Bin": "11000001"
          },
          "Wave": {
            "Num": "EIII",
            "Digits": [
              3,
              0,
              0,
              0
            ],
            "Hex": "GK",
            "Bin": "AAOOOOOO"
          },
          "Laegna": {
            "Num": "EIII",
            "Digits": [
              3,
              0,
              0,
              0
            ],
            "Hex": "GK",
            "Bin": "AAOOOOOO"
          }
        },
        {
          "Decimal": {
            "Num": "194",
            "Signed": "+66",
            "Hex": "C2",
            "Bin": "11000010"
          },
          "Wave": {
            "Num": "EIIO",
            "Digits": [
              3,
              0,
              0,
              1
            ],
            "Hex": "GJ",
            "Bin": "AAOOOOOA"
          },
          "Laegna": {
            "Num": "EIIO",
            "Digits": [
              3,
              0,
              0,
              1
            ],
            "Hex": "GJ",
            "Bin": "AAOOOOOA"
          }
        },
        {
          "Decimal": {
            "Num": "195",
            "Signed": "+67",
            "Hex": "C3",
            "Bin": "11000011"
          },
          "Wave": {
            "Num": "EIIA",
            "Digits": [
              3,
              0,
              0,
              2
            ],
            "Hex": "GI",
            "Bin": "AAOOOOAO"
          },
          "Laegna": {
            "Num": "EIIA",
            "Digits": [
              3,
              0,
              0,
              2
            ],
            "Hex": "GI",
            "Bin": "AAOOOOAO"
          }
        },
        {
          "Decimal": {
            "Num": "196",
            "Signed": "+68",
            "Hex": "C4",
            "Bin": "11000100"
          },
          "Wave": {
            "Num": "EIIE",
            "Digits": [
              3,
              0,
              0,
              3
            ],
            "Hex": "GL",
            "Bin": "AAOOOOAA"
          },
          "Laegna": {
            "Num": "EIIE",
            "Digits": [
              3,
              0,
              0,
              3
            ],
            "Hex": "GL",
            "Bin": "AAOOOOAA"
          }
        },
        {
          "Decimal": {
            "Num": "197",
            "Signed": "+69",
            "Hex": "C5",
            "Bin": "11000101"
          },
          "Wave": {
            "Num": "EIOA",
            "Digits": [
              3,
              0,
              1,
              2
            ],
            "Hex": "GO",
            "Bin": "AAOOOAAO"
          },
          "Laegna": {
            "Num": "EIOI",
            "Digits": [
              3,
              0,
              1,
              0
            ],
            "Hex": "GQ",
            "Bin": "AAOOOAOO"
          }
        },
        {
          "Decimal": {
            "Num": "198",
            "Signed": "+70",
            "Hex": "C6",
            "Bin": "11000110"
          },
          "Wave": {
            "Num": "EIOI",
            "Digits": [
              3,
              0,
              1,
              0
            ],
            "Hex": "GQ",
            "Bin": "AAOOOAOO"
          },
          "Laegna": {
            "Num": "EIOO",
            "Digits": [
              3,
              0,
              1,
              1
            ],
            "Hex": "GP",
            "Bin": "AAOOOAOA"
          }
        },
        {
          "Decimal": {
            "Num": "199",
            "Signed": "+71",
            "Hex": "C7",
            "Bin": "11000111"
          },
          "Wave": {
            "Num": "EIOE",
            "Digits": [
              3,
              0,
              1,
              3
            ],
            "Hex": "GP",
            "Bin": "AAOOOAAA"
          },
          "Laegna": {
            "Num": "EIOA",
            "Digits": [
              3,
              0,
              1,
              2
            ],
            "Hex": "GO",
            "Bin": "AAOOOAAO"
          }
        },
        {
          "Decimal": {
            "Num": "200",
            "Signed": "+72",
            "Hex": "C8",
            "Bin": "11001000"
          },
          "Wave": {
            "Num": "EIOO",
            "Digits": [
              3,
              0,
              1,
              1
            ],
            "Hex": "GP",
            "Bin": "AAOOOAOA"
          },
          "Laegna": {
            "Num": "EIOE",
            "Digits": [
              3,
              0,
              1,
              3
            ],
            "Hex": "GP",
            "Bin": "AAOOOAAA"
          }
        },
        {
          "Decimal": {
            "Num": "201",
            "Signed": "+73",
            "Hex": "C9",
            "Bin": "11001001"
          },
          "Wave": {
            "Num": "EIAA",
            "Digits": [
              3,
              0,
              2,
              2
            ],
            "Hex": "GA",
            "Bin": "AAOOAOAO"
          },
          "Laegna": {
            "Num": "EIAI",
            "Digits": [
              3,
              0,
              2,
              0
            ],
            "Hex": "GC",
            "Bin": "AAOOAOOO"
          }
        },
        {
          "Decimal": {
            "Num": "202",
            "Signed": "+74",
            "Hex": "CA",
            "Bin": "11001010"
          },
          "Wave": {
            "Num": "EIAI",
            "Digits": [
              3,
              0,
              2,
              0
            ],
            "Hex": "GC",
            "Bin": "AAOOAOOO"
          },
          "Laegna": {
            "Num": "EIAO",
            "Digits": [
              3,
              0,
              2,
              1
            ],
            "Hex": "GB",
            "Bin": "AAOOAOOA"
          }
        },
        {
          "Decimal": {
            "Num": "203",
            "Signed": "+75",
            "Hex": "CB",
            "Bin": "11001011"
          },
          "Wave": {
            "Num": "EIAE",
            "Digits": [
              3,
              0,
              2,
              3
            ],
            "Hex": "GB",
            "Bin": "AAOOAOAA"
          },
          "Laegna": {
            "Num": "EIAA",
            "Digits": [
              3,
              0,
              2,
              2
            ],
            "Hex": "GA",
            "Bin": "AAOOAOAO"
          }
        },
        {
          "Decimal": {
            "Num": "204",
            "Signed": "+76",
            "Hex": "CC",
            "Bin": "11001100"
          },
          "Wave": {
            "Num": "EIAO",
            "Digits": [
              3,
              0,
              2,
              1
            ],
            "Hex": "GB",
            "Bin": "AAOOAOOA"
          },
          "Laegna": {
            "Num": "EIAE",
            "Digits": [
              3,
              0,
              2,
              3
            ],
            "Hex": "GB",
            "Bin": "AAOOAOAA"
          }
        },
        {
          "Decimal": {
            "Num": "205",
            "Signed": "+77",
            "Hex": "CD",
            "Bin": "11001101"
          },
          "Wave": {
            "Num": "EIEI",
            "Digits": [
              3,
              0,
              3,
              0
            ],
            "Hex": "GG",
            "Bin": "AAOOAAOO"
          },
          "Laegna": {
            "Num": "EIEI",
            "Digits": [
              3,
              0,
              3,
              0
            ],
            "Hex": "GG",
            "Bin": "AAOOAAOO"
          }
        },
        {
          "Decimal": {
            "Num": "206",
            "Signed": "+78",
            "Hex": "CE",
            "Bin": "11001110"
          },
          "Wave": {
            "Num": "EIEO",
            "Digits": [
              3,
              0,
              3,
              1
            ],
            "Hex": "GF",
            "Bin": "AAOOAAOA"
          },
          "Laegna": {
            "Num": "EIEO",
            "Digits": [
              3,
              0,
              3,
              1
            ],
            "Hex": "GF",
            "Bin": "AAOOAAOA"
          }
        },
        {
          "Decimal": {
            "Num": "207",
            "Signed": "+79",
            "Hex": "CF",
            "Bin": "11001111"
          },
          "Wave": {
            "Num": "EIEA",
            "Digits": [
              3,
              0,
              3,
              2
            ],
            "Hex": "GE",
            "Bin": "AAOOAAAO"
          },
          "Laegna": {
            "Num": "EIEA",
            "Digits": [
              3,
              0,
              3,
              2
            ],
            "Hex": "GE",
            "Bin": "AAOOAAAO"
          }
        },
        {
          "Decimal": {
            "Num": "208",
            "Signed": "+80",
            "Hex": "D0",
            "Bin": "11010000"
          },
          "Wave": {
            "Num": "EIEE",
            "Digits": [
              3,
              0,
              3,
              3
            ],
            "Hex": "GF",
            "Bin": "AAOOAAAA"
          },
          "Laegna": {
            "Num": "EIEE",
            "Digits": [
              3,
              0,
              3,
              3
            ],
            "Hex": "GF",
            "Bin": "AAOOAAAA"
          }
        },
        {
          "Decimal": {
            "Num": "209",
            "Signed": "+81",
            "Hex": "D1",
            "Bin": "11010001"
          },
          "Wave": {
            "Num": "EOAA",
            "Digits": [
              3,
              1,
              2,
              2
            ],
            "Hex": "FA",
            "Bin": "AAOAAOAO"
          },
          "Laegna": {
            "Num": "EOII",
            "Digits": [
              3,
              1,
              0,
              0
            ],
            "Hex": "FK",
            "Bin": "AAOAOOOO"
          }
        },
        {
          "Decimal": {
            "Num": "210",
            "Signed": "+82",
            "Hex": "D2",
            "Bin": "11010010"
          },
          "Wave": {
            "Num": "EOAI",
            "Digits": [
              3,
              1,
              2,
              0
            ],
            "Hex": "FC",
            "Bin": "AAOAAOOO"
          },
          "Laegna": {
            "Num": "EOIO",
            "Digits": [
              3,
              1,
              0,
              1
            ],
            "Hex": "FJ",
            "Bin": "AAOAOOOA"
          }
        },
        {
          "Decimal": {
            "Num": "211",
            "Signed": "+83",
            "Hex": "D3",
            "Bin": "11010011"
          },
          "Wave": {
            "Num": "EOAE",
            "Digits": [
              3,
              1,
              2,
              3
            ],
            "Hex": "FB",
            "Bin": "AAOAAOAA"
          },
          "Laegna": {
            "Num": "EOIA",
            "Digits": [
              3,
              1,
              0,
              2
            ],
            "Hex": "FI",
            "Bin": "AAOAOOAO"
          }
        },
        {
          "Decimal": {
            "Num": "212",
            "Signed": "+84",
            "Hex": "D4",
            "Bin": "11010100"
          },
          "Wave": {
            "Num": "EOAO",
            "Digits": [
              3,
              1,
              2,
              1
            ],
            "Hex": "FB",
            "Bin": "AAOAAOOA"
          },
          "Laegna": {
            "Num": "EOIE",
            "Digits": [
              3,
              1,
              0,
              3
            ],
            "Hex": "FL",
            "Bin": "AAOAOOAA"
          }
        },
        {
          "Decimal": {
            "Num": "213",
            "Signed": "+85",
            "Hex": "D5",
            "Bin": "11010101"
          },
          "Wave": {
            "Num": "EOII",
            "Digits": [
              3,
              1,
              0,
              0
            ],
            "Hex": "FK",
            "Bin": "AAOAOOOO"
          },
          "Laegna": {
            "Num": "EOOI",
            "Digits": [
              3,
              1,
              1,
              0
            ],
            "Hex": "FQ",
            "Bin": "AAOAOAOO"
          }
        },
        {
          "Decimal": {
            "Num": "214",
            "Signed": "+86",
            "Hex": "D6",
            "Bin": "11010110"
          },
          "Wave": {
            "Num": "EOIO",
            "Digits": [
              3,
              1,
              0,
              1
            ],
            "Hex": "FJ",
            "Bin": "AAOAOOOA"
          },
          "Laegna": {
            "Num": "EOOO",
            "Digits": [
              3,
              1,
              1,
              1
            ],
            "Hex": "FP",
            "Bin": "AAOAOAOA"
          }
        },
        {
          "Decimal": {
            "Num": "215",
            "Signed": "+87",
            "Hex": "D7",
            "Bin": "11010111"
          },
          "Wave": {
            "Num": "EOIA",
            "Digits": [
              3,
              1,
              0,
              2
            ],
            "Hex": "FI",
            "Bin": "AAOAOOAO"
          },
          "Laegna": {
            "Num": "EOOA",
            "Digits": [
              3,
              1,
              1,
              2
            ],
            "Hex": "FO",
            "Bin": "AAOAOAAO"
          }
        },
        {
          "Decimal": {
            "Num": "216",
            "Signed": "+88",
            "Hex": "D8",
            "Bin": "11011000"
          },
          "Wave": {
            "Num": "EOIE",
            "Digits": [
              3,
              1,
              0,
              3
            ],
            "Hex": "FL",
            "Bin": "AAOAOOAA"
          },
          "Laegna": {
            "Num": "EOOE",
            "Digits": [
              3,
              1,
              1,
              3
            ],
            "Hex": "FP",
            "Bin": "AAOAOAAA"
          }
        },
        {
          "Decimal": {
            "Num": "217",
            "Signed": "+89",
            "Hex": "D9",
            "Bin": "11011001"
          },
          "Wave": {
            "Num": "EOEI",
            "Digits": [
              3,
              1,
              3,
              0
            ],
            "Hex": "FG",
            "Bin": "AAOAAAOO"
          },
          "Laegna": {
            "Num": "EOAI",
            "Digits": [
              3,
              1,
              2,
              0
            ],
            "Hex": "FC",
            "Bin": "AAOAAOOO"
          }
        },
        {
          "Decimal": {
            "Num": "218",
            "Signed": "+90",
            "Hex": "DA",
            "Bin": "11011010"
          },
          "Wave": {
            "Num": "EOEO",
            "Digits": [
              3,
              1,
              3,
              1
            ],
            "Hex": "FF",
            "Bin": "AAOAAAOA"
          },
          "Laegna": {
            "Num": "EOAO",
            "Digits": [
              3,
              1,
              2,
              1
            ],
            "Hex": "FB",
            "Bin": "AAOAAOOA"
          }
        },
        {
          "Decimal": {
            "Num": "219",
            "Signed": "+91",
            "Hex": "DB",
            "Bin": "11011011"
          },
          "Wave": {
            "Num": "EOEA",
            "Digits": [
              3,
              1,
              3,
              2
            ],
            "Hex": "FE",
            "Bin": "AAOAAAAO"
          },
          "Laegna": {
            "Num": "EOAA",
            "Digits": [
              3,
              1,
              2,
              2
            ],
            "Hex": "FA",
            "Bin": "AAOAAOAO"
          }
        },
        {
          "Decimal": {
            "Num": "220",
            "Signed": "+92",
            "Hex": "DC",
            "Bin": "11011100"
          },
          "Wave": {
            "Num": "EOEE",
            "Digits": [
              3,
              1,
              3,
              3
            ],
            "Hex": "FF",
            "Bin": "AAOAAAAA"
          },
          "Laegna": {
            "Num": "EOAE",
            "Digits": [
              3,
              1,
              2,
              3
            ],
            "Hex": "FB",
            "Bin": "AAOAAOAA"
          }
        },
        {
          "Decimal": {
            "Num": "221",
            "Signed": "+93",
            "Hex": "DD",
            "Bin": "11011101"
          },
          "Wave": {
            "Num": "EOOA",
            "Digits": [
              3,
              1,
              1,
              2
            ],
            "Hex": "FO",
            "Bin": "AAOAOAAO"
          },
          "Laegna": {
            "Num": "EOEI",
            "Digits": [
              3,
              1,
              3,
              0
            ],
            "Hex": "FG",
            "Bin": "AAOAAAOO"
          }
        },
        {
          "Decimal": {
            "Num": "222",
            "Signed": "+94",
            "Hex": "DE",
            "Bin": "11011110"
          },
          "Wave": {
            "Num": "EOOI",
            "Digits": [
              3,
              1,
              1,
              0
            ],
            "Hex": "FQ",
            "Bin": "AAOAOAOO"
          },
          "Laegna": {
            "Num": "EOEO",
            "Digits": [
              3,
              1,
              3,
              1
            ],
            "Hex": "FF",
            "Bin": "AAOAAAOA"
          }
        },
        {
          "Decimal": {
            "Num": "223",
            "Signed": "+95",
            "Hex": "DF",
            "Bin": "11011111"
          },
          "Wave": {
            "Num": "EOOE",
            "Digits": [
              3,
              1,
              1,
              3
            ],
            "Hex": "FP",
            "Bin": "AAOAOAAA"
          },
          "Laegna": {
            "Num": "EOEA",
            "Digits": [
              3,
              1,
              3,
              2
            ],
            "Hex": "FE",
            "Bin": "AAOAAAAO"
          }
        },
        {
          "Decimal": {
            "Num": "224",
            "Signed": "+96",
            "Hex": "E0",
            "Bin": "11100000"
          },
          "Wave": {
            "Num": "EOOO",
            "Digits": [
              3,
              1,
              1,
              1
            ],
            "Hex": "FP",
            "Bin": "AAOAOAOA"
          },
          "Laegna": {
            "Num": "EOEE",
            "Digits": [
              3,
              1,
              3,
              3
            ],
            "Hex": "FF",
            "Bin": "AAOAAAAA"
          }
        },
        {
          "Decimal": {
            "Num": "225",
            "Signed": "+97",
            "Hex": "E1",
            "Bin": "11100001"
          },
          "Wave": {
            "Num": "EAAA",
            "Digits": [
              3,
              2,
              2,
              2
            ],
            "Hex": "EA",
            "Bin": "AAAOAOAO"
          },
          "Laegna": {
            "Num": "EAII",
            "Digits": [
              3,
              2,
              0,
              0
            ],
            "Hex": "EK",
            "Bin": "AAAOOOOO"
          }
        },
        {
          "Decimal": {
            "Num": "226",
            "Signed": "+98",
            "Hex": "E2",
            "Bin": "11100010"
          },
          "Wave": {
            "Num": "EAAI",
            "Digits": [
              3,
              2,
              2,
              0
            ],
            "Hex": "EC",
            "Bin": "AAAOAOOO"
          },
          "Laegna": {
            "Num": "EAIO",
            "Digits": [
              3,
              2,
              0,
              1
            ],
            "Hex": "EJ",
            "Bin": "AAAOOOOA"
          }
        },
        {
          "Decimal": {
            "Num": "227",
            "Signed": "+99",
            "Hex": "E3",
            "Bin": "11100011"
          },
          "Wave": {
            "Num": "EAAE",
            "Digits": [
              3,
              2,
              2,
              3
            ],
            "Hex": "EB",
            "Bin": "AAAOAOAA"
          },
          "Laegna": {
            "Num": "EAIA",
            "Digits": [
              3,
              2,
              0,
              2
            ],
            "Hex": "EI",
            "Bin": "AAAOOOAO"
          }
        },
        {
          "Decimal": {
            "Num": "228",
            "Signed": "+100",
            "Hex": "E4",
            "Bin": "11100100"
          },
          "Wave": {
            "Num": "EAAO",
            "Digits": [
              3,
              2,
              2,
              1
            ],
            "Hex": "EB",
            "Bin": "AAAOAOOA"
          },
          "Laegna": {
            "Num": "EAIE",
            "Digits": [
              3,
              2,
              0,
              3
            ],
            "Hex": "EL",
            "Bin": "AAAOOOAA"
          }
        },
        {
          "Decimal": {
            "Num": "229",
            "Signed": "+101",
            "Hex": "E5",
            "Bin": "11100101"
          },
          "Wave": {
            "Num": "EAII",
            "Digits": [
              3,
              2,
              0,
              0
            ],
            "Hex": "EK",
            "Bin": "AAAOOOOO"
          },
          "Laegna": {
            "Num": "EAOI",
            "Digits": [
              3,
              2,
              1,
              0
            ],
            "Hex": "EQ",
            "Bin": "AAAOOAOO"
          }
        },
        {
          "Decimal": {
            "Num": "230",
            "Signed": "+102",
            "Hex": "E6",
            "Bin": "11100110"
          },
          "Wave": {
            "Num": "EAIO",
            "Digits": [
              3,
              2,
              0,
              1
            ],
            "Hex": "EJ",
            "Bin": "AAAOOOOA"
          },
          "Laegna": {
            "Num": "EAOO",
            "Digits": [
              3,
              2,
              1,
              1
            ],
            "Hex": "EP",
            "Bin": "AAAOOAOA"
          }
        },
        {
          "Decimal": {
            "Num": "231",
            "Signed": "+103",
            "Hex": "E7",
            "Bin": "11100111"
          },
          "Wave": {
            "Num": "EAIA",
            "Digits": [
              3,
              2,
              0,
              2
            ],
            "Hex": "EI",
            "Bin": "AAAOOOAO"
          },
          "Laegna": {
            "Num": "EAOA",
            "Digits": [
              3,
              2,
              1,
              2
            ],
            "Hex": "EO",
            "Bin": "AAAOOAAO"
          }
        },
        {
          "Decimal": {
            "Num": "232",
            "Signed": "+104",
            "Hex": "E8",
            "Bin": "11101000"
          },
          "Wave": {
            "Num": "EAIE",
            "Digits": [
              3,
              2,
              0,
              3
            ],
            "Hex": "EL",
            "Bin": "AAAOOOAA"
          },
          "Laegna": {
            "Num": "EAOE",
            "Digits": [
              3,
              2,
              1,
              3
            ],
            "Hex": "EP",
            "Bin": "AAAOOAAA"
          }
        },
        {
          "Decimal": {
            "Num": "233",
            "Signed": "+105",
            "Hex": "E9",
            "Bin": "11101001"
          },
          "Wave": {
            "Num": "EAEI",
            "Digits": [
              3,
              2,
              3,
              0
            ],
            "Hex": "EG",
            "Bin": "AAAOAAOO"
          },
          "Laegna": {
            "Num": "EAAI",
            "Digits": [
              3,
              2,
              2,
              0
            ],
            "Hex": "EC",
            "Bin": "AAAOAOOO"
          }
        },
        {
          "Decimal": {
            "Num": "234",
            "Signed": "+106",
            "Hex": "EA",
            "Bin": "11101010"
          },
          "Wave": {
            "Num": "EAEO",
            "Digits": [
              3,
              2,
              3,
              1
            ],
            "Hex": "EF",
            "Bin": "AAAOAAOA"
          },
          "Laegna": {
            "Num": "EAAO",
            "Digits": [
              3,
              2,
              2,
              1
            ],
            "Hex": "EB",
            "Bin": "AAAOAOOA"
          }
        },
        {
          "Decimal": {
            "Num": "235",
            "Signed": "+107",
            "Hex": "EB",
            "Bin": "11101011"
          },
          "Wave": {
            "Num": "EAEA",
            "Digits": [
              3,
              2,
              3,
              2
            ],
            "Hex": "EE",
            "Bin": "AAAOAAAO"
          },
          "Laegna": {
            "Num": "EAAA",
            "Digits": [
              3,
              2,
              2,
              2
            ],
            "Hex": "EA",
            "Bin": "AAAOAOAO"
          }
        },
        {
          "Decimal": {
            "Num": "236",
            "Signed": "+108",
            "Hex": "EC",
            "Bin": "11101100"
          },
          "Wave": {
            "Num": "EAEE",
            "Digits": [
              3,
              2,
              3,
              3
            ],
            "Hex": "EF",
            "Bin": "AAAOAAAA"
          },
          "Laegna": {
            "Num": "EAAE",
            "Digits": [
              3,
              2,
              2,
              3
            ],
            "Hex": "EB",
            "Bin": "AAAOAOAA"
          }
        },
        {
          "Decimal": {
            "Num": "237",
            "Signed": "+109",
            "Hex": "ED",
            "Bin": "11101101"
          },
          "Wave": {
            "Num": "EAOA",
            "Digits": [
              3,
              2,
              1,
              2
            ],
            "Hex": "EO",
            "Bin": "AAAOOAAO"
          },
          "Laegna": {
            "Num": "EAEI",
            "Digits": [
              3,
              2,
              3,
              0
            ],
            "Hex": "EG",
            "Bin": "AAAOAAOO"
          }
        },
        {
          "Decimal": {
            "Num": "238",
            "Signed": "+110",
            "Hex": "EE",
            "Bin": "11101110"
          },
          "Wave": {
            "Num": "EAOI",
            "Digits": [
              3,
              2,
              1,
              0
            ],
            "Hex": "EQ",
            "Bin": "AAAOOAOO"
          },
          "Laegna": {
            "Num": "EAEO",
            "Digits": [
              3,
              2,
              3,
              1
            ],
            "Hex": "EF",
            "Bin": "AAAOAAOA"
          }
        },
        {
          "Decimal": {
            "Num": "239",
            "Signed": "+111",
            "Hex": "EF",
            "Bin": "11101111"
          },
          "Wave": {
            "Num": "EAOE",
            "Digits": [
              3,
              2,
              1,
              3
            ],
            "Hex": "EP",
            "Bin": "AAAOOAAA"
          },
          "Laegna": {
            "Num": "EAEA",
            "Digits": [
              3,
              2,
              3,
              2
            ],
            "Hex": "EE",
            "Bin": "AAAOAAAO"
          }
        },
        {
          "Decimal": {
            "Num": "240",
            "Signed": "+112",
            "Hex": "F0",
            "Bin": "11110000"
          },
          "Wave": {
            "Num": "EAOO",
            "Digits": [
              3,
              2,
              1,
              1
            ],
            "Hex": "EP",
            "Bin": "AAAOOAOA"
          },
          "Laegna": {
            "Num": "EAEE",
            "Digits": [
              3,
              2,
              3,
              3
            ],
            "Hex": "EF",
            "Bin": "AAAOAAAA"
          }
        },
        {
          "Decimal": {
            "Num": "241",
            "Signed": "+113",
            "Hex": "F1",
            "Bin": "11110001"
          },
          "Wave": {
            "Num": "EEII",
            "Digits": [
              3,
              3,
              0,
              0
            ],
            "Hex": "FK",
            "Bin": "AAAAOOOO"
          },
          "Laegna": {
            "Num": "EEII",
            "Digits": [
              3,
              3,
              0,
              0
            ],
            "Hex": "FK",
            "Bin": "AAAAOOOO"
          }
        },
        {
          "Decimal": {
            "Num": "242",
            "Signed": "+114",
            "Hex": "F2",
            "Bin": "11110010"
          },
          "Wave": {
            "Num": "EEIO",
            "Digits": [
              3,
              3,
              0,
              1
            ],
            "Hex": "FJ",
            "Bin": "AAAAOOOA"
          },
          "Laegna": {
            "Num": "EEIO",
            "Digits": [
              3,
              3,
              0,
              1
            ],
            "Hex": "FJ",
            "Bin": "AAAAOOOA"
          }
        },
        {
          "Decimal": {
            "Num": "243",
            "Signed": "+115",
            "Hex": "F3",
            "Bin": "11110011"
          },
          "Wave": {
            "Num": "EEIA",
            "Digits": [
              3,
              3,
              0,
              2
            ],
            "Hex": "FI",
            "Bin": "AAAAOOAO"
          },
          "Laegna": {
            "Num": "EEIA",
            "Digits": [
              3,
              3,
              0,
              2
            ],
            "Hex": "FI",
            "Bin": "AAAAOOAO"
          }
        },
        {
          "Decimal": {
            "Num": "244",
            "Signed": "+116",
            "Hex": "F4",
            "Bin": "11110100"
          },
          "Wave": {
            "Num": "EEIE",
            "Digits": [
              3,
              3,
              0,
              3
            ],
            "Hex": "FL",
            "Bin": "AAAAOOAA"
          },
          "Laegna": {
            "Num": "EEIE",
            "Digits": [
              3,
              3,
              0,
              3
            ],
            "Hex": "FL",
            "Bin": "AAAAOOAA"
          }
        },
        {
          "Decimal": {
            "Num": "245",
            "Signed": "+117",
            "Hex": "F5",
            "Bin": "11110101"
          },
          "Wave": {
            "Num": "EEOA",
            "Digits": [
              3,
              3,
              1,
              2
            ],
            "Hex": "FO",
            "Bin": "AAAAOAAO"
          },
          "Laegna": {
            "Num": "EEOI",
            "Digits": [
              3,
              3,
              1,
              0
            ],
            "Hex": "FQ",
            "Bin": "AAAAOAOO"
          }
        },
        {
          "Decimal": {
            "Num": "246",
            "Signed": "+118",
            "Hex": "F6",
            "Bin": "11110110"
          },
          "Wave": {
            "Num": "EEOI",
            "Digits": [
              3,
              3,
              1,
              0
            ],
            "Hex": "FQ",
            "Bin": "AAAAOAOO"
          },
          "Laegna": {
            "Num": "EEOO",
            "Digits": [
              3,
              3,
              1,
              1
            ],
            "Hex": "FP",
            "Bin": "AAAAOAOA"
          }
        },
        {
          "Decimal": {
            "Num": "247",
            "Signed": "+119",
            "Hex": "F7",
            "Bin": "11110111"
          },
          "Wave": {
            "Num": "EEOE",
            "Digits": [
              3,
              3,
              1,
              3
            ],
            "Hex": "FP",
            "Bin": "AAAAOAAA"
          },
          "Laegna": {
            "Num": "EEOA",
            "Digits": [
              3,
              3,
              1,
              2
            ],
            "Hex": "FO",
            "Bin": "AAAAOAAO"
          }
        },
        {
          "Decimal": {
            "Num": "248",
            "Signed": "+120",
            "Hex": "F8",
            "Bin": "11111000"
          },
          "Wave": {
            "Num": "EEOO",
            "Digits": [
              3,
              3,
              1,
              1
            ],
            "Hex": "FP",
            "Bin": "AAAAOAOA"
          },
          "Laegna": {
            "Num": "EEOE",
            "Digits": [
              3,
              3,
              1,
              3
            ],
            "Hex": "FP",
            "Bin": "AAAAOAAA"
          }
        },
        {
          "Decimal": {
            "Num": "249",
            "Signed": "+121",
            "Hex": "F9",
            "Bin": "11111001"
          },
          "Wave": {
            "Num": "EEAA",
            "Digits": [
              3,
              3,
              2,
              2
            ],
            "Hex": "FA",
            "Bin": "AAAAAOAO"
          },
          "Laegna": {
            "Num": "EEAI",
            "Digits": [
              3,
              3,
              2,
              0
            ],
            "Hex": "FC",
            "Bin": "AAAAAOOO"
          }
        },
        {
          "Decimal": {
            "Num": "250",
            "Signed": "+122",
            "Hex": "FA",
            "Bin": "11111010"
          },
          "Wave": {
            "Num": "EEAI",
            "Digits": [
              3,
              3,
              2,
              0
            ],
            "Hex": "FC",
            "Bin": "AAAAAOOO"
          },
          "Laegna": {
            "Num": "EEAO",
            "Digits": [
              3,
              3,
              2,
              1
            ],
            "Hex": "FB",
            "Bin": "AAAAAOOA"
          }
        },
        {
          "Decimal": {
            "Num": "251",
            "Signed": "+123",
            "Hex": "FB",
            "Bin": "11111011"
          },
          "Wave": {
            "Num": "EEAE",
            "Digits": [
              3,
              3,
              2,
              3
            ],
            "Hex": "FB",
            "Bin": "AAAAAOAA"
          },
          "Laegna": {
            "Num": "EEAA",
            "Digits": [
              3,
              3,
              2,
              2
            ],
            "Hex": "FA",
            "Bin": "AAAAAOAO"
          }
        },
        {
          "Decimal": {
            "Num": "252",
            "Signed": "+124",
            "Hex": "FC",
            "Bin": "11111100"
          },
          "Wave": {
            "Num": "EEAO",
            "Digits": [
              3,
              3,
              2,
              1
            ],
            "Hex": "FB",
            "Bin": "AAAAAOOA"
          },
          "Laegna": {
            "Num": "EEAE",
            "Digits": [
              3,
              3,
              2,
              3
            ],
            "Hex": "FB",
            "Bin": "AAAAAOAA"
          }
        },
        {
          "Decimal": {
            "Num": "253",
            "Signed": "+125",
            "Hex": "FD",
            "Bin": "11111101"
          },
          "Wave": {
            "Num": "EEEI",
            "Digits": [
              3,
              3,
              3,
              0
            ],
            "Hex": "FG",
            "Bin": "AAAAAAOO"
          },
          "Laegna": {
            "Num": "EEEI",
            "Digits": [
              3,
              3,
              3,
              0
            ],
            "Hex": "FG",
            "Bin": "AAAAAAOO"
          }
        },
        {
          "Decimal": {
            "Num": "254",
            "Signed": "+126",
            "Hex": "FE",
            "Bin": "11111110"
          },
          "Wave": {
            "Num": "EEEO",
            "Digits": [
              3,
              3,
              3,
              1
            ],
            "Hex": "FF",
            "Bin": "AAAAAAOA"
          },
          "Laegna": {
            "Num": "EEEO",
            "Digits": [
              3,
              3,
              3,
              1
            ],
            "Hex": "FF",
            "Bin": "AAAAAAOA"
          }
        },
        {
          "Decimal": {
            "Num": "255",
            "Signed": "+127",
            "Hex": "FF",
            "Bin": "11111111"
          },
          "Wave": {
            "Num": "EEEA",
            "Digits": [
              3,
              3,
              3,
              2
            ],
            "Hex": "FE",
            "Bin": "AAAAAAAO"
          },
          "Laegna": {
            "Num": "EEEA",
            "Digits": [
              3,
              3,
              3,
              2
            ],
            "Hex": "FE",
            "Bin": "AAAAAAAO"
          }
        },
        {
          "Decimal": {
            "Num": "256",
            "Signed": "+128",
            "Hex": "100",
            "Bin": "100000000"
          },
          "Wave": {
            "Num": "EEEE",
            "Digits": [
              3,
              3,
              3,
              3
            ],
            "Hex": "FF",
            "Bin": "AAAAAAAA"
          },
          "Laegna": {
            "Num": "EEEE",
            "Digits": [
              3,
              3,
              3,
              3
            ],
            "Hex": "FF",
            "Bin": "AAAAAAAA"
          }
        },
        {
          "Decimal": {
            "Num": "2inf",
            "Signed": "+inf",
            "Hex": null,
            "Bin": null
          },
          "Wave": {
            "Num": "∩∩∩∩",
            "Hex": "∩∩",
            "Bin": "∩∩∩∩∩∩∩∩"
          },
          "Laegna": {
            "Num": "∩∩∩∩",
            "Hex": "∩∩",
            "Bin": "∩∩∩∩∩∩∩∩"
          }
        }
      ]
    }
  ]
}
```

---

[extensions.py] is called next, and it utilized the result json file and adds data:
- The initial json file is meant to be stable structure.
- Extensions already use this basic data as built-in, not concerned of it's internal relations but only the final output, some internals might be recalculated but this is not instability - instability is to mess with their initial form.

```python
import json
import os
import math
```

We use json, os and math.

```python
# In the end, remove "numbers" from each chapter and add it back: it's the last, long element of subchapters.
class ExtChapterOrder:
    def use(self, apply):
        for chapter in apply.data["chapters"]:
            # This should be lightweight using only pointers
            nums = chapter["numbers"]
            del chapter["numbers"]
            chapter["numbers"] = nums
```

In the end, some blocks are moved without change in it's structure.

```python
class ExtChapterBounds:
    def use(self, apply):
        for chapter in apply.data["chapters"]:
            bounds = {}
            if chapter["R"] == 0.5:
                bounds["bounded"] = 2 + 4
                bounds["full"] = 2
                bounds["half"] = 1
            else:
                bounds["bounded"] = chapter["base"] ** chapter["R"] + 4
                bounds["full"] = chapter["base"] ** chapter["R"]
                bounds["half"] = chapter["base"] ** chapter["R"] / 2

            chapter["Bounds"] = bounds
```

Calculate boundaries of each R, digit length - smallest, median, biggest. Altough this was known by initial producer, the structure was instable - here, based on resulting file, the structure is stable and can tolerate mods.

```python
# Depends: ExtChapterBounds
class ExtFloat:
    def use(self, apply):
        for chapter in apply.data["chapters"]:
            bounds = chapter["Bounds"]
            for number in chapter["numbers"]:
                floating = {}
                floating["Num"] = None
                floating["Value"] = {}
                floating["Signed"] = {}

                # Value
                # -------------------------------

                # This is rounding out extremes, so "2inf" becomes "2" and other values are fine.
                position = number["Decimal"]["Num"]

                if position == "2inf":
                    position = bounds["full"]
                elif position == "0":
                    position = 0
                else:
                    if float(position) < bounds["half"] + 0.5:
                        position = int(position) - 1
                    else:
                        position = int(position)

                floating["Value"]["Percents"] = str(position / bounds["full"] * 100) + "%"
                floating["Value"]["Units"] = position / bounds["full"]

                # Percentage "0%..100%" is the "Num"
                floating["Num"] = str(math.floor(position / bounds["full"] * 100)) + "%"

                # Signed
                # -------------------------------

                # This is rounding out extremes, so "2inf" becomes "2" and other values are fine.
                position = number["Decimal"]["Signed"]

                if position == "-inf":
                    position = -bounds["half"]
                elif position == "+inf":
                    position = bounds["half"]
                elif position == "-0" or position == "+0":
                    position = 0
                else:
                    position = int(position)

                floating["Signed"]["Percents"] = str(position / bounds["half"] * 200) + "%"
                floating["Signed"]["Units"] = position / bounds["half"] * 2

                # Application
                # -------------------------------

                number["Float"] = floating
```

Calculate floating point, percentage-like representations for each number.

```
class ExtOctave:
    def use(self, apply):
        def square_multiplier(n):
            binary_str = bin(n-1)[2:]  # Convert to binary and remove the "0b" prefix
            return len(binary_str)

        def quad_multiplier(n):
            return square_multiplier(square_multiplier(n)) # Apply sq_mult twice

        for chapter in apply.data["chapters"]:
            bounds = chapter["Bounds"]
            for number in chapter["numbers"]:
                octave = {}
                octave["Num"] = None
                octave["Lower"] = {}
                octave["Higher"] = {}

                # This is rounding out extremes, so "2inf" becomes "2" and other values are fine.
                position = number["Decimal"]["Num"]
                sposition = number["Decimal"]["Signed"]

                if position == "2inf":
                    position = bounds["full"]
                elif position == "0":
                    position = 0
                if sposition == "-0": # check with uint
                    position = int(bounds["half"])
                elif sposition == "+0": # check with uint
                    position = int(bounds["half"] + 1)
                else:
                    position = int(position)

                # This is rounding out extremes, so "2inf" becomes "2" and other values are fine.

                if sposition == "-inf":
                    sposition = -bounds["half"]
                elif sposition == "+inf":
                    sposition = bounds["half"]
                if sposition == "-0":
                    sposition = 0
                elif sposition == "+0":
                    sposition = 0
                else:
                    sposition = int(sposition)

                def lowerOct(n):
                    if n < 0: return -lowerOct(-n)
                    
                    if n >= 2:
                        return square_multiplier(n)
                    elif n == 1:
                        return 0.5
                    elif n == 0:
                        return 0

                def higherOct(n):
                    if n < 0: return -higherOct(-n)
                    
                    if n >= 4:
                        return quad_multiplier(n)
                    elif n == 3:
                        return 0.5
                    elif n == 2:
                        return 0.25
                    elif n == 1:
                        return 0.25
                    elif n == 0:
                        return 0

                octave["Lower"]["Num"] = lowerOct(position)
                octave["Lower"]["Signed"] = lowerOct(sposition)
                octave["Lower"]["D"] = position
                octave["Lower"]["sD"] = sposition

                octave["Higher"]["Num"] = higherOct(position)
                octave["Higher"]["Signed"] = higherOct(sposition)

                octave["Num"] = octave["Lower"]["Num"]

                number["Octave"] = octave
```

Register more data about boundaries.

```python
class ExtAnimator:
    def use(self, apply):
        id0 = 0
        id1 = 1
        idx0 = 0
        idx1 = 1
        update = False
        chapters = []
        numbers = []
        
        for chapter in apply.data["chapters"]:
            # Preregister the chapter
            pchapter = { }

            if update:
                idx0 += 1
                idx1 += 1

            # Apply state
            pchapter["id"] = { }
            pchapter["id"]["Num"] = idx0
            pchapter["id"]["Id0"] = { }
            pchapter["id"]["Id0"]["Num"] = idx0
            pchapter["id"]["Id1"] = { }
            pchapter["id"]["Id1"]["Num"] = idx1
            # Register R as chapter index in json reader for this extension or in general
            pchapter["R"] = chapter["R"]
            if "special" in chapter:
                pchapter["special"] = chapter["special"]
            pchapter["base"] = chapter["base"]
            pchapter["Bounds"] = chapter["Bounds"]
        
            bounds = chapter["Bounds"]
            for number in chapter["numbers"]:
                # Preregister the number
                pnumber = { }

                if update:
                    id0 += 1
                    id1 += 1

                # Apply state
                pnumber["id"] = { }
                pnumber["id"]["Num"] = id0
                pnumber["id"]["Id0"] = { }
                pnumber["id"]["Id0"]["Num"] = id0
                pnumber["id"]["Id1"] = { }
                pnumber["id"]["Id1"]["Num"] = id1
                pnumber["Decimal"] = { }
                pnumber["Decimal"]["Num"] = number["Decimal"]["Num"]
                pnumber["Chapter"] = { }
                pnumber["Chapter"]["Num"] = pchapter["id"]["Num"]
                pnumber["Chapter"]["id"] = { }
                pnumber["Chapter"]["id"]["Num"] = pchapter["id"]["Num"]
                pnumber["R"] = pchapter["R"]
                pnumber["T"] = number["Decimal"]
                if pnumber["R"] == 0.5:
                    pnumber["T"]["Laegna"] = number["Laegna"]["Bin"]
                    pnumber["T"]["Wave"] = number["Wave"]["Bin"]
                else:
                    pnumber["T"]["Laegna"] = number["Laegna"]["Num"]
                    pnumber["T"]["Wave"] = number["Wave"]["Num"]

                #remember to update id's
                update = True

                numbers += [ pnumber ]

            #do not forget
            update = True

            # Apply all extensions; ultimate identifier
            chapters += [ pchapter ]

        apply.animation = { }
        apply.animation["numbers"] = numbers
        apply.animation["chapters"] = chapters

        self.numbers = numbers
        self.chapters = chapters
        self.data = apply.data

        # Data and state preparation finished
        # - Use the internal, more plugin-like version of itself
        self.internalTools(apply)

    def internalTools(self, apply):
        apply.tool(self)

    def tools(self, apply):
        print("save")
        self.save(apply)

    # This can save only json: format is internal to tool use
    def save(self, apply):
        jsond = { }

        jsond["meta"] = { }
        jsond["meta"]["Version"] = 1
        jsond["meta"]["description"] = "Laegna / Waveweaver initial timeline"

        jsond["chapters"] = apply.animation["chapters"]

        # Animation keeps track in sequenced order and uses drivers.
        jsond["script"] = apply.animation["numbers"]

        encoder = json.JSONEncoder()
        encoder.indent = 2
        data = encoder.encode(jsond)
        apply.writeone(data, "animation.json")
```

Utilize intermediate part where people can modify the animations and recreate their personal number cycles, setting each frame to meet their presentation needs.

```
class ApplyExtensions:
    def __init__(self, input_files = None, output_folder=None):
        if input_files == None:
            input_files = ["numbers.bin.json", "numbers.json"]

        if output_folder == None:
            output_folder = "numberdatabase"

        self.input_files = input_files
        self.output_folder = output_folder
        self.tools = []

    def refer(self):
        print("refer")
        for tool in self.tools:
            # Apply deferred tools in registered tool (extension)
            # - simplified: put all it's tools in one function, but
            # then read this code to understand the sequence.
            print("tool")
            tool.tools(self)

    # defer a tool / "apply.tool" for long name :P
    def tool(self, ext):
        print("tool", ext)
        self.tools += [ext]

    def reads(self):
        data = {}

        data["meta"] = {}
        data["meta"]["version"] = 1
        data["meta"]["description"] = "Laegna / Waveweaver complete number system"
        data["chapters"] = []

        for input_file in self.input_files:
            with open(input_file, 'r') as f:
                data1 = json.load(f)

            for chapter in data1["chapters"]:
                data["chapters"] += [chapter]


        self.data = data
        self.writelist = []

    def extend(self, extension):
        extension.use(self)

    def writeone(self, data, filename):
        self.writelist += [{ "data": data, "filename": filename }]

    def writeflat(self):
        self.refer() # run deferred tasks
        
        flat_output_folder = self.output_folder + "/flatlist"
        
        # Create the output directory (if it doesn't exist)
        if not os.path.exists(flat_output_folder):
            os.makedirs(flat_output_folder)

        # These types of files are most easy to handle for certain people, especially
        # to develop.

        with open(flat_output_folder + "/toc.md", "w") as f:
            f.write("Files in this folder resemble the ones you can open with classical programming " +
                    "books; and where most people do not lack a viewer or skill at all; but indeed they " +
                    "can be bored; hardly they contain very much data.\n\n")

            f.write("You can customize the data with extensions.py for reading in arbitrary programs.")

        with open(flat_output_folder + "/laegna.md", "w") as f:
            for chapter in self.data["chapters"]:
                f.write("# " + str(chapter["R"]) + "\n\n")
                bounds = chapter["Bounds"]
                for number in chapter["numbers"]:
                    if chapter["base"] == 2:
                        f.write("`" + number["Laegna"]["Bin"] + "` ")
                    else:
                        f.write("`" + number["Laegna"]["Num"] + "` ")

                f.write("\n\n")

        with open(flat_output_folder + "/laegnawaves.md", "w") as f:
            for chapter in self.data["chapters"]:
                f.write("# " + str(chapter["R"]) + "\n\n")
                bounds = chapter["Bounds"]
                for number in chapter["numbers"]:
                    if chapter["base"] == 2:
                        f.write("`" + number["Wave"]["Bin"] + "` ")
                    else:
                        f.write("`" + number["Wave"]["Num"] + "` ")

                f.write("\n\n")

        with open(flat_output_folder + "/laeequality.md", "w") as f:
            for chapter in self.data["chapters"]:
                f.write("# " + str(chapter["R"]) + "\n\n")
                bounds = chapter["Bounds"]
                for number in chapter["numbers"]:
                    if chapter["base"] == 2:
                        f.write("$" + (number["Laegna"]["Bin"] if number["Laegna"]["Bin"]!=None else "NULL") + " = " + (number["Decimal"]["Bin"] if number["Decimal"]["Bin"]!=None else "NULL") + "$\n\n")
                    else:
                        f.write("$" + (number["Laegna"]["Num"] if number["Laegna"]["Num"]!=None else "NULL") + " = " + (str(number["Decimal"]["Num"]) if number["Decimal"]["Num"]!=None else "NULL") + "$\n\n")

                f.write("\n\n")

        with open(flat_output_folder + "/waveequality.md", "w") as f:
            for chapter in self.data["chapters"]:
                f.write("# " + str(chapter["R"]) + "\n\n")
                bounds = chapter["Bounds"]
                for number in chapter["numbers"]:
                    if chapter["base"] == 2:
                        f.write("$" + (number["Wave"]["Bin"] if number["Wave"]["Bin"]!=None else "NULL") + " = " + (number["Decimal"]["Bin"] if number["Decimal"]["Bin"]!=None else "NULL") + "$\n\n")
                    else:
                        f.write("$" + (number["Wave"]["Num"] if number["Wave"]["Num"]!=None else "NULL") + " = " + (str(number["Decimal"]["Num"]) if number["Decimal"]["Num"]!=None else "NULL") + "$\n\n")

                f.write("\n\n")

        with open(flat_output_folder + "/multiline.md", "w") as f:
            for chapter in self.data["chapters"]:
                f.write("# " + str(chapter["R"]) + "\n\n")
                bounds = chapter["Bounds"]
                for number in chapter["numbers"]:
                    if chapter["base"] == 2:
                        if number["Decimal"]["Bin"] != None:
                            f.write("##### " + number["Decimal"]["Bin"] + "=" + " (bin)\n")
                        else:
                            f.write("##### ?= (bin)\n")
                            
                        if number["Laegna"]["Bin"] != None:
                            f.write("Laegna: $" + number["Laegna"]["Bin"] + "$." + "\n")
                        else:
                            f.write("?;\n")

                        if number["Wave"]["Bin"] != None:
                            f.write("Wave: $" + number["Wave"]["Bin"] + "$." + "\n")
                        else:
                            f.write("?.\n")

                        f.write("\n")
                    else:
                        if number["Decimal"]["Num"] != None:
                            f.write("##### " + str(number["Decimal"]["Num"]) + "=" + "\n")
                        else:
                            f.write("##### ?=\n")
                            
                        if number["Decimal"]["Bin"] != None:
                            f.write("Laegna: $" + number["Laegna"]["Num"] + "$." + "\n")
                        else:
                            f.write("?;\n")

                        if number["Decimal"]["Bin"] != None:
                            f.write("Wave: $" + number["Wave"]["Num"] + "$." + "\n")
                        else:
                            f.write("?.\n")

                        f.write("\n")

                f.write("\n\n")

        for writeaction in self.writelist:
            with open(flat_output_folder + "/" + writeaction["filename"], "w") as f:
                f.write(writeaction["data"])


    def writes(self):
        # Create the output directory (if it doesn't exist)
        if not os.path.exists(self.output_folder):
            os.makedirs(self.output_folder)

        # Write complete json file
        with open(self.output_folder + "/complete.json", "w") as f:
            json.dump(self.data, f, indent=2)

        # Create the output directory (if it doesn't exist)
        if not os.path.exists(self.output_folder + "/flatlist"):
            os.makedirs(self.output_folder + "/flatlist")

        self.writeflat()
```

All extensions are processed in order, and if they have work to be delayed or control structures or operations like file modification, these are controlled.

```python
def process_numbers_json():
    """
    Reads numbers.json, processes it based on the number list structure,
    and saves the structured data to a file named extension.json in the
    same directory as the script.
    """

    apply = ApplyExtensions() # create workspace (of open files and objects)
    apply.reads() # read files

    # Chapters include number boundary metadata
    apply.extend(ExtChapterBounds())

    # Percentages and range-relative positions in mostly floats
    apply.extend(ExtFloat())

    # fix the order:
    #   Order of adding blocks remains.
    apply.extend(ExtChapterOrder())

    # Basic information about Octaves
    apply.extend(ExtOctave())

    # Basic information about Octaves
    apply.extend(ExtAnimator())

    apply.writes() # write files
```

We start from json which was brought above.

```python
# Example Usage:
if __name__ == "__main__":
    process_numbers_json()
```

When file is started, it does it's main operation:
- Process all numbers.

---

After all these commands, it produces complete Laegna Number Database from ranges 1 to 4, which is total internal Universe in sharpest smallest optimal model:

```json
{
  "meta": {
    "version": 1,
    "description": "Laegna / Waveweaver complete number system"
  },
  "chapters": [
    {
      "R": 0.5,
      "base": 2,
      "special": "binary",
      "Bounds": {
        "bounded": 6,
        "full": 2,
        "half": 1
      },
      "numbers": [
        {
          "Decimal": {
            "Num": "0",
            "Signed": "-inf",
            "Hex": "0",
            "Bin": "0",
            "Laegna": "W",
            "Wave": "W"
          },
          "Wave": {
            "Bin": "W"
          },
          "Laegna": {
            "Bin": "W"
          },
          "Float": {
            "Num": "0%",
            "Value": {
              "Percents": "0.0%",
              "Units": 0.0
            },
            "Signed": {
              "Percents": "-200.0%",
              "Units": -2.0
            }
          },
          "Octave": {
            "Num": 0,
            "Lower": {
              "Num": 0,
              "Signed": -0.5,
              "D": 0,
              "sD": -1
            },
            "Higher": {
              "Num": 0,
              "Signed": -0.25
            }
          }
        },
        {
          "Decimal": {
            "Num": "1",
            "Signed": "-1",
            "Hex": "1",
            "Bin": "1",
            "Laegna": "O",
            "Wave": "O"
          },
          "Wave": {
            "Bin": "O"
          },
          "Laegna": {
            "Bin": "O"
          },
          "Float": {
            "Num": "0%",
            "Value": {
              "Percents": "0.0%",
              "Units": 0.0
            },
            "Signed": {
              "Percents": "-200.0%",
              "Units": -2.0
            }
          },
          "Octave": {
            "Num": 0.5,
            "Lower": {
              "Num": 0.5,
              "Signed": -0.5,
              "D": 1,
              "sD": -1
            },
            "Higher": {
              "Num": 0.25,
              "Signed": -0.25
            }
          }
        },
        {
          "Decimal": {
            "Num": 1.5,
            "Signed": "-0",
            "Hex": null,
            "Bin": null,
            "Laegna": "V",
            "Wave": "V"
          },
          "Wave": {
            "Bin": "V"
          },
          "Laegna": {
            "Bin": "V"
          },
          "Float": {
            "Num": "50%",
            "Value": {
              "Percents": "50.0%",
              "Units": 0.5
            },
            "Signed": {
              "Percents": "0.0%",
              "Units": 0.0
            }
          },
          "Octave": {
            "Num": 0.5,
            "Lower": {
              "Num": 0.5,
              "Signed": 0,
              "D": 1,
              "sD": 0
            },
            "Higher": {
              "Num": 0.25,
              "Signed": 0
            }
          }
        },
        {
          "Decimal": {
            "Num": 1.5,
            "Signed": "+0",
            "Hex": null,
            "Bin": null,
            "Laegna": "U",
            "Wave": "U"
          },
          "Wave": {
            "Bin": "U"
          },
          "Laegna": {
            "Bin": "U"
          },
          "Float": {
            "Num": "50%",
            "Value": {
              "Percents": "50.0%",
              "Units": 0.5
            },
            "Signed": {
              "Percents": "0.0%",
              "Units": 0.0
            }
          },
          "Octave": {
            "Num": 1,
            "Lower": {
              "Num": 1,
              "Signed": 0,
              "D": 2,
              "sD": 0
            },
            "Higher": {
              "Num": 0.25,
              "Signed": 0
            }
          }
        },
        {
          "Decimal": {
            "Num": "2",
            "Signed": "+1",
            "Hex": "2",
            "Bin": "10",
            "Laegna": "A",
            "Wave": "A"
          },
          "Wave": {
            "Bin": "A"
          },
          "Laegna": {
            "Bin": "A"
          },
          "Float": {
            "Num": "100%",
            "Value": {
              "Percents": "100.0%",
              "Units": 1.0
            },
            "Signed": {
              "Percents": "200.0%",
              "Units": 2.0
            }
          },
          "Octave": {
            "Num": 1,
            "Lower": {
              "Num": 1,
              "Signed": 0.5,
              "D": 2,
              "sD": 1
            },
            "Higher": {
              "Num": 0.25,
              "Signed": 0.25
            }
          }
        },
        {
          "Decimal": {
            "Num": "2inf",
            "Signed": "+inf",
            "Hex": null,
            "Bin": null,
            "Laegna": "\u2229",
            "Wave": "\u2229"
          },
          "Wave": {
            "Bin": "\u2229"
          },
          "Laegna": {
            "Bin": "\u2229"
          },
          "Float": {
            "Num": "100%",
            "Value": {
              "Percents": "100.0%",
              "Units": 1.0
            },
            "Signed": {
              "Percents": "200.0%",
              "Units": 2.0
            }
          },
          "Octave": {
            "Num": 1,
            "Lower": {
              "Num": 1,
              "Signed": 0.5,
              "D": 2,
              "sD": 1
            },
            "Higher": {
              "Num": 0.25,
              "Signed": 0.25
            }
          }
        }
      ]
    },
    {
      "R": 1,
      "base": 4,
      "Bounds": {
        "bounded": 8,
        "full": 4,
        "half": 2.0
      },
      "numbers": [
        {
          "Decimal": {
            "Num": "0",
            "Signed": "-inf",
            "Hex": "0",
            "Bin": "0",
            "Laegna": "W",
            "Wave": "W"
          },
          "Wave": {
            "Num": "W",
            "Hex": null,
            "Bin": "WW"
          },
          "Laegna": {
            "Num": "W",
            "Hex": null,
            "Bin": "WW"
          },
          "Float": {
            "Num": "0%",
            "Value": {
              "Percents": "0.0%",
              "Units": 0.0
            },
            "Signed": {
              "Percents": "-200.0%",
              "Units": -2.0
            }
          },
          "Octave": {
            "Num": 0,
            "Lower": {
              "Num": 0,
              "Signed": -1,
              "D": 0,
              "sD": -2
            },
            "Higher": {
              "Num": 0,
              "Signed": -0.25
            }
          }
        },
        {
          "Decimal": {
            "Num": "1",
            "Signed": "-8",
            "Hex": "1",
            "Bin": "1",
            "Laegna": "I",
            "Wave": "I"
          },
          "Wave": {
            "Num": "I",
            "Digits": [
              0
            ],
            "Hex": null,
            "Bin": "OO"
          },
          "Laegna": {
            "Num": "I",
            "Digits": [
              0
            ],
            "Hex": null,
            "Bin": "OO"
          },
          "Float": {
            "Num": "0%",
            "Value": {
              "Percents": "0.0%",
              "Units": 0.0
            },
            "Signed": {
              "Percents": "-800.0%",
              "Units": -8.0
            }
          },
          "Octave": {
            "Num": 0.5,
            "Lower": {
              "Num": 0.5,
              "Signed": -3,
              "D": 1,
              "sD": -8
            },
            "Higher": {
              "Num": 0.25,
              "Signed": -2
            }
          }
        },
        {
          "Decimal": {
            "Num": "2",
            "Signed": "-7",
            "Hex": "2",
            "Bin": "10",
            "Laegna": "O",
            "Wave": "O"
          },
          "Wave": {
            "Num": "O",
            "Digits": [
              1
            ],
            "Hex": null,
            "Bin": "OA"
          },
          "Laegna": {
            "Num": "O",
            "Digits": [
              1
            ],
            "Hex": null,
            "Bin": "OA"
          },
          "Float": {
            "Num": "25%",
            "Value": {
              "Percents": "25.0%",
              "Units": 0.25
            },
            "Signed": {
              "Percents": "-700.0%",
              "Units": -7.0
            }
          },
          "Octave": {
            "Num": 1,
            "Lower": {
              "Num": 1,
              "Signed": -3,
              "D": 2,
              "sD": -7
            },
            "Higher": {
              "Num": 0.25,
              "Signed": -2
            }
          }
        },
        {
          "Decimal": {
            "Num": 2.5,
            "Signed": "-0",
            "Hex": null,
            "Bin": null,
            "Laegna": "V",
            "Wave": "V"
          },
          "Wave": {
            "Num": "V",
            "Hex": null,
            "Bin": "VV"
          },
          "Laegna": {
            "Num": "V",
            "Hex": null,
            "Bin": "VV"
          },
          "Float": {
            "Num": "50%",
            "Value": {
              "Percents": "50.0%",
              "Units": 0.5
            },
            "Signed": {
              "Percents": "0.0%",
              "Units": 0.0
            }
          },
          "Octave": {
            "Num": 1,
            "Lower": {
              "Num": 1,
              "Signed": 0,
              "D": 2,
              "sD": 0
            },
            "Higher": {
              "Num": 0.25,
              "Signed": 0
            }
          }
        },
        {
          "Decimal": {
            "Num": 2.5,
            "Signed": "+0",
            "Hex": null,
            "Bin": null,
            "Laegna": "U",
            "Wave": "U"
          },
          "Wave": {
            "Num": "U",
            "Hex": null,
            "Bin": "UU"
          },
          "Laegna": {
            "Num": "U",
            "Hex": null,
            "Bin": "UU"
          },
          "Float": {
            "Num": "50%",
            "Value": {
              "Percents": "50.0%",
              "Units": 0.5
            },
            "Signed": {
              "Percents": "0.0%",
              "Units": 0.0
            }
          },
          "Octave": {
            "Num": 2,
            "Lower": {
              "Num": 2,
              "Signed": 0,
              "D": 3,
              "sD": 0
            },
            "Higher": {
              "Num": 0.5,
              "Signed": 0
            }
          }
        },
        {
          "Decimal": {
            "Num": "3",
            "Signed": "+1",
            "Hex": "3",
            "Bin": "11",
            "Laegna": "A",
            "Wave": "A"
          },
          "Wave": {
            "Num": "A",
            "Digits": [
              2
            ],
            "Hex": null,
            "Bin": "AO"
          },
          "Laegna": {
            "Num": "A",
            "Digits": [
              2
            ],
            "Hex": null,
            "Bin": "AO"
          },
          "Float": {
            "Num": "75%",
            "Value": {
              "Percents": "75.0%",
              "Units": 0.75
            },
            "Signed": {
              "Percents": "100.0%",
              "Units": 1.0
            }
          },
          "Octave": {
            "Num": 2,
            "Lower": {
              "Num": 2,
              "Signed": 0.5,
              "D": 3,
              "sD": 1
            },
            "Higher": {
              "Num": 0.5,
              "Signed": 0.25
            }
          }
        },
        {
          "Decimal": {
            "Num": "4",
            "Signed": "+2",
            "Hex": "4",
            "Bin": "100",
            "Laegna": "E",
            "Wave": "E"
          },
          "Wave": {
            "Num": "E",
            "Digits": [
              3
            ],
            "Hex": null,
            "Bin": "AA"
          },
          "Laegna": {
            "Num": "E",
            "Digits": [
              3
            ],
            "Hex": null,
            "Bin": "AA"
          },
          "Float": {
            "Num": "100%",
            "Value": {
              "Percents": "100.0%",
              "Units": 1.0
            },
            "Signed": {
              "Percents": "200.0%",
              "Units": 2.0
            }
          },
          "Octave": {
            "Num": 2,
            "Lower": {
              "Num": 2,
              "Signed": 1,
              "D": 4,
              "sD": 2
            },
            "Higher": {
              "Num": 1,
              "Signed": 0.25
            }
          }
        },
        {
          "Decimal": {
            "Num": "2inf",
            "Signed": "+inf",
            "Hex": null,
            "Bin": null,
            "Laegna": "\u2229",
            "Wave": "\u2229"
          },
          "Wave": {
            "Num": "\u2229",
            "Hex": null,
            "Bin": "\u2229\u2229"
          },
          "Laegna": {
            "Num": "\u2229",
            "Hex": null,
            "Bin": "\u2229\u2229"
          },
          "Float": {
            "Num": "100%",
            "Value": {
              "Percents": "100.0%",
              "Units": 1.0
            },
            "Signed": {
              "Percents": "200.0%",
              "Units": 2.0
            }
          },
          "Octave": {
            "Num": 2,
            "Lower": {
              "Num": 2,
              "Signed": 1,
              "D": 4,
              "sD": 2
            },
            "Higher": {
              "Num": 1,
              "Signed": 0.25
            }
          }
        }
      ]
    },
    {
      "R": 2,
      "base": 4,
      "Bounds": {
        "bounded": 20,
        "full": 16,
        "half": 8.0
      },
      "numbers": [
        {
          "Decimal": {
            "Num": "0",
            "Signed": "-inf",
            "Hex": "0",
            "Bin": "0",
            "Laegna": "WW",
            "Wave": "WW"
          },
          "Wave": {
            "Num": "WW",
            "Hex": "W",
            "Bin": "WWWW"
          },
          "Laegna": {
            "Num": "WW",
            "Hex": "W",
            "Bin": "WWWW"
          },
          "Float": {
            "Num": "0%",
            "Value": {
              "Percents": "0.0%",
              "Units": 0.0
            },
            "Signed": {
              "Percents": "-200.0%",
              "Units": -2.0
            }
          },
          "Octave": {
            "Num": 0,
            "Lower": {
              "Num": 0,
              "Signed": -3,
              "D": 0,
              "sD": -8
            },
            "Higher": {
              "Num": 0,
              "Signed": -2
            }
          }
        },
        {
          "Decimal": {
            "Num": "1",
            "Signed": "-8",
            "Hex": "1",
            "Bin": "1",
            "Laegna": "II",
            "Wave": "II"
          },
          "Wave": {
            "Num": "II",
            "Digits": [
              0,
              0
            ],
            "Hex": "K",
            "Bin": "OOOO"
          },
          "Laegna": {
            "Num": "II",
            "Digits": [
              0,
              0
            ],
            "Hex": "K",
            "Bin": "OOOO"
          },
          "Float": {
            "Num": "0%",
            "Value": {
              "Percents": "0.0%",
              "Units": 0.0
            },
            "Signed": {
              "Percents": "-200.0%",
              "Units": -2.0
            }
          },
          "Octave": {
            "Num": 0.5,
            "Lower": {
              "Num": 0.5,
              "Signed": -3,
              "D": 1,
              "sD": -8
            },
            "Higher": {
              "Num": 0.25,
              "Signed": -2
            }
          }
        },
        {
          "Decimal": {
            "Num": "2",
            "Signed": "-7",
            "Hex": "2",
            "Bin": "10",
            "Laegna": "IO",
            "Wave": "IO"
          },
          "Wave": {
            "Num": "IO",
            "Digits": [
              0,
              1
            ],
            "Hex": "J",
            "Bin": "OOOA"
          },
          "Laegna": {
            "Num": "IO",
            "Digits": [
              0,
              1
            ],
            "Hex": "J",
            "Bin": "OOOA"
          },
          "Float": {
            "Num": "6%",
            "Value": {
              "Percents": "6.25%",
              "Units": 0.0625
            },
            "Signed": {
              "Percents": "-175.0%",
              "Units": -1.75
            }
          },
          "Octave": {
            "Num": 1,
            "Lower": {
              "Num": 1,
              "Signed": -3,
              "D": 2,
              "sD": -7
            },
            "Higher": {
              "Num": 0.25,
              "Signed": -2
            }
          }
        },
        {
          "Decimal": {
            "Num": "3",
            "Signed": "-6",
            "Hex": "3",
            "Bin": "11",
            "Laegna": "IA",
            "Wave": "IA"
          },
          "Wave": {
            "Num": "IA",
            "Digits": [
              0,
              2
            ],
            "Hex": "I",
            "Bin": "OOAO"
          },
          "Laegna": {
            "Num": "IA",
            "Digits": [
              0,
              2
            ],
            "Hex": "I",
            "Bin": "OOAO"
          },
          "Float": {
            "Num": "12%",
            "Value": {
              "Percents": "12.5%",
              "Units": 0.125
            },
            "Signed": {
              "Percents": "-150.0%",
              "Units": -1.5
            }
          },
          "Octave": {
            "Num": 2,
            "Lower": {
              "Num": 2,
              "Signed": -3,
              "D": 3,
              "sD": -6
            },
            "Higher": {
              "Num": 0.5,
              "Signed": -2
            }
          }
        },
        {
          "Decimal": {
            "Num": "4",
            "Signed": "-5",
            "Hex": "4",
            "Bin": "100",
            "Laegna": "IE",
            "Wave": "IE"
          },
          "Wave": {
            "Num": "IE",
            "Digits": [
              0,
              3
            ],
            "Hex": "L",
            "Bin": "OOAA"
          },
          "Laegna": {
            "Num": "IE",
            "Digits": [
              0,
              3
            ],
            "Hex": "L",
            "Bin": "OOAA"
          },
          "Float": {
            "Num": "18%",
            "Value": {
              "Percents": "18.75%",
              "Units": 0.1875
            },
            "Signed": {
              "Percents": "-125.0%",
              "Units": -1.25
            }
          },
          "Octave": {
            "Num": 2,
            "Lower": {
              "Num": 2,
              "Signed": -3,
              "D": 4,
              "sD": -5
            },
            "Higher": {
              "Num": 1,
              "Signed": -2
            }
          }
        },
        {
          "Decimal": {
            "Num": "5",
            "Signed": "-4",
            "Hex": "5",
            "Bin": "101",
            "Laegna": "OI",
            "Wave": "OA"
          },
          "Wave": {
            "Num": "OA",
            "Digits": [
              1,
              2
            ],
            "Hex": "O",
            "Bin": "OAAO"
          },
          "Laegna": {
            "Num": "OI",
            "Digits": [
              1,
              0
            ],
            "Hex": "Q",
            "Bin": "OAOO"
          },
          "Float": {
            "Num": "25%",
            "Value": {
              "Percents": "25.0%",
              "Units": 0.25
            },
            "Signed": {
              "Percents": "-100.0%",
              "Units": -1.0
            }
          },
          "Octave": {
            "Num": 3,
            "Lower": {
              "Num": 3,
              "Signed": -2,
              "D": 5,
              "sD": -4
            },
            "Higher": {
              "Num": 2,
              "Signed": -1
            }
          }
        },
        {
          "Decimal": {
            "Num": "6",
            "Signed": "-3",
            "Hex": "6",
            "Bin": "110",
            "Laegna": "OO",
            "Wave": "OI"
          },
          "Wave": {
            "Num": "OI",
            "Digits": [
              1,
              0
            ],
            "Hex": "Q",
            "Bin": "OAOO"
          },
          "Laegna": {
            "Num": "OO",
            "Digits": [
              1,
              1
            ],
            "Hex": "P",
            "Bin": "OAOA"
          },
          "Float": {
            "Num": "31%",
            "Value": {
              "Percents": "31.25%",
              "Units": 0.3125
            },
            "Signed": {
              "Percents": "-75.0%",
              "Units": -0.75
            }
          },
          "Octave": {
            "Num": 3,
            "Lower": {
              "Num": 3,
              "Signed": -2,
              "D": 6,
              "sD": -3
            },
            "Higher": {
              "Num": 2,
              "Signed": -0.5
            }
          }
        },
        {
          "Decimal": {
            "Num": "7",
            "Signed": "-2",
            "Hex": "7",
            "Bin": "111",
            "Laegna": "OA",
            "Wave": "OE"
          },
          "Wave": {
            "Num": "OE",
            "Digits": [
              1,
              3
            ],
            "Hex": "P",
            "Bin": "OAAA"
          },
          "Laegna": {
            "Num": "OA",
            "Digits": [
              1,
              2
            ],
            "Hex": "O",
            "Bin": "OAAO"
          },
          "Float": {
            "Num": "37%",
            "Value": {
              "Percents": "37.5%",
              "Units": 0.375
            },
            "Signed": {
              "Percents": "-50.0%",
              "Units": -0.5
            }
          },
          "Octave": {
            "Num": 3,
            "Lower": {
              "Num": 3,
              "Signed": -1,
              "D": 7,
              "sD": -2
            },
            "Higher": {
              "Num": 2,
              "Signed": -0.25
            }
          }
        },
        {
          "Decimal": {
            "Num": "8",
            "Signed": "-1",
            "Hex": "8",
            "Bin": "1000",
            "Laegna": "OE",
            "Wave": "OO"
          },
          "Wave": {
            "Num": "OO",
            "Digits": [
              1,
              1
            ],
            "Hex": "P",
            "Bin": "OAOA"
          },
          "Laegna": {
            "Num": "OE",
            "Digits": [
              1,
              3
            ],
            "Hex": "P",
            "Bin": "OAAA"
          },
          "Float": {
            "Num": "43%",
            "Value": {
              "Percents": "43.75%",
              "Units": 0.4375
            },
            "Signed": {
              "Percents": "-25.0%",
              "Units": -0.25
            }
          },
          "Octave": {
            "Num": 3,
            "Lower": {
              "Num": 3,
              "Signed": -0.5,
              "D": 8,
              "sD": -1
            },
            "Higher": {
              "Num": 2,
              "Signed": -0.25
            }
          }
        },
        {
          "Decimal": {
            "Num": 8.5,
            "Signed": "-0",
            "Hex": null,
            "Bin": null,
            "Laegna": "VV",
            "Wave": "VV"
          },
          "Wave": {
            "Num": "VV",
            "Hex": "V",
            "Bin": "VVVV"
          },
          "Laegna": {
            "Num": "VV",
            "Hex": "V",
            "Bin": "VVVV"
          },
          "Float": {
            "Num": "50%",
            "Value": {
              "Percents": "50.0%",
              "Units": 0.5
            },
            "Signed": {
              "Percents": "0.0%",
              "Units": 0.0
            }
          },
          "Octave": {
            "Num": 3,
            "Lower": {
              "Num": 3,
              "Signed": 0,
              "D": 8,
              "sD": 0
            },
            "Higher": {
              "Num": 2,
              "Signed": 0
            }
          }
        },
        {
          "Decimal": {
            "Num": 8.5,
            "Signed": "+0",
            "Hex": null,
            "Bin": null,
            "Laegna": "UU",
            "Wave": "UU"
          },
          "Wave": {
            "Num": "UU",
            "Hex": "U",
            "Bin": "UUUU"
          },
          "Laegna": {
            "Num": "UU",
            "Hex": "U",
            "Bin": "UUUU"
          },
          "Float": {
            "Num": "50%",
            "Value": {
              "Percents": "50.0%",
              "Units": 0.5
            },
            "Signed": {
              "Percents": "0.0%",
              "Units": 0.0
            }
          },
          "Octave": {
            "Num": 4,
            "Lower": {
              "Num": 4,
              "Signed": 0,
              "D": 9,
              "sD": 0
            },
            "Higher": {
              "Num": 2,
              "Signed": 0
            }
          }
        },
        {
          "Decimal": {
            "Num": "9",
            "Signed": "+1",
            "Hex": "9",
            "Bin": "1001",
            "Laegna": "AI",
            "Wave": "AA"
          },
          "Wave": {
            "Num": "AA",
            "Digits": [
              2,
              2
            ],
            "Hex": "A",
            "Bin": "AOAO"
          },
          "Laegna": {
            "Num": "AI",
            "Digits": [
              2,
              0
            ],
            "Hex": "C",
            "Bin": "AOOO"
          },
          "Float": {
            "Num": "56%",
            "Value": {
              "Percents": "56.25%",
              "Units": 0.5625
            },
            "Signed": {
              "Percents": "25.0%",
              "Units": 0.25
            }
          },
          "Octave": {
            "Num": 4,
            "Lower": {
              "Num": 4,
              "Signed": 0.5,
              "D": 9,
              "sD": 1
            },
            "Higher": {
              "Num": 2,
              "Signed": 0.25
            }
          }
        },
        {
          "Decimal": {
            "Num": "10",
            "Signed": "+2",
            "Hex": "A",
            "Bin": "1010",
            "Laegna": "AO",
            "Wave": "AI"
          },
          "Wave": {
            "Num": "AI",
            "Digits": [
              2,
              0
            ],
            "Hex": "C",
            "Bin": "AOOO"
          },
          "Laegna": {
            "Num": "AO",
            "Digits": [
              2,
              1
            ],
            "Hex": "B",
            "Bin": "AOOA"
          },
          "Float": {
            "Num": "62%",
            "Value": {
              "Percents": "62.5%",
              "Units": 0.625
            },
            "Signed": {
              "Percents": "50.0%",
              "Units": 0.5
            }
          },
          "Octave": {
            "Num": 4,
            "Lower": {
              "Num": 4,
              "Signed": 1,
              "D": 10,
              "sD": 2
            },
            "Higher": {
              "Num": 2,
              "Signed": 0.25
            }
          }
        },
        {
          "Decimal": {
            "Num": "11",
            "Signed": "+3",
            "Hex": "B",
            "Bin": "1011",
            "Laegna": "AA",
            "Wave": "AE"
          },
          "Wave": {
            "Num": "AE",
            "Digits": [
              2,
              3
            ],
            "Hex": "B",
            "Bin": "AOAA"
          },
          "Laegna": {
            "Num": "AA",
            "Digits": [
              2,
              2
            ],
            "Hex": "A",
            "Bin": "AOAO"
          },
          "Float": {
            "Num": "68%",
            "Value": {
              "Percents": "68.75%",
              "Units": 0.6875
            },
            "Signed": {
              "Percents": "75.0%",
              "Units": 0.75
            }
          },
          "Octave": {
            "Num": 4,
            "Lower": {
              "Num": 4,
              "Signed": 2,
              "D": 11,
              "sD": 3
            },
            "Higher": {
              "Num": 2,
              "Signed": 0.5
            }
          }
        },
        {
          "Decimal": {
            "Num": "12",
            "Signed": "+4",
            "Hex": "C",
            "Bin": "1100",
            "Laegna": "AE",
            "Wave": "AO"
          },
          "Wave": {
            "Num": "AO",
            "Digits": [
              2,
              1
            ],
            "Hex": "B",
            "Bin": "AOOA"
          },
          "Laegna": {
            "Num": "AE",
            "Digits": [
              2,
              3
            ],
            "Hex": "B",
            "Bin": "AOAA"
          },
          "Float": {
            "Num": "75%",
            "Value": {
              "Percents": "75.0%",
              "Units": 0.75
            },
            "Signed": {
              "Percents": "100.0%",
              "Units": 1.0
            }
          },
          "Octave": {
            "Num": 4,
            "Lower": {
              "Num": 4,
              "Signed": 2,
              "D": 12,
              "sD": 4
            },
            "Higher": {
              "Num": 2,
              "Signed": 1
            }
          }
        },
        {
          "Decimal": {
            "Num": "13",
            "Signed": "+5",
            "Hex": "D",
            "Bin": "1101",
            "Laegna": "EI",
            "Wave": "EI"
          },
          "Wave": {
            "Num": "EI",
            "Digits": [
              3,
              0
            ],
            "Hex": "G",
            "Bin": "AAOO"
          },
          "Laegna": {
            "Num": "EI",
            "Digits": [
              3,
              0
            ],
            "Hex": "G",
            "Bin": "AAOO"
          },
          "Float": {
            "Num": "81%",
            "Value": {
              "Percents": "81.25%",
              "Units": 0.8125
            },
            "Signed": {
              "Percents": "125.0%",
              "Units": 1.25
            }
          },
          "Octave": {
            "Num": 4,
            "Lower": {
              "Num": 4,
              "Signed": 3,
              "D": 13,
              "sD": 5
            },
            "Higher": {
              "Num": 2,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "14",
            "Signed": "+6",
            "Hex": "E",
            "Bin": "1110",
            "Laegna": "EO",
            "Wave": "EO"
          },
          "Wave": {
            "Num": "EO",
            "Digits": [
              3,
              1
            ],
            "Hex": "F",
            "Bin": "AAOA"
          },
          "Laegna": {
            "Num": "EO",
            "Digits": [
              3,
              1
            ],
            "Hex": "F",
            "Bin": "AAOA"
          },
          "Float": {
            "Num": "87%",
            "Value": {
              "Percents": "87.5%",
              "Units": 0.875
            },
            "Signed": {
              "Percents": "150.0%",
              "Units": 1.5
            }
          },
          "Octave": {
            "Num": 4,
            "Lower": {
              "Num": 4,
              "Signed": 3,
              "D": 14,
              "sD": 6
            },
            "Higher": {
              "Num": 2,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "15",
            "Signed": "+7",
            "Hex": "F",
            "Bin": "1111",
            "Laegna": "EA",
            "Wave": "EA"
          },
          "Wave": {
            "Num": "EA",
            "Digits": [
              3,
              2
            ],
            "Hex": "E",
            "Bin": "AAAO"
          },
          "Laegna": {
            "Num": "EA",
            "Digits": [
              3,
              2
            ],
            "Hex": "E",
            "Bin": "AAAO"
          },
          "Float": {
            "Num": "93%",
            "Value": {
              "Percents": "93.75%",
              "Units": 0.9375
            },
            "Signed": {
              "Percents": "175.0%",
              "Units": 1.75
            }
          },
          "Octave": {
            "Num": 4,
            "Lower": {
              "Num": 4,
              "Signed": 3,
              "D": 15,
              "sD": 7
            },
            "Higher": {
              "Num": 2,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "16",
            "Signed": "+8",
            "Hex": "10",
            "Bin": "10000",
            "Laegna": "EE",
            "Wave": "EE"
          },
          "Wave": {
            "Num": "EE",
            "Digits": [
              3,
              3
            ],
            "Hex": "F",
            "Bin": "AAAA"
          },
          "Laegna": {
            "Num": "EE",
            "Digits": [
              3,
              3
            ],
            "Hex": "F",
            "Bin": "AAAA"
          },
          "Float": {
            "Num": "100%",
            "Value": {
              "Percents": "100.0%",
              "Units": 1.0
            },
            "Signed": {
              "Percents": "200.0%",
              "Units": 2.0
            }
          },
          "Octave": {
            "Num": 4,
            "Lower": {
              "Num": 4,
              "Signed": 3,
              "D": 16,
              "sD": 8
            },
            "Higher": {
              "Num": 2,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "2inf",
            "Signed": "+inf",
            "Hex": null,
            "Bin": null,
            "Laegna": "\u2229\u2229",
            "Wave": "\u2229\u2229"
          },
          "Wave": {
            "Num": "\u2229\u2229",
            "Hex": "\u2229",
            "Bin": "\u2229\u2229\u2229\u2229"
          },
          "Laegna": {
            "Num": "\u2229\u2229",
            "Hex": "\u2229",
            "Bin": "\u2229\u2229\u2229\u2229"
          },
          "Float": {
            "Num": "100%",
            "Value": {
              "Percents": "100.0%",
              "Units": 1.0
            },
            "Signed": {
              "Percents": "200.0%",
              "Units": 2.0
            }
          },
          "Octave": {
            "Num": 4,
            "Lower": {
              "Num": 4,
              "Signed": 3,
              "D": 16,
              "sD": 8
            },
            "Higher": {
              "Num": 2,
              "Signed": 2
            }
          }
        }
      ]
    },
    {
      "R": 3,
      "base": 4,
      "Bounds": {
        "bounded": 68,
        "full": 64,
        "half": 32.0
      },
      "numbers": [
        {
          "Decimal": {
            "Num": "0",
            "Signed": "-inf",
            "Hex": "0",
            "Bin": "0",
            "Laegna": "WWW",
            "Wave": "WWW"
          },
          "Wave": {
            "Num": "WWW",
            "Hex": null,
            "Bin": "WWWWWW"
          },
          "Laegna": {
            "Num": "WWW",
            "Hex": null,
            "Bin": "WWWWWW"
          },
          "Float": {
            "Num": "0%",
            "Value": {
              "Percents": "0.0%",
              "Units": 0.0
            },
            "Signed": {
              "Percents": "-200.0%",
              "Units": -2.0
            }
          },
          "Octave": {
            "Num": 0,
            "Lower": {
              "Num": 0,
              "Signed": -5,
              "D": 0,
              "sD": -32
            },
            "Higher": {
              "Num": 0,
              "Signed": -3
            }
          }
        },
        {
          "Decimal": {
            "Num": "1",
            "Signed": "-8",
            "Hex": "1",
            "Bin": "1",
            "Laegna": "III",
            "Wave": "III"
          },
          "Wave": {
            "Num": "III",
            "Digits": [
              0,
              0,
              0
            ],
            "Hex": null,
            "Bin": "OOOOOO"
          },
          "Laegna": {
            "Num": "III",
            "Digits": [
              0,
              0,
              0
            ],
            "Hex": null,
            "Bin": "OOOOOO"
          },
          "Float": {
            "Num": "0%",
            "Value": {
              "Percents": "0.0%",
              "Units": 0.0
            },
            "Signed": {
              "Percents": "-50.0%",
              "Units": -0.5
            }
          },
          "Octave": {
            "Num": 0.5,
            "Lower": {
              "Num": 0.5,
              "Signed": -3,
              "D": 1,
              "sD": -8
            },
            "Higher": {
              "Num": 0.25,
              "Signed": -2
            }
          }
        },
        {
          "Decimal": {
            "Num": "2",
            "Signed": "-7",
            "Hex": "2",
            "Bin": "10",
            "Laegna": "IIO",
            "Wave": "IIO"
          },
          "Wave": {
            "Num": "IIO",
            "Digits": [
              0,
              0,
              1
            ],
            "Hex": null,
            "Bin": "OOOOOA"
          },
          "Laegna": {
            "Num": "IIO",
            "Digits": [
              0,
              0,
              1
            ],
            "Hex": null,
            "Bin": "OOOOOA"
          },
          "Float": {
            "Num": "1%",
            "Value": {
              "Percents": "1.5625%",
              "Units": 0.015625
            },
            "Signed": {
              "Percents": "-43.75%",
              "Units": -0.4375
            }
          },
          "Octave": {
            "Num": 1,
            "Lower": {
              "Num": 1,
              "Signed": -3,
              "D": 2,
              "sD": -7
            },
            "Higher": {
              "Num": 0.25,
              "Signed": -2
            }
          }
        },
        {
          "Decimal": {
            "Num": "3",
            "Signed": "-6",
            "Hex": "3",
            "Bin": "11",
            "Laegna": "IIA",
            "Wave": "IIA"
          },
          "Wave": {
            "Num": "IIA",
            "Digits": [
              0,
              0,
              2
            ],
            "Hex": null,
            "Bin": "OOOOAO"
          },
          "Laegna": {
            "Num": "IIA",
            "Digits": [
              0,
              0,
              2
            ],
            "Hex": null,
            "Bin": "OOOOAO"
          },
          "Float": {
            "Num": "3%",
            "Value": {
              "Percents": "3.125%",
              "Units": 0.03125
            },
            "Signed": {
              "Percents": "-37.5%",
              "Units": -0.375
            }
          },
          "Octave": {
            "Num": 2,
            "Lower": {
              "Num": 2,
              "Signed": -3,
              "D": 3,
              "sD": -6
            },
            "Higher": {
              "Num": 0.5,
              "Signed": -2
            }
          }
        },
        {
          "Decimal": {
            "Num": "4",
            "Signed": "-5",
            "Hex": "4",
            "Bin": "100",
            "Laegna": "IIE",
            "Wave": "IIE"
          },
          "Wave": {
            "Num": "IIE",
            "Digits": [
              0,
              0,
              3
            ],
            "Hex": null,
            "Bin": "OOOOAA"
          },
          "Laegna": {
            "Num": "IIE",
            "Digits": [
              0,
              0,
              3
            ],
            "Hex": null,
            "Bin": "OOOOAA"
          },
          "Float": {
            "Num": "4%",
            "Value": {
              "Percents": "4.6875%",
              "Units": 0.046875
            },
            "Signed": {
              "Percents": "-31.25%",
              "Units": -0.3125
            }
          },
          "Octave": {
            "Num": 2,
            "Lower": {
              "Num": 2,
              "Signed": -3,
              "D": 4,
              "sD": -5
            },
            "Higher": {
              "Num": 1,
              "Signed": -2
            }
          }
        },
        {
          "Decimal": {
            "Num": "5",
            "Signed": "-4",
            "Hex": "5",
            "Bin": "101",
            "Laegna": "IOI",
            "Wave": "IOA"
          },
          "Wave": {
            "Num": "IOA",
            "Digits": [
              0,
              1,
              2
            ],
            "Hex": null,
            "Bin": "OOOAAO"
          },
          "Laegna": {
            "Num": "IOI",
            "Digits": [
              0,
              1,
              0
            ],
            "Hex": null,
            "Bin": "OOOAOO"
          },
          "Float": {
            "Num": "6%",
            "Value": {
              "Percents": "6.25%",
              "Units": 0.0625
            },
            "Signed": {
              "Percents": "-25.0%",
              "Units": -0.25
            }
          },
          "Octave": {
            "Num": 3,
            "Lower": {
              "Num": 3,
              "Signed": -2,
              "D": 5,
              "sD": -4
            },
            "Higher": {
              "Num": 2,
              "Signed": -1
            }
          }
        },
        {
          "Decimal": {
            "Num": "6",
            "Signed": "-3",
            "Hex": "6",
            "Bin": "110",
            "Laegna": "IOO",
            "Wave": "IOI"
          },
          "Wave": {
            "Num": "IOI",
            "Digits": [
              0,
              1,
              0
            ],
            "Hex": null,
            "Bin": "OOOAOO"
          },
          "Laegna": {
            "Num": "IOO",
            "Digits": [
              0,
              1,
              1
            ],
            "Hex": null,
            "Bin": "OOOAOA"
          },
          "Float": {
            "Num": "7%",
            "Value": {
              "Percents": "7.8125%",
              "Units": 0.078125
            },
            "Signed": {
              "Percents": "-18.75%",
              "Units": -0.1875
            }
          },
          "Octave": {
            "Num": 3,
            "Lower": {
              "Num": 3,
              "Signed": -2,
              "D": 6,
              "sD": -3
            },
            "Higher": {
              "Num": 2,
              "Signed": -0.5
            }
          }
        },
        {
          "Decimal": {
            "Num": "7",
            "Signed": "-2",
            "Hex": "7",
            "Bin": "111",
            "Laegna": "IOA",
            "Wave": "IOE"
          },
          "Wave": {
            "Num": "IOE",
            "Digits": [
              0,
              1,
              3
            ],
            "Hex": null,
            "Bin": "OOOAAA"
          },
          "Laegna": {
            "Num": "IOA",
            "Digits": [
              0,
              1,
              2
            ],
            "Hex": null,
            "Bin": "OOOAAO"
          },
          "Float": {
            "Num": "9%",
            "Value": {
              "Percents": "9.375%",
              "Units": 0.09375
            },
            "Signed": {
              "Percents": "-12.5%",
              "Units": -0.125
            }
          },
          "Octave": {
            "Num": 3,
            "Lower": {
              "Num": 3,
              "Signed": -1,
              "D": 7,
              "sD": -2
            },
            "Higher": {
              "Num": 2,
              "Signed": -0.25
            }
          }
        },
        {
          "Decimal": {
            "Num": "8",
            "Signed": "-1",
            "Hex": "8",
            "Bin": "1000",
            "Laegna": "IOE",
            "Wave": "IOO"
          },
          "Wave": {
            "Num": "IOO",
            "Digits": [
              0,
              1,
              1
            ],
            "Hex": null,
            "Bin": "OOOAOA"
          },
          "Laegna": {
            "Num": "IOE",
            "Digits": [
              0,
              1,
              3
            ],
            "Hex": null,
            "Bin": "OOOAAA"
          },
          "Float": {
            "Num": "10%",
            "Value": {
              "Percents": "10.9375%",
              "Units": 0.109375
            },
            "Signed": {
              "Percents": "-6.25%",
              "Units": -0.0625
            }
          },
          "Octave": {
            "Num": 3,
            "Lower": {
              "Num": 3,
              "Signed": -0.5,
              "D": 8,
              "sD": -1
            },
            "Higher": {
              "Num": 2,
              "Signed": -0.25
            }
          }
        },
        {
          "Decimal": {
            "Num": "9",
            "Signed": "0",
            "Hex": "9",
            "Bin": "1001",
            "Laegna": "IAI",
            "Wave": "IAA"
          },
          "Wave": {
            "Num": "IAA",
            "Digits": [
              0,
              2,
              2
            ],
            "Hex": null,
            "Bin": "OOAOAO"
          },
          "Laegna": {
            "Num": "IAI",
            "Digits": [
              0,
              2,
              0
            ],
            "Hex": null,
            "Bin": "OOAOOO"
          },
          "Float": {
            "Num": "12%",
            "Value": {
              "Percents": "12.5%",
              "Units": 0.125
            },
            "Signed": {
              "Percents": "0.0%",
              "Units": 0.0
            }
          },
          "Octave": {
            "Num": 4,
            "Lower": {
              "Num": 4,
              "Signed": 0,
              "D": 9,
              "sD": 0
            },
            "Higher": {
              "Num": 2,
              "Signed": 0
            }
          }
        },
        {
          "Decimal": {
            "Num": "10",
            "Signed": "1",
            "Hex": "A",
            "Bin": "1010",
            "Laegna": "IAO",
            "Wave": "IAI"
          },
          "Wave": {
            "Num": "IAI",
            "Digits": [
              0,
              2,
              0
            ],
            "Hex": null,
            "Bin": "OOAOOO"
          },
          "Laegna": {
            "Num": "IAO",
            "Digits": [
              0,
              2,
              1
            ],
            "Hex": null,
            "Bin": "OOAOOA"
          },
          "Float": {
            "Num": "14%",
            "Value": {
              "Percents": "14.0625%",
              "Units": 0.140625
            },
            "Signed": {
              "Percents": "6.25%",
              "Units": 0.0625
            }
          },
          "Octave": {
            "Num": 4,
            "Lower": {
              "Num": 4,
              "Signed": 0.5,
              "D": 10,
              "sD": 1
            },
            "Higher": {
              "Num": 2,
              "Signed": 0.25
            }
          }
        },
        {
          "Decimal": {
            "Num": "11",
            "Signed": "2",
            "Hex": "B",
            "Bin": "1011",
            "Laegna": "IAA",
            "Wave": "IAE"
          },
          "Wave": {
            "Num": "IAE",
            "Digits": [
              0,
              2,
              3
            ],
            "Hex": null,
            "Bin": "OOAOAA"
          },
          "Laegna": {
            "Num": "IAA",
            "Digits": [
              0,
              2,
              2
            ],
            "Hex": null,
            "Bin": "OOAOAO"
          },
          "Float": {
            "Num": "15%",
            "Value": {
              "Percents": "15.625%",
              "Units": 0.15625
            },
            "Signed": {
              "Percents": "12.5%",
              "Units": 0.125
            }
          },
          "Octave": {
            "Num": 4,
            "Lower": {
              "Num": 4,
              "Signed": 1,
              "D": 11,
              "sD": 2
            },
            "Higher": {
              "Num": 2,
              "Signed": 0.25
            }
          }
        },
        {
          "Decimal": {
            "Num": "12",
            "Signed": "3",
            "Hex": "C",
            "Bin": "1100",
            "Laegna": "IAE",
            "Wave": "IAO"
          },
          "Wave": {
            "Num": "IAO",
            "Digits": [
              0,
              2,
              1
            ],
            "Hex": null,
            "Bin": "OOAOOA"
          },
          "Laegna": {
            "Num": "IAE",
            "Digits": [
              0,
              2,
              3
            ],
            "Hex": null,
            "Bin": "OOAOAA"
          },
          "Float": {
            "Num": "17%",
            "Value": {
              "Percents": "17.1875%",
              "Units": 0.171875
            },
            "Signed": {
              "Percents": "18.75%",
              "Units": 0.1875
            }
          },
          "Octave": {
            "Num": 4,
            "Lower": {
              "Num": 4,
              "Signed": 2,
              "D": 12,
              "sD": 3
            },
            "Higher": {
              "Num": 2,
              "Signed": 0.5
            }
          }
        },
        {
          "Decimal": {
            "Num": "13",
            "Signed": "4",
            "Hex": "D",
            "Bin": "1101",
            "Laegna": "IEI",
            "Wave": "IEI"
          },
          "Wave": {
            "Num": "IEI",
            "Digits": [
              0,
              3,
              0
            ],
            "Hex": null,
            "Bin": "OOAAOO"
          },
          "Laegna": {
            "Num": "IEI",
            "Digits": [
              0,
              3,
              0
            ],
            "Hex": null,
            "Bin": "OOAAOO"
          },
          "Float": {
            "Num": "18%",
            "Value": {
              "Percents": "18.75%",
              "Units": 0.1875
            },
            "Signed": {
              "Percents": "25.0%",
              "Units": 0.25
            }
          },
          "Octave": {
            "Num": 4,
            "Lower": {
              "Num": 4,
              "Signed": 2,
              "D": 13,
              "sD": 4
            },
            "Higher": {
              "Num": 2,
              "Signed": 1
            }
          }
        },
        {
          "Decimal": {
            "Num": "14",
            "Signed": "5",
            "Hex": "E",
            "Bin": "1110",
            "Laegna": "IEO",
            "Wave": "IEO"
          },
          "Wave": {
            "Num": "IEO",
            "Digits": [
              0,
              3,
              1
            ],
            "Hex": null,
            "Bin": "OOAAOA"
          },
          "Laegna": {
            "Num": "IEO",
            "Digits": [
              0,
              3,
              1
            ],
            "Hex": null,
            "Bin": "OOAAOA"
          },
          "Float": {
            "Num": "20%",
            "Value": {
              "Percents": "20.3125%",
              "Units": 0.203125
            },
            "Signed": {
              "Percents": "31.25%",
              "Units": 0.3125
            }
          },
          "Octave": {
            "Num": 4,
            "Lower": {
              "Num": 4,
              "Signed": 3,
              "D": 14,
              "sD": 5
            },
            "Higher": {
              "Num": 2,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "15",
            "Signed": "6",
            "Hex": "F",
            "Bin": "1111",
            "Laegna": "IEA",
            "Wave": "IEA"
          },
          "Wave": {
            "Num": "IEA",
            "Digits": [
              0,
              3,
              2
            ],
            "Hex": null,
            "Bin": "OOAAAO"
          },
          "Laegna": {
            "Num": "IEA",
            "Digits": [
              0,
              3,
              2
            ],
            "Hex": null,
            "Bin": "OOAAAO"
          },
          "Float": {
            "Num": "21%",
            "Value": {
              "Percents": "21.875%",
              "Units": 0.21875
            },
            "Signed": {
              "Percents": "37.5%",
              "Units": 0.375
            }
          },
          "Octave": {
            "Num": 4,
            "Lower": {
              "Num": 4,
              "Signed": 3,
              "D": 15,
              "sD": 6
            },
            "Higher": {
              "Num": 2,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "16",
            "Signed": "7",
            "Hex": "10",
            "Bin": "10000",
            "Laegna": "IEE",
            "Wave": "IEE"
          },
          "Wave": {
            "Num": "IEE",
            "Digits": [
              0,
              3,
              3
            ],
            "Hex": null,
            "Bin": "OOAAAA"
          },
          "Laegna": {
            "Num": "IEE",
            "Digits": [
              0,
              3,
              3
            ],
            "Hex": null,
            "Bin": "OOAAAA"
          },
          "Float": {
            "Num": "23%",
            "Value": {
              "Percents": "23.4375%",
              "Units": 0.234375
            },
            "Signed": {
              "Percents": "43.75%",
              "Units": 0.4375
            }
          },
          "Octave": {
            "Num": 4,
            "Lower": {
              "Num": 4,
              "Signed": 3,
              "D": 16,
              "sD": 7
            },
            "Higher": {
              "Num": 2,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "17",
            "Signed": "8",
            "Hex": "11",
            "Bin": "10001",
            "Laegna": "OII",
            "Wave": "OAA"
          },
          "Wave": {
            "Num": "OAA",
            "Digits": [
              1,
              2,
              2
            ],
            "Hex": null,
            "Bin": "OAAOAO"
          },
          "Laegna": {
            "Num": "OII",
            "Digits": [
              1,
              0,
              0
            ],
            "Hex": null,
            "Bin": "OAOOOO"
          },
          "Float": {
            "Num": "25%",
            "Value": {
              "Percents": "25.0%",
              "Units": 0.25
            },
            "Signed": {
              "Percents": "50.0%",
              "Units": 0.5
            }
          },
          "Octave": {
            "Num": 5,
            "Lower": {
              "Num": 5,
              "Signed": 3,
              "D": 17,
              "sD": 8
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "18",
            "Signed": "9",
            "Hex": "12",
            "Bin": "10010",
            "Laegna": "OIO",
            "Wave": "OAI"
          },
          "Wave": {
            "Num": "OAI",
            "Digits": [
              1,
              2,
              0
            ],
            "Hex": null,
            "Bin": "OAAOOO"
          },
          "Laegna": {
            "Num": "OIO",
            "Digits": [
              1,
              0,
              1
            ],
            "Hex": null,
            "Bin": "OAOOOA"
          },
          "Float": {
            "Num": "26%",
            "Value": {
              "Percents": "26.5625%",
              "Units": 0.265625
            },
            "Signed": {
              "Percents": "56.25%",
              "Units": 0.5625
            }
          },
          "Octave": {
            "Num": 5,
            "Lower": {
              "Num": 5,
              "Signed": 4,
              "D": 18,
              "sD": 9
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "19",
            "Signed": "10",
            "Hex": "13",
            "Bin": "10011",
            "Laegna": "OIA",
            "Wave": "OAE"
          },
          "Wave": {
            "Num": "OAE",
            "Digits": [
              1,
              2,
              3
            ],
            "Hex": null,
            "Bin": "OAAOAA"
          },
          "Laegna": {
            "Num": "OIA",
            "Digits": [
              1,
              0,
              2
            ],
            "Hex": null,
            "Bin": "OAOOAO"
          },
          "Float": {
            "Num": "28%",
            "Value": {
              "Percents": "28.125%",
              "Units": 0.28125
            },
            "Signed": {
              "Percents": "62.5%",
              "Units": 0.625
            }
          },
          "Octave": {
            "Num": 5,
            "Lower": {
              "Num": 5,
              "Signed": 4,
              "D": 19,
              "sD": 10
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "20",
            "Signed": "11",
            "Hex": "14",
            "Bin": "10100",
            "Laegna": "OIE",
            "Wave": "OAO"
          },
          "Wave": {
            "Num": "OAO",
            "Digits": [
              1,
              2,
              1
            ],
            "Hex": null,
            "Bin": "OAAOOA"
          },
          "Laegna": {
            "Num": "OIE",
            "Digits": [
              1,
              0,
              3
            ],
            "Hex": null,
            "Bin": "OAOOAA"
          },
          "Float": {
            "Num": "29%",
            "Value": {
              "Percents": "29.6875%",
              "Units": 0.296875
            },
            "Signed": {
              "Percents": "68.75%",
              "Units": 0.6875
            }
          },
          "Octave": {
            "Num": 5,
            "Lower": {
              "Num": 5,
              "Signed": 4,
              "D": 20,
              "sD": 11
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "21",
            "Signed": "12",
            "Hex": "15",
            "Bin": "10101",
            "Laegna": "OOI",
            "Wave": "OII"
          },
          "Wave": {
            "Num": "OII",
            "Digits": [
              1,
              0,
              0
            ],
            "Hex": null,
            "Bin": "OAOOOO"
          },
          "Laegna": {
            "Num": "OOI",
            "Digits": [
              1,
              1,
              0
            ],
            "Hex": null,
            "Bin": "OAOAOO"
          },
          "Float": {
            "Num": "31%",
            "Value": {
              "Percents": "31.25%",
              "Units": 0.3125
            },
            "Signed": {
              "Percents": "75.0%",
              "Units": 0.75
            }
          },
          "Octave": {
            "Num": 5,
            "Lower": {
              "Num": 5,
              "Signed": 4,
              "D": 21,
              "sD": 12
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "22",
            "Signed": "13",
            "Hex": "16",
            "Bin": "10110",
            "Laegna": "OOO",
            "Wave": "OIO"
          },
          "Wave": {
            "Num": "OIO",
            "Digits": [
              1,
              0,
              1
            ],
            "Hex": null,
            "Bin": "OAOOOA"
          },
          "Laegna": {
            "Num": "OOO",
            "Digits": [
              1,
              1,
              1
            ],
            "Hex": null,
            "Bin": "OAOAOA"
          },
          "Float": {
            "Num": "32%",
            "Value": {
              "Percents": "32.8125%",
              "Units": 0.328125
            },
            "Signed": {
              "Percents": "81.25%",
              "Units": 0.8125
            }
          },
          "Octave": {
            "Num": 5,
            "Lower": {
              "Num": 5,
              "Signed": 4,
              "D": 22,
              "sD": 13
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "23",
            "Signed": "14",
            "Hex": "17",
            "Bin": "10111",
            "Laegna": "OOA",
            "Wave": "OIA"
          },
          "Wave": {
            "Num": "OIA",
            "Digits": [
              1,
              0,
              2
            ],
            "Hex": null,
            "Bin": "OAOOAO"
          },
          "Laegna": {
            "Num": "OOA",
            "Digits": [
              1,
              1,
              2
            ],
            "Hex": null,
            "Bin": "OAOAAO"
          },
          "Float": {
            "Num": "34%",
            "Value": {
              "Percents": "34.375%",
              "Units": 0.34375
            },
            "Signed": {
              "Percents": "87.5%",
              "Units": 0.875
            }
          },
          "Octave": {
            "Num": 5,
            "Lower": {
              "Num": 5,
              "Signed": 4,
              "D": 23,
              "sD": 14
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "24",
            "Signed": "15",
            "Hex": "18",
            "Bin": "11000",
            "Laegna": "OOE",
            "Wave": "OIE"
          },
          "Wave": {
            "Num": "OIE",
            "Digits": [
              1,
              0,
              3
            ],
            "Hex": null,
            "Bin": "OAOOAA"
          },
          "Laegna": {
            "Num": "OOE",
            "Digits": [
              1,
              1,
              3
            ],
            "Hex": null,
            "Bin": "OAOAAA"
          },
          "Float": {
            "Num": "35%",
            "Value": {
              "Percents": "35.9375%",
              "Units": 0.359375
            },
            "Signed": {
              "Percents": "93.75%",
              "Units": 0.9375
            }
          },
          "Octave": {
            "Num": 5,
            "Lower": {
              "Num": 5,
              "Signed": 4,
              "D": 24,
              "sD": 15
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "25",
            "Signed": "16",
            "Hex": "19",
            "Bin": "11001",
            "Laegna": "OAI",
            "Wave": "OEI"
          },
          "Wave": {
            "Num": "OEI",
            "Digits": [
              1,
              3,
              0
            ],
            "Hex": null,
            "Bin": "OAAAOO"
          },
          "Laegna": {
            "Num": "OAI",
            "Digits": [
              1,
              2,
              0
            ],
            "Hex": null,
            "Bin": "OAAOOO"
          },
          "Float": {
            "Num": "37%",
            "Value": {
              "Percents": "37.5%",
              "Units": 0.375
            },
            "Signed": {
              "Percents": "100.0%",
              "Units": 1.0
            }
          },
          "Octave": {
            "Num": 5,
            "Lower": {
              "Num": 5,
              "Signed": 4,
              "D": 25,
              "sD": 16
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "26",
            "Signed": "17",
            "Hex": "1A",
            "Bin": "11010",
            "Laegna": "OAO",
            "Wave": "OEO"
          },
          "Wave": {
            "Num": "OEO",
            "Digits": [
              1,
              3,
              1
            ],
            "Hex": null,
            "Bin": "OAAAOA"
          },
          "Laegna": {
            "Num": "OAO",
            "Digits": [
              1,
              2,
              1
            ],
            "Hex": null,
            "Bin": "OAAOOA"
          },
          "Float": {
            "Num": "39%",
            "Value": {
              "Percents": "39.0625%",
              "Units": 0.390625
            },
            "Signed": {
              "Percents": "106.25%",
              "Units": 1.0625
            }
          },
          "Octave": {
            "Num": 5,
            "Lower": {
              "Num": 5,
              "Signed": 5,
              "D": 26,
              "sD": 17
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "27",
            "Signed": "18",
            "Hex": "1B",
            "Bin": "11011",
            "Laegna": "OAA",
            "Wave": "OEA"
          },
          "Wave": {
            "Num": "OEA",
            "Digits": [
              1,
              3,
              2
            ],
            "Hex": null,
            "Bin": "OAAAAO"
          },
          "Laegna": {
            "Num": "OAA",
            "Digits": [
              1,
              2,
              2
            ],
            "Hex": null,
            "Bin": "OAAOAO"
          },
          "Float": {
            "Num": "40%",
            "Value": {
              "Percents": "40.625%",
              "Units": 0.40625
            },
            "Signed": {
              "Percents": "112.5%",
              "Units": 1.125
            }
          },
          "Octave": {
            "Num": 5,
            "Lower": {
              "Num": 5,
              "Signed": 5,
              "D": 27,
              "sD": 18
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "28",
            "Signed": "19",
            "Hex": "1C",
            "Bin": "11100",
            "Laegna": "OAE",
            "Wave": "OEE"
          },
          "Wave": {
            "Num": "OEE",
            "Digits": [
              1,
              3,
              3
            ],
            "Hex": null,
            "Bin": "OAAAAA"
          },
          "Laegna": {
            "Num": "OAE",
            "Digits": [
              1,
              2,
              3
            ],
            "Hex": null,
            "Bin": "OAAOAA"
          },
          "Float": {
            "Num": "42%",
            "Value": {
              "Percents": "42.1875%",
              "Units": 0.421875
            },
            "Signed": {
              "Percents": "118.75%",
              "Units": 1.1875
            }
          },
          "Octave": {
            "Num": 5,
            "Lower": {
              "Num": 5,
              "Signed": 5,
              "D": 28,
              "sD": 19
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "29",
            "Signed": "20",
            "Hex": "1D",
            "Bin": "11101",
            "Laegna": "OEI",
            "Wave": "OOA"
          },
          "Wave": {
            "Num": "OOA",
            "Digits": [
              1,
              1,
              2
            ],
            "Hex": null,
            "Bin": "OAOAAO"
          },
          "Laegna": {
            "Num": "OEI",
            "Digits": [
              1,
              3,
              0
            ],
            "Hex": null,
            "Bin": "OAAAOO"
          },
          "Float": {
            "Num": "43%",
            "Value": {
              "Percents": "43.75%",
              "Units": 0.4375
            },
            "Signed": {
              "Percents": "125.0%",
              "Units": 1.25
            }
          },
          "Octave": {
            "Num": 5,
            "Lower": {
              "Num": 5,
              "Signed": 5,
              "D": 29,
              "sD": 20
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "30",
            "Signed": "21",
            "Hex": "1E",
            "Bin": "11110",
            "Laegna": "OEO",
            "Wave": "OOI"
          },
          "Wave": {
            "Num": "OOI",
            "Digits": [
              1,
              1,
              0
            ],
            "Hex": null,
            "Bin": "OAOAOO"
          },
          "Laegna": {
            "Num": "OEO",
            "Digits": [
              1,
              3,
              1
            ],
            "Hex": null,
            "Bin": "OAAAOA"
          },
          "Float": {
            "Num": "45%",
            "Value": {
              "Percents": "45.3125%",
              "Units": 0.453125
            },
            "Signed": {
              "Percents": "131.25%",
              "Units": 1.3125
            }
          },
          "Octave": {
            "Num": 5,
            "Lower": {
              "Num": 5,
              "Signed": 5,
              "D": 30,
              "sD": 21
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "31",
            "Signed": "22",
            "Hex": "1F",
            "Bin": "11111",
            "Laegna": "OEA",
            "Wave": "OOE"
          },
          "Wave": {
            "Num": "OOE",
            "Digits": [
              1,
              1,
              3
            ],
            "Hex": null,
            "Bin": "OAOAAA"
          },
          "Laegna": {
            "Num": "OEA",
            "Digits": [
              1,
              3,
              2
            ],
            "Hex": null,
            "Bin": "OAAAAO"
          },
          "Float": {
            "Num": "46%",
            "Value": {
              "Percents": "46.875%",
              "Units": 0.46875
            },
            "Signed": {
              "Percents": "137.5%",
              "Units": 1.375
            }
          },
          "Octave": {
            "Num": 5,
            "Lower": {
              "Num": 5,
              "Signed": 5,
              "D": 31,
              "sD": 22
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "32",
            "Signed": "23",
            "Hex": "20",
            "Bin": "100000",
            "Laegna": "OEE",
            "Wave": "OOO"
          },
          "Wave": {
            "Num": "OOO",
            "Digits": [
              1,
              1,
              1
            ],
            "Hex": null,
            "Bin": "OAOAOA"
          },
          "Laegna": {
            "Num": "OEE",
            "Digits": [
              1,
              3,
              3
            ],
            "Hex": null,
            "Bin": "OAAAAA"
          },
          "Float": {
            "Num": "48%",
            "Value": {
              "Percents": "48.4375%",
              "Units": 0.484375
            },
            "Signed": {
              "Percents": "143.75%",
              "Units": 1.4375
            }
          },
          "Octave": {
            "Num": 5,
            "Lower": {
              "Num": 5,
              "Signed": 5,
              "D": 32,
              "sD": 23
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": 32.5,
            "Signed": "-0",
            "Hex": null,
            "Bin": null,
            "Laegna": "VVV",
            "Wave": "VVV"
          },
          "Wave": {
            "Num": "VVV",
            "Hex": null,
            "Bin": "VVVVVV"
          },
          "Laegna": {
            "Num": "VVV",
            "Hex": null,
            "Bin": "VVVVVV"
          },
          "Float": {
            "Num": "50%",
            "Value": {
              "Percents": "50.0%",
              "Units": 0.5
            },
            "Signed": {
              "Percents": "0.0%",
              "Units": 0.0
            }
          },
          "Octave": {
            "Num": 5,
            "Lower": {
              "Num": 5,
              "Signed": 0,
              "D": 32,
              "sD": 0
            },
            "Higher": {
              "Num": 3,
              "Signed": 0
            }
          }
        },
        {
          "Decimal": {
            "Num": 32.5,
            "Signed": "+0",
            "Hex": null,
            "Bin": null,
            "Laegna": "UUU",
            "Wave": "UUU"
          },
          "Wave": {
            "Num": "UUU",
            "Hex": null,
            "Bin": "UUUUUU"
          },
          "Laegna": {
            "Num": "UUU",
            "Hex": null,
            "Bin": "UUUUUU"
          },
          "Float": {
            "Num": "50%",
            "Value": {
              "Percents": "50.0%",
              "Units": 0.5
            },
            "Signed": {
              "Percents": "0.0%",
              "Units": 0.0
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 0,
              "D": 33,
              "sD": 0
            },
            "Higher": {
              "Num": 3,
              "Signed": 0
            }
          }
        },
        {
          "Decimal": {
            "Num": "33",
            "Signed": "+1",
            "Hex": "21",
            "Bin": "100001",
            "Laegna": "AII",
            "Wave": "AAA"
          },
          "Wave": {
            "Num": "AAA",
            "Digits": [
              2,
              2,
              2
            ],
            "Hex": null,
            "Bin": "AOAOAO"
          },
          "Laegna": {
            "Num": "AII",
            "Digits": [
              2,
              0,
              0
            ],
            "Hex": null,
            "Bin": "AOOOOO"
          },
          "Float": {
            "Num": "51%",
            "Value": {
              "Percents": "51.5625%",
              "Units": 0.515625
            },
            "Signed": {
              "Percents": "6.25%",
              "Units": 0.0625
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 0.5,
              "D": 33,
              "sD": 1
            },
            "Higher": {
              "Num": 3,
              "Signed": 0.25
            }
          }
        },
        {
          "Decimal": {
            "Num": "34",
            "Signed": "+2",
            "Hex": "22",
            "Bin": "100010",
            "Laegna": "AIO",
            "Wave": "AAI"
          },
          "Wave": {
            "Num": "AAI",
            "Digits": [
              2,
              2,
              0
            ],
            "Hex": null,
            "Bin": "AOAOOO"
          },
          "Laegna": {
            "Num": "AIO",
            "Digits": [
              2,
              0,
              1
            ],
            "Hex": null,
            "Bin": "AOOOOA"
          },
          "Float": {
            "Num": "53%",
            "Value": {
              "Percents": "53.125%",
              "Units": 0.53125
            },
            "Signed": {
              "Percents": "12.5%",
              "Units": 0.125
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 1,
              "D": 34,
              "sD": 2
            },
            "Higher": {
              "Num": 3,
              "Signed": 0.25
            }
          }
        },
        {
          "Decimal": {
            "Num": "35",
            "Signed": "+3",
            "Hex": "23",
            "Bin": "100011",
            "Laegna": "AIA",
            "Wave": "AAE"
          },
          "Wave": {
            "Num": "AAE",
            "Digits": [
              2,
              2,
              3
            ],
            "Hex": null,
            "Bin": "AOAOAA"
          },
          "Laegna": {
            "Num": "AIA",
            "Digits": [
              2,
              0,
              2
            ],
            "Hex": null,
            "Bin": "AOOOAO"
          },
          "Float": {
            "Num": "54%",
            "Value": {
              "Percents": "54.6875%",
              "Units": 0.546875
            },
            "Signed": {
              "Percents": "18.75%",
              "Units": 0.1875
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 2,
              "D": 35,
              "sD": 3
            },
            "Higher": {
              "Num": 3,
              "Signed": 0.5
            }
          }
        },
        {
          "Decimal": {
            "Num": "36",
            "Signed": "+4",
            "Hex": "24",
            "Bin": "100100",
            "Laegna": "AIE",
            "Wave": "AAO"
          },
          "Wave": {
            "Num": "AAO",
            "Digits": [
              2,
              2,
              1
            ],
            "Hex": null,
            "Bin": "AOAOOA"
          },
          "Laegna": {
            "Num": "AIE",
            "Digits": [
              2,
              0,
              3
            ],
            "Hex": null,
            "Bin": "AOOOAA"
          },
          "Float": {
            "Num": "56%",
            "Value": {
              "Percents": "56.25%",
              "Units": 0.5625
            },
            "Signed": {
              "Percents": "25.0%",
              "Units": 0.25
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 2,
              "D": 36,
              "sD": 4
            },
            "Higher": {
              "Num": 3,
              "Signed": 1
            }
          }
        },
        {
          "Decimal": {
            "Num": "37",
            "Signed": "+5",
            "Hex": "25",
            "Bin": "100101",
            "Laegna": "AOI",
            "Wave": "AII"
          },
          "Wave": {
            "Num": "AII",
            "Digits": [
              2,
              0,
              0
            ],
            "Hex": null,
            "Bin": "AOOOOO"
          },
          "Laegna": {
            "Num": "AOI",
            "Digits": [
              2,
              1,
              0
            ],
            "Hex": null,
            "Bin": "AOOAOO"
          },
          "Float": {
            "Num": "57%",
            "Value": {
              "Percents": "57.8125%",
              "Units": 0.578125
            },
            "Signed": {
              "Percents": "31.25%",
              "Units": 0.3125
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 3,
              "D": 37,
              "sD": 5
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "38",
            "Signed": "+6",
            "Hex": "26",
            "Bin": "100110",
            "Laegna": "AOO",
            "Wave": "AIO"
          },
          "Wave": {
            "Num": "AIO",
            "Digits": [
              2,
              0,
              1
            ],
            "Hex": null,
            "Bin": "AOOOOA"
          },
          "Laegna": {
            "Num": "AOO",
            "Digits": [
              2,
              1,
              1
            ],
            "Hex": null,
            "Bin": "AOOAOA"
          },
          "Float": {
            "Num": "59%",
            "Value": {
              "Percents": "59.375%",
              "Units": 0.59375
            },
            "Signed": {
              "Percents": "37.5%",
              "Units": 0.375
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 3,
              "D": 38,
              "sD": 6
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "39",
            "Signed": "+7",
            "Hex": "27",
            "Bin": "100111",
            "Laegna": "AOA",
            "Wave": "AIA"
          },
          "Wave": {
            "Num": "AIA",
            "Digits": [
              2,
              0,
              2
            ],
            "Hex": null,
            "Bin": "AOOOAO"
          },
          "Laegna": {
            "Num": "AOA",
            "Digits": [
              2,
              1,
              2
            ],
            "Hex": null,
            "Bin": "AOOAAO"
          },
          "Float": {
            "Num": "60%",
            "Value": {
              "Percents": "60.9375%",
              "Units": 0.609375
            },
            "Signed": {
              "Percents": "43.75%",
              "Units": 0.4375
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 3,
              "D": 39,
              "sD": 7
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "40",
            "Signed": "+8",
            "Hex": "28",
            "Bin": "101000",
            "Laegna": "AOE",
            "Wave": "AIE"
          },
          "Wave": {
            "Num": "AIE",
            "Digits": [
              2,
              0,
              3
            ],
            "Hex": null,
            "Bin": "AOOOAA"
          },
          "Laegna": {
            "Num": "AOE",
            "Digits": [
              2,
              1,
              3
            ],
            "Hex": null,
            "Bin": "AOOAAA"
          },
          "Float": {
            "Num": "62%",
            "Value": {
              "Percents": "62.5%",
              "Units": 0.625
            },
            "Signed": {
              "Percents": "50.0%",
              "Units": 0.5
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 3,
              "D": 40,
              "sD": 8
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "41",
            "Signed": "+9",
            "Hex": "29",
            "Bin": "101001",
            "Laegna": "AAI",
            "Wave": "AEI"
          },
          "Wave": {
            "Num": "AEI",
            "Digits": [
              2,
              3,
              0
            ],
            "Hex": null,
            "Bin": "AOAAOO"
          },
          "Laegna": {
            "Num": "AAI",
            "Digits": [
              2,
              2,
              0
            ],
            "Hex": null,
            "Bin": "AOAOOO"
          },
          "Float": {
            "Num": "64%",
            "Value": {
              "Percents": "64.0625%",
              "Units": 0.640625
            },
            "Signed": {
              "Percents": "56.25%",
              "Units": 0.5625
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 4,
              "D": 41,
              "sD": 9
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "42",
            "Signed": "+10",
            "Hex": "2A",
            "Bin": "101010",
            "Laegna": "AAO",
            "Wave": "AEO"
          },
          "Wave": {
            "Num": "AEO",
            "Digits": [
              2,
              3,
              1
            ],
            "Hex": null,
            "Bin": "AOAAOA"
          },
          "Laegna": {
            "Num": "AAO",
            "Digits": [
              2,
              2,
              1
            ],
            "Hex": null,
            "Bin": "AOAOOA"
          },
          "Float": {
            "Num": "65%",
            "Value": {
              "Percents": "65.625%",
              "Units": 0.65625
            },
            "Signed": {
              "Percents": "62.5%",
              "Units": 0.625
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 4,
              "D": 42,
              "sD": 10
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "43",
            "Signed": "+11",
            "Hex": "2B",
            "Bin": "101011",
            "Laegna": "AAA",
            "Wave": "AEA"
          },
          "Wave": {
            "Num": "AEA",
            "Digits": [
              2,
              3,
              2
            ],
            "Hex": null,
            "Bin": "AOAAAO"
          },
          "Laegna": {
            "Num": "AAA",
            "Digits": [
              2,
              2,
              2
            ],
            "Hex": null,
            "Bin": "AOAOAO"
          },
          "Float": {
            "Num": "67%",
            "Value": {
              "Percents": "67.1875%",
              "Units": 0.671875
            },
            "Signed": {
              "Percents": "68.75%",
              "Units": 0.6875
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 4,
              "D": 43,
              "sD": 11
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "44",
            "Signed": "+12",
            "Hex": "2C",
            "Bin": "101100",
            "Laegna": "AAE",
            "Wave": "AEE"
          },
          "Wave": {
            "Num": "AEE",
            "Digits": [
              2,
              3,
              3
            ],
            "Hex": null,
            "Bin": "AOAAAA"
          },
          "Laegna": {
            "Num": "AAE",
            "Digits": [
              2,
              2,
              3
            ],
            "Hex": null,
            "Bin": "AOAOAA"
          },
          "Float": {
            "Num": "68%",
            "Value": {
              "Percents": "68.75%",
              "Units": 0.6875
            },
            "Signed": {
              "Percents": "75.0%",
              "Units": 0.75
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 4,
              "D": 44,
              "sD": 12
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "45",
            "Signed": "+13",
            "Hex": "2D",
            "Bin": "101101",
            "Laegna": "AEI",
            "Wave": "AOA"
          },
          "Wave": {
            "Num": "AOA",
            "Digits": [
              2,
              1,
              2
            ],
            "Hex": null,
            "Bin": "AOOAAO"
          },
          "Laegna": {
            "Num": "AEI",
            "Digits": [
              2,
              3,
              0
            ],
            "Hex": null,
            "Bin": "AOAAOO"
          },
          "Float": {
            "Num": "70%",
            "Value": {
              "Percents": "70.3125%",
              "Units": 0.703125
            },
            "Signed": {
              "Percents": "81.25%",
              "Units": 0.8125
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 4,
              "D": 45,
              "sD": 13
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "46",
            "Signed": "+14",
            "Hex": "2E",
            "Bin": "101110",
            "Laegna": "AEO",
            "Wave": "AOI"
          },
          "Wave": {
            "Num": "AOI",
            "Digits": [
              2,
              1,
              0
            ],
            "Hex": null,
            "Bin": "AOOAOO"
          },
          "Laegna": {
            "Num": "AEO",
            "Digits": [
              2,
              3,
              1
            ],
            "Hex": null,
            "Bin": "AOAAOA"
          },
          "Float": {
            "Num": "71%",
            "Value": {
              "Percents": "71.875%",
              "Units": 0.71875
            },
            "Signed": {
              "Percents": "87.5%",
              "Units": 0.875
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 4,
              "D": 46,
              "sD": 14
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "47",
            "Signed": "+15",
            "Hex": "2F",
            "Bin": "101111",
            "Laegna": "AEA",
            "Wave": "AOE"
          },
          "Wave": {
            "Num": "AOE",
            "Digits": [
              2,
              1,
              3
            ],
            "Hex": null,
            "Bin": "AOOAAA"
          },
          "Laegna": {
            "Num": "AEA",
            "Digits": [
              2,
              3,
              2
            ],
            "Hex": null,
            "Bin": "AOAAAO"
          },
          "Float": {
            "Num": "73%",
            "Value": {
              "Percents": "73.4375%",
              "Units": 0.734375
            },
            "Signed": {
              "Percents": "93.75%",
              "Units": 0.9375
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 4,
              "D": 47,
              "sD": 15
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "48",
            "Signed": "+16",
            "Hex": "30",
            "Bin": "110000",
            "Laegna": "AEE",
            "Wave": "AOO"
          },
          "Wave": {
            "Num": "AOO",
            "Digits": [
              2,
              1,
              1
            ],
            "Hex": null,
            "Bin": "AOOAOA"
          },
          "Laegna": {
            "Num": "AEE",
            "Digits": [
              2,
              3,
              3
            ],
            "Hex": null,
            "Bin": "AOAAAA"
          },
          "Float": {
            "Num": "75%",
            "Value": {
              "Percents": "75.0%",
              "Units": 0.75
            },
            "Signed": {
              "Percents": "100.0%",
              "Units": 1.0
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 4,
              "D": 48,
              "sD": 16
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "49",
            "Signed": "+17",
            "Hex": "31",
            "Bin": "110001",
            "Laegna": "EII",
            "Wave": "EII"
          },
          "Wave": {
            "Num": "EII",
            "Digits": [
              3,
              0,
              0
            ],
            "Hex": null,
            "Bin": "AAOOOO"
          },
          "Laegna": {
            "Num": "EII",
            "Digits": [
              3,
              0,
              0
            ],
            "Hex": null,
            "Bin": "AAOOOO"
          },
          "Float": {
            "Num": "76%",
            "Value": {
              "Percents": "76.5625%",
              "Units": 0.765625
            },
            "Signed": {
              "Percents": "106.25%",
              "Units": 1.0625
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 5,
              "D": 49,
              "sD": 17
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "50",
            "Signed": "+18",
            "Hex": "32",
            "Bin": "110010",
            "Laegna": "EIO",
            "Wave": "EIO"
          },
          "Wave": {
            "Num": "EIO",
            "Digits": [
              3,
              0,
              1
            ],
            "Hex": null,
            "Bin": "AAOOOA"
          },
          "Laegna": {
            "Num": "EIO",
            "Digits": [
              3,
              0,
              1
            ],
            "Hex": null,
            "Bin": "AAOOOA"
          },
          "Float": {
            "Num": "78%",
            "Value": {
              "Percents": "78.125%",
              "Units": 0.78125
            },
            "Signed": {
              "Percents": "112.5%",
              "Units": 1.125
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 5,
              "D": 50,
              "sD": 18
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "51",
            "Signed": "+19",
            "Hex": "33",
            "Bin": "110011",
            "Laegna": "EIA",
            "Wave": "EIA"
          },
          "Wave": {
            "Num": "EIA",
            "Digits": [
              3,
              0,
              2
            ],
            "Hex": null,
            "Bin": "AAOOAO"
          },
          "Laegna": {
            "Num": "EIA",
            "Digits": [
              3,
              0,
              2
            ],
            "Hex": null,
            "Bin": "AAOOAO"
          },
          "Float": {
            "Num": "79%",
            "Value": {
              "Percents": "79.6875%",
              "Units": 0.796875
            },
            "Signed": {
              "Percents": "118.75%",
              "Units": 1.1875
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 5,
              "D": 51,
              "sD": 19
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "52",
            "Signed": "+20",
            "Hex": "34",
            "Bin": "110100",
            "Laegna": "EIE",
            "Wave": "EIE"
          },
          "Wave": {
            "Num": "EIE",
            "Digits": [
              3,
              0,
              3
            ],
            "Hex": null,
            "Bin": "AAOOAA"
          },
          "Laegna": {
            "Num": "EIE",
            "Digits": [
              3,
              0,
              3
            ],
            "Hex": null,
            "Bin": "AAOOAA"
          },
          "Float": {
            "Num": "81%",
            "Value": {
              "Percents": "81.25%",
              "Units": 0.8125
            },
            "Signed": {
              "Percents": "125.0%",
              "Units": 1.25
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 5,
              "D": 52,
              "sD": 20
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "53",
            "Signed": "+21",
            "Hex": "35",
            "Bin": "110101",
            "Laegna": "EOI",
            "Wave": "EOA"
          },
          "Wave": {
            "Num": "EOA",
            "Digits": [
              3,
              1,
              2
            ],
            "Hex": null,
            "Bin": "AAOAAO"
          },
          "Laegna": {
            "Num": "EOI",
            "Digits": [
              3,
              1,
              0
            ],
            "Hex": null,
            "Bin": "AAOAOO"
          },
          "Float": {
            "Num": "82%",
            "Value": {
              "Percents": "82.8125%",
              "Units": 0.828125
            },
            "Signed": {
              "Percents": "131.25%",
              "Units": 1.3125
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 5,
              "D": 53,
              "sD": 21
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "54",
            "Signed": "+22",
            "Hex": "36",
            "Bin": "110110",
            "Laegna": "EOO",
            "Wave": "EOI"
          },
          "Wave": {
            "Num": "EOI",
            "Digits": [
              3,
              1,
              0
            ],
            "Hex": null,
            "Bin": "AAOAOO"
          },
          "Laegna": {
            "Num": "EOO",
            "Digits": [
              3,
              1,
              1
            ],
            "Hex": null,
            "Bin": "AAOAOA"
          },
          "Float": {
            "Num": "84%",
            "Value": {
              "Percents": "84.375%",
              "Units": 0.84375
            },
            "Signed": {
              "Percents": "137.5%",
              "Units": 1.375
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 5,
              "D": 54,
              "sD": 22
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "55",
            "Signed": "+23",
            "Hex": "37",
            "Bin": "110111",
            "Laegna": "EOA",
            "Wave": "EOE"
          },
          "Wave": {
            "Num": "EOE",
            "Digits": [
              3,
              1,
              3
            ],
            "Hex": null,
            "Bin": "AAOAAA"
          },
          "Laegna": {
            "Num": "EOA",
            "Digits": [
              3,
              1,
              2
            ],
            "Hex": null,
            "Bin": "AAOAAO"
          },
          "Float": {
            "Num": "85%",
            "Value": {
              "Percents": "85.9375%",
              "Units": 0.859375
            },
            "Signed": {
              "Percents": "143.75%",
              "Units": 1.4375
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 5,
              "D": 55,
              "sD": 23
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "56",
            "Signed": "+24",
            "Hex": "38",
            "Bin": "111000",
            "Laegna": "EOE",
            "Wave": "EOO"
          },
          "Wave": {
            "Num": "EOO",
            "Digits": [
              3,
              1,
              1
            ],
            "Hex": null,
            "Bin": "AAOAOA"
          },
          "Laegna": {
            "Num": "EOE",
            "Digits": [
              3,
              1,
              3
            ],
            "Hex": null,
            "Bin": "AAOAAA"
          },
          "Float": {
            "Num": "87%",
            "Value": {
              "Percents": "87.5%",
              "Units": 0.875
            },
            "Signed": {
              "Percents": "150.0%",
              "Units": 1.5
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 5,
              "D": 56,
              "sD": 24
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "57",
            "Signed": "+25",
            "Hex": "39",
            "Bin": "111001",
            "Laegna": "EAI",
            "Wave": "EAA"
          },
          "Wave": {
            "Num": "EAA",
            "Digits": [
              3,
              2,
              2
            ],
            "Hex": null,
            "Bin": "AAAOAO"
          },
          "Laegna": {
            "Num": "EAI",
            "Digits": [
              3,
              2,
              0
            ],
            "Hex": null,
            "Bin": "AAAOOO"
          },
          "Float": {
            "Num": "89%",
            "Value": {
              "Percents": "89.0625%",
              "Units": 0.890625
            },
            "Signed": {
              "Percents": "156.25%",
              "Units": 1.5625
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 5,
              "D": 57,
              "sD": 25
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "58",
            "Signed": "+26",
            "Hex": "3A",
            "Bin": "111010",
            "Laegna": "EAO",
            "Wave": "EAI"
          },
          "Wave": {
            "Num": "EAI",
            "Digits": [
              3,
              2,
              0
            ],
            "Hex": null,
            "Bin": "AAAOOO"
          },
          "Laegna": {
            "Num": "EAO",
            "Digits": [
              3,
              2,
              1
            ],
            "Hex": null,
            "Bin": "AAAOOA"
          },
          "Float": {
            "Num": "90%",
            "Value": {
              "Percents": "90.625%",
              "Units": 0.90625
            },
            "Signed": {
              "Percents": "162.5%",
              "Units": 1.625
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 5,
              "D": 58,
              "sD": 26
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "59",
            "Signed": "+27",
            "Hex": "3B",
            "Bin": "111011",
            "Laegna": "EAA",
            "Wave": "EAE"
          },
          "Wave": {
            "Num": "EAE",
            "Digits": [
              3,
              2,
              3
            ],
            "Hex": null,
            "Bin": "AAAOAA"
          },
          "Laegna": {
            "Num": "EAA",
            "Digits": [
              3,
              2,
              2
            ],
            "Hex": null,
            "Bin": "AAAOAO"
          },
          "Float": {
            "Num": "92%",
            "Value": {
              "Percents": "92.1875%",
              "Units": 0.921875
            },
            "Signed": {
              "Percents": "168.75%",
              "Units": 1.6875
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 5,
              "D": 59,
              "sD": 27
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "60",
            "Signed": "+28",
            "Hex": "3C",
            "Bin": "111100",
            "Laegna": "EAE",
            "Wave": "EAO"
          },
          "Wave": {
            "Num": "EAO",
            "Digits": [
              3,
              2,
              1
            ],
            "Hex": null,
            "Bin": "AAAOOA"
          },
          "Laegna": {
            "Num": "EAE",
            "Digits": [
              3,
              2,
              3
            ],
            "Hex": null,
            "Bin": "AAAOAA"
          },
          "Float": {
            "Num": "93%",
            "Value": {
              "Percents": "93.75%",
              "Units": 0.9375
            },
            "Signed": {
              "Percents": "175.0%",
              "Units": 1.75
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 5,
              "D": 60,
              "sD": 28
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "61",
            "Signed": "+29",
            "Hex": "3D",
            "Bin": "111101",
            "Laegna": "EEI",
            "Wave": "EEI"
          },
          "Wave": {
            "Num": "EEI",
            "Digits": [
              3,
              3,
              0
            ],
            "Hex": null,
            "Bin": "AAAAOO"
          },
          "Laegna": {
            "Num": "EEI",
            "Digits": [
              3,
              3,
              0
            ],
            "Hex": null,
            "Bin": "AAAAOO"
          },
          "Float": {
            "Num": "95%",
            "Value": {
              "Percents": "95.3125%",
              "Units": 0.953125
            },
            "Signed": {
              "Percents": "181.25%",
              "Units": 1.8125
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 5,
              "D": 61,
              "sD": 29
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "62",
            "Signed": "+30",
            "Hex": "3E",
            "Bin": "111110",
            "Laegna": "EEO",
            "Wave": "EEO"
          },
          "Wave": {
            "Num": "EEO",
            "Digits": [
              3,
              3,
              1
            ],
            "Hex": null,
            "Bin": "AAAAOA"
          },
          "Laegna": {
            "Num": "EEO",
            "Digits": [
              3,
              3,
              1
            ],
            "Hex": null,
            "Bin": "AAAAOA"
          },
          "Float": {
            "Num": "96%",
            "Value": {
              "Percents": "96.875%",
              "Units": 0.96875
            },
            "Signed": {
              "Percents": "187.5%",
              "Units": 1.875
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 5,
              "D": 62,
              "sD": 30
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "63",
            "Signed": "+31",
            "Hex": "3F",
            "Bin": "111111",
            "Laegna": "EEA",
            "Wave": "EEA"
          },
          "Wave": {
            "Num": "EEA",
            "Digits": [
              3,
              3,
              2
            ],
            "Hex": null,
            "Bin": "AAAAAO"
          },
          "Laegna": {
            "Num": "EEA",
            "Digits": [
              3,
              3,
              2
            ],
            "Hex": null,
            "Bin": "AAAAAO"
          },
          "Float": {
            "Num": "98%",
            "Value": {
              "Percents": "98.4375%",
              "Units": 0.984375
            },
            "Signed": {
              "Percents": "193.75%",
              "Units": 1.9375
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 5,
              "D": 63,
              "sD": 31
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "64",
            "Signed": "+32",
            "Hex": "40",
            "Bin": "1000000",
            "Laegna": "EEE",
            "Wave": "EEE"
          },
          "Wave": {
            "Num": "EEE",
            "Digits": [
              3,
              3,
              3
            ],
            "Hex": null,
            "Bin": "AAAAAA"
          },
          "Laegna": {
            "Num": "EEE",
            "Digits": [
              3,
              3,
              3
            ],
            "Hex": null,
            "Bin": "AAAAAA"
          },
          "Float": {
            "Num": "100%",
            "Value": {
              "Percents": "100.0%",
              "Units": 1.0
            },
            "Signed": {
              "Percents": "200.0%",
              "Units": 2.0
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 5,
              "D": 64,
              "sD": 32
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "2inf",
            "Signed": "+inf",
            "Hex": null,
            "Bin": null,
            "Laegna": "\u2229\u2229\u2229",
            "Wave": "\u2229\u2229\u2229"
          },
          "Wave": {
            "Num": "\u2229\u2229\u2229",
            "Hex": null,
            "Bin": "\u2229\u2229\u2229\u2229\u2229\u2229"
          },
          "Laegna": {
            "Num": "\u2229\u2229\u2229",
            "Hex": null,
            "Bin": "\u2229\u2229\u2229\u2229\u2229\u2229"
          },
          "Float": {
            "Num": "100%",
            "Value": {
              "Percents": "100.0%",
              "Units": 1.0
            },
            "Signed": {
              "Percents": "200.0%",
              "Units": 2.0
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 5,
              "D": 64,
              "sD": 32
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        }
      ]
    },
    {
      "R": 4,
      "base": 4,
      "Bounds": {
        "bounded": 260,
        "full": 256,
        "half": 128.0
      },
      "numbers": [
        {
          "Decimal": {
            "Num": "0",
            "Signed": "-inf",
            "Hex": "0",
            "Bin": "0",
            "Laegna": "WWWW",
            "Wave": "WWWW"
          },
          "Wave": {
            "Num": "WWWW",
            "Hex": "WW",
            "Bin": "WWWWWWWW"
          },
          "Laegna": {
            "Num": "WWWW",
            "Hex": "WW",
            "Bin": "WWWWWWWW"
          },
          "Float": {
            "Num": "0%",
            "Value": {
              "Percents": "0.0%",
              "Units": 0.0
            },
            "Signed": {
              "Percents": "-200.0%",
              "Units": -2.0
            }
          },
          "Octave": {
            "Num": 0,
            "Lower": {
              "Num": 0,
              "Signed": -7,
              "D": 0,
              "sD": -128
            },
            "Higher": {
              "Num": 0,
              "Signed": -3
            }
          }
        },
        {
          "Decimal": {
            "Num": "1",
            "Signed": "-8",
            "Hex": "1",
            "Bin": "1",
            "Laegna": "IIII",
            "Wave": "IIII"
          },
          "Wave": {
            "Num": "IIII",
            "Digits": [
              0,
              0,
              0,
              0
            ],
            "Hex": "KK",
            "Bin": "OOOOOOOO"
          },
          "Laegna": {
            "Num": "IIII",
            "Digits": [
              0,
              0,
              0,
              0
            ],
            "Hex": "KK",
            "Bin": "OOOOOOOO"
          },
          "Float": {
            "Num": "0%",
            "Value": {
              "Percents": "0.0%",
              "Units": 0.0
            },
            "Signed": {
              "Percents": "-12.5%",
              "Units": -0.125
            }
          },
          "Octave": {
            "Num": 0.5,
            "Lower": {
              "Num": 0.5,
              "Signed": -3,
              "D": 1,
              "sD": -8
            },
            "Higher": {
              "Num": 0.25,
              "Signed": -2
            }
          }
        },
        {
          "Decimal": {
            "Num": "2",
            "Signed": "-7",
            "Hex": "2",
            "Bin": "10",
            "Laegna": "IIIO",
            "Wave": "IIIO"
          },
          "Wave": {
            "Num": "IIIO",
            "Digits": [
              0,
              0,
              0,
              1
            ],
            "Hex": "KJ",
            "Bin": "OOOOOOOA"
          },
          "Laegna": {
            "Num": "IIIO",
            "Digits": [
              0,
              0,
              0,
              1
            ],
            "Hex": "KJ",
            "Bin": "OOOOOOOA"
          },
          "Float": {
            "Num": "0%",
            "Value": {
              "Percents": "0.390625%",
              "Units": 0.00390625
            },
            "Signed": {
              "Percents": "-10.9375%",
              "Units": -0.109375
            }
          },
          "Octave": {
            "Num": 1,
            "Lower": {
              "Num": 1,
              "Signed": -3,
              "D": 2,
              "sD": -7
            },
            "Higher": {
              "Num": 0.25,
              "Signed": -2
            }
          }
        },
        {
          "Decimal": {
            "Num": "3",
            "Signed": "-6",
            "Hex": "3",
            "Bin": "11",
            "Laegna": "IIIA",
            "Wave": "IIIA"
          },
          "Wave": {
            "Num": "IIIA",
            "Digits": [
              0,
              0,
              0,
              2
            ],
            "Hex": "KI",
            "Bin": "OOOOOOAO"
          },
          "Laegna": {
            "Num": "IIIA",
            "Digits": [
              0,
              0,
              0,
              2
            ],
            "Hex": "KI",
            "Bin": "OOOOOOAO"
          },
          "Float": {
            "Num": "0%",
            "Value": {
              "Percents": "0.78125%",
              "Units": 0.0078125
            },
            "Signed": {
              "Percents": "-9.375%",
              "Units": -0.09375
            }
          },
          "Octave": {
            "Num": 2,
            "Lower": {
              "Num": 2,
              "Signed": -3,
              "D": 3,
              "sD": -6
            },
            "Higher": {
              "Num": 0.5,
              "Signed": -2
            }
          }
        },
        {
          "Decimal": {
            "Num": "4",
            "Signed": "-5",
            "Hex": "4",
            "Bin": "100",
            "Laegna": "IIIE",
            "Wave": "IIIE"
          },
          "Wave": {
            "Num": "IIIE",
            "Digits": [
              0,
              0,
              0,
              3
            ],
            "Hex": "KL",
            "Bin": "OOOOOOAA"
          },
          "Laegna": {
            "Num": "IIIE",
            "Digits": [
              0,
              0,
              0,
              3
            ],
            "Hex": "KL",
            "Bin": "OOOOOOAA"
          },
          "Float": {
            "Num": "1%",
            "Value": {
              "Percents": "1.171875%",
              "Units": 0.01171875
            },
            "Signed": {
              "Percents": "-7.8125%",
              "Units": -0.078125
            }
          },
          "Octave": {
            "Num": 2,
            "Lower": {
              "Num": 2,
              "Signed": -3,
              "D": 4,
              "sD": -5
            },
            "Higher": {
              "Num": 1,
              "Signed": -2
            }
          }
        },
        {
          "Decimal": {
            "Num": "5",
            "Signed": "-4",
            "Hex": "5",
            "Bin": "101",
            "Laegna": "IIOI",
            "Wave": "IIOA"
          },
          "Wave": {
            "Num": "IIOA",
            "Digits": [
              0,
              0,
              1,
              2
            ],
            "Hex": "KO",
            "Bin": "OOOOOAAO"
          },
          "Laegna": {
            "Num": "IIOI",
            "Digits": [
              0,
              0,
              1,
              0
            ],
            "Hex": "KQ",
            "Bin": "OOOOOAOO"
          },
          "Float": {
            "Num": "1%",
            "Value": {
              "Percents": "1.5625%",
              "Units": 0.015625
            },
            "Signed": {
              "Percents": "-6.25%",
              "Units": -0.0625
            }
          },
          "Octave": {
            "Num": 3,
            "Lower": {
              "Num": 3,
              "Signed": -2,
              "D": 5,
              "sD": -4
            },
            "Higher": {
              "Num": 2,
              "Signed": -1
            }
          }
        },
        {
          "Decimal": {
            "Num": "6",
            "Signed": "-3",
            "Hex": "6",
            "Bin": "110",
            "Laegna": "IIOO",
            "Wave": "IIOI"
          },
          "Wave": {
            "Num": "IIOI",
            "Digits": [
              0,
              0,
              1,
              0
            ],
            "Hex": "KQ",
            "Bin": "OOOOOAOO"
          },
          "Laegna": {
            "Num": "IIOO",
            "Digits": [
              0,
              0,
              1,
              1
            ],
            "Hex": "KP",
            "Bin": "OOOOOAOA"
          },
          "Float": {
            "Num": "1%",
            "Value": {
              "Percents": "1.953125%",
              "Units": 0.01953125
            },
            "Signed": {
              "Percents": "-4.6875%",
              "Units": -0.046875
            }
          },
          "Octave": {
            "Num": 3,
            "Lower": {
              "Num": 3,
              "Signed": -2,
              "D": 6,
              "sD": -3
            },
            "Higher": {
              "Num": 2,
              "Signed": -0.5
            }
          }
        },
        {
          "Decimal": {
            "Num": "7",
            "Signed": "-2",
            "Hex": "7",
            "Bin": "111",
            "Laegna": "IIOA",
            "Wave": "IIOE"
          },
          "Wave": {
            "Num": "IIOE",
            "Digits": [
              0,
              0,
              1,
              3
            ],
            "Hex": "KP",
            "Bin": "OOOOOAAA"
          },
          "Laegna": {
            "Num": "IIOA",
            "Digits": [
              0,
              0,
              1,
              2
            ],
            "Hex": "KO",
            "Bin": "OOOOOAAO"
          },
          "Float": {
            "Num": "2%",
            "Value": {
              "Percents": "2.34375%",
              "Units": 0.0234375
            },
            "Signed": {
              "Percents": "-3.125%",
              "Units": -0.03125
            }
          },
          "Octave": {
            "Num": 3,
            "Lower": {
              "Num": 3,
              "Signed": -1,
              "D": 7,
              "sD": -2
            },
            "Higher": {
              "Num": 2,
              "Signed": -0.25
            }
          }
        },
        {
          "Decimal": {
            "Num": "8",
            "Signed": "-1",
            "Hex": "8",
            "Bin": "1000",
            "Laegna": "IIOE",
            "Wave": "IIOO"
          },
          "Wave": {
            "Num": "IIOO",
            "Digits": [
              0,
              0,
              1,
              1
            ],
            "Hex": "KP",
            "Bin": "OOOOOAOA"
          },
          "Laegna": {
            "Num": "IIOE",
            "Digits": [
              0,
              0,
              1,
              3
            ],
            "Hex": "KP",
            "Bin": "OOOOOAAA"
          },
          "Float": {
            "Num": "2%",
            "Value": {
              "Percents": "2.734375%",
              "Units": 0.02734375
            },
            "Signed": {
              "Percents": "-1.5625%",
              "Units": -0.015625
            }
          },
          "Octave": {
            "Num": 3,
            "Lower": {
              "Num": 3,
              "Signed": -0.5,
              "D": 8,
              "sD": -1
            },
            "Higher": {
              "Num": 2,
              "Signed": -0.25
            }
          }
        },
        {
          "Decimal": {
            "Num": "9",
            "Signed": "0",
            "Hex": "9",
            "Bin": "1001",
            "Laegna": "IIAI",
            "Wave": "IIAA"
          },
          "Wave": {
            "Num": "IIAA",
            "Digits": [
              0,
              0,
              2,
              2
            ],
            "Hex": "KA",
            "Bin": "OOOOAOAO"
          },
          "Laegna": {
            "Num": "IIAI",
            "Digits": [
              0,
              0,
              2,
              0
            ],
            "Hex": "KC",
            "Bin": "OOOOAOOO"
          },
          "Float": {
            "Num": "3%",
            "Value": {
              "Percents": "3.125%",
              "Units": 0.03125
            },
            "Signed": {
              "Percents": "0.0%",
              "Units": 0.0
            }
          },
          "Octave": {
            "Num": 4,
            "Lower": {
              "Num": 4,
              "Signed": 0,
              "D": 9,
              "sD": 0
            },
            "Higher": {
              "Num": 2,
              "Signed": 0
            }
          }
        },
        {
          "Decimal": {
            "Num": "10",
            "Signed": "1",
            "Hex": "A",
            "Bin": "1010",
            "Laegna": "IIAO",
            "Wave": "IIAI"
          },
          "Wave": {
            "Num": "IIAI",
            "Digits": [
              0,
              0,
              2,
              0
            ],
            "Hex": "KC",
            "Bin": "OOOOAOOO"
          },
          "Laegna": {
            "Num": "IIAO",
            "Digits": [
              0,
              0,
              2,
              1
            ],
            "Hex": "KB",
            "Bin": "OOOOAOOA"
          },
          "Float": {
            "Num": "3%",
            "Value": {
              "Percents": "3.515625%",
              "Units": 0.03515625
            },
            "Signed": {
              "Percents": "1.5625%",
              "Units": 0.015625
            }
          },
          "Octave": {
            "Num": 4,
            "Lower": {
              "Num": 4,
              "Signed": 0.5,
              "D": 10,
              "sD": 1
            },
            "Higher": {
              "Num": 2,
              "Signed": 0.25
            }
          }
        },
        {
          "Decimal": {
            "Num": "11",
            "Signed": "2",
            "Hex": "B",
            "Bin": "1011",
            "Laegna": "IIAA",
            "Wave": "IIAE"
          },
          "Wave": {
            "Num": "IIAE",
            "Digits": [
              0,
              0,
              2,
              3
            ],
            "Hex": "KB",
            "Bin": "OOOOAOAA"
          },
          "Laegna": {
            "Num": "IIAA",
            "Digits": [
              0,
              0,
              2,
              2
            ],
            "Hex": "KA",
            "Bin": "OOOOAOAO"
          },
          "Float": {
            "Num": "3%",
            "Value": {
              "Percents": "3.90625%",
              "Units": 0.0390625
            },
            "Signed": {
              "Percents": "3.125%",
              "Units": 0.03125
            }
          },
          "Octave": {
            "Num": 4,
            "Lower": {
              "Num": 4,
              "Signed": 1,
              "D": 11,
              "sD": 2
            },
            "Higher": {
              "Num": 2,
              "Signed": 0.25
            }
          }
        },
        {
          "Decimal": {
            "Num": "12",
            "Signed": "3",
            "Hex": "C",
            "Bin": "1100",
            "Laegna": "IIAE",
            "Wave": "IIAO"
          },
          "Wave": {
            "Num": "IIAO",
            "Digits": [
              0,
              0,
              2,
              1
            ],
            "Hex": "KB",
            "Bin": "OOOOAOOA"
          },
          "Laegna": {
            "Num": "IIAE",
            "Digits": [
              0,
              0,
              2,
              3
            ],
            "Hex": "KB",
            "Bin": "OOOOAOAA"
          },
          "Float": {
            "Num": "4%",
            "Value": {
              "Percents": "4.296875%",
              "Units": 0.04296875
            },
            "Signed": {
              "Percents": "4.6875%",
              "Units": 0.046875
            }
          },
          "Octave": {
            "Num": 4,
            "Lower": {
              "Num": 4,
              "Signed": 2,
              "D": 12,
              "sD": 3
            },
            "Higher": {
              "Num": 2,
              "Signed": 0.5
            }
          }
        },
        {
          "Decimal": {
            "Num": "13",
            "Signed": "4",
            "Hex": "D",
            "Bin": "1101",
            "Laegna": "IIEI",
            "Wave": "IIEI"
          },
          "Wave": {
            "Num": "IIEI",
            "Digits": [
              0,
              0,
              3,
              0
            ],
            "Hex": "KG",
            "Bin": "OOOOAAOO"
          },
          "Laegna": {
            "Num": "IIEI",
            "Digits": [
              0,
              0,
              3,
              0
            ],
            "Hex": "KG",
            "Bin": "OOOOAAOO"
          },
          "Float": {
            "Num": "4%",
            "Value": {
              "Percents": "4.6875%",
              "Units": 0.046875
            },
            "Signed": {
              "Percents": "6.25%",
              "Units": 0.0625
            }
          },
          "Octave": {
            "Num": 4,
            "Lower": {
              "Num": 4,
              "Signed": 2,
              "D": 13,
              "sD": 4
            },
            "Higher": {
              "Num": 2,
              "Signed": 1
            }
          }
        },
        {
          "Decimal": {
            "Num": "14",
            "Signed": "5",
            "Hex": "E",
            "Bin": "1110",
            "Laegna": "IIEO",
            "Wave": "IIEO"
          },
          "Wave": {
            "Num": "IIEO",
            "Digits": [
              0,
              0,
              3,
              1
            ],
            "Hex": "KF",
            "Bin": "OOOOAAOA"
          },
          "Laegna": {
            "Num": "IIEO",
            "Digits": [
              0,
              0,
              3,
              1
            ],
            "Hex": "KF",
            "Bin": "OOOOAAOA"
          },
          "Float": {
            "Num": "5%",
            "Value": {
              "Percents": "5.078125%",
              "Units": 0.05078125
            },
            "Signed": {
              "Percents": "7.8125%",
              "Units": 0.078125
            }
          },
          "Octave": {
            "Num": 4,
            "Lower": {
              "Num": 4,
              "Signed": 3,
              "D": 14,
              "sD": 5
            },
            "Higher": {
              "Num": 2,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "15",
            "Signed": "6",
            "Hex": "F",
            "Bin": "1111",
            "Laegna": "IIEA",
            "Wave": "IIEA"
          },
          "Wave": {
            "Num": "IIEA",
            "Digits": [
              0,
              0,
              3,
              2
            ],
            "Hex": "KE",
            "Bin": "OOOOAAAO"
          },
          "Laegna": {
            "Num": "IIEA",
            "Digits": [
              0,
              0,
              3,
              2
            ],
            "Hex": "KE",
            "Bin": "OOOOAAAO"
          },
          "Float": {
            "Num": "5%",
            "Value": {
              "Percents": "5.46875%",
              "Units": 0.0546875
            },
            "Signed": {
              "Percents": "9.375%",
              "Units": 0.09375
            }
          },
          "Octave": {
            "Num": 4,
            "Lower": {
              "Num": 4,
              "Signed": 3,
              "D": 15,
              "sD": 6
            },
            "Higher": {
              "Num": 2,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "16",
            "Signed": "7",
            "Hex": "10",
            "Bin": "10000",
            "Laegna": "IIEE",
            "Wave": "IIEE"
          },
          "Wave": {
            "Num": "IIEE",
            "Digits": [
              0,
              0,
              3,
              3
            ],
            "Hex": "KF",
            "Bin": "OOOOAAAA"
          },
          "Laegna": {
            "Num": "IIEE",
            "Digits": [
              0,
              0,
              3,
              3
            ],
            "Hex": "KF",
            "Bin": "OOOOAAAA"
          },
          "Float": {
            "Num": "5%",
            "Value": {
              "Percents": "5.859375%",
              "Units": 0.05859375
            },
            "Signed": {
              "Percents": "10.9375%",
              "Units": 0.109375
            }
          },
          "Octave": {
            "Num": 4,
            "Lower": {
              "Num": 4,
              "Signed": 3,
              "D": 16,
              "sD": 7
            },
            "Higher": {
              "Num": 2,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "17",
            "Signed": "8",
            "Hex": "11",
            "Bin": "10001",
            "Laegna": "IOII",
            "Wave": "IOAA"
          },
          "Wave": {
            "Num": "IOAA",
            "Digits": [
              0,
              1,
              2,
              2
            ],
            "Hex": "JA",
            "Bin": "OOOAAOAO"
          },
          "Laegna": {
            "Num": "IOII",
            "Digits": [
              0,
              1,
              0,
              0
            ],
            "Hex": "JK",
            "Bin": "OOOAOOOO"
          },
          "Float": {
            "Num": "6%",
            "Value": {
              "Percents": "6.25%",
              "Units": 0.0625
            },
            "Signed": {
              "Percents": "12.5%",
              "Units": 0.125
            }
          },
          "Octave": {
            "Num": 5,
            "Lower": {
              "Num": 5,
              "Signed": 3,
              "D": 17,
              "sD": 8
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "18",
            "Signed": "9",
            "Hex": "12",
            "Bin": "10010",
            "Laegna": "IOIO",
            "Wave": "IOAI"
          },
          "Wave": {
            "Num": "IOAI",
            "Digits": [
              0,
              1,
              2,
              0
            ],
            "Hex": "JC",
            "Bin": "OOOAAOOO"
          },
          "Laegna": {
            "Num": "IOIO",
            "Digits": [
              0,
              1,
              0,
              1
            ],
            "Hex": "JJ",
            "Bin": "OOOAOOOA"
          },
          "Float": {
            "Num": "6%",
            "Value": {
              "Percents": "6.640625%",
              "Units": 0.06640625
            },
            "Signed": {
              "Percents": "14.0625%",
              "Units": 0.140625
            }
          },
          "Octave": {
            "Num": 5,
            "Lower": {
              "Num": 5,
              "Signed": 4,
              "D": 18,
              "sD": 9
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "19",
            "Signed": "10",
            "Hex": "13",
            "Bin": "10011",
            "Laegna": "IOIA",
            "Wave": "IOAE"
          },
          "Wave": {
            "Num": "IOAE",
            "Digits": [
              0,
              1,
              2,
              3
            ],
            "Hex": "JB",
            "Bin": "OOOAAOAA"
          },
          "Laegna": {
            "Num": "IOIA",
            "Digits": [
              0,
              1,
              0,
              2
            ],
            "Hex": "JI",
            "Bin": "OOOAOOAO"
          },
          "Float": {
            "Num": "7%",
            "Value": {
              "Percents": "7.03125%",
              "Units": 0.0703125
            },
            "Signed": {
              "Percents": "15.625%",
              "Units": 0.15625
            }
          },
          "Octave": {
            "Num": 5,
            "Lower": {
              "Num": 5,
              "Signed": 4,
              "D": 19,
              "sD": 10
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "20",
            "Signed": "11",
            "Hex": "14",
            "Bin": "10100",
            "Laegna": "IOIE",
            "Wave": "IOAO"
          },
          "Wave": {
            "Num": "IOAO",
            "Digits": [
              0,
              1,
              2,
              1
            ],
            "Hex": "JB",
            "Bin": "OOOAAOOA"
          },
          "Laegna": {
            "Num": "IOIE",
            "Digits": [
              0,
              1,
              0,
              3
            ],
            "Hex": "JL",
            "Bin": "OOOAOOAA"
          },
          "Float": {
            "Num": "7%",
            "Value": {
              "Percents": "7.421875%",
              "Units": 0.07421875
            },
            "Signed": {
              "Percents": "17.1875%",
              "Units": 0.171875
            }
          },
          "Octave": {
            "Num": 5,
            "Lower": {
              "Num": 5,
              "Signed": 4,
              "D": 20,
              "sD": 11
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "21",
            "Signed": "12",
            "Hex": "15",
            "Bin": "10101",
            "Laegna": "IOOI",
            "Wave": "IOII"
          },
          "Wave": {
            "Num": "IOII",
            "Digits": [
              0,
              1,
              0,
              0
            ],
            "Hex": "JK",
            "Bin": "OOOAOOOO"
          },
          "Laegna": {
            "Num": "IOOI",
            "Digits": [
              0,
              1,
              1,
              0
            ],
            "Hex": "JQ",
            "Bin": "OOOAOAOO"
          },
          "Float": {
            "Num": "7%",
            "Value": {
              "Percents": "7.8125%",
              "Units": 0.078125
            },
            "Signed": {
              "Percents": "18.75%",
              "Units": 0.1875
            }
          },
          "Octave": {
            "Num": 5,
            "Lower": {
              "Num": 5,
              "Signed": 4,
              "D": 21,
              "sD": 12
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "22",
            "Signed": "13",
            "Hex": "16",
            "Bin": "10110",
            "Laegna": "IOOO",
            "Wave": "IOIO"
          },
          "Wave": {
            "Num": "IOIO",
            "Digits": [
              0,
              1,
              0,
              1
            ],
            "Hex": "JJ",
            "Bin": "OOOAOOOA"
          },
          "Laegna": {
            "Num": "IOOO",
            "Digits": [
              0,
              1,
              1,
              1
            ],
            "Hex": "JP",
            "Bin": "OOOAOAOA"
          },
          "Float": {
            "Num": "8%",
            "Value": {
              "Percents": "8.203125%",
              "Units": 0.08203125
            },
            "Signed": {
              "Percents": "20.3125%",
              "Units": 0.203125
            }
          },
          "Octave": {
            "Num": 5,
            "Lower": {
              "Num": 5,
              "Signed": 4,
              "D": 22,
              "sD": 13
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "23",
            "Signed": "14",
            "Hex": "17",
            "Bin": "10111",
            "Laegna": "IOOA",
            "Wave": "IOIA"
          },
          "Wave": {
            "Num": "IOIA",
            "Digits": [
              0,
              1,
              0,
              2
            ],
            "Hex": "JI",
            "Bin": "OOOAOOAO"
          },
          "Laegna": {
            "Num": "IOOA",
            "Digits": [
              0,
              1,
              1,
              2
            ],
            "Hex": "JO",
            "Bin": "OOOAOAAO"
          },
          "Float": {
            "Num": "8%",
            "Value": {
              "Percents": "8.59375%",
              "Units": 0.0859375
            },
            "Signed": {
              "Percents": "21.875%",
              "Units": 0.21875
            }
          },
          "Octave": {
            "Num": 5,
            "Lower": {
              "Num": 5,
              "Signed": 4,
              "D": 23,
              "sD": 14
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "24",
            "Signed": "15",
            "Hex": "18",
            "Bin": "11000",
            "Laegna": "IOOE",
            "Wave": "IOIE"
          },
          "Wave": {
            "Num": "IOIE",
            "Digits": [
              0,
              1,
              0,
              3
            ],
            "Hex": "JL",
            "Bin": "OOOAOOAA"
          },
          "Laegna": {
            "Num": "IOOE",
            "Digits": [
              0,
              1,
              1,
              3
            ],
            "Hex": "JP",
            "Bin": "OOOAOAAA"
          },
          "Float": {
            "Num": "8%",
            "Value": {
              "Percents": "8.984375%",
              "Units": 0.08984375
            },
            "Signed": {
              "Percents": "23.4375%",
              "Units": 0.234375
            }
          },
          "Octave": {
            "Num": 5,
            "Lower": {
              "Num": 5,
              "Signed": 4,
              "D": 24,
              "sD": 15
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "25",
            "Signed": "16",
            "Hex": "19",
            "Bin": "11001",
            "Laegna": "IOAI",
            "Wave": "IOEI"
          },
          "Wave": {
            "Num": "IOEI",
            "Digits": [
              0,
              1,
              3,
              0
            ],
            "Hex": "JG",
            "Bin": "OOOAAAOO"
          },
          "Laegna": {
            "Num": "IOAI",
            "Digits": [
              0,
              1,
              2,
              0
            ],
            "Hex": "JC",
            "Bin": "OOOAAOOO"
          },
          "Float": {
            "Num": "9%",
            "Value": {
              "Percents": "9.375%",
              "Units": 0.09375
            },
            "Signed": {
              "Percents": "25.0%",
              "Units": 0.25
            }
          },
          "Octave": {
            "Num": 5,
            "Lower": {
              "Num": 5,
              "Signed": 4,
              "D": 25,
              "sD": 16
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "26",
            "Signed": "17",
            "Hex": "1A",
            "Bin": "11010",
            "Laegna": "IOAO",
            "Wave": "IOEO"
          },
          "Wave": {
            "Num": "IOEO",
            "Digits": [
              0,
              1,
              3,
              1
            ],
            "Hex": "JF",
            "Bin": "OOOAAAOA"
          },
          "Laegna": {
            "Num": "IOAO",
            "Digits": [
              0,
              1,
              2,
              1
            ],
            "Hex": "JB",
            "Bin": "OOOAAOOA"
          },
          "Float": {
            "Num": "9%",
            "Value": {
              "Percents": "9.765625%",
              "Units": 0.09765625
            },
            "Signed": {
              "Percents": "26.5625%",
              "Units": 0.265625
            }
          },
          "Octave": {
            "Num": 5,
            "Lower": {
              "Num": 5,
              "Signed": 5,
              "D": 26,
              "sD": 17
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "27",
            "Signed": "18",
            "Hex": "1B",
            "Bin": "11011",
            "Laegna": "IOAA",
            "Wave": "IOEA"
          },
          "Wave": {
            "Num": "IOEA",
            "Digits": [
              0,
              1,
              3,
              2
            ],
            "Hex": "JE",
            "Bin": "OOOAAAAO"
          },
          "Laegna": {
            "Num": "IOAA",
            "Digits": [
              0,
              1,
              2,
              2
            ],
            "Hex": "JA",
            "Bin": "OOOAAOAO"
          },
          "Float": {
            "Num": "10%",
            "Value": {
              "Percents": "10.15625%",
              "Units": 0.1015625
            },
            "Signed": {
              "Percents": "28.125%",
              "Units": 0.28125
            }
          },
          "Octave": {
            "Num": 5,
            "Lower": {
              "Num": 5,
              "Signed": 5,
              "D": 27,
              "sD": 18
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "28",
            "Signed": "19",
            "Hex": "1C",
            "Bin": "11100",
            "Laegna": "IOAE",
            "Wave": "IOEE"
          },
          "Wave": {
            "Num": "IOEE",
            "Digits": [
              0,
              1,
              3,
              3
            ],
            "Hex": "JF",
            "Bin": "OOOAAAAA"
          },
          "Laegna": {
            "Num": "IOAE",
            "Digits": [
              0,
              1,
              2,
              3
            ],
            "Hex": "JB",
            "Bin": "OOOAAOAA"
          },
          "Float": {
            "Num": "10%",
            "Value": {
              "Percents": "10.546875%",
              "Units": 0.10546875
            },
            "Signed": {
              "Percents": "29.6875%",
              "Units": 0.296875
            }
          },
          "Octave": {
            "Num": 5,
            "Lower": {
              "Num": 5,
              "Signed": 5,
              "D": 28,
              "sD": 19
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "29",
            "Signed": "20",
            "Hex": "1D",
            "Bin": "11101",
            "Laegna": "IOEI",
            "Wave": "IOOA"
          },
          "Wave": {
            "Num": "IOOA",
            "Digits": [
              0,
              1,
              1,
              2
            ],
            "Hex": "JO",
            "Bin": "OOOAOAAO"
          },
          "Laegna": {
            "Num": "IOEI",
            "Digits": [
              0,
              1,
              3,
              0
            ],
            "Hex": "JG",
            "Bin": "OOOAAAOO"
          },
          "Float": {
            "Num": "10%",
            "Value": {
              "Percents": "10.9375%",
              "Units": 0.109375
            },
            "Signed": {
              "Percents": "31.25%",
              "Units": 0.3125
            }
          },
          "Octave": {
            "Num": 5,
            "Lower": {
              "Num": 5,
              "Signed": 5,
              "D": 29,
              "sD": 20
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "30",
            "Signed": "21",
            "Hex": "1E",
            "Bin": "11110",
            "Laegna": "IOEO",
            "Wave": "IOOI"
          },
          "Wave": {
            "Num": "IOOI",
            "Digits": [
              0,
              1,
              1,
              0
            ],
            "Hex": "JQ",
            "Bin": "OOOAOAOO"
          },
          "Laegna": {
            "Num": "IOEO",
            "Digits": [
              0,
              1,
              3,
              1
            ],
            "Hex": "JF",
            "Bin": "OOOAAAOA"
          },
          "Float": {
            "Num": "11%",
            "Value": {
              "Percents": "11.328125%",
              "Units": 0.11328125
            },
            "Signed": {
              "Percents": "32.8125%",
              "Units": 0.328125
            }
          },
          "Octave": {
            "Num": 5,
            "Lower": {
              "Num": 5,
              "Signed": 5,
              "D": 30,
              "sD": 21
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "31",
            "Signed": "22",
            "Hex": "1F",
            "Bin": "11111",
            "Laegna": "IOEA",
            "Wave": "IOOE"
          },
          "Wave": {
            "Num": "IOOE",
            "Digits": [
              0,
              1,
              1,
              3
            ],
            "Hex": "JP",
            "Bin": "OOOAOAAA"
          },
          "Laegna": {
            "Num": "IOEA",
            "Digits": [
              0,
              1,
              3,
              2
            ],
            "Hex": "JE",
            "Bin": "OOOAAAAO"
          },
          "Float": {
            "Num": "11%",
            "Value": {
              "Percents": "11.71875%",
              "Units": 0.1171875
            },
            "Signed": {
              "Percents": "34.375%",
              "Units": 0.34375
            }
          },
          "Octave": {
            "Num": 5,
            "Lower": {
              "Num": 5,
              "Signed": 5,
              "D": 31,
              "sD": 22
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "32",
            "Signed": "23",
            "Hex": "20",
            "Bin": "100000",
            "Laegna": "IOEE",
            "Wave": "IOOO"
          },
          "Wave": {
            "Num": "IOOO",
            "Digits": [
              0,
              1,
              1,
              1
            ],
            "Hex": "JP",
            "Bin": "OOOAOAOA"
          },
          "Laegna": {
            "Num": "IOEE",
            "Digits": [
              0,
              1,
              3,
              3
            ],
            "Hex": "JF",
            "Bin": "OOOAAAAA"
          },
          "Float": {
            "Num": "12%",
            "Value": {
              "Percents": "12.109375%",
              "Units": 0.12109375
            },
            "Signed": {
              "Percents": "35.9375%",
              "Units": 0.359375
            }
          },
          "Octave": {
            "Num": 5,
            "Lower": {
              "Num": 5,
              "Signed": 5,
              "D": 32,
              "sD": 23
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "33",
            "Signed": "24",
            "Hex": "21",
            "Bin": "100001",
            "Laegna": "IAII",
            "Wave": "IAAA"
          },
          "Wave": {
            "Num": "IAAA",
            "Digits": [
              0,
              2,
              2,
              2
            ],
            "Hex": "IA",
            "Bin": "OOAOAOAO"
          },
          "Laegna": {
            "Num": "IAII",
            "Digits": [
              0,
              2,
              0,
              0
            ],
            "Hex": "IK",
            "Bin": "OOAOOOOO"
          },
          "Float": {
            "Num": "12%",
            "Value": {
              "Percents": "12.5%",
              "Units": 0.125
            },
            "Signed": {
              "Percents": "37.5%",
              "Units": 0.375
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 5,
              "D": 33,
              "sD": 24
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "34",
            "Signed": "25",
            "Hex": "22",
            "Bin": "100010",
            "Laegna": "IAIO",
            "Wave": "IAAI"
          },
          "Wave": {
            "Num": "IAAI",
            "Digits": [
              0,
              2,
              2,
              0
            ],
            "Hex": "IC",
            "Bin": "OOAOAOOO"
          },
          "Laegna": {
            "Num": "IAIO",
            "Digits": [
              0,
              2,
              0,
              1
            ],
            "Hex": "IJ",
            "Bin": "OOAOOOOA"
          },
          "Float": {
            "Num": "12%",
            "Value": {
              "Percents": "12.890625%",
              "Units": 0.12890625
            },
            "Signed": {
              "Percents": "39.0625%",
              "Units": 0.390625
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 5,
              "D": 34,
              "sD": 25
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "35",
            "Signed": "26",
            "Hex": "23",
            "Bin": "100011",
            "Laegna": "IAIA",
            "Wave": "IAAE"
          },
          "Wave": {
            "Num": "IAAE",
            "Digits": [
              0,
              2,
              2,
              3
            ],
            "Hex": "IB",
            "Bin": "OOAOAOAA"
          },
          "Laegna": {
            "Num": "IAIA",
            "Digits": [
              0,
              2,
              0,
              2
            ],
            "Hex": "II",
            "Bin": "OOAOOOAO"
          },
          "Float": {
            "Num": "13%",
            "Value": {
              "Percents": "13.28125%",
              "Units": 0.1328125
            },
            "Signed": {
              "Percents": "40.625%",
              "Units": 0.40625
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 5,
              "D": 35,
              "sD": 26
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "36",
            "Signed": "27",
            "Hex": "24",
            "Bin": "100100",
            "Laegna": "IAIE",
            "Wave": "IAAO"
          },
          "Wave": {
            "Num": "IAAO",
            "Digits": [
              0,
              2,
              2,
              1
            ],
            "Hex": "IB",
            "Bin": "OOAOAOOA"
          },
          "Laegna": {
            "Num": "IAIE",
            "Digits": [
              0,
              2,
              0,
              3
            ],
            "Hex": "IL",
            "Bin": "OOAOOOAA"
          },
          "Float": {
            "Num": "13%",
            "Value": {
              "Percents": "13.671875%",
              "Units": 0.13671875
            },
            "Signed": {
              "Percents": "42.1875%",
              "Units": 0.421875
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 5,
              "D": 36,
              "sD": 27
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "37",
            "Signed": "28",
            "Hex": "25",
            "Bin": "100101",
            "Laegna": "IAOI",
            "Wave": "IAII"
          },
          "Wave": {
            "Num": "IAII",
            "Digits": [
              0,
              2,
              0,
              0
            ],
            "Hex": "IK",
            "Bin": "OOAOOOOO"
          },
          "Laegna": {
            "Num": "IAOI",
            "Digits": [
              0,
              2,
              1,
              0
            ],
            "Hex": "IQ",
            "Bin": "OOAOOAOO"
          },
          "Float": {
            "Num": "14%",
            "Value": {
              "Percents": "14.0625%",
              "Units": 0.140625
            },
            "Signed": {
              "Percents": "43.75%",
              "Units": 0.4375
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 5,
              "D": 37,
              "sD": 28
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "38",
            "Signed": "29",
            "Hex": "26",
            "Bin": "100110",
            "Laegna": "IAOO",
            "Wave": "IAIO"
          },
          "Wave": {
            "Num": "IAIO",
            "Digits": [
              0,
              2,
              0,
              1
            ],
            "Hex": "IJ",
            "Bin": "OOAOOOOA"
          },
          "Laegna": {
            "Num": "IAOO",
            "Digits": [
              0,
              2,
              1,
              1
            ],
            "Hex": "IP",
            "Bin": "OOAOOAOA"
          },
          "Float": {
            "Num": "14%",
            "Value": {
              "Percents": "14.453125%",
              "Units": 0.14453125
            },
            "Signed": {
              "Percents": "45.3125%",
              "Units": 0.453125
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 5,
              "D": 38,
              "sD": 29
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "39",
            "Signed": "30",
            "Hex": "27",
            "Bin": "100111",
            "Laegna": "IAOA",
            "Wave": "IAIA"
          },
          "Wave": {
            "Num": "IAIA",
            "Digits": [
              0,
              2,
              0,
              2
            ],
            "Hex": "II",
            "Bin": "OOAOOOAO"
          },
          "Laegna": {
            "Num": "IAOA",
            "Digits": [
              0,
              2,
              1,
              2
            ],
            "Hex": "IO",
            "Bin": "OOAOOAAO"
          },
          "Float": {
            "Num": "14%",
            "Value": {
              "Percents": "14.84375%",
              "Units": 0.1484375
            },
            "Signed": {
              "Percents": "46.875%",
              "Units": 0.46875
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 5,
              "D": 39,
              "sD": 30
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "40",
            "Signed": "31",
            "Hex": "28",
            "Bin": "101000",
            "Laegna": "IAOE",
            "Wave": "IAIE"
          },
          "Wave": {
            "Num": "IAIE",
            "Digits": [
              0,
              2,
              0,
              3
            ],
            "Hex": "IL",
            "Bin": "OOAOOOAA"
          },
          "Laegna": {
            "Num": "IAOE",
            "Digits": [
              0,
              2,
              1,
              3
            ],
            "Hex": "IP",
            "Bin": "OOAOOAAA"
          },
          "Float": {
            "Num": "15%",
            "Value": {
              "Percents": "15.234375%",
              "Units": 0.15234375
            },
            "Signed": {
              "Percents": "48.4375%",
              "Units": 0.484375
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 5,
              "D": 40,
              "sD": 31
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "41",
            "Signed": "32",
            "Hex": "29",
            "Bin": "101001",
            "Laegna": "IAAI",
            "Wave": "IAEI"
          },
          "Wave": {
            "Num": "IAEI",
            "Digits": [
              0,
              2,
              3,
              0
            ],
            "Hex": "IG",
            "Bin": "OOAOAAOO"
          },
          "Laegna": {
            "Num": "IAAI",
            "Digits": [
              0,
              2,
              2,
              0
            ],
            "Hex": "IC",
            "Bin": "OOAOAOOO"
          },
          "Float": {
            "Num": "15%",
            "Value": {
              "Percents": "15.625%",
              "Units": 0.15625
            },
            "Signed": {
              "Percents": "50.0%",
              "Units": 0.5
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 5,
              "D": 41,
              "sD": 32
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "42",
            "Signed": "33",
            "Hex": "2A",
            "Bin": "101010",
            "Laegna": "IAAO",
            "Wave": "IAEO"
          },
          "Wave": {
            "Num": "IAEO",
            "Digits": [
              0,
              2,
              3,
              1
            ],
            "Hex": "IF",
            "Bin": "OOAOAAOA"
          },
          "Laegna": {
            "Num": "IAAO",
            "Digits": [
              0,
              2,
              2,
              1
            ],
            "Hex": "IB",
            "Bin": "OOAOAOOA"
          },
          "Float": {
            "Num": "16%",
            "Value": {
              "Percents": "16.015625%",
              "Units": 0.16015625
            },
            "Signed": {
              "Percents": "51.5625%",
              "Units": 0.515625
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 6,
              "D": 42,
              "sD": 33
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "43",
            "Signed": "34",
            "Hex": "2B",
            "Bin": "101011",
            "Laegna": "IAAA",
            "Wave": "IAEA"
          },
          "Wave": {
            "Num": "IAEA",
            "Digits": [
              0,
              2,
              3,
              2
            ],
            "Hex": "IE",
            "Bin": "OOAOAAAO"
          },
          "Laegna": {
            "Num": "IAAA",
            "Digits": [
              0,
              2,
              2,
              2
            ],
            "Hex": "IA",
            "Bin": "OOAOAOAO"
          },
          "Float": {
            "Num": "16%",
            "Value": {
              "Percents": "16.40625%",
              "Units": 0.1640625
            },
            "Signed": {
              "Percents": "53.125%",
              "Units": 0.53125
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 6,
              "D": 43,
              "sD": 34
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "44",
            "Signed": "35",
            "Hex": "2C",
            "Bin": "101100",
            "Laegna": "IAAE",
            "Wave": "IAEE"
          },
          "Wave": {
            "Num": "IAEE",
            "Digits": [
              0,
              2,
              3,
              3
            ],
            "Hex": "IF",
            "Bin": "OOAOAAAA"
          },
          "Laegna": {
            "Num": "IAAE",
            "Digits": [
              0,
              2,
              2,
              3
            ],
            "Hex": "IB",
            "Bin": "OOAOAOAA"
          },
          "Float": {
            "Num": "16%",
            "Value": {
              "Percents": "16.796875%",
              "Units": 0.16796875
            },
            "Signed": {
              "Percents": "54.6875%",
              "Units": 0.546875
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 6,
              "D": 44,
              "sD": 35
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "45",
            "Signed": "36",
            "Hex": "2D",
            "Bin": "101101",
            "Laegna": "IAEI",
            "Wave": "IAOA"
          },
          "Wave": {
            "Num": "IAOA",
            "Digits": [
              0,
              2,
              1,
              2
            ],
            "Hex": "IO",
            "Bin": "OOAOOAAO"
          },
          "Laegna": {
            "Num": "IAEI",
            "Digits": [
              0,
              2,
              3,
              0
            ],
            "Hex": "IG",
            "Bin": "OOAOAAOO"
          },
          "Float": {
            "Num": "17%",
            "Value": {
              "Percents": "17.1875%",
              "Units": 0.171875
            },
            "Signed": {
              "Percents": "56.25%",
              "Units": 0.5625
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 6,
              "D": 45,
              "sD": 36
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "46",
            "Signed": "37",
            "Hex": "2E",
            "Bin": "101110",
            "Laegna": "IAEO",
            "Wave": "IAOI"
          },
          "Wave": {
            "Num": "IAOI",
            "Digits": [
              0,
              2,
              1,
              0
            ],
            "Hex": "IQ",
            "Bin": "OOAOOAOO"
          },
          "Laegna": {
            "Num": "IAEO",
            "Digits": [
              0,
              2,
              3,
              1
            ],
            "Hex": "IF",
            "Bin": "OOAOAAOA"
          },
          "Float": {
            "Num": "17%",
            "Value": {
              "Percents": "17.578125%",
              "Units": 0.17578125
            },
            "Signed": {
              "Percents": "57.8125%",
              "Units": 0.578125
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 6,
              "D": 46,
              "sD": 37
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "47",
            "Signed": "38",
            "Hex": "2F",
            "Bin": "101111",
            "Laegna": "IAEA",
            "Wave": "IAOE"
          },
          "Wave": {
            "Num": "IAOE",
            "Digits": [
              0,
              2,
              1,
              3
            ],
            "Hex": "IP",
            "Bin": "OOAOOAAA"
          },
          "Laegna": {
            "Num": "IAEA",
            "Digits": [
              0,
              2,
              3,
              2
            ],
            "Hex": "IE",
            "Bin": "OOAOAAAO"
          },
          "Float": {
            "Num": "17%",
            "Value": {
              "Percents": "17.96875%",
              "Units": 0.1796875
            },
            "Signed": {
              "Percents": "59.375%",
              "Units": 0.59375
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 6,
              "D": 47,
              "sD": 38
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "48",
            "Signed": "39",
            "Hex": "30",
            "Bin": "110000",
            "Laegna": "IAEE",
            "Wave": "IAOO"
          },
          "Wave": {
            "Num": "IAOO",
            "Digits": [
              0,
              2,
              1,
              1
            ],
            "Hex": "IP",
            "Bin": "OOAOOAOA"
          },
          "Laegna": {
            "Num": "IAEE",
            "Digits": [
              0,
              2,
              3,
              3
            ],
            "Hex": "IF",
            "Bin": "OOAOAAAA"
          },
          "Float": {
            "Num": "18%",
            "Value": {
              "Percents": "18.359375%",
              "Units": 0.18359375
            },
            "Signed": {
              "Percents": "60.9375%",
              "Units": 0.609375
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 6,
              "D": 48,
              "sD": 39
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "49",
            "Signed": "40",
            "Hex": "31",
            "Bin": "110001",
            "Laegna": "IEII",
            "Wave": "IEII"
          },
          "Wave": {
            "Num": "IEII",
            "Digits": [
              0,
              3,
              0,
              0
            ],
            "Hex": "LK",
            "Bin": "OOAAOOOO"
          },
          "Laegna": {
            "Num": "IEII",
            "Digits": [
              0,
              3,
              0,
              0
            ],
            "Hex": "LK",
            "Bin": "OOAAOOOO"
          },
          "Float": {
            "Num": "18%",
            "Value": {
              "Percents": "18.75%",
              "Units": 0.1875
            },
            "Signed": {
              "Percents": "62.5%",
              "Units": 0.625
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 6,
              "D": 49,
              "sD": 40
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "50",
            "Signed": "41",
            "Hex": "32",
            "Bin": "110010",
            "Laegna": "IEIO",
            "Wave": "IEIO"
          },
          "Wave": {
            "Num": "IEIO",
            "Digits": [
              0,
              3,
              0,
              1
            ],
            "Hex": "LJ",
            "Bin": "OOAAOOOA"
          },
          "Laegna": {
            "Num": "IEIO",
            "Digits": [
              0,
              3,
              0,
              1
            ],
            "Hex": "LJ",
            "Bin": "OOAAOOOA"
          },
          "Float": {
            "Num": "19%",
            "Value": {
              "Percents": "19.140625%",
              "Units": 0.19140625
            },
            "Signed": {
              "Percents": "64.0625%",
              "Units": 0.640625
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 6,
              "D": 50,
              "sD": 41
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "51",
            "Signed": "42",
            "Hex": "33",
            "Bin": "110011",
            "Laegna": "IEIA",
            "Wave": "IEIA"
          },
          "Wave": {
            "Num": "IEIA",
            "Digits": [
              0,
              3,
              0,
              2
            ],
            "Hex": "LI",
            "Bin": "OOAAOOAO"
          },
          "Laegna": {
            "Num": "IEIA",
            "Digits": [
              0,
              3,
              0,
              2
            ],
            "Hex": "LI",
            "Bin": "OOAAOOAO"
          },
          "Float": {
            "Num": "19%",
            "Value": {
              "Percents": "19.53125%",
              "Units": 0.1953125
            },
            "Signed": {
              "Percents": "65.625%",
              "Units": 0.65625
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 6,
              "D": 51,
              "sD": 42
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "52",
            "Signed": "43",
            "Hex": "34",
            "Bin": "110100",
            "Laegna": "IEIE",
            "Wave": "IEIE"
          },
          "Wave": {
            "Num": "IEIE",
            "Digits": [
              0,
              3,
              0,
              3
            ],
            "Hex": "LL",
            "Bin": "OOAAOOAA"
          },
          "Laegna": {
            "Num": "IEIE",
            "Digits": [
              0,
              3,
              0,
              3
            ],
            "Hex": "LL",
            "Bin": "OOAAOOAA"
          },
          "Float": {
            "Num": "19%",
            "Value": {
              "Percents": "19.921875%",
              "Units": 0.19921875
            },
            "Signed": {
              "Percents": "67.1875%",
              "Units": 0.671875
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 6,
              "D": 52,
              "sD": 43
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "53",
            "Signed": "44",
            "Hex": "35",
            "Bin": "110101",
            "Laegna": "IEOI",
            "Wave": "IEOA"
          },
          "Wave": {
            "Num": "IEOA",
            "Digits": [
              0,
              3,
              1,
              2
            ],
            "Hex": "LO",
            "Bin": "OOAAOAAO"
          },
          "Laegna": {
            "Num": "IEOI",
            "Digits": [
              0,
              3,
              1,
              0
            ],
            "Hex": "LQ",
            "Bin": "OOAAOAOO"
          },
          "Float": {
            "Num": "20%",
            "Value": {
              "Percents": "20.3125%",
              "Units": 0.203125
            },
            "Signed": {
              "Percents": "68.75%",
              "Units": 0.6875
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 6,
              "D": 53,
              "sD": 44
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "54",
            "Signed": "45",
            "Hex": "36",
            "Bin": "110110",
            "Laegna": "IEOO",
            "Wave": "IEOI"
          },
          "Wave": {
            "Num": "IEOI",
            "Digits": [
              0,
              3,
              1,
              0
            ],
            "Hex": "LQ",
            "Bin": "OOAAOAOO"
          },
          "Laegna": {
            "Num": "IEOO",
            "Digits": [
              0,
              3,
              1,
              1
            ],
            "Hex": "LP",
            "Bin": "OOAAOAOA"
          },
          "Float": {
            "Num": "20%",
            "Value": {
              "Percents": "20.703125%",
              "Units": 0.20703125
            },
            "Signed": {
              "Percents": "70.3125%",
              "Units": 0.703125
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 6,
              "D": 54,
              "sD": 45
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "55",
            "Signed": "46",
            "Hex": "37",
            "Bin": "110111",
            "Laegna": "IEOA",
            "Wave": "IEOE"
          },
          "Wave": {
            "Num": "IEOE",
            "Digits": [
              0,
              3,
              1,
              3
            ],
            "Hex": "LP",
            "Bin": "OOAAOAAA"
          },
          "Laegna": {
            "Num": "IEOA",
            "Digits": [
              0,
              3,
              1,
              2
            ],
            "Hex": "LO",
            "Bin": "OOAAOAAO"
          },
          "Float": {
            "Num": "21%",
            "Value": {
              "Percents": "21.09375%",
              "Units": 0.2109375
            },
            "Signed": {
              "Percents": "71.875%",
              "Units": 0.71875
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 6,
              "D": 55,
              "sD": 46
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "56",
            "Signed": "47",
            "Hex": "38",
            "Bin": "111000",
            "Laegna": "IEOE",
            "Wave": "IEOO"
          },
          "Wave": {
            "Num": "IEOO",
            "Digits": [
              0,
              3,
              1,
              1
            ],
            "Hex": "LP",
            "Bin": "OOAAOAOA"
          },
          "Laegna": {
            "Num": "IEOE",
            "Digits": [
              0,
              3,
              1,
              3
            ],
            "Hex": "LP",
            "Bin": "OOAAOAAA"
          },
          "Float": {
            "Num": "21%",
            "Value": {
              "Percents": "21.484375%",
              "Units": 0.21484375
            },
            "Signed": {
              "Percents": "73.4375%",
              "Units": 0.734375
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 6,
              "D": 56,
              "sD": 47
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "57",
            "Signed": "48",
            "Hex": "39",
            "Bin": "111001",
            "Laegna": "IEAI",
            "Wave": "IEAA"
          },
          "Wave": {
            "Num": "IEAA",
            "Digits": [
              0,
              3,
              2,
              2
            ],
            "Hex": "LA",
            "Bin": "OOAAAOAO"
          },
          "Laegna": {
            "Num": "IEAI",
            "Digits": [
              0,
              3,
              2,
              0
            ],
            "Hex": "LC",
            "Bin": "OOAAAOOO"
          },
          "Float": {
            "Num": "21%",
            "Value": {
              "Percents": "21.875%",
              "Units": 0.21875
            },
            "Signed": {
              "Percents": "75.0%",
              "Units": 0.75
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 6,
              "D": 57,
              "sD": 48
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "58",
            "Signed": "49",
            "Hex": "3A",
            "Bin": "111010",
            "Laegna": "IEAO",
            "Wave": "IEAI"
          },
          "Wave": {
            "Num": "IEAI",
            "Digits": [
              0,
              3,
              2,
              0
            ],
            "Hex": "LC",
            "Bin": "OOAAAOOO"
          },
          "Laegna": {
            "Num": "IEAO",
            "Digits": [
              0,
              3,
              2,
              1
            ],
            "Hex": "LB",
            "Bin": "OOAAAOOA"
          },
          "Float": {
            "Num": "22%",
            "Value": {
              "Percents": "22.265625%",
              "Units": 0.22265625
            },
            "Signed": {
              "Percents": "76.5625%",
              "Units": 0.765625
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 6,
              "D": 58,
              "sD": 49
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "59",
            "Signed": "50",
            "Hex": "3B",
            "Bin": "111011",
            "Laegna": "IEAA",
            "Wave": "IEAE"
          },
          "Wave": {
            "Num": "IEAE",
            "Digits": [
              0,
              3,
              2,
              3
            ],
            "Hex": "LB",
            "Bin": "OOAAAOAA"
          },
          "Laegna": {
            "Num": "IEAA",
            "Digits": [
              0,
              3,
              2,
              2
            ],
            "Hex": "LA",
            "Bin": "OOAAAOAO"
          },
          "Float": {
            "Num": "22%",
            "Value": {
              "Percents": "22.65625%",
              "Units": 0.2265625
            },
            "Signed": {
              "Percents": "78.125%",
              "Units": 0.78125
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 6,
              "D": 59,
              "sD": 50
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "60",
            "Signed": "51",
            "Hex": "3C",
            "Bin": "111100",
            "Laegna": "IEAE",
            "Wave": "IEAO"
          },
          "Wave": {
            "Num": "IEAO",
            "Digits": [
              0,
              3,
              2,
              1
            ],
            "Hex": "LB",
            "Bin": "OOAAAOOA"
          },
          "Laegna": {
            "Num": "IEAE",
            "Digits": [
              0,
              3,
              2,
              3
            ],
            "Hex": "LB",
            "Bin": "OOAAAOAA"
          },
          "Float": {
            "Num": "23%",
            "Value": {
              "Percents": "23.046875%",
              "Units": 0.23046875
            },
            "Signed": {
              "Percents": "79.6875%",
              "Units": 0.796875
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 6,
              "D": 60,
              "sD": 51
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "61",
            "Signed": "52",
            "Hex": "3D",
            "Bin": "111101",
            "Laegna": "IEEI",
            "Wave": "IEEI"
          },
          "Wave": {
            "Num": "IEEI",
            "Digits": [
              0,
              3,
              3,
              0
            ],
            "Hex": "LG",
            "Bin": "OOAAAAOO"
          },
          "Laegna": {
            "Num": "IEEI",
            "Digits": [
              0,
              3,
              3,
              0
            ],
            "Hex": "LG",
            "Bin": "OOAAAAOO"
          },
          "Float": {
            "Num": "23%",
            "Value": {
              "Percents": "23.4375%",
              "Units": 0.234375
            },
            "Signed": {
              "Percents": "81.25%",
              "Units": 0.8125
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 6,
              "D": 61,
              "sD": 52
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "62",
            "Signed": "53",
            "Hex": "3E",
            "Bin": "111110",
            "Laegna": "IEEO",
            "Wave": "IEEO"
          },
          "Wave": {
            "Num": "IEEO",
            "Digits": [
              0,
              3,
              3,
              1
            ],
            "Hex": "LF",
            "Bin": "OOAAAAOA"
          },
          "Laegna": {
            "Num": "IEEO",
            "Digits": [
              0,
              3,
              3,
              1
            ],
            "Hex": "LF",
            "Bin": "OOAAAAOA"
          },
          "Float": {
            "Num": "23%",
            "Value": {
              "Percents": "23.828125%",
              "Units": 0.23828125
            },
            "Signed": {
              "Percents": "82.8125%",
              "Units": 0.828125
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 6,
              "D": 62,
              "sD": 53
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "63",
            "Signed": "54",
            "Hex": "3F",
            "Bin": "111111",
            "Laegna": "IEEA",
            "Wave": "IEEA"
          },
          "Wave": {
            "Num": "IEEA",
            "Digits": [
              0,
              3,
              3,
              2
            ],
            "Hex": "LE",
            "Bin": "OOAAAAAO"
          },
          "Laegna": {
            "Num": "IEEA",
            "Digits": [
              0,
              3,
              3,
              2
            ],
            "Hex": "LE",
            "Bin": "OOAAAAAO"
          },
          "Float": {
            "Num": "24%",
            "Value": {
              "Percents": "24.21875%",
              "Units": 0.2421875
            },
            "Signed": {
              "Percents": "84.375%",
              "Units": 0.84375
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 6,
              "D": 63,
              "sD": 54
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "64",
            "Signed": "55",
            "Hex": "40",
            "Bin": "1000000",
            "Laegna": "IEEE",
            "Wave": "IEEE"
          },
          "Wave": {
            "Num": "IEEE",
            "Digits": [
              0,
              3,
              3,
              3
            ],
            "Hex": "LF",
            "Bin": "OOAAAAAA"
          },
          "Laegna": {
            "Num": "IEEE",
            "Digits": [
              0,
              3,
              3,
              3
            ],
            "Hex": "LF",
            "Bin": "OOAAAAAA"
          },
          "Float": {
            "Num": "24%",
            "Value": {
              "Percents": "24.609375%",
              "Units": 0.24609375
            },
            "Signed": {
              "Percents": "85.9375%",
              "Units": 0.859375
            }
          },
          "Octave": {
            "Num": 6,
            "Lower": {
              "Num": 6,
              "Signed": 6,
              "D": 64,
              "sD": 55
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "65",
            "Signed": "56",
            "Hex": "41",
            "Bin": "1000001",
            "Laegna": "OIII",
            "Wave": "OAAA"
          },
          "Wave": {
            "Num": "OAAA",
            "Digits": [
              1,
              2,
              2,
              2
            ],
            "Hex": "OA",
            "Bin": "OAAOAOAO"
          },
          "Laegna": {
            "Num": "OIII",
            "Digits": [
              1,
              0,
              0,
              0
            ],
            "Hex": "QK",
            "Bin": "OAOOOOOO"
          },
          "Float": {
            "Num": "25%",
            "Value": {
              "Percents": "25.0%",
              "Units": 0.25
            },
            "Signed": {
              "Percents": "87.5%",
              "Units": 0.875
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 6,
              "D": 65,
              "sD": 56
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "66",
            "Signed": "57",
            "Hex": "42",
            "Bin": "1000010",
            "Laegna": "OIIO",
            "Wave": "OAAI"
          },
          "Wave": {
            "Num": "OAAI",
            "Digits": [
              1,
              2,
              2,
              0
            ],
            "Hex": "OC",
            "Bin": "OAAOAOOO"
          },
          "Laegna": {
            "Num": "OIIO",
            "Digits": [
              1,
              0,
              0,
              1
            ],
            "Hex": "QJ",
            "Bin": "OAOOOOOA"
          },
          "Float": {
            "Num": "25%",
            "Value": {
              "Percents": "25.390625%",
              "Units": 0.25390625
            },
            "Signed": {
              "Percents": "89.0625%",
              "Units": 0.890625
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 6,
              "D": 66,
              "sD": 57
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "67",
            "Signed": "58",
            "Hex": "43",
            "Bin": "1000011",
            "Laegna": "OIIA",
            "Wave": "OAAE"
          },
          "Wave": {
            "Num": "OAAE",
            "Digits": [
              1,
              2,
              2,
              3
            ],
            "Hex": "OB",
            "Bin": "OAAOAOAA"
          },
          "Laegna": {
            "Num": "OIIA",
            "Digits": [
              1,
              0,
              0,
              2
            ],
            "Hex": "QI",
            "Bin": "OAOOOOAO"
          },
          "Float": {
            "Num": "25%",
            "Value": {
              "Percents": "25.78125%",
              "Units": 0.2578125
            },
            "Signed": {
              "Percents": "90.625%",
              "Units": 0.90625
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 6,
              "D": 67,
              "sD": 58
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "68",
            "Signed": "59",
            "Hex": "44",
            "Bin": "1000100",
            "Laegna": "OIIE",
            "Wave": "OAAO"
          },
          "Wave": {
            "Num": "OAAO",
            "Digits": [
              1,
              2,
              2,
              1
            ],
            "Hex": "OB",
            "Bin": "OAAOAOOA"
          },
          "Laegna": {
            "Num": "OIIE",
            "Digits": [
              1,
              0,
              0,
              3
            ],
            "Hex": "QL",
            "Bin": "OAOOOOAA"
          },
          "Float": {
            "Num": "26%",
            "Value": {
              "Percents": "26.171875%",
              "Units": 0.26171875
            },
            "Signed": {
              "Percents": "92.1875%",
              "Units": 0.921875
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 6,
              "D": 68,
              "sD": 59
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "69",
            "Signed": "60",
            "Hex": "45",
            "Bin": "1000101",
            "Laegna": "OIOI",
            "Wave": "OAII"
          },
          "Wave": {
            "Num": "OAII",
            "Digits": [
              1,
              2,
              0,
              0
            ],
            "Hex": "OK",
            "Bin": "OAAOOOOO"
          },
          "Laegna": {
            "Num": "OIOI",
            "Digits": [
              1,
              0,
              1,
              0
            ],
            "Hex": "QQ",
            "Bin": "OAOOOAOO"
          },
          "Float": {
            "Num": "26%",
            "Value": {
              "Percents": "26.5625%",
              "Units": 0.265625
            },
            "Signed": {
              "Percents": "93.75%",
              "Units": 0.9375
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 6,
              "D": 69,
              "sD": 60
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "70",
            "Signed": "61",
            "Hex": "46",
            "Bin": "1000110",
            "Laegna": "OIOO",
            "Wave": "OAIO"
          },
          "Wave": {
            "Num": "OAIO",
            "Digits": [
              1,
              2,
              0,
              1
            ],
            "Hex": "OJ",
            "Bin": "OAAOOOOA"
          },
          "Laegna": {
            "Num": "OIOO",
            "Digits": [
              1,
              0,
              1,
              1
            ],
            "Hex": "QP",
            "Bin": "OAOOOAOA"
          },
          "Float": {
            "Num": "26%",
            "Value": {
              "Percents": "26.953125%",
              "Units": 0.26953125
            },
            "Signed": {
              "Percents": "95.3125%",
              "Units": 0.953125
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 6,
              "D": 70,
              "sD": 61
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "71",
            "Signed": "62",
            "Hex": "47",
            "Bin": "1000111",
            "Laegna": "OIOA",
            "Wave": "OAIA"
          },
          "Wave": {
            "Num": "OAIA",
            "Digits": [
              1,
              2,
              0,
              2
            ],
            "Hex": "OI",
            "Bin": "OAAOOOAO"
          },
          "Laegna": {
            "Num": "OIOA",
            "Digits": [
              1,
              0,
              1,
              2
            ],
            "Hex": "QO",
            "Bin": "OAOOOAAO"
          },
          "Float": {
            "Num": "27%",
            "Value": {
              "Percents": "27.34375%",
              "Units": 0.2734375
            },
            "Signed": {
              "Percents": "96.875%",
              "Units": 0.96875
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 6,
              "D": 71,
              "sD": 62
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "72",
            "Signed": "63",
            "Hex": "48",
            "Bin": "1001000",
            "Laegna": "OIOE",
            "Wave": "OAIE"
          },
          "Wave": {
            "Num": "OAIE",
            "Digits": [
              1,
              2,
              0,
              3
            ],
            "Hex": "OL",
            "Bin": "OAAOOOAA"
          },
          "Laegna": {
            "Num": "OIOE",
            "Digits": [
              1,
              0,
              1,
              3
            ],
            "Hex": "QP",
            "Bin": "OAOOOAAA"
          },
          "Float": {
            "Num": "27%",
            "Value": {
              "Percents": "27.734375%",
              "Units": 0.27734375
            },
            "Signed": {
              "Percents": "98.4375%",
              "Units": 0.984375
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 6,
              "D": 72,
              "sD": 63
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "73",
            "Signed": "64",
            "Hex": "49",
            "Bin": "1001001",
            "Laegna": "OIAI",
            "Wave": "OAEI"
          },
          "Wave": {
            "Num": "OAEI",
            "Digits": [
              1,
              2,
              3,
              0
            ],
            "Hex": "OG",
            "Bin": "OAAOAAOO"
          },
          "Laegna": {
            "Num": "OIAI",
            "Digits": [
              1,
              0,
              2,
              0
            ],
            "Hex": "QC",
            "Bin": "OAOOAOOO"
          },
          "Float": {
            "Num": "28%",
            "Value": {
              "Percents": "28.125%",
              "Units": 0.28125
            },
            "Signed": {
              "Percents": "100.0%",
              "Units": 1.0
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 6,
              "D": 73,
              "sD": 64
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "74",
            "Signed": "65",
            "Hex": "4A",
            "Bin": "1001010",
            "Laegna": "OIAO",
            "Wave": "OAEO"
          },
          "Wave": {
            "Num": "OAEO",
            "Digits": [
              1,
              2,
              3,
              1
            ],
            "Hex": "OF",
            "Bin": "OAAOAAOA"
          },
          "Laegna": {
            "Num": "OIAO",
            "Digits": [
              1,
              0,
              2,
              1
            ],
            "Hex": "QB",
            "Bin": "OAOOAOOA"
          },
          "Float": {
            "Num": "28%",
            "Value": {
              "Percents": "28.515625%",
              "Units": 0.28515625
            },
            "Signed": {
              "Percents": "101.5625%",
              "Units": 1.015625
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 74,
              "sD": 65
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "75",
            "Signed": "66",
            "Hex": "4B",
            "Bin": "1001011",
            "Laegna": "OIAA",
            "Wave": "OAEA"
          },
          "Wave": {
            "Num": "OAEA",
            "Digits": [
              1,
              2,
              3,
              2
            ],
            "Hex": "OE",
            "Bin": "OAAOAAAO"
          },
          "Laegna": {
            "Num": "OIAA",
            "Digits": [
              1,
              0,
              2,
              2
            ],
            "Hex": "QA",
            "Bin": "OAOOAOAO"
          },
          "Float": {
            "Num": "28%",
            "Value": {
              "Percents": "28.90625%",
              "Units": 0.2890625
            },
            "Signed": {
              "Percents": "103.125%",
              "Units": 1.03125
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 75,
              "sD": 66
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "76",
            "Signed": "67",
            "Hex": "4C",
            "Bin": "1001100",
            "Laegna": "OIAE",
            "Wave": "OAEE"
          },
          "Wave": {
            "Num": "OAEE",
            "Digits": [
              1,
              2,
              3,
              3
            ],
            "Hex": "OF",
            "Bin": "OAAOAAAA"
          },
          "Laegna": {
            "Num": "OIAE",
            "Digits": [
              1,
              0,
              2,
              3
            ],
            "Hex": "QB",
            "Bin": "OAOOAOAA"
          },
          "Float": {
            "Num": "29%",
            "Value": {
              "Percents": "29.296875%",
              "Units": 0.29296875
            },
            "Signed": {
              "Percents": "104.6875%",
              "Units": 1.046875
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 76,
              "sD": 67
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "77",
            "Signed": "68",
            "Hex": "4D",
            "Bin": "1001101",
            "Laegna": "OIEI",
            "Wave": "OAOA"
          },
          "Wave": {
            "Num": "OAOA",
            "Digits": [
              1,
              2,
              1,
              2
            ],
            "Hex": "OO",
            "Bin": "OAAOOAAO"
          },
          "Laegna": {
            "Num": "OIEI",
            "Digits": [
              1,
              0,
              3,
              0
            ],
            "Hex": "QG",
            "Bin": "OAOOAAOO"
          },
          "Float": {
            "Num": "29%",
            "Value": {
              "Percents": "29.6875%",
              "Units": 0.296875
            },
            "Signed": {
              "Percents": "106.25%",
              "Units": 1.0625
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 77,
              "sD": 68
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "78",
            "Signed": "69",
            "Hex": "4E",
            "Bin": "1001110",
            "Laegna": "OIEO",
            "Wave": "OAOI"
          },
          "Wave": {
            "Num": "OAOI",
            "Digits": [
              1,
              2,
              1,
              0
            ],
            "Hex": "OQ",
            "Bin": "OAAOOAOO"
          },
          "Laegna": {
            "Num": "OIEO",
            "Digits": [
              1,
              0,
              3,
              1
            ],
            "Hex": "QF",
            "Bin": "OAOOAAOA"
          },
          "Float": {
            "Num": "30%",
            "Value": {
              "Percents": "30.078125%",
              "Units": 0.30078125
            },
            "Signed": {
              "Percents": "107.8125%",
              "Units": 1.078125
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 78,
              "sD": 69
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "79",
            "Signed": "70",
            "Hex": "4F",
            "Bin": "1001111",
            "Laegna": "OIEA",
            "Wave": "OAOE"
          },
          "Wave": {
            "Num": "OAOE",
            "Digits": [
              1,
              2,
              1,
              3
            ],
            "Hex": "OP",
            "Bin": "OAAOOAAA"
          },
          "Laegna": {
            "Num": "OIEA",
            "Digits": [
              1,
              0,
              3,
              2
            ],
            "Hex": "QE",
            "Bin": "OAOOAAAO"
          },
          "Float": {
            "Num": "30%",
            "Value": {
              "Percents": "30.46875%",
              "Units": 0.3046875
            },
            "Signed": {
              "Percents": "109.375%",
              "Units": 1.09375
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 79,
              "sD": 70
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "80",
            "Signed": "71",
            "Hex": "50",
            "Bin": "1010000",
            "Laegna": "OIEE",
            "Wave": "OAOO"
          },
          "Wave": {
            "Num": "OAOO",
            "Digits": [
              1,
              2,
              1,
              1
            ],
            "Hex": "OP",
            "Bin": "OAAOOAOA"
          },
          "Laegna": {
            "Num": "OIEE",
            "Digits": [
              1,
              0,
              3,
              3
            ],
            "Hex": "QF",
            "Bin": "OAOOAAAA"
          },
          "Float": {
            "Num": "30%",
            "Value": {
              "Percents": "30.859375%",
              "Units": 0.30859375
            },
            "Signed": {
              "Percents": "110.9375%",
              "Units": 1.109375
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 80,
              "sD": 71
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "81",
            "Signed": "72",
            "Hex": "51",
            "Bin": "1010001",
            "Laegna": "OOII",
            "Wave": "OIII"
          },
          "Wave": {
            "Num": "OIII",
            "Digits": [
              1,
              0,
              0,
              0
            ],
            "Hex": "QK",
            "Bin": "OAOOOOOO"
          },
          "Laegna": {
            "Num": "OOII",
            "Digits": [
              1,
              1,
              0,
              0
            ],
            "Hex": "PK",
            "Bin": "OAOAOOOO"
          },
          "Float": {
            "Num": "31%",
            "Value": {
              "Percents": "31.25%",
              "Units": 0.3125
            },
            "Signed": {
              "Percents": "112.5%",
              "Units": 1.125
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 81,
              "sD": 72
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "82",
            "Signed": "73",
            "Hex": "52",
            "Bin": "1010010",
            "Laegna": "OOIO",
            "Wave": "OIIO"
          },
          "Wave": {
            "Num": "OIIO",
            "Digits": [
              1,
              0,
              0,
              1
            ],
            "Hex": "QJ",
            "Bin": "OAOOOOOA"
          },
          "Laegna": {
            "Num": "OOIO",
            "Digits": [
              1,
              1,
              0,
              1
            ],
            "Hex": "PJ",
            "Bin": "OAOAOOOA"
          },
          "Float": {
            "Num": "31%",
            "Value": {
              "Percents": "31.640625%",
              "Units": 0.31640625
            },
            "Signed": {
              "Percents": "114.0625%",
              "Units": 1.140625
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 82,
              "sD": 73
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "83",
            "Signed": "74",
            "Hex": "53",
            "Bin": "1010011",
            "Laegna": "OOIA",
            "Wave": "OIIA"
          },
          "Wave": {
            "Num": "OIIA",
            "Digits": [
              1,
              0,
              0,
              2
            ],
            "Hex": "QI",
            "Bin": "OAOOOOAO"
          },
          "Laegna": {
            "Num": "OOIA",
            "Digits": [
              1,
              1,
              0,
              2
            ],
            "Hex": "PI",
            "Bin": "OAOAOOAO"
          },
          "Float": {
            "Num": "32%",
            "Value": {
              "Percents": "32.03125%",
              "Units": 0.3203125
            },
            "Signed": {
              "Percents": "115.625%",
              "Units": 1.15625
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 83,
              "sD": 74
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "84",
            "Signed": "75",
            "Hex": "54",
            "Bin": "1010100",
            "Laegna": "OOIE",
            "Wave": "OIIE"
          },
          "Wave": {
            "Num": "OIIE",
            "Digits": [
              1,
              0,
              0,
              3
            ],
            "Hex": "QL",
            "Bin": "OAOOOOAA"
          },
          "Laegna": {
            "Num": "OOIE",
            "Digits": [
              1,
              1,
              0,
              3
            ],
            "Hex": "PL",
            "Bin": "OAOAOOAA"
          },
          "Float": {
            "Num": "32%",
            "Value": {
              "Percents": "32.421875%",
              "Units": 0.32421875
            },
            "Signed": {
              "Percents": "117.1875%",
              "Units": 1.171875
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 84,
              "sD": 75
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "85",
            "Signed": "76",
            "Hex": "55",
            "Bin": "1010101",
            "Laegna": "OOOI",
            "Wave": "OIOA"
          },
          "Wave": {
            "Num": "OIOA",
            "Digits": [
              1,
              0,
              1,
              2
            ],
            "Hex": "QO",
            "Bin": "OAOOOAAO"
          },
          "Laegna": {
            "Num": "OOOI",
            "Digits": [
              1,
              1,
              1,
              0
            ],
            "Hex": "PQ",
            "Bin": "OAOAOAOO"
          },
          "Float": {
            "Num": "32%",
            "Value": {
              "Percents": "32.8125%",
              "Units": 0.328125
            },
            "Signed": {
              "Percents": "118.75%",
              "Units": 1.1875
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 85,
              "sD": 76
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "86",
            "Signed": "77",
            "Hex": "56",
            "Bin": "1010110",
            "Laegna": "OOOO",
            "Wave": "OIOI"
          },
          "Wave": {
            "Num": "OIOI",
            "Digits": [
              1,
              0,
              1,
              0
            ],
            "Hex": "QQ",
            "Bin": "OAOOOAOO"
          },
          "Laegna": {
            "Num": "OOOO",
            "Digits": [
              1,
              1,
              1,
              1
            ],
            "Hex": "PP",
            "Bin": "OAOAOAOA"
          },
          "Float": {
            "Num": "33%",
            "Value": {
              "Percents": "33.203125%",
              "Units": 0.33203125
            },
            "Signed": {
              "Percents": "120.3125%",
              "Units": 1.203125
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 86,
              "sD": 77
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "87",
            "Signed": "78",
            "Hex": "57",
            "Bin": "1010111",
            "Laegna": "OOOA",
            "Wave": "OIOE"
          },
          "Wave": {
            "Num": "OIOE",
            "Digits": [
              1,
              0,
              1,
              3
            ],
            "Hex": "QP",
            "Bin": "OAOOOAAA"
          },
          "Laegna": {
            "Num": "OOOA",
            "Digits": [
              1,
              1,
              1,
              2
            ],
            "Hex": "PO",
            "Bin": "OAOAOAAO"
          },
          "Float": {
            "Num": "33%",
            "Value": {
              "Percents": "33.59375%",
              "Units": 0.3359375
            },
            "Signed": {
              "Percents": "121.875%",
              "Units": 1.21875
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 87,
              "sD": 78
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "88",
            "Signed": "79",
            "Hex": "58",
            "Bin": "1011000",
            "Laegna": "OOOE",
            "Wave": "OIOO"
          },
          "Wave": {
            "Num": "OIOO",
            "Digits": [
              1,
              0,
              1,
              1
            ],
            "Hex": "QP",
            "Bin": "OAOOOAOA"
          },
          "Laegna": {
            "Num": "OOOE",
            "Digits": [
              1,
              1,
              1,
              3
            ],
            "Hex": "PP",
            "Bin": "OAOAOAAA"
          },
          "Float": {
            "Num": "33%",
            "Value": {
              "Percents": "33.984375%",
              "Units": 0.33984375
            },
            "Signed": {
              "Percents": "123.4375%",
              "Units": 1.234375
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 88,
              "sD": 79
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "89",
            "Signed": "80",
            "Hex": "59",
            "Bin": "1011001",
            "Laegna": "OOAI",
            "Wave": "OIAA"
          },
          "Wave": {
            "Num": "OIAA",
            "Digits": [
              1,
              0,
              2,
              2
            ],
            "Hex": "QA",
            "Bin": "OAOOAOAO"
          },
          "Laegna": {
            "Num": "OOAI",
            "Digits": [
              1,
              1,
              2,
              0
            ],
            "Hex": "PC",
            "Bin": "OAOAAOOO"
          },
          "Float": {
            "Num": "34%",
            "Value": {
              "Percents": "34.375%",
              "Units": 0.34375
            },
            "Signed": {
              "Percents": "125.0%",
              "Units": 1.25
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 89,
              "sD": 80
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "90",
            "Signed": "81",
            "Hex": "5A",
            "Bin": "1011010",
            "Laegna": "OOAO",
            "Wave": "OIAI"
          },
          "Wave": {
            "Num": "OIAI",
            "Digits": [
              1,
              0,
              2,
              0
            ],
            "Hex": "QC",
            "Bin": "OAOOAOOO"
          },
          "Laegna": {
            "Num": "OOAO",
            "Digits": [
              1,
              1,
              2,
              1
            ],
            "Hex": "PB",
            "Bin": "OAOAAOOA"
          },
          "Float": {
            "Num": "34%",
            "Value": {
              "Percents": "34.765625%",
              "Units": 0.34765625
            },
            "Signed": {
              "Percents": "126.5625%",
              "Units": 1.265625
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 90,
              "sD": 81
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "91",
            "Signed": "82",
            "Hex": "5B",
            "Bin": "1011011",
            "Laegna": "OOAA",
            "Wave": "OIAE"
          },
          "Wave": {
            "Num": "OIAE",
            "Digits": [
              1,
              0,
              2,
              3
            ],
            "Hex": "QB",
            "Bin": "OAOOAOAA"
          },
          "Laegna": {
            "Num": "OOAA",
            "Digits": [
              1,
              1,
              2,
              2
            ],
            "Hex": "PA",
            "Bin": "OAOAAOAO"
          },
          "Float": {
            "Num": "35%",
            "Value": {
              "Percents": "35.15625%",
              "Units": 0.3515625
            },
            "Signed": {
              "Percents": "128.125%",
              "Units": 1.28125
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 91,
              "sD": 82
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "92",
            "Signed": "83",
            "Hex": "5C",
            "Bin": "1011100",
            "Laegna": "OOAE",
            "Wave": "OIAO"
          },
          "Wave": {
            "Num": "OIAO",
            "Digits": [
              1,
              0,
              2,
              1
            ],
            "Hex": "QB",
            "Bin": "OAOOAOOA"
          },
          "Laegna": {
            "Num": "OOAE",
            "Digits": [
              1,
              1,
              2,
              3
            ],
            "Hex": "PB",
            "Bin": "OAOAAOAA"
          },
          "Float": {
            "Num": "35%",
            "Value": {
              "Percents": "35.546875%",
              "Units": 0.35546875
            },
            "Signed": {
              "Percents": "129.6875%",
              "Units": 1.296875
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 92,
              "sD": 83
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "93",
            "Signed": "84",
            "Hex": "5D",
            "Bin": "1011101",
            "Laegna": "OOEI",
            "Wave": "OIEI"
          },
          "Wave": {
            "Num": "OIEI",
            "Digits": [
              1,
              0,
              3,
              0
            ],
            "Hex": "QG",
            "Bin": "OAOOAAOO"
          },
          "Laegna": {
            "Num": "OOEI",
            "Digits": [
              1,
              1,
              3,
              0
            ],
            "Hex": "PG",
            "Bin": "OAOAAAOO"
          },
          "Float": {
            "Num": "35%",
            "Value": {
              "Percents": "35.9375%",
              "Units": 0.359375
            },
            "Signed": {
              "Percents": "131.25%",
              "Units": 1.3125
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 93,
              "sD": 84
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "94",
            "Signed": "85",
            "Hex": "5E",
            "Bin": "1011110",
            "Laegna": "OOEO",
            "Wave": "OIEO"
          },
          "Wave": {
            "Num": "OIEO",
            "Digits": [
              1,
              0,
              3,
              1
            ],
            "Hex": "QF",
            "Bin": "OAOOAAOA"
          },
          "Laegna": {
            "Num": "OOEO",
            "Digits": [
              1,
              1,
              3,
              1
            ],
            "Hex": "PF",
            "Bin": "OAOAAAOA"
          },
          "Float": {
            "Num": "36%",
            "Value": {
              "Percents": "36.328125%",
              "Units": 0.36328125
            },
            "Signed": {
              "Percents": "132.8125%",
              "Units": 1.328125
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 94,
              "sD": 85
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "95",
            "Signed": "86",
            "Hex": "5F",
            "Bin": "1011111",
            "Laegna": "OOEA",
            "Wave": "OIEA"
          },
          "Wave": {
            "Num": "OIEA",
            "Digits": [
              1,
              0,
              3,
              2
            ],
            "Hex": "QE",
            "Bin": "OAOOAAAO"
          },
          "Laegna": {
            "Num": "OOEA",
            "Digits": [
              1,
              1,
              3,
              2
            ],
            "Hex": "PE",
            "Bin": "OAOAAAAO"
          },
          "Float": {
            "Num": "36%",
            "Value": {
              "Percents": "36.71875%",
              "Units": 0.3671875
            },
            "Signed": {
              "Percents": "134.375%",
              "Units": 1.34375
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 95,
              "sD": 86
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "96",
            "Signed": "87",
            "Hex": "60",
            "Bin": "1100000",
            "Laegna": "OOEE",
            "Wave": "OIEE"
          },
          "Wave": {
            "Num": "OIEE",
            "Digits": [
              1,
              0,
              3,
              3
            ],
            "Hex": "QF",
            "Bin": "OAOOAAAA"
          },
          "Laegna": {
            "Num": "OOEE",
            "Digits": [
              1,
              1,
              3,
              3
            ],
            "Hex": "PF",
            "Bin": "OAOAAAAA"
          },
          "Float": {
            "Num": "37%",
            "Value": {
              "Percents": "37.109375%",
              "Units": 0.37109375
            },
            "Signed": {
              "Percents": "135.9375%",
              "Units": 1.359375
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 96,
              "sD": 87
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "97",
            "Signed": "88",
            "Hex": "61",
            "Bin": "1100001",
            "Laegna": "OAII",
            "Wave": "OEII"
          },
          "Wave": {
            "Num": "OEII",
            "Digits": [
              1,
              3,
              0,
              0
            ],
            "Hex": "PK",
            "Bin": "OAAAOOOO"
          },
          "Laegna": {
            "Num": "OAII",
            "Digits": [
              1,
              2,
              0,
              0
            ],
            "Hex": "OK",
            "Bin": "OAAOOOOO"
          },
          "Float": {
            "Num": "37%",
            "Value": {
              "Percents": "37.5%",
              "Units": 0.375
            },
            "Signed": {
              "Percents": "137.5%",
              "Units": 1.375
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 97,
              "sD": 88
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "98",
            "Signed": "89",
            "Hex": "62",
            "Bin": "1100010",
            "Laegna": "OAIO",
            "Wave": "OEIO"
          },
          "Wave": {
            "Num": "OEIO",
            "Digits": [
              1,
              3,
              0,
              1
            ],
            "Hex": "PJ",
            "Bin": "OAAAOOOA"
          },
          "Laegna": {
            "Num": "OAIO",
            "Digits": [
              1,
              2,
              0,
              1
            ],
            "Hex": "OJ",
            "Bin": "OAAOOOOA"
          },
          "Float": {
            "Num": "37%",
            "Value": {
              "Percents": "37.890625%",
              "Units": 0.37890625
            },
            "Signed": {
              "Percents": "139.0625%",
              "Units": 1.390625
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 98,
              "sD": 89
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "99",
            "Signed": "90",
            "Hex": "63",
            "Bin": "1100011",
            "Laegna": "OAIA",
            "Wave": "OEIA"
          },
          "Wave": {
            "Num": "OEIA",
            "Digits": [
              1,
              3,
              0,
              2
            ],
            "Hex": "PI",
            "Bin": "OAAAOOAO"
          },
          "Laegna": {
            "Num": "OAIA",
            "Digits": [
              1,
              2,
              0,
              2
            ],
            "Hex": "OI",
            "Bin": "OAAOOOAO"
          },
          "Float": {
            "Num": "38%",
            "Value": {
              "Percents": "38.28125%",
              "Units": 0.3828125
            },
            "Signed": {
              "Percents": "140.625%",
              "Units": 1.40625
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 99,
              "sD": 90
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "100",
            "Signed": "91",
            "Hex": "64",
            "Bin": "1100100",
            "Laegna": "OAIE",
            "Wave": "OEIE"
          },
          "Wave": {
            "Num": "OEIE",
            "Digits": [
              1,
              3,
              0,
              3
            ],
            "Hex": "PL",
            "Bin": "OAAAOOAA"
          },
          "Laegna": {
            "Num": "OAIE",
            "Digits": [
              1,
              2,
              0,
              3
            ],
            "Hex": "OL",
            "Bin": "OAAOOOAA"
          },
          "Float": {
            "Num": "38%",
            "Value": {
              "Percents": "38.671875%",
              "Units": 0.38671875
            },
            "Signed": {
              "Percents": "142.1875%",
              "Units": 1.421875
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 100,
              "sD": 91
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "101",
            "Signed": "92",
            "Hex": "65",
            "Bin": "1100101",
            "Laegna": "OAOI",
            "Wave": "OEOA"
          },
          "Wave": {
            "Num": "OEOA",
            "Digits": [
              1,
              3,
              1,
              2
            ],
            "Hex": "PO",
            "Bin": "OAAAOAAO"
          },
          "Laegna": {
            "Num": "OAOI",
            "Digits": [
              1,
              2,
              1,
              0
            ],
            "Hex": "OQ",
            "Bin": "OAAOOAOO"
          },
          "Float": {
            "Num": "39%",
            "Value": {
              "Percents": "39.0625%",
              "Units": 0.390625
            },
            "Signed": {
              "Percents": "143.75%",
              "Units": 1.4375
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 101,
              "sD": 92
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "102",
            "Signed": "93",
            "Hex": "66",
            "Bin": "1100110",
            "Laegna": "OAOO",
            "Wave": "OEOI"
          },
          "Wave": {
            "Num": "OEOI",
            "Digits": [
              1,
              3,
              1,
              0
            ],
            "Hex": "PQ",
            "Bin": "OAAAOAOO"
          },
          "Laegna": {
            "Num": "OAOO",
            "Digits": [
              1,
              2,
              1,
              1
            ],
            "Hex": "OP",
            "Bin": "OAAOOAOA"
          },
          "Float": {
            "Num": "39%",
            "Value": {
              "Percents": "39.453125%",
              "Units": 0.39453125
            },
            "Signed": {
              "Percents": "145.3125%",
              "Units": 1.453125
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 102,
              "sD": 93
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "103",
            "Signed": "94",
            "Hex": "67",
            "Bin": "1100111",
            "Laegna": "OAOA",
            "Wave": "OEOE"
          },
          "Wave": {
            "Num": "OEOE",
            "Digits": [
              1,
              3,
              1,
              3
            ],
            "Hex": "PP",
            "Bin": "OAAAOAAA"
          },
          "Laegna": {
            "Num": "OAOA",
            "Digits": [
              1,
              2,
              1,
              2
            ],
            "Hex": "OO",
            "Bin": "OAAOOAAO"
          },
          "Float": {
            "Num": "39%",
            "Value": {
              "Percents": "39.84375%",
              "Units": 0.3984375
            },
            "Signed": {
              "Percents": "146.875%",
              "Units": 1.46875
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 103,
              "sD": 94
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "104",
            "Signed": "95",
            "Hex": "68",
            "Bin": "1101000",
            "Laegna": "OAOE",
            "Wave": "OEOO"
          },
          "Wave": {
            "Num": "OEOO",
            "Digits": [
              1,
              3,
              1,
              1
            ],
            "Hex": "PP",
            "Bin": "OAAAOAOA"
          },
          "Laegna": {
            "Num": "OAOE",
            "Digits": [
              1,
              2,
              1,
              3
            ],
            "Hex": "OP",
            "Bin": "OAAOOAAA"
          },
          "Float": {
            "Num": "40%",
            "Value": {
              "Percents": "40.234375%",
              "Units": 0.40234375
            },
            "Signed": {
              "Percents": "148.4375%",
              "Units": 1.484375
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 104,
              "sD": 95
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "105",
            "Signed": "96",
            "Hex": "69",
            "Bin": "1101001",
            "Laegna": "OAAI",
            "Wave": "OEAA"
          },
          "Wave": {
            "Num": "OEAA",
            "Digits": [
              1,
              3,
              2,
              2
            ],
            "Hex": "PA",
            "Bin": "OAAAAOAO"
          },
          "Laegna": {
            "Num": "OAAI",
            "Digits": [
              1,
              2,
              2,
              0
            ],
            "Hex": "OC",
            "Bin": "OAAOAOOO"
          },
          "Float": {
            "Num": "40%",
            "Value": {
              "Percents": "40.625%",
              "Units": 0.40625
            },
            "Signed": {
              "Percents": "150.0%",
              "Units": 1.5
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 105,
              "sD": 96
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "106",
            "Signed": "97",
            "Hex": "6A",
            "Bin": "1101010",
            "Laegna": "OAAO",
            "Wave": "OEAI"
          },
          "Wave": {
            "Num": "OEAI",
            "Digits": [
              1,
              3,
              2,
              0
            ],
            "Hex": "PC",
            "Bin": "OAAAAOOO"
          },
          "Laegna": {
            "Num": "OAAO",
            "Digits": [
              1,
              2,
              2,
              1
            ],
            "Hex": "OB",
            "Bin": "OAAOAOOA"
          },
          "Float": {
            "Num": "41%",
            "Value": {
              "Percents": "41.015625%",
              "Units": 0.41015625
            },
            "Signed": {
              "Percents": "151.5625%",
              "Units": 1.515625
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 106,
              "sD": 97
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "107",
            "Signed": "98",
            "Hex": "6B",
            "Bin": "1101011",
            "Laegna": "OAAA",
            "Wave": "OEAE"
          },
          "Wave": {
            "Num": "OEAE",
            "Digits": [
              1,
              3,
              2,
              3
            ],
            "Hex": "PB",
            "Bin": "OAAAAOAA"
          },
          "Laegna": {
            "Num": "OAAA",
            "Digits": [
              1,
              2,
              2,
              2
            ],
            "Hex": "OA",
            "Bin": "OAAOAOAO"
          },
          "Float": {
            "Num": "41%",
            "Value": {
              "Percents": "41.40625%",
              "Units": 0.4140625
            },
            "Signed": {
              "Percents": "153.125%",
              "Units": 1.53125
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 107,
              "sD": 98
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "108",
            "Signed": "99",
            "Hex": "6C",
            "Bin": "1101100",
            "Laegna": "OAAE",
            "Wave": "OEAO"
          },
          "Wave": {
            "Num": "OEAO",
            "Digits": [
              1,
              3,
              2,
              1
            ],
            "Hex": "PB",
            "Bin": "OAAAAOOA"
          },
          "Laegna": {
            "Num": "OAAE",
            "Digits": [
              1,
              2,
              2,
              3
            ],
            "Hex": "OB",
            "Bin": "OAAOAOAA"
          },
          "Float": {
            "Num": "41%",
            "Value": {
              "Percents": "41.796875%",
              "Units": 0.41796875
            },
            "Signed": {
              "Percents": "154.6875%",
              "Units": 1.546875
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 108,
              "sD": 99
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "109",
            "Signed": "100",
            "Hex": "6D",
            "Bin": "1101101",
            "Laegna": "OAEI",
            "Wave": "OEEI"
          },
          "Wave": {
            "Num": "OEEI",
            "Digits": [
              1,
              3,
              3,
              0
            ],
            "Hex": "PG",
            "Bin": "OAAAAAOO"
          },
          "Laegna": {
            "Num": "OAEI",
            "Digits": [
              1,
              2,
              3,
              0
            ],
            "Hex": "OG",
            "Bin": "OAAOAAOO"
          },
          "Float": {
            "Num": "42%",
            "Value": {
              "Percents": "42.1875%",
              "Units": 0.421875
            },
            "Signed": {
              "Percents": "156.25%",
              "Units": 1.5625
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 109,
              "sD": 100
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "110",
            "Signed": "101",
            "Hex": "6E",
            "Bin": "1101110",
            "Laegna": "OAEO",
            "Wave": "OEEO"
          },
          "Wave": {
            "Num": "OEEO",
            "Digits": [
              1,
              3,
              3,
              1
            ],
            "Hex": "PF",
            "Bin": "OAAAAAOA"
          },
          "Laegna": {
            "Num": "OAEO",
            "Digits": [
              1,
              2,
              3,
              1
            ],
            "Hex": "OF",
            "Bin": "OAAOAAOA"
          },
          "Float": {
            "Num": "42%",
            "Value": {
              "Percents": "42.578125%",
              "Units": 0.42578125
            },
            "Signed": {
              "Percents": "157.8125%",
              "Units": 1.578125
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 110,
              "sD": 101
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "111",
            "Signed": "102",
            "Hex": "6F",
            "Bin": "1101111",
            "Laegna": "OAEA",
            "Wave": "OEEA"
          },
          "Wave": {
            "Num": "OEEA",
            "Digits": [
              1,
              3,
              3,
              2
            ],
            "Hex": "PE",
            "Bin": "OAAAAAAO"
          },
          "Laegna": {
            "Num": "OAEA",
            "Digits": [
              1,
              2,
              3,
              2
            ],
            "Hex": "OE",
            "Bin": "OAAOAAAO"
          },
          "Float": {
            "Num": "42%",
            "Value": {
              "Percents": "42.96875%",
              "Units": 0.4296875
            },
            "Signed": {
              "Percents": "159.375%",
              "Units": 1.59375
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 111,
              "sD": 102
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "112",
            "Signed": "103",
            "Hex": "70",
            "Bin": "1110000",
            "Laegna": "OAEE",
            "Wave": "OEEE"
          },
          "Wave": {
            "Num": "OEEE",
            "Digits": [
              1,
              3,
              3,
              3
            ],
            "Hex": "PF",
            "Bin": "OAAAAAAA"
          },
          "Laegna": {
            "Num": "OAEE",
            "Digits": [
              1,
              2,
              3,
              3
            ],
            "Hex": "OF",
            "Bin": "OAAOAAAA"
          },
          "Float": {
            "Num": "43%",
            "Value": {
              "Percents": "43.359375%",
              "Units": 0.43359375
            },
            "Signed": {
              "Percents": "160.9375%",
              "Units": 1.609375
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 112,
              "sD": 103
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "113",
            "Signed": "104",
            "Hex": "71",
            "Bin": "1110001",
            "Laegna": "OEII",
            "Wave": "OOAA"
          },
          "Wave": {
            "Num": "OOAA",
            "Digits": [
              1,
              1,
              2,
              2
            ],
            "Hex": "PA",
            "Bin": "OAOAAOAO"
          },
          "Laegna": {
            "Num": "OEII",
            "Digits": [
              1,
              3,
              0,
              0
            ],
            "Hex": "PK",
            "Bin": "OAAAOOOO"
          },
          "Float": {
            "Num": "43%",
            "Value": {
              "Percents": "43.75%",
              "Units": 0.4375
            },
            "Signed": {
              "Percents": "162.5%",
              "Units": 1.625
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 113,
              "sD": 104
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "114",
            "Signed": "105",
            "Hex": "72",
            "Bin": "1110010",
            "Laegna": "OEIO",
            "Wave": "OOAI"
          },
          "Wave": {
            "Num": "OOAI",
            "Digits": [
              1,
              1,
              2,
              0
            ],
            "Hex": "PC",
            "Bin": "OAOAAOOO"
          },
          "Laegna": {
            "Num": "OEIO",
            "Digits": [
              1,
              3,
              0,
              1
            ],
            "Hex": "PJ",
            "Bin": "OAAAOOOA"
          },
          "Float": {
            "Num": "44%",
            "Value": {
              "Percents": "44.140625%",
              "Units": 0.44140625
            },
            "Signed": {
              "Percents": "164.0625%",
              "Units": 1.640625
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 114,
              "sD": 105
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "115",
            "Signed": "106",
            "Hex": "73",
            "Bin": "1110011",
            "Laegna": "OEIA",
            "Wave": "OOAE"
          },
          "Wave": {
            "Num": "OOAE",
            "Digits": [
              1,
              1,
              2,
              3
            ],
            "Hex": "PB",
            "Bin": "OAOAAOAA"
          },
          "Laegna": {
            "Num": "OEIA",
            "Digits": [
              1,
              3,
              0,
              2
            ],
            "Hex": "PI",
            "Bin": "OAAAOOAO"
          },
          "Float": {
            "Num": "44%",
            "Value": {
              "Percents": "44.53125%",
              "Units": 0.4453125
            },
            "Signed": {
              "Percents": "165.625%",
              "Units": 1.65625
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 115,
              "sD": 106
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "116",
            "Signed": "107",
            "Hex": "74",
            "Bin": "1110100",
            "Laegna": "OEIE",
            "Wave": "OOAO"
          },
          "Wave": {
            "Num": "OOAO",
            "Digits": [
              1,
              1,
              2,
              1
            ],
            "Hex": "PB",
            "Bin": "OAOAAOOA"
          },
          "Laegna": {
            "Num": "OEIE",
            "Digits": [
              1,
              3,
              0,
              3
            ],
            "Hex": "PL",
            "Bin": "OAAAOOAA"
          },
          "Float": {
            "Num": "44%",
            "Value": {
              "Percents": "44.921875%",
              "Units": 0.44921875
            },
            "Signed": {
              "Percents": "167.1875%",
              "Units": 1.671875
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 116,
              "sD": 107
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "117",
            "Signed": "108",
            "Hex": "75",
            "Bin": "1110101",
            "Laegna": "OEOI",
            "Wave": "OOII"
          },
          "Wave": {
            "Num": "OOII",
            "Digits": [
              1,
              1,
              0,
              0
            ],
            "Hex": "PK",
            "Bin": "OAOAOOOO"
          },
          "Laegna": {
            "Num": "OEOI",
            "Digits": [
              1,
              3,
              1,
              0
            ],
            "Hex": "PQ",
            "Bin": "OAAAOAOO"
          },
          "Float": {
            "Num": "45%",
            "Value": {
              "Percents": "45.3125%",
              "Units": 0.453125
            },
            "Signed": {
              "Percents": "168.75%",
              "Units": 1.6875
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 117,
              "sD": 108
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "118",
            "Signed": "109",
            "Hex": "76",
            "Bin": "1110110",
            "Laegna": "OEOO",
            "Wave": "OOIO"
          },
          "Wave": {
            "Num": "OOIO",
            "Digits": [
              1,
              1,
              0,
              1
            ],
            "Hex": "PJ",
            "Bin": "OAOAOOOA"
          },
          "Laegna": {
            "Num": "OEOO",
            "Digits": [
              1,
              3,
              1,
              1
            ],
            "Hex": "PP",
            "Bin": "OAAAOAOA"
          },
          "Float": {
            "Num": "45%",
            "Value": {
              "Percents": "45.703125%",
              "Units": 0.45703125
            },
            "Signed": {
              "Percents": "170.3125%",
              "Units": 1.703125
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 118,
              "sD": 109
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "119",
            "Signed": "110",
            "Hex": "77",
            "Bin": "1110111",
            "Laegna": "OEOA",
            "Wave": "OOIA"
          },
          "Wave": {
            "Num": "OOIA",
            "Digits": [
              1,
              1,
              0,
              2
            ],
            "Hex": "PI",
            "Bin": "OAOAOOAO"
          },
          "Laegna": {
            "Num": "OEOA",
            "Digits": [
              1,
              3,
              1,
              2
            ],
            "Hex": "PO",
            "Bin": "OAAAOAAO"
          },
          "Float": {
            "Num": "46%",
            "Value": {
              "Percents": "46.09375%",
              "Units": 0.4609375
            },
            "Signed": {
              "Percents": "171.875%",
              "Units": 1.71875
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 119,
              "sD": 110
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "120",
            "Signed": "111",
            "Hex": "78",
            "Bin": "1111000",
            "Laegna": "OEOE",
            "Wave": "OOIE"
          },
          "Wave": {
            "Num": "OOIE",
            "Digits": [
              1,
              1,
              0,
              3
            ],
            "Hex": "PL",
            "Bin": "OAOAOOAA"
          },
          "Laegna": {
            "Num": "OEOE",
            "Digits": [
              1,
              3,
              1,
              3
            ],
            "Hex": "PP",
            "Bin": "OAAAOAAA"
          },
          "Float": {
            "Num": "46%",
            "Value": {
              "Percents": "46.484375%",
              "Units": 0.46484375
            },
            "Signed": {
              "Percents": "173.4375%",
              "Units": 1.734375
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 120,
              "sD": 111
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "121",
            "Signed": "112",
            "Hex": "79",
            "Bin": "1111001",
            "Laegna": "OEAI",
            "Wave": "OOEI"
          },
          "Wave": {
            "Num": "OOEI",
            "Digits": [
              1,
              1,
              3,
              0
            ],
            "Hex": "PG",
            "Bin": "OAOAAAOO"
          },
          "Laegna": {
            "Num": "OEAI",
            "Digits": [
              1,
              3,
              2,
              0
            ],
            "Hex": "PC",
            "Bin": "OAAAAOOO"
          },
          "Float": {
            "Num": "46%",
            "Value": {
              "Percents": "46.875%",
              "Units": 0.46875
            },
            "Signed": {
              "Percents": "175.0%",
              "Units": 1.75
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 121,
              "sD": 112
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "122",
            "Signed": "113",
            "Hex": "7A",
            "Bin": "1111010",
            "Laegna": "OEAO",
            "Wave": "OOEO"
          },
          "Wave": {
            "Num": "OOEO",
            "Digits": [
              1,
              1,
              3,
              1
            ],
            "Hex": "PF",
            "Bin": "OAOAAAOA"
          },
          "Laegna": {
            "Num": "OEAO",
            "Digits": [
              1,
              3,
              2,
              1
            ],
            "Hex": "PB",
            "Bin": "OAAAAOOA"
          },
          "Float": {
            "Num": "47%",
            "Value": {
              "Percents": "47.265625%",
              "Units": 0.47265625
            },
            "Signed": {
              "Percents": "176.5625%",
              "Units": 1.765625
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 122,
              "sD": 113
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "123",
            "Signed": "114",
            "Hex": "7B",
            "Bin": "1111011",
            "Laegna": "OEAA",
            "Wave": "OOEA"
          },
          "Wave": {
            "Num": "OOEA",
            "Digits": [
              1,
              1,
              3,
              2
            ],
            "Hex": "PE",
            "Bin": "OAOAAAAO"
          },
          "Laegna": {
            "Num": "OEAA",
            "Digits": [
              1,
              3,
              2,
              2
            ],
            "Hex": "PA",
            "Bin": "OAAAAOAO"
          },
          "Float": {
            "Num": "47%",
            "Value": {
              "Percents": "47.65625%",
              "Units": 0.4765625
            },
            "Signed": {
              "Percents": "178.125%",
              "Units": 1.78125
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 123,
              "sD": 114
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "124",
            "Signed": "115",
            "Hex": "7C",
            "Bin": "1111100",
            "Laegna": "OEAE",
            "Wave": "OOEE"
          },
          "Wave": {
            "Num": "OOEE",
            "Digits": [
              1,
              1,
              3,
              3
            ],
            "Hex": "PF",
            "Bin": "OAOAAAAA"
          },
          "Laegna": {
            "Num": "OEAE",
            "Digits": [
              1,
              3,
              2,
              3
            ],
            "Hex": "PB",
            "Bin": "OAAAAOAA"
          },
          "Float": {
            "Num": "48%",
            "Value": {
              "Percents": "48.046875%",
              "Units": 0.48046875
            },
            "Signed": {
              "Percents": "179.6875%",
              "Units": 1.796875
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 124,
              "sD": 115
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "125",
            "Signed": "116",
            "Hex": "7D",
            "Bin": "1111101",
            "Laegna": "OEEI",
            "Wave": "OOOA"
          },
          "Wave": {
            "Num": "OOOA",
            "Digits": [
              1,
              1,
              1,
              2
            ],
            "Hex": "PO",
            "Bin": "OAOAOAAO"
          },
          "Laegna": {
            "Num": "OEEI",
            "Digits": [
              1,
              3,
              3,
              0
            ],
            "Hex": "PG",
            "Bin": "OAAAAAOO"
          },
          "Float": {
            "Num": "48%",
            "Value": {
              "Percents": "48.4375%",
              "Units": 0.484375
            },
            "Signed": {
              "Percents": "181.25%",
              "Units": 1.8125
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 125,
              "sD": 116
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "126",
            "Signed": "117",
            "Hex": "7E",
            "Bin": "1111110",
            "Laegna": "OEEO",
            "Wave": "OOOI"
          },
          "Wave": {
            "Num": "OOOI",
            "Digits": [
              1,
              1,
              1,
              0
            ],
            "Hex": "PQ",
            "Bin": "OAOAOAOO"
          },
          "Laegna": {
            "Num": "OEEO",
            "Digits": [
              1,
              3,
              3,
              1
            ],
            "Hex": "PF",
            "Bin": "OAAAAAOA"
          },
          "Float": {
            "Num": "48%",
            "Value": {
              "Percents": "48.828125%",
              "Units": 0.48828125
            },
            "Signed": {
              "Percents": "182.8125%",
              "Units": 1.828125
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 126,
              "sD": 117
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "127",
            "Signed": "118",
            "Hex": "7F",
            "Bin": "1111111",
            "Laegna": "OEEA",
            "Wave": "OOOE"
          },
          "Wave": {
            "Num": "OOOE",
            "Digits": [
              1,
              1,
              1,
              3
            ],
            "Hex": "PP",
            "Bin": "OAOAOAAA"
          },
          "Laegna": {
            "Num": "OEEA",
            "Digits": [
              1,
              3,
              3,
              2
            ],
            "Hex": "PE",
            "Bin": "OAAAAAAO"
          },
          "Float": {
            "Num": "49%",
            "Value": {
              "Percents": "49.21875%",
              "Units": 0.4921875
            },
            "Signed": {
              "Percents": "184.375%",
              "Units": 1.84375
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 127,
              "sD": 118
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "128",
            "Signed": "119",
            "Hex": "80",
            "Bin": "10000000",
            "Laegna": "OEEE",
            "Wave": "OOOO"
          },
          "Wave": {
            "Num": "OOOO",
            "Digits": [
              1,
              1,
              1,
              1
            ],
            "Hex": "PP",
            "Bin": "OAOAOAOA"
          },
          "Laegna": {
            "Num": "OEEE",
            "Digits": [
              1,
              3,
              3,
              3
            ],
            "Hex": "PF",
            "Bin": "OAAAAAAA"
          },
          "Float": {
            "Num": "49%",
            "Value": {
              "Percents": "49.609375%",
              "Units": 0.49609375
            },
            "Signed": {
              "Percents": "185.9375%",
              "Units": 1.859375
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 7,
              "D": 128,
              "sD": 119
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": 128.5,
            "Signed": "-0",
            "Hex": null,
            "Bin": null,
            "Laegna": "VVVV",
            "Wave": "VVVV"
          },
          "Wave": {
            "Num": "VVVV",
            "Hex": "VV",
            "Bin": "VVVVVVVV"
          },
          "Laegna": {
            "Num": "VVVV",
            "Hex": "VV",
            "Bin": "VVVVVVVV"
          },
          "Float": {
            "Num": "50%",
            "Value": {
              "Percents": "50.0%",
              "Units": 0.5
            },
            "Signed": {
              "Percents": "0.0%",
              "Units": 0.0
            }
          },
          "Octave": {
            "Num": 7,
            "Lower": {
              "Num": 7,
              "Signed": 0,
              "D": 128,
              "sD": 0
            },
            "Higher": {
              "Num": 3,
              "Signed": 0
            }
          }
        },
        {
          "Decimal": {
            "Num": 128.5,
            "Signed": "+0",
            "Hex": null,
            "Bin": null,
            "Laegna": "UUUU",
            "Wave": "UUUU"
          },
          "Wave": {
            "Num": "UUUU",
            "Hex": "UU",
            "Bin": "UUUUUUUU"
          },
          "Laegna": {
            "Num": "UUUU",
            "Hex": "UU",
            "Bin": "UUUUUUUU"
          },
          "Float": {
            "Num": "50%",
            "Value": {
              "Percents": "50.0%",
              "Units": 0.5
            },
            "Signed": {
              "Percents": "0.0%",
              "Units": 0.0
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 0,
              "D": 129,
              "sD": 0
            },
            "Higher": {
              "Num": 3,
              "Signed": 0
            }
          }
        },
        {
          "Decimal": {
            "Num": "129",
            "Signed": "+1",
            "Hex": "81",
            "Bin": "10000001",
            "Laegna": "AIII",
            "Wave": "AAAA"
          },
          "Wave": {
            "Num": "AAAA",
            "Digits": [
              2,
              2,
              2,
              2
            ],
            "Hex": "AA",
            "Bin": "AOAOAOAO"
          },
          "Laegna": {
            "Num": "AIII",
            "Digits": [
              2,
              0,
              0,
              0
            ],
            "Hex": "CK",
            "Bin": "AOOOOOOO"
          },
          "Float": {
            "Num": "50%",
            "Value": {
              "Percents": "50.390625%",
              "Units": 0.50390625
            },
            "Signed": {
              "Percents": "1.5625%",
              "Units": 0.015625
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 0.5,
              "D": 129,
              "sD": 1
            },
            "Higher": {
              "Num": 3,
              "Signed": 0.25
            }
          }
        },
        {
          "Decimal": {
            "Num": "130",
            "Signed": "+2",
            "Hex": "82",
            "Bin": "10000010",
            "Laegna": "AIIO",
            "Wave": "AAAI"
          },
          "Wave": {
            "Num": "AAAI",
            "Digits": [
              2,
              2,
              2,
              0
            ],
            "Hex": "AC",
            "Bin": "AOAOAOOO"
          },
          "Laegna": {
            "Num": "AIIO",
            "Digits": [
              2,
              0,
              0,
              1
            ],
            "Hex": "CJ",
            "Bin": "AOOOOOOA"
          },
          "Float": {
            "Num": "50%",
            "Value": {
              "Percents": "50.78125%",
              "Units": 0.5078125
            },
            "Signed": {
              "Percents": "3.125%",
              "Units": 0.03125
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 1,
              "D": 130,
              "sD": 2
            },
            "Higher": {
              "Num": 3,
              "Signed": 0.25
            }
          }
        },
        {
          "Decimal": {
            "Num": "131",
            "Signed": "+3",
            "Hex": "83",
            "Bin": "10000011",
            "Laegna": "AIIA",
            "Wave": "AAAE"
          },
          "Wave": {
            "Num": "AAAE",
            "Digits": [
              2,
              2,
              2,
              3
            ],
            "Hex": "AB",
            "Bin": "AOAOAOAA"
          },
          "Laegna": {
            "Num": "AIIA",
            "Digits": [
              2,
              0,
              0,
              2
            ],
            "Hex": "CI",
            "Bin": "AOOOOOAO"
          },
          "Float": {
            "Num": "51%",
            "Value": {
              "Percents": "51.171875%",
              "Units": 0.51171875
            },
            "Signed": {
              "Percents": "4.6875%",
              "Units": 0.046875
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 2,
              "D": 131,
              "sD": 3
            },
            "Higher": {
              "Num": 3,
              "Signed": 0.5
            }
          }
        },
        {
          "Decimal": {
            "Num": "132",
            "Signed": "+4",
            "Hex": "84",
            "Bin": "10000100",
            "Laegna": "AIIE",
            "Wave": "AAAO"
          },
          "Wave": {
            "Num": "AAAO",
            "Digits": [
              2,
              2,
              2,
              1
            ],
            "Hex": "AB",
            "Bin": "AOAOAOOA"
          },
          "Laegna": {
            "Num": "AIIE",
            "Digits": [
              2,
              0,
              0,
              3
            ],
            "Hex": "CL",
            "Bin": "AOOOOOAA"
          },
          "Float": {
            "Num": "51%",
            "Value": {
              "Percents": "51.5625%",
              "Units": 0.515625
            },
            "Signed": {
              "Percents": "6.25%",
              "Units": 0.0625
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 2,
              "D": 132,
              "sD": 4
            },
            "Higher": {
              "Num": 3,
              "Signed": 1
            }
          }
        },
        {
          "Decimal": {
            "Num": "133",
            "Signed": "+5",
            "Hex": "85",
            "Bin": "10000101",
            "Laegna": "AIOI",
            "Wave": "AAII"
          },
          "Wave": {
            "Num": "AAII",
            "Digits": [
              2,
              2,
              0,
              0
            ],
            "Hex": "AK",
            "Bin": "AOAOOOOO"
          },
          "Laegna": {
            "Num": "AIOI",
            "Digits": [
              2,
              0,
              1,
              0
            ],
            "Hex": "CQ",
            "Bin": "AOOOOAOO"
          },
          "Float": {
            "Num": "51%",
            "Value": {
              "Percents": "51.953125%",
              "Units": 0.51953125
            },
            "Signed": {
              "Percents": "7.8125%",
              "Units": 0.078125
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 3,
              "D": 133,
              "sD": 5
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "134",
            "Signed": "+6",
            "Hex": "86",
            "Bin": "10000110",
            "Laegna": "AIOO",
            "Wave": "AAIO"
          },
          "Wave": {
            "Num": "AAIO",
            "Digits": [
              2,
              2,
              0,
              1
            ],
            "Hex": "AJ",
            "Bin": "AOAOOOOA"
          },
          "Laegna": {
            "Num": "AIOO",
            "Digits": [
              2,
              0,
              1,
              1
            ],
            "Hex": "CP",
            "Bin": "AOOOOAOA"
          },
          "Float": {
            "Num": "52%",
            "Value": {
              "Percents": "52.34375%",
              "Units": 0.5234375
            },
            "Signed": {
              "Percents": "9.375%",
              "Units": 0.09375
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 3,
              "D": 134,
              "sD": 6
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "135",
            "Signed": "+7",
            "Hex": "87",
            "Bin": "10000111",
            "Laegna": "AIOA",
            "Wave": "AAIA"
          },
          "Wave": {
            "Num": "AAIA",
            "Digits": [
              2,
              2,
              0,
              2
            ],
            "Hex": "AI",
            "Bin": "AOAOOOAO"
          },
          "Laegna": {
            "Num": "AIOA",
            "Digits": [
              2,
              0,
              1,
              2
            ],
            "Hex": "CO",
            "Bin": "AOOOOAAO"
          },
          "Float": {
            "Num": "52%",
            "Value": {
              "Percents": "52.734375%",
              "Units": 0.52734375
            },
            "Signed": {
              "Percents": "10.9375%",
              "Units": 0.109375
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 3,
              "D": 135,
              "sD": 7
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "136",
            "Signed": "+8",
            "Hex": "88",
            "Bin": "10001000",
            "Laegna": "AIOE",
            "Wave": "AAIE"
          },
          "Wave": {
            "Num": "AAIE",
            "Digits": [
              2,
              2,
              0,
              3
            ],
            "Hex": "AL",
            "Bin": "AOAOOOAA"
          },
          "Laegna": {
            "Num": "AIOE",
            "Digits": [
              2,
              0,
              1,
              3
            ],
            "Hex": "CP",
            "Bin": "AOOOOAAA"
          },
          "Float": {
            "Num": "53%",
            "Value": {
              "Percents": "53.125%",
              "Units": 0.53125
            },
            "Signed": {
              "Percents": "12.5%",
              "Units": 0.125
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 3,
              "D": 136,
              "sD": 8
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "137",
            "Signed": "+9",
            "Hex": "89",
            "Bin": "10001001",
            "Laegna": "AIAI",
            "Wave": "AAEI"
          },
          "Wave": {
            "Num": "AAEI",
            "Digits": [
              2,
              2,
              3,
              0
            ],
            "Hex": "AG",
            "Bin": "AOAOAAOO"
          },
          "Laegna": {
            "Num": "AIAI",
            "Digits": [
              2,
              0,
              2,
              0
            ],
            "Hex": "CC",
            "Bin": "AOOOAOOO"
          },
          "Float": {
            "Num": "53%",
            "Value": {
              "Percents": "53.515625%",
              "Units": 0.53515625
            },
            "Signed": {
              "Percents": "14.0625%",
              "Units": 0.140625
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 4,
              "D": 137,
              "sD": 9
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "138",
            "Signed": "+10",
            "Hex": "8A",
            "Bin": "10001010",
            "Laegna": "AIAO",
            "Wave": "AAEO"
          },
          "Wave": {
            "Num": "AAEO",
            "Digits": [
              2,
              2,
              3,
              1
            ],
            "Hex": "AF",
            "Bin": "AOAOAAOA"
          },
          "Laegna": {
            "Num": "AIAO",
            "Digits": [
              2,
              0,
              2,
              1
            ],
            "Hex": "CB",
            "Bin": "AOOOAOOA"
          },
          "Float": {
            "Num": "53%",
            "Value": {
              "Percents": "53.90625%",
              "Units": 0.5390625
            },
            "Signed": {
              "Percents": "15.625%",
              "Units": 0.15625
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 4,
              "D": 138,
              "sD": 10
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "139",
            "Signed": "+11",
            "Hex": "8B",
            "Bin": "10001011",
            "Laegna": "AIAA",
            "Wave": "AAEA"
          },
          "Wave": {
            "Num": "AAEA",
            "Digits": [
              2,
              2,
              3,
              2
            ],
            "Hex": "AE",
            "Bin": "AOAOAAAO"
          },
          "Laegna": {
            "Num": "AIAA",
            "Digits": [
              2,
              0,
              2,
              2
            ],
            "Hex": "CA",
            "Bin": "AOOOAOAO"
          },
          "Float": {
            "Num": "54%",
            "Value": {
              "Percents": "54.296875%",
              "Units": 0.54296875
            },
            "Signed": {
              "Percents": "17.1875%",
              "Units": 0.171875
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 4,
              "D": 139,
              "sD": 11
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "140",
            "Signed": "+12",
            "Hex": "8C",
            "Bin": "10001100",
            "Laegna": "AIAE",
            "Wave": "AAEE"
          },
          "Wave": {
            "Num": "AAEE",
            "Digits": [
              2,
              2,
              3,
              3
            ],
            "Hex": "AF",
            "Bin": "AOAOAAAA"
          },
          "Laegna": {
            "Num": "AIAE",
            "Digits": [
              2,
              0,
              2,
              3
            ],
            "Hex": "CB",
            "Bin": "AOOOAOAA"
          },
          "Float": {
            "Num": "54%",
            "Value": {
              "Percents": "54.6875%",
              "Units": 0.546875
            },
            "Signed": {
              "Percents": "18.75%",
              "Units": 0.1875
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 4,
              "D": 140,
              "sD": 12
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "141",
            "Signed": "+13",
            "Hex": "8D",
            "Bin": "10001101",
            "Laegna": "AIEI",
            "Wave": "AAOA"
          },
          "Wave": {
            "Num": "AAOA",
            "Digits": [
              2,
              2,
              1,
              2
            ],
            "Hex": "AO",
            "Bin": "AOAOOAAO"
          },
          "Laegna": {
            "Num": "AIEI",
            "Digits": [
              2,
              0,
              3,
              0
            ],
            "Hex": "CG",
            "Bin": "AOOOAAOO"
          },
          "Float": {
            "Num": "55%",
            "Value": {
              "Percents": "55.078125%",
              "Units": 0.55078125
            },
            "Signed": {
              "Percents": "20.3125%",
              "Units": 0.203125
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 4,
              "D": 141,
              "sD": 13
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "142",
            "Signed": "+14",
            "Hex": "8E",
            "Bin": "10001110",
            "Laegna": "AIEO",
            "Wave": "AAOI"
          },
          "Wave": {
            "Num": "AAOI",
            "Digits": [
              2,
              2,
              1,
              0
            ],
            "Hex": "AQ",
            "Bin": "AOAOOAOO"
          },
          "Laegna": {
            "Num": "AIEO",
            "Digits": [
              2,
              0,
              3,
              1
            ],
            "Hex": "CF",
            "Bin": "AOOOAAOA"
          },
          "Float": {
            "Num": "55%",
            "Value": {
              "Percents": "55.46875%",
              "Units": 0.5546875
            },
            "Signed": {
              "Percents": "21.875%",
              "Units": 0.21875
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 4,
              "D": 142,
              "sD": 14
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "143",
            "Signed": "+15",
            "Hex": "8F",
            "Bin": "10001111",
            "Laegna": "AIEA",
            "Wave": "AAOE"
          },
          "Wave": {
            "Num": "AAOE",
            "Digits": [
              2,
              2,
              1,
              3
            ],
            "Hex": "AP",
            "Bin": "AOAOOAAA"
          },
          "Laegna": {
            "Num": "AIEA",
            "Digits": [
              2,
              0,
              3,
              2
            ],
            "Hex": "CE",
            "Bin": "AOOOAAAO"
          },
          "Float": {
            "Num": "55%",
            "Value": {
              "Percents": "55.859375%",
              "Units": 0.55859375
            },
            "Signed": {
              "Percents": "23.4375%",
              "Units": 0.234375
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 4,
              "D": 143,
              "sD": 15
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "144",
            "Signed": "+16",
            "Hex": "90",
            "Bin": "10010000",
            "Laegna": "AIEE",
            "Wave": "AAOO"
          },
          "Wave": {
            "Num": "AAOO",
            "Digits": [
              2,
              2,
              1,
              1
            ],
            "Hex": "AP",
            "Bin": "AOAOOAOA"
          },
          "Laegna": {
            "Num": "AIEE",
            "Digits": [
              2,
              0,
              3,
              3
            ],
            "Hex": "CF",
            "Bin": "AOOOAAAA"
          },
          "Float": {
            "Num": "56%",
            "Value": {
              "Percents": "56.25%",
              "Units": 0.5625
            },
            "Signed": {
              "Percents": "25.0%",
              "Units": 0.25
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 4,
              "D": 144,
              "sD": 16
            },
            "Higher": {
              "Num": 3,
              "Signed": 2
            }
          }
        },
        {
          "Decimal": {
            "Num": "145",
            "Signed": "+17",
            "Hex": "91",
            "Bin": "10010001",
            "Laegna": "AOII",
            "Wave": "AIII"
          },
          "Wave": {
            "Num": "AIII",
            "Digits": [
              2,
              0,
              0,
              0
            ],
            "Hex": "CK",
            "Bin": "AOOOOOOO"
          },
          "Laegna": {
            "Num": "AOII",
            "Digits": [
              2,
              1,
              0,
              0
            ],
            "Hex": "BK",
            "Bin": "AOOAOOOO"
          },
          "Float": {
            "Num": "56%",
            "Value": {
              "Percents": "56.640625%",
              "Units": 0.56640625
            },
            "Signed": {
              "Percents": "26.5625%",
              "Units": 0.265625
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 5,
              "D": 145,
              "sD": 17
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "146",
            "Signed": "+18",
            "Hex": "92",
            "Bin": "10010010",
            "Laegna": "AOIO",
            "Wave": "AIIO"
          },
          "Wave": {
            "Num": "AIIO",
            "Digits": [
              2,
              0,
              0,
              1
            ],
            "Hex": "CJ",
            "Bin": "AOOOOOOA"
          },
          "Laegna": {
            "Num": "AOIO",
            "Digits": [
              2,
              1,
              0,
              1
            ],
            "Hex": "BJ",
            "Bin": "AOOAOOOA"
          },
          "Float": {
            "Num": "57%",
            "Value": {
              "Percents": "57.03125%",
              "Units": 0.5703125
            },
            "Signed": {
              "Percents": "28.125%",
              "Units": 0.28125
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 5,
              "D": 146,
              "sD": 18
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "147",
            "Signed": "+19",
            "Hex": "93",
            "Bin": "10010011",
            "Laegna": "AOIA",
            "Wave": "AIIA"
          },
          "Wave": {
            "Num": "AIIA",
            "Digits": [
              2,
              0,
              0,
              2
            ],
            "Hex": "CI",
            "Bin": "AOOOOOAO"
          },
          "Laegna": {
            "Num": "AOIA",
            "Digits": [
              2,
              1,
              0,
              2
            ],
            "Hex": "BI",
            "Bin": "AOOAOOAO"
          },
          "Float": {
            "Num": "57%",
            "Value": {
              "Percents": "57.421875%",
              "Units": 0.57421875
            },
            "Signed": {
              "Percents": "29.6875%",
              "Units": 0.296875
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 5,
              "D": 147,
              "sD": 19
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "148",
            "Signed": "+20",
            "Hex": "94",
            "Bin": "10010100",
            "Laegna": "AOIE",
            "Wave": "AIIE"
          },
          "Wave": {
            "Num": "AIIE",
            "Digits": [
              2,
              0,
              0,
              3
            ],
            "Hex": "CL",
            "Bin": "AOOOOOAA"
          },
          "Laegna": {
            "Num": "AOIE",
            "Digits": [
              2,
              1,
              0,
              3
            ],
            "Hex": "BL",
            "Bin": "AOOAOOAA"
          },
          "Float": {
            "Num": "57%",
            "Value": {
              "Percents": "57.8125%",
              "Units": 0.578125
            },
            "Signed": {
              "Percents": "31.25%",
              "Units": 0.3125
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 5,
              "D": 148,
              "sD": 20
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "149",
            "Signed": "+21",
            "Hex": "95",
            "Bin": "10010101",
            "Laegna": "AOOI",
            "Wave": "AIOA"
          },
          "Wave": {
            "Num": "AIOA",
            "Digits": [
              2,
              0,
              1,
              2
            ],
            "Hex": "CO",
            "Bin": "AOOOOAAO"
          },
          "Laegna": {
            "Num": "AOOI",
            "Digits": [
              2,
              1,
              1,
              0
            ],
            "Hex": "BQ",
            "Bin": "AOOAOAOO"
          },
          "Float": {
            "Num": "58%",
            "Value": {
              "Percents": "58.203125%",
              "Units": 0.58203125
            },
            "Signed": {
              "Percents": "32.8125%",
              "Units": 0.328125
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 5,
              "D": 149,
              "sD": 21
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "150",
            "Signed": "+22",
            "Hex": "96",
            "Bin": "10010110",
            "Laegna": "AOOO",
            "Wave": "AIOI"
          },
          "Wave": {
            "Num": "AIOI",
            "Digits": [
              2,
              0,
              1,
              0
            ],
            "Hex": "CQ",
            "Bin": "AOOOOAOO"
          },
          "Laegna": {
            "Num": "AOOO",
            "Digits": [
              2,
              1,
              1,
              1
            ],
            "Hex": "BP",
            "Bin": "AOOAOAOA"
          },
          "Float": {
            "Num": "58%",
            "Value": {
              "Percents": "58.59375%",
              "Units": 0.5859375
            },
            "Signed": {
              "Percents": "34.375%",
              "Units": 0.34375
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 5,
              "D": 150,
              "sD": 22
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "151",
            "Signed": "+23",
            "Hex": "97",
            "Bin": "10010111",
            "Laegna": "AOOA",
            "Wave": "AIOE"
          },
          "Wave": {
            "Num": "AIOE",
            "Digits": [
              2,
              0,
              1,
              3
            ],
            "Hex": "CP",
            "Bin": "AOOOOAAA"
          },
          "Laegna": {
            "Num": "AOOA",
            "Digits": [
              2,
              1,
              1,
              2
            ],
            "Hex": "BO",
            "Bin": "AOOAOAAO"
          },
          "Float": {
            "Num": "58%",
            "Value": {
              "Percents": "58.984375%",
              "Units": 0.58984375
            },
            "Signed": {
              "Percents": "35.9375%",
              "Units": 0.359375
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 5,
              "D": 151,
              "sD": 23
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "152",
            "Signed": "+24",
            "Hex": "98",
            "Bin": "10011000",
            "Laegna": "AOOE",
            "Wave": "AIOO"
          },
          "Wave": {
            "Num": "AIOO",
            "Digits": [
              2,
              0,
              1,
              1
            ],
            "Hex": "CP",
            "Bin": "AOOOOAOA"
          },
          "Laegna": {
            "Num": "AOOE",
            "Digits": [
              2,
              1,
              1,
              3
            ],
            "Hex": "BP",
            "Bin": "AOOAOAAA"
          },
          "Float": {
            "Num": "59%",
            "Value": {
              "Percents": "59.375%",
              "Units": 0.59375
            },
            "Signed": {
              "Percents": "37.5%",
              "Units": 0.375
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 5,
              "D": 152,
              "sD": 24
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "153",
            "Signed": "+25",
            "Hex": "99",
            "Bin": "10011001",
            "Laegna": "AOAI",
            "Wave": "AIAA"
          },
          "Wave": {
            "Num": "AIAA",
            "Digits": [
              2,
              0,
              2,
              2
            ],
            "Hex": "CA",
            "Bin": "AOOOAOAO"
          },
          "Laegna": {
            "Num": "AOAI",
            "Digits": [
              2,
              1,
              2,
              0
            ],
            "Hex": "BC",
            "Bin": "AOOAAOOO"
          },
          "Float": {
            "Num": "59%",
            "Value": {
              "Percents": "59.765625%",
              "Units": 0.59765625
            },
            "Signed": {
              "Percents": "39.0625%",
              "Units": 0.390625
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 5,
              "D": 153,
              "sD": 25
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "154",
            "Signed": "+26",
            "Hex": "9A",
            "Bin": "10011010",
            "Laegna": "AOAO",
            "Wave": "AIAI"
          },
          "Wave": {
            "Num": "AIAI",
            "Digits": [
              2,
              0,
              2,
              0
            ],
            "Hex": "CC",
            "Bin": "AOOOAOOO"
          },
          "Laegna": {
            "Num": "AOAO",
            "Digits": [
              2,
              1,
              2,
              1
            ],
            "Hex": "BB",
            "Bin": "AOOAAOOA"
          },
          "Float": {
            "Num": "60%",
            "Value": {
              "Percents": "60.15625%",
              "Units": 0.6015625
            },
            "Signed": {
              "Percents": "40.625%",
              "Units": 0.40625
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 5,
              "D": 154,
              "sD": 26
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "155",
            "Signed": "+27",
            "Hex": "9B",
            "Bin": "10011011",
            "Laegna": "AOAA",
            "Wave": "AIAE"
          },
          "Wave": {
            "Num": "AIAE",
            "Digits": [
              2,
              0,
              2,
              3
            ],
            "Hex": "CB",
            "Bin": "AOOOAOAA"
          },
          "Laegna": {
            "Num": "AOAA",
            "Digits": [
              2,
              1,
              2,
              2
            ],
            "Hex": "BA",
            "Bin": "AOOAAOAO"
          },
          "Float": {
            "Num": "60%",
            "Value": {
              "Percents": "60.546875%",
              "Units": 0.60546875
            },
            "Signed": {
              "Percents": "42.1875%",
              "Units": 0.421875
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 5,
              "D": 155,
              "sD": 27
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "156",
            "Signed": "+28",
            "Hex": "9C",
            "Bin": "10011100",
            "Laegna": "AOAE",
            "Wave": "AIAO"
          },
          "Wave": {
            "Num": "AIAO",
            "Digits": [
              2,
              0,
              2,
              1
            ],
            "Hex": "CB",
            "Bin": "AOOOAOOA"
          },
          "Laegna": {
            "Num": "AOAE",
            "Digits": [
              2,
              1,
              2,
              3
            ],
            "Hex": "BB",
            "Bin": "AOOAAOAA"
          },
          "Float": {
            "Num": "60%",
            "Value": {
              "Percents": "60.9375%",
              "Units": 0.609375
            },
            "Signed": {
              "Percents": "43.75%",
              "Units": 0.4375
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 5,
              "D": 156,
              "sD": 28
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "157",
            "Signed": "+29",
            "Hex": "9D",
            "Bin": "10011101",
            "Laegna": "AOEI",
            "Wave": "AIEI"
          },
          "Wave": {
            "Num": "AIEI",
            "Digits": [
              2,
              0,
              3,
              0
            ],
            "Hex": "CG",
            "Bin": "AOOOAAOO"
          },
          "Laegna": {
            "Num": "AOEI",
            "Digits": [
              2,
              1,
              3,
              0
            ],
            "Hex": "BG",
            "Bin": "AOOAAAOO"
          },
          "Float": {
            "Num": "61%",
            "Value": {
              "Percents": "61.328125%",
              "Units": 0.61328125
            },
            "Signed": {
              "Percents": "45.3125%",
              "Units": 0.453125
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 5,
              "D": 157,
              "sD": 29
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "158",
            "Signed": "+30",
            "Hex": "9E",
            "Bin": "10011110",
            "Laegna": "AOEO",
            "Wave": "AIEO"
          },
          "Wave": {
            "Num": "AIEO",
            "Digits": [
              2,
              0,
              3,
              1
            ],
            "Hex": "CF",
            "Bin": "AOOOAAOA"
          },
          "Laegna": {
            "Num": "AOEO",
            "Digits": [
              2,
              1,
              3,
              1
            ],
            "Hex": "BF",
            "Bin": "AOOAAAOA"
          },
          "Float": {
            "Num": "61%",
            "Value": {
              "Percents": "61.71875%",
              "Units": 0.6171875
            },
            "Signed": {
              "Percents": "46.875%",
              "Units": 0.46875
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 5,
              "D": 158,
              "sD": 30
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "159",
            "Signed": "+31",
            "Hex": "9F",
            "Bin": "10011111",
            "Laegna": "AOEA",
            "Wave": "AIEA"
          },
          "Wave": {
            "Num": "AIEA",
            "Digits": [
              2,
              0,
              3,
              2
            ],
            "Hex": "CE",
            "Bin": "AOOOAAAO"
          },
          "Laegna": {
            "Num": "AOEA",
            "Digits": [
              2,
              1,
              3,
              2
            ],
            "Hex": "BE",
            "Bin": "AOOAAAAO"
          },
          "Float": {
            "Num": "62%",
            "Value": {
              "Percents": "62.109375%",
              "Units": 0.62109375
            },
            "Signed": {
              "Percents": "48.4375%",
              "Units": 0.484375
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 5,
              "D": 159,
              "sD": 31
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "160",
            "Signed": "+32",
            "Hex": "A0",
            "Bin": "10100000",
            "Laegna": "AOEE",
            "Wave": "AIEE"
          },
          "Wave": {
            "Num": "AIEE",
            "Digits": [
              2,
              0,
              3,
              3
            ],
            "Hex": "CF",
            "Bin": "AOOOAAAA"
          },
          "Laegna": {
            "Num": "AOEE",
            "Digits": [
              2,
              1,
              3,
              3
            ],
            "Hex": "BF",
            "Bin": "AOOAAAAA"
          },
          "Float": {
            "Num": "62%",
            "Value": {
              "Percents": "62.5%",
              "Units": 0.625
            },
            "Signed": {
              "Percents": "50.0%",
              "Units": 0.5
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 5,
              "D": 160,
              "sD": 32
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "161",
            "Signed": "+33",
            "Hex": "A1",
            "Bin": "10100001",
            "Laegna": "AAII",
            "Wave": "AEII"
          },
          "Wave": {
            "Num": "AEII",
            "Digits": [
              2,
              3,
              0,
              0
            ],
            "Hex": "BK",
            "Bin": "AOAAOOOO"
          },
          "Laegna": {
            "Num": "AAII",
            "Digits": [
              2,
              2,
              0,
              0
            ],
            "Hex": "AK",
            "Bin": "AOAOOOOO"
          },
          "Float": {
            "Num": "62%",
            "Value": {
              "Percents": "62.890625%",
              "Units": 0.62890625
            },
            "Signed": {
              "Percents": "51.5625%",
              "Units": 0.515625
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 6,
              "D": 161,
              "sD": 33
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "162",
            "Signed": "+34",
            "Hex": "A2",
            "Bin": "10100010",
            "Laegna": "AAIO",
            "Wave": "AEIO"
          },
          "Wave": {
            "Num": "AEIO",
            "Digits": [
              2,
              3,
              0,
              1
            ],
            "Hex": "BJ",
            "Bin": "AOAAOOOA"
          },
          "Laegna": {
            "Num": "AAIO",
            "Digits": [
              2,
              2,
              0,
              1
            ],
            "Hex": "AJ",
            "Bin": "AOAOOOOA"
          },
          "Float": {
            "Num": "63%",
            "Value": {
              "Percents": "63.28125%",
              "Units": 0.6328125
            },
            "Signed": {
              "Percents": "53.125%",
              "Units": 0.53125
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 6,
              "D": 162,
              "sD": 34
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "163",
            "Signed": "+35",
            "Hex": "A3",
            "Bin": "10100011",
            "Laegna": "AAIA",
            "Wave": "AEIA"
          },
          "Wave": {
            "Num": "AEIA",
            "Digits": [
              2,
              3,
              0,
              2
            ],
            "Hex": "BI",
            "Bin": "AOAAOOAO"
          },
          "Laegna": {
            "Num": "AAIA",
            "Digits": [
              2,
              2,
              0,
              2
            ],
            "Hex": "AI",
            "Bin": "AOAOOOAO"
          },
          "Float": {
            "Num": "63%",
            "Value": {
              "Percents": "63.671875%",
              "Units": 0.63671875
            },
            "Signed": {
              "Percents": "54.6875%",
              "Units": 0.546875
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 6,
              "D": 163,
              "sD": 35
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "164",
            "Signed": "+36",
            "Hex": "A4",
            "Bin": "10100100",
            "Laegna": "AAIE",
            "Wave": "AEIE"
          },
          "Wave": {
            "Num": "AEIE",
            "Digits": [
              2,
              3,
              0,
              3
            ],
            "Hex": "BL",
            "Bin": "AOAAOOAA"
          },
          "Laegna": {
            "Num": "AAIE",
            "Digits": [
              2,
              2,
              0,
              3
            ],
            "Hex": "AL",
            "Bin": "AOAOOOAA"
          },
          "Float": {
            "Num": "64%",
            "Value": {
              "Percents": "64.0625%",
              "Units": 0.640625
            },
            "Signed": {
              "Percents": "56.25%",
              "Units": 0.5625
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 6,
              "D": 164,
              "sD": 36
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "165",
            "Signed": "+37",
            "Hex": "A5",
            "Bin": "10100101",
            "Laegna": "AAOI",
            "Wave": "AEOA"
          },
          "Wave": {
            "Num": "AEOA",
            "Digits": [
              2,
              3,
              1,
              2
            ],
            "Hex": "BO",
            "Bin": "AOAAOAAO"
          },
          "Laegna": {
            "Num": "AAOI",
            "Digits": [
              2,
              2,
              1,
              0
            ],
            "Hex": "AQ",
            "Bin": "AOAOOAOO"
          },
          "Float": {
            "Num": "64%",
            "Value": {
              "Percents": "64.453125%",
              "Units": 0.64453125
            },
            "Signed": {
              "Percents": "57.8125%",
              "Units": 0.578125
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 6,
              "D": 165,
              "sD": 37
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "166",
            "Signed": "+38",
            "Hex": "A6",
            "Bin": "10100110",
            "Laegna": "AAOO",
            "Wave": "AEOI"
          },
          "Wave": {
            "Num": "AEOI",
            "Digits": [
              2,
              3,
              1,
              0
            ],
            "Hex": "BQ",
            "Bin": "AOAAOAOO"
          },
          "Laegna": {
            "Num": "AAOO",
            "Digits": [
              2,
              2,
              1,
              1
            ],
            "Hex": "AP",
            "Bin": "AOAOOAOA"
          },
          "Float": {
            "Num": "64%",
            "Value": {
              "Percents": "64.84375%",
              "Units": 0.6484375
            },
            "Signed": {
              "Percents": "59.375%",
              "Units": 0.59375
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 6,
              "D": 166,
              "sD": 38
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "167",
            "Signed": "+39",
            "Hex": "A7",
            "Bin": "10100111",
            "Laegna": "AAOA",
            "Wave": "AEOE"
          },
          "Wave": {
            "Num": "AEOE",
            "Digits": [
              2,
              3,
              1,
              3
            ],
            "Hex": "BP",
            "Bin": "AOAAOAAA"
          },
          "Laegna": {
            "Num": "AAOA",
            "Digits": [
              2,
              2,
              1,
              2
            ],
            "Hex": "AO",
            "Bin": "AOAOOAAO"
          },
          "Float": {
            "Num": "65%",
            "Value": {
              "Percents": "65.234375%",
              "Units": 0.65234375
            },
            "Signed": {
              "Percents": "60.9375%",
              "Units": 0.609375
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 6,
              "D": 167,
              "sD": 39
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "168",
            "Signed": "+40",
            "Hex": "A8",
            "Bin": "10101000",
            "Laegna": "AAOE",
            "Wave": "AEOO"
          },
          "Wave": {
            "Num": "AEOO",
            "Digits": [
              2,
              3,
              1,
              1
            ],
            "Hex": "BP",
            "Bin": "AOAAOAOA"
          },
          "Laegna": {
            "Num": "AAOE",
            "Digits": [
              2,
              2,
              1,
              3
            ],
            "Hex": "AP",
            "Bin": "AOAOOAAA"
          },
          "Float": {
            "Num": "65%",
            "Value": {
              "Percents": "65.625%",
              "Units": 0.65625
            },
            "Signed": {
              "Percents": "62.5%",
              "Units": 0.625
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 6,
              "D": 168,
              "sD": 40
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "169",
            "Signed": "+41",
            "Hex": "A9",
            "Bin": "10101001",
            "Laegna": "AAAI",
            "Wave": "AEAA"
          },
          "Wave": {
            "Num": "AEAA",
            "Digits": [
              2,
              3,
              2,
              2
            ],
            "Hex": "BA",
            "Bin": "AOAAAOAO"
          },
          "Laegna": {
            "Num": "AAAI",
            "Digits": [
              2,
              2,
              2,
              0
            ],
            "Hex": "AC",
            "Bin": "AOAOAOOO"
          },
          "Float": {
            "Num": "66%",
            "Value": {
              "Percents": "66.015625%",
              "Units": 0.66015625
            },
            "Signed": {
              "Percents": "64.0625%",
              "Units": 0.640625
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 6,
              "D": 169,
              "sD": 41
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "170",
            "Signed": "+42",
            "Hex": "AA",
            "Bin": "10101010",
            "Laegna": "AAAO",
            "Wave": "AEAI"
          },
          "Wave": {
            "Num": "AEAI",
            "Digits": [
              2,
              3,
              2,
              0
            ],
            "Hex": "BC",
            "Bin": "AOAAAOOO"
          },
          "Laegna": {
            "Num": "AAAO",
            "Digits": [
              2,
              2,
              2,
              1
            ],
            "Hex": "AB",
            "Bin": "AOAOAOOA"
          },
          "Float": {
            "Num": "66%",
            "Value": {
              "Percents": "66.40625%",
              "Units": 0.6640625
            },
            "Signed": {
              "Percents": "65.625%",
              "Units": 0.65625
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 6,
              "D": 170,
              "sD": 42
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "171",
            "Signed": "+43",
            "Hex": "AB",
            "Bin": "10101011",
            "Laegna": "AAAA",
            "Wave": "AEAE"
          },
          "Wave": {
            "Num": "AEAE",
            "Digits": [
              2,
              3,
              2,
              3
            ],
            "Hex": "BB",
            "Bin": "AOAAAOAA"
          },
          "Laegna": {
            "Num": "AAAA",
            "Digits": [
              2,
              2,
              2,
              2
            ],
            "Hex": "AA",
            "Bin": "AOAOAOAO"
          },
          "Float": {
            "Num": "66%",
            "Value": {
              "Percents": "66.796875%",
              "Units": 0.66796875
            },
            "Signed": {
              "Percents": "67.1875%",
              "Units": 0.671875
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 6,
              "D": 171,
              "sD": 43
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "172",
            "Signed": "+44",
            "Hex": "AC",
            "Bin": "10101100",
            "Laegna": "AAAE",
            "Wave": "AEAO"
          },
          "Wave": {
            "Num": "AEAO",
            "Digits": [
              2,
              3,
              2,
              1
            ],
            "Hex": "BB",
            "Bin": "AOAAAOOA"
          },
          "Laegna": {
            "Num": "AAAE",
            "Digits": [
              2,
              2,
              2,
              3
            ],
            "Hex": "AB",
            "Bin": "AOAOAOAA"
          },
          "Float": {
            "Num": "67%",
            "Value": {
              "Percents": "67.1875%",
              "Units": 0.671875
            },
            "Signed": {
              "Percents": "68.75%",
              "Units": 0.6875
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 6,
              "D": 172,
              "sD": 44
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "173",
            "Signed": "+45",
            "Hex": "AD",
            "Bin": "10101101",
            "Laegna": "AAEI",
            "Wave": "AEEI"
          },
          "Wave": {
            "Num": "AEEI",
            "Digits": [
              2,
              3,
              3,
              0
            ],
            "Hex": "BG",
            "Bin": "AOAAAAOO"
          },
          "Laegna": {
            "Num": "AAEI",
            "Digits": [
              2,
              2,
              3,
              0
            ],
            "Hex": "AG",
            "Bin": "AOAOAAOO"
          },
          "Float": {
            "Num": "67%",
            "Value": {
              "Percents": "67.578125%",
              "Units": 0.67578125
            },
            "Signed": {
              "Percents": "70.3125%",
              "Units": 0.703125
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 6,
              "D": 173,
              "sD": 45
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "174",
            "Signed": "+46",
            "Hex": "AE",
            "Bin": "10101110",
            "Laegna": "AAEO",
            "Wave": "AEEO"
          },
          "Wave": {
            "Num": "AEEO",
            "Digits": [
              2,
              3,
              3,
              1
            ],
            "Hex": "BF",
            "Bin": "AOAAAAOA"
          },
          "Laegna": {
            "Num": "AAEO",
            "Digits": [
              2,
              2,
              3,
              1
            ],
            "Hex": "AF",
            "Bin": "AOAOAAOA"
          },
          "Float": {
            "Num": "67%",
            "Value": {
              "Percents": "67.96875%",
              "Units": 0.6796875
            },
            "Signed": {
              "Percents": "71.875%",
              "Units": 0.71875
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 6,
              "D": 174,
              "sD": 46
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "175",
            "Signed": "+47",
            "Hex": "AF",
            "Bin": "10101111",
            "Laegna": "AAEA",
            "Wave": "AEEA"
          },
          "Wave": {
            "Num": "AEEA",
            "Digits": [
              2,
              3,
              3,
              2
            ],
            "Hex": "BE",
            "Bin": "AOAAAAAO"
          },
          "Laegna": {
            "Num": "AAEA",
            "Digits": [
              2,
              2,
              3,
              2
            ],
            "Hex": "AE",
            "Bin": "AOAOAAAO"
          },
          "Float": {
            "Num": "68%",
            "Value": {
              "Percents": "68.359375%",
              "Units": 0.68359375
            },
            "Signed": {
              "Percents": "73.4375%",
              "Units": 0.734375
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 6,
              "D": 175,
              "sD": 47
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "176",
            "Signed": "+48",
            "Hex": "B0",
            "Bin": "10110000",
            "Laegna": "AAEE",
            "Wave": "AEEE"
          },
          "Wave": {
            "Num": "AEEE",
            "Digits": [
              2,
              3,
              3,
              3
            ],
            "Hex": "BF",
            "Bin": "AOAAAAAA"
          },
          "Laegna": {
            "Num": "AAEE",
            "Digits": [
              2,
              2,
              3,
              3
            ],
            "Hex": "AF",
            "Bin": "AOAOAAAA"
          },
          "Float": {
            "Num": "68%",
            "Value": {
              "Percents": "68.75%",
              "Units": 0.6875
            },
            "Signed": {
              "Percents": "75.0%",
              "Units": 0.75
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 6,
              "D": 176,
              "sD": 48
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "177",
            "Signed": "+49",
            "Hex": "B1",
            "Bin": "10110001",
            "Laegna": "AEII",
            "Wave": "AOAA"
          },
          "Wave": {
            "Num": "AOAA",
            "Digits": [
              2,
              1,
              2,
              2
            ],
            "Hex": "BA",
            "Bin": "AOOAAOAO"
          },
          "Laegna": {
            "Num": "AEII",
            "Digits": [
              2,
              3,
              0,
              0
            ],
            "Hex": "BK",
            "Bin": "AOAAOOOO"
          },
          "Float": {
            "Num": "69%",
            "Value": {
              "Percents": "69.140625%",
              "Units": 0.69140625
            },
            "Signed": {
              "Percents": "76.5625%",
              "Units": 0.765625
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 6,
              "D": 177,
              "sD": 49
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "178",
            "Signed": "+50",
            "Hex": "B2",
            "Bin": "10110010",
            "Laegna": "AEIO",
            "Wave": "AOAI"
          },
          "Wave": {
            "Num": "AOAI",
            "Digits": [
              2,
              1,
              2,
              0
            ],
            "Hex": "BC",
            "Bin": "AOOAAOOO"
          },
          "Laegna": {
            "Num": "AEIO",
            "Digits": [
              2,
              3,
              0,
              1
            ],
            "Hex": "BJ",
            "Bin": "AOAAOOOA"
          },
          "Float": {
            "Num": "69%",
            "Value": {
              "Percents": "69.53125%",
              "Units": 0.6953125
            },
            "Signed": {
              "Percents": "78.125%",
              "Units": 0.78125
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 6,
              "D": 178,
              "sD": 50
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "179",
            "Signed": "+51",
            "Hex": "B3",
            "Bin": "10110011",
            "Laegna": "AEIA",
            "Wave": "AOAE"
          },
          "Wave": {
            "Num": "AOAE",
            "Digits": [
              2,
              1,
              2,
              3
            ],
            "Hex": "BB",
            "Bin": "AOOAAOAA"
          },
          "Laegna": {
            "Num": "AEIA",
            "Digits": [
              2,
              3,
              0,
              2
            ],
            "Hex": "BI",
            "Bin": "AOAAOOAO"
          },
          "Float": {
            "Num": "69%",
            "Value": {
              "Percents": "69.921875%",
              "Units": 0.69921875
            },
            "Signed": {
              "Percents": "79.6875%",
              "Units": 0.796875
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 6,
              "D": 179,
              "sD": 51
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "180",
            "Signed": "+52",
            "Hex": "B4",
            "Bin": "10110100",
            "Laegna": "AEIE",
            "Wave": "AOAO"
          },
          "Wave": {
            "Num": "AOAO",
            "Digits": [
              2,
              1,
              2,
              1
            ],
            "Hex": "BB",
            "Bin": "AOOAAOOA"
          },
          "Laegna": {
            "Num": "AEIE",
            "Digits": [
              2,
              3,
              0,
              3
            ],
            "Hex": "BL",
            "Bin": "AOAAOOAA"
          },
          "Float": {
            "Num": "70%",
            "Value": {
              "Percents": "70.3125%",
              "Units": 0.703125
            },
            "Signed": {
              "Percents": "81.25%",
              "Units": 0.8125
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 6,
              "D": 180,
              "sD": 52
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "181",
            "Signed": "+53",
            "Hex": "B5",
            "Bin": "10110101",
            "Laegna": "AEOI",
            "Wave": "AOII"
          },
          "Wave": {
            "Num": "AOII",
            "Digits": [
              2,
              1,
              0,
              0
            ],
            "Hex": "BK",
            "Bin": "AOOAOOOO"
          },
          "Laegna": {
            "Num": "AEOI",
            "Digits": [
              2,
              3,
              1,
              0
            ],
            "Hex": "BQ",
            "Bin": "AOAAOAOO"
          },
          "Float": {
            "Num": "70%",
            "Value": {
              "Percents": "70.703125%",
              "Units": 0.70703125
            },
            "Signed": {
              "Percents": "82.8125%",
              "Units": 0.828125
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 6,
              "D": 181,
              "sD": 53
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "182",
            "Signed": "+54",
            "Hex": "B6",
            "Bin": "10110110",
            "Laegna": "AEOO",
            "Wave": "AOIO"
          },
          "Wave": {
            "Num": "AOIO",
            "Digits": [
              2,
              1,
              0,
              1
            ],
            "Hex": "BJ",
            "Bin": "AOOAOOOA"
          },
          "Laegna": {
            "Num": "AEOO",
            "Digits": [
              2,
              3,
              1,
              1
            ],
            "Hex": "BP",
            "Bin": "AOAAOAOA"
          },
          "Float": {
            "Num": "71%",
            "Value": {
              "Percents": "71.09375%",
              "Units": 0.7109375
            },
            "Signed": {
              "Percents": "84.375%",
              "Units": 0.84375
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 6,
              "D": 182,
              "sD": 54
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "183",
            "Signed": "+55",
            "Hex": "B7",
            "Bin": "10110111",
            "Laegna": "AEOA",
            "Wave": "AOIA"
          },
          "Wave": {
            "Num": "AOIA",
            "Digits": [
              2,
              1,
              0,
              2
            ],
            "Hex": "BI",
            "Bin": "AOOAOOAO"
          },
          "Laegna": {
            "Num": "AEOA",
            "Digits": [
              2,
              3,
              1,
              2
            ],
            "Hex": "BO",
            "Bin": "AOAAOAAO"
          },
          "Float": {
            "Num": "71%",
            "Value": {
              "Percents": "71.484375%",
              "Units": 0.71484375
            },
            "Signed": {
              "Percents": "85.9375%",
              "Units": 0.859375
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 6,
              "D": 183,
              "sD": 55
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "184",
            "Signed": "+56",
            "Hex": "B8",
            "Bin": "10111000",
            "Laegna": "AEOE",
            "Wave": "AOIE"
          },
          "Wave": {
            "Num": "AOIE",
            "Digits": [
              2,
              1,
              0,
              3
            ],
            "Hex": "BL",
            "Bin": "AOOAOOAA"
          },
          "Laegna": {
            "Num": "AEOE",
            "Digits": [
              2,
              3,
              1,
              3
            ],
            "Hex": "BP",
            "Bin": "AOAAOAAA"
          },
          "Float": {
            "Num": "71%",
            "Value": {
              "Percents": "71.875%",
              "Units": 0.71875
            },
            "Signed": {
              "Percents": "87.5%",
              "Units": 0.875
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 6,
              "D": 184,
              "sD": 56
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "185",
            "Signed": "+57",
            "Hex": "B9",
            "Bin": "10111001",
            "Laegna": "AEAI",
            "Wave": "AOEI"
          },
          "Wave": {
            "Num": "AOEI",
            "Digits": [
              2,
              1,
              3,
              0
            ],
            "Hex": "BG",
            "Bin": "AOOAAAOO"
          },
          "Laegna": {
            "Num": "AEAI",
            "Digits": [
              2,
              3,
              2,
              0
            ],
            "Hex": "BC",
            "Bin": "AOAAAOOO"
          },
          "Float": {
            "Num": "72%",
            "Value": {
              "Percents": "72.265625%",
              "Units": 0.72265625
            },
            "Signed": {
              "Percents": "89.0625%",
              "Units": 0.890625
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 6,
              "D": 185,
              "sD": 57
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "186",
            "Signed": "+58",
            "Hex": "BA",
            "Bin": "10111010",
            "Laegna": "AEAO",
            "Wave": "AOEO"
          },
          "Wave": {
            "Num": "AOEO",
            "Digits": [
              2,
              1,
              3,
              1
            ],
            "Hex": "BF",
            "Bin": "AOOAAAOA"
          },
          "Laegna": {
            "Num": "AEAO",
            "Digits": [
              2,
              3,
              2,
              1
            ],
            "Hex": "BB",
            "Bin": "AOAAAOOA"
          },
          "Float": {
            "Num": "72%",
            "Value": {
              "Percents": "72.65625%",
              "Units": 0.7265625
            },
            "Signed": {
              "Percents": "90.625%",
              "Units": 0.90625
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 6,
              "D": 186,
              "sD": 58
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "187",
            "Signed": "+59",
            "Hex": "BB",
            "Bin": "10111011",
            "Laegna": "AEAA",
            "Wave": "AOEA"
          },
          "Wave": {
            "Num": "AOEA",
            "Digits": [
              2,
              1,
              3,
              2
            ],
            "Hex": "BE",
            "Bin": "AOOAAAAO"
          },
          "Laegna": {
            "Num": "AEAA",
            "Digits": [
              2,
              3,
              2,
              2
            ],
            "Hex": "BA",
            "Bin": "AOAAAOAO"
          },
          "Float": {
            "Num": "73%",
            "Value": {
              "Percents": "73.046875%",
              "Units": 0.73046875
            },
            "Signed": {
              "Percents": "92.1875%",
              "Units": 0.921875
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 6,
              "D": 187,
              "sD": 59
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "188",
            "Signed": "+60",
            "Hex": "BC",
            "Bin": "10111100",
            "Laegna": "AEAE",
            "Wave": "AOEE"
          },
          "Wave": {
            "Num": "AOEE",
            "Digits": [
              2,
              1,
              3,
              3
            ],
            "Hex": "BF",
            "Bin": "AOOAAAAA"
          },
          "Laegna": {
            "Num": "AEAE",
            "Digits": [
              2,
              3,
              2,
              3
            ],
            "Hex": "BB",
            "Bin": "AOAAAOAA"
          },
          "Float": {
            "Num": "73%",
            "Value": {
              "Percents": "73.4375%",
              "Units": 0.734375
            },
            "Signed": {
              "Percents": "93.75%",
              "Units": 0.9375
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 6,
              "D": 188,
              "sD": 60
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "189",
            "Signed": "+61",
            "Hex": "BD",
            "Bin": "10111101",
            "Laegna": "AEEI",
            "Wave": "AOOA"
          },
          "Wave": {
            "Num": "AOOA",
            "Digits": [
              2,
              1,
              1,
              2
            ],
            "Hex": "BO",
            "Bin": "AOOAOAAO"
          },
          "Laegna": {
            "Num": "AEEI",
            "Digits": [
              2,
              3,
              3,
              0
            ],
            "Hex": "BG",
            "Bin": "AOAAAAOO"
          },
          "Float": {
            "Num": "73%",
            "Value": {
              "Percents": "73.828125%",
              "Units": 0.73828125
            },
            "Signed": {
              "Percents": "95.3125%",
              "Units": 0.953125
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 6,
              "D": 189,
              "sD": 61
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "190",
            "Signed": "+62",
            "Hex": "BE",
            "Bin": "10111110",
            "Laegna": "AEEO",
            "Wave": "AOOI"
          },
          "Wave": {
            "Num": "AOOI",
            "Digits": [
              2,
              1,
              1,
              0
            ],
            "Hex": "BQ",
            "Bin": "AOOAOAOO"
          },
          "Laegna": {
            "Num": "AEEO",
            "Digits": [
              2,
              3,
              3,
              1
            ],
            "Hex": "BF",
            "Bin": "AOAAAAOA"
          },
          "Float": {
            "Num": "74%",
            "Value": {
              "Percents": "74.21875%",
              "Units": 0.7421875
            },
            "Signed": {
              "Percents": "96.875%",
              "Units": 0.96875
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 6,
              "D": 190,
              "sD": 62
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "191",
            "Signed": "+63",
            "Hex": "BF",
            "Bin": "10111111",
            "Laegna": "AEEA",
            "Wave": "AOOE"
          },
          "Wave": {
            "Num": "AOOE",
            "Digits": [
              2,
              1,
              1,
              3
            ],
            "Hex": "BP",
            "Bin": "AOOAOAAA"
          },
          "Laegna": {
            "Num": "AEEA",
            "Digits": [
              2,
              3,
              3,
              2
            ],
            "Hex": "BE",
            "Bin": "AOAAAAAO"
          },
          "Float": {
            "Num": "74%",
            "Value": {
              "Percents": "74.609375%",
              "Units": 0.74609375
            },
            "Signed": {
              "Percents": "98.4375%",
              "Units": 0.984375
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 6,
              "D": 191,
              "sD": 63
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "192",
            "Signed": "+64",
            "Hex": "C0",
            "Bin": "11000000",
            "Laegna": "AEEE",
            "Wave": "AOOO"
          },
          "Wave": {
            "Num": "AOOO",
            "Digits": [
              2,
              1,
              1,
              1
            ],
            "Hex": "BP",
            "Bin": "AOOAOAOA"
          },
          "Laegna": {
            "Num": "AEEE",
            "Digits": [
              2,
              3,
              3,
              3
            ],
            "Hex": "BF",
            "Bin": "AOAAAAAA"
          },
          "Float": {
            "Num": "75%",
            "Value": {
              "Percents": "75.0%",
              "Units": 0.75
            },
            "Signed": {
              "Percents": "100.0%",
              "Units": 1.0
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 6,
              "D": 192,
              "sD": 64
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "193",
            "Signed": "+65",
            "Hex": "C1",
            "Bin": "11000001",
            "Laegna": "EIII",
            "Wave": "EIII"
          },
          "Wave": {
            "Num": "EIII",
            "Digits": [
              3,
              0,
              0,
              0
            ],
            "Hex": "GK",
            "Bin": "AAOOOOOO"
          },
          "Laegna": {
            "Num": "EIII",
            "Digits": [
              3,
              0,
              0,
              0
            ],
            "Hex": "GK",
            "Bin": "AAOOOOOO"
          },
          "Float": {
            "Num": "75%",
            "Value": {
              "Percents": "75.390625%",
              "Units": 0.75390625
            },
            "Signed": {
              "Percents": "101.5625%",
              "Units": 1.015625
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 193,
              "sD": 65
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "194",
            "Signed": "+66",
            "Hex": "C2",
            "Bin": "11000010",
            "Laegna": "EIIO",
            "Wave": "EIIO"
          },
          "Wave": {
            "Num": "EIIO",
            "Digits": [
              3,
              0,
              0,
              1
            ],
            "Hex": "GJ",
            "Bin": "AAOOOOOA"
          },
          "Laegna": {
            "Num": "EIIO",
            "Digits": [
              3,
              0,
              0,
              1
            ],
            "Hex": "GJ",
            "Bin": "AAOOOOOA"
          },
          "Float": {
            "Num": "75%",
            "Value": {
              "Percents": "75.78125%",
              "Units": 0.7578125
            },
            "Signed": {
              "Percents": "103.125%",
              "Units": 1.03125
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 194,
              "sD": 66
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "195",
            "Signed": "+67",
            "Hex": "C3",
            "Bin": "11000011",
            "Laegna": "EIIA",
            "Wave": "EIIA"
          },
          "Wave": {
            "Num": "EIIA",
            "Digits": [
              3,
              0,
              0,
              2
            ],
            "Hex": "GI",
            "Bin": "AAOOOOAO"
          },
          "Laegna": {
            "Num": "EIIA",
            "Digits": [
              3,
              0,
              0,
              2
            ],
            "Hex": "GI",
            "Bin": "AAOOOOAO"
          },
          "Float": {
            "Num": "76%",
            "Value": {
              "Percents": "76.171875%",
              "Units": 0.76171875
            },
            "Signed": {
              "Percents": "104.6875%",
              "Units": 1.046875
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 195,
              "sD": 67
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "196",
            "Signed": "+68",
            "Hex": "C4",
            "Bin": "11000100",
            "Laegna": "EIIE",
            "Wave": "EIIE"
          },
          "Wave": {
            "Num": "EIIE",
            "Digits": [
              3,
              0,
              0,
              3
            ],
            "Hex": "GL",
            "Bin": "AAOOOOAA"
          },
          "Laegna": {
            "Num": "EIIE",
            "Digits": [
              3,
              0,
              0,
              3
            ],
            "Hex": "GL",
            "Bin": "AAOOOOAA"
          },
          "Float": {
            "Num": "76%",
            "Value": {
              "Percents": "76.5625%",
              "Units": 0.765625
            },
            "Signed": {
              "Percents": "106.25%",
              "Units": 1.0625
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 196,
              "sD": 68
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "197",
            "Signed": "+69",
            "Hex": "C5",
            "Bin": "11000101",
            "Laegna": "EIOI",
            "Wave": "EIOA"
          },
          "Wave": {
            "Num": "EIOA",
            "Digits": [
              3,
              0,
              1,
              2
            ],
            "Hex": "GO",
            "Bin": "AAOOOAAO"
          },
          "Laegna": {
            "Num": "EIOI",
            "Digits": [
              3,
              0,
              1,
              0
            ],
            "Hex": "GQ",
            "Bin": "AAOOOAOO"
          },
          "Float": {
            "Num": "76%",
            "Value": {
              "Percents": "76.953125%",
              "Units": 0.76953125
            },
            "Signed": {
              "Percents": "107.8125%",
              "Units": 1.078125
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 197,
              "sD": 69
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "198",
            "Signed": "+70",
            "Hex": "C6",
            "Bin": "11000110",
            "Laegna": "EIOO",
            "Wave": "EIOI"
          },
          "Wave": {
            "Num": "EIOI",
            "Digits": [
              3,
              0,
              1,
              0
            ],
            "Hex": "GQ",
            "Bin": "AAOOOAOO"
          },
          "Laegna": {
            "Num": "EIOO",
            "Digits": [
              3,
              0,
              1,
              1
            ],
            "Hex": "GP",
            "Bin": "AAOOOAOA"
          },
          "Float": {
            "Num": "77%",
            "Value": {
              "Percents": "77.34375%",
              "Units": 0.7734375
            },
            "Signed": {
              "Percents": "109.375%",
              "Units": 1.09375
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 198,
              "sD": 70
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "199",
            "Signed": "+71",
            "Hex": "C7",
            "Bin": "11000111",
            "Laegna": "EIOA",
            "Wave": "EIOE"
          },
          "Wave": {
            "Num": "EIOE",
            "Digits": [
              3,
              0,
              1,
              3
            ],
            "Hex": "GP",
            "Bin": "AAOOOAAA"
          },
          "Laegna": {
            "Num": "EIOA",
            "Digits": [
              3,
              0,
              1,
              2
            ],
            "Hex": "GO",
            "Bin": "AAOOOAAO"
          },
          "Float": {
            "Num": "77%",
            "Value": {
              "Percents": "77.734375%",
              "Units": 0.77734375
            },
            "Signed": {
              "Percents": "110.9375%",
              "Units": 1.109375
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 199,
              "sD": 71
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "200",
            "Signed": "+72",
            "Hex": "C8",
            "Bin": "11001000",
            "Laegna": "EIOE",
            "Wave": "EIOO"
          },
          "Wave": {
            "Num": "EIOO",
            "Digits": [
              3,
              0,
              1,
              1
            ],
            "Hex": "GP",
            "Bin": "AAOOOAOA"
          },
          "Laegna": {
            "Num": "EIOE",
            "Digits": [
              3,
              0,
              1,
              3
            ],
            "Hex": "GP",
            "Bin": "AAOOOAAA"
          },
          "Float": {
            "Num": "78%",
            "Value": {
              "Percents": "78.125%",
              "Units": 0.78125
            },
            "Signed": {
              "Percents": "112.5%",
              "Units": 1.125
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 200,
              "sD": 72
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "201",
            "Signed": "+73",
            "Hex": "C9",
            "Bin": "11001001",
            "Laegna": "EIAI",
            "Wave": "EIAA"
          },
          "Wave": {
            "Num": "EIAA",
            "Digits": [
              3,
              0,
              2,
              2
            ],
            "Hex": "GA",
            "Bin": "AAOOAOAO"
          },
          "Laegna": {
            "Num": "EIAI",
            "Digits": [
              3,
              0,
              2,
              0
            ],
            "Hex": "GC",
            "Bin": "AAOOAOOO"
          },
          "Float": {
            "Num": "78%",
            "Value": {
              "Percents": "78.515625%",
              "Units": 0.78515625
            },
            "Signed": {
              "Percents": "114.0625%",
              "Units": 1.140625
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 201,
              "sD": 73
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "202",
            "Signed": "+74",
            "Hex": "CA",
            "Bin": "11001010",
            "Laegna": "EIAO",
            "Wave": "EIAI"
          },
          "Wave": {
            "Num": "EIAI",
            "Digits": [
              3,
              0,
              2,
              0
            ],
            "Hex": "GC",
            "Bin": "AAOOAOOO"
          },
          "Laegna": {
            "Num": "EIAO",
            "Digits": [
              3,
              0,
              2,
              1
            ],
            "Hex": "GB",
            "Bin": "AAOOAOOA"
          },
          "Float": {
            "Num": "78%",
            "Value": {
              "Percents": "78.90625%",
              "Units": 0.7890625
            },
            "Signed": {
              "Percents": "115.625%",
              "Units": 1.15625
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 202,
              "sD": 74
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "203",
            "Signed": "+75",
            "Hex": "CB",
            "Bin": "11001011",
            "Laegna": "EIAA",
            "Wave": "EIAE"
          },
          "Wave": {
            "Num": "EIAE",
            "Digits": [
              3,
              0,
              2,
              3
            ],
            "Hex": "GB",
            "Bin": "AAOOAOAA"
          },
          "Laegna": {
            "Num": "EIAA",
            "Digits": [
              3,
              0,
              2,
              2
            ],
            "Hex": "GA",
            "Bin": "AAOOAOAO"
          },
          "Float": {
            "Num": "79%",
            "Value": {
              "Percents": "79.296875%",
              "Units": 0.79296875
            },
            "Signed": {
              "Percents": "117.1875%",
              "Units": 1.171875
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 203,
              "sD": 75
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "204",
            "Signed": "+76",
            "Hex": "CC",
            "Bin": "11001100",
            "Laegna": "EIAE",
            "Wave": "EIAO"
          },
          "Wave": {
            "Num": "EIAO",
            "Digits": [
              3,
              0,
              2,
              1
            ],
            "Hex": "GB",
            "Bin": "AAOOAOOA"
          },
          "Laegna": {
            "Num": "EIAE",
            "Digits": [
              3,
              0,
              2,
              3
            ],
            "Hex": "GB",
            "Bin": "AAOOAOAA"
          },
          "Float": {
            "Num": "79%",
            "Value": {
              "Percents": "79.6875%",
              "Units": 0.796875
            },
            "Signed": {
              "Percents": "118.75%",
              "Units": 1.1875
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 204,
              "sD": 76
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "205",
            "Signed": "+77",
            "Hex": "CD",
            "Bin": "11001101",
            "Laegna": "EIEI",
            "Wave": "EIEI"
          },
          "Wave": {
            "Num": "EIEI",
            "Digits": [
              3,
              0,
              3,
              0
            ],
            "Hex": "GG",
            "Bin": "AAOOAAOO"
          },
          "Laegna": {
            "Num": "EIEI",
            "Digits": [
              3,
              0,
              3,
              0
            ],
            "Hex": "GG",
            "Bin": "AAOOAAOO"
          },
          "Float": {
            "Num": "80%",
            "Value": {
              "Percents": "80.078125%",
              "Units": 0.80078125
            },
            "Signed": {
              "Percents": "120.3125%",
              "Units": 1.203125
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 205,
              "sD": 77
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "206",
            "Signed": "+78",
            "Hex": "CE",
            "Bin": "11001110",
            "Laegna": "EIEO",
            "Wave": "EIEO"
          },
          "Wave": {
            "Num": "EIEO",
            "Digits": [
              3,
              0,
              3,
              1
            ],
            "Hex": "GF",
            "Bin": "AAOOAAOA"
          },
          "Laegna": {
            "Num": "EIEO",
            "Digits": [
              3,
              0,
              3,
              1
            ],
            "Hex": "GF",
            "Bin": "AAOOAAOA"
          },
          "Float": {
            "Num": "80%",
            "Value": {
              "Percents": "80.46875%",
              "Units": 0.8046875
            },
            "Signed": {
              "Percents": "121.875%",
              "Units": 1.21875
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 206,
              "sD": 78
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "207",
            "Signed": "+79",
            "Hex": "CF",
            "Bin": "11001111",
            "Laegna": "EIEA",
            "Wave": "EIEA"
          },
          "Wave": {
            "Num": "EIEA",
            "Digits": [
              3,
              0,
              3,
              2
            ],
            "Hex": "GE",
            "Bin": "AAOOAAAO"
          },
          "Laegna": {
            "Num": "EIEA",
            "Digits": [
              3,
              0,
              3,
              2
            ],
            "Hex": "GE",
            "Bin": "AAOOAAAO"
          },
          "Float": {
            "Num": "80%",
            "Value": {
              "Percents": "80.859375%",
              "Units": 0.80859375
            },
            "Signed": {
              "Percents": "123.4375%",
              "Units": 1.234375
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 207,
              "sD": 79
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "208",
            "Signed": "+80",
            "Hex": "D0",
            "Bin": "11010000",
            "Laegna": "EIEE",
            "Wave": "EIEE"
          },
          "Wave": {
            "Num": "EIEE",
            "Digits": [
              3,
              0,
              3,
              3
            ],
            "Hex": "GF",
            "Bin": "AAOOAAAA"
          },
          "Laegna": {
            "Num": "EIEE",
            "Digits": [
              3,
              0,
              3,
              3
            ],
            "Hex": "GF",
            "Bin": "AAOOAAAA"
          },
          "Float": {
            "Num": "81%",
            "Value": {
              "Percents": "81.25%",
              "Units": 0.8125
            },
            "Signed": {
              "Percents": "125.0%",
              "Units": 1.25
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 208,
              "sD": 80
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "209",
            "Signed": "+81",
            "Hex": "D1",
            "Bin": "11010001",
            "Laegna": "EOII",
            "Wave": "EOAA"
          },
          "Wave": {
            "Num": "EOAA",
            "Digits": [
              3,
              1,
              2,
              2
            ],
            "Hex": "FA",
            "Bin": "AAOAAOAO"
          },
          "Laegna": {
            "Num": "EOII",
            "Digits": [
              3,
              1,
              0,
              0
            ],
            "Hex": "FK",
            "Bin": "AAOAOOOO"
          },
          "Float": {
            "Num": "81%",
            "Value": {
              "Percents": "81.640625%",
              "Units": 0.81640625
            },
            "Signed": {
              "Percents": "126.5625%",
              "Units": 1.265625
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 209,
              "sD": 81
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "210",
            "Signed": "+82",
            "Hex": "D2",
            "Bin": "11010010",
            "Laegna": "EOIO",
            "Wave": "EOAI"
          },
          "Wave": {
            "Num": "EOAI",
            "Digits": [
              3,
              1,
              2,
              0
            ],
            "Hex": "FC",
            "Bin": "AAOAAOOO"
          },
          "Laegna": {
            "Num": "EOIO",
            "Digits": [
              3,
              1,
              0,
              1
            ],
            "Hex": "FJ",
            "Bin": "AAOAOOOA"
          },
          "Float": {
            "Num": "82%",
            "Value": {
              "Percents": "82.03125%",
              "Units": 0.8203125
            },
            "Signed": {
              "Percents": "128.125%",
              "Units": 1.28125
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 210,
              "sD": 82
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "211",
            "Signed": "+83",
            "Hex": "D3",
            "Bin": "11010011",
            "Laegna": "EOIA",
            "Wave": "EOAE"
          },
          "Wave": {
            "Num": "EOAE",
            "Digits": [
              3,
              1,
              2,
              3
            ],
            "Hex": "FB",
            "Bin": "AAOAAOAA"
          },
          "Laegna": {
            "Num": "EOIA",
            "Digits": [
              3,
              1,
              0,
              2
            ],
            "Hex": "FI",
            "Bin": "AAOAOOAO"
          },
          "Float": {
            "Num": "82%",
            "Value": {
              "Percents": "82.421875%",
              "Units": 0.82421875
            },
            "Signed": {
              "Percents": "129.6875%",
              "Units": 1.296875
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 211,
              "sD": 83
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "212",
            "Signed": "+84",
            "Hex": "D4",
            "Bin": "11010100",
            "Laegna": "EOIE",
            "Wave": "EOAO"
          },
          "Wave": {
            "Num": "EOAO",
            "Digits": [
              3,
              1,
              2,
              1
            ],
            "Hex": "FB",
            "Bin": "AAOAAOOA"
          },
          "Laegna": {
            "Num": "EOIE",
            "Digits": [
              3,
              1,
              0,
              3
            ],
            "Hex": "FL",
            "Bin": "AAOAOOAA"
          },
          "Float": {
            "Num": "82%",
            "Value": {
              "Percents": "82.8125%",
              "Units": 0.828125
            },
            "Signed": {
              "Percents": "131.25%",
              "Units": 1.3125
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 212,
              "sD": 84
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "213",
            "Signed": "+85",
            "Hex": "D5",
            "Bin": "11010101",
            "Laegna": "EOOI",
            "Wave": "EOII"
          },
          "Wave": {
            "Num": "EOII",
            "Digits": [
              3,
              1,
              0,
              0
            ],
            "Hex": "FK",
            "Bin": "AAOAOOOO"
          },
          "Laegna": {
            "Num": "EOOI",
            "Digits": [
              3,
              1,
              1,
              0
            ],
            "Hex": "FQ",
            "Bin": "AAOAOAOO"
          },
          "Float": {
            "Num": "83%",
            "Value": {
              "Percents": "83.203125%",
              "Units": 0.83203125
            },
            "Signed": {
              "Percents": "132.8125%",
              "Units": 1.328125
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 213,
              "sD": 85
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "214",
            "Signed": "+86",
            "Hex": "D6",
            "Bin": "11010110",
            "Laegna": "EOOO",
            "Wave": "EOIO"
          },
          "Wave": {
            "Num": "EOIO",
            "Digits": [
              3,
              1,
              0,
              1
            ],
            "Hex": "FJ",
            "Bin": "AAOAOOOA"
          },
          "Laegna": {
            "Num": "EOOO",
            "Digits": [
              3,
              1,
              1,
              1
            ],
            "Hex": "FP",
            "Bin": "AAOAOAOA"
          },
          "Float": {
            "Num": "83%",
            "Value": {
              "Percents": "83.59375%",
              "Units": 0.8359375
            },
            "Signed": {
              "Percents": "134.375%",
              "Units": 1.34375
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 214,
              "sD": 86
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "215",
            "Signed": "+87",
            "Hex": "D7",
            "Bin": "11010111",
            "Laegna": "EOOA",
            "Wave": "EOIA"
          },
          "Wave": {
            "Num": "EOIA",
            "Digits": [
              3,
              1,
              0,
              2
            ],
            "Hex": "FI",
            "Bin": "AAOAOOAO"
          },
          "Laegna": {
            "Num": "EOOA",
            "Digits": [
              3,
              1,
              1,
              2
            ],
            "Hex": "FO",
            "Bin": "AAOAOAAO"
          },
          "Float": {
            "Num": "83%",
            "Value": {
              "Percents": "83.984375%",
              "Units": 0.83984375
            },
            "Signed": {
              "Percents": "135.9375%",
              "Units": 1.359375
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 215,
              "sD": 87
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "216",
            "Signed": "+88",
            "Hex": "D8",
            "Bin": "11011000",
            "Laegna": "EOOE",
            "Wave": "EOIE"
          },
          "Wave": {
            "Num": "EOIE",
            "Digits": [
              3,
              1,
              0,
              3
            ],
            "Hex": "FL",
            "Bin": "AAOAOOAA"
          },
          "Laegna": {
            "Num": "EOOE",
            "Digits": [
              3,
              1,
              1,
              3
            ],
            "Hex": "FP",
            "Bin": "AAOAOAAA"
          },
          "Float": {
            "Num": "84%",
            "Value": {
              "Percents": "84.375%",
              "Units": 0.84375
            },
            "Signed": {
              "Percents": "137.5%",
              "Units": 1.375
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 216,
              "sD": 88
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "217",
            "Signed": "+89",
            "Hex": "D9",
            "Bin": "11011001",
            "Laegna": "EOAI",
            "Wave": "EOEI"
          },
          "Wave": {
            "Num": "EOEI",
            "Digits": [
              3,
              1,
              3,
              0
            ],
            "Hex": "FG",
            "Bin": "AAOAAAOO"
          },
          "Laegna": {
            "Num": "EOAI",
            "Digits": [
              3,
              1,
              2,
              0
            ],
            "Hex": "FC",
            "Bin": "AAOAAOOO"
          },
          "Float": {
            "Num": "84%",
            "Value": {
              "Percents": "84.765625%",
              "Units": 0.84765625
            },
            "Signed": {
              "Percents": "139.0625%",
              "Units": 1.390625
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 217,
              "sD": 89
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "218",
            "Signed": "+90",
            "Hex": "DA",
            "Bin": "11011010",
            "Laegna": "EOAO",
            "Wave": "EOEO"
          },
          "Wave": {
            "Num": "EOEO",
            "Digits": [
              3,
              1,
              3,
              1
            ],
            "Hex": "FF",
            "Bin": "AAOAAAOA"
          },
          "Laegna": {
            "Num": "EOAO",
            "Digits": [
              3,
              1,
              2,
              1
            ],
            "Hex": "FB",
            "Bin": "AAOAAOOA"
          },
          "Float": {
            "Num": "85%",
            "Value": {
              "Percents": "85.15625%",
              "Units": 0.8515625
            },
            "Signed": {
              "Percents": "140.625%",
              "Units": 1.40625
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 218,
              "sD": 90
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "219",
            "Signed": "+91",
            "Hex": "DB",
            "Bin": "11011011",
            "Laegna": "EOAA",
            "Wave": "EOEA"
          },
          "Wave": {
            "Num": "EOEA",
            "Digits": [
              3,
              1,
              3,
              2
            ],
            "Hex": "FE",
            "Bin": "AAOAAAAO"
          },
          "Laegna": {
            "Num": "EOAA",
            "Digits": [
              3,
              1,
              2,
              2
            ],
            "Hex": "FA",
            "Bin": "AAOAAOAO"
          },
          "Float": {
            "Num": "85%",
            "Value": {
              "Percents": "85.546875%",
              "Units": 0.85546875
            },
            "Signed": {
              "Percents": "142.1875%",
              "Units": 1.421875
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 219,
              "sD": 91
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "220",
            "Signed": "+92",
            "Hex": "DC",
            "Bin": "11011100",
            "Laegna": "EOAE",
            "Wave": "EOEE"
          },
          "Wave": {
            "Num": "EOEE",
            "Digits": [
              3,
              1,
              3,
              3
            ],
            "Hex": "FF",
            "Bin": "AAOAAAAA"
          },
          "Laegna": {
            "Num": "EOAE",
            "Digits": [
              3,
              1,
              2,
              3
            ],
            "Hex": "FB",
            "Bin": "AAOAAOAA"
          },
          "Float": {
            "Num": "85%",
            "Value": {
              "Percents": "85.9375%",
              "Units": 0.859375
            },
            "Signed": {
              "Percents": "143.75%",
              "Units": 1.4375
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 220,
              "sD": 92
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "221",
            "Signed": "+93",
            "Hex": "DD",
            "Bin": "11011101",
            "Laegna": "EOEI",
            "Wave": "EOOA"
          },
          "Wave": {
            "Num": "EOOA",
            "Digits": [
              3,
              1,
              1,
              2
            ],
            "Hex": "FO",
            "Bin": "AAOAOAAO"
          },
          "Laegna": {
            "Num": "EOEI",
            "Digits": [
              3,
              1,
              3,
              0
            ],
            "Hex": "FG",
            "Bin": "AAOAAAOO"
          },
          "Float": {
            "Num": "86%",
            "Value": {
              "Percents": "86.328125%",
              "Units": 0.86328125
            },
            "Signed": {
              "Percents": "145.3125%",
              "Units": 1.453125
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 221,
              "sD": 93
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "222",
            "Signed": "+94",
            "Hex": "DE",
            "Bin": "11011110",
            "Laegna": "EOEO",
            "Wave": "EOOI"
          },
          "Wave": {
            "Num": "EOOI",
            "Digits": [
              3,
              1,
              1,
              0
            ],
            "Hex": "FQ",
            "Bin": "AAOAOAOO"
          },
          "Laegna": {
            "Num": "EOEO",
            "Digits": [
              3,
              1,
              3,
              1
            ],
            "Hex": "FF",
            "Bin": "AAOAAAOA"
          },
          "Float": {
            "Num": "86%",
            "Value": {
              "Percents": "86.71875%",
              "Units": 0.8671875
            },
            "Signed": {
              "Percents": "146.875%",
              "Units": 1.46875
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 222,
              "sD": 94
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "223",
            "Signed": "+95",
            "Hex": "DF",
            "Bin": "11011111",
            "Laegna": "EOEA",
            "Wave": "EOOE"
          },
          "Wave": {
            "Num": "EOOE",
            "Digits": [
              3,
              1,
              1,
              3
            ],
            "Hex": "FP",
            "Bin": "AAOAOAAA"
          },
          "Laegna": {
            "Num": "EOEA",
            "Digits": [
              3,
              1,
              3,
              2
            ],
            "Hex": "FE",
            "Bin": "AAOAAAAO"
          },
          "Float": {
            "Num": "87%",
            "Value": {
              "Percents": "87.109375%",
              "Units": 0.87109375
            },
            "Signed": {
              "Percents": "148.4375%",
              "Units": 1.484375
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 223,
              "sD": 95
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "224",
            "Signed": "+96",
            "Hex": "E0",
            "Bin": "11100000",
            "Laegna": "EOEE",
            "Wave": "EOOO"
          },
          "Wave": {
            "Num": "EOOO",
            "Digits": [
              3,
              1,
              1,
              1
            ],
            "Hex": "FP",
            "Bin": "AAOAOAOA"
          },
          "Laegna": {
            "Num": "EOEE",
            "Digits": [
              3,
              1,
              3,
              3
            ],
            "Hex": "FF",
            "Bin": "AAOAAAAA"
          },
          "Float": {
            "Num": "87%",
            "Value": {
              "Percents": "87.5%",
              "Units": 0.875
            },
            "Signed": {
              "Percents": "150.0%",
              "Units": 1.5
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 224,
              "sD": 96
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "225",
            "Signed": "+97",
            "Hex": "E1",
            "Bin": "11100001",
            "Laegna": "EAII",
            "Wave": "EAAA"
          },
          "Wave": {
            "Num": "EAAA",
            "Digits": [
              3,
              2,
              2,
              2
            ],
            "Hex": "EA",
            "Bin": "AAAOAOAO"
          },
          "Laegna": {
            "Num": "EAII",
            "Digits": [
              3,
              2,
              0,
              0
            ],
            "Hex": "EK",
            "Bin": "AAAOOOOO"
          },
          "Float": {
            "Num": "87%",
            "Value": {
              "Percents": "87.890625%",
              "Units": 0.87890625
            },
            "Signed": {
              "Percents": "151.5625%",
              "Units": 1.515625
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 225,
              "sD": 97
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "226",
            "Signed": "+98",
            "Hex": "E2",
            "Bin": "11100010",
            "Laegna": "EAIO",
            "Wave": "EAAI"
          },
          "Wave": {
            "Num": "EAAI",
            "Digits": [
              3,
              2,
              2,
              0
            ],
            "Hex": "EC",
            "Bin": "AAAOAOOO"
          },
          "Laegna": {
            "Num": "EAIO",
            "Digits": [
              3,
              2,
              0,
              1
            ],
            "Hex": "EJ",
            "Bin": "AAAOOOOA"
          },
          "Float": {
            "Num": "88%",
            "Value": {
              "Percents": "88.28125%",
              "Units": 0.8828125
            },
            "Signed": {
              "Percents": "153.125%",
              "Units": 1.53125
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 226,
              "sD": 98
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "227",
            "Signed": "+99",
            "Hex": "E3",
            "Bin": "11100011",
            "Laegna": "EAIA",
            "Wave": "EAAE"
          },
          "Wave": {
            "Num": "EAAE",
            "Digits": [
              3,
              2,
              2,
              3
            ],
            "Hex": "EB",
            "Bin": "AAAOAOAA"
          },
          "Laegna": {
            "Num": "EAIA",
            "Digits": [
              3,
              2,
              0,
              2
            ],
            "Hex": "EI",
            "Bin": "AAAOOOAO"
          },
          "Float": {
            "Num": "88%",
            "Value": {
              "Percents": "88.671875%",
              "Units": 0.88671875
            },
            "Signed": {
              "Percents": "154.6875%",
              "Units": 1.546875
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 227,
              "sD": 99
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "228",
            "Signed": "+100",
            "Hex": "E4",
            "Bin": "11100100",
            "Laegna": "EAIE",
            "Wave": "EAAO"
          },
          "Wave": {
            "Num": "EAAO",
            "Digits": [
              3,
              2,
              2,
              1
            ],
            "Hex": "EB",
            "Bin": "AAAOAOOA"
          },
          "Laegna": {
            "Num": "EAIE",
            "Digits": [
              3,
              2,
              0,
              3
            ],
            "Hex": "EL",
            "Bin": "AAAOOOAA"
          },
          "Float": {
            "Num": "89%",
            "Value": {
              "Percents": "89.0625%",
              "Units": 0.890625
            },
            "Signed": {
              "Percents": "156.25%",
              "Units": 1.5625
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 228,
              "sD": 100
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "229",
            "Signed": "+101",
            "Hex": "E5",
            "Bin": "11100101",
            "Laegna": "EAOI",
            "Wave": "EAII"
          },
          "Wave": {
            "Num": "EAII",
            "Digits": [
              3,
              2,
              0,
              0
            ],
            "Hex": "EK",
            "Bin": "AAAOOOOO"
          },
          "Laegna": {
            "Num": "EAOI",
            "Digits": [
              3,
              2,
              1,
              0
            ],
            "Hex": "EQ",
            "Bin": "AAAOOAOO"
          },
          "Float": {
            "Num": "89%",
            "Value": {
              "Percents": "89.453125%",
              "Units": 0.89453125
            },
            "Signed": {
              "Percents": "157.8125%",
              "Units": 1.578125
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 229,
              "sD": 101
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "230",
            "Signed": "+102",
            "Hex": "E6",
            "Bin": "11100110",
            "Laegna": "EAOO",
            "Wave": "EAIO"
          },
          "Wave": {
            "Num": "EAIO",
            "Digits": [
              3,
              2,
              0,
              1
            ],
            "Hex": "EJ",
            "Bin": "AAAOOOOA"
          },
          "Laegna": {
            "Num": "EAOO",
            "Digits": [
              3,
              2,
              1,
              1
            ],
            "Hex": "EP",
            "Bin": "AAAOOAOA"
          },
          "Float": {
            "Num": "89%",
            "Value": {
              "Percents": "89.84375%",
              "Units": 0.8984375
            },
            "Signed": {
              "Percents": "159.375%",
              "Units": 1.59375
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 230,
              "sD": 102
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "231",
            "Signed": "+103",
            "Hex": "E7",
            "Bin": "11100111",
            "Laegna": "EAOA",
            "Wave": "EAIA"
          },
          "Wave": {
            "Num": "EAIA",
            "Digits": [
              3,
              2,
              0,
              2
            ],
            "Hex": "EI",
            "Bin": "AAAOOOAO"
          },
          "Laegna": {
            "Num": "EAOA",
            "Digits": [
              3,
              2,
              1,
              2
            ],
            "Hex": "EO",
            "Bin": "AAAOOAAO"
          },
          "Float": {
            "Num": "90%",
            "Value": {
              "Percents": "90.234375%",
              "Units": 0.90234375
            },
            "Signed": {
              "Percents": "160.9375%",
              "Units": 1.609375
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 231,
              "sD": 103
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "232",
            "Signed": "+104",
            "Hex": "E8",
            "Bin": "11101000",
            "Laegna": "EAOE",
            "Wave": "EAIE"
          },
          "Wave": {
            "Num": "EAIE",
            "Digits": [
              3,
              2,
              0,
              3
            ],
            "Hex": "EL",
            "Bin": "AAAOOOAA"
          },
          "Laegna": {
            "Num": "EAOE",
            "Digits": [
              3,
              2,
              1,
              3
            ],
            "Hex": "EP",
            "Bin": "AAAOOAAA"
          },
          "Float": {
            "Num": "90%",
            "Value": {
              "Percents": "90.625%",
              "Units": 0.90625
            },
            "Signed": {
              "Percents": "162.5%",
              "Units": 1.625
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 232,
              "sD": 104
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "233",
            "Signed": "+105",
            "Hex": "E9",
            "Bin": "11101001",
            "Laegna": "EAAI",
            "Wave": "EAEI"
          },
          "Wave": {
            "Num": "EAEI",
            "Digits": [
              3,
              2,
              3,
              0
            ],
            "Hex": "EG",
            "Bin": "AAAOAAOO"
          },
          "Laegna": {
            "Num": "EAAI",
            "Digits": [
              3,
              2,
              2,
              0
            ],
            "Hex": "EC",
            "Bin": "AAAOAOOO"
          },
          "Float": {
            "Num": "91%",
            "Value": {
              "Percents": "91.015625%",
              "Units": 0.91015625
            },
            "Signed": {
              "Percents": "164.0625%",
              "Units": 1.640625
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 233,
              "sD": 105
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "234",
            "Signed": "+106",
            "Hex": "EA",
            "Bin": "11101010",
            "Laegna": "EAAO",
            "Wave": "EAEO"
          },
          "Wave": {
            "Num": "EAEO",
            "Digits": [
              3,
              2,
              3,
              1
            ],
            "Hex": "EF",
            "Bin": "AAAOAAOA"
          },
          "Laegna": {
            "Num": "EAAO",
            "Digits": [
              3,
              2,
              2,
              1
            ],
            "Hex": "EB",
            "Bin": "AAAOAOOA"
          },
          "Float": {
            "Num": "91%",
            "Value": {
              "Percents": "91.40625%",
              "Units": 0.9140625
            },
            "Signed": {
              "Percents": "165.625%",
              "Units": 1.65625
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 234,
              "sD": 106
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "235",
            "Signed": "+107",
            "Hex": "EB",
            "Bin": "11101011",
            "Laegna": "EAAA",
            "Wave": "EAEA"
          },
          "Wave": {
            "Num": "EAEA",
            "Digits": [
              3,
              2,
              3,
              2
            ],
            "Hex": "EE",
            "Bin": "AAAOAAAO"
          },
          "Laegna": {
            "Num": "EAAA",
            "Digits": [
              3,
              2,
              2,
              2
            ],
            "Hex": "EA",
            "Bin": "AAAOAOAO"
          },
          "Float": {
            "Num": "91%",
            "Value": {
              "Percents": "91.796875%",
              "Units": 0.91796875
            },
            "Signed": {
              "Percents": "167.1875%",
              "Units": 1.671875
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 235,
              "sD": 107
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "236",
            "Signed": "+108",
            "Hex": "EC",
            "Bin": "11101100",
            "Laegna": "EAAE",
            "Wave": "EAEE"
          },
          "Wave": {
            "Num": "EAEE",
            "Digits": [
              3,
              2,
              3,
              3
            ],
            "Hex": "EF",
            "Bin": "AAAOAAAA"
          },
          "Laegna": {
            "Num": "EAAE",
            "Digits": [
              3,
              2,
              2,
              3
            ],
            "Hex": "EB",
            "Bin": "AAAOAOAA"
          },
          "Float": {
            "Num": "92%",
            "Value": {
              "Percents": "92.1875%",
              "Units": 0.921875
            },
            "Signed": {
              "Percents": "168.75%",
              "Units": 1.6875
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 236,
              "sD": 108
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "237",
            "Signed": "+109",
            "Hex": "ED",
            "Bin": "11101101",
            "Laegna": "EAEI",
            "Wave": "EAOA"
          },
          "Wave": {
            "Num": "EAOA",
            "Digits": [
              3,
              2,
              1,
              2
            ],
            "Hex": "EO",
            "Bin": "AAAOOAAO"
          },
          "Laegna": {
            "Num": "EAEI",
            "Digits": [
              3,
              2,
              3,
              0
            ],
            "Hex": "EG",
            "Bin": "AAAOAAOO"
          },
          "Float": {
            "Num": "92%",
            "Value": {
              "Percents": "92.578125%",
              "Units": 0.92578125
            },
            "Signed": {
              "Percents": "170.3125%",
              "Units": 1.703125
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 237,
              "sD": 109
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "238",
            "Signed": "+110",
            "Hex": "EE",
            "Bin": "11101110",
            "Laegna": "EAEO",
            "Wave": "EAOI"
          },
          "Wave": {
            "Num": "EAOI",
            "Digits": [
              3,
              2,
              1,
              0
            ],
            "Hex": "EQ",
            "Bin": "AAAOOAOO"
          },
          "Laegna": {
            "Num": "EAEO",
            "Digits": [
              3,
              2,
              3,
              1
            ],
            "Hex": "EF",
            "Bin": "AAAOAAOA"
          },
          "Float": {
            "Num": "92%",
            "Value": {
              "Percents": "92.96875%",
              "Units": 0.9296875
            },
            "Signed": {
              "Percents": "171.875%",
              "Units": 1.71875
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 238,
              "sD": 110
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "239",
            "Signed": "+111",
            "Hex": "EF",
            "Bin": "11101111",
            "Laegna": "EAEA",
            "Wave": "EAOE"
          },
          "Wave": {
            "Num": "EAOE",
            "Digits": [
              3,
              2,
              1,
              3
            ],
            "Hex": "EP",
            "Bin": "AAAOOAAA"
          },
          "Laegna": {
            "Num": "EAEA",
            "Digits": [
              3,
              2,
              3,
              2
            ],
            "Hex": "EE",
            "Bin": "AAAOAAAO"
          },
          "Float": {
            "Num": "93%",
            "Value": {
              "Percents": "93.359375%",
              "Units": 0.93359375
            },
            "Signed": {
              "Percents": "173.4375%",
              "Units": 1.734375
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 239,
              "sD": 111
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "240",
            "Signed": "+112",
            "Hex": "F0",
            "Bin": "11110000",
            "Laegna": "EAEE",
            "Wave": "EAOO"
          },
          "Wave": {
            "Num": "EAOO",
            "Digits": [
              3,
              2,
              1,
              1
            ],
            "Hex": "EP",
            "Bin": "AAAOOAOA"
          },
          "Laegna": {
            "Num": "EAEE",
            "Digits": [
              3,
              2,
              3,
              3
            ],
            "Hex": "EF",
            "Bin": "AAAOAAAA"
          },
          "Float": {
            "Num": "93%",
            "Value": {
              "Percents": "93.75%",
              "Units": 0.9375
            },
            "Signed": {
              "Percents": "175.0%",
              "Units": 1.75
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 240,
              "sD": 112
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "241",
            "Signed": "+113",
            "Hex": "F1",
            "Bin": "11110001",
            "Laegna": "EEII",
            "Wave": "EEII"
          },
          "Wave": {
            "Num": "EEII",
            "Digits": [
              3,
              3,
              0,
              0
            ],
            "Hex": "FK",
            "Bin": "AAAAOOOO"
          },
          "Laegna": {
            "Num": "EEII",
            "Digits": [
              3,
              3,
              0,
              0
            ],
            "Hex": "FK",
            "Bin": "AAAAOOOO"
          },
          "Float": {
            "Num": "94%",
            "Value": {
              "Percents": "94.140625%",
              "Units": 0.94140625
            },
            "Signed": {
              "Percents": "176.5625%",
              "Units": 1.765625
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 241,
              "sD": 113
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "242",
            "Signed": "+114",
            "Hex": "F2",
            "Bin": "11110010",
            "Laegna": "EEIO",
            "Wave": "EEIO"
          },
          "Wave": {
            "Num": "EEIO",
            "Digits": [
              3,
              3,
              0,
              1
            ],
            "Hex": "FJ",
            "Bin": "AAAAOOOA"
          },
          "Laegna": {
            "Num": "EEIO",
            "Digits": [
              3,
              3,
              0,
              1
            ],
            "Hex": "FJ",
            "Bin": "AAAAOOOA"
          },
          "Float": {
            "Num": "94%",
            "Value": {
              "Percents": "94.53125%",
              "Units": 0.9453125
            },
            "Signed": {
              "Percents": "178.125%",
              "Units": 1.78125
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 242,
              "sD": 114
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "243",
            "Signed": "+115",
            "Hex": "F3",
            "Bin": "11110011",
            "Laegna": "EEIA",
            "Wave": "EEIA"
          },
          "Wave": {
            "Num": "EEIA",
            "Digits": [
              3,
              3,
              0,
              2
            ],
            "Hex": "FI",
            "Bin": "AAAAOOAO"
          },
          "Laegna": {
            "Num": "EEIA",
            "Digits": [
              3,
              3,
              0,
              2
            ],
            "Hex": "FI",
            "Bin": "AAAAOOAO"
          },
          "Float": {
            "Num": "94%",
            "Value": {
              "Percents": "94.921875%",
              "Units": 0.94921875
            },
            "Signed": {
              "Percents": "179.6875%",
              "Units": 1.796875
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 243,
              "sD": 115
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "244",
            "Signed": "+116",
            "Hex": "F4",
            "Bin": "11110100",
            "Laegna": "EEIE",
            "Wave": "EEIE"
          },
          "Wave": {
            "Num": "EEIE",
            "Digits": [
              3,
              3,
              0,
              3
            ],
            "Hex": "FL",
            "Bin": "AAAAOOAA"
          },
          "Laegna": {
            "Num": "EEIE",
            "Digits": [
              3,
              3,
              0,
              3
            ],
            "Hex": "FL",
            "Bin": "AAAAOOAA"
          },
          "Float": {
            "Num": "95%",
            "Value": {
              "Percents": "95.3125%",
              "Units": 0.953125
            },
            "Signed": {
              "Percents": "181.25%",
              "Units": 1.8125
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 244,
              "sD": 116
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "245",
            "Signed": "+117",
            "Hex": "F5",
            "Bin": "11110101",
            "Laegna": "EEOI",
            "Wave": "EEOA"
          },
          "Wave": {
            "Num": "EEOA",
            "Digits": [
              3,
              3,
              1,
              2
            ],
            "Hex": "FO",
            "Bin": "AAAAOAAO"
          },
          "Laegna": {
            "Num": "EEOI",
            "Digits": [
              3,
              3,
              1,
              0
            ],
            "Hex": "FQ",
            "Bin": "AAAAOAOO"
          },
          "Float": {
            "Num": "95%",
            "Value": {
              "Percents": "95.703125%",
              "Units": 0.95703125
            },
            "Signed": {
              "Percents": "182.8125%",
              "Units": 1.828125
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 245,
              "sD": 117
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "246",
            "Signed": "+118",
            "Hex": "F6",
            "Bin": "11110110",
            "Laegna": "EEOO",
            "Wave": "EEOI"
          },
          "Wave": {
            "Num": "EEOI",
            "Digits": [
              3,
              3,
              1,
              0
            ],
            "Hex": "FQ",
            "Bin": "AAAAOAOO"
          },
          "Laegna": {
            "Num": "EEOO",
            "Digits": [
              3,
              3,
              1,
              1
            ],
            "Hex": "FP",
            "Bin": "AAAAOAOA"
          },
          "Float": {
            "Num": "96%",
            "Value": {
              "Percents": "96.09375%",
              "Units": 0.9609375
            },
            "Signed": {
              "Percents": "184.375%",
              "Units": 1.84375
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 246,
              "sD": 118
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "247",
            "Signed": "+119",
            "Hex": "F7",
            "Bin": "11110111",
            "Laegna": "EEOA",
            "Wave": "EEOE"
          },
          "Wave": {
            "Num": "EEOE",
            "Digits": [
              3,
              3,
              1,
              3
            ],
            "Hex": "FP",
            "Bin": "AAAAOAAA"
          },
          "Laegna": {
            "Num": "EEOA",
            "Digits": [
              3,
              3,
              1,
              2
            ],
            "Hex": "FO",
            "Bin": "AAAAOAAO"
          },
          "Float": {
            "Num": "96%",
            "Value": {
              "Percents": "96.484375%",
              "Units": 0.96484375
            },
            "Signed": {
              "Percents": "185.9375%",
              "Units": 1.859375
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 247,
              "sD": 119
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "248",
            "Signed": "+120",
            "Hex": "F8",
            "Bin": "11111000",
            "Laegna": "EEOE",
            "Wave": "EEOO"
          },
          "Wave": {
            "Num": "EEOO",
            "Digits": [
              3,
              3,
              1,
              1
            ],
            "Hex": "FP",
            "Bin": "AAAAOAOA"
          },
          "Laegna": {
            "Num": "EEOE",
            "Digits": [
              3,
              3,
              1,
              3
            ],
            "Hex": "FP",
            "Bin": "AAAAOAAA"
          },
          "Float": {
            "Num": "96%",
            "Value": {
              "Percents": "96.875%",
              "Units": 0.96875
            },
            "Signed": {
              "Percents": "187.5%",
              "Units": 1.875
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 248,
              "sD": 120
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "249",
            "Signed": "+121",
            "Hex": "F9",
            "Bin": "11111001",
            "Laegna": "EEAI",
            "Wave": "EEAA"
          },
          "Wave": {
            "Num": "EEAA",
            "Digits": [
              3,
              3,
              2,
              2
            ],
            "Hex": "FA",
            "Bin": "AAAAAOAO"
          },
          "Laegna": {
            "Num": "EEAI",
            "Digits": [
              3,
              3,
              2,
              0
            ],
            "Hex": "FC",
            "Bin": "AAAAAOOO"
          },
          "Float": {
            "Num": "97%",
            "Value": {
              "Percents": "97.265625%",
              "Units": 0.97265625
            },
            "Signed": {
              "Percents": "189.0625%",
              "Units": 1.890625
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 249,
              "sD": 121
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "250",
            "Signed": "+122",
            "Hex": "FA",
            "Bin": "11111010",
            "Laegna": "EEAO",
            "Wave": "EEAI"
          },
          "Wave": {
            "Num": "EEAI",
            "Digits": [
              3,
              3,
              2,
              0
            ],
            "Hex": "FC",
            "Bin": "AAAAAOOO"
          },
          "Laegna": {
            "Num": "EEAO",
            "Digits": [
              3,
              3,
              2,
              1
            ],
            "Hex": "FB",
            "Bin": "AAAAAOOA"
          },
          "Float": {
            "Num": "97%",
            "Value": {
              "Percents": "97.65625%",
              "Units": 0.9765625
            },
            "Signed": {
              "Percents": "190.625%",
              "Units": 1.90625
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 250,
              "sD": 122
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "251",
            "Signed": "+123",
            "Hex": "FB",
            "Bin": "11111011",
            "Laegna": "EEAA",
            "Wave": "EEAE"
          },
          "Wave": {
            "Num": "EEAE",
            "Digits": [
              3,
              3,
              2,
              3
            ],
            "Hex": "FB",
            "Bin": "AAAAAOAA"
          },
          "Laegna": {
            "Num": "EEAA",
            "Digits": [
              3,
              3,
              2,
              2
            ],
            "Hex": "FA",
            "Bin": "AAAAAOAO"
          },
          "Float": {
            "Num": "98%",
            "Value": {
              "Percents": "98.046875%",
              "Units": 0.98046875
            },
            "Signed": {
              "Percents": "192.1875%",
              "Units": 1.921875
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 251,
              "sD": 123
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "252",
            "Signed": "+124",
            "Hex": "FC",
            "Bin": "11111100",
            "Laegna": "EEAE",
            "Wave": "EEAO"
          },
          "Wave": {
            "Num": "EEAO",
            "Digits": [
              3,
              3,
              2,
              1
            ],
            "Hex": "FB",
            "Bin": "AAAAAOOA"
          },
          "Laegna": {
            "Num": "EEAE",
            "Digits": [
              3,
              3,
              2,
              3
            ],
            "Hex": "FB",
            "Bin": "AAAAAOAA"
          },
          "Float": {
            "Num": "98%",
            "Value": {
              "Percents": "98.4375%",
              "Units": 0.984375
            },
            "Signed": {
              "Percents": "193.75%",
              "Units": 1.9375
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 252,
              "sD": 124
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "253",
            "Signed": "+125",
            "Hex": "FD",
            "Bin": "11111101",
            "Laegna": "EEEI",
            "Wave": "EEEI"
          },
          "Wave": {
            "Num": "EEEI",
            "Digits": [
              3,
              3,
              3,
              0
            ],
            "Hex": "FG",
            "Bin": "AAAAAAOO"
          },
          "Laegna": {
            "Num": "EEEI",
            "Digits": [
              3,
              3,
              3,
              0
            ],
            "Hex": "FG",
            "Bin": "AAAAAAOO"
          },
          "Float": {
            "Num": "98%",
            "Value": {
              "Percents": "98.828125%",
              "Units": 0.98828125
            },
            "Signed": {
              "Percents": "195.3125%",
              "Units": 1.953125
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 253,
              "sD": 125
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "254",
            "Signed": "+126",
            "Hex": "FE",
            "Bin": "11111110",
            "Laegna": "EEEO",
            "Wave": "EEEO"
          },
          "Wave": {
            "Num": "EEEO",
            "Digits": [
              3,
              3,
              3,
              1
            ],
            "Hex": "FF",
            "Bin": "AAAAAAOA"
          },
          "Laegna": {
            "Num": "EEEO",
            "Digits": [
              3,
              3,
              3,
              1
            ],
            "Hex": "FF",
            "Bin": "AAAAAAOA"
          },
          "Float": {
            "Num": "99%",
            "Value": {
              "Percents": "99.21875%",
              "Units": 0.9921875
            },
            "Signed": {
              "Percents": "196.875%",
              "Units": 1.96875
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 254,
              "sD": 126
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "255",
            "Signed": "+127",
            "Hex": "FF",
            "Bin": "11111111",
            "Laegna": "EEEA",
            "Wave": "EEEA"
          },
          "Wave": {
            "Num": "EEEA",
            "Digits": [
              3,
              3,
              3,
              2
            ],
            "Hex": "FE",
            "Bin": "AAAAAAAO"
          },
          "Laegna": {
            "Num": "EEEA",
            "Digits": [
              3,
              3,
              3,
              2
            ],
            "Hex": "FE",
            "Bin": "AAAAAAAO"
          },
          "Float": {
            "Num": "99%",
            "Value": {
              "Percents": "99.609375%",
              "Units": 0.99609375
            },
            "Signed": {
              "Percents": "198.4375%",
              "Units": 1.984375
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 255,
              "sD": 127
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "256",
            "Signed": "+128",
            "Hex": "100",
            "Bin": "100000000",
            "Laegna": "EEEE",
            "Wave": "EEEE"
          },
          "Wave": {
            "Num": "EEEE",
            "Digits": [
              3,
              3,
              3,
              3
            ],
            "Hex": "FF",
            "Bin": "AAAAAAAA"
          },
          "Laegna": {
            "Num": "EEEE",
            "Digits": [
              3,
              3,
              3,
              3
            ],
            "Hex": "FF",
            "Bin": "AAAAAAAA"
          },
          "Float": {
            "Num": "100%",
            "Value": {
              "Percents": "100.0%",
              "Units": 1.0
            },
            "Signed": {
              "Percents": "200.0%",
              "Units": 2.0
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 256,
              "sD": 128
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        },
        {
          "Decimal": {
            "Num": "2inf",
            "Signed": "+inf",
            "Hex": null,
            "Bin": null,
            "Laegna": "\u2229\u2229\u2229\u2229",
            "Wave": "\u2229\u2229\u2229\u2229"
          },
          "Wave": {
            "Num": "\u2229\u2229\u2229\u2229",
            "Hex": "\u2229\u2229",
            "Bin": "\u2229\u2229\u2229\u2229\u2229\u2229\u2229\u2229"
          },
          "Laegna": {
            "Num": "\u2229\u2229\u2229\u2229",
            "Hex": "\u2229\u2229",
            "Bin": "\u2229\u2229\u2229\u2229\u2229\u2229\u2229\u2229"
          },
          "Float": {
            "Num": "100%",
            "Value": {
              "Percents": "100.0%",
              "Units": 1.0
            },
            "Signed": {
              "Percents": "200.0%",
              "Units": 2.0
            }
          },
          "Octave": {
            "Num": 8,
            "Lower": {
              "Num": 8,
              "Signed": 7,
              "D": 256,
              "sD": 128
            },
            "Higher": {
              "Num": 3,
              "Signed": 3
            }
          }
        }
      ]
    }
  ]
}
```
