# Ognjiste Bosansko Grahovo (React + Firebase)

Ovaj projekat je prepakovan u React sa Firebase backendom (Auth + Firestore + Storage).

## Lokalni start

1) Instalacija
```
npm install
```

2) Firebase konfiguracija
- Napravi Firebase projekat (besplatni Spark plan je dovoljan).
- Uključi Authentication -> Email/Password.
- Uključi Firestore Database.
- Uključi Storage.

3) Postavi `.env`
```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

4) Kreiraj korisnike (3 ukupno)
- U Firebase Auth kreiraj:
  - 1x programer (moze sve)
  - 2x admin (tekst + slike)

5) Dodijeli uloge u Firestore
- Kolekcija `roles` sa dokumentima `roles/{uid}`:
```
{
  "role": "programmer"
}
```
ili
```
{
  "role": "admin"
}
```
- Programer moze postaviti uloge kroz `/admin` (sekcija "Uloge korisnika").

6) Pokreni projekat
```
npm run dev
```

## Sadrzaj
- Tekstovi se cuvaju u Firestore dokumentu `content/main`.
- Galerija koristi kolekciju `gallery` + Storage za slike.
- Ako Firestore nema `content/main`, aplikacija koristi lokalni default i moze se snimiti iz admin panela.

## Pravila (opciono)
- `firestore.rules` i `storage.rules` su spremni za copy/paste u Firebase konzolu.
