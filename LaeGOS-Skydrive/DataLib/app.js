import { numberTypesFromData } from "./number-types.js";
import { Keyboard, ScreenCoordinator } from "./screen-keyboard.js";

const DATA_URL = "../DataRfx/laegna.json";
const OPERATORS = ["÷", "−", "+", "×"];
const WINDOW_DEFINITIONS = {
  screen: { title: "Answer · Question · Oracle", width: 700, height: 270 },
  digits: { title: "Digit keyboard", width: 390, height: 440 },
  unknowns: { title: "Unknown keyboard", width: 300, height: 300 },
  operators: { title: "Operator keyboard", width: 320, height: 270 },
  sign: { title: "Sign setter", width: 300, height: 220 },
  wave: { title: "Wave / bit view", width: 440, height: 360 }
};

const elements = {
  status: document.getElementById("library-status"),
  typeSelect: document.getElementById("number-type"),
  desktop: document.querySelector(".desktop"),
  launchers: document.getElementById("window-launchers"),
  blocks: document.getElementById("window-blocks"),
  fallbackWindows: document.getElementById("fallback-windows")
};

const state = {
  types: [],
  numberType: null,
  coordinator: null,
  windows: new Map(),
  blockSlots: new Map(),
  blockContents: new Map(),
  preview: null,
  mode: "conversion"
};

function setStatus(message, kind = "info") {
  elements.status.textContent = message;
  elements.status.dataset.kind = kind;
}

function initialize(data) {
  state.types = numberTypesFromData(data);
  state.numberType = state.types.find((type) => type.id === "base4");
  state.coordinator = new ScreenCoordinator(state.numberType, renderScreens);
  for (const type of state.types) {
    const option = document.createElement("option");
    option.value = type.id;
    option.textContent = `${type.name} · base ${type.base}`;
    elements.typeSelect.append(option);
  }
  elements.typeSelect.value = state.numberType.id;
  elements.typeSelect.disabled = false;
  elements.typeSelect.addEventListener("change", changeType);
  elements.launchers.querySelectorAll("[data-window]").forEach((button) => {
    button.addEventListener("click", () => openWindow(button.dataset.window));
  });
  renderWindowBlocks();
  renderScreens();
  setStatus("Loaded laegna.json. All screens and keyboards are available in page content.");
}

function changeType() {
  const selected = state.types.find((type) => type.id === elements.typeSelect.value);
  if (!selected) {
    setStatus(`Unknown number type: ${elements.typeSelect.value}`, "error");
    return;
  }
  state.numberType = selected;
  state.preview = null;
  state.coordinator.setNumberType(selected);
  updateWindow("digits");
  updateWindow("unknowns");
  updateWindow("wave");
  setStatus(`${selected.name} selected. The current numeric value is converted to the new base.`);
}

function renderScreens() {
  const screen = document.querySelector("[data-screen-content]");
  if (!screen) return;
  const snapshot = state.coordinator.getDisplaySnapshot();
  screen.querySelector("[data-register='answer']").textContent = snapshot.answer;
  renderQuestion(screen.querySelector("[data-register='question']"), snapshot.question);
  screen.querySelector("[data-register='oracle']").textContent = state.preview?.oracle ?? snapshot.oracle;
  screen.querySelector("[data-register-detail='answer']").textContent = snapshot.operation === "—" ? "previous result" : `operation ${snapshot.operation}`;
  screen.querySelector("[data-register-detail='question']").textContent = `base ${state.numberType.base} · ${state.numberType.name}`;
  screen.querySelector("[data-register-detail='oracle']").textContent = state.preview?.detail ?? "preview if you calculate now";
  screen.querySelector("[data-screen-message]").textContent = state.preview
    ? `Hover preview: ${state.preview.detail}`
    : snapshot.message;
  renderBitView();
}

