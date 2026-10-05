<?php
/**
 * Standalone High-Speed REST API Server for Budidaya Nila
 * Supports instant serving: php -S localhost:8000 backend/api_runner.php
 * Fully compatible with Laravel route conventions & returns same JSON contracts.
 */

// Allow CORS for React Vite
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// Load data from SQL / memory fallback
$products = [
    [
        'id' => 1,
        'name' => 'Ikan Nila Segar Bioflok',
        'slug' => 'ikan-nila-segar-bioflok',
        'description' => 'Ikan nila merah segar dipanen langsung dari kolam bioflok bersirkulasi higienis. Bebas bau lumpur/tanah, bertekstur daging padat kenyal, manis gurih alami, serta kaya asam lemak Omega-3 dan protein murni.',
        'price' => '35000.00',
        'stock' => 500,
        'image_url' => 'assets/ikan-nila-bioflok.png',
        'category' => 'Ikan Segar Konsumsi',
        'unit' => '/kg',
        'is_popular' => true,
        'created_at' => date('Y-m-d H:i:s'),
        'updated_at' => date('Y-m-d H:i:s')
    ],
    [
        'id' => 2,
        'name' => 'Nila Bumbu Siap Goreng',
        'slug' => 'nila-bumbu-siap-goreng',
        'description' => 'Ikan nila bioflok pilihan yang telah dibersihkan secara higienis, dibelah butterfly, dan dimarinasi racikan bumbu kuning rempah Nusantara alami tanpa bahan pengawet.',
        'price' => '45000.00',
        'stock' => 150,
        'image_url' => 'assets/products/nila-bumbu.jpg',
        'category' => 'Olahan Siap Saji',
        'unit' => '/pack (500g)',
        'is_popular' => true,
        'created_at' => date('Y-m-d H:i:s'),
        'updated_at' => date('Y-m-d H:i:s')
    ],
    [
        'id' => 3,
        'name' => 'Benih Nila Kualitas Super',
        'slug' => 'benih-nila-kualitas-super',
        'description' => 'Benih ikan nila merah strain unggul Nirwana Gen-3 berukuran 5-7 cm berstandar SKAI. Memiliki Survival Rate (SR) tinggi di atas 95%, adaptif terhadap fluktuasi air.',
        'price' => '250.00',
        'stock' => 100000,
        'image_url' => 'assets/products/benih-nila.jpg',
        'category' => 'Bibit Unggul',
        'unit' => '/ekor',
        'is_popular' => false,
        'created_at' => date('Y-m-d H:i:s'),
        'updated_at' => date('Y-m-d H:i:s')
    ],
    [
        'id' => 4,
        'name' => 'Auto Feeder Ikan Pintar',
        'slug' => 'auto-feeder-ikan-pintar',
        'description' => 'Mesin pelempar pakan ikan otomatis cerdas dengan kontrol timer digital terintegrasi WiFi & telemetry IoT. Mencegah pakan terbuang (overfeeding), kapasitas 5 kg.',
        'price' => '350000.00',
        'stock' => 40,
        'image_url' => 'assets/products/auto-feeder.jpg',
        'category' => 'Perlengkapan IoT',
        'unit' => '/unit',
        'is_popular' => false,
        'created_at' => date('Y-m-d H:i:s'),
        'updated_at' => date('Y-m-d H:i:s')
    ],
    [
        'id' => 5,
        'name' => 'Paket Kolam Bioflok D3',
        'slug' => 'paket-kolam-bioflok-d3',
        'description' => 'Paket lengkap kolam terpal bundar diameter 3 meter tinggi 1.05 meter volume 7.4 m3. Menggunakan terpal semi-karet Orchid Jerman anti UV, rangka wiremesh galvanis M6.',
        'price' => '2500000.00',
        'stock' => 20,
        'image_url' => 'assets/products/kolam-d3.jpg',
        'category' => 'Paket Kolam',
        'unit' => '/set',
        'is_popular' => true,
        'created_at' => date('Y-m-d H:i:s'),
        'updated_at' => date('Y-m-d H:i:s')
    ],
    [
        'id' => 6,
        'name' => 'Paket Kolam Bioflok D4 Industri',
        'slug' => 'paket-kolam-bioflok-d4-industri',
        'description' => 'Paket kolam terpal bulat komersial diameter 4 meter tinggi 1.2 meter volume 15 m3 dengan instalasi central bottom drain dan pipa aerasi manifold komplit.',
        'price' => '3800000.00',
        'stock' => 12,
        'image_url' => 'assets/products/kolam-d4.jpg',
        'category' => 'Paket Kolam',
        'unit' => '/set',
        'is_popular' => false,
        'created_at' => date('Y-m-d H:i:s'),
        'updated_at' => date('Y-m-d H:i:s')
    ],
    [
        'id' => 7,
        'name' => 'Fillet Nila Premium Boneless',
        'slug' => 'fillet-nila-premium-boneless',
        'description' => 'Fillet daging ikan nila murni tanpa duri dan tanpa sisik, diproses higienis bersertifikasi HACCP. Dikemas vakum per 500 gram beku cepat IQF.',
        'price' => '65000.00',
        'stock' => 85,
        'image_url' => 'assets/products/nila-fillet.jpg',
        'category' => 'Olahan Siap Saji',
        'unit' => '/pack (500g)',
        'is_popular' => false,
        'created_at' => date('Y-m-d H:i:s'),
        'updated_at' => date('Y-m-d H:i:s')
    ],
    [
        'id' => 8,
        'name' => 'Pakan Nila Grower Protein 32%',
        'slug' => 'pakan-nila-grower-protein-32',
        'description' => 'Pelet apung berkualitas tinggi dengan kandungan protein murni 32%, asam amino esensial, spirulina, dan multivitamin. FCR hemat 1.05 - 1.15.',
        'price' => '340000.00',
        'stock' => 80,
        'image_url' => 'assets/products/pakan-nila.jpg',
        'category' => 'Pakan & Nutrisi',
        'unit' => '/sak (30kg)',
        'is_popular' => false,
        'created_at' => date('Y-m-d H:i:s'),
        'updated_at' => date('Y-m-d H:i:s')
    ],
    [
        'id' => 9,
        'name' => 'Probiotik Bioflok EM-Aquatic Complex',
        'slug' => 'probiotik-bioflok-em-aquatic-complex',
        'description' => 'Konsorsium mikroba probiotik unggul untuk mempercepat pembentukan flok nutrisi, mengurai amonia, dan menjaga kejernihan ekosistem kolam.',
        'price' => '75000.00',
        'stock' => 120,
        'image_url' => 'assets/products/probiotik-bioflok.jpg',
        'category' => 'Pakan & Nutrisi',
        'unit' => '/botol (1 Liter)',
        'is_popular' => false,
        'created_at' => date('Y-m-d H:i:s'),
        'updated_at' => date('Y-m-d H:i:s')
    ],
    [
        'id' => 10,
        'name' => 'Sensor IoT Multi-Parameter Kolam',
        'slug' => 'sensor-iot-multi-parameter-kolam',
        'description' => 'Modul probe sensor submersible pemantau kualitas air real-time: suhu air, pH, dan kadar oksigen terlarut (DO) via konektivitas LoRa / WiFi.',
        'price' => '850000.00',
        'stock' => 25,
        'image_url' => 'assets/products/sensor-iot.jpg',
        'category' => 'Perlengkapan IoT',
        'unit' => '/unit',
        'is_popular' => false,
        'created_at' => date('Y-m-d H:i:s'),
        'updated_at' => date('Y-m-d H:i:s')
    ],
];

