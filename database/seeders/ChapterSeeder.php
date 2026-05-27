<?php

namespace Database\Seeders;

use App\Models\Chapter;
use App\Models\Material;
use Illuminate\Database\Seeder;

class ChapterSeeder extends Seeder
{
    public function run(): void
    {
        foreach (Material::with('variantMaterials')->get() as $material) {
            foreach ($material->variantMaterials as $variant) {
                $chapters = $this->chapters($material->title, $variant->difficulty_level, $variant->learning_type);
                foreach ($chapters as $i => $data) {
                    Chapter::create([
                        'material_has_variant_id' => $variant->id,
                        'title'        => $data['title'],
                        'content'      => $data['content'],
                        'order_number' => $i + 1,
                    ]);
                }
            }
        }
    }

    private function chapters(string $title, string $difficulty, string $type): array
    {
        $visual = $type === 'illustration';
        $key    = "{$title}|{$difficulty}";

        return match ($key) {
            'Aljabar Dasar|easy'   => $this->algebraEasy($visual),
            'Aljabar Dasar|medium' => $this->algebraMedium($visual),
            'Aljabar Dasar|hard'   => $this->algebraHard($visual),
            'Geometri Bangun Datar|easy'   => $this->geometriEasy($visual),
            'Geometri Bangun Datar|medium' => $this->geometriMedium($visual),
            'Geometri Bangun Datar|hard'   => $this->geometriHard($visual),
            'Statistika Dasar|easy'   => $this->statistikaEasy($visual),
            'Statistika Dasar|medium' => $this->statistikaMedium($visual),
            'Statistika Dasar|hard'   => $this->statistikaHard($visual),
            default => [],
        };
    }

    // ── Aljabar Dasar ──────────────────────────────────────────────────────────

    private function algebraEasy(bool $visual): array
    {
        $intro = $visual ? "Perhatikan ilustrasi di bawah ini untuk memahami konsep yang akan dipelajari.\n\n" : "";
        return [
            [
                'title'   => 'Pengenalan Variabel dan Konstanta',
                'content' => $intro .
                    "Dalam aljabar, variabel adalah simbol (biasanya huruf seperti x, y, atau z) yang mewakili nilai yang belum diketahui atau bisa berubah. Misalnya, jika kita menuliskan x + 3 = 7, maka x adalah variabel yang nilainya perlu kita cari.\n\n" .
                    "Berbeda dengan variabel, konstanta adalah nilai tetap yang tidak berubah. Angka seperti 2, 5, atau 10 adalah contoh konstanta. Dalam ekspresi 3x + 5, angka 3 disebut koefisien (bilangan yang mengalikan variabel) dan 5 adalah konstanta.\n\n" .
                    "Memahami perbedaan variabel, koefisien, dan konstanta adalah fondasi penting dalam mempelajari aljabar. Dengan konsep ini, kita bisa menuliskan dan memahami berbagai ekspresi matematika secara sistematis.",
            ],
            [
                'title'   => 'Operasi Penjumlahan dan Pengurangan Aljabar',
                'content' => $intro .
                    "Suku-suku yang memiliki variabel dan pangkat yang sama disebut suku sejenis. Kita hanya bisa menjumlahkan atau mengurangkan suku sejenis. Contohnya, 3x + 5x = 8x karena keduanya memiliki variabel x.\n\n" .
                    "Sebaliknya, 3x + 5y tidak bisa disederhanakan lebih lanjut karena x dan y adalah variabel yang berbeda (suku tidak sejenis). Contoh penjumlahan: (2x + 3) + (4x + 1) = 6x + 4.\n\n" .
                    "Pengurangan bekerja dengan cara yang sama. Contoh: (5x + 7) − (2x + 3) = 3x + 4. Kunci utamanya adalah mengelompokkan suku sejenis sebelum menghitung hasilnya.",
            ],
            [
                'title'   => 'Substitusi Nilai ke dalam Ekspresi',
                'content' => $intro .
                    "Substitusi berarti mengganti variabel dengan nilai tertentu untuk menghitung hasil ekspresi. Misalnya, jika x = 4, maka nilai dari 2x + 3 adalah 2(4) + 3 = 8 + 3 = 11.\n\n" .
                    "Teknik ini sangat berguna untuk memeriksa apakah suatu nilai memenuhi persamaan. Contoh: apakah x = 5 memenuhi persamaan 3x − 2 = 13? Kita substitusi: 3(5) − 2 = 15 − 2 = 13. Ya, terbukti benar.\n\n" .
                    "Latihan substitusi secara rutin akan membantu kamu membangun intuisi matematika yang kuat. Selalu perhatikan urutan operasi: kalikan/bagi dulu sebelum tambah/kurang.",
            ],
        ];
    }

