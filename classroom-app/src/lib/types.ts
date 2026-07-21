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

export type Project = {
  id: string;
  title: string;
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

export const starterFiles = (): Record<string, string> => ({
  "index.html": "<main>\n  <h1>Hello, UTG!</h1>\n  <p>Change this file, then press Run.</p>\n</main>",
  "style.css": "body {\n  font-family: Arial, sans-serif;\n  padding: 2rem;\n  color: #133040;\n}\n",
  "script.js": "// Write JavaScript here.\nconsole.log('My project is ready!');\n",
});
