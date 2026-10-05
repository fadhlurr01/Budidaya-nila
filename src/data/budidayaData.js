// Data Budidaya & Penjualan Nila Bioflok Modern ("NilaFarm Indonesia")
// Produk Utama: Ikan Nila Segar Rp 35.000/kg & Aset Lokal Repositori

export const DEFAULT_PRODUCTS = [
  {
    id: 1,
    nama: 'Ikan Nila Segar Bioflok',
    harga: 35000,
    satuan: '/kg',
    img: '/assets/ikan-nila-bioflok.png',
    desk: 'Ikan nila merah segar dipanen langsung dari kolam bioflok bersirkulasi higienis. Bebas bau lumpur/tanah, bertekstur daging padat kenyal, manis gurih alami, serta kaya asam lemak Omega-3 dan protein murni. Sangat cocok untuk konsumsi harian keluarga dan restoran.',
    feats: ['100% Bebas Bau Lumpur', 'Panen Hidup Segar Setiap Pagi', 'Ukuran 3-4 Ekor per kg', 'Tinggi Omega-3 & Protein'],
    sizes: ['Ukuran Standar (3-4 ekor/kg)', 'Ukuran Jumbo (1-2 ekor/kg)', 'Ukuran Sedang (5-6 ekor/kg)'],
    stok: 'ada',
    pop: true,
    is_main: true,
    kategori: 'Ikan Konsumsi',
    tags: ['Produk Utama', 'Best Seller', 'Bebas Bau Lumpur']
  },
  {
    id: 2,
    nama: 'Nila Bumbu Siap Goreng',
    harga: 45000,
    satuan: '/pack (500g)',
    img: '/assets/products/nila-bumbu.jpg',
    desk: 'Ikan nila bioflok pilihan yang telah dibersihkan secara higienis, dibelah butterfly, dan dimarinasi racikan bumbu kuning rempah Nusantara alami tanpa bahan pengawet. Praktis langsung digoreng atau dibakar.',
    feats: ['Bumbu Kuning Rempah Alami', 'Siap Masak Tanpa Repot', 'Kemasan Vacuum Segel', 'Tanpa Bahan Pengawet'],
    sizes: ['Pack 500g (2-3 ekor)', 'Pack 1kg (4-6 ekor)'],
    stok: 'ada',
    pop: true,
    kategori: 'Olahan Siap Masak',
    tags: ['Siap Goreng', 'Praktis Higienis']
  },
  {
    id: 3,
    nama: 'Benih Nila Kualitas Super',
    harga: 250,
    satuan: '/ekor',
    img: '/assets/products/benih-nila.jpg',
    desk: 'Benih ikan nila merah strain unggul Nirwana Gen-3 berukuran 5-7 cm berstandar SKAI (Surat Keterangan Asal Induk). Memiliki Survival Rate (SR) tinggi di atas 95%, adaptif terhadap fluktuasi air, tahan penyakit, serta laju pertumbuhan seragam.',
    feats: ['Sertifikasi Resmi SKAI', 'Tingkat Kelangsungan Hidup (SR) > 95%', 'Adaptif Sistem Bioflok Padat Tebar', 'Pertumbuhan Cepat & Seragam'],
    sizes: ['Ukuran 3-5 cm', 'Ukuran 5-7 cm', 'Ukuran 7-9 cm'],
    stok: 'ada',
    pop: false,
    kategori: 'Benih Unggul',
    tags: ['Bibit Unggul', 'Sertifikasi SKAI']
  },
  {
    id: 4,
    nama: 'Auto Feeder Ikan Pintar',
    harga: 350000,
    satuan: '/unit',
    img: '/assets/products/auto-feeder.jpg',
    desk: 'Mesin pelempar pakan ikan otomatis cerdas dengan kontrol timer digital terintegrasi WiFi & telemetry IoT. Mencegah pakan terbuang (overfeeding), kapasitas 5 kg, dan jarak lontar hingga 4 meter.',
    feats: ['Timer Digital Presisi', 'Konektivitas WiFi / IoT', 'Kapasitas Tabung 5 Kg Pakan', 'Jarak Lontar 2-4 Meter'],
    sizes: ['Kapasitas 5 Kg', 'Kapasitas 10 Kg'],
    stok: 'ada',
    pop: false,
    kategori: 'Perangkat IoT',
    tags: ['Otomatisasi IoT', 'Hemat Pakan']
  },
  {
    id: 5,
    nama: 'Paket Kolam Bioflok D3',
    harga: 2500000,
    satuan: '/set',
    img: '/assets/products/kolam-d3.jpg',
    desk: 'Paket lengkap kolam terpal bundar diameter 3 meter tinggi 1.05 meter volume 7.4 m3. Menggunakan terpal semi-karet Orchid Jerman anti UV, rangka wiremesh galvanis M6 anti karat, dan sistem central bottom drain.',
    feats: ['Terpal Orchid Jerman Anti UV', 'Rangka Wiremesh M6 Galvanis', 'Central Drain 2 Inch Komplit', 'Kapasitas Hingga 1.000 Ekor'],
    sizes: ['Diameter 3m x Tinggi 1.05m'],
    stok: 'ada',
    pop: true,
    kategori: 'Peralatan Bioflok',
    tags: ['Paket Kolam', 'Rangka Galvanis']
  },
  {
    id: 6,
    nama: 'Paket Kolam Bioflok D4 Industri',
    harga: 3800000,
    satuan: '/set',
    img: '/assets/products/kolam-d4.jpg',
    desk: 'Paket kolam terpal bulat skala komersial diameter 4 meter tinggi 1.2 meter volume 15 m3 dengan instalasi central bottom drain dan pipa aerasi manifold komplit.',
    feats: ['Diameter 4m Volume 15m3', 'Rangka Besi Heavy-Duty Galvanis', 'Kapasitas 2.000 - 2.500 Ekor', 'Garansi Rangka 2 Tahun'],
    sizes: ['Diameter 4m x Tinggi 1.2m'],
    stok: 'ada',
    pop: false,
    kategori: 'Peralatan Bioflok',
    tags: ['Skala Industri', 'Komersial']
  },
  {
    id: 7,
    nama: 'Fillet Nila Premium Boneless',
    harga: 65000,
    satuan: '/pack (500g)',
    img: '/assets/products/nila-fillet.jpg',
    desk: 'Fillet daging ikan nila murni tanpa duri dan tanpa sisik, diproses higienis bersertifikasi HACCP. Dikemas vakum per 500 gram beku cepat IQF.',
    feats: ['100% Tanpa Duri & Sisik', 'Kemasan Vacuum Food-Grade', 'Sertifikasi Higienitas HACCP', 'Tekstur Daging Manis Segar'],
    sizes: ['Pack 500g', 'Pack 1kg'],
    stok: 'ada',
    pop: false,
    kategori: 'Olahan Siap Masak',
    tags: ['Tanpa Duri', 'HACCP Standard']
  },
  {
    id: 8,
    nama: 'Pakan Nila Grower Protein 32%',
    harga: 340000,
    satuan: '/sak (30kg)',
    img: '/assets/products/pakan-nila.jpg',
    desk: 'Pelet apung berkualitas tinggi dengan kandungan protein murni 32%, asam amino esensial, spirulina, dan multivitamin. FCR hemat 1.05 - 1.15.',
    feats: ['Kadar Protein Murni 32%', 'Pelet Apung Tahan Air', 'Formula Imunostimulan', 'Hemat FCR Pertumbuhan'],
    sizes: ['Sak 30kg'],
    stok: 'ada',
    pop: false,
    kategori: 'Pakan & Nutrisi',
    tags: ['Protein Tinggi', 'Pelet Apung']
  },
  {
    id: 9,
    nama: 'Probiotik Bioflok EM-Aquatic Complex',
    harga: 75000,
    satuan: '/botol (1 Liter)',
    img: '/assets/products/probiotik-bioflok.jpg',
    desk: 'Konsorsium mikroba probiotik unggul untuk mempercepat pembentukan flok nutrisi, mengurai amonia, dan menjaga kejernihan ekosistem kolam.',
    feats: ['Konsorsium Bacillus & Nitrosomonas', 'Mengurai Amonia Cepat', 'Membentuk Flok Bernutrisi', 'Hemat Kebutuhan Air'],
    sizes: ['Botol 1 Liter', 'Jerigen 5 Liter'],
    stok: 'ada',
    pop: false,
    kategori: 'Pakan & Nutrisi',
    tags: ['Amonia Stabilizer', 'Biofloc Starter']
  },
  {
    id: 10,
    nama: 'Sensor IoT Multi-Parameter Kolam',
    harga: 850000,
    satuan: '/unit',
    img: '/assets/products/sensor-iot.jpg',
    desk: 'Modul probe sensor submersible pemantau kualitas air real-time: suhu air, pH, dan kadar oksigen terlarut (DO) via konektivitas LoRa / WiFi.',
    feats: ['Pemantauan Suhu, pH, & DO Real-time', 'Koneksi WiFi / LoRa Jarak Jauh', 'Alert Notifikasi WhatsApp/App', 'Probe Tahan Korosi Air Tawar'],
    sizes: ['Unit Lengkap'],
    stok: 'ada',
    pop: false,
    kategori: 'Perangkat IoT',
    tags: ['Telemetri Kolam', 'Water Sensor']
  }
];

