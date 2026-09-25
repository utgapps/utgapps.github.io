/* What the checker knows about types, classes, fields, methods and variables,
   and the conversion rules between types (JLS chapter 5), in one place.

   The rules here decide what is a compile error, so they follow the spec
   rather than intuition: `byte b = 10;` is legal (a constant that fits), `int
   x = 5.0;` is not (lossy), and `ArrayList<Object>` is NOT a supertype of
   `ArrayList<String>`.
*/
import type * as Ast from "./ast";

export type PrimitiveName = "int" | "long" | "double" | "float" | "boolean" | "char" | "byte" | "short";

export type JavaType =
  | { tag: "primitive"; name: PrimitiveName }
  | { tag: "void" }
  | { tag: "null" }
  | { tag: "class"; classInfo: ClassInfo; typeArguments: JavaType[] }
  | { tag: "array"; element: JavaType }
  | { tag: "typeVariable"; name: string }
  | { tag: "error" };

export type ClassInfo = {
  name: string;                 // simple name: "String", "Main", "Inner"
  qualifiedName: string;        // "java.lang.String", "Main", "Main.Inner"
  packageName: string;          // "java.lang"; "" for the student's own classes
  kind: "class" | "interface" | "enum";
  isAbstract: boolean;
  isFinal: boolean;
  typeParameters: string[];
  superclass: JavaType | null;
  interfaces: JavaType[];
  fields: Map<string, FieldInfo>;
  methods: MethodInfo[];
  constructors: MethodInfo[];
  isUser: boolean;
  declaration?: Ast.ClassDeclaration;
  outer?: ClassInfo;
  isStaticNested: boolean;
  jsName: string;               // how generated code names the class
  unsupported?: string;         // a real JDK class the classroom cannot run yet
  isThrowable?: boolean;
  isChecked?: boolean;          // a checked exception: must be caught or declared
  enumConstants?: string[];
  /** Methods the field initializers and initializer blocks call, instance and static. */
  instanceInitializerCallees?: Set<MethodInfo>;
  staticInitializerCallees?: Set<MethodInfo>;
  instanceInitializerBlocking?: boolean;
  /** A non-static member class: its objects belong to an object of the outer class. */
  isInner?: boolean;
};

export type FieldInfo = {
  name: string;
  type: JavaType;
  isStatic: boolean;
  isFinal: boolean;
  isPrivate: boolean;
  owner: ClassInfo;
  constant?: string | number | boolean | bigint;
  jsName: string;
  declaration?: Ast.Declarator;
  isEnumConstant?: boolean;
};

export type MethodInfo = {
  name: string;
  owner: ClassInfo;
  parameters: JavaType[];
  parameterNames: string[];
  varargs: boolean;
  returnType: JavaType;
  isStatic: boolean;
  isAbstract: boolean;
  isPrivate: boolean;
  isConstructor: boolean;
  typeParameters: string[];
  throws: JavaType[];
  declaration?: Ast.MethodDeclaration | Ast.ConstructorDeclaration;
  jsName: string;
  /** For a library method: the runtime function generated code calls. */
  runtime?: string;
  /** Library instance method implemented as a real method on the runtime object. */
  runtimeMethod?: boolean;
  blocking: boolean;            // may wait for keyboard input or sleep
  isPublic?: boolean;
  /** For a student's method: every method and constructor its body calls. */
  callees?: Set<MethodInfo>;
};

export type LocalVariable = {
  name: string;
  type: JavaType;
  isFinal: boolean;
  id: number;
  jsName: string;
  position: Ast.Position;
  isParameter: boolean;
  constant?: string | number | boolean | bigint;   // a final local with a constant initializer
  isCatchParameter?: boolean;
  reassigned?: boolean;
};

// ---- constructors and constants ---------------------------------------------
const primitiveCache = new Map<PrimitiveName, JavaType>();
export function primitive(name: PrimitiveName): JavaType {
  let cached = primitiveCache.get(name);
  if (!cached) { cached = { tag: "primitive", name }; primitiveCache.set(name, cached); }
  return cached;
}
export const INT = primitive("int");
export const LONG = primitive("long");
export const DOUBLE = primitive("double");
export const FLOAT = primitive("float");
export const BOOLEAN = primitive("boolean");
export const CHAR = primitive("char");
export const BYTE = primitive("byte");
export const SHORT = primitive("short");
export const VOID: JavaType = { tag: "void" };
export const NULL_TYPE: JavaType = { tag: "null" };
export const ERROR_TYPE: JavaType = { tag: "error" };