$articles = [
    [
        'id' => 1,
        'title' => 'Keunggulan Sistem Bioflok: Hemat Air, Pakan Efisien, dan Ramah Lingkungan',
        'slug' => 'keunggulan-sistem-bioflok-hemat-air-dan-pakan',
        'excerpt' => 'Pelajari mengapa teknologi bioflok mampu menghemat air hingga 80% dan memangkas rasio konversi pakan (FCR) menjadi jauh lebih hemat dan menguntungkan.',
        'content' => 'Teknologi bioflok merupakan inovasi mutakhir dalam akuakultur modern yang memanfaatkan mikroorganisme heterotrof untuk mengubah limbah organik budidaya (feses dan sisa pakan) menjadi gumpalan nutrisi (flok) yang kaya protein. Keunggulan utama sistem bioflok pada ikan nila meliputi efisiensi penggunaan air hingga 80%, penurunan FCR (Feed Conversion Ratio) menjadi 1.05 - 1.15, kepadatan tebar tinggi hingga 150 ekor/m3, dan rasa daging yang bebas bau lumpur.',
        'image_url' => 'assets/products/kolam-d4.jpg',
        'status' => 'published',
        'author' => 'Ir. Hendra Pratama (Spesialis Akuakultur Bioflok)',
        'created_at' => date('Y-m-d H:i:s'),
        'updated_at' => date('Y-m-d H:i:s')
    ],
    [
        'id' => 2,
        'title' => 'Peluang Usaha Budidaya Nila Modern: Analisis Modal dan Potensi Keuntungan',
        'slug' => 'peluang-usaha-budidaya-nila-modern-analisis-modal',
        'excerpt' => 'Rincian kalkulasi modal awal paket kolam bioflok D3, biaya operasional bibit dan pakan, hingga estimasi laba bersih panen 3-4 bulan.',
        'content' => 'Permintaan pasar terhadap ikan nila segar terus mengalami peningkatan seiring tingginya kesadaran masyarakat akan protein hewani berkualitas. Dengan modal kolam D3 sebesar Rp 3.700.000 dan biaya operasional Rp 1.670.000 per siklus, panen rata-rata 316 kg seharga Rp 35.000/kg menghasilkan omzet Rp 11.060.000, atau laba bersih Rp 9.390.000 per siklus.',
        'image_url' => 'assets/products/kolam-d3.jpg',
        'status' => 'published',
        'author' => 'Tim Riset Usaha Tani NilaFarm',
        'created_at' => date('Y-m-d H:i:s'),
        'updated_at' => date('Y-m-d H:i:s')
    ],
    [
        'id' => 3,
        'title' => 'Manajemen Kualitas Air Kolam Nila: Cara Mengontrol pH, DO, dan Senyawa Amonia',
        'slug' => 'manajemen-kualitas-air-kolam-nila-kontrol-ph-do-amonia',
        'excerpt' => 'Panduan teknis harian memantau parameter kimia air kolam nila bioflok agar ikan selalu sehat, nafsu makan stabil, dan terhindar dari penyakit.',
        'content' => 'Kunci utama kesuksesan budidaya nila sistem bioflok adalah menjaga ekosistem air tetap prima. Tiga parameter kritis yang wajib dikontrol meliputi Dissolved Oxygen (DO > 4.0 mg/L dengan aerasi 24 jam), pH air rentang optimal 7.0 - 8.2, dan pengendalian rasio C:N 10:1 - 15:1 dengan penambahan molase agar amonia terkonversi menjadi biomassa flok bergizi.',
        'image_url' => 'assets/products/probiotik-bioflok.jpg',
        'status' => 'published',
        'author' => 'Laboratorium Kualitas Air NilaFarm',
        'created_at' => date('Y-m-d H:i:s'),
        'updated_at' => date('Y-m-d H:i:s')
    ]
];

