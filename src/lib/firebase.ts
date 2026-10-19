import { initializeApp, getApps } from "firebase/app";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  onSnapshot, 
  collection, 
  getDocs, 
  deleteDoc, 
  writeBatch 
} from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";
import { VariableData, SubjectJtm, SupervisionRecord, ProgramItem } from "../types";
import { defaultVariables } from "../data/defaultVariables";
import { initialSubjectJtmList, initialProgramItems } from "../data/interactiveData";

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || "(default)");

// -------------------------------
// 1. App Variables (Madrasah Settings)
// -------------------------------
export const subscribeVariables = (onUpdate: (vars: VariableData) => void) => {
  const docRef = doc(db, "app_settings", "global_variables");
  return onSnapshot(docRef, (snapshot) => {
    if (snapshot.exists()) {
      onUpdate(snapshot.data() as VariableData);
    } else {
      // Initialize with defaultVariables if empty
      setDoc(docRef, defaultVariables);
      onUpdate(defaultVariables);
    }
  }, (err) => {
    console.warn("Firestore error for variables, fallback to default", err);
    onUpdate(defaultVariables);
  });
};

export const saveVariablesToFirestore = async (updated: VariableData) => {
  try {
    const docRef = doc(db, "app_settings", "global_variables");
    await setDoc(docRef, updated);
  } catch (err) {
    console.error("Failed to save variables to Firestore:", err);
  }
};

// -------------------------------
// 2. JTM Subjects
// -------------------------------
export const subscribeSubjects = (onUpdate: (subjects: SubjectJtm[]) => void) => {
  const colRef = collection(db, "jtm_subjects");
  return onSnapshot(colRef, (snapshot) => {
    if (!snapshot.empty) {
      const list: SubjectJtm[] = snapshot.docs.map((d) => d.data() as SubjectJtm);
      // Sort by code for consistent display
      list.sort((a, b) => a.code.localeCompare(b.code, undefined, { numeric: true }));
      onUpdate(list);
    } else {
      // Seed initial subjects
      seedInitialSubjects().then(() => {
        onUpdate(initialSubjectJtmList);
      });
    }
  }, (err) => {
    console.warn("Firestore error for subjects:", err);
    onUpdate(initialSubjectJtmList);
  });
};

export const saveSubjectToFirestore = async (subject: SubjectJtm) => {
  try {
    const docRef = doc(db, "jtm_subjects", subject.code);
    await setDoc(docRef, subject);
  } catch (err) {
    console.error("Failed to save subject to Firestore:", err);
  }
};

export const deleteSubjectFromFirestore = async (code: string) => {
  try {
    const docRef = doc(db, "jtm_subjects", code);
    await deleteDoc(docRef);
  } catch (err) {
    console.error("Failed to delete subject from Firestore:", err);
  }
};

export const resetSubjectsInFirestore = async () => {
  try {
    const colRef = collection(db, "jtm_subjects");
    const snapshot = await getDocs(colRef);
    const batch = writeBatch(db);
    snapshot.docs.forEach((d) => batch.delete(d.ref));
    await batch.commit();

    // Re-seed
    const newBatch = writeBatch(db);
    initialSubjectJtmList.forEach((subj) => {
      const ref = doc(db, "jtm_subjects", subj.code);
      newBatch.set(ref, subj);
    });
    await newBatch.commit();
  } catch (err) {
    console.error("Failed to reset subjects in Firestore:", err);
  }
};

const seedInitialSubjects = async () => {
  try {
    const batch = writeBatch(db);
    initialSubjectJtmList.forEach((subj) => {
      const ref = doc(db, "jtm_subjects", subj.code);
      batch.set(ref, subj);
    });
    await batch.commit();
  } catch (e) {
    console.error("Error seeding initial subjects", e);
  }
};

// -------------------------------
// 3. Supervision Records
// -------------------------------
export const subscribeSupervisionRecords = (onUpdate: (records: SupervisionRecord[]) => void) => {
  const colRef = collection(db, "supervision_records");
  return onSnapshot(colRef, (snapshot) => {
    const list: SupervisionRecord[] = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data()
    } as SupervisionRecord));
    
    // Sort by tanggal descending
    list.sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime());
    onUpdate(list);
  }, (err) => {
    console.warn("Firestore error for supervision records:", err);
  });
};

export const saveSupervisionRecordToFirestore = async (record: SupervisionRecord) => {
  try {
    const docRef = doc(db, "supervision_records", record.id);
    await setDoc(docRef, record);
  } catch (err) {
    console.error("Failed to save supervision record to Firestore:", err);
  }
};

export const deleteSupervisionRecordFromFirestore = async (id: string) => {
  try {
    const docRef = doc(db, "supervision_records", id);
    await deleteDoc(docRef);
  } catch (err) {
    console.error("Failed to delete supervision record from Firestore:", err);
  }
};

// -------------------------------
// 4. Program Items
// -------------------------------
export const subscribeProgramItems = (onUpdate: (items: ProgramItem[]) => void) => {
  const colRef = collection(db, "program_items");
  return onSnapshot(colRef, (snapshot) => {
    if (!snapshot.empty) {
      const list: ProgramItem[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data()
      } as ProgramItem));
      onUpdate(list);
    } else {
      seedInitialPrograms().then(() => {
        onUpdate(initialProgramItems);
      });
    }
  }, (err) => {
    console.warn("Firestore error for program items:", err);
    onUpdate(initialProgramItems);
  });
};

export const saveProgramItemToFirestore = async (item: ProgramItem) => {
  try {
    const docRef = doc(db, "program_items", item.id);
    await setDoc(docRef, item);
  } catch (err) {
    console.error("Failed to save program item to Firestore:", err);
  }
};

export const deleteProgramItemFromFirestore = async (id: string) => {
  try {
    const docRef = doc(db, "program_items", id);
    await deleteDoc(docRef);
  } catch (err) {
    console.error("Failed to delete program item from Firestore:", err);
  }
};

const seedInitialPrograms = async () => {
  try {
    const batch = writeBatch(db);
    initialProgramItems.forEach((prog) => {
      const ref = doc(db, "program_items", prog.id);
      batch.set(ref, prog);
    });
    await batch.commit();
  } catch (e) {
    console.error("Error seeding initial programs", e);
  }
};
