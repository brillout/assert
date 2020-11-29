export { assert };

function assert(condition: unknown, ...msgs: unknown[]): asserts condition {
  if (condition) {
    return;
  }

  const prefix = "[@brillout/assert] ";

  const BEGIN = `${prefix}BEGIN`;
  const END = `${prefix}END`;
  console.log(BEGIN);
  msgs.forEach((thing: unknown) => {
    log(thing);
  });
  console.log(END);

  throw new Error(
    `${prefix}Assertion failed. See messages printed between \`${BEGIN}\` and \`${END}\`.`
  );
}

function log(thing: unknown): void {
  if (isNodejs()) {
    console.log(
      require("util").inspect(thing, {
        depth: Infinity,
        showHidden: true,
        showProxy: true,
        colors: true,
        getters: true,
      })
    );
  } else {
    // Browser-side
    console.dir(thing);
  }
}

function isNodejs(): boolean {
  return typeof window === "undefined" && typeof process !== "undefined";
}
