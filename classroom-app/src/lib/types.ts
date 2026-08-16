export type Student = {
  id: string;
  name: string;
  projectId: string;
  status: "offline" | "pending" | "connected" | "syncing";
  deviceIds: string[];
  lastSeen?: string;
};

export type Device = {
  id: string;
  studentId: string;
  label: string;
  fingerprint: string;
  approvedAt: string;
  revoked?: boolean;
};

export type ProjectKind = "web" | "java";

export type Project = {
  id: string;
  title: string;
  // Optional on purpose: .classpack archives and IndexedDB class records written
  // before multi-project support have no kind. Read it as `project.kind ?? "web"`
  // rather than bumping schemaVersion, which would reject every existing export.
  kind?: ProjectKind;
  files: Record<string, string>;
  updatedAt: string;
};

export type Checkpoint = {
  id: string;
  projectId: string;
  label: string;
  createdAt: string;
  files: Record<string, string>;
};

export type ClassRecord = {
  schemaVersion: 1;
  id: string;
  classId?: string;
  code: string;
  name: string;
  courseId: string;
  createdAt: string;
  admissionsOpen: boolean;
  students: Student[];
  devices: Device[];
  projects: Record<string, Project>;
  checkpoints: Checkpoint[];
  notes: string;
};

export type PendingJoin = {
  connectionId: string;
  studentName: string;
  deviceId: string;
  deviceLabel: string;
  fingerprint: string;
};

// Required argument rather than a default: both call sites should be looked at
// when a new kind appears, not silently fall through to "web".
export const starterFiles = (kind: ProjectKind): Record<string, string> =>
  kind === "java" ? javaStarter() : webStarter();

const webStarter = (): Record<string, string> => ({
  "index.html": "<main>\n  <h1>Hello, UTG!</h1>\n  <p>Change this file, then press Run.</p>\n</main>",
  "style.css": "body {\n  font-family: Arial, sans-serif;\n  padding: 2rem;\n  color: #133040;\n}\n",
  "script.js": "// Write JavaScript here.\n// Anything you console.log() shows up in the Console panel.\nconsole.log('My project is ready!');\n",
});

const javaStarter = (): Record<string, string> => ({
  "Main.java":
    "public class Main {\n" +
    "  public static void main(String[] args) {\n" +
    '    System.out.println("Hello, UTG!");\n' +
    "  }\n" +
    "}\n",
  "NOTES.md":
    "# Java notes\n\n" +
    "Write your Java here. It saves and syncs exactly like a web project, and your\n" +
    "teacher can see it live.\n\n" +
    "Running Java in the browser is not built yet, so there is no preview on this\n" +
    "kind of project. Use it for writing practice and for work you will run\n" +
    "somewhere else.\n",
});
