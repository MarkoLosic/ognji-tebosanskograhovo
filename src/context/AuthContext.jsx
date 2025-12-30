import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { firebaseApp, isFirebaseConfigured } from "../lib/firebase.js";

const AuthContext = createContext(null);

const ROLE_PROGRAMMER = "programmer";
const ROLE_ADMIN = "admin";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      return () => {};
    }

    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser || null);

      if (currentUser) {
        const db = getFirestore(firebaseApp);
        const roleDoc = await getDoc(doc(db, "roles", currentUser.uid));
        if (roleDoc.exists()) {
          setRole(roleDoc.data().role || null);
        } else {
          setRole(null);
        }
      } else {
        setRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    if (!isFirebaseConfigured) {
      throw new Error("Firebase nije konfigurisan.");
    }
    const auth = getAuth(firebaseApp);
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signOutUser = async () => {
    if (!isFirebaseConfigured) {
      return;
    }
    const auth = getAuth(firebaseApp);
    await signOut(auth);
  };

  const canEdit = role === ROLE_PROGRAMMER || role === ROLE_ADMIN;

  const value = useMemo(
    () => ({
      user,
      role,
      loading,
      canEdit,
      isProgrammer: role === ROLE_PROGRAMMER,
      signIn,
      signOutUser
    }),
    [user, role, loading, canEdit]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