export const PLANT_CATEGORIES = [
  {
    id: 'cat1',
    nama: 'Ikan Segar Konsumsi',
    desk: 'Panen segar setiap pagi, bebas bau lumpur, bergaransi hidup atau fresh dingin.',
    img: '/assets/ikan-nila-bioflok.png',
    count: 'Harga Spesial Rp 35.000/kg'
  },
  {
    id: 'cat2',
    nama: 'Benih Unggul SKAI',
    desk: 'Benih Nila Nirwana & Nila Merah sertifikasi SKAI bersertifikat karantina resmi.',
    img: '/assets/products/benih-nila.jpg',
    count: 'Mulai Rp 250/ekor'
  },
  {
    id: 'cat3',
    nama: 'Paket Kolam Bioflok',
    desk: 'Kolam bundar Orchid D3 & D4, pipa drainase central drain, dan rangka galvanis.',
    img: '/assets/products/kolam-d3.jpg',
    count: 'Paket Siap Pasang'
  },
  {
    id: 'cat4',
    nama: 'Pakan & Nutrisi Bioflok',
    desk: 'Pelet protein 32% dan konsorsium mikroba probiotik pengurai amonia.',
    img: '/assets/products/probiotik-bioflok.jpg',
    count: 'Hemat FCR'
  }
];

