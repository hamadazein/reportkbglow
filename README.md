# KB-Glow — laporan aktivitas anonim

Laporan interaktif 11 slide menggunakan **engine asli stackblitz/bolt-slides**, dengan `src/deck/` dan `src/styles/base.css` dipertahankan byte-identik. Konten baru, bukan reskin slide contoh.

## Data dan privasi

26 baris agregat anonim, Juni–Agustus 2026: **216 input, 22 perlu tinjau, 38 kuning, 39 merah, 1 valid**. Bulanan 3/50/163; jenis Anak 147, Hb 36, Ibu 33. Input bukan pasien unik. Flag dan kategori risiko dapat beririsan; jangan menjumlahkan sebagai jumlah pasien unik.

Subset publik hanya berisi `month`, `anonymous_code`, `role`, `jenis`, `total`, `perlu_tinjau`, `kuning`, `merah`, `valid`. Nama dan actor ID tidak disertakan; tidak ada data pasien, kredensial, raw JSON asli atau mapping identitas. Kode Petugas stabil dalam rilis ini. `account-test` adalah klasifikasi heuristik berdasarkan label akun sumber, bukan jaminan bahwa akun lain adalah produksi. Peran tetap dipertahankan dan ADMIN bisa difilter tersendiri.

Ekstraksi lokal sumber: `2026-10-01T17:42:28.201238` tanpa zona timestamp eksplisit; bulan mengikuti created_at WITA. Non-deleted Anak, pengukuran Ibu, skrining Hb. Valid Ibu berdasarkan validated_at; Anak/Hb berdasarkan validation_status. Snapshot statis, tidak terhubung ke sistem atau database live.

Palet dark emerald mengikuti arahan palet laporan terdahulu, **bukan klaim identitas resmi merek**. Inter dan JetBrains Mono berasal dari CSS bawaan engine. Risiko memakai token semantik kuning/merah.

## Menjalankan

```sh
npm ci
npm run typecheck
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
# terminal terpisah
npx playwright install chromium
npm test
```

Filter bulan, peran, serta akun uji tersinkron pada seluruh grafik. Navigasi panah/dock, S thumbnail, G grid, P presenter, A anotasi, F fullscreen, H sembunyikan UI dari engine asli. Ada click-build interpretasi dan rekomendasi.

## Status teruji

- TypeScript `tsc --noEmit`: PASS.
- Build Vite 6.4.3: PASS. Dependency toolchain diperbarui dengan patch aman; engine tidak diubah.
- `npm audit` seluruh dependency dan `npm audit --omit=dev`: 0 vulnerability setelah safe audit fix.
- Playwright Chromium aktual: PASS pada **390×844** dan **1280×800**; 11 slide dibuka via hash, blok konten tidak keluar viewport atau area dock; tidak ada console/page error, tanpa suppress error.
- Agregat total/bulan/jenis dan schema whitelist: PASS.
- Filter ADMIN 82; KADER 134; KADER tanpa akun uji 102; Juni KADER 3; kombinasi kosong 0: PASS.
- Panah maju/mundur, click-build, grid dan thumbnail: diuji. Presenter, anotasi dan fullscreen dipertahankan tetapi belum diuji otomatis dalam rilis awal.
- Privacy scan tracked files dan byte comparison engine/base.css: PASS.
- Hasil mesin: `TEST-RESULTS.json`. Belum ada screenshot/visual review pixel-level; geometry dan interaksi diperiksa di browser nyata.

## Deployment

Vite base `/reportkbglow/`; workflow `.github/workflows/pages.yml` melakukan typecheck/build dan upload/deploy GitHub Pages. Pages diaktifkan dengan `build_type=workflow` dan dibaca ulang melalui API. Verifikasi URL publik dilakukan sesudah push; keberhasilan lokal tidak dianggap bukti live.

Usulan perbaikan sistem di slide terakhir **belum diimplementasikan** pada KB-Glow. Tidak ada VPS, .env, source KB-Glow atau database yang disentuh.
