# Data/Library

This library is to be put into folder of this task, /LaeGOS-Skydrive/Task1.md. It has index.html with WinBox for demonstration, and OOP style of keyboard and application logic container.

AI sets this up for use.

This library is going to take care of the keyboard, screen and consciousness about the current number.

Type of this is library:
- The main application is made for testing and user of the library.
- Later, we plug the logic off, and connect to other controller (../DataCode/index.html is similar example).

It needs to include WinBox window handler with this line:

```html
<script src="/static/js/winbox.bundle.min.js"></script>
```

## Number types

Number types it is going to support are not normal decimal or family numbers, but custom types. Thus, it needs to implement an abstract, empty coordinator for these things.

It has three screens:
- Answer
- Question
- Oracle

### Ans or answer screen

This screen contains the result of previous calculations.

### Que or question screen

This screen contains the number currently in between of entering.

### Oracle screen

This:
- Precalculates the answer in case user would click "=" now. Entering or removing digits changes this precalculated answer.
- When user hovers the buttons, button can precalculate what would happen if: button is clicked and then "=".
  - When user hovers the buttons which add or remove chars from ans, char to be removed gets strikethrough, while char to be added is temporarly shown with underline.

# Keyboards

Html table or other snippet can be added with keyboard:
- Based on ../DataRfx/laegna.json and laegna.md in same folder, as well as other files and documentations, keyboard formats can be guessed.

Keyboard has:
- CE for deleting the current number; C for resetting the whole state, deleting current number, operation and ans, leaving all zeroes, unsets and defaults.
- ⌫ for deleting the last digit of the current number.
- 1 line of digit values, which can be freely cut where line ends; or 2D table of digit values which has to be preserved in shape.
  - 1 liner example: ["I", "O", "A", "E"]; 2 liner example - array of 4 such arrays.
- 1 line of unknowns, or 2D table unknowns - U, V etc.

When key is hovered:
- Current calculator state is backed up, and diff is shown what would happen with the key; information of the digit, function or operator appears in hover status window.
  - This function uses callbacks.
- Each keyboard provides their own operators, so keyboard which entered the operator is called back.
  - If specific base type is selected in "Conversion" mode, keyboard provides the "=", if "Free" mode is used, where each digit can be of different type, "Free" entry type is selected.
    - If "Conversion" mode is selected, only single keyboard is active; in "Free" mode all keyboards are.

Finally, extensible operator keyboard with "+", "-", "*", "/"; and "=" which always calls the current keyboard; +-\*/ and = in this initial version could be connected to screen.
- The same control appears separately as window.

Number sign can be changed:
- Sign is not just + or -, but various signs can be entered from keyboard equal to screen keyboard.
  - Sign setter appears as window.

# Central logic

The calculator starts up and shows empty screen:
- Digits can be added.
  - If operator is clicked, the screen content goes to Ans and Que can be entered numbers.
  - Plus normal calculator logic, with oracle / preview and callbacks.

# Implementation

Separate js files are needed to handle number types:
- Each number type with keyboard gets their specific class type.
- Each number type can show ordered positions of bits, such as positions 0, 1, 2, 3, which contains 4 bits: number type can show it has 4 positions. If numbers are converted, original number is remembered - if any bits are deleted, such as in base-4 2 bits are deleted from the end, Base-8 remembers it's 3 bits, but sets 2 as masked: it now has bits 0, "M", "M", where two bits are invisible and not calculated; based on bits it shows up as other number system.
  - Driver modulus must exist which can change this logic - for example, capital and smallcase digit logic is complicated but influences where the logic is to be added.
  - Converter must be able to do this:
    - Have sequence of bits entered in various ways, with some bits deleted.
      - Decide how to show digit with some missing bits afterwards, back in free mode.
    - In free mode, showing each digit as-is in it's original base.
    - In conversion mode, asking each keyboard about what to do with it's entry if some of the digits are lost.
    - User can click at positions of number or fix the cursor to the end.

# Screen logic

WinBox is used:
- It has one example where windows initially appear as areas on canvas, and each can be brought up from this.
- Three screens are one united window which are first at canvas, keyboards each have their windows, second group below the first, finally more windows can exist, some at non-standard positions.

# Number types

There are converted mode number types ("wave mode"):
- They have corrected digit values to be displayed; i.e. wave mode window shows the current number in this conversion. Or user sets the wave mode primary, but it's first converted to normal number, then this is used. So I need to enter one layer for some number types, which basically mocks another type - digitwise, the other type is based on first type, and the other type implements number type, but uses one type in background, and knows both back and forth digitwise conversions. Create one example, as well as example keyboards, and you can look around in the repo to find which ones.

For most number type "Standard" and "Waveform" modulus can be selected, and "Waveform" is the syntactic sugar which needs to-way converted and examples of how to enter this.

There is also window for binary view:
- Type symbols where types are selected, such as "B4" for base-4.
- After type symbols, the bits from higher to lower significance, with some masked.

# Propositions

Each widget can associate 3 numbers on screen with their propositions:
- I.e. physics unit might assign it a named quality which tells what it would be, if it measures speed relative to speed of light, for example.

# Previews

Operations like changing number type etc. have previews:
- Preview modulus should be complete, so that:
  - Operation, for preview, can work on mock class. Hover itself knows this and same operation is assigned to this forked mock rather than real number, end of hover restores the main state and number can show diff - record, which numbers were added or removed - unless it's unreasonably complex, in which case it can show the new number or old and new number.
- The same operation, which previews, will do the operation if button is clicked.

This is library and it has minimalist design:
- We apply design when it's done, where here logic must be maximally visible to implement all the conversions.