    private function algebraMedium(bool $visual): array
    {
        $intro = $visual ? "Perhatikan ilustrasi di bawah ini untuk memahami konsep yang akan dipelajari.\n\n" : "";
        return [
            [
                'title'   => 'Persamaan Linear Satu Variabel',
                'content' => $intro .
                    "Persamaan linear satu variabel adalah persamaan yang hanya mengandung satu variabel dengan pangkat tertinggi 1. Bentuk umum: ax + b = c, di mana a ≠ 0. Tujuan kita adalah mencari nilai x yang memenuhi persamaan tersebut.\n\n" .
                    "Cara menyelesaikannya: isolasi variabel di satu sisi dengan melakukan operasi yang sama di kedua sisi. Contoh: 2x + 5 = 13 → 2x = 13 − 5 → 2x = 8 → x = 4.\n\n" .
                    "Selalu verifikasi jawaban dengan substitusi kembali ke persamaan awal. Untuk x = 4: 2(4) + 5 = 8 + 5 = 13. Terbukti benar. Langkah verifikasi ini penting untuk menghindari kesalahan hitung.",
            ],
            [
                'title'   => 'Pertidaksamaan Linear',
                'content' => $intro .
                    "Pertidaksamaan linear mirip dengan persamaan, tetapi menggunakan tanda <, >, ≤, atau ≥. Misalnya, 2x + 3 > 7 artinya kita mencari semua nilai x yang membuat ruas kiri lebih besar dari ruas kanan.\n\n" .
                    "Cara menyelesaikan sama seperti persamaan, dengan satu aturan tambahan: jika kedua sisi dibagi atau dikali bilangan negatif, tanda pertidaksamaan harus dibalik. Contoh: −2x < 6 → x > −3.\n\n" .
                    "Solusi pertidaksamaan bukan satu nilai tunggal, melainkan himpunan nilai. Kita bisa menggambarkannya di garis bilangan, di mana lingkaran terbuka (○) menunjukkan nilai tidak termasuk dan lingkaran tertutup (●) menunjukkan nilai termasuk.",
            ],
            [
                'title'   => 'Sistem Persamaan Linear Dua Variabel',
                'content' => $intro .
                    "Sistem persamaan linear dua variabel (SPLDV) terdiri dari dua persamaan dengan dua variabel (biasanya x dan y). Solusinya adalah pasangan nilai (x, y) yang memenuhi kedua persamaan sekaligus.\n\n" .
                    "Ada tiga metode utama: (1) Substitusi — nyatakan satu variabel dalam variabel lain, lalu substitusikan. (2) Eliminasi — kurangi atau tambahkan kedua persamaan untuk menghilangkan satu variabel. (3) Grafik — cari titik perpotongan dua garis.\n\n" .
                    "Contoh metode eliminasi: x + y = 10 dan x − y = 2. Jumlahkan keduanya: 2x = 12, maka x = 6. Substitusi ke persamaan pertama: 6 + y = 10, maka y = 4. Solusi: (6, 4).",
            ],
        ];
    }