function renderQuestion(output, value) {
  output.replaceChildren();
  const preview = state.preview;
  if (preview?.removed) {
    const removed = document.createElement("del");
    removed.textContent = preview.removed;
    output.append(document.createTextNode(preview.question), removed);
  } else if (preview?.added) {
    const retained = document.createElement("span");
    retained.textContent = preview.before === "U" ? "" : preview.before;
    const added = document.createElement("ins");
    added.textContent = preview.added;
    output.append(retained, added);
  } else {
    output.textContent = value;
  }
}

function screenContent() {
  const section = document.createElement("section");
  section.className = "screen-registers";
  section.dataset.screenContent = "";
  for (const [key, label] of [["answer", "ANSWER"], ["question", "QUESTION"], ["oracle", "ORACLE"]]) {
    const register = document.createElement("div");
    register.className = "register";
    const title = document.createElement("span");
    title.className = "register-label";
    title.textContent = label;
    const value = document.createElement("output");
    value.className = "register-value";
    value.dataset.register = key;
    const detail = document.createElement("small");
    detail.className = "register-detail";
    detail.dataset.registerDetail = key;
    register.append(title, value, detail);
    section.append(register);
  }
  const message = document.createElement("p");
  message.className = "screen-message";
  message.dataset.screenMessage = "";
  section.append(message);
  return section;
}

function digitKeyboardContent() {
  const wrapper = document.createElement("div");
  const keyboard = new Keyboard({
    name: `${state.numberType.name} · ${state.numberType.layout}`,
    digits: state.numberType.digits.map((label, value) => ({ label, value })),
    unknowns: [],
    specials: [],
    columns: state.numberType.layout === "grid" ? 4 : Math.min(6, state.numberType.digits.length),
    onPress: handleDigitAction,
    onPreview: showPreview
  });
  keyboard.render(wrapper);
  return wrapper;
}

function unknownKeyboardContent() {
  const wrapper = document.createElement("div");
  const keyboard = new Keyboard({
    name: "Unknowns · known bits · special values",
    unknowns: state.numberType.unknowns,
    specials: state.numberType.specialSymbols,
    columns: 2,
    onPress: handleDigitAction,
    onPreview: showPreview
  });
  keyboard.render(wrapper);
  return wrapper;
}

function operatorKeyboardContent() {
  const wrapper = document.createElement("div");
  wrapper.className = "keyboard";
  const caption = document.createElement("div");
  caption.className = "keyboard-caption";
  caption.innerHTML = "<strong>Arithmetic operators</strong><span>calls this keyboard on commit</span>";
  wrapper.append(caption);
  const grid = document.createElement("div");
  grid.className = "key-grid";
  grid.style.setProperty("--columns", "4");
  for (const operator of OPERATORS) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "key";
    button.dataset.kind = "operator";
    button.textContent = operator;
    button.setAttribute("aria-label", `Apply ${operator}`);
    button.addEventListener("pointerenter", () => showPreview({
      detail: `Preview ${operator} with the current answer`,
      oracle: state.coordinator.getOracleValue(),
      question: state.coordinator.formatCurrent()
    }));
    button.addEventListener("focus", () => showPreview({ detail: `Preview ${operator}`, oracle: state.coordinator.getOracleValue() }));
    button.addEventListener("pointerleave", () => showPreview(null));
    button.addEventListener("blur", () => showPreview(null));
    button.addEventListener("click", () => {
      try {
        state.preview = null;
        state.coordinator.applyOperator(operator);
        setStatus(`Operator ${operator} committed by the operator keyboard.`);
      } catch (error) {
        reportError(error);
      }
    });
    grid.append(button);
  }
  wrapper.append(grid);
  const equals = document.createElement("button");
  equals.type = "button";
  equals.className = "key";
  equals.dataset.kind = "operator";
  equals.textContent = "=  Calculate";
  equals.addEventListener("pointerenter", () => showPreview({
    detail: "Calculate with the active operator keyboard",
    oracle: state.coordinator.getOracleValue()
  }));
  equals.addEventListener("focus", () => showPreview({ detail: "Calculate now", oracle: state.coordinator.getOracleValue() }));
  equals.addEventListener("pointerleave", () => showPreview(null));
  equals.addEventListener("blur", () => showPreview(null));
  equals.addEventListener("click", () => {
    try {
      state.preview = null;
      state.coordinator.equals();
      setStatus("Calculation committed.");
    } catch (error) {
      reportError(error);
    }
  });
  wrapper.append(equals);
  const help = document.createElement("p");
  help.className = "key-help";
  help.textContent = "Each operator keyboard owns its callbacks; the extensible operator list is defined in app.js.";
  wrapper.append(help);
  return wrapper;
}