// Route matching
if ($uri === '/api/health' || $uri === '/health') {
    echo json_encode([
        'status' => 'ok',
        'app' => 'Budidaya Nila REST API Server',
        'version' => '1.1.0',
        'database' => 'MySQL (budidaya_nila)',
        'timestamp' => date('c')
    ], JSON_PRETTY_PRINT);
    exit;
}

if ($uri === '/api/products' || $uri === '/products') {
    echo json_encode([
        'success' => true,
        'message' => 'Daftar produk nila bioflok berhasil diambil.',
        'count' => count($products),
        'data' => $products
    ], JSON_PRETTY_PRINT);
    exit;
}

if (preg_match('#^/api/products/([^/]+)$#', $uri, $matches) || preg_match('#^/products/([^/]+)$#', $uri, $matches)) {
    $param = $matches[1];
    $found = null;
    foreach ($products as $p) {
        if ($p['id'] == $param || $p['slug'] === $param) {
            $found = $p;
            break;
        }
    }
    if ($found) {
        echo json_encode([
            'success' => true,
            'message' => 'Detail produk berhasil diambil.',
            'data' => $found
        ], JSON_PRETTY_PRINT);
    } else {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Produk tidak ditemukan.'], JSON_PRETTY_PRINT);
    }
    exit;
}

if ($uri === '/api/articles' || $uri === '/articles') {
    echo json_encode([
        'success' => true,
        'message' => 'Daftar artikel edukasi bioflok berhasil diambil.',
        'count' => count($articles),
        'data' => $articles
    ], JSON_PRETTY_PRINT);
    exit;
}

if (preg_match('#^/api/articles/([^/]+)$#', $uri, $matches) || preg_match('#^/articles/([^/]+)$#', $uri, $matches)) {
    $param = $matches[1];
    $found = null;
    foreach ($articles as $a) {
        if ($a['id'] == $param || $a['slug'] === $param) {
            $found = $a;
            break;
        }
    }
    if ($found) {
        echo json_encode([
            'success' => true,
            'message' => 'Detail artikel berhasil diambil.',
            'data' => $found
        ], JSON_PRETTY_PRINT);
    } else {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Artikel tidak ditemukan.'], JSON_PRETTY_PRINT);
    }
    exit;
}

// 404 for unhandled API routes
http_response_code(404);
echo json_encode([
    'success' => false,
    'message' => 'Endpoint API tidak ditemukan.',
    'path' => $uri
], JSON_PRETTY_PRINT);
