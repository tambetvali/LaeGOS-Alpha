# LaeChing + Numbers + Physics

Because Flower of Life is multidimensional geometry, we leave it for later:
- Here, I am going to do simplest LaeGOS style of LaeChing (I Ching), Number System and Physical Constant integration which would cover the important combinations.

I want to create, as first iteration choice, now these parts:

Three registers:
- Total: this is the number, which is left of all previous operation, and at top with the operator if exists. Empty if no numbers exist except the one on screen.
- Operator: this is the operation sign after the "total", small number at top of screen. It has application shortcut to it's operation, which is able to return the sign and graphics.
- Last: this is the number, which is currently on screen, which might be empty but rather exists as imaginary variable (i.e. the screen not switched off, so even if empty it's still a value).

Number can be:
- If "Clear" is clicked, it becomes empty: "U" is shown and the number assumed to be zero.
- Otherwise, bits "O" and "A" are in series:
  - It's shown either as base-2, base-4, base-8 or base-16 in Laegna systems;
    - or shown in decimals,
    - or I Ching lines and change lines.

I create the initial logic, then start adding different keyboards and screens. Initially to one canvas, and this windowing system - https://laegna.pythonanywhere.com/ / https://github.com/tambetvali/LaeGOS-Widgets - while the online version is often offline, the repository contains the python code.

All the logic will be in this HTML, once it initially works I start to expand it to further versions, but leave this one also here to enchance the basics in a simple language before coding something hard.