export const TESTIMONIALS = [
  {
    id: 't1',
    nama: 'H. Sudrajat Purnama',
    peran: 'Pemilik Restoran Saung Nila Bakar, Bandung',
    teks: 'Ikan nila segar dari NilaFarm benar-benar juara. Dagingnya tebal, padat, manis gurih, dan sama sekali tidak ada aroma lumpur atau bau tanah. Pasokan stabil setiap pagi sangat membantu kelancaran bisnis kuliner kami.',
    rating: 5,
    avatar: 'SP',
    date: '03/10/26'
  },
  {
    id: 't2',
    nama: 'Drs. Agus Hendrawan',
    peran: 'Mitra Pembudidaya Bioflok 6 Kolam D3, Sumedang',
    teks: 'Beli paket kolam D3 dan benih Nirwana dari sini. Tim pendamping teknisnya sangat responsif memberikan arahan pembentukan flok dan aerasi. Hasil panen perdana tembus FCR 1.12 dan semua ikan laku diserap langsung!',
    rating: 5,
    avatar: 'AH',
    date: '29/09/26'
  },
  {
    id: 't3',
    nama: 'Ibu Ratna Paramitha',
    peran: 'Pelanggan Rumah Tangga, Jakarta Selatan',
    teks: 'Langganan beli nila segar kiloan dan nila bumbu siap goreng untuk keluarga. Pengemasan sangat rapi dan higienis, ikannya bersih tinggal masak. Rasanya manis alami dan anak-anak sangat suka.',
    rating: 5,
    avatar: 'RP',
    date: '25/09/26'
  }
];

