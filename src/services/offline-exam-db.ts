import { openDB } from "idb";

import type { SubmitExamInput } from "@/types/exam";

const DB_NAME = "oas-offline-db";
const STORE_NAME = "pending-submissions";
const DB_VERSION = 1;

type PendingSubmission = SubmitExamInput & {
  id: string;
  createdAt: number;
};

async function getDb() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
}

export async function savePendingSubmission(payload: SubmitExamInput): Promise<void> {
  const db = await getDb();
  const id = `${payload.examId}-${payload.submittedAt}`;
  await db.put(STORE_NAME, {
    ...payload,
    id,
    createdAt: Date.now(),
  } satisfies PendingSubmission);
}

export async function getPendingSubmissions(): Promise<PendingSubmission[]> {
  const db = await getDb();
  const items = await db.getAll(STORE_NAME);
  return items.sort((a, b) => a.createdAt - b.createdAt);
}

export async function removePendingSubmission(id: string): Promise<void> {
  const db = await getDb();
  await db.delete(STORE_NAME, id);
}