    private function algebraHard(bool $visual): array
    {
        $intro = $visual ? "Perhatikan ilustrasi di bawah ini untuk memahami konsep yang akan dipelajari.\n\n" : "";
        return [
            [
                'title'   => 'Persamaan Kuadrat',
                'content' => $intro .
                    "Persamaan kuadrat berbentuk ax² + bx + c = 0, di mana a ≠ 0. Solusinya disebut akar-akar persamaan. Ada tiga metode penyelesaian utama: pemfaktoran, melengkapkan kuadrat, dan rumus kuadratik (rumus ABC).\n\n" .
                    "Rumus kuadratik: x = (−b ± √(b²−4ac)) / 2a. Nilai b²−4ac disebut diskriminan (D). Jika D > 0: dua akar real berbeda. Jika D = 0: dua akar real sama. Jika D < 0: tidak ada akar real.\n\n" .
                    "Contoh pemfaktoran: x² − 5x + 6 = 0 → (x − 2)(x − 3) = 0 → x = 2 atau x = 3. Pemfaktoran adalah metode tercepat ketika bilangan mudah difaktorkan. Untuk kasus lain, gunakan rumus ABC.",
            ],
            [
                'title'   => 'Fungsi dan Grafiknya',
                'content' => $intro .
                    "Fungsi adalah aturan yang memetakan setiap input (domain) ke tepat satu output (kodomain). Notasi fungsi: f(x) = ekspresi. Contoh: f(x) = 2x + 1 artinya setiap nilai x dipetakan ke 2x + 1.\n\n" .
                    "Fungsi linear f(x) = mx + b menghasilkan grafik berupa garis lurus dengan kemiringan m dan perpotongan sumbu y di b. Fungsi kuadrat f(x) = ax² + bx + c menghasilkan grafik berbentuk parabola.\n\n" .
                    "Untuk menggambar grafik, buat tabel nilai x dan f(x), plot titik-titiknya, lalu hubungkan. Titik puncak parabola berada di x = −b/(2a). Memahami bentuk grafik membantu kita menganalisis perilaku fungsi secara visual.",
            ],
        ];
    }

    // ── Geometri Bangun Datar ──────────────────────────────────────────────────

    private function geometriEasy(bool $visual): array
    {
        $intro = $visual ? "Perhatikan ilustrasi di bawah ini untuk memahami konsep yang akan dipelajari.\n\n" : "";
        return [
            [
                'title'   => 'Pengenalan Bangun Datar',
                'content' => $intro .
                    "Bangun datar adalah bentuk geometri dua dimensi yang dibatasi oleh garis-garis lurus atau lengkung. Contoh bangun datar antara lain: segitiga, persegi, persegi panjang, lingkaran, jajargenjang, trapesium, dan belah ketupat.\n\n" .
                    "Setiap bangun datar memiliki sifat-sifat khusus. Persegi memiliki 4 sisi sama panjang dan 4 sudut siku-siku. Segitiga memiliki 3 sisi dan jumlah ketiga sudutnya selalu 180°.\n\n" .
                    "Dalam geometri, kita mempelajari dua ukuran penting: keliling (jumlah panjang semua sisi) dan luas (ukuran daerah yang dibatasi bangun tersebut). Memahami sifat tiap bangun adalah kunci untuk menghitung kedua ukuran ini dengan benar.",
            ],
            [
                'title'   => 'Keliling dan Luas Persegi dan Persegi Panjang',
                'content' => $intro .
                    "Persegi memiliki 4 sisi sama panjang (s). Keliling persegi = 4s, dan Luas = s². Misalnya, persegi dengan sisi 5 cm memiliki keliling 20 cm dan luas 25 cm².\n\n" .
                    "Persegi panjang memiliki 2 pasang sisi sejajar: panjang (p) dan lebar (l). Keliling = 2(p + l) dan Luas = p × l. Contoh: persegi panjang 8 cm × 3 cm memiliki keliling 22 cm dan luas 24 cm².\n\n" .
                    "Ingat perbedaan satuan: keliling menggunakan satuan panjang (cm, m), sedangkan luas menggunakan satuan kuadrat (cm², m²). Kesalahan satuan adalah kesalahan umum yang harus dihindari.",
            ],
            [
                'title'   => 'Keliling dan Luas Segitiga',
                'content' => $intro .
                    "Segitiga memiliki 3 sisi. Keliling segitiga adalah jumlah ketiga sisinya: K = a + b + c. Untuk segitiga sama sisi dengan sisi 6 cm: K = 6 + 6 + 6 = 18 cm.\n\n" .
                    "Luas segitiga = ½ × alas × tinggi. Tinggi adalah jarak tegak lurus dari puncak ke sisi alas. Contoh: segitiga dengan alas 10 cm dan tinggi 6 cm memiliki luas = ½ × 10 × 6 = 30 cm².\n\n" .
                    "Ada berbagai jenis segitiga: sama sisi (ketiga sisi sama), sama kaki (dua sisi sama), sembarang (ketiga sisi berbeda), siku-siku (satu sudut 90°). Teorema Pythagoras berlaku pada segitiga siku-siku: a² + b² = c².",
            ],
        ];
    }

