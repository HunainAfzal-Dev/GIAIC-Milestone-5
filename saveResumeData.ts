// saveResumeData.ts
import { db } from "./firebaseConfig";

export async function saveResumeData(resumeData: any): Promise<string> {
  try {
    const docRef = await db.collection("resumes").add(resumeData);
    return docRef.id; // Returns the unique document ID for the shareable link
  } catch (error) {
    console.error("Error adding document: ", error);
    throw new Error("Failed to save resume data");
  }
}
