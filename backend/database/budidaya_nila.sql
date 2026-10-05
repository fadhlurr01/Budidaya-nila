-- Database: budidaya_nila
-- Proyek Budidaya Nila Bioflok Modern

CREATE DATABASE IF NOT EXISTS `budidaya_nila` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `budidaya_nila`;

-- Table structure for table `users`
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for table `products`
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
  `description` text COLLATE utf8mb4_unicode_ci,
  `price` decimal(12,2) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT '0',
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unit` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '/kg',
  `is_popular` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `products`
INSERT INTO `products` (`id`, `name`, `slug`, `description`, `price`, `stock`, `image_url`, `category`, `unit`, `is_popular`, `created_at`, `updated_at`) VALUES
(1, 'Ikan Nila Segar Bioflok', 'ikan-nila-segar-bioflok', 'Ikan nila merah segar dipanen langsung dari kolam bioflok bersirkulasi higienis. Bebas bau lumpur/tanah, bertekstur daging padat kenyal, manis gurih alami, serta kaya asam lemak Omega-3 dan protein murni.', 35000.00, 500, 'assets/ikan-nila-bioflok.png', 'Ikan Segar Konsumsi', '/kg', 1, NOW(), NOW()),
(2, 'Nila Bumbu Siap Goreng', 'nila-bumbu-siap-goreng', 'Ikan nila bioflok pilihan yang telah dibersihkan secara higienis, dibelah butterfly, dan dimarinasi racikan bumbu kuning rempah Nusantara alami tanpa bahan pengawet.', 45000.00, 150, 'assets/products/nila-bumbu.jpg', 'Olahan Siap Saji', '/pack (500g)', 1, NOW(), NOW()),
(3, 'Benih Nila Kualitas Super', 'benih-nila-kualitas-super', 'Benih ikan nila merah strain unggul Nirwana Gen-3 berukuran 5-7 cm berstandar SKAI. Memiliki Survival Rate (SR) tinggi di atas 95%, adaptif terhadap fluktuasi air.', 250.00, 100000, 'assets/products/benih-nila.jpg', 'Bibit Unggul', '/ekor', 0, NOW(), NOW()),
(4, 'Auto Feeder Ikan Pintar', 'auto-feeder-ikan-pintar', 'Mesin pelempar pakan ikan otomatis cerdas dengan kontrol timer digital terintegrasi WiFi & telemetry IoT. Mencegah pakan terbuang (overfeeding), kapasitas 5 kg.', 350000.00, 40, 'assets/products/auto-feeder.jpg', 'Perlengkapan IoT', '/unit', 0, NOW(), NOW()),
(5, 'Paket Kolam Bioflok D3', 'paket-kolam-bioflok-d3', 'Paket lengkap kolam terpal bundar diameter 3 meter tinggi 1.05 meter volume 7.4 m3. Menggunakan terpal semi-karet Orchid Jerman anti UV, rangka wiremesh galvanis M6.', 2500000.00, 20, 'assets/products/kolam-d3.jpg', 'Paket Kolam', '/set', 1, NOW(), NOW()),
(6, 'Paket Kolam Bioflok D4 Industri', 'paket-kolam-bioflok-d4-industri', 'Paket kolam terpal bulat skala komersial diameter 4 meter tinggi 1.2 meter volume 15 m3 dengan instalasi central drain dan aerasi heavy duty.', 3800000.00, 12, 'assets/products/kolam-d4.jpg', 'Paket Kolam', '/set', 0, NOW(), NOW()),
(7, 'Fillet Nila Premium Boneless', 'fillet-nila-premium-boneless', 'Fillet daging ikan nila murni tanpa duri dan tanpa sisik, diproses higienis bersertifikasi HACCP. Dikemas vakum per 500 gram beku cepat IQF.', 65000.00, 85, 'assets/products/nila-fillet.jpg', 'Olahan Siap Saji', '/pack (500g)', 0, NOW(), NOW()),
(8, 'Pakan Nila Grower Protein 32%', 'pakan-nila-grower-protein-32', 'Pelet apung berkualitas tinggi dengan kandungan protein murni 32%, asam amino esensial, spirulina, dan multivitamin. FCR hemat 1.05 - 1.15.', 340000.00, 80, 'assets/products/pakan-nila.jpg', 'Pakan & Nutrisi', '/sak (30kg)', 0, NOW(), NOW()),
(9, 'Probiotik Bioflok EM-Aquatic Complex', 'probiotik-bioflok-em-aquatic-complex', 'Konsorsium mikroba probiotik unggul untuk mempercepat pembentukan flok nutrisi, mengurai amonia, dan menjaga kejernihan ekosistem kolam.', 75000.00, 120, 'assets/products/probiotik-bioflok.jpg', 'Pakan & Nutrisi', '/botol (1 Liter)', 0, NOW(), NOW()),
(10, 'Sensor IoT Multi-Parameter Kolam', 'sensor-iot-multi-parameter-kolam', 'Modul probe sensor submersible pemantau real-time: suhu air, pH, dan kadar oksigen terlarut (DO) via konektivitas LoRa / WiFi.', 850000.00, 25, 'assets/products/sensor-iot.jpg', 'Perlengkapan IoT', '/unit', 0, NOW(), NOW());

-- Table structure for table `articles`
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `excerpt` text COLLATE utf8mb4_unicode_ci,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('published','draft') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'published',
  `author` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'Tim Ahli Bioflok NilaFarm',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `articles`
INSERT INTO `articles` (`id`, `title`, `slug`, `content`, `excerpt`, `image_url`, `status`, `author`, `created_at`, `updated_at`) VALUES
(1, 'Keunggulan Sistem Bioflok: Hemat Air, Pakan Efisien, dan Ramah Lingkungan', 'keunggulan-sistem-bioflok-hemat-air-dan-pakan', 'Teknologi bioflok merupakan inovasi mutakhir dalam akuakultur modern yang memanfaatkan mikroorganisme heterotrof untuk mengubah limbah organik budidaya (feses dan sisa pakan) menjadi gumpalan nutrisi (flok) yang kaya protein.\n\nKeunggulan utama sistem bioflok pada ikan nila meliputi:\n1. Efisiensi Penggunaan Air: Air kolam tidak perlu diganti setiap hari, melainkan disirkulasi dan diaerasi terus menerus. Penggantian air hanya dilakukan saat penyusutan penguapan, menghemat air hingga 80%.\n2. Penurunan FCR (Feed Conversion Ratio): Flok mikroba yang terbentuk dimakan kembali oleh ikan nila sebagai pakan alami berprotein tinggi 25-35%, menekan FCR hingga kisaran 1.05 - 1.15.\n3. Kepadatan Tebar Tinggi: Kolam bioflok mampu menampung padat tebar 100 - 150 ekor/m3 tanpa menyebabkan kanibalisme atau stres, jauh di atas kolam tanah konvensional (10 - 20 ekor/m3).\n4. Daging Bebas Bau Lumpur: Sirkulasi air aerasi aktif dan probiotik mengeliminasi senyawa geosmin dan MIB, menghasilkan daging ikan nila yang manis gurih dan bebas aroma lumpur.', 'Pelajari mengapa teknologi bioflok mampu menghemat air hingga 80% dan memangkas rasio konversi pakan (FCR) menjadi jauh lebih hemat dan menguntungkan.', 'assets/products/kolam-d4.jpg', 'published', 'Ir. Hendra Pratama (Spesialis Akuakultur Bioflok)', NOW(), NOW()),
(2, 'Peluang Usaha Budidaya Nila Modern: Analisis Modal dan Potensi Keuntungan', 'peluang-usaha-budidaya-nila-modern-analisis-modal', 'Permintaan pasar terhadap ikan nila segar terus mengalami peningkatan seiring tingginya kesadaran masyarakat akan pemenuhan protein hewani berkualitas tinggi. Usaha budidaya nila sistem bioflok memiliki barrier to entry yang terjangkau dan perputaran modal yang cepat.\n\nSimulasi Bisnis 1 Unit Kolam Bioflok D3:\n1. Investasi Awal: Kolam bundar D3 Rp 2.500.000 + Aerator LP-60 Rp 850.000 + Instalasi Rp 350.000 = Rp 3.700.000 (aset 3-5 tahun).\n2. Biaya Operasional per Siklus (90-100 Hari): Bibit Nirwana 1.000 ekor Rp 250.000 + Pakan Grower 3 sak Rp 1.020.000 + Probiotik/molase Rp 150.000 + Listrik Rp 250.000 = Rp 1.670.000.\n3. Panen & Pendapatan: SR 95% = 950 ekor (~316 kg) x Rp 35.000/kg = Omzet Rp 11.060.000. Laba Bersih = Rp 9.390.000 per siklus!', 'Rincian kalkulasi modal awal paket kolam bioflok D3, biaya operasional bibit dan pakan, hingga estimasi laba bersih panen 3-4 bulan.', 'assets/products/kolam-d3.jpg', 'published', 'Tim Riset Usaha Tani NilaFarm', NOW(), NOW()),
(3, 'Manajemen Kualitas Air Kolam Nila: Cara Mengontrol pH, DO, dan Senyawa Amonia', 'manajemen-kualitas-air-kolam-nila-kontrol-ph-do-amonia', 'Kunci utama kesuksesan budidaya nila sistem bioflok bukanlah memberi makan sebanyak-banyaknya, melainkan menjaga ekosistem air tetap prima.\n\nTiga parameter kritis yang wajib dikontrol setiap hari:\n1. Oksigen Terlarut (DO): Pertahankan DO di atas 4.0 mg/L (ideal 5.0 - 7.0 mg/L) dengan aerasi nonstop 24 jam.\n2. Derajat Keasaman (pH Air): Rentang optimal 7.0 - 8.2. Jika pH asam (<6.5), gunakan kapur dolomit dosis 20-30 gr/m3. Jika alkali tinggi, tambahkan molase.\n3. Pengendalian Amonia (TAN/NH3): Tambahkan sumber karbon (molase/gula tebu/tapioka) dengan rasio C:N 10:1 sampai 15:1 untuk mengasimilasi amonia menjadi biomassa flok bernutrisi tinggi.', 'Panduan teknis harian memantau parameter kimia air kolam nila bioflok agar ikan selalu sehat, nafsu makan stabil, dan terhindar dari penyakit.', 'assets/products/probiotik-bioflok.jpg', 'published', 'Laboratorium Kualitas Air NilaFarm', NOW(), NOW());
