/* Everything the compiler can emit a call to exists in the runtime. The checker
   accepts a library method because library.ts lists it; if runtime.ts lacks the
   function behind it, the student's code compiles and then dies with a JS
   TypeError the first time it reaches that line. This walks every class,
   constructor, method and field in the table and requires the runtime half. */
import { loadJava } from "./java-load.mjs";

const java = await loadJava();
const table = java.library();
const runtime = java.createRuntime({ write() {} });

// Types with no class in runtime.C, whose instanceof test runtime.is() answers by hand.
const TESTED_BY_HAND = {
  "java.lang.String": ["text", 7],
  "java.lang.CharSequence": ["text", 7],
  "java.lang.Comparable": ["text", {}],
  "java.lang.Iterable": [runtime.ArrayList_new_(), "text"],
  "java.util.Collection": [runtime.ArrayList_new_(), "text"],
  "java.util.List": [runtime.ArrayList_new_(), "text"],
  "java.lang.Runnable": [null, {}],
};

const problems = [];
let checked = 0;
for (const info of table.classes.values()) {
  if (info.unsupported || info.isUser) continue;
  const jsClass = runtime.C[info.name];
  if (!jsClass) {
    const sample = TESTED_BY_HAND[info.qualifiedName];
    if (sample) {
      const [instance, other] = sample;
      if (instance !== null && !runtime.is(instance, info.qualifiedName)) problems.push(`is(…, "${info.qualifiedName}") says no to an instance`);
      if (runtime.is(other, info.qualifiedName)) problems.push(`is(…, "${info.qualifiedName}") says yes to a non-instance`);
    } else if (info.constructors.length) {
      problems.push(`class ${info.qualifiedName} can be created but runtime.C has no ${info.name}`);
    }
  }
  for (const method of [...info.methods, ...info.constructors]) {
    checked++;
    if (method.runtime) {
      if (typeof runtime[method.runtime] !== "function") problems.push(`${info.name}.${method.name}(): runtime.${method.runtime} is missing`);
    } else if (!jsClass || typeof jsClass.prototype[method.jsName] !== "function") {
      problems.push(`${info.name}.${method.name}(): no runtime name and no C.${info.name}.prototype.${method.jsName}`);
    }
  }
  for (const field of info.fields.values()) {
    checked++;
    if (field.constant === undefined && !(`${info.name}_${field.name}` in runtime.F)) problems.push(`field ${info.name}.${field.name}: runtime.F.${info.name}_${field.name} is missing`);
  }
}
for (const problem of problems) console.log("  MISSING  " + problem);
console.log(problems.length ? `${problems.length} of ${checked} library members have no runtime` : `all ${checked} library members have a runtime`);
process.exit(problems.length ? 1 : 0);
