export { assert };
export { assertWarning };

const errorName = "[@brillout/assert] Assertion Failure.";

function assert(condition: unknown, ...msgs: unknown[]): asserts condition {
  if (condition) {
    return;
  }

  if (isNodejs()) {
    const errorMessage = createErrorMessage(msgs);
    throw new Error(errorMessage);
  } else {
    if (msgs.length > 0) {
      console.error(...msgs);
    }
    throw new Error(errorName);
  }
}

function assertWarning(condition: unknown, ...msgs: unknown[]): void {
  if (condition) {
    return;
  }

  if (isNodejs()) {
    const errorMessage = createErrorMessage(msgs);
    console.error(new Error(errorMessage));
  } else {
    if (msgs.length > 0) {
      console.error(...msgs);
    }
    console.error(new Error(errorName));
  }
}

function createErrorMessage(msgs: unknown[]): string {
  let errorMessage = [errorName, ...msgs.map(stringify)].join("\n\n");

  return errorMessage;
}

function stringify(thing: unknown): void {
  const inspectOptions = {
    depth: Infinity,
    showHidden: true,
    showProxy: true,
    colors: true,
    getters: true,
  };

  return eval("require")("util").inspect(thing, inspectOptions);
}

function isNodejs(): boolean {
  return typeof window === "undefined" && typeof process !== "undefined";
}
