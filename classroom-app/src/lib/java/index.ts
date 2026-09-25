/* Compiling a Java project for the classroom runner.

   compileJava() takes the project's .java files and returns either the
   JavaScript the worker runs, or the errors, laid out the way javac prints them
   so what students see here matches what they will see on a real JDK:

     Main.java:5: error: cannot find symbol
             System.out.println(scroe);
                                ^
       symbol:   variable scroe
       location: class Main
     1 error

   Correct Java this runner cannot run yet (enums, generic classes...) is kept
   apart and said plainly: it is not the student's mistake. */
import { JavaSyntaxError } from "./lexer";
import { parse } from "./parser";
import { check, type Diagnostic, type SourceFile } from "./checker";
import { analyzeFlow } from "./flow";
import { generate } from "./codegen";
import { erasedDescriptor, type ClassInfo } from "./types";

export type JavaFile = { name: string; source: string };

export type CompileResult =
  | { ok: true; code: string; entryClass: string }
  | { ok: false; text: string; onlyUnsupported: boolean };

/** javac stops printing after this many. */
const MAX_REPORTED = 100;

export function compileJava(files: JavaFile[]): CompileResult {
  const javaFiles = files.filter((file) => file.name.endsWith(".java"));
  if (!javaFiles.length) return { ok: false, text: "error: no .java files to compile\n", onlyUnsupported: false };
  const sources = new Map(javaFiles.map((file) => [baseName(file.name), file.source]));

  // Parse every file first: a syntax error stops that file, as it does javac.
  const parsed: SourceFile[] = [];
  const syntaxErrors: Diagnostic[] = [];
  for (const file of javaFiles) {
    const name = baseName(file.name);
    try {
      parsed.push({ name, source: file.source, unit: parse(file.source, name) });
    } catch (error) {
      if (!(error instanceof JavaSyntaxError)) throw error;
      syntaxErrors.push({ file: name, line: error.line, column: error.column, message: error.message, details: [], code: error.code });
    }
  }
  if (syntaxErrors.length) return failure(syntaxErrors, sources);

  const checked = check(parsed);
  if (checked.diagnostics.length) return failure(checked.diagnostics, sources);
  const flowProblems = analyzeFlow(checked.classes);
  if (flowProblems.length) return failure(flowProblems, sources);

  const entry = findEntry(checked.classes, parsed);
  if (typeof entry === "string") return { ok: false, text: entry, onlyUnsupported: false };
  const generated = generate(checked.classes, entry);
  if (generated.diagnostics.length) return failure(generated.diagnostics, sources);
  return { ok: true, code: generated.code, entryClass: entry.qualifiedName };
}

function baseName(path: string) { return path.replace(/^.*[\\/]/, ""); }

/** The class `java Main` would run: the first file's public class, else any class with a main. */
function findEntry(classes: ClassInfo[], parsed: SourceFile[]): ClassInfo | string {
  const hasMain = (info: ClassInfo) => info.methods.some((method) => method.name === "main" && method.isStatic
    && method.parameters.length === 1 && erasedDescriptor(method.parameters[0]) === "Ajava_lang_String"
    && method.returnType.tag === "void");
  const firstFile = parsed[0].name;
  const topLevel = classes.filter((info) => !info.outer && info.kind === "class");
  const preferred = topLevel.find((info) => info.declaration?.file === firstFile && info.name === firstFile.replace(/\.java$/, ""))
    ?? topLevel.find((info) => info.declaration?.file === firstFile)
    ?? topLevel[0];
  if (preferred && hasMain(preferred)) return preferred;
  const other = topLevel.find(hasMain);
  if (other) return other;
  const name = preferred?.name ?? firstFile.replace(/\.java$/, "");
  return `error: can't find main(String[]) method in class: ${name}\n\n`
    + `  Java starts a program at a method written exactly like this, inside class ${name}:\n\n`
    + `      public static void main(String[] args) {\n          ...\n      }\n`;
}

