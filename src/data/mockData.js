// Mock data for CONTRACTOR.HUB & Budidaya Nila Modern

export const TEMPLATE_PRODUCTS = [
  {
    id: 'prod-1',
    nama: 'Paket Kolam Bundar Bioflok D4 Heavy-Duty',
    category: 'Paket Kolam',
    harga: 8500000,
    satuan: ' / unit komplit',
    desk: 'Kolam bundar diameter 4 meter dengan rangka wiremesh galvanis M8, terpal semi-karet Orca tebal 0.8mm, dan central drain terintegrasi.',
    specs: ['Diameter 4m, Tinggi 1.2m', 'Rangka Galvanis Hot-Dip M8', 'Terpal PVC Orca 0.8mm', 'Pipa Central Drain 2 inch'],
    feats: ['Siap pakai & rakit cepat', 'Kapasitas 3.000 - 5.000 ekor nila', 'Garansi terpal 2 tahun'],
    populer: true,
    stok: 'Tersedia'
  },
  {
    id: 'prod-2',
    nama: 'Template Desain & Blueprint Bioflok Komersial',
    category: 'Template Desain',
    harga: 450000,
    satuan: ' / set dokumen',
    desk: 'Gambar kerja CAD, layout sirkulasi pipa pembuangan sentral, instalasi aerasi ring-blower, dan template kalkulator RAB Excel.',
    specs: ['Format DWG & PDF High-Res', 'RAB & Simulasi Cashflow Excel', 'SOP Pembuatan Flok Lengkap'],
    feats: ['Instruksi step-by-step', 'Kalkulasi kebutuhan pakan & listrik', 'Free update revisi 1x'],
    populer: false,
    stok: 'Digital Instant Download'
  },
  {
    id: 'prod-3',
    nama: 'Smart IoT Gateway & Sensor Node Kualitas Air',
    category: 'Perangkat IoT',
    harga: 3200000,
    satuan: ' / kit sistem',
    desk: 'Modul pemantauan telemetri nirkabel untuk monitoring pH, suhu air, DO (oksigen terlarut), dan kendali otomatis aktuator aerator.',
    specs: ['Probe pH Industrial Grade', 'Sensor Suhu Waterproof DS18B20', 'Konektivitas WiFi / GSM 4G', 'Relay 4-Channel 16A'],
    feats: ['Alert WhatsApp instan', 'Aplikasi monitoring web & mobile', 'Logging data cloud 1 tahun'],
    populer: true,
    stok: 'Tersedia'
  },
  {
    id: 'prod-4',
    nama: 'Paket Kolam Bioflok D3 Praktis',
    category: 'Paket Kolam',
    harga: 5900000,
    satuan: ' / unit komplit',
    desk: 'Ideal untuk lahan pekarangan rumah atau pemula budidaya dengan daya tampung 1.500 - 2.500 ekor nila sehat.',
    specs: ['Diameter 3m, Tinggi 1.05m', 'Rangka Galvanis Anti-Karat', 'Terpal Orca UV Resistant'],
    feats: ['Instalasi hemat tempat', 'Sirkulasi mudah dikontrol', 'Garansi kebocoran 1 tahun'],
    populer: false,
    stok: 'Tersedia'
  },
  {
    id: 'prod-5',
    nama: 'Benih Nila Hitam & Merah Unggul (Grade A)',
    category: 'Benih & Pakan',
    harga: 650,
    satuan: ' / ekor (min. 500 ekor)',
    desk: 'Benih ukuran 5–8 cm hasil seleksi ketat, gerak aktif, bebas parasit, dan memiliki laju pertumbuhan seragam.',
    specs: ['Ukuran 5–8 cm seragam', 'Sertifikasi Bebas Penyakit', 'Daya adaptasi flok tinggi'],
    feats: ['Garansi hidup 3 hari tebar', 'Gratis panduan aklimatisasi', 'Packing beroksigen tahan 18 jam'],
    populer: false,
    stok: 'Ready Stok Panen'
  },
  {
    id: 'prod-6',
    nama: 'Auto-Feeder Pintar Kapasitas 20 Kg',
    category: 'Perangkat IoT',
    harga: 1750000,
    satuan: ' / unit',
    desk: 'Pemberi pakan otomatis presisi berbasis timer digital & timer IoT dengan tabung anti-lembab dan solar panel ready.',
    specs: ['Kapasitas tabung 20 kg pelet', 'Akurasi sebar pakan 360°', 'Pengaturan jadwal via dashboard'],
    feats: ['Mengurangi pemborosan pakan', 'Target FCR 1.2 tercapai', 'Hemat tenaga kerja harian'],
    populer: false,
    stok: 'Tersedia'
  }
];

