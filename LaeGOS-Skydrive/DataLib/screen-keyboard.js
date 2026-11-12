export class ScreenCoordinator {
  constructor(numberType, onChange = () => {}) {
    this.numberType = numberType;
    this.onChange = onChange;
    this.reset();
  }

  enterSpecial(symbol) {
    if (!this.numberType.specialSymbols.includes(symbol)) {
      throw new RangeError(`Special symbol ${symbol} is not part of ${this.numberType.id}.`);
    }
    if (symbol === "∩") {
      this.enterUnknown(symbol);
      return;
    }
    this.currentDigits = [symbol];
    this.negative = false;
    this.message = `${symbol} entered as a special number value.`;
    this.emit();
  }

  reset() {
    this.answer = null;
    this.currentDigits = [];
    this.pendingOperator = null;
    this.negative = false;
    this.message = "Enter a digit, then choose an operation.";
    this.emit();
  }

  setNumberType(numberType) {
    const previousValue = this.currentDigits.length && numberType.isArithmeticEntry(this.currentDigits)
      ? this.getSignedCurrentValue()
      : null;
    this.numberType = numberType;
    if (previousValue !== null) {
      this.negative = previousValue < 0n;
      this.currentDigits = numberType.fromValue(previousValue);
    }
    this.emit();
  }

  getCurrentValue() {
    if (!this.numberType.isArithmeticEntry(this.currentDigits)) {
      throw new Error("Symbolic unknowns cannot be used in arithmetic.");
    }
    return this.numberType.toValue(this.currentDigits);
  }

  enterDigit(digitIndex) {
    this.numberType.toValue([digitIndex]);
    if (this.currentDigits.length === 1 && this.currentDigits[0] === "W") this.currentDigits = [];
    this.currentDigits.push(digitIndex);
    this.message = `Entered ${this.numberType.digits[digitIndex]}.`;
    this.emit();
  }

  enterUnknown(symbol) {
    const encoded = this.numberType.encodeUnknownSymbol(symbol).slice(1);
    if (this.numberType.id === "base4" && ["U", "∩"].includes(symbol)) {
      this.currentDigits = encoded;
    } else {
      if (this.currentDigits.length === 1 && this.currentDigits[0] === "W") this.currentDigits = [];
      this.currentDigits.push(...encoded);
    }
    this.message = `${symbol} entered as a symbolic unknown (not an arithmetic digit).`;
    this.emit();
  }

  backspace() {
    this.currentDigits.pop();
    this.negative = this.currentDigits.length ? this.negative : false;
    this.message = "Removed the last current-entry symbol.";
    this.emit();
  }

  clearEntry() {
    this.currentDigits = [];
    this.negative = false;
    this.message = "Current entry cleared.";
    this.emit();
  }

  setSign(negative) {
    this.negative = Boolean(negative);
    this.message = `Current entry sign set to ${negative ? "negative" : "positive"}.`;
    this.emit();
  }

  applyOperator(operator) {
    if (!this.numberType.isArithmeticEntry(this.currentDigits)) {
      throw new Error("Symbolic unknowns cannot be used in arithmetic yet.");
    }
    const current = this.getSignedCurrentValue();
    if (this.answer !== null && this.pendingOperator && this.currentDigits.length) {
      this.answer = this.calculate(this.answer, current, this.pendingOperator);
    } else if (this.currentDigits.length) {
      this.answer = current;
    }
    if (this.answer === null) {
      this.message = "Enter a number before choosing an operation.";
      this.emit();
      return;
    }
    this.pendingOperator = operator;
    this.currentDigits = [];
    this.negative = false;
    this.message = `Answer stored; enter the next number for ${operator}.`;
    this.emit();
  }

  equals() {
    if (!this.numberType.isArithmeticEntry(this.currentDigits)) {
      throw new Error("Symbolic unknowns cannot be used in arithmetic yet.");
    }
    if (!this.pendingOperator || this.answer === null || !this.currentDigits.length) {
      this.message = "Enter both operands and an operator before calculating.";
      this.emit();
      return;
    }
    const result = this.calculate(this.answer, this.getSignedCurrentValue(), this.pendingOperator);
    this.answer = result;
    this.pendingOperator = null;
    this.currentDigits = [];
    this.negative = false;
    this.message = "Calculation complete.";
    this.emit();
  }

  calculate(left, right, operator) {
    switch (operator) {
      case "+": return left + right;
      case "−": return left - right;
      case "×": return left * right;
      case "÷":
        if (right === 0n) throw new RangeError("Cannot divide by zero.");
        return left / right;
      default: throw new RangeError(`Unsupported operator: ${operator}`);
    }
  }

  getSignedCurrentValue() {
    const value = this.getCurrentValue();
    return this.negative ? -value : value;
  }

  getDisplaySnapshot() {
    const currentNumeric = this.numberType.isArithmeticEntry(this.currentDigits);
    const currentValue = currentNumeric ? this.getSignedCurrentValue() : null;
    return {
      answer: this.answer === null ? "—" : this.formatValue(this.answer),
      question: this.formatCurrent(),
      oracle: this.getOracleValue(),
      operation: this.pendingOperator ?? "—",
      message: this.message,
      answerValue: this.answer,
      currentValue,
      driverEntry: this.numberType.encodeDigits(this.currentDigits)
    };
  }

  formatValue(value) {
    const digits = this.numberType.fromValue(value);
    return this.numberType.format(digits, value < 0n);
  }

  formatCurrent() {
    return this.formatDigits(this.currentDigits, this.negative);
  }

  formatDigits(digits, negative = false) {
    if (!this.numberType.isArithmeticEntry(digits)) {
      return JSON.stringify(this.numberType.encodeDigits(digits));
    }
    return this.numberType.format(digits, negative);
  }

  getOracleValue() {
    if (!this.numberType.isArithmeticEntry(this.currentDigits)) return "symbolic input";
    if (!this.currentDigits.length) {
      return this.pendingOperator && this.answer !== null ? this.formatValue(this.answer) : "—";
    }
    const current = this.getSignedCurrentValue();
    if (this.pendingOperator && this.answer !== null) {
      try {
        return this.formatValue(this.calculate(this.answer, current, this.pendingOperator));
      } catch (error) {
        return error instanceof Error ? error.message : "preview unavailable";
      }
    }
    return this.formatValue(current);
  }

  preview(action) {
    const preview = {
      before: this.formatCurrent(),
      question: this.formatCurrent(),
      oracle: this.getOracleValue(),
      detail: action.detail,
      added: action.added ?? "",
      removed: action.removed ?? ""
    };
    const actionKind = action.action ?? action.kind;
    if (actionKind === "digit") {
      const currentDigits = this.currentDigits.length === 1 && this.currentDigits[0] === "W" ? [] : this.currentDigits;
      const next = [...currentDigits, action.value];
      preview.question = this.formatDigits(next, this.negative);
      if (this.numberType.isArithmeticEntry(next)) {
        const currentValue = this.numberType.toValue(next) * (this.negative ? -1n : 1n);
        preview.oracle = this.getPreviewValue(currentValue);
      } else {
        preview.oracle = "symbolic input";
      }
    } else if (actionKind === "unknown") {
      const encoded = this.numberType.encodeUnknownSymbol(action.value).slice(1);
      const next = this.numberType.id === "base4" && action.value === "U"
        ? encoded
        : [...this.currentDigits, ...encoded];
      preview.question = this.formatDigits(next, this.negative);
      preview.oracle = "symbolic input";
    } else if (actionKind === "special") {
      const encoded = this.numberType.encodeUnknownSymbol(action.value).slice(1);
      const next = action.value === "∩" && this.numberType.id === "base4" ? encoded : [action.value];
      preview.question = this.formatDigits(next);
      preview.oracle = this.numberType.isArithmeticEntry(next)
        ? this.numberType.formatValue(this.numberType.toValue(next))
        : "symbolic input";
    } else if (actionKind === "backspace") {
      const removedIndex = this.currentDigits.at(-1);
      const remaining = this.currentDigits.slice(0, -1);
      preview.question = this.formatDigits(remaining, this.negative);
      preview.removed = typeof removedIndex === "number" ? this.numberType.digits[removedIndex] : removedIndex ?? "";
      if (remaining.length && this.numberType.isArithmeticEntry(remaining)) {
        const currentValue = this.numberType.toValue(remaining) * (this.negative ? -1n : 1n);
        preview.oracle = this.getPreviewValue(currentValue);
      } else {
        preview.oracle = remaining.length ? "symbolic input" : "—";
      }
    } else if (actionKind === "clear" || actionKind === "clearEntry") {
      preview.question = "U";
      preview.oracle = "—";
      preview.removed = this.formatCurrent() === "U" ? "" : this.formatCurrent();
    }
    return preview;
  }

  getPreviewValue(currentValue) {
    if (this.pendingOperator && this.answer !== null) {
      try {
        return this.formatValue(this.calculate(this.answer, currentValue, this.pendingOperator));
      } catch (error) {
        return error instanceof Error ? error.message : "preview unavailable";
      }
    }
    return this.formatValue(currentValue);
  }

  emit() {
    this.onChange(this.getDisplaySnapshot());
  }
}

