import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firebaseApp, isFirebaseConfigured } from "../lib/firebase.js";
import { getFirestore } from "firebase/firestore";

export function useGallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      return () => {};
    }

    const db = getFirestore(firebaseApp);
    const galleryQuery = query(
      collection(db, "gallery"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      galleryQuery,
      (snapshot) => {
        const nextItems = snapshot.docs.map((docItem) => ({
          id: docItem.id,
          ...docItem.data()
        }));
        setItems(nextItems);
        setLoading(false);
      },
      () => {
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { items, loading };
}