export const DEFAULT_ARTICLES = [
  {
    id: 1,
    judul: 'Keunggulan Sistem Bioflok: Hemat Air, Pakan Efisien, dan Ramah Lingkungan',
    ringkas: 'Pelajari mengapa teknologi bioflok mampu menghemat air hingga 80% dan memangkas rasio konversi pakan (FCR) menjadi jauh lebih hemat dan menguntungkan.',
    tgl: '03 Okt 2026',
    author: 'Ir. Hendra Pratama (Spesialis Bioflok)',
    img: '/assets/products/kolam-d4.jpg',
    isi: [
      'Teknologi bioflok merupakan inovasi mutakhir dalam akuakultur modern yang memanfaatkan mikroorganisme heterotrof untuk mengubah limbah organik budidaya (feses dan sisa pakan) menjadi gumpalan nutrisi (flok) yang kaya protein.',
      'Keunggulan utama sistem bioflok pada ikan nila meliputi: efisiensi penggunaan air kolam tanpa perlu ganti setiap hari, penurunan FCR hingga 1.05 - 1.15 karena flok dimakan kembali oleh nila, dan kepadatan tebar yang mencapai 100-150 ekor per meter kubik.',
      'Selain itu, sirkulasi aerasi aktif dan probiotik mengeliminasi senyawa geosmin, menghasilkan daging nila yang sangat bersih, gurih, dan bebas bau lumpur.'
    ]
  },
  {
    id: 2,
    judul: 'Peluang Usaha Budidaya Nila Modern: Analisis Modal dan Potensi Keuntungan',
    ringkas: 'Rincian kalkulasi modal awal paket kolam bioflok D3, biaya operasional bibit dan pakan, hingga estimasi laba bersih panen 3-4 bulan.',
    tgl: '29 Sep 2026',
    author: 'Tim Riset Usaha Tani NilaFarm',
    img: '/assets/products/kolam-d3.jpg',
    isi: [
      'Permintaan pasar terhadap ikan nila segar terus meningkat. Dengan investasi 1 paket kolam D3 lengkap sekitar Rp 3.700.000 (aset 3-5 tahun) dan biaya operasional pakan serta bibit Rp 1.670.000 per siklus, petani mampu memanen hingga 316 kg nila.',
      'Pada harga jual Rp 35.000/kg, omzet kotor mencapai Rp 11.060.000 dan potensi laba bersih mencapai Rp 9.390.000 dalam tempo 90 hari.',
      'Sistem kemitraan dan kepastian serap pasar dari NilaFarm memberikan rasa aman bagi pembudidaya pemula maupun komersial.'
    ]
  },
  {
    id: 3,
    judul: 'Manajemen Kualitas Air Kolam Nila: Cara Mengontrol pH, DO, dan Senyawa Amonia',
    ringkas: 'Panduan teknis harian memantau parameter kimia air kolam nila bioflok agar ikan selalu sehat, nafsu makan stabil, dan terhindar dari penyakit.',
    tgl: '22 Sep 2026',
    author: 'Laboratorium Kualitas Air NilaFarm',
    img: '/assets/products/probiotik-bioflok.jpg',
    isi: [
      'Menjaga ekosistem air tetap prima adalah kunci sukses utama budidaya nila sistem bioflok.',
      'Oksigen Terlarut (DO) wajib dijaga di atas 4.0 mg/L dengan aerasi uniring 24 jam nonstop. Nilai pH optimal dijaga pada rentang 7.0 - 8.2.',
      'Pengendalian amonia dilakukan dengan penambahan molase sebagai sumber karbon untuk menjaga rasio C:N 10:1 sampai 15:1, mengubah amonia berbahaya menjadi flok bakteri bergizi tinggi.'
    ]
  }
];