export class Keyboard {
  constructor({ name, digits = [], unknowns = [], specials = [], columns = 4, onPress, onPreview = () => {} }) {
    this.name = name;
    this.digits = digits;
    this.unknowns = unknowns;
    this.specials = specials;
    this.columns = columns;
    this.onPress = onPress;
    this.onPreview = onPreview;
  }

  render(container) {
    container.replaceChildren();
    container.classList.add("keyboard");
    const caption = document.createElement("div");
    caption.className = "keyboard-caption";
    const title = document.createElement("strong");
    title.textContent = this.name;
    const count = document.createElement("span");
    count.textContent = `${this.digits.length} digits`;
    caption.append(title, count);
    container.append(caption);

    const digitGrid = document.createElement("div");
    digitGrid.className = "key-grid";
    digitGrid.style.setProperty("--columns", String(this.columns));
    for (const digit of this.digits) {
      digitGrid.append(this.createKey(digit.label, {
        kind: "digit",
        detail: `${digit.label} · digit value ${digit.value}`,
        value: digit.value,
        added: digit.label
      }, () => this.onPress("digit", digit.value)));
    }
    container.append(digitGrid);

    if (this.unknowns.length) {
      const unknownGrid = document.createElement("div");
      unknownGrid.className = "key-grid";
      unknownGrid.style.setProperty("--columns", String(this.columns));
      for (const symbol of this.unknowns) {
        unknownGrid.append(this.createKey(symbol, {
          kind: "unknown",
          detail: `${symbol} · symbolic unknown`,
          value: symbol,
          added: symbol
        }, () => this.onPress("unknown", symbol)));
      }
      container.append(unknownGrid);
    }

    if (this.specials.length) {
      const specialGrid = document.createElement("div");
      specialGrid.className = "key-grid";
      specialGrid.style.setProperty("--columns", String(Math.min(this.columns, this.specials.length)));
      for (const symbol of this.specials) {
        specialGrid.append(this.createKey(symbol, {
          kind: "special",
          action: "special",
          detail: `${symbol} · special number symbol`,
          value: symbol,
          added: symbol
        }, () => this.onPress("special", symbol)));
      }
      container.append(specialGrid);
    }

    const actions = document.createElement("div");
    actions.className = "keyboard-actions";
    actions.append(
      this.createKey("CE", { kind: "danger", action: "clearEntry", detail: "Clear current entry" }, () => this.onPress("clearEntry")),
      this.createKey("C", { kind: "danger", action: "clear", detail: "Reset answer, entry, and operation" }, () => this.onPress("clear")),
      this.createKey("⌫", { kind: "danger", action: "backspace", detail: "Remove the last current-entry symbol" }, () => this.onPress("backspace"))
    );
    container.append(actions);
    const help = document.createElement("p");
    help.className = "key-help";
    help.textContent = "Unknown symbols are display-only in this foundation; arithmetic rejects them explicitly.";
    container.append(help);
  }

  createKey(label, preview, activate) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "key";
    button.dataset.kind = preview.kind ?? "action";
    button.textContent = label;
    button.setAttribute("aria-label", preview.detail);
    button.addEventListener("pointerenter", () => this.onPreview(preview));
    button.addEventListener("focus", () => this.onPreview(preview));
    button.addEventListener("pointerleave", () => this.onPreview(null));
    button.addEventListener("blur", () => this.onPreview(null));
    button.addEventListener("click", activate);
    return button;
  }
}
