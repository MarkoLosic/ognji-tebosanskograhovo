import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext.jsx";
import { useContent } from "../context/ContentContext.jsx";
import { firebaseApp, isFirebaseConfigured } from "../lib/firebase.js";
import { flattenContent, setContentValue } from "../utils/content.js";

export default function Admin() {
  const { user, canEdit, loading, isProgrammer, signOutUser } = useAuth();
  const { content, saveContent, saving } = useContent();
  const [localContent, setLocalContent] = useState(content);
  const [status, setStatus] = useState("");
  const [roleUserId, setRoleUserId] = useState("");
  const [roleValue, setRoleValue] = useState("admin");
  const [roleStatus, setRoleStatus] = useState("");

  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  const fields = useMemo(() => flattenContent(localContent), [localContent]);

  if (loading) {
    return (
      <main>
        <section className="section-how">
          <div className="container">
            <p>Učitavanje...</p>
          </div>
        </section>
      </main>
    );
  }

  if (!user) {
    return (
      <main>
        <section className="section-how">
          <div className="container">
            <h2 className="heading-secondary">Prijava</h2>
            <p>Za pristup uredjivanju potrebno je da se prijavite.</p>
            <Link className="btn btn--full" to="/login">
              Prijava
            </Link>
          </div>
        </section>
      </main>
    );
  }

  if (!canEdit) {
    return (
      <main>
        <section className="section-how">
          <div className="container">
            <p>Nemate dozvolu za uređivanje sadržaja.</p>
          </div>
        </section>
      </main>
    );
  }

  const handleFieldChange = (path, type, value) => {
    const nextValue = type === "stringArray" ? value.split("\n").filter(Boolean) : value;
    setLocalContent((prev) => setContentValue(prev, path, nextValue));
  };

  const handleSave = async () => {
    setStatus("");
    try {
      await saveContent(localContent);
      setStatus("Sadržaj je sačuvan.");
    } catch (error) {
      console.error(error);
      setStatus("Došlo je do greške pri snimanju.");
    }
  };

  const handleRoleSave = async (event) => {
    event.preventDefault();
    setRoleStatus("");

    if (!isFirebaseConfigured) {
      setRoleStatus("Firebase nije konfigurisan.");
      return;
    }

    if (!roleUserId.trim()) {
      setRoleStatus("UID je obavezan.");
      return;
    }

    try {
      const db = getFirestore(firebaseApp);
      await setDoc(doc(db, "roles", roleUserId.trim()), { role: roleValue });
      setRoleStatus("Uloga je sačuvana.");
      setRoleUserId("");
    } catch (error) {
      console.error(error);
      setRoleStatus("Greška pri snimanju uloge.");
    }
  };

  return (
    <main>
      <section className="section-how">
        <div className="container admin-panel">
          <h2 className="heading-secondary">Uređivanje sadržaja</h2>
          <button className="btn btn--outline admin-logout" onClick={signOutUser}>
            Odjava
          </button>
          {status && <p className="admin-status">{status}</p>}
          <div className="admin-fields">
            {fields.map((field) => {
              const label = field.path.join(".");
              const value =
                field.type === "stringArray" ? field.value.join("\n") : field.value;

              return (
                <label key={label} className="admin-label">
                  <span className="admin-label-text">{label}</span>
                  <textarea
                    className="admin-textarea"
                    rows={field.type === "stringArray" ? 4 : 5}
                    value={value}
                    onChange={(event) =>
                      handleFieldChange(field.path, field.type, event.target.value)
                    }
                  />
                </label>
              );
            })}
          </div>
          <button className="btn btn--full" onClick={handleSave} disabled={saving}>
            {saving ? "Snima se..." : "Sačuvaj izmjene"}
          </button>
        </div>
      </section>
      {isProgrammer && (
        <section className="section-how">
          <div className="container admin-panel">
            <h2 className="heading-secondary">Uloge korisnika</h2>
            <form className="admin-form" onSubmit={handleRoleSave}>
              <label className="admin-label">
                UID korisnika
                <input
                  className="admin-input"
                  type="text"
                  value={roleUserId}
                  onChange={(event) => setRoleUserId(event.target.value)}
                />
              </label>
              <label className="admin-label">
                Uloga
                <select
                  className="admin-input"
                  value={roleValue}
                  onChange={(event) => setRoleValue(event.target.value)}
                >
                  <option value="admin">admin</option>
                  <option value="programmer">programmer</option>
                </select>
              </label>
              {roleStatus && <p className="admin-status">{roleStatus}</p>}
              <button className="btn btn--full" type="submit">
                Sačuvaj ulogu
              </button>
            </form>
          </div>
        </section>
      )}
    </main>
  );
}