    private function geometriMedium(bool $visual): array
    {
        $intro = $visual ? "Perhatikan ilustrasi di bawah ini untuk memahami konsep yang akan dipelajari.\n\n" : "";
        return [
            [
                'title'   => 'Lingkaran: Keliling dan Luas',
                'content' => $intro .
                    "Lingkaran adalah kumpulan titik yang berjarak sama (jari-jari, r) dari titik pusat. Diameter (d) adalah dua kali jari-jari. Bilangan π (pi) ≈ 3,14 atau 22/7 adalah konstanta penting dalam perhitungan lingkaran.\n\n" .
                    "Keliling lingkaran = 2πr = πd. Luas lingkaran = πr². Contoh: lingkaran dengan jari-jari 7 cm memiliki keliling = 2 × 22/7 × 7 = 44 cm dan luas = 22/7 × 49 = 154 cm².\n\n" .
                    "Busur adalah bagian dari keliling lingkaran. Tali busur adalah garis yang menghubungkan dua titik di lingkaran. Jari-jari yang tegak lurus tali busur akan membagi tali busur menjadi dua bagian sama panjang.",
            ],
            [
                'title'   => 'Jajargenjang dan Trapesium',
                'content' => $intro .
                    "Jajargenjang adalah segiempat dengan dua pasang sisi sejajar dan sama panjang. Luas jajargenjang = alas × tinggi. Keliling = 2(a + b) di mana a dan b adalah panjang sisi yang berbeda.\n\n" .
                    "Trapesium adalah segiempat dengan tepat satu pasang sisi sejajar (disebut sisi sejajar atau alas). Luas trapesium = ½ × (jumlah sisi sejajar) × tinggi = ½(a + b) × t.\n\n" .
                    "Trapesium sama kaki memiliki kaki (sisi yang tidak sejajar) sama panjang. Sifat istimewa: diagonal-diagonalnya sama panjang dan sudut alas sama besar.",
            ],
            [
                'title'   => 'Sifat-sifat Bangun Datar',
                'content' => $intro .
                    "Setiap bangun datar memiliki sifat khusus terkait sisi, sudut, diagonal, dan simetri. Persegi memiliki 4 sumbu simetri dan diagonalnya berpotongan tegak lurus dan sama panjang.\n\n" .
                    "Belah ketupat memiliki semua sisi sama panjang seperti persegi, tetapi sudut-sudutnya tidak harus siku-siku. Diagonalnya berpotongan tegak lurus namun tidak sama panjang.\n\n" .
                    "Memahami sifat-sifat ini penting untuk membuktikan pernyataan geometri dan menyelesaikan soal yang membutuhkan identifikasi jenis bangun berdasarkan propertinya.",
            ],
        ];
    }

    private function geometriHard(bool $visual): array
    {
        $intro = $visual ? "Perhatikan ilustrasi di bawah ini untuk memahami konsep yang akan dipelajari.\n\n" : "";
        return [
            [
                'title'   => 'Teorema Pythagoras',
                'content' => $intro .
                    "Teorema Pythagoras menyatakan bahwa pada segitiga siku-siku, kuadrat sisi miring (hipotenusa) sama dengan jumlah kuadrat dua sisi lainnya: c² = a² + b².\n\n" .
                    "Contoh: segitiga siku-siku dengan sisi tegak 3 cm dan 4 cm memiliki hipotenusa = √(9 + 16) = √25 = 5 cm. Tripel Pythagoras umum yang perlu dihapal: (3,4,5), (5,12,13), (8,15,17).\n\n" .
                    "Teorema ini juga berguna untuk membuktikan apakah segitiga adalah siku-siku, lancip, atau tumpul. Jika c² = a² + b²: siku-siku. Jika c² < a² + b²: lancip. Jika c² > a² + b²: tumpul.",
            ],
            [
                'title'   => 'Luas Bangun Datar Kompleks',
                'content' => $intro .
                    "Bangun datar kompleks adalah bangun yang terbentuk dari gabungan beberapa bangun dasar. Strategi utama: identifikasi bagian-bagian penyusun, hitung luas masing-masing, lalu jumlahkan (atau kurangi jika ada bagian yang dilubangi).\n\n" .
                    "Contoh: luas huruf L dapat dihitung sebagai luas persegi panjang besar dikurangi persegi panjang kecil di sudutnya. Atau dibagi menjadi dua persegi panjang yang dijumlahkan.\n\n" .
                    "Tips penting: selalu gambarkan bangunnya, tandai dimensi yang diketahui, dan tuliskan rumus sebelum menghitung. Ketelitian dalam membaca soal sangat penting agar tidak ada dimensi yang terlewat.",
            ],
        ];
    }

