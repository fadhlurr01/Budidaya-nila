<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Article;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $articles = [
            [
                'title' => 'Keunggulan Sistem Bioflok: Hemat Air, Pakan Efisien, dan Ramah Lingkungan',
                'slug' => 'keunggulan-sistem-bioflok-hemat-air-dan-pakan',
                'excerpt' => 'Pelajari mengapa teknologi bioflok mampu menghemat air hingga 80% dan memangkas rasio konversi pakan (FCR) menjadi jauh lebih hemat dan menguntungkan.',
                'content' => 'Teknologi bioflok merupakan inovasi mutakhir dalam akuakultur modern yang memanfaatkan mikroorganisme heterotrof untuk mengubah limbah organik budidaya (feses dan sisa pakan) menjadi gumpalan nutrisi (flok) yang kaya protein.

Keunggulan utama sistem bioflok pada ikan nila meliputi:
1. Efisiensi Penggunaan Air: Air kolam tidak perlu diganti setiap hari, melainkan disirkulasi dan diaerasi terus menerus. Penggantian air hanya dilakukan saat penyusutan penguapan, menghemat air hingga 80%.
2. Penurunan FCR (Feed Conversion Ratio): Flok mikroba yang terbentuk dimakan kembali oleh ikan nila sebagai pakan alami berprotein tinggi 25-35%, menekan FCR hingga kisaran 1.05 - 1.15.
3. Kepadatan Tebar Tinggi: Kolam bioflok mampu menampung padat tebar 100 - 150 ekor/m3 tanpa menyebabkan kanibalisme atau stres, jauh di atas kolam tanah konvensional (10 - 20 ekor/m3).
4. Daging Bebas Bau Lumpur: Sirkulasi air aerasi aktif dan probiotik mengeliminasi senyawa geosmin dan MIB (2-methylisoborneol), menghasilkan daging ikan nila yang manis gurih dan bebas aroma lumpur.',
                'image_url' => 'assets/products/kolam-d4.jpg',
                'status' => 'published',
                'author' => 'Ir. Hendra Pratama (Spesialis Akuakultur Bioflok)',
            ],
            [
                'title' => 'Peluang Usaha Budidaya Nila Modern: Analisis Modal dan Potensi Keuntungan',
                'slug' => 'peluang-usaha-budidaya-nila-modern-analisis-modal',
                'excerpt' => 'Rincian kalkulasi modal awal paket kolam bioflok D3, biaya operasional bibit dan pakan, hingga estimasi laba bersih panen 3-4 bulan.',
                'content' => 'Permintaan pasar terhadap ikan nila segar terus mengalami peningkatan seiring tingginya kesadaran masyarakat akan pemenuhan protein hewani berkualitas tinggi. Usaha budidaya nila sistem bioflok memiliki barrier to entry yang terjangkau dan perputaran modal yang cepat.

Simulasi Bisnis 1 Unit Kolam Bioflok D3:
1. Investasi Awal:
- 1 Unit Paket Kolam Bundar D3 lengkap: Rp 2.500.000
- Mesin Aerator Blower Resun LP-60 / ACO: Rp 850.000
- Instalasi aerasi uniring & pipa: Rp 350.000
Total Investasi Awal: Rp 3.700.000 (aset tahan 3-5 tahun).

2. Biaya Operasional per Siklus (90-100 Hari):
- Bibit Nila Unggul Nirwana (1.000 ekor x Rp 250): Rp 250.000
- Pakan Grower Protein 32% (3 sak x Rp 340.000): Rp 1.020.000
- Probiotik, garam grosok, dan molase: Rp 150.000
- Listrik aerator 24 jam selama 3 bulan: Rp 250.000
Total Biaya Operasional: Rp 1.670.000

3. Hasil Panen dan Pendapatan:
- Tingkat Kelangsungan Hidup (SR 95%): 950 ekor
- Bobot Panen (rata-rata 3 ekor/kg): 316 kg
- Harga Jual Nila Segar Peternak: Rp 35.000/kg
- Omzet Kotor Panen: 316 kg x Rp 35.000 = Rp 11.060.000
- Laba Bersih per Kolam per Siklus: Rp 11.060.000 - Rp 1.670.000 = Rp 9.390.000!

Dengan mengelola 3 sampai 5 kolam D3 di pekarangan rumah, pendapatan bersih bulanan dapat melampaui rata-rata UMR daerah.',
                'image_url' => 'assets/products/kolam-d3.jpg',
                'status' => 'published',
                'author' => 'Tim Riset Usaha Tani NilaFarm',
            ],
            [
                'title' => 'Manajemen Kualitas Air Kolam Nila: Cara Mengontrol pH, DO, dan Senyawa Amonia',
                'slug' => 'manajemen-kualitas-air-kolam-nila-kontrol-ph-do-amonia',
                'excerpt' => 'Panduan teknis harian memantau parameter kimia air kolam nila bioflok agar ikan selalu sehat, nafsu makan stabil, dan terhindar dari penyakit.',
                'content' => 'Kunci utama kesuksesan budidaya nila sistem bioflok bukanlah memberi makan sebanyak-banyaknya, melainkan menjaga ekosistem air tetap prima.

Tiga parameter kritis yang wajib dikontrol setiap hari:
1. Oksigen Terlarut (Dissolved Oxygen / DO):
Ikan nila dan bakteri heterotrof bioflok sama-sama membutuhkan oksigen. Nilai DO harus dipertahankan di atas 4.0 mg/L (ideal 5.0 - 7.0 mg/L). Pastikan aerator dan batu aerasi uniring bekerja 24 jam tanpa henti, terutama pada malam hari saat fotosintesis berhenti.

2. Derajat Keasaman (pH Air):
Nilai pH optimal untuk nila bioflok berkisar antara 7.0 hingga 8.2. Jika pH turun di bawah 6.5 (air cenderung asam akibat nitrifikasi), taburkan kapur dolomit dosis 20-30 gram per m3. Jika pH terlalu tinggi (>8.5), tambahkan molase atau asam amino untuk menstabilkan.

3. Pengendalian Amonia (TAN / NH3):
Amonia bebas beracun timbul dari dekomposisi feses dan sisa pakan. Bakteri bioflok membutuhkan rasio C:N minimal 10:1 sampai 15:1 untuk mengasimilasi amonia menjadi protein sel tunggal. Tambahkan sumber karbon (molase/gula tebu/tapioka) secara berkala sebanding dengan jumlah pakan yang diberikan.',
                'image_url' => 'assets/products/probiotik-bioflok.jpg',
                'status' => 'published',
                'author' => 'Laboratorium Kualitas Air NilaFarm',
            ],
        ];

        foreach ($articles as $item) {
            Article::updateOrCreate(
                ['slug' => $item['slug']],
                $item
            );
        }
    }
}
