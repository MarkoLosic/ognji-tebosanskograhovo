import React, { useState } from "react";
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useAuth } from "../context/AuthContext.jsx";
import { useContent } from "../context/ContentContext.jsx";
import { firebaseApp, isFirebaseConfigured } from "../lib/firebase.js";
import { useGallery } from "../hooks/useGallery.js";

export default function Gallery() {
  const { content } = useContent();
  const { canEdit } = useAuth();
  const { items, loading } = useGallery();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const fallbackItems = [
    { id: "gallery-1", imageUrl: "/img/gallery/gallery-1.jpg", title: "" },
    { id: "gallery-2", imageUrl: "/img/gallery/gallery-2.jpg", title: "" },
    { id: "gallery-3", imageUrl: "/img/gallery/gallery-3.jpg", title: "" },
    { id: "gallery-4", imageUrl: "/img/gallery/gallery-4.jpg", title: "" },
    { id: "gallery-5", imageUrl: "/img/gallery/gallery-5.jpg", title: "" },
    { id: "gallery-6", imageUrl: "/img/gallery/gallery-6.jpg", title: "" },
    { id: "gallery-7", imageUrl: "/img/gallery/gallery-7.jpg", title: "" },
    { id: "gallery-8", imageUrl: "/img/gallery/gallery-8.jpg", title: "" },
    { id: "gallery-9", imageUrl: "/img/gallery/gallery-9.jpg", title: "" },
    { id: "gallery-10", imageUrl: "/img/gallery/gallery-10.jpg", title: "" },
    { id: "gallery-11", imageUrl: "/img/gallery/gallery-11.jpg", title: "" },
    { id: "gallery-12", imageUrl: "/img/gallery/gallery-12.jpg", title: "" }
  ];

  const galleryItems = items.length > 0 ? items : fallbackItems;

  const handleUpload = async (event) => {
    event.preventDefault();
    setError("");

    if (!file) {
      setError("Odaberite sliku prije upload-a.");
      return;
    }

    if (!isFirebaseConfigured) {
      setError("Firebase nije konfigurisan.");
      return;
    }

    try {
      setUploading(true);
      const storage = getStorage(firebaseApp);
      const db = getFirestore(firebaseApp);
      const storageRef = ref(
        storage,
        `gallery/${Date.now()}-${file.name.replace(/\s+/g, "-")}`
      );
      await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(storageRef);

      await addDoc(collection(db, "gallery"), {
        title: title.trim() || "",
        imageUrl: downloadUrl,
        createdAt: serverTimestamp()
      });

      setTitle("");
      setFile(null);
    } catch (uploadError) {
      setError("Došlo je do greške pri upload-u.");
      console.error(uploadError);
    } finally {
      setUploading(false);
    }
  };

  return (
    <main>
      <section className="section-how">
        <div className="container">
          <span className="subheading">{content.gallery.subheading}</span>
          <h2 className="heading-secondary">{content.gallery.heading}</h2>
        </div>

        {!isFirebaseConfigured && (
          <div className="container">
            <p>Firebase nije konfigurisan. Galerija je dostupna nakon podešavanja.</p>
          </div>
        )}

        {canEdit && isFirebaseConfigured && (
          <div className="container admin-panel">
            <h3 className="heading-tertiary">Dodaj novu sliku</h3>
            <form className="admin-form" onSubmit={handleUpload}>
              <label className="admin-label">
                Naslov (opcionalno)
                <input
                  className="admin-input"
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </label>
              <label className="admin-label">
                Izaberi sliku
                <input
                  className="admin-input"
                  type="file"
                  accept="image/*"
                  onChange={(event) => setFile(event.target.files[0])}
                />
              </label>
              {error && <p className="admin-error">{error}</p>}
              <button className="btn btn--full" disabled={uploading}>
                {uploading ? "Upload u toku..." : "Dodaj sliku"}
              </button>
            </form>
          </div>
        )}

        <div className="container gallery-grid">
          {loading && <p>Učitavanje galerije...</p>}
          {!loading && galleryItems.length === 0 && (
            <p>Galerija je trenutno prazna.</p>
          )}
          {galleryItems.map((item) => (
            <figure key={item.id} className="gallery-card">
              <img src={item.imageUrl} alt={item.title || "Galerija"} />
              {item.title && <figcaption>{item.title}</figcaption>}
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}