export const PORTFOLIO_PROJECTS = [
  {
    id: 'port-1',
    title: 'Cluster 4 Kolam Bioflok D4 Sumedang',
    category: 'Konstruksi Bioflok',
    client: 'NilaFarm Demo Site',
    lokasi: 'Cimalaka, Sumedang',
    kapasitas: '15.000 Ekor Nila',
    status: 'Operasional Aktif (Panen Rutin)',
    desk: 'Pembangunan terintegrasi 4 unit kolam bundar D4 dengan kanopi UV, central drainage pipa 2.5 inch, dan otomasi aerasi IoT.',
    stats: { fcr: '1.18', survival: '95%', harvestDays: '88 Hari' },
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    tags: ['Kolam Bundar D4', 'Rangka Galvanis', 'Sensor IoT', 'Kanopi UV']
  },
  {
    id: 'port-2',
    title: 'Instalasi Kolam Beton RAS & Smart Bioflok',
    category: 'Sistem RAS & Beton',
    client: 'Agro Mandiri Sejahtera',
    lokasi: 'Tanjungsari, Jawa Barat',
    kapasitas: '25.000 Ekor Nila & Gurame',
    status: 'Selesai 100%',
    desk: 'Konstruksi sipil kolam beton bertulang dengan sistem filter mekanis bertingkat, vortex separator, dan monitoring telemetri 24 jam.',
    stats: { fcr: '1.22', survival: '93%', harvestDays: '92 Hari' },
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    tags: ['Kolam Beton', 'Filter Vortex', 'Otomasi Pompa', 'Sistem RAS']
  },
  {
    id: 'port-3',
    title: 'Modernisasi Greenhouse & Kolam D3 Perumahan',
    category: 'Urban Aquaculture',
    client: 'Bpk. Hendra S.',
    lokasi: 'Bandung Timur',
    kapasitas: '4.500 Ekor Nila Merah',
    status: 'Selesai 100%',
    desk: 'Desain kompak kolam D3 di lahan sempit 10x12m berkanopi polycarbonat, minim limbah dengan integrasi aquaponik sayuran kangkung.',
    stats: { fcr: '1.15', survival: '96%', harvestDays: '85 Hari' },
    image: 'https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=800&q=80',
    tags: ['Urban Farming', 'Kolam D3', 'Aquaponik', 'Zero Waste']
  }
];

