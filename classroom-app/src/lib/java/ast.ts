/* The shape of a parsed Java program.

   Nodes are plain objects with a `kind`. The checker writes what it learns
   (the static type, the resolved variable or method, a constant value) onto
   the same nodes, and the code generator reads it back from there - see the
   `Checked` fields below.
*/
import type { JavaType, FieldInfo, MethodInfo, ClassInfo, LocalVariable } from "./types";

export type Position = { line: number; column: number; offset: number };

export type TypeNode = {
  kind: "Type";
  position: Position;
  name: string;              // "int", "String", "java.util.Scanner", "Map.Entry", "var"
  typeArguments: TypeNode[] | null;   // null: none written, []: the diamond <>
  dimensions: number;
  wildcard?: boolean;
  resolved?: JavaType;
};

type Checked = {
  position: Position;
  type?: JavaType;
  constant?: string | number | boolean | bigint;   // compile-time constant, when there is one
};

export type Literal = Checked & {
  kind: "Literal";
  literalType: "int" | "long" | "float" | "double" | "char" | "string" | "boolean" | "null";
  value: string | number | bigint | boolean | null;
  text: string;
};
export type NameExpression = Checked & {
  kind: "Name"; name: string;
  resolution?:
    | { to: "local"; variable: LocalVariable }
    | { to: "field"; field: FieldInfo; implicitThis: boolean }
    | { to: "class"; classInfo: ClassInfo }
    | { to: "package"; name: string };
};
export type FieldAccess = Checked & {
  kind: "FieldAccess"; target: Expression; name: string; dotPosition: Position;
  resolution?:
    | { to: "field"; field: FieldInfo }
    | { to: "length" }
    | { to: "class"; classInfo: ClassInfo }
    | { to: "package"; name: string };
};
export type ArrayAccess = Checked & { kind: "ArrayAccess"; array: Expression; index: Expression };
export type MethodCall = Checked & {
  kind: "Call"; target: Expression | null; name: string; args: Expression[];
  namePosition: Position; dotPosition?: Position;
  method?: MethodInfo;
  staticTarget?: boolean;         // Math.max(...), Main.helper(...)
  superCall?: boolean;            // super.speak()
  varargsCall?: boolean;          // arguments are packed into an array
  receiverType?: JavaType;        // the (substituted) type the method was found on
};
export type NewObject = Checked & {
  kind: "New"; typeNode: TypeNode; args: Expression[]; hasBody: boolean;
  constructorInfo?: MethodInfo; varargsCall?: boolean;
};
export type NewArray = Checked & {
  kind: "NewArray"; elementType: TypeNode; dimensionExpressions: Expression[]; extraDimensions: number;
  initializer: ArrayInitializer | null;
};
export type ArrayInitializer = Checked & { kind: "ArrayInit"; elements: Expression[] };
export type Unary = Checked & { kind: "Unary"; operator: "+" | "-" | "!" | "~" | "++" | "--"; operand: Expression };
export type Postfix = Checked & { kind: "Postfix"; operator: "++" | "--"; operand: Expression };
export type Binary = Checked & {
  kind: "Binary"; operator: string; left: Expression; right: Expression; operatorPosition: Position;
  operandType?: JavaType;        // the promoted type the operation is done in
};
export type Assignment = Checked & {
  kind: "Assign"; operator: string; target: Expression; value: Expression; operatorPosition: Position;
  operandType?: JavaType;
};
export type Conditional = Checked & { kind: "Conditional"; condition: Expression; whenTrue: Expression; whenFalse: Expression };
export type Cast = Checked & { kind: "Cast"; typeNode: TypeNode; operand: Expression };
export type InstanceOf = Checked & { kind: "InstanceOf"; operand: Expression; typeNode: TypeNode; binding: string | null; operatorPosition: Position };
export type This = Checked & { kind: "This" };
export type SwitchExpression = Checked & { kind: "SwitchExpr"; selector: Expression; cases: SwitchCase[] };
export type Unsupported = Checked & { kind: "Unsupported"; feature: string };

export type Expression =
  | Literal | NameExpression | FieldAccess | ArrayAccess | MethodCall | NewObject | NewArray | ArrayInitializer
  | Unary | Postfix | Binary | Assignment | Conditional | Cast | InstanceOf | This | SwitchExpression | Unsupported;

export type Declarator = { name: string; position: Position; dimensions: number; initializer: Expression | null; variable?: LocalVariable };

