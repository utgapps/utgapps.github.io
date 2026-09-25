/* Break one line of the Java runner at a time and require the suite to notice.
   A suite that has only ever been green is not evidence: each mutation below is
   a real rule of Java (or of the classroom console), and the named test has to
   go red with a WRONG or MISSING line. A crash does not count as a catch. */
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const here = fileURLToPath(new URL(".", import.meta.url));

// [what the line does, file in src/lib/java, text to find, replacement, the test that must catch it]
const MUTATIONS = [
  ["truncating int division toward zero", "runtime.ts",
   "return (left / right) | 0;", "return Math.floor(left / right) | 0;", "java-conformance.mjs"],
  ["wrapping int addition at 32 bits", "codegen.ts",
   'case "+": return `(${left} + ${right} | 0)`;', 'case "+": return `(${left} + ${right})`;', "java-conformance.mjs"],
  ["narrowing a compound assignment back to byte", "codegen.ts",
   'case "byte": return `(${toInt()} << 24 >> 24)`;', 'case "byte": return `(${toInt()})`;', "java-conformance.mjs"],
  ["caching Integer only from -128 to 127", "runtime.ts",
   "bI(value: number) { return value >= -128 && value <= 127", "bI(value: number) { return value >= -128 && value <= 1000", "java-conformance.mjs"],
  ["java.util.Random's number sequence", "runtime.ts",
   "this.seed * 0x5DEECE66Dn + 0xBn", "this.seed * 0x5DEECE66Dn + 0xDn", "java-checkpoints.mjs"],
  ["printf rounding a 5 up", "runtime.ts",
   "const roundUp = digits.charCodeAt(keep) >= 53;", "const roundUp = digits.charCodeAt(keep) >= 54;", "java-conformance.mjs"],
  ["split dropping trailing empty strings", "runtime.ts",
   'if (limit === 0) while (size > 0 && pieces[size - 1] === "") size--;', "", "java-conformance.mjs"],
  ["hasNextInt saying no to a word", "runtime.ts",
   "if (!INTEGER_TOKEN.test(token)) return false;", "", "java-conformance.mjs"],
  ["summarising a cause's shared frames as '... n more'", "runtime.ts",
   "if (common) lines.push(", "if (false) lines.push(", "java-conformance.mjs"],
  ["printing an uncaught exception's trace", "session.ts",
   'this.host.write("err", this.runtime.uncaughtText(thrown));', "", "java-conformance.mjs"],
  ["reporting a missing return", "flow.ts",
   'this.report(member.body!.closePosition, "missing return statement", "missing-return");', "", "java-conformance.mjs"],
  ["reporting a lossy conversion", "checker.ts",
   "const result = assignmentConversion(from, to, expression.constant);",
   'const result = assignmentConversion(from, to, expression.constant); if (result === "lossy") return;', "java-conformance.mjs"],
  ["putting the caret under the column", "index.ts",
   'lines.push(lead + "^");', 'lines.push(lead + " ^");', "java-conformance.mjs"],
  ["staying quiet about an enum's members", "checker.ts",
   'if (this.brokenClasses.has(info)) return { kind: "value", type: ERROR_TYPE };', "", "java-conformance.mjs"],
  ["staying quiet about a record or generic class's uses", "checker.ts",
   "if (this.brokenClasses.has(info)) return ERROR_TYPE;", "", "java-conformance.mjs"],
  ["a runtime function the library promises", "runtime.ts",
   "String_isBlank(value: JString)", "String_isBlankGone(value: JString)", "java-runtime.mjs"],
];

let missed = 0;
for (const [label, file, find, replace, test] of MUTATIONS) {
  let output = "", code = 0;
  try {
    output = execFileSync(process.execPath, [test], {
      cwd: here, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, JAVA_MUTATE: [file, find, replace].join("|||") },
    });
  } catch (error) {
    output = (error.stdout || "") + (error.stderr || "");
    code = error.status;
  }
  if (code === 2) { console.log(`  ??      ${label} - the mutation did not apply (${file} changed?)`); missed++; continue; }
  const red = [...output.matchAll(/^ {2}(?:WRONG|MISSING) +(.+)$/gm)].map((match) => match[1].trim());
  if (!red.length) {
    console.log(`  MISSED  breaking ${label} - ` +
                (code === 0 ? `${test} still passed` : `${test} crashed (exit ${code}) instead of reporting a difference`));
    missed++;
  } else {
    console.log(`  caught  breaking ${label}\n          -> ${test}: ${red.slice(0, 3).join("; ")}`);
  }
}
console.log(`\n${MUTATIONS.length} deliberate breakages, ${missed} slipped through unnoticed`);
process.exit(missed ? 1 : 0);
