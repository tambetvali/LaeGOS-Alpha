Planned use of this folder and it's content:
- This folder is used ARAP, not necessarily in every part of the application.
- LaeChing with 64 hexagrams and other symbols are symbolic data which is hard to collect and organize:
  - The script will most definitely use either laegna.json file for this purpose, and/or tables copied from this file.
- Keyboards, on the other hand, are very systematic with various parameters:
  - Just reading numbered digit values from laegna.json is not always very efficient;
  - Rather, which is efficient, is reading the file once the keyboards are there, and utilizing colors, symbols, etc.
  - Json also then-allows custom addition of tags, which are easily accessible in script.

What is the secondary but main purpose of files in this folder are:
- Users can collect systematic, minimalist information of Laegna numerical basin while they need to develop apps to the OS etc.:
  - They do not lack essential information, and once they add it, they can make it available for everyone in standard format.
- Programs can load the json data directly.
- Last but far from least:
  - CoPilot and other AI's just arranged simple sequence I, O, A, E into nonsense initially, as if it was random pattern;
    - After adding number data jsons, they suddenly and all understood the letters even without repo link: altough they are not trained meanwhile, but they are somehow up to date inside those terms.
    - So, adding these basic files helps to keep one repository, which can be added to your document collection or uploaded to AI each time you discuss topic in this specific file.

---

The hardest to remember and recollect part of these files is thereby brough also here - it's the binary order of I Ching, because 64 symbols (a lot) are ordered in *non-binary order* in I Ching, with major holographic oppositions first, symbols with little differences last. Altough he describes the binary logic and has trigrams, indeed, arranged exactly in their binary order, which makes them easier to implement - but they are still brought here as second table. Purpose of table is simple copy-paste.

Add and multiply 4*4 squares.

|    | 💙 Multiply ×              | 💚 Add +                  | ❤️ Subtract -            | 💛 Divide ÷                |
|----|----------------------------|----------------------------|---------------------------|----------------------------|
| 🔵 | 🟦䷀ ‖ 🟩䷫ ‖ 🟥䷌ ‖ 🟨䷠ | 🟦䷍ ‖ 🟩䷱ ‖ 🟥䷝ ‖ 🟨䷷ | 🟦䷪ ‖ 🟩䷛ ‖ 🟥䷰ ‖ 🟨䷞ | 🟦䷡ ‖ 🟩䷟ ‖ 🟥䷶ ‖ 🟨䷽ |
| 🟢 | 🟦䷉ ‖ 🟩䷅ ‖ 🟥䷘ ‖ 🟨䷋ | 🟦䷥ ‖ 🟩䷿ ‖ 🟥䷔ ‖ 🟨䷢ | 🟦䷹ ‖ 🟩䷮ ‖ 🟥䷐ ‖ 🟨䷬ | 🟦䷵ ‖ 🟩䷧ ‖ 🟥䷲ ‖ 🟨䷏ |
| 🔴 | 🟦䷈ ‖ 🟩䷸ ‖ 🟥䷤ ‖ 🟨䷴ | 🟦䷙ ‖ 🟩䷑ ‖ 🟥䷕ ‖ 🟨䷳ | 🟦䷄ ‖ 🟩䷯ ‖ 🟥䷾ ‖ 🟨䷦ | 🟦䷊ ‖ 🟩䷭ ‖ 🟥䷣ ‖ 🟨䷎ |
| 🟡 | 🟦䷼ ‖ 🟩䷺ ‖ 🟥䷩ ‖ 🟨䷓ | 🟦䷨ ‖ 🟩䷃ ‖ 🟥䷚ ‖ 🟨䷖ | 🟦䷻ ‖ 🟩䷜ ‖ 🟥䷂ ‖ 🟨䷇ | 🟦䷒ ‖ 🟩䷆ ‖ 🟥䷗ ‖ 🟨䷁ |

|            | Trigram | Orig.   | Original Bagua position |
|------------|---------|---------|-------------------------|
| 🟦Heaven   | ☰       | Qián 乾 | Northwest               |
| 🟩Wind     | ☴       | Xùn 巽  | Southeast               |
| 🟥Fire     | ☲       | Lí 離   | South                   |
| 🟨Mountain | ☶       | Gèn 艮  | Northeast               |
| 🔵Lake     | ☱       | Duì 兌  | West                    |
| 🟢Water    | ☵       | Kǎn 坎  | North                   |
| 🔴Thunder  | ☳       | Zhèn 震 | East                    |
| 🟡Earth    | ☷       | Kūn 坤  | Southwest               |

