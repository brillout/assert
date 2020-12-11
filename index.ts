export { assert };
export { assertWarning };

const prefix = "[@brillout/assert] ";

function assert(condition: unknown, ...msgs: unknown[]): asserts condition {
  if (condition) {
    return;
  }

  const errorMessage = createErrorMessage(msgs);

  throw new Error(errorMessage);
}

function assertWarning(condition: unknown, ...msgs: unknown[]): void {
  if (condition) {
    return;
  }

  const errorMessage = createErrorMessage(msgs);

  console.error(new Error(errorMessage));
}

function createErrorMessage(msgs: unknown[]): string {
  let errorMessage = [`${prefix}Assertion failed.`, ...msgs.map(log)].join(
    "\n\n"
  );

  return errorMessage;
}

function log(thing: unknown): void {
  const inspectOptions = {
    depth: Infinity,
    showHidden: true,
    showProxy: true,
    colors: true,
    getters: true,
  };

  if (isNodejs()) {
    return eval("require")("util").inspect(thing, inspectOptions);
  } else {
    const stripAnsi = require("strip-ansi");
    const utilInspect = require("browser-util-inspect");
    return stripAnsi(utilInspect(thing, inspectOptions));
  }
}

function isNodejs(): boolean {
  return typeof window === "undefined" && typeof process !== "undefined";
}
