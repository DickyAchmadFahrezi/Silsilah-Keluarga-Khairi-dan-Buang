# 🌳 Silsilah Keluarga Hairi & Buang (Interactive Family Tree)

Aplikasi web modern berbasis **React**, **Vite**, **Tailwind CSS**, dan **React Flow (@xyflow/react)** untuk memvisualisasikan silsilah pohon keluarga dengan relasi kakak-beradik (leluhur) serta pernikahan silang sepupu (*cousin marriage*).

---

## ✨ Fitur Utama

1. **Relasi Kakak-Beradik (Generasi 1)**:
   - Menghubungkan **Hairi** dan **Buang** secara horizontal sebagai saudara kandung (*roots*).
2. **Pernikahan Silang Sepupu (*Cousin Marriage*)**:
   - Mendeteksi pernikahan antara **Hanifa** (putri Hairi) dan **Madji** (putra Buang).
   - Garis relasi kustom bercahaya merah muda (*rose/pink*) dengan label khusus `💍 Pernikahan Sepupu`.
3. **Pembedaan Warna & Tipe Anggota**:
   - 👑 **Leluhur (Kakak-Beradik)**: Hairi & Buang (*Gold/Amber Glow*).
   - 🌿 **Garis Keturunan Langsung**: Abdul Ghani, Hanifa, Madji, Margani (*Emerald & Sky Blue*).
   - 💍 **Pasangan / Menantu**: Asuro (*Rose/Pink*).
4. **Interaksi & Navigasi**:
   - **Sorot Pernikahan Sepupu**: Animasi jalur silsilah dari Hairi & Buang hingga ke pernikahan Hanifa & Madji dengan efek selebrasi konfeti.
   - **Pencarian Real-Time**: Ketik nama anggota keluarga untuk memfokuskan node.
   - **Filter Cabang**: Filter berdasarkan Semua, Cabang Hairi, Cabang Buang, atau Pasangan.
   - **Modal Detail Anggota**: Klik kotak nama untuk melihat orang tua, pasangan, saudara, dan catatan biografi.
   - **Ekspor Gambar (PNG)**: Mengunduh pohon keluarga dalam resolusi tinggi.
   - **Data JSON Viewer**: Menampilkan data mentah `src/data.js` dengan tombol salin.

---

## 📁 Struktur Direktori

```
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── FamilyTree.jsx         # Komponen kanvas utama React Flow
│   │   ├── Header.jsx             # Bilah navigasi, pencarian, dan tombol aksi
│   │   ├── JsonDataModal.jsx      # Modal inspeksi data JSON
│   │   ├── Legend.jsx             # Panduan legenda warna dan relasi
│   │   ├── LineageEdge.jsx        # Garis relasi Orang Tua -> Anak
│   │   ├── MarriageEdge.jsx       # Garis pernikahan (termasuk sepupu)
│   │   ├── PersonDetailModal.jsx  # Modal detail profil anggota keluarga
│   │   ├── PersonNode.jsx         # Desain kartu nama node modern
│   │   └── SiblingEdge.jsx         # Garis relasi saudara kandung Hairi & Buang
│   ├── utils/
│   │   └── layout.js              # Algoritma layout & kalkulasi koordinat
│   ├── App.jsx
│   ├── data.js                    # Sumber data silsilah (Array of Objects)
│   ├── index.css                  # Konfigurasi Tailwind CSS v4 & theme
│   └── main.jsx
├── index.html
├── package.json
├── vercel.json                    # Konfigurasi deploy Vercel SPA
└── vite.config.js
```

---

## 🚀 Menjalankan Secara Lokal

Pastikan Anda telah menginstal **Node.js** (v18+).

```bash
# 1. Masuk ke direktori proyek (jika belum)
cd "silsilah keluarga hairi & buang"

# 2. Instal dependensi
npm install

# 3. Jalankan server pengembangan
npm run dev
```

Buka peramban di `http://localhost:5173`.

---

## 🌐 Deploy ke Vercel

Aplikasi ini sudah dipersiapkan untuk deploy tanpa konfigurasi tambahan:

1. **Melalui Vercel CLI**:
   ```bash
   npm install -g vercel
   vercel
   ```
2. **Melalui GitHub / Dashboard Vercel**:
   - *Push* kode ke repositori GitHub/GitLab.
   - *Import* repositori di dashboard Vercel.
   - *Build command*: `npm run build`
   - *Output directory*: `dist`
   - Selesai! Berkas `vercel.json` sudah disediakan untuk memastikan routing SPA bekerja mulus.

---

## 📝 Mengubah atau Menambah Data Silsilah

Buka berkas `src/data.js` untuk menambah anggota keluarga baru:

```javascript
export const familyData = [
  { id: 'hairi', name: 'Hairi', root: true },
  { id: 'buang', name: 'Buang', root: true },
  { id: 'abdul_ghani', name: 'Abdul Ghani', parents: ['hairi'], spouses: ['asuro'] },
  { id: 'asuro', name: 'Asuro', parents: [], spouses: ['abdul_ghani'] },
  { id: 'hanifa', name: 'Hanifa', parents: ['hairi'], spouses: ['madji'] },
  { id: 'margani', name: 'Margani', parents: ['buang'], spouses: [] },
  { id: 'madji', name: 'Madji', parents: ['buang'], spouses: ['hanifa'] }
];
```
Sistem secara otomatis mendeteksi:
- `root: true` sebagai generasi leluhur.
- `parents` untuk garis keturunan.
- `spouses` untuk hubungan pernikahan.
- Relasi silang jika kedua pasangan memiliki orang tua yang bersaudara kandung.
