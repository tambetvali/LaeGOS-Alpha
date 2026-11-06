# LaeGOS-Alpha

This is Laegna Mathematical Operating System, version 0.0 beta demo - LaeGOS-Alpha. It's the first subversion of Future Mathematical OS LaGOS, named after Logos - and logos will be $1(t=[0, 1, 2, ...])$ - each number is a function, and number 1 as function gives times, which resemble each Logos in order, expecially in right construction of views, such as constant external view. Multi-channel modulation is adviced as paradox appears at second logos, between internal and external.

## The main interface

In LaeGOS-Alpha repository, main interface needs to be at:
- LaeGOS-Alpha[repository]/LaeGOS-Skydrive[alpha]/index.html
  - - LaeGOS-Alpha[repository]/LaeGOS-Skydrive[alpha]/DataCode is where js files need to be, but index.html of each folder should link https://github.com/tambetvali/LaeGOS-Alpha/blob/main/ github folder relative link *from neocities, where I put copy of the repository and which is read by html browser, to github same folder with link "Files." after folder's name and possible explanation, direct links to interactive content etc. Each folder should take care of itself in it's index.html.

  LaeGOS-Alpha[repository]/LaeGOS-Skydrive[alpha]/index.html - this is the main view, so user will open this in browser.
  - README.md in the same folder serves in GitHub, and user downloads; index.html right in LaeGOS-Alpha[repository], should allow github zip repository download directly as it's a public repo.

  LaeGOS-Alpha[repository]/index.html - needs to contain download link, and LaeGOS-Skydrive, it's first version of Mathematical Interface.
  - Under it, LaeGOS-Alpha[repository]/index.html, linked from the main index as well logically as it's local subfolders with html content inside or below - each such folder needs to be structural in html, while all the depth can be navigated in github (if folder, no subfolder or nested subfolder contains any html to all branches, html idexes should ignore the folder, and it might have it's own hidden index file or not).

  https://spireason.neocities.org/ - Laegna & SpiReason's main site.
  https://github.com/tambetvali - Laegna & SpiReason's main git hub.
  https://github.com/tambetvali/LaeGOS-Alpha/blob/main/ - repository files
  https://github.com/tambetvali/LaeGOS-Alpha - repository link (LaeGOS-Alpha)
  LaeGOS-Alpha[repository]/ - repository coding here, where files in both are identical so one address exists for both. Creating file in here means creating it in spireason.nc, where it soon appears after my upload and user refresh:
  - /LaeGOS-Skydrive[alpha]/ - this is subfolder, and tagged as [alpha]. I use [repository] tag to make sure it's not folder inside repo, but the root of repo itself in it's higher zero-level structure.
    - If no clarification for partial url is given, such as DataGfx (images, graphics, multimedia, etc. such as videos), DataRfx (json files encoding Laegna, equal to graphics for an AI or some types of programmers or pythonic-javascriptic users of web or AI ecostructure), DataCode or just index.html - each case, the file must be under LaeGOS-Skydrive[alpha]/ *alpha version*, *LaeGOS alpha* under LaeGOS-Alpha[repository]/ *main repository* - *terms* we will use.

LaeGOS is Laegna implementation, and LaGOS is the actual animatible, Logos-enabled Operating System: you choose "1", the Number; then you open right windows, then you go to animator, and $1(t)$ starts playing with `t = 0; play; wait; t = 1; play; wait; t = 2; play; wait; etcetera.". It will be capable to choose plus or minus infinity for equal-precision, fractal-opening, alternative precisions, which could be unfolded adding "E"*R (for R=3, EEE, for R=1, E, text form multiplication for R level upper bounding box edge) - etcetera means goes on. For example, -∞ could be starting point instead of -16, -8, -4, -3, -2, -1, 0 or 1 or further; while +∞ could be selected as ending point and while zero cannot be reached - meaningful separation, v or the "known", thing you don't need to calculate, are chosen. Negative unknown => thing you cannot know => thing not to calculate; any meaning what meets some of these logical dispositions.

# Right now - 05/11/2026 and the few of next days perhaps, what we do is this:

Create this layout:
```
=================================================
|                                               |
| Calculator screen                             |
|                                               |
=================================================
|            | Tabs to select window background |
| Side Panel |                                  |
|            |                                  |
| Kb selector|      Windows inside              |
|            |           over the background    |
| Sel. Kb.   |                                  |
|            |                                  |
|            |                                  |
=================================================
```

---

Additionally: side panel would also exist on other side, and contain focus information, configurations, and remain focused if focused element is ctrl-clicked until it's red X is pressed.

Side panel has Keyboard selector and Keyboard.

One can choose keyboard; dropdown of side panel:
- Symbol icon, a letter of utf-8; style and class can be customized, the html template should be in string or class, not plain html.
  - The most important four layouts:
    - Laegna Base-2
    - Laegna Base-4
    - Laegna Base-8
    - Laegna Base-16
    - DataRfx/laegna.json contains the keyboard layouts:
      - "laegnaNumberSystems" (ln. 189): [ ... ] - the number base part
        - "id": "base2" (ln. 191)
          - "digits": ["O", "A"] - line 195

          - Add "[C] Clear Screen", "[<-] Delete last digit" buttons to each keyboard.
          - base-2 has linear layout.
          - "signs2" - it has + and - signs, two opposite polarities
            - User has signs before the keyboard, to click on "+" or "-", this sign appears; "·" is third selection which turns to ordinated, counted numbers, not values (with sign).
            "signs": ["-", "+"],
            "binary": [[0], [1]],
         - "id": "base4" (ln. 345)
           - "signs4" is used, with four signs not just + and -.
           - "digits": ["I", "O", "A", "E"],
           - "binary": [[0, 0], [0, 1], [1, 0], [1, 1]],
         - "base8" with "signs8", interchangeably.
         - "base16" with "signs8", interchangeably.
    