function signKeyboardContent() {
  const wrapper = document.createElement("div");
  wrapper.className = "keyboard";
  const description = document.createElement("p");
  description.className = "key-help";
  description.textContent = "Sign applies to the current question entry. It does not alter the previous answer.";
  const actions = document.createElement("div");
  actions.className = "sign-toggle";
  for (const sign of [{ label: "+ Positive", negative: false }, { label: "− Negative", negative: true }]) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "key";
    button.textContent = sign.label;
    button.addEventListener("click", () => {
      state.preview = null;
      state.coordinator.setSign(sign.negative);
    });
    button.addEventListener("pointerenter", () => showPreview({ detail: `Set ${sign.negative ? "negative" : "positive"} sign`, oracle: state.coordinator.getOracleValue() }));
    button.addEventListener("pointerleave", () => showPreview(null));
    actions.append(button);
  }
  wrapper.append(description, actions);
  return wrapper;
}

function waveContent() {
  const wrapper = document.createElement("div");
  wrapper.className = "keyboard";
  const typeDescription = document.createElement("p");
  typeDescription.className = "key-help";
  typeDescription.textContent = state.numberType.description || "Bit groups are shown from most- to least-significant position.";
  wrapper.append(typeDescription);
  const wave = document.createElement("output");
  wave.className = "wave-result";
  wave.dataset.waveOutput = "";
  wrapper.append(wave);
  const table = document.createElement("table");
  table.className = "bit-table";
  table.innerHTML = "<thead><tr><th>Digit</th><th>Position</th><th>Bit</th><th>Mask</th></tr></thead><tbody data-bit-rows></tbody>";
  wrapper.append(table);
  renderBitView(wrapper);
  return wrapper;
}

function renderBitView(root = document) {
  const waveOutput = root.querySelector("[data-wave-output]") ?? document.querySelector("[data-wave-output]");
  const rows = root.querySelector("[data-bit-rows]") ?? document.querySelector("[data-bit-rows]");
  if (!waveOutput || !rows) return;
  const digits = state.coordinator.currentDigits.filter((digit) => typeof digit === "number");
  waveOutput.textContent = state.numberType.format(digits, state.coordinator.negative);
  rows.replaceChildren();
  const bitMap = state.numberType.getBitMap(digits);
  digits.forEach((digit, digitPosition) => {
    for (const bit of bitMap.filter((item) => item.digitPosition === digitPosition)) {
      const row = document.createElement("tr");
      for (const value of [
        state.numberType.digits[digit],
        String(bit.position),
        String(bit.value),
        bit.masked ? "M" : "—"
      ]) {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.append(cell);
      }
      rows.append(row);
    }
  });
}

function handleDigitAction(action, value) {
  try {
    state.preview = null;
    if (action === "digit") state.coordinator.enterDigit(value);
    else if (action === "unknown") state.coordinator.enterUnknown(value);
    else if (action === "special") state.coordinator.enterSpecial(value);
    else if (action === "backspace") state.coordinator.backspace();
    else if (action === "clearEntry") state.coordinator.clearEntry();
    else if (action === "clear") state.coordinator.reset();
  } catch (error) {
    reportError(error);
  }
}

function showPreview(preview) {
  state.preview = preview ? state.coordinator.preview(preview) : null;
  if (preview) state.preview = { ...state.preview, ...preview };
  renderScreens();
}

function reportError(error) {
  const message = error instanceof Error ? error.message : "The requested action failed.";
  setStatus(message, "error");
  state.preview = null;
  state.coordinator.message = message;
  state.coordinator.emit();
}