export const INITIAL_PONDS = [
  {
    id: 'K-A1',
    name: 'Kolam A1',
    type: 'Bioflok • D4 Bundar',
    fish: 2500,
    age: 45,
    s: { temp: 28.4, ph: 7.20, do: 6.4, nh3: 0.12, turb: 18, level: 82 },
    act: { aerator: true, pompa: false, feeder: true },
    hist: {
      temp: [28.1, 28.2, 28.3, 28.5, 28.4, 28.4],
      ph: [7.15, 7.18, 7.22, 7.20, 7.19, 7.20],
      do: [6.1, 6.2, 6.5, 6.4, 6.3, 6.4],
      nh3: [0.10, 0.11, 0.12, 0.13, 0.12, 0.12]
    }
  },
  {
    id: 'K-A2',
    name: 'Kolam A2',
    type: 'Bioflok • D4 Bundar',
    fish: 2500,
    age: 32,
    s: { temp: 29.1, ph: 7.50, do: 5.2, nh3: 0.21, turb: 24, level: 76 },
    act: { aerator: true, pompa: false, feeder: true },
    hist: {
      temp: [28.8, 29.0, 29.2, 29.1, 29.0, 29.1],
      ph: [7.45, 7.48, 7.52, 7.50, 7.49, 7.50],
      do: [5.0, 5.1, 5.3, 5.2, 5.1, 5.2],
      nh3: [0.18, 0.19, 0.22, 0.21, 0.20, 0.21]
    }
  },
  {
    id: 'K-B1',
    name: 'Kolam B1',
    type: 'Bioflok • D4 Bundar',
    fish: 1800,
    age: 58,
    s: { temp: 27.6, ph: 6.90, do: 7.1, nh3: 0.08, turb: 12, level: 90 },
    act: { aerator: false, pompa: true, feeder: true },
    hist: {
      temp: [27.4, 27.5, 27.7, 27.6, 27.5, 27.6],
      ph: [6.85, 6.88, 6.92, 6.90, 6.89, 6.90],
      do: [6.9, 7.0, 7.2, 7.1, 7.0, 7.1],
      nh3: [0.07, 0.08, 0.09, 0.08, 0.07, 0.08]
    }
  },
  {
    id: 'K-B2',
    name: 'Kolam B2',
    type: 'Sistem RAS • Beton',
    fish: 3200,
    age: 21,
    s: { temp: 30.2, ph: 8.10, do: 4.8, nh3: 0.31, turb: 28, level: 72 },
    act: { aerator: true, pompa: true, feeder: false },
    hist: {
      temp: [29.8, 30.0, 30.3, 30.2, 30.1, 30.2],
      ph: [8.05, 8.08, 8.12, 8.10, 8.09, 8.10],
      do: [4.6, 4.7, 4.9, 4.8, 4.7, 4.8],
      nh3: [0.28, 0.29, 0.32, 0.31, 0.30, 0.31]
    }
  }
];

export const INITIAL_DEVICES = [
  { id: 'GW-01', name: 'Gateway Utama LoRa & 4G', kind: 'Gateway', pond: 'Seluruh Kolam', batt: 100, sig: 98, online: true, fw: 'v2.4.1' },
  { id: 'NODE-A1', name: 'Sensor Telemetri Kolam A1', kind: 'Sensor Multi-probe', pond: 'Kolam A1', batt: 87, sig: 84, online: true, fw: 'v1.9.0' },
  { id: 'NODE-A2', name: 'Sensor Telemetri Kolam A2', kind: 'Sensor Multi-probe', pond: 'Kolam A2', batt: 76, sig: 79, online: true, fw: 'v1.9.0' },
  { id: 'NODE-B1', name: 'Sensor Telemetri Kolam B1', kind: 'Sensor Multi-probe', pond: 'Kolam B1', batt: 92, sig: 88, online: true, fw: 'v1.9.0' },
  { id: 'ACT-01', name: 'Kontroler Otomasi Aerator', kind: 'Aktuator 4-Ch', pond: 'Kolam A1, A2, B2', batt: 100, sig: 92, online: true, fw: 'v1.2.0' },
  { id: 'ACT-02', name: 'Smart Auto-Feeder 20kg', kind: 'Feeder Otomatis', pond: 'Kolam A1 & A2', batt: 68, sig: 75, online: true, fw: 'v1.2.0' }
];

