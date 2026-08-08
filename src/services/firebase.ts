import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDocFromServer,
  query,
  orderBy,
  limit
} from 'firebase/firestore';
import { Note, Suggestion, Submission } from '../types';

// Real firebase config provided by the user
const firebaseConfig = {
  apiKey:            "AIzaSyDf0V9VkoChFVF-MyeWFXHcYA1G6M2UBp8",
  authDomain:        "dssram-site.firebaseapp.com",
  projectId:         "dssram-site",
  storageBucket:     "dssram-site.firebasestorage.app",
  messagingSenderId: "92348233842",
  appId:             "1:92348233842:web:e22c91750f6c0ee3c9aaeb",
  measurementId:     "G-LD0CHBQZQE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
      emailVerified: null,
      isAnonymous: null,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Validate connection on load
export async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}

// 1. Submit Interaction Card Forms (music, fitness, speaking) -> writes to "submissions"
export async function addSubmission(type: string, value: string, name: string): Promise<void> {
  const path = 'submissions';
  try {
    await addDoc(collection(db, path), {
      type,
      value,
      name: name || 'anonymous',
      ts: Date.now()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// 2. Suggest Book / Movie -> writes to "suggestions"
export async function addSuggestion(title: string, why: string, name: string, type: 'book' | 'movie'): Promise<void> {
  const path = 'suggestions';
  try {
    await addDoc(collection(db, path), {
      title,
      why,
      name: name || 'a fan',
      type,
      ts: Date.now()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// Get Suggestions (for Admin View)
export async function fetchSuggestions(): Promise<Suggestion[]> {
  const path = 'suggestions';
  try {
    const snap = await getDocs(collection(db, path));
    const items: Suggestion[] = [];
    snap.forEach((docSnap) => {
      const data = docSnap.data();
      items.push({
        id: docSnap.id,
        title: data.title || '',
        why: data.why || '',
        name: data.name || '',
        type: data.type || 'book',
        ts: data.ts || Date.now()
      });
    });
    return items.sort((a, b) => b.ts - a.ts);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}

// Get Submissions (for Admin View)
export async function fetchSubmissions(): Promise<Submission[]> {
  const path = 'submissions';
  try {
    const snap = await getDocs(collection(db, path));
    const items: Submission[] = [];
    snap.forEach((docSnap) => {
      const data = docSnap.data();
      items.push({
        id: docSnap.id,
        type: data.type || '',
        value: data.value || '',
        name: data.name || '',
        ts: data.ts || Date.now()
      });
    });
    return items.sort((a, b) => b.ts - a.ts);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}

// 3. Visitor Notes (Feedback) -> writes to "notes"
export async function addNote(text: string, name: string): Promise<void> {
  const path = 'notes';
  try {
    await addDoc(collection(db, path), {
      text,
      name: name || 'anonymous weirdo',
      ts: Date.now()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// Fetch Notes (for Visitor Notes panel)
export async function fetchNotes(): Promise<Note[]> {
  const path = 'notes';
  try {
    const snap = await getDocs(collection(db, path));
    const items: Note[] = [];
    snap.forEach((docSnap) => {
      const data = docSnap.data();
      items.push({
        id: docSnap.id,
        text: data.text || '',
        name: data.name || 'anonymous weirdo',
        ts: data.ts || Date.now()
      });
    });
    return items.sort((a, b) => b.ts - a.ts);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}