export const PRIMITIVE_NAMES = new Set<string>(["int", "long", "double", "float", "boolean", "char", "byte", "short"]);

export function classType(classInfo: ClassInfo, typeArguments: JavaType[] = []): JavaType {
  return { tag: "class", classInfo, typeArguments };
}
export function arrayOf(element: JavaType): JavaType {
  return { tag: "array", element };
}

// ---- questions about a type -------------------------------------------------
export const isPrimitive = (type: JavaType, name?: PrimitiveName) =>
  type.tag === "primitive" && (name === undefined || type.name === name);
export const isError = (type: JavaType) => type.tag === "error";
export const isReference = (type: JavaType) => type.tag === "class" || type.tag === "array" || type.tag === "null" || type.tag === "typeVariable";
export const isClass = (type: JavaType, qualifiedName: string) => type.tag === "class" && type.classInfo.qualifiedName === qualifiedName;
export const isString = (type: JavaType) => isClass(type, "java.lang.String");

const NUMERIC_RANK: Record<string, number> = { byte: 1, short: 2, char: 2, int: 3, long: 4, float: 5, double: 6 };
export function isNumericPrimitive(type: JavaType): boolean {
  return type.tag === "primitive" && type.name !== "boolean";
}
export function isIntegralPrimitive(type: JavaType): boolean {
  return type.tag === "primitive" && ["int", "long", "char", "byte", "short"].includes(type.name);
}

export const BOX_OF: Record<PrimitiveName, string> = {
  int: "java.lang.Integer", long: "java.lang.Long", double: "java.lang.Double", float: "java.lang.Float",
  boolean: "java.lang.Boolean", char: "java.lang.Character", byte: "java.lang.Byte", short: "java.lang.Short",
};
const UNBOX_OF: Record<string, PrimitiveName> = Object.fromEntries(
  Object.entries(BOX_OF).map(([primitiveName, boxName]) => [boxName, primitiveName as PrimitiveName]));

/** Integer -> int, and so on; null for anything that does not unbox. */
export function unboxed(type: JavaType): JavaType | null {
  if (type.tag !== "class") return null;
  const name = UNBOX_OF[type.classInfo.qualifiedName];
  return name ? primitive(name) : null;
}

/** The primitive a value of this type is, directly or after unboxing. */
export function primitiveOf(type: JavaType): JavaType | null {
  return type.tag === "primitive" ? type : unboxed(type);
}

export function sameType(first: JavaType, second: JavaType): boolean {
  if (first.tag !== second.tag) return false;
  switch (first.tag) {
    case "primitive": return first.name === (second as typeof first).name;
    case "class": {
      const other = second as typeof first;
      if (first.classInfo !== other.classInfo) return false;
      if (!first.typeArguments.length || !other.typeArguments.length) return true;   // raw
      return first.typeArguments.length === other.typeArguments.length
        && first.typeArguments.every((argument, index) => sameType(argument, other.typeArguments[index]));
    }
    case "array": return sameType(first.element, (second as typeof first).element);
    case "typeVariable": return first.name === (second as typeof first).name;
    default: return true;
  }
}

// ---- how types read in an error message --------------------------------------
export function typeName(type: JavaType): string {
  switch (type.tag) {
    case "primitive": return type.name;
    case "void": return "void";
    case "null": return "<null>";
    case "error": return "<any>";
    case "typeVariable": return type.name;
    case "array": return typeName(type.element) + "[]";
    case "class": {
      const base = type.classInfo.isUser ? type.classInfo.qualifiedName : type.classInfo.name;
      return type.typeArguments.length ? `${base}<${type.typeArguments.map(typeName).join(",")}>` : base;
    }
  }
}

// ---- generics: substitution and supertypes -------------------------------------
export type Substitution = Map<string, JavaType>;

export function substitute(type: JavaType, substitution: Substitution): JavaType {
  if (!substitution.size) return type;
  switch (type.tag) {
    case "typeVariable": return substitution.get(type.name) ?? type;
    case "array": return arrayOf(substitute(type.element, substitution));
    case "class": return type.typeArguments.length
      ? classType(type.classInfo, type.typeArguments.map((argument) => substitute(argument, substitution)))
      : type;
    default: return type;
  }
}