export const ARTICLES = [
  {
    id: 'a1',
    date: '12 Sep 2026',
    title: 'Bioflok D4: Panen 90 Hari dari Kolam Bundar Rangka Galvanis',
    author: 'Tim Engineering CONTRACTOR.HUB',
    summary: 'Analisis teknis mengapa kolam bundar D4 dengan kemiringan sentral 5% menghasilkan sirkulasi flok paling efisien dan memangkas waktu pemeliharaan.',
    content: [
      'Kolam bundar diameter 4 meter (D4) memiliki volume efektif sekitar 12.000 liter. Keunggulan bentuk lingkaran ini mencegah titik mati (dead zone) tempat berkumpulnya endapan feses dan sisa pakan.',
      'Dengan penempatan diffuser aerasi annular di dasar kolam, partikel flok tersuspensi sempurna sehingga bakteri heterotrof mampu mengubah nitrogen amonia beracun menjadi protein sel tunggal yang dimakan kembali oleh ikan nila.',
      'Hasil evaluasi pada 4 siklus panen kami menunjukkan rasio konversi pakan (FCR) konsisten di angka 1.15 hingga 1.20, dengan bobot panen rata-rata 600-800 gram per ekor dalam rentang 90 hari kalender.'
    ]
  },
  {
    id: 'a2',
    date: '5 Sep 2026',
    title: 'Manajemen Pakan & Otomasi: Trik Mencapai FCR 1.2 Daging Gurih',
    author: 'Spesialis Nutrisi Budidaya',
    summary: 'Penerapan jadwal pakan mikro terbagi 3 sesi dengan auto-feeder IoT dan puasa pra-panen untuk menghasilkan cita rasa daging nila segar bebas aroma lumpur.',
    content: [
      'FCR 1.2 berarti hanya dibutuhkan 1.2 kg pelet untuk memproduksi 1 kg daging ikan nila padat. Hal ini hanya bisa dicapai bila pakan diberikan pada saat nafsu makan ikan dan kadar oksigen terlarut (DO) berada pada puncaknya (> 5 mg/L).',
      'Integrasi sensor DO dengan auto-feeder mencegah feeding saat DO kolam turun drastis, sehingga tidak terjadi pemborosan pakan yang terbuang sia-sia ke dasar air.',
      'Satu hari sebelum jadwal pemanenan, kolam dipuasakan 24 jam dengan sirkulasi air bersih agar pencernaan ikan bersih, menghasilkan daging yang higienis, manis, dan bertekstur kenyal tanpa aroma tanah.'
    ]
  },
  {
    id: 'a3',
    date: '28 Agu 2026',
    title: 'Kunci Survival 95%: Aklimatisasi Suhu & Konstruksi Anti-Stres',
    author: 'Tim Lapangan CONTRACTOR.HUB',
    summary: 'Langkah kritis 30 menit awal penebaran benih, standarisasi padat tebar 100 ekor/m², dan proteksi terpal halus standar food grade.',
    content: [
      'Kegagalan budidaya nila 70% terjadi di 7 hari pertama akibat syok osmotik dan stres termal saat benih ditransfer dari wadah angkut ke air kolam pembesaran.',
      'Prosedur standar kami mewajibkan aklimatisasi bertahap: kantong benih diinapkan terapung 20 menit, lalu air kolam dicampur perlahan per 5 menit sebelum benih berenang keluar sendiri.',
      'Terpal Orca PVC food-grade yang kami gunakan memiliki permukaan halus bebas zat kimia beracun, melindungi sisik halus benih nila dari lecet yang sering memicu infeksi jamur Saprolegnia.'
    ]
  }
];

export const TESTIMONIALS = [
  {
    name: 'Ir. Bambang Triyono',
    role: 'Pengusaha Budidaya Mandiri, Sumedang',
    comment: 'Instalasi 4 kolam D4 dari tim CONTRACTOR.HUB sangat rapi dan kokoh. Sistem sirkulasi sentralnya bekerja sempurna, dan dashboard IoT-nya membuat saya tenang memantau kolam dari kantor.',
    rating: 5,
    tag: '4 Unit Kolam D4'
  },
  {
    name: 'Siti Rahmawati, S.Pt',
    role: 'Pengelola Agro Edukasi, Bandung',
    comment: 'Kualitas terpal dan rangka pipa galvanisnya jauh di atas standar pasaran. Sangat awet, benih nila sehat dan aktif. FCR panen pertama kami tembus 1.19!',
    rating: 5,
    tag: 'Paket Komplit & Benih'
  },
  {
    name: 'Dedi Kurniawan',
    role: 'Kontraktor Sipil & Mitra Proyek',
    comment: 'Kerjasama dengan CONTRACTOR.HUB selalu memuaskan. Gambar kerja blueprint jelas, RAB presisi, dan tim teknis sangat responsif saat instalasi aerasi.',
    rating: 5,
    tag: 'Mitra Konstruksi'
  }
];
