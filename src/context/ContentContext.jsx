import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { doc, getDoc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";
import { defaultContent } from "../data/defaultContent.js";
import { firebaseApp, isFirebaseConfigured } from "../lib/firebase.js";

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadContent() {
      if (!isFirebaseConfigured) {
        setLoading(false);
        return;
      }

      try {
        const db = getFirestore(firebaseApp);
        const docRef = doc(db, "content", "main");
        const snapshot = await getDoc(docRef);
        if (snapshot.exists() && snapshot.data().content) {
          if (isMounted) {
            setContent(snapshot.data().content);
          }
        }
      } catch (error) {
        console.warn("Nije moguce ucitati sadrzaj iz Firestore.", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadContent();

    return () => {
      isMounted = false;
    };
  }, []);

  const saveContent = async (nextContent) => {
    setContent(nextContent);

    if (!isFirebaseConfigured) {
      return;
    }

    try {
      setSaving(true);
      const db = getFirestore(firebaseApp);
      await setDoc(doc(db, "content", "main"), {
        content: nextContent,
        updatedAt: serverTimestamp()
      });
    } finally {
      setSaving(false);
    }
  };

  const value = useMemo(
    () => ({ content, setContent, saveContent, loading, saving }),
    [content, loading, saving]
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  return useContext(ContentContext);
}