These tables continue:
- [I Ching](iching.md)

---

This folder is for abstract data files.

If `DataGfx` stands for **Graphics Data** (Visuals/Images), then a `DataRfx` folder containing JSON files with numeric data represents **Render Effects**, **Radars/Radio**, or **Statistical Reference data** depending on your specific field.

---

Etymology / theory (Google AI + ChatGPT):

# DataGfx vs. DataRfx

## Graphics Data and Reference Data

The distinction between `DataGfx` and `DataRfx` is a separation between visual representation and its underlying numerical structure.

Both names use the `Fx` shorthand for *Effects* or *Fields*, while the prefixes `G` and `R` distinguish two complementary domains:

- **Gfx — Graphics:** Visual representation, images, textures, and graphical output.
- **Rfx — Reference / Relational Effects:** Numerical data, references, parameters, and mathematical relationships that describe, position, transform, or relate graphical elements.

In this context, `Rfx` is best understood as **Reference Effects** or **Relational Effects**, rather than the unrelated technical meanings of RFX in other fields.

## 1. DataGfx — Graphics Data

`DataGfx` contains the visual assets themselves.

Typical contents include:

- Images (`.png`, `.jpg`, `.webp`, `.svg`)
- Textures and sprites
- Graphical representations
- Visual diagrams and rendered outputs
- UI elements and graphical resources

**Purpose:** Store the visual appearance of objects, systems, or data.

## 2. DataRfx — Reference and Relational Data

`DataRfx` contains structured numerical data that defines the relationships, properties, and transformations associated with graphical or mathematical objects.

Typical contents include:

- JSON files containing numerical values
- Coordinates and spatial references
- Vectors and matrices
- Scale and curvature parameters
- Transformations and projection coefficients
- Statistical values and distributions
- Relations between objects, dimensions, and reference systems
- Parameters used to generate or modify graphical representations

**Purpose:** Store the mathematical and relational structure behind visual representations.

## 3. The Relationship Between Gfx and Rfx

The two folders represent complementary aspects of a data system.

| Aspect | DataGfx | DataRfx |
|---|---|---|
| Meaning | Graphics | Reference / Relational Effects |
| Domain | Visual representation | Numerical structure |
| Typical format | PNG, JPG, SVG, WebP | JSON |
| Data type | Images and graphical assets | Numbers, vectors, matrices, relations |
| Role | Appearance | Structure and parameters |
| Interpretation | What something looks like | How it is defined, positioned, transformed, or related |

The relationship can be expressed as:

    DataRfx → Parameters, Relations, References
                     ↓
    DataGfx  ← Rendering, Projection, Visualization

The numerical data may be used to generate graphics, while the graphics provide a visual interpretation of the underlying numerical structure.

## 4. Possible Interpretations of Rfx

Depending on the application, Rfx can have several technical interpretations:

### Reference Effects

Numerical references, coordinate systems, and parameters used to define graphical objects and their properties.

### Relational Effects

Mathematical relationships between objects, dimensions, scales, and transformations.

### Render Effects

Parameters that modify the rendering process, including reflection, refraction, deformation, and other visual effects.

### Random Effects

In statistical modeling, random effects describe variation associated with groups or hierarchical structures.

### Radio Frequency / Radar Effects

In signal processing, RFX may refer to radio-frequency or radar-related numerical data.

These interpretations are context-dependent. For a general-purpose numerical JSON data folder paired with graphics, Reference Effects and Relational Effects provide the most coherent meanings.

## 5. Separation of Concerns

The `DataGfx` and `DataRfx` structure follows a separation of concerns:

- `DataGfx` stores the visual representation.
- `DataRfx` stores the numerical and relational description.

This allows graphical assets and mathematical data to evolve independently.

The same numerical data may produce multiple visual representations, and the same graphical asset may be associated with different reference systems or transformations.

In this sense:

    Gfx = Appearance
    Rfx = Reference / Relations

    Gfx : What is represented
    Rfx : How it is defined and related

Together, they provide a structured separation between graphical representation and its underlying mathematical data.