export const DEFAULT_ORDERS = [
  {
    id: 'NL-202610-01',
    tanggal: '04 Okt 2026, 08:30 WIB',
    pelanggan: 'H. Sudrajat Purnama (Resto Saung Nila)',
    telepon: '0812-9876-5432',
    alamat: 'Jl. Raya Lembang No. 45, Bandung',
    items: [
      { id: 1, nama: 'Ikan Nila Segar Bioflok', qty: 50, harga: 35000 },
      { id: 2, nama: 'Nila Bumbu Siap Goreng', qty: 10, harga: 45000 }
    ],
    total: 2200000,
    metode: 'Transfer Bank Mandiri',
    catatan: 'Kirim hidup dengan mobil bak beroksigen, tiba sebelum jam 11 siang.',
    status: 'Terkirim',
    buktiBayar: '/assets/ikan-nila-bioflok.png'
  }
];

export const INITIAL_PONDS = [
  {
    id: 'kolam-1',
    nama: 'Kolam Bioflok D3 - Kolam A1',
    ukuran: 'Diameter 3 Meter (Volume 7.4 m³)',
    tebar: 1000,
    umurHari: 45,
    s: { temp: 28.4, ph: 7.4, do: 5.8, nh3: 0.08 },
    act: { aerator: true, pompa: false, feeder: true },
    hist: {
      temp: [28.1, 28.2, 28.4, 28.5, 28.4],
      ph: [7.3, 7.4, 7.4, 7.5, 7.4],
      do: [5.6, 5.7, 5.8, 5.9, 5.8],
      nh3: [0.09, 0.08, 0.08, 0.07, 0.08]
    }
  },
  {
    id: 'kolam-2',
    nama: 'Kolam Bioflok D4 - Kolam B1',
    ukuran: 'Diameter 4 Meter (Volume 15 m³)',
    tebar: 2200,
    umurHari: 75,
    s: { temp: 28.8, ph: 7.6, do: 6.2, nh3: 0.12 },
    act: { aerator: true, pompa: true, feeder: true },
    hist: {
      temp: [28.5, 28.6, 28.8, 28.7, 28.8],
      ph: [7.5, 7.6, 7.6, 7.7, 7.6],
      do: [6.0, 6.1, 6.2, 6.3, 6.2],
      nh3: [0.11, 0.12, 0.12, 0.13, 0.12]
    }
  }
];

export const INITIAL_DEVICES = [
  {
    id: 'dev-1',
    nama: 'LoRa Water Quality Gateway Sumedang',
    tipe: 'Gateway Multi-Kolam',
    status: 'online',
    baterai: '98%',
    signal: 'Kuat (-65 dBm)'
  },
  {
    id: 'dev-2',
    nama: 'Smart Auto Feeder Kolam A1',
    tipe: 'Dispenser Pakan IoT',
    status: 'online',
    baterai: '100% (AC)',
    signal: 'WiFi Sangat Baik'
  }
];

export const DEFAULT_THRESHOLDS = {
  tempMin: 25.0,
  tempMax: 32.0,
  phMin: 6.8,
  phMax: 8.5,
  doMin: 4.5,
  nh3Max: 0.25
};

export const GALLERY_ITEMS = [
  {
    id: 'g1',
    title: 'Panen Nila Segar Kolam D4',
    desc: 'Hasil panen padat dan seragam dari kolam bioflok sirkulasi terawat.',
    tag: 'Panen Segar',
    img: '/assets/products/kolam-d4.jpg'
  },
  {
    id: 'g2',
    title: 'Instalasi Kolam Bundar Bioflok D3',
    desc: 'Konstruksi rangka wiremesh galvanis dan terpal Orchid Jerman anti UV.',
    tag: 'Paket Kolam',
    img: '/assets/products/kolam-d3.jpg'
  },
  {
    id: 'g3',
    title: 'Sortasi Benih Nirwana Super',
    desc: 'Proses seleksi ukuran 5-7 cm berstandar sertifikasi SKAI.',
    tag: 'Bibit Unggul',
    img: '/assets/products/benih-nila.jpg'
  }
];