function failure(diagnostics: Diagnostic[], sources: Map<string, string>): CompileResult {
  const mistakes = diagnostics.filter((diagnostic) => !diagnostic.unsupported);
  const unsupported = diagnostics.filter((diagnostic) => diagnostic.unsupported);
  const order = [...sources.keys()];
  const byPosition = (first: Diagnostic, second: Diagnostic) =>
    order.indexOf(first.file) - order.indexOf(second.file) || first.line - second.line || first.column - second.column;
  mistakes.sort(byPosition);
  unsupported.sort(byPosition);

  const out: string[] = [];
  for (const diagnostic of mistakes.slice(0, MAX_REPORTED)) {
    out.push(formatDiagnostic(diagnostic, sources));
    const hint = hintFor(diagnostic);
    if (hint) out.push(`  \u2192 ${hint}`);
  }
  if (mistakes.length) out.push(mistakes.length === 1 ? "1 error" : `${mistakes.length} errors`);
  if (unsupported.length) {
    if (mistakes.length) out.push("");
    out.push(mistakes.length
      ? "Separately, this part of your Java is fine, but the classroom runner can't run it yet:"
      : "Your Java is fine \u2013 the classroom runner just can't run this yet:");
    for (const diagnostic of unsupported) {
      out.push(`  ${diagnostic.file}:${diagnostic.line}: ${diagnostic.message}`);
    }
    out.push("To run it as written, use a computer with Java 17 or newer: javac *.java && java Main");
  }
  return { ok: false, text: out.join("\n") + "\n", onlyUnsupported: !mistakes.length };
}

function formatDiagnostic(diagnostic: Diagnostic, sources: Map<string, string>): string {
  const lines = [`${diagnostic.file}:${diagnostic.line}: error: ${diagnostic.message}`];
  const sourceLine = (sources.get(diagnostic.file) ?? "").split(/\r\n|\r|\n/)[diagnostic.line - 1];
  if (sourceLine !== undefined) {
    lines.push(sourceLine);
    // Tabs stay tabs so the caret lands under the right character however the console shows them.
    const lead = [...sourceLine.slice(0, Math.max(0, diagnostic.column - 1))].map((character) => (character === "\t" ? "\t" : " ")).join("");
    lines.push(lead + "^");
  }
  for (const detail of diagnostic.details) lines.push("  " + detail);
  return lines.join("\n");
}

/** A plain-words next step for the errors students meet most. javac's own text stays above it. */
function hintFor(diagnostic: Diagnostic): string | null {
  const message = diagnostic.message;
  const symbol = diagnostic.details.find((detail) => detail.startsWith("symbol:"))?.replace(/^symbol:\s+/, "") ?? "";
  if (message === "cannot find symbol") {
    if (/^class (Scanner|Random|ArrayList|List|Arrays|Collections)$/.test(symbol)) {
      return `${symbol.slice(6)} lives in java.util: add "import java.util.${symbol.slice(6)};" at the very top of the file.`;
    }
    if (symbol.startsWith("variable ")) return `Check the spelling and capitals of ${symbol.slice(9)}, and that you declared it inside the braces you are using it in.`;
    if (symbol.startsWith("method ")) return `Check the method's spelling and capitals, and that you are giving it the right number and kinds of values.`;
    if (symbol.startsWith("class ")) return `Java is case-sensitive: check the capitals in ${symbol.slice(6)}.`;
    return null;
  }
  if (message === "';' expected") return "Every statement ends with a semicolon: add the missing one where the caret points.";
  if (message === "missing return statement") return "Every path through this method must reach a return, including the path where no if matches.";
  if (/might not have been initialized/.test(message)) return "Give the variable a starting value where you declare it, or make sure every path assigns it before this line.";
  if (/possible lossy conversion from double to int/.test(message)) return "A double can hold a fraction and an int cannot. If you mean to drop the fraction, cast it: (int) value.";
  if (/String cannot be converted to int/.test(message)) return "To turn text into a number, use Integer.parseInt(text).";
  if (/int cannot be converted to String/.test(message)) return "To turn a number into text, use String.valueOf(number), or \"\" + number.";
  if (message === "unreachable statement") return "Nothing after a return, break, continue or throw in the same block can ever run: move or remove it.";
  if (/^class, interface, enum, or record expected$/.test(message)) return "There is probably an extra closing brace } above this line, so this code has fallen outside the class.";
  if (message === "reached end of file while parsing") return "An opening brace { has no matching closing brace }. Count them in the method above.";
  if (/^incomparable types: String and/.test(message) || /^bad operand types for binary operator/.test(message)) return null;
  if (/non-static (variable|method) .* cannot be referenced from a static context/.test(message)) {
    return "main is static, so it has no object to use. Make this static too, or create an object first and call it on that.";
  }
  if (/^unreported exception/.test(message)) return "Add \"throws\" plus that exception's name after the method's parentheses, or wrap the call in try/catch.";
  return null;
}