    // ── Statistika Dasar ──────────────────────────────────────────────────────

    private function statistikaEasy(bool $visual): array
    {
        $intro = $visual ? "Perhatikan ilustrasi di bawah ini untuk memahami konsep yang akan dipelajari.\n\n" : "";
        return [
            [
                'title'   => 'Pengenalan Data dan Statistika',
                'content' => $intro .
                    "Statistika adalah cabang matematika yang mempelajari cara mengumpulkan, mengorganisasi, menganalisis, dan menginterpretasikan data. Data adalah informasi yang dikumpulkan dalam bentuk angka atau kategori.\n\n" .
                    "Data kuantitatif adalah data berupa angka (misalnya tinggi badan, nilai ujian). Data kualitatif adalah data berupa kategori atau label (misalnya warna favorit, jenis olahraga). Memahami jenis data penting untuk memilih metode analisis yang tepat.\n\n" .
                    "Populasi adalah keseluruhan objek yang ingin dipelajari. Sampel adalah bagian dari populasi yang diambil untuk mewakilinya. Dalam penelitian, kita sering bekerja dengan sampel karena mengambil data seluruh populasi tidak selalu memungkinkan.",
            ],
            [
                'title'   => 'Rata-rata (Mean) dan Penyajian Data',
                'content' => $intro .
                    "Rata-rata (mean) adalah jumlah semua nilai dibagi banyaknya data. Rumus: x̄ = Σx / n. Contoh: data nilai 70, 80, 90, 60, 100 memiliki mean = (70+80+90+60+100)/5 = 400/5 = 80.\n\n" .
                    "Data dapat disajikan dalam berbagai bentuk: tabel frekuensi, diagram batang, diagram garis, atau diagram lingkaran. Setiap bentuk penyajian memiliki kelebihan masing-masing tergantung tujuan dan jenis data.\n\n" .
                    "Tabel frekuensi digunakan untuk mengelompokkan data dan menghitung berapa kali setiap nilai atau rentang nilai muncul. Ini sangat berguna untuk data yang tersebar luas dengan banyak nilai berbeda.",
            ],
            [
                'title'   => 'Median dan Modus',
                'content' => $intro .
                    "Median adalah nilai tengah dari data yang telah diurutkan. Jika jumlah data ganjil, median adalah nilai tepat di tengah. Jika genap, median adalah rata-rata dua nilai tengah. Contoh data ganjil: 3, 5, 7, 9, 11 → median = 7.\n\n" .
                    "Modus adalah nilai yang paling sering muncul. Contoh: 4, 7, 4, 2, 4, 9 → modus = 4 (muncul 3 kali). Data bisa memiliki lebih dari satu modus (bimodal/multimodal) atau tidak memiliki modus jika semua nilai muncul sama sering.\n\n" .
                    "Mean, median, dan modus adalah ukuran pemusatan data. Mean sensitif terhadap nilai ekstrem (outlier), sehingga median lebih baik digunakan untuk data yang tidak simetris atau memiliki outlier.",
            ],
        ];
    }

