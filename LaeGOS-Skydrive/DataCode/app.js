"use strict";

(() => {
  const JSON_URL = "../DataRfx/laegna.json";
  const DEFAULT_BASE = "base2";
  const DEFAULT_SIGN_SYSTEM = "signs4";
  const OPERATION_ORDER = ["Divide", "Minus", "Plus", "Times"];
  const OPERATION_SYMBOLS = { Divide: "÷", Minus: "−", Plus: "+", Times: "×" };
  const OPERATION_FUNCTIONS = {
    Divide: (left, right) => {
      if (right === 0n) throw new Error("Cannot divide by zero.");
      return left / right;
    },
    Minus: (left, right) => left - right,
    Plus: (left, right) => left + right,
    Times: (left, right) => left * right
  };
  const APP_ORDER = ["parity", "divisibility", "number-facts"];
  const APP_DEFINITIONS = {
    parity: { title: "Parity", heading: "Even or odd", icon: "◐" },
    divisibility: { title: "Divisibility", heading: "Divisibility by three", icon: "⅓" },
    "number-facts": { title: "Number facts", heading: "Number observations", icon: "∑" }
  };

  const elements = {
    status: document.getElementById("status-message"),
    total: document.getElementById("total-display"),
    operator: document.getElementById("operator-display"),
    current: document.getElementById("current-display"),
    baseSelect: document.getElementById("base-select"),
    baseDescription: document.getElementById("base-description"),
    keyboard: document.getElementById("digit-keyboard"),
    keyboardLayout: document.getElementById("keyboard-layout"),
    digitCount: document.getElementById("digit-count"),
    clear: document.getElementById("clear-key"),
    delete: document.getElementById("delete-key"),
    tabs: document.getElementById("tabs"),
    desktop: document.querySelector(".desktop"),
    centerPanel: document.querySelector(".center-panel"),
    stage: document.getElementById("center-stage"),
    appCatalog: document.getElementById("app-catalog"),
    windowLayer: document.getElementById("window-layer"),
    dock: document.getElementById("window-dock"),
    activeAppName: document.getElementById("active-app-name"),
    focusName: document.getElementById("focus-name"),
    focusGroup: document.getElementById("focus-group"),
    signSelect: document.getElementById("sign-select"),
    signDescription: document.getElementById("sign-description"),
    operationKeys: document.getElementById("operation-keys"),
    unknownKeyboard: document.getElementById("unknown-keyboard"),
    equals: document.getElementById("equals-key"),
    extendedSigns: document.getElementById("extended-signs"),
    launchButtons: Array.from(document.querySelectorAll("[data-open-app]"))
  };

  const state = {
    systems: [],
    numberTypes: [],
    numberType: null,
    signSystems: [],
    base: null,
    baseMode: DEFAULT_BASE,
    signSystem: null,
    activeApp: "parity",
    currentDigits: [],
    negative: false,
    total: null,
    totalWidth: 0,
    pendingOperation: null,
    windows: new Map(),
    appSlots: new Map(),
    appContents: new Map(),
    zIndex: 10,
    nextWindowId: 1,
    drag: null,
    focusedWindow: null
  };

  function setStatus(message, kind = "info") {
    elements.status.textContent = message;
    elements.status.dataset.kind = kind;
  }

  function getById(items, id) {
    return items.find((item) => item && item.id === id);
  }

  function validateData(data) {
    if (!data || !Array.isArray(data.laegnaNumberSystems)) {
      throw new Error("laegna.json must contain a laegnaNumberSystems array.");
    }
    const systems = data.laegnaNumberSystems;
    const requiredBases = ["base2", "base4", "base8", "base16"];
    for (const id of requiredBases) {
      const system = getById(systems, id);
      if (!system || !Array.isArray(system.digits) || !Number.isInteger(system.base) || system.digits.length !== system.base) {
        throw new Error(`laegna.json is missing a valid ${id} digit layout.`);
      }
    }
    for (const id of ["signs4", "signs8"]) {
      const system = getById(systems, id);
      if (!system || !Array.isArray(system.signs) || !Array.isArray(system["digits-values-sign"])) {
        throw new Error(`laegna.json is missing a valid ${id} operation-sign layout.`);
      }
      const labels = system["digits-values-sign"].map((label) => String(label).toLowerCase());
      if (OPERATION_ORDER.some((operation) => !labels.includes(operation.toLowerCase()))) {
        throw new Error(`${id} does not define all four arithmetic operations.`);
      }
      if (OPERATION_ORDER.some((operation) => {
        const index = labels.indexOf(operation.toLowerCase());
        return !system.signs[index];
      })) {
        throw new Error(`${id} is missing a symbol for one of its arithmetic operations.`);
      }
    }
    return systems;
  }

  async function loadData() {
    try {
      const response = await fetch(JSON_URL);
      if (!response.ok) throw new Error(`Could not load ${JSON_URL} (HTTP ${response.status}).`);
      const data = await response.json();
      state.systems = validateData(data);
      const { numberTypesFromData } = await import("../DataLib/number-types.js");
      state.numberTypes = numberTypesFromData(data);
      state.base = getById(state.systems, DEFAULT_BASE);
      state.baseMode = DEFAULT_BASE;
      state.numberType = getNumberType(DEFAULT_BASE);
      state.signSystems = state.systems.filter((item) => item && ["signs4", "signs8"].includes(item.id));
      state.signSystem = getById(state.signSystems, DEFAULT_SIGN_SYSTEM);
      initializeControls();
      renderKeyboard();
      renderSigns();
      renderAppBlocks();
      renderTabs();
      renderAll();
      enableControls();
      setStatus("Loaded laegna.json — apps are available as desktop content.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to initialize the LaGOS interface.", "error");
      elements.baseDescription.textContent = "The number-system data could not be loaded.";
    }
  }

  function initializeControls() {
    for (const system of state.systems) {
      if (!system || !["base2", "base4", "base8", "base16"].includes(system.id)) continue;
      const option = document.createElement("option");
      option.value = system.id;
      option.textContent = `${system.name || system.id} · base ${system.base}`;
      elements.baseSelect.append(option);
    }
    state.systems.forEach((system) => {
      if (!system || !["base2", "base4", "base8", "base16"].includes(system.id) || !system["alt-id"]) return;
      const option = document.createElement("option");
      option.value = system["alt-id"];
      option.textContent = `${system["alt-name"] || system.name || system["alt-id"]} · ${system["alt-id"]} (linear)`;
      elements.baseSelect.append(option);
    });
    for (const type of state.numberTypes) {
      if (["base2", "base4", "base8", "base16", "base44"].includes(type.id)) continue;
      const option = document.createElement("option");
      option.value = type.id;
      option.textContent = type.name;
      elements.baseSelect.append(option);
    }
    const sign2 = getById(state.systems, "signs2");
    for (const system of state.signSystems) {
      const option = document.createElement("option");
      option.value = system.id;
      option.textContent = system.id === "signs8" ? "signs8 · 4 operations + 4 variants" : `${system.id} · 4 operations`;
      elements.signSelect.append(option);
    }
    if (sign2 && Array.isArray(sign2.signs)) {
      const option = document.createElement("option");
      option.disabled = true;
      option.textContent = "signs2 · 2 signs (not 4 operations)";
      elements.signSelect.append(option);
    }
    elements.baseSelect.value = DEFAULT_BASE;
    elements.signSelect.value = DEFAULT_SIGN_SYSTEM;
    elements.baseSelect.addEventListener("change", changeBase);
    elements.signSelect.addEventListener("change", () => {
      const selected = getById(state.signSystems, elements.signSelect.value);
      if (!selected) {
        setStatus(`Unknown sign system: ${elements.signSelect.value}`, "error");
        return;
      }
      state.signSystem = selected;
      renderSigns();
      setStatus(`Operation signs loaded from ${selected.id}.`);
    });
    elements.clear.addEventListener("click", clearScreen);
    elements.delete.addEventListener("click", deleteDigit);
    elements.equals.addEventListener("click", calculate);
    elements.launchButtons.forEach((button) => {
      button.addEventListener("click", () => openApp(button.dataset.openApp));
    });
  }

  function enableControls() {
    elements.baseSelect.disabled = false;
    elements.signSelect.disabled = false;
    elements.clear.disabled = false;
    elements.delete.disabled = false;
    elements.equals.disabled = false;
    elements.launchButtons.forEach((button) => { button.disabled = false; });
  }

  function getCurrentValue() {
    if (!state.base || !state.numberType) return 0n;
    if (!state.numberType.isArithmeticEntry(state.currentDigits)) {
      throw new Error("Symbolic unknowns cannot be used in arithmetic.");
    }
    let value = state.numberType.toValue(state.currentDigits);
    return state.negative ? -value : value;
  }

  function getNumberType(id = state.baseMode) {
    const type = state.numberTypes.find((numberType) => numberType.id === id);
    if (!type) throw new Error(`DataLib has no number type for ${id}.`);
    return type;
  }

  function convertToDigits(value, base, width = 0) {
    const typeId = base.id === state.base?.id ? state.baseMode : base.id;
    return getNumberType(typeId).fromValue(value, width);
  }

  function formatValue(value, base = state.base, width = state.currentDigits.length) {
    if (!base) return value.toString();
    const typeId = base.id === state.base?.id ? state.baseMode : base.id;
    const type = getNumberType(typeId);
    return type.format(type.fromValue(value, width), value < 0n);
  }

  function currentDisplayValue() {
    if (!state.numberType) return "U";
    return state.numberType.format(state.currentDigits, state.negative);
  }

  function renderKeyboard() {
    if (!state.base || !state.numberType) return;
    elements.keyboard.replaceChildren();
    const keys = state.numberType.getKeyboardKeys();
    keys.filter((key) => key.kind === "digit").forEach((key) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "digit-key";
      button.textContent = key.label;
      button.dataset.keyKind = key.kind;
      button.setAttribute("aria-label", key.kind === "digit" ? `Digit ${key.value}: ${key.label}` : key.label);
      button.addEventListener("click", () => enterDigit(key.value));
      elements.keyboard.append(button);
    });
    elements.unknownKeyboard.replaceChildren();
    const symbols = document.createElement("div");
    symbols.className = "symbol-key-grid";
    symbols.setAttribute("aria-label", "Known, unknown, zero, and infinity keys");
    keys.filter((key) => key.kind !== "digit").forEach((key) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "digit-key";
      button.textContent = key.label;
      button.dataset.keyKind = key.kind;
      button.setAttribute("aria-label", key.label);
      button.addEventListener("click", () => enterSpecial(key.value));
      symbols.append(button);
    });
    elements.unknownKeyboard.append(symbols);
    const isBase44 = state.baseMode === "base44";
    elements.keyboardLayout.textContent = isBase44
      ? "Linear · base44 alias"
      : `Linear · base ${state.base.base}`;
    elements.digitCount.textContent = `${state.base.digits.length} keys`;
    elements.baseDescription.textContent = state.base.description || `${state.base.name || "Laegna"} number system, base ${state.base.base}.`;
  }

  function renderSigns() {
    if (!state.signSystem) return;
    elements.operationKeys.replaceChildren();
    const labels = state.signSystem["digits-values-sign"];
    const symbols = state.signSystem.signs;
    const operationRecords = OPERATION_ORDER.map((operation) => {
      const index = labels.findIndex((label) => label.toLowerCase() === operation.toLowerCase());
      if (index < 0 || !symbols[index]) throw new Error(`${state.signSystem.id} does not define the ${operation} operation.`);
      return { operation, symbol: symbols[index], index };
    });
    for (const record of operationRecords) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "operation-key";
      button.dataset.operation = record.operation;
      button.setAttribute("aria-pressed", String(state.pendingOperation === record.operation));
      const sign = document.createElement("span");
      sign.textContent = record.symbol;
      const label = document.createElement("small");
      label.textContent = record.operation;
      button.append(sign, label);
      button.addEventListener("click", () => chooseOperation(record.operation));
      elements.operationKeys.append(button);
    }
    const variants = symbols.filter((_, index) => !OPERATION_ORDER.some((name) => labels[index]?.toLowerCase() === name.toLowerCase()));
    elements.extendedSigns.replaceChildren();
    variants.forEach((symbol) => {
      const chip = document.createElement("span");
      chip.className = "sign-chip";
      chip.textContent = symbol;
      chip.title = "Extended sign variant from the selected JSON sign system.";
      elements.extendedSigns.append(chip);
    });
    elements.signDescription.textContent = state.signSystem.help
      ? `${state.signSystem.id}: operation names and symbols from JSON; additional symbols are variants.`
      : `${state.signSystem.id}: four operation signs mapped by digits-values-sign in JSON.`;
    renderScreen();
  }

  function changeBase() {
    const requestedId = elements.baseSelect.value;
    const numberType = state.numberTypes.find((type) => type.id === requestedId);
    const selected = getById(state.systems, requestedId)
      || state.systems.find((system) => system && system["alt-id"] === requestedId)
      || (numberType && {
        id: numberType.id,
        name: numberType.name,
        base: numberType.base,
        digits: numberType.digits,
        description: numberType.description
      });
    if (!selected || !Array.isArray(selected.digits)) {
      setStatus(`Unknown number base: ${requestedId}`, "error");
      return;
    }
    const previousType = state.numberType;
    const currentWidth = state.currentDigits.length;
    let previousCurrent = null;
    if (state.currentDigits.length) {
      try {
        previousCurrent = getCurrentValue();
      } catch (error) {
        setStatus(error instanceof Error ? error.message : "The current entry cannot be converted.", "error");
        return;
      }
    }
    const previousTotal = state.total;
    state.baseMode = requestedId;
    state.base = selected;
    state.numberType = getNumberType(state.baseMode);
    if (previousCurrent !== null) {
      const targetWidth = previousType.convertWidthTo(currentWidth, state.numberType);
      state.currentDigits = convertToDigits(previousCurrent, selected, targetWidth);
      state.negative = previousCurrent < 0n;
    }
    if (previousTotal !== null) {
      state.total = previousTotal;
      state.totalWidth = previousType.convertWidthTo(state.totalWidth, state.numberType);
    }
    renderKeyboard();
    renderAll();
    setStatus(selected.id === "base16"
      ? `Loaded ${state.baseMode === "base44" ? "Base-44 (linear alias)" : "Base-16"} from laegna.json.`
      : numberType && !getById(state.systems, requestedId)
        ? `Loaded ${selected.name} from DataLib.`
        : `Loaded ${selected.id} from laegna.json.`);
  }

  function enterDigit(index) {
    if (!state.base || index < 0 || index >= state.base.base) {
      setStatus("That key is not a valid digit for the selected base.", "error");
      return;
    }
    if (state.pendingOperation && state.total === null) state.total = 0n;
    if (state.currentDigits.length >= 256) {
      setStatus("Number entry is limited to 256 digits for this iteration.", "error");
      return;
    }
    if (state.currentDigits.length === 1 && state.currentDigits[0] === "W") state.currentDigits = [];
    if (state.currentDigits.length === 0) state.negative = false;
    state.currentDigits.push(index);
    renderAll();
    setStatus(`Entered ${state.base.digits[index]}.`);
  }

  function enterSpecial(symbol) {
    state.negative = false;
    state.numberType.encodeUnknownSymbol(symbol);
    state.currentDigits = [symbol];
    renderAll();
    const message = symbol === "W"
      ? "Entered the example zero symbol."
      : symbol === "∩"
        ? "Entered infinity; this symbolic value is not an arithmetic operand."
        : `Entered symbolic unknown ${symbol}; arithmetic is unavailable for unknowns.`;
    setStatus(message, symbol === "W" ? "info" : "error");
  }

  function clearScreen() {
    state.currentDigits = [];
    state.negative = false;
    state.total = null;
    state.totalWidth = 0;
    state.pendingOperation = null;
    renderAll();
    setStatus("Screen cleared. U is treated as zero.");
  }

  function deleteDigit() {
    if (state.currentDigits.length) state.currentDigits.pop();
    if (!state.currentDigits.length) state.negative = false;
    renderAll();
    setStatus("Deleted the last digit.");
  }

  function chooseOperation(operation) {
    if (!OPERATION_FUNCTIONS[operation]) {
      setStatus(`Unsupported operation: ${operation}`, "error");
      return;
    }
    if (state.currentDigits.length) {
      const currentWidth = state.currentDigits.length;
      let current;
      try {
        current = getCurrentValue();
      } catch (error) {
        setStatus(error instanceof Error ? error.message : "The current entry cannot be used in arithmetic.", "error");
        return;
      }
      if (state.total !== null && state.pendingOperation) {
        try {
          state.total = OPERATION_FUNCTIONS[state.pendingOperation](state.total, current);
          state.totalWidth = Math.max(state.totalWidth, currentWidth);
        } catch (error) {
          setStatus(error instanceof Error ? error.message : "The operation failed.", "error");
          return;
        }
      } else {
        state.total = current;
        state.totalWidth = currentWidth;
      }
      state.currentDigits = [];
      state.negative = false;
    } else if (state.total === null) {
      state.total = 0n;
      state.totalWidth = 0;
    }
    state.pendingOperation = operation;
    renderAll();
    setStatus(`${operation} selected.`);
  }

  function calculate() {
    if (state.total === null || !state.pendingOperation || !state.currentDigits.length) return;
    const operation = state.pendingOperation;
    try {
      const result = OPERATION_FUNCTIONS[operation](state.total, getCurrentValue());
      state.negative = result < 0n;
      state.currentDigits = convertToDigits(result, state.base, state.currentDigits.length);
      state.total = null;
      state.totalWidth = 0;
      state.pendingOperation = null;
      renderAll();
      setStatus(`${operation} complete${operation === "Divide" ? " (integer division)" : ""}.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "The operation failed.", "error");
    }
  }

  function renderScreen() {
    if (!state.base) return;
    elements.total.textContent = state.total === null ? "—" : formatValue(state.total, state.base, state.totalWidth);
    elements.operator.textContent = state.pendingOperation
      ? getOperationSymbol(state.pendingOperation)
      : "—";
    elements.current.textContent = currentDisplayValue();
    elements.operationKeys.querySelectorAll("[data-operation]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.operation === state.pendingOperation));
    });
  }

  function getOperationSymbol(operation) {
    if (state.signSystem) {
      const labels = state.signSystem["digits-values-sign"] || [];
      const index = labels.findIndex((label) => String(label).toLowerCase() === operation.toLowerCase());
      if (index >= 0 && state.signSystem.signs[index]) return state.signSystem.signs[index];
    }
    return OPERATION_SYMBOLS[operation] || operation;
  }

  function renderAll() {
    renderScreen();
    updateWindowContent();
  }

  function renderTabs() {
    elements.tabs.replaceChildren();
    for (const appId of APP_ORDER) {
      const definition = APP_DEFINITIONS[appId];
      const button = document.createElement("button");
      button.type = "button";
      button.className = "app-tab";
      button.id = `tab-${appId}`;
      button.setAttribute("role", "tab");
      button.setAttribute("aria-selected", String(state.activeApp === appId));
      button.textContent = definition.title;
      button.addEventListener("click", () => openApp(appId));
      elements.tabs.append(button);
    }
  }

  function setActiveApp(appId) {
    const definition = APP_DEFINITIONS[appId];
    if (!definition) return;
    state.activeApp = appId;
    elements.activeAppName.textContent = definition.title;
    elements.tabs.querySelectorAll('[role="tab"]').forEach((tab) => {
      tab.setAttribute("aria-selected", String(tab.id === `tab-${appId}`));
    });
    elements.focusGroup.textContent = `${definition.title} app selected.`;
  }

  function renderAppBlocks() {
    elements.appCatalog.replaceChildren();
    for (const appId of APP_ORDER) {
      const definition = APP_DEFINITIONS[appId];
      const block = document.createElement("article");
      block.className = "app-block";
      block.dataset.appBlock = appId;
      const open = document.createElement("button");
      open.type = "button";
      open.className = "app-block-title";
      open.textContent = `${definition.icon} ${definition.title}`;
      open.setAttribute("aria-label", `Open ${definition.title} as a window`);
      open.addEventListener("click", () => openApp(appId));
      const slot = document.createElement("div");
      slot.className = "app-content-slot";
      const content = document.createElement("div");
      content.className = "app-content";
      slot.append(content);
      block.append(open, slot);
      block.addEventListener("click", (event) => {
        if (!event.target.closest("button")) openApp(appId);
      });
      elements.appCatalog.append(block);
      state.appSlots.set(appId, slot);
      state.appContents.set(appId, content);
    }
  }

  function addWindow(appId, offsetX = 0, offsetY = 0) {
    const definition = APP_DEFINITIONS[appId];
    const content = state.appContents.get(appId);
    const slot = state.appSlots.get(appId);
    if (!definition || !content || !slot) return null;
    const windowId = `window-${state.nextWindowId++}`;
    const windowElement = document.createElement("section");
    const desktopBounds = elements.desktop.getBoundingClientRect();
    const panelBounds = elements.centerPanel.getBoundingClientRect();
    const initialWidth = Math.max(230, Math.min(340, window.innerWidth * 0.76, panelBounds.width - 8));
    const panelLeft = panelBounds.left - desktopBounds.left;
    const panelTop = panelBounds.top - desktopBounds.top;
    windowElement.className = "winbox-window";
    windowElement.dataset.windowId = windowId;
    windowElement.dataset.appId = appId;
    windowElement.style.left = `${panelLeft + Math.max(0, (panelBounds.width - initialWidth) / 2) + offsetX}px`;
    windowElement.style.top = `${panelTop + 54 + offsetY}px`;
    windowElement.style.zIndex = String(++state.zIndex);

    const titlebar = document.createElement("header");
    titlebar.className = "window-titlebar";
    const title = document.createElement("span");
    title.className = "window-title";
    title.textContent = `${definition.icon} ${definition.title}`;
    const controls = document.createElement("div");
    controls.className = "window-controls";
    const minimize = document.createElement("button");
    minimize.type = "button";
    minimize.className = "minimize-window";
    minimize.textContent = "—";
    minimize.setAttribute("aria-label", `Minimize ${definition.title}`);
    const close = document.createElement("button");
    close.type = "button";
    close.className = "close-window";
    close.textContent = "×";
    close.setAttribute("aria-label", `Close ${definition.title}`);
    controls.append(minimize, close);
    titlebar.append(title, controls);

    const body = document.createElement("div");
    body.className = "window-body";
    body.append(content);
    windowElement.append(titlebar, body);
    slot.replaceChildren(Object.assign(document.createElement("p"), {
      className: "app-block-placeholder",
      textContent: `${definition.title} is open as a window.`
    }));
    elements.windowLayer.append(windowElement);
    const windowState = {
      id: windowId,
      appId,
      element: windowElement,
      body,
      content,
      title: definition.title,
      zIndex: state.zIndex,
      minimized: false,
      closed: false,
      offsetX,
      offsetY
    };
    state.windows.set(windowId, windowState);
    titlebar.addEventListener("pointerdown", (event) => startDrag(event, windowState));
    windowElement.addEventListener("pointerdown", () => focusWindow(windowState));
    minimize.addEventListener("click", (event) => {
      event.stopPropagation();
      minimizeWindow(windowState);
    });
    close.addEventListener("click", (event) => {
      event.stopPropagation();
      closeWindow(windowState);
    });
    focusWindow(windowState);
    updateWindow(windowState);
    return windowState;
  }

  function setWindowZ(win, zIndex) {
    win.zIndex = zIndex;
    win.element.style.zIndex = String(zIndex);
  }

  function focusWindow(win) {
    if (win.closed) return;
    setActiveApp(win.appId);
    if (win.minimized) restoreWindow(win);
    setWindowZ(win, ++state.zIndex);
    state.focusedWindow = win.id;
    elements.focusName.textContent = win.title;
    elements.focusGroup.textContent = `${APP_DEFINITIONS[win.appId].title} app · window raised`;
    renderDock();
  }

  function minimizeWindow(win) {
    if (win.closed || win.minimized) return;
    win.minimized = true;
    win.element.hidden = true;
    renderDock();
    if (state.focusedWindow === win.id) {
      state.focusedWindow = null;
      elements.focusName.textContent = "No window selected";
      elements.focusGroup.textContent = "Window minimized.";
    }
  }

  function restoreWindow(win) {
    if (win.closed) return;
    win.minimized = false;
    win.element.hidden = false;
    renderDock();
  }

  function closeWindow(win) {
    if (win.closed) return;
    win.closed = true;
    state.appSlots.get(win.appId)?.replaceChildren(win.content);
    win.element.remove();
    if (state.focusedWindow === win.id) {
      state.focusedWindow = null;
      elements.focusName.textContent = "No window selected";
      elements.focusGroup.textContent = "Closed apps remain available in desktop content.";
    }
    renderDock();
  }

  function renderDock() {
    elements.dock.replaceChildren();
    for (const win of state.windows.values()) {
      if (win.closed || !win.minimized) continue;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "dock-item";
      button.textContent = `${APP_DEFINITIONS[win.appId].icon} ${win.title}`;
      button.addEventListener("click", () => {
        setActiveApp(win.appId);
        restoreWindow(win);
        focusWindow(win);
      });
      elements.dock.append(button);
    }
  }

  function openApp(appId) {
    if (!APP_DEFINITIONS[appId]) {
      setStatus(`Unknown app: ${appId}`, "error");
      return;
    }
    setActiveApp(appId);
    const existing = Array.from(state.windows.values()).find((win) => win.appId === appId && !win.closed);
    if (existing) {
      restoreWindow(existing);
      focusWindow(existing);
      return;
    }
    const count = state.windows.size;
    addWindow(appId, 28 * (count % 4), 28 * (count % 5));
    setStatus(`${APP_DEFINITIONS[appId].title} opened as a window.`);
  }

  function startDrag(event, win) {
    if (event.button !== 0 || event.target.closest("button")) return;
    focusWindow(win);
    const rect = win.element.getBoundingClientRect();
    state.drag = {
      win,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      left: rect.left,
      top: rect.top
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
  }

  document.addEventListener("pointermove", (event) => {
    if (!state.drag || event.pointerId !== state.drag.pointerId) return;
    const bounds = elements.windowLayer.getBoundingClientRect();
    const winBounds = state.drag.win.element.getBoundingClientRect();
    const nextLeft = Math.min(
      Math.max(0, state.drag.left + event.clientX - state.drag.startX - bounds.left),
      Math.max(0, bounds.width - winBounds.width)
    );
    const nextTop = Math.min(
      Math.max(0, state.drag.top + event.clientY - state.drag.startY - bounds.top),
      Math.max(0, bounds.height - winBounds.height)
    );
    state.drag.win.element.style.left = `${nextLeft}px`;
    state.drag.win.element.style.top = `${nextTop}px`;
  });
  document.addEventListener("pointerup", (event) => {
    if (state.drag && event.pointerId === state.drag.pointerId) state.drag = null;
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") state.drag = null;
    if (event.key === "Enter" && event.target === elements.current) calculate();
  });

  function renderAppContent(appId, content) {
    if (!state.numberType.isArithmeticEntry(state.currentDigits)) {
      content.replaceChildren();
      const heading = document.createElement("h3");
      heading.textContent = APP_DEFINITIONS[appId].heading;
      const message = document.createElement("p");
      message.textContent = `${currentDisplayValue()} is a symbolic entry; numeric observations are unavailable.`;
      content.append(heading, message);
      return;
    }
    const value = getCurrentValue();
    const absolute = value < 0n ? -value : value;
    const remainder3 = ((value % 3n) + 3n) % 3n;
    const parity = absolute % 2n === 0n ? "Even" : "Odd";
    const parityDetail = absolute === 0n ? "Zero is even." : `${formatValue(absolute)} is ${parity.toLowerCase()} in the selected system.`;
    let title;
    let lines = [];
    if (appId === "parity") {
      title = APP_DEFINITIONS.parity.heading;
      lines = [parity, parityDetail, `Value: ${formatValue(value)}`];
    } else if (appId === "divisibility") {
      title = APP_DEFINITIONS.divisibility.heading;
      const divisible = remainder3 === 0n;
      lines = [
        divisible ? "Divisible by 3" : "Not divisible by 3",
        `Remainder: ${formatValue(remainder3)}`
      ];
    } else {
      title = APP_DEFINITIONS["number-facts"].heading;
      lines = [
        `Base ${state.base.base} · ${formatValue(value)}`,
        `Entry positions: ${state.currentDigits.length}`,
        `Sign system: ${state.signSystem.id}`
      ];
    }
    content.replaceChildren();
    const heading = document.createElement("h3");
    heading.textContent = title;
    const valueLine = document.createElement("p");
    valueLine.className = "fact-value";
    valueLine.textContent = lines[0];
    content.append(heading, valueLine);
    lines.slice(1).forEach((text, index) => {
      const paragraph = document.createElement("p");
      paragraph.className = index === lines.length - 2 ? "subtle" : "";
      paragraph.textContent = text;
      content.append(paragraph);
    });
  }

  function updateWindow(win) {
    if (!win.closed) renderAppContent(win.appId, win.content);
  }

  function updateWindowContent() {
    state.appContents.forEach((content, appId) => renderAppContent(appId, content));
  }

  function start() {
    loadData();
  }

  start();
})();
