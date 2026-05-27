<h1 align="center">
  Wariku — Sistem Pembelajaran Adaptif Berbasis Wariga
</h1>

<p align="center">
  Platform pembelajaran adaptif yang mengintegrasikan kearifan budaya Bali (Wariga) dengan teknologi personalisasi konten berbasis performa dan kondisi emosional siswa.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-13.x-FF2D20?style=flat-square&logo=laravel" alt="Laravel">
  <img src="https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Inertia.js-3.x-9553E9?style=flat-square" alt="Inertia.js">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=flat-square&logo=tailwind-css" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/PHP-8.3-777BB4?style=flat-square&logo=php" alt="PHP">
</p>

---

## Daftar Isi

- [Tentang Wariku](#tentang-wariku)
- [Fitur Utama](#fitur-utama)
- [Tech Stack](#tech-stack)
- [Prasyarat](#prasyarat)
- [Cara Instalasi](#cara-instalasi)
- [Konfigurasi Environment](#konfigurasi-environment)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [Struktur Project](#struktur-project)
- [Arsitektur Sistem Rekomendasi](#arsitektur-sistem-rekomendasi)
- [Peran Pengguna](#peran-pengguna)
- [Menjalankan Test](#menjalankan-test)
- [Lisensi](#lisensi)

---

## Tentang Wariku

**Wariku** (Wariga Learning System) adalah platform pembelajaran adaptif untuk mata pelajaran Matematika tingkat SMP yang dirancang untuk mempersonalisasi pengalaman belajar siswa. Sistem ini unik karena menggabungkan:

- **Kalender Balinese (Wariga)** — menggunakan perhitungan *Catur Bekel Kahuripan* berdasarkan tanggal lahir siswa dan hari ini untuk menentukan kondisi energi belajar.
- **Pelacakan Emosi (Mood Tracking)** — siswa mencatat suasana hati sebelum belajar, yang digunakan bersama data Wariga untuk menentukan rekomendasi konten.
- **Konten Multi-Varian** — setiap materi tersedia dalam 6 varian: 2 gaya belajar (Teks & Ilustrasi) × 3 tingkat kesulitan (Mudah, Sedang, Sulit).
- **Engine Rekomendasi Dua-Tahap** — rekomendasi dipicu saat pertama login dan setelah mengerjakan latihan soal.

### Materi yang Tersedia

| Topik | Sub-materi |
|---|---|
| Aljabar | Aljabar Dasar, Persamaan Linear, Pertidaksamaan Linear, Fungsi Linear, SPLDV, Relasi & Fungsi |
| Geometri | Geometri Bangun Datar, Segitiga & Segiempat, Teorema Pythagoras |
| Statistika | Statistika Dasar |

---

## Fitur Utama

### Untuk Siswa
- **Onboarding Terstruktur** — setup profil belajar: tanggal lahir, jenis kelamin, pencatatan suasana hati awal, dan integrasi kalender Wariga.
- **Dashboard Personalisasi** — menampilkan materi rekomendasi, progres belajar terkini, dan panduan tema hari berdasarkan Wariga.
- **Modul Pelajaran** — belajar materi per bab dengan tampilan teks kaya (CKEditor + KaTeX untuk rumus matematika) atau berbasis ilustrasi.
- **Latihan Adaptif** — mengerjakan soal pilihan ganda dengan penyesuaian tingkat kesulitan dan gaya soal berdasarkan performa sebelumnya.
- **Hasil & Rekomendasi** — setelah latihan, siswa mendapat ringkasan performa dan rekomendasi materi berikutnya.
- **Laporan Belajar** — riwayat lengkap semua percobaan latihan, progres per materi, dan data suasana hati.

### Untuk Guru
- **Dashboard Analitik** — visualisasi tren suasana hati siswa, distribusi kondisi Wariga (*Catur Bekel*), dan ringkasan performa kelas.
- **Analisis Per Siswa** — detail performa setiap siswa lintas semua materi.
- **Analisis Per Materi** — melihat materi mana yang paling sulit dikuasai siswa.
- **Ekspor Data** — filter dan ekspor data analitik berdasarkan rentang tanggal.

### Akses Publik
- **Halaman Beranda** — pengenalan fitur dan keunggulan sistem Wariku.
- **Katalog Materi** — daftar materi yang tersedia sebelum login.
- **Halaman Tentang** — informasi detail tentang aplikasi.

---

## Tech Stack

| Layer | Teknologi | Versi |
|---|---|---|
| Backend Framework | Laravel | ^13.0 |
| Language (Backend) | PHP | ^8.3 |
| Frontend Framework | React | ^19.0 |
| SPA Bridge | Inertia.js | ^3.0 |
| Styling | Tailwind CSS | ^4.0 |
| Build Tool | Vite | ^8.0 |
| Database | MySQL | 8.x |
| Rich Text Editor | CKEditor 5 | ^48.0 |
| Math Rendering | KaTeX | ^0.16 |
| Kalender Bali | balinese-date-js-lib | ^0.4.3 |
| HTTP Client | Axios | ^1.16 |
| Testing | PHPUnit | (built-in Laravel) |

---

## Prasyarat

Pastikan environment lokal Anda memiliki:

- **PHP** `>= 8.3` dengan ekstensi: `pdo_mysql`, `mbstring`, `openssl`, `tokenizer`, `xml`, `ctype`, `json`, `bcmath`
- **Composer** `>= 2.x`
- **Node.js** `>= 20.x`
- **npm** `>= 10.x`
- **MySQL** `>= 8.0`
- **Git**

---

## Cara Instalasi

### 1. Clone Repository

```bash
git clone <url-repository> wariku
cd wariku
```

### 2. Install Dependensi PHP

```bash
composer install
```

### 3. Install Dependensi Node.js

```bash
npm install
```

### 4. Konfigurasi Environment

Salin file `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

Generate application key:

```bash
php artisan key:generate
```

### 5. Konfigurasi Database

Edit file `.env` dan sesuaikan konfigurasi database:

```env
APP_NAME=Wariku

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=wariku
DB_USERNAME=root
DB_PASSWORD=your_password
```

Buat database baru di MySQL:

```sql
CREATE DATABASE wariku CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 6. Migrasi Database

Jalankan migrasi untuk membuat semua tabel:

```bash
php artisan migrate
```

### 7. Isi Data Awal (Seeder)

Jalankan seeder untuk mengisi data materi, soal, dan aturan rekomendasi:

```bash
php artisan db:seed
```

> **Catatan:** Seeder akan mengisi data soal untuk semua topik matematika yang tersedia. Untuk role dan aturan rekomendasi, pastikan uncomment baris yang diperlukan di `DatabaseSeeder.php` sesuai kebutuhan.

#### Setup Role Pengguna

Jalankan perintah berikut via `php artisan tinker` untuk membuat role yang diperlukan:

```php
App\Models\Role::create(['role_name' => 'teacher']);
App\Models\Role::create(['role_name' => 'student']);
```

#### Setup Aturan Rekomendasi

Uncomment baris di `database/seeders/DatabaseSeeder.php` untuk mengisi aturan rekomendasi:

```php
$this->call([
    RecommendationRuleSeeder::class,          // Aturan login pertama
    RecommendationRulePostQuizSeeder::class,  // Aturan post-kuis
    // ...
]);
```

Kemudian jalankan:

```bash
php artisan db:seed --class=RecommendationRuleSeeder
php artisan db:seed --class=RecommendationRulePostQuizSeeder
```

---

## Konfigurasi Environment

Berikut penjelasan variabel environment penting:

```env
# Identitas Aplikasi
APP_NAME=Wariku
APP_ENV=local          # local | production
APP_DEBUG=true         # false saat production
APP_URL=http://localhost

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=wariku
DB_USERNAME=root
DB_PASSWORD=

# Session (gunakan database untuk persistent session)
SESSION_DRIVER=database
SESSION_LIFETIME=120

# Cache & Queue
CACHE_STORE=database
QUEUE_CONNECTION=database
```

---

## Menjalankan Aplikasi

### Mode Development

Jalankan dua terminal secara bersamaan:

**Terminal 1 — Laravel Development Server:**
```bash
php artisan serve
```

**Terminal 2 — Vite (Frontend Asset Bundler):**
```bash
npm run dev
```

Aplikasi dapat diakses di: `http://localhost:8000`

### Mode Production Build

Untuk membangun asset frontend untuk production:

```bash
npm run build
```

Kemudian pastikan konfigurasi web server (Nginx/Apache) mengarah ke folder `public/`.

### Optimasi Cache (Production)

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

---

## Struktur Project

```
wariku/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php          # Login & registrasi
│   │   │   ├── DashboardController.php     # Dashboard siswa & guru
│   │   │   ├── LessonController.php        # Modul pelajaran
│   │   │   ├── QuizController.php          # Latihan soal & scoring
│   │   │   ├── MaterialController.php      # Katalog materi
│   │   │   ├── OnBoardingController.php    # Alur onboarding siswa
│   │   │   └── ProfileController.php       # Manajemen profil
│   │   └── Middleware/
│   │       ├── EnsureStudent.php           # Guard route siswa
│   │       └── EnsureTeacher.php           # Guard route guru
│   ├── Models/                             # 15 Eloquent models
│   └── Services/
│       ├── WarigaService.php               # Perhitungan kalender Bali
│       └── ThemeDayService.php             # Resolusi tema hari
│
├── database/
│   ├── migrations/                         # 17 file migrasi
│   └── seeders/                            # Seeder materi & soal
│
├── resources/
│   └── js/
│       ├── Pages/                          # 17 halaman React
│       │   ├── Auth/                       # Halaman terautentikasi
│       │   └── Guest/                      # Halaman publik
│       └── components/                     # 40+ komponen React
│
└── routes/
    └── web.php                             # Definisi semua route
```

---

## Arsitektur Sistem Rekomendasi

Wariku menggunakan **engine rekomendasi berbasis aturan dua-tahap**:

### Tahap 1 — Rekomendasi Pertama Login

Dipicu saat siswa menyelesaikan onboarding.

**Input:**
- `mood_value` — tingkat suasana hati siswa (1-3)
- `catur_bekel` — kondisi energi Wariga: `guru` / `ratu` / `lara` / `pati`

**Output:**
- `learning_type` — gaya belajar awal: `text` atau `illustration`
- `difficulty_material` — tingkat kesulitan awal materi
- `theme_day_offset` — rekomendasi tema hari belajar

**Perhitungan Catur Bekel Kahuripan:**
```
catur_bekel = (urip_lahir + urip_hari_ini) mod 4
```
Keterangan: `urip` didapat dari pancaWara dan saptaWara dalam kalender Bali.

### Tahap 2 — Rekomendasi Post-Kuis

Dipicu setelah siswa menyelesaikan latihan soal.

**Input:**
- `score_performance` — performa berbobot: `0.7 × akurasi + 0.3 × efisiensi_waktu`
- `mood_value` — suasana hati saat latihan
- `catur_bekel` — kondisi Wariga hari itu

**Klaster Performa:**
| Klaster | Rentang | Keterangan |
|---|---|---|
| A | 0% – 60% | Belum memahami |
| B | 60% – 80% | Cukup memahami |
| C | 80% – 100% | Sangat memahami |

**Output:**
- `learning_type` — gaya belajar materi berikutnya
- `difficulty_material` — tingkat kesulitan materi berikutnya
- `quiz_difficulty` — tingkat kesulitan soal berikutnya (bisa `mix`)

---

## Peran Pengguna

### Siswa (`role_name: student`)
- Melakukan onboarding saat pertama kali login
- Mengakses dashboard, pelajaran, latihan, dan laporan
- Mendapat rekomendasi konten yang dipersonalisasi

### Guru (`role_name: teacher`)
- Mengakses dashboard analitik kelas
- Melihat data performa dan kondisi Wariga siswa secara agregat
- Mengekspor data analitik

### Registrasi

Pengguna dapat mendaftar secara mandiri melalui halaman `/register`. Role default saat registrasi adalah **student**. Untuk membuat akun guru, set `role_id` secara manual di database atau via Tinker:

```php
$user = App\Models\User::find($id);
$user->role_id = 1; // 1 = teacher, 2 = student
$user->save();
```

---

## Menjalankan Test

Wariku memiliki unit test untuk logika aturan rekomendasi:

```bash
# Jalankan semua test
php artisan test

# Jalankan test spesifik
php artisan test --filter=FirstInferenceTest
php artisan test --filter=PostQuizInferenceTest
```

Test mencakup:
- Validasi aturan inferensi login pertama
- Validasi aturan inferensi post-kuis
- Perhitungan klaster performa

---

## Lisensi

Project ini dikembangkan sebagai Tugas Akhir. Seluruh hak cipta dilindungi oleh pemilik project.

---

<p align="center">
  Dibuat dengan penuh semangat untuk Tugas Akhir — menggabungkan kearifan lokal Bali dengan teknologi pembelajaran modern.
</p>
