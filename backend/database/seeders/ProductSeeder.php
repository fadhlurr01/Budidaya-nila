<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'Ikan Nila Segar Bioflok',
                'slug' => 'ikan-nila-segar-bioflok',
                'description' => 'Ikan nila merah segar dipanen langsung dari kolam bioflok bersirkulasi higienis. Bebas bau lumpur/tanah, bertekstur daging padat kenyal, manis gurih alami, serta kaya asam lemak Omega-3 dan protein murni. Sangat cocok untuk konsumsi harian keluarga dan restoran.',
                'price' => 35000.00,
                'stock' => 500,
                'image_url' => 'assets/ikan-nila-bioflok.png',
                'category' => 'Ikan Segar Konsumsi',
                'unit' => '/kg',
                'is_popular' => true,
            ],
            [
                'name' => 'Nila Bumbu Siap Goreng',
                'slug' => 'nila-bumbu-siap-goreng',
                'description' => 'Ikan nila bioflok pilihan yang telah dibersihkan secara higienis, dibelah butterfly, dan dimarinasi racikan bumbu kuning rempah Nusantara alami (kunyit, jahe, bawang, ketumbar) tanpa bahan pengawet sintetik. Praktis langsung digoreng atau dibakar.',
                'price' => 45000.00,
                'stock' => 150,
                'image_url' => 'assets/products/nila-bumbu.jpg',
                'category' => 'Olahan Siap Saji',
                'unit' => '/pack (500g)',
                'is_popular' => true,
            ],
            [
                'name' => 'Benih Nila Kualitas Super',
                'slug' => 'benih-nila-kualitas-super',
                'description' => 'Benih ikan nila merah strain unggul Nirwana Gen-3 berukuran 5-7 cm berstandar SKAI (Surat Keterangan Asal Induk). Memiliki Survival Rate (SR) tinggi di atas 95%, adaptif terhadap fluktuasi air, tahan penyakit, serta laju pertumbuhan seragam.',
                'price' => 250.00,
                'stock' => 100000,
                'image_url' => 'assets/products/benih-nila.jpg',
                'category' => 'Bibit Unggul',
                'unit' => '/ekor',
                'is_popular' => false,
            ],
            [
                'name' => 'Auto Feeder Ikan Pintar',
                'slug' => 'auto-feeder-ikan-pintar',
                'description' => 'Mesin pelempar pakan ikan otomatis cerdas dengan kontrol timer digital terintegrasi WiFi & telemetry IoT. Mencegah pakan terbuang (overfeeding), kapasitas tampung 5 kg, dan jarak lontar pakan hingga 4 meter ke tengah kolam bioflok.',
                'price' => 350000.00,
                'stock' => 40,
                'image_url' => 'assets/products/auto-feeder.jpg',
                'category' => 'Perlengkapan IoT',
                'unit' => '/unit',
                'is_popular' => false,
            ],
            [
                'name' => 'Paket Kolam Bioflok D3',
                'slug' => 'paket-kolam-bioflok-d3',
                'description' => 'Paket lengkap kolam terpal bundar diameter 3 meter tinggi 1.05 meter volume 7.4 m3. Menggunakan terpal semi-karet Orchid Jerman anti UV, rangka wiremesh galvanis M6 anti karat, central drain pipa 2 inch, dan cincin aerasi uniring terintegrasi.',
                'price' => 2500000.00,
                'stock' => 20,
                'image_url' => 'assets/products/kolam-d3.jpg',
                'category' => 'Paket Kolam',
                'unit' => '/set',
                'is_popular' => true,
            ],
            [
                'name' => 'Paket Kolam Bioflok D4 Industri',
                'slug' => 'paket-kolam-bioflok-d4-industri',
                'description' => 'Paket kolam terpal bulat skala komersial diameter 4 meter tinggi 1.2 meter volume 15 m3. Dilengkapi sistem central bottom drain, rangka besi ulir galvanis heavy-duty, dan instalasi aerasi manifold komplit.',
                'price' => 3800000.00,
                'stock' => 12,
                'image_url' => 'assets/products/kolam-d4.jpg',
                'category' => 'Paket Kolam',
                'unit' => '/set',
                'is_popular' => false,
            ],
            [
                'name' => 'Fillet Nila Premium Boneless',
                'slug' => 'fillet-nila-premium-boneless',
                'description' => 'Fillet daging ikan nila murni tanpa duri dan tanpa sisik, diproses higienis bersertifikasi HACCP. Dikemas vakum per 500 gram dan dibekukan cepat (IQF) untuk mengunci kesegaran nutrisi.',
                'price' => 65000.00,
                'stock' => 85,
                'image_url' => 'assets/products/nila-fillet.jpg',
                'category' => 'Olahan Siap Saji',
                'unit' => '/pack (500g)',
                'is_popular' => false,
            ],
            [
                'name' => 'Pakan Nila Grower Protein 32%',
                'slug' => 'pakan-nila-grower-protein-32',
                'description' => 'Pelet apung berkualitas tinggi dengan kandungan protein murni 32%, asam amino esensial, spirulina, dan multivitamin. Efisiensi rasio konversi pakan (FCR) hemat hingga 1.05 - 1.15.',
                'price' => 340000.00,
                'stock' => 80,
                'image_url' => 'assets/products/pakan-nila.jpg',
                'category' => 'Pakan & Nutrisi',
                'unit' => '/sak (30kg)',
                'is_popular' => false,
            ],
            [
                'name' => 'Probiotik Bioflok EM-Aquatic Complex',
                'slug' => 'probiotik-bioflok-em-aquatic-complex',
                'description' => 'Konsorsium mikroba probiotik unggul (Bacillus subtilis, Nitrosomonas, Nitrobacter) untuk mempercepat pembentukan flok nutrisi, mengurai gas amonia beracun, dan menjaga kejernihan air kolam.',
                'price' => 75000.00,
                'stock' => 120,
                'image_url' => 'assets/products/probiotik-bioflok.jpg',
                'category' => 'Pakan & Nutrisi',
                'unit' => '/botol (1 Liter)',
                'is_popular' => false,
            ],
            [
                'name' => 'Sensor IoT Multi-Parameter Kolam',
                'slug' => 'sensor-iot-multi-parameter-kolam',
                'description' => 'Modul probe sensor submersible pemantau kualitas air real-time: suhu air, pH, dan kadar oksigen terlarut (DO). Dilengkapi konektivitas LoRa / WiFi dengan transmisi telemetri otomatis ke dashboard.',
                'price' => 850000.00,
                'stock' => 25,
                'image_url' => 'assets/products/sensor-iot.jpg',
                'category' => 'Perlengkapan IoT',
                'unit' => '/unit',
                'is_popular' => false,
            ],
        ];

        foreach ($products as $item) {
            Product::updateOrCreate(
                ['slug' => $item['slug']],
                $item
            );
        }
    }
}
