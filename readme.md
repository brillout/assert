Minimalistic & simple assertion library for writing end-user apps. For writing libraries see [github.com/brillout/libassert](https://github.com/brillout/libassert) instead.

For example:

~~~js
import { assert } from @brillout/assert;

assert(false, {
  undefinedProp: undefined,
  deep: { nested: { object: { prop: 42 } } },
});
~~~

Will print the following (purposely) verbose assertion error message:

~~~
[@brillout/assert] BEGIN
{
  undefinedProp: undefined,
  deep: { nested: { object: { prop: 42 } } }
}
[@brillout/assert] END
/home/romu/code/assert/dist/index.js:20
    throw new Error(messagePrefix + "Assertion failed. See messages printed between `" + BEGIN + "` and `" + END + "`.");
    ^

Error: [@brillout/assert] Assertion failed. See messages printed between `[@brillout/assert] BEGIN` and `[@brillout/assert] END`.
    at Object.assert (/home/romu/code/assert/dist/index.js:20:11)
    at Object.<anonymous> (/home/romu/code/assert/dist/test.js:4:9)
    at Module._compile (internal/modules/cjs/loader.js:759:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:770:10)
    at Module.load (internal/modules/cjs/loader.js:628:32)
    at Function.Module._load (internal/modules/cjs/loader.js:555:12)
    at Function.Module.runMain (internal/modules/cjs/loader.js:822:10)
    at internal/main/run_main_module.js:17:11
~~~

Check the (tiny) source code for more information.
