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

/* The value a game project carries in the database. It predates the editor's
   name and sits in every row students have already saved, so it is a stored
   value rather than a label: changing it is a D1 migration, not a rename.
   Nothing a student sees comes from here - see KIND_LABEL in ProjectPicker. */
export const GAME_KIND = "pixelpad" as const;

export type ProjectKind = "web" | "java" | typeof GAME_KIND;

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
  kind === "java" ? javaStarter() : kind === GAME_KIND ? gameStarter() : webStarter();

// Only the page to start with. Making a stylesheet and a script - and wiring
// them up yourself - is worth learning, so the editor no longer does it behind
// the student's back by gluing three fixed filenames together.
const webStarter = (): Record<string, string> => ({
  "index.html":
    "<h1>Hello, UTG!</h1>\n" +
    "<p>Change this file, then press Run.</p>\n" +
    "\n" +
    "<!--\n" +
    "  Want styling? Add a file called style.css, then link it here:\n" +
    '    <link rel="stylesheet" href="style.css">\n' +
    "\n" +
    "  Want JavaScript? Add script.js, then load it at the BOTTOM of this file:\n" +
    '    <script src="script.js"><\\/script>\n' +
    "  The bottom matters. A script that runs before the page exists cannot find it.\n" +
    "-->\n",
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

/* A new game is empty - no code, no pictures, nothing in game.txt.
 *
 * It used to open with a monster already on the screen. That is a good demo
 * and a bad lesson: the class types over somebody else's game, and the first
 * picture every child sees is a green square that came with the file. The
 * editor is built for this - every panel it lists and cannot find offers to
 * write itself, with the same note in it a new one gets - so an empty project
 * is a screen full of next steps rather than a blank page.
 *
 * One file per code panel, named <Thing>.<start or loop>.py. Anything not
 * named as a room in game.txt is a thing you can make lots of. */
const gameStarter = (): Record<string, string> => ({});
