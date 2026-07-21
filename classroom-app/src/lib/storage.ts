import type { ClassRecord } from "./types";

const DB_NAME = "utg-classroom-v1";
const STORE = "classes";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE, { keyPath: "id" });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveClass(record: ClassRecord) {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const request = db.transaction(STORE, "readwrite").objectStore(STORE).put(record);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
  db.close();
}

export async function getClassByCode(code: string) {
  const db = await openDb();
  const rows = await new Promise<ClassRecord[]>((resolve, reject) => {
    const request = db.transaction(STORE, "readonly").objectStore(STORE).getAll();
    request.onsuccess = () => resolve(request.result as ClassRecord[]);
    request.onerror = () => reject(request.error);
  });
  db.close();
  return rows.find((row) => row.code === code);
}

export async function getClasses() {
  const db = await openDb();
  const rows = await new Promise<ClassRecord[]>((resolve, reject) => {
    const request = db.transaction(STORE, "readonly").objectStore(STORE).getAll();
    request.onsuccess = () => resolve(request.result as ClassRecord[]);
    request.onerror = () => reject(request.error);
  });
  db.close();
  return rows;
}

export async function persistentStorage() {
  if (!navigator.storage) return false;
  return navigator.storage.persist();
}