export type Block = { kind: "Block"; position: Position; statements: Statement[]; closePosition: Position };
export type LocalVariableDeclaration = {
  kind: "LocalVar"; position: Position; typeNode: TypeNode; declarators: Declarator[]; isFinal: boolean;
};
export type ExpressionStatement = { kind: "ExprStmt"; position: Position; expression: Expression };
export type IfStatement = { kind: "If"; position: Position; condition: Expression; thenBranch: Statement; elseBranch: Statement | null };
export type WhileStatement = { kind: "While"; position: Position; condition: Expression; body: Statement };
export type DoStatement = { kind: "Do"; position: Position; body: Statement; condition: Expression };
export type ForStatement = {
  kind: "For"; position: Position; init: Statement[]; condition: Expression | null; update: Expression[]; body: Statement;
};
export type ForEachStatement = {
  kind: "ForEach"; position: Position; typeNode: TypeNode; name: string; namePosition: Position; isFinal: boolean;
  iterable: Expression; body: Statement; variable?: LocalVariable; elementType?: JavaType;
};
export type ReturnStatement = { kind: "Return"; position: Position; value: Expression | null; returnType?: JavaType };
export type BreakStatement = { kind: "Break"; position: Position; label: string | null };
export type ContinueStatement = { kind: "Continue"; position: Position; label: string | null };
export type ThrowStatement = { kind: "Throw"; position: Position; value: Expression };
export type YieldStatement = { kind: "Yield"; position: Position; value: Expression; resultType?: JavaType };
export type SwitchCase = {
  position: Position;
  labels: Expression[];          // empty with isDefault: the default case
  isDefault: boolean;
  arrow: boolean;
  body: Statement[];             // for an arrow case: one statement (a block, a throw, or an expression statement)
  arrowExpression?: Expression;  // for an arrow case whose body is a bare expression
};
export type SwitchStatement = { kind: "Switch"; position: Position; selector: Expression; cases: SwitchCase[]; closePosition: Position };
export type CatchClause = { position: Position; types: TypeNode[]; name: string; body: Block; variable?: LocalVariable };
export type TryStatement = { kind: "Try"; position: Position; body: Block; catches: CatchClause[]; finallyBlock: Block | null; hasResources: boolean };
export type LabeledStatement = { kind: "Labeled"; position: Position; label: string; body: Statement };
export type EmptyStatement = { kind: "Empty"; position: Position };
export type AssertStatement = { kind: "Assert"; position: Position; condition: Expression; message: Expression | null };
export type UnsupportedStatement = { kind: "UnsupportedStmt"; position: Position; feature: string };

export type Statement =
  | Block | LocalVariableDeclaration | ExpressionStatement | IfStatement | WhileStatement | DoStatement
  | ForStatement | ForEachStatement | ReturnStatement | BreakStatement | ContinueStatement | ThrowStatement
  | YieldStatement | SwitchStatement | TryStatement | LabeledStatement | EmptyStatement | AssertStatement
  | UnsupportedStatement;

export type Modifiers = { names: Set<string>; annotations: { name: string; position: Position }[]; position: Position };

export type Parameter = { typeNode: TypeNode; name: string; position: Position; isFinal: boolean; varargs: boolean; variable?: LocalVariable };

export type FieldDeclaration = {
  kind: "Field"; position: Position; modifiers: Modifiers; typeNode: TypeNode; declarators: Declarator[];
  fields?: FieldInfo[];
};
export type MethodDeclaration = {
  kind: "Method"; position: Position; namePosition: Position; modifiers: Modifiers; typeParameters: string[];
  returnType: TypeNode; name: string; parameters: Parameter[]; throwsTypes: TypeNode[]; body: Block | null;
  info?: MethodInfo;
};
export type ConstructorDeclaration = {
  kind: "Constructor"; position: Position; namePosition: Position; modifiers: Modifiers; name: string;
  parameters: Parameter[]; throwsTypes: TypeNode[]; body: Block;
  explicitCall: { kind: "this" | "super"; args: Expression[]; position: Position; constructorInfo?: MethodInfo; varargsCall?: boolean } | null;
  info?: MethodInfo;
};
export type InitializerBlock = { kind: "Initializer"; position: Position; isStatic: boolean; body: Block };
export type EnumConstant = { name: string; position: Position; args: Expression[]; hasBody: boolean };

export type ClassDeclaration = {
  kind: "Class"; position: Position; namePosition: Position; modifiers: Modifiers;
  declarationKind: "class" | "interface" | "enum" | "record";
  name: string; typeParameters: string[];
  superclass: TypeNode | null; interfaces: TypeNode[];
  members: Member[];
  enumConstants: EnumConstant[];
  closePosition: Position;
  file: string;
  info?: ClassInfo;
};

export type Member = FieldDeclaration | MethodDeclaration | ConstructorDeclaration | InitializerBlock | ClassDeclaration;

export type ImportDeclaration = { name: string; star: boolean; isStatic: boolean; position: Position };

export type CompilationUnit = {
  file: string;
  packageName: string | null;
  imports: ImportDeclaration[];
  types: ClassDeclaration[];
};