/** The substitution a parameterised type implies: ArrayList<String> gives E -> String. */
export function substitutionOf(type: JavaType): Substitution {
  const substitution: Substitution = new Map();
  if (type.tag === "class" && type.typeArguments.length === type.classInfo.typeParameters.length) {
    type.classInfo.typeParameters.forEach((parameter, index) => substitution.set(parameter, type.typeArguments[index]));
  } else if (type.tag === "class") {
    // A raw type: every type variable reads as Object.
    for (const parameter of type.classInfo.typeParameters) substitution.set(parameter, OBJECT_PLACEHOLDER.type);
  }
  return substitution;
}

/** Filled in by the library once java.lang.Object exists. */
export const OBJECT_PLACEHOLDER: { type: JavaType } = { type: ERROR_TYPE };

export function directSupertypes(type: JavaType): JavaType[] {
  if (type.tag !== "class") return [];
  const substitution = substitutionOf(type);
  const supers: JavaType[] = [];
  const info = type.classInfo;
  if (info.superclass) supers.push(substitute(info.superclass, substitution));
  for (const implemented of info.interfaces) supers.push(substitute(implemented, substitution));
  if (!info.superclass && info.qualifiedName !== "java.lang.Object") supers.push(OBJECT_PLACEHOLDER.type);
  return supers;
}

/** `type` viewed as an instance of `target` (ArrayList<String> as List gives List<String>), or null. */
export function asSuper(type: JavaType, target: ClassInfo): JavaType | null {
  if (type.tag !== "class") return null;
  if (type.classInfo === target) return type;
  for (const parent of directSupertypes(type)) {
    const found = asSuper(parent, target);
    if (found) return found;
  }
  return null;
}

export function isSubclass(sub: ClassInfo, sup: ClassInfo): boolean {
  return asSuper(classType(sub), sup) !== null;
}

/** Reference subtyping, with invariant type arguments and raw types allowed either way. */
export function isSubtype(sub: JavaType, sup: JavaType): boolean {
  if (sub.tag === "error" || sup.tag === "error") return true;
  if (sub.tag === "null") return isReference(sup);
  if (sup.tag === "class" && sup.classInfo.qualifiedName === "java.lang.Object") return isReference(sub);
  if (sub.tag === "array") {
    if (sup.tag === "array") {
      if (sub.element.tag === "primitive" || sup.element.tag === "primitive") return sameType(sub.element, sup.element);
      return isSubtype(sub.element, sup.element);
    }
    return false;
  }
  if (sub.tag === "typeVariable") return sup.tag === "typeVariable" && sup.name === sub.name;
  if (sub.tag !== "class" || sup.tag !== "class") return false;
  const viewed = asSuper(sub, sup.classInfo);
  if (!viewed || viewed.tag !== "class") return false;
  if (!sup.typeArguments.length || !viewed.typeArguments.length) return true;
  return viewed.typeArguments.every((argument, index) => typeArgumentContains(sup.typeArguments[index], argument));
}

function typeArgumentContains(expected: JavaType, actual: JavaType): boolean {
  if (expected.tag === "typeVariable" || actual.tag === "typeVariable") return true;
  return sameType(expected, actual);
}

// ---- primitive conversions --------------------------------------------------
/** Widening primitive conversion (JLS 5.1.2), identity included. */
export function wideningPrimitive(from: JavaType, to: JavaType): boolean {
  if (from.tag !== "primitive" || to.tag !== "primitive") return false;
  if (from.name === to.name) return true;
  if (from.name === "boolean" || to.name === "boolean") return false;
  if (to.name === "char") return false;
  if (from.name === "char") return NUMERIC_RANK[to.name] >= NUMERIC_RANK.int;
  if (to.name === "short") return from.name === "byte";
  return NUMERIC_RANK[from.name] < NUMERIC_RANK[to.name];
}

export function binaryNumericPromotion(first: JavaType, second: JavaType): JavaType {
  const names = [first, second].map((type) => (type.tag === "primitive" ? type.name : "int"));
  if (names.includes("double")) return DOUBLE;
  if (names.includes("float")) return FLOAT;
  if (names.includes("long")) return LONG;
  return INT;
}

export function unaryNumericPromotion(type: JavaType): JavaType {
  if (type.tag === "primitive" && (type.name === "byte" || type.name === "short" || type.name === "char")) return INT;
  return type;
}

