# CLAUDE.md — Semesta Pro

@AGENTS.md

Seluruh instruksi proyek ada di `AGENTS.md` (diimpor di atas) agar Claude Code dan agen lain membaca sumber yang sama. Berkas ini hanya berisi tambahan khusus Claude Code.

## Tambahan untuk Claude Code

- Sebelum tugas yang menyentuh lebih dari satu lapisan (mis. skema + form + tampilan), baca dokumen terkait dengan import berikut sesuai kebutuhan, jangan sekaligus semuanya:
  - Fitur/kebutuhan: `docs/PRD.md`
  - Kode & konvensi: `docs/ARCHITECTURE.md`
  - Data: `docs/SCHEMA.md`
  - Tampilan: `docs/DESIGN.md`
- Untuk tugas multi-langkah, buat daftar tugas dan tandai ID PRD di setiap item.
- Jalankan `make lint && make test` sebelum melaporkan selesai; laporkan hasilnya apa adanya, termasuk tes yang gagal.
- Untuk perubahan tampilan, jalankan server (`make dev`) dan periksa halaman di lebar 390 px dan 1440 px bila alat browser tersedia.
- Jangan mengedit migrasi yang sudah ada; buat migrasi baru.
- Jangan menjalankan `./artisan migrate:fresh` atau menghapus `storage/database/*.db` tanpa izin eksplisit.
- Gunakan bahasa Indonesia saat berkomunikasi dengan pengguna di repositori ini; kode dan commit tetap bahasa Inggris.