function createWindowContent(id) {
  switch (id) {
    case "screen": return screenContent();
    case "digits": return digitKeyboardContent();
    case "unknowns": return unknownKeyboardContent();
    case "operators": return operatorKeyboardContent();
    case "sign": return signKeyboardContent();
    case "wave": return waveContent();
    default: throw new RangeError(`Unknown window: ${id}`);
  }
}

function renderWindowBlocks() {
  for (const [id, definition] of Object.entries(WINDOW_DEFINITIONS)) {
    const block = document.createElement("article");
    block.className = "window-block";
    block.dataset.windowBlock = id;
    const title = document.createElement("button");
    title.type = "button";
    title.className = "window-block-title";
    title.dataset.window = id;
    title.textContent = definition.title;
    title.addEventListener("click", () => openWindow(id));
    const slot = document.createElement("div");
    slot.className = "window-block-content";
    const content = createWindowContent(id);
    slot.append(content);
    block.append(title, slot);
    block.addEventListener("click", (event) => {
      if (!event.target.closest("button")) openWindow(id);
    });
    elements.blocks.append(block);
    state.blockSlots.set(id, slot);
    state.blockContents.set(id, content);
  }
}

function restoreWindowBlock(id) {
  const slot = state.blockSlots.get(id);
  const content = state.blockContents.get(id);
  if (slot && content) slot.replaceChildren(content);
}

function openWindow(id) {
  if (state.windows.has(id)) {
    state.windows.get(id).focus?.();
    return;
  }
  const definition = WINDOW_DEFINITIONS[id];
  if (!definition) {
    setStatus(`Unknown window: ${id}`, "error");
    return;
  }
  const content = state.blockContents.get(id) ?? createWindowContent(id);
  const slot = state.blockSlots.get(id);
  slot?.replaceChildren(Object.assign(document.createElement("p"), {
    className: "window-block-placeholder",
    textContent: `${definition.title} is open as a window.`
  }));
  if (typeof window.WinBox === "function") {
    const winbox = new window.WinBox({
      title: definition.title,
      x: 36 + state.windows.size * 34,
      y: 80 + state.windows.size * 28,
      width: definition.width,
      height: definition.height,
      root: elements.desktop,
      mount: content,
      onclose: () => {
        state.windows.delete(id);
        restoreWindowBlock(id);
      }
    });
    state.windows.set(id, winbox);
  } else {
    const section = document.createElement("section");
    section.className = "fallback-window";
    const bar = document.createElement("header");
    bar.className = "fallback-titlebar";
    const title = document.createElement("strong");
    title.textContent = definition.title;
    const close = document.createElement("button");
    close.type = "button";
    close.className = "close-window";
    close.setAttribute("aria-label", `Close ${definition.title}`);
    close.textContent = "×";
    close.addEventListener("click", () => {
      section.remove();
      state.windows.delete(id);
      restoreWindowBlock(id);
    });
    bar.append(title, close);
    const body = document.createElement("div");
    body.className = "fallback-content";
    body.append(content);
    section.append(bar, body);
    elements.fallbackWindows.append(section);
    state.windows.set(id, { element: section, focus: () => section.scrollIntoView({ block: "nearest", behavior: "smooth" }) });
    setStatus("WinBox is unavailable here; using the in-page window fallback.");
  }
  renderScreens();
}

function updateWindow(id) {
  const content = createWindowContent(id);
  state.blockContents.set(id, content);
  const current = state.windows.get(id);
  if (!current) {
    state.blockSlots.get(id)?.replaceChildren(content);
    return;
  }
  if (typeof window.WinBox === "function" && current instanceof window.WinBox) {
    current.mount(content);
  } else if (current.element) {
    current.element.querySelector(".fallback-content").replaceChildren(content);
  }
}

async function loadData() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error(`Could not load ${DATA_URL} (HTTP ${response.status}).`);
    initialize(await response.json());
  } catch (error) {
    setStatus(error instanceof Error ? error.message : "Unable to initialize the library.", "error");
    elements.launchers.querySelectorAll("button").forEach((button) => { button.disabled = true; });
  }
}

loadData();