/** Does this int constant fit the narrower type, so `byte b = 10;` compiles? */
export function constantFits(value: unknown, to: JavaType): boolean {
  if (typeof value !== "number" || !Number.isInteger(value) || to.tag !== "primitive") return false;
  switch (to.name) {
    case "byte": return value >= -128 && value <= 127;
    case "short": return value >= -32768 && value <= 32767;
    case "char": return value >= 0 && value <= 65535;
    default: return false;
  }
}

export type ConversionFailure = "incompatible" | "lossy";

/** Assignment context (JLS 5.2). `constant` is the source's compile-time value, if any. */
export function assignmentConversion(from: JavaType, to: JavaType, constant?: unknown, boxingAllowed = true): true | ConversionFailure {
  if (from.tag === "error" || to.tag === "error") return true;
  if (from.tag === "void") return "incompatible";
  if (to.tag === "primitive") {
    if (from.tag === "primitive") {
      if (wideningPrimitive(from, to)) return true;
      if (constant !== undefined && from.tag === "primitive" && ["int", "char", "short", "byte"].includes(from.name) && constantFits(constant, to)) return true;
      if (from.name === "boolean" || to.name === "boolean") return "incompatible";
      return "lossy";
    }
    if (!boxingAllowed) return "incompatible";
    const inner = unboxed(from);
    if (inner && wideningPrimitive(inner, to)) return true;
    return "incompatible";
  }
  if (from.tag === "primitive") {
    if (!boxingAllowed) return "incompatible";
    // Boxing then widening reference: int -> Integer -> Object / Number / Comparable.
    const boxName = BOX_OF[from.name];
    if (to.tag === "class" && to.classInfo.qualifiedName === boxName) return true;
    if (constant !== undefined && to.tag === "class") {
      // Byte b = 10; Character c = 65; Short s = 1;
      const target = unboxed(to);
      if (target && ["byte", "short", "char"].includes((target as { name: string }).name) && constantFits(constant, target)) return true;
    }
    const boxed = BOXED_TYPES.get(boxName);
    if (boxed && isSubtype(boxed, to)) return true;
    return "incompatible";
  }
  return isSubtype(from, to) ? true : "incompatible";
}

/** Filled in by the library: Integer, Double, ... as class types. */
export const BOXED_TYPES = new Map<string, JavaType>();

export function boxedType(type: JavaType): JavaType {
  return type.tag === "primitive" ? BOXED_TYPES.get(BOX_OF[type.name]) ?? type : type;
}

/** Casting context (JLS 5.5): is `(to) value-of-from` legal at all? */
export function castAllowed(from: JavaType, to: JavaType): boolean {
  if (from.tag === "error" || to.tag === "error") return true;
  if (from.tag === "primitive" && to.tag === "primitive") {
    return (from.name === "boolean") === (to.name === "boolean");
  }
  if (to.tag === "primitive") {
    // (int) someInteger unboxes; (int) someObject casts to Integer then unboxes.
    const inner = unboxed(from);
    if (inner) return wideningPrimitive(inner, to);
    return from.tag === "class" && ["java.lang.Object", "java.lang.Number", "java.lang.Comparable"].includes(from.classInfo.qualifiedName);
  }
  if (from.tag === "primitive") {
    const boxed = boxedType(from);
    return isSubtype(boxed, to);
  }
  if (from.tag === "null") return isReference(to);
  if (isSubtype(from, to) || isSubtype(to, from)) return true;
  if (from.tag === "class" && to.tag === "class") {
    // To or from an interface: legal unless the class is final and cannot implement it.
    if (to.classInfo.kind === "interface" && !from.classInfo.isFinal) return true;
    if (from.classInfo.kind === "interface" && !to.classInfo.isFinal) return true;
    if (from.classInfo === to.classInfo) return true;   // differing type arguments: unchecked
  }
  return false;
}

// ---- descriptors: how overloads get distinct generated names --------------------
export function erasedDescriptor(type: JavaType): string {
  switch (type.tag) {
    case "primitive": return ({ int: "I", long: "J", double: "D", float: "F", boolean: "Z", char: "C", byte: "B", short: "S" })[type.name];
    case "array": return "A" + erasedDescriptor(type.element);
    case "class": return type.classInfo.qualifiedName.replace(/\./g, "_");
    case "typeVariable": return "java_lang_Object";
    default: return "X";
  }
}