    private function statistikaMedium(bool $visual): array
    {
        $intro = $visual ? "Perhatikan ilustrasi di bawah ini untuk memahami konsep yang akan dipelajari.\n\n" : "";
        return [
            [
                'title'   => 'Diagram Batang dan Lingkaran',
                'content' => $intro .
                    "Diagram batang menggunakan batang vertikal atau horizontal untuk mewakili frekuensi atau nilai data. Tinggi/panjang batang sebanding dengan nilai yang diwakili. Diagram ini mudah dibaca dan cocok untuk membandingkan kategori.\n\n" .
                    "Diagram lingkaran (pie chart) menunjukkan proporsi setiap kategori terhadap keseluruhan data. Setiap sektor memiliki sudut = (frekuensi/total) × 360°. Contoh: jika 25% data masuk kategori A, sudutnya = 0,25 × 360° = 90°.\n\n" .
                    "Pemilihan jenis diagram bergantung pada tujuan: diagram batang lebih baik untuk perbandingan antar kategori, diagram lingkaran lebih baik untuk menunjukkan proporsi, dan diagram garis lebih baik untuk tren dari waktu ke waktu.",
            ],
            [
                'title'   => 'Jangkauan dan Variansi Data',
                'content' => $intro .
                    "Jangkauan (range) adalah selisih antara nilai terbesar dan terkecil dalam data. Jangkauan = nilai maks − nilai min. Ini adalah ukuran penyebaran paling sederhana tetapi sensitif terhadap outlier.\n\n" .
                    "Variansi mengukur seberapa jauh data menyebar dari mean. Rumus: σ² = Σ(xi − x̄)² / n. Simpangan baku (standar deviasi) adalah akar kuadrat dari variansi: σ = √(variansi). Semakin besar nilainya, semakin tersebar datanya.\n\n" .
                    "Contoh: data 2, 4, 4, 4, 5, 5, 7, 9 memiliki mean = 5. Variansi = [(9+1+1+1+0+0+4+16)/8] = 32/8 = 4. Simpangan baku = √4 = 2.",
            ],
            [
                'title'   => 'Interpretasi Data Statistik',
                'content' => $intro .
                    "Interpretasi data statistik adalah proses mengambil makna dari hasil perhitungan statistik. Kita harus mempertimbangkan konteks data, bukan hanya angka semata. Misalnya, mean nilai ujian 75 bisa berarti berbeda tergantung kesulitan soal.\n\n" .
                    "Distribusi data menggambarkan bagaimana data tersebar. Distribusi simetris memiliki mean = median = modus. Distribusi miring kanan (positif) memiliki mean > median > modus, artinya ada beberapa nilai sangat besar yang menarik mean ke kanan.\n\n" .
                    "Membandingkan dua kelompok data membutuhkan perbandingan ukuran pemusatan (mean/median) DAN ukuran penyebaran (simpangan baku). Kelompok dengan mean sama bisa sangat berbeda jika simpangan bakunya berbeda.",
            ],
        ];
    }

    private function statistikaHard(bool $visual): array
    {
        $intro = $visual ? "Perhatikan ilustrasi di bawah ini untuk memahami konsep yang akan dipelajari.\n\n" : "";
        return [
            [
                'title'   => 'Kuartil dan Persentil',
                'content' => $intro .
                    "Kuartil membagi data yang telah diurutkan menjadi empat bagian sama besar. Q1 (kuartil pertama) adalah nilai yang membagi 25% data terbawah. Q2 adalah median. Q3 membagi 75% data terbawah. Jangkauan interkuartil (IQR) = Q3 − Q1.\n\n" .
                    "IQR adalah ukuran penyebaran yang lebih robust terhadap outlier dibanding jangkauan. Outlier umumnya didefinisikan sebagai nilai di bawah Q1 − 1,5×IQR atau di atas Q3 + 1,5×IQR.\n\n" .
                    "Persentil membagi data menjadi 100 bagian sama besar. Persentil ke-p (Pp) adalah nilai yang memiliki p% data di bawahnya. Median adalah P50. Q1 = P25, Q3 = P75. Persentil sering digunakan untuk penilaian standar dan evaluasi pertumbuhan.",
            ],
            [
                'title'   => 'Ukuran Penyebaran dan Analisis Data',
                'content' => $intro .
                    "Koefisien variasi (KV) = (simpangan baku / mean) × 100% digunakan untuk membandingkan variabilitas data dengan satuan atau skala berbeda. KV rendah menunjukkan data lebih konsisten dan seragam.\n\n" .
                    "Box plot (diagram kotak) adalah representasi visual yang menampilkan Q1, Q2, Q3, nilai minimum, dan nilai maksimum sekaligus. Box plot memudahkan perbandingan distribusi dua kelompok data berbeda secara visual.\n\n" .
                    "Dalam analisis data nyata, langkah-langkahnya adalah: kumpulkan data → bersihkan data (hapus error) → eksplorasi (statistik deskriptif) → visualisasi → interpretasi → simpulkan. Statistik adalah alat untuk memahami dunia nyata melalui data.",
            ],
        ];
    }
}
