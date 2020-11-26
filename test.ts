import { assert } from "./index";

assert(false, {
  undefinedProp: undefined,
  deep: { nested: { object: { prop: 42 } } },
});
