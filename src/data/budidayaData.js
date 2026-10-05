// Data Budidaya & Penjualan Nila Bioflok Modern ("NilaFarm Indonesia")
// Produk Unggulan, Kategori, Ulasan, dan Parameter Budidaya

export const DEFAULT_PRODUCTS = [
  {
    id: 'p1',
    nama: 'Bibit Nila Nirwana Super (5-7 cm)',
    harga: 850,
    satuan: '/ekor',
    img: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=600&q=80',
    desk: 'Bibit Nila Nirwana strain unggul bersertifikasi SKAI. Tingkat kelangsungan hidup (SR) > 95%, pertumbuhan seragam, adaptif bioflok.',
    feats: ['Strain Nirwana Gen-3', 'Lolos Uji Karantina', 'FCR Rendah 1.1 - 1.2', 'Tersedia Ukuran S, M, L'],
    sizes: ['S (3-5 cm)', 'M (5-7 cm)', 'L (7-9 cm)'],
    stok: 'ada',
    pop: true,
    kategori: 'Bibit Unggul',
    tags: ['Bibit Unggul', 'Bersertifikat', 'Fast Growth']
  },
  {
    id: 'p2',
    nama: 'Ikan Nila Merah Bioflok Segar',
    harga: 36000,
    satuan: '/kg',
    img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
    desk: 'Ikan nila merah segar panen langsung dari kolam bioflok sirkulasi terawat. Bebas bau lumpur, rasa manis gurih alami, tekstur padat.',
    feats: ['Bebas Bau Tanah/Lumpur', 'Panen Hidup Same-Day', 'Ukuran 3-4 Ekor/kg', 'Kaya Omega-3'],
    sizes: ['Size S (5-6/kg)', 'Size M (3-4/kg)', 'Size L (1-2/kg)'],
    stok: 'ada',
    pop: true,
    kategori: 'Ikan Segar Konsumsi',
    tags: ['Best Seller', 'Bebas Bau Lumpur', 'Fresh Harvest']
  },
  {
    id: 'p3',
    nama: 'Fillet Nila Premium (Boneless & Skinless)',
    harga: 65000,
    satuan: '/pack (500g)',
    img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80',
    desk: 'Fillet daging ikan nila murni tanpa duri dan tanpa kulit. Diproses higienis standar HACCP, dikemas vacuum pack beku cepat.',
    feats: ['100% Tanpa Duri', 'HACCP Standard Packing', 'Siap Masak / Grill / Soup', 'Kemasan Vacuum Segel'],
    sizes: ['Pack 500g', 'Pack 1kg', 'Pack 2kg'],
    stok: 'ada',
    pop: false,
    kategori: 'Ikan Segar Konsumsi',
    tags: ['Siap Masak', 'HACCP Standard']
  },
  {
    id: 'p4',
    nama: 'Pakan Nila Grower Protein 32%',
    harga: 340000,
    satuan: '/sak (30kg)',
    img: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=600&q=80',
    desk: 'Pelet apung bernutrisi tinggi dengan formulasi protein 32%, asam amino lengkap, dan multivitamin untuk laju pembesaran maksimal.',
    feats: ['Protein Murni 32%', 'Pelet Apung Tahan Air', 'Formula Imunostimulan', 'Hemat FCR'],
    sizes: ['Sak 10kg', 'Sak 30kg', 'Tonase'],
    stok: 'ada',
    pop: true,
    kategori: 'Pakan & Nutrisi',
    tags: ['Protein Tinggi', 'Nutrisi Lengkap']
  },
  {
    id: 'p5',
    nama: 'Probiotik Bioflok EM-Aquatic Complex',
    harga: 75000,
    satuan: '/botol (1 Liter)',
    img: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=600&q=80',
    desk: 'Konsorsium bakteri probiotik Bacillus subtilis, Nitrosomonas, dan Nitrobacter. Mengurai amonia, membentuk flok padat, menjaga air jernih.',
    feats: ['Dekomposisi Amonia Cepat', 'Membentuk Flok Bernutrisi', 'Menekan Bakteri Patogen', 'Dosis 5ml / m3'],
    sizes: ['Botol 1 Liter', 'Jerigen 5 Liter', 'Pail 20 Liter'],
    stok: 'ada',
    pop: true,
    kategori: 'Pakan & Nutrisi',
    tags: ['Amonia Stabilizer', 'Biofloc Starter']
  },
  {
    id: 'p6',
    nama: 'Paket Starter Kit Kolam Bundar Bioflok D3',
    harga: 2850000,
    satuan: '/unit',
    img: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=600&q=80',
    desk: 'Unit kolam terpal semi-karet Orchid D3 komplit rangka besi wiremesh galvanis M6, pipa drainase central drain, selang uniring aerasi.',
    feats: ['Terpal Orchid Jerman D3', 'Rangka Wiremesh M6 Anti-Karat', 'Uniring Aerasi + Blower 100W', 'Kapasitas 2.500 Ekor'],
    sizes: ['Diameter 2m', 'Diameter 3m', 'Diameter 4m'],
    stok: 'ada',
    pop: false,
    kategori: 'Peralatan & Kolam',
    tags: ['Fullset Lengkap', 'Siap Pasang']
  }
];

export const PLANT_CATEGORIES = [
  {
    id: 'cat1',
    nama: 'Bibit Unggul',
    desk: 'Bibit Nila Nirwana & Nila Merah sertifikasi SKAI bersertifikat karantina.',
    img: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=600&q=80',
    count: '3 Strain Unggul'
  },
  {
    id: 'cat2',
    nama: 'Ikan Segar Konsumsi',
    desk: 'Panen segar bebas bau lumpur siap kirim hidup/dingin ke resto dan rumah tangga.',
    img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
    count: 'Panen Setiap Hari'
  },
  {
    id: 'cat3',
    nama: 'Pakan & Nutrisi',
    desk: 'Pelet protein tinggi 32% dan probiotik pemacu flok alami penghemat pakan.',
    img: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=600&q=80',
    count: 'Formula Khusus'
  },
  {
    id: 'cat4',
    nama: 'Peralatan & Kolam',
    desk: 'Kolam bundar Orchid, aerator uniring, dan sensor IoT kualitas air tambak.',
    img: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=600&q=80',
    count: 'Paket Siap Pakai'
  }
];

export const TESTIMONIALS = [
  {
    id: 't1',
    nama: 'Jennifer Budiarto',
    peran: 'Owner Seafood Restaurant, Bandung',
    teks: 'Ikan nila merah dari NilaFarm benar-benar istimewa. Tidak ada bau tanah sama sekali, dagingnya manis kenyal dan pelanggan kami sangat puas dengan kualitasnya.',
    rating: 5,
    avatar: 'JB',
    date: '02/10/26'
  },
  {
    id: 't2',
    nama: 'H. Lily Suherman',
    peran: 'Mitra Pembudidaya Bioflok D4, Subang',
    teks: 'Bibit Nirwana yang dikirim kondisi sangat prima dengan survival rate di atas 96%. Pendampingan tim teknis bioflok membuat FCR kolam saya tembus di angka 1.15.',
    rating: 5,
    avatar: 'LS',
    date: '28/09/26'
  },
  {
    id: 't3',
    nama: 'Max Satria',
    peran: 'Head Chef Resto Pondok Nila, Jakarta',
    teks: 'Pengiriman ikan segar hidup dalam kondisi dingin sangat higienis dan on-time. Fillet nila tanpa durinya konsisten ukuran dan standar potongannya luar biasa rapi.',
    rating: 5,
    avatar: 'MS',
    date: '22/09/26'
  },
  {
    id: 't4',
    nama: 'Catherine Wijaya',
    peran: 'Pelanggan Rumah Tangga, Tangerang',
    teks: 'Pesan fillet nila fresh pack untuk MPASI dan masakan anak. Sangat bersih, tanpa duri, packaging rapi kedap udara dan rasanya sangat manis alami.',
    rating: 5,
    avatar: 'CW',
    date: '15/09/26'
  },
  {
    id: 't5',
    nama: 'Francis Iskandar',
    peran: 'Ketua Kelompok Tani Mandiri, Bogor',
    teks: 'Paket kolam bundar D3 dan starter kit probiotik sangat lengkap dan kokoh. Mulai tebar benih hingga panen dibimbing langsung sampai berhasil.',
    rating: 5,
    avatar: 'FI',
    date: '08/09/26'
  }
];

export const DEFAULT_ARTICLES = [
  {
    id: 'a1',
    judul: 'How to Diagnose Yellow Leaves: A Guide by Plant Doctor',
    ringkas: 'Discover the most common culprits behind yellow foliage and how to nurse your indoor plant back to peak vibrant green.',
    tgl: '18 Sep 2026',
    author: 'Dr. Chloe Vance, Botanist',
    img: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80',
    content: 'Overwatering, nutrient deficiency, or low ambient humidity are the primary causes of yellow leaves in indoor greenery...'
  },
  {
    id: 'a2',
    judul: 'Top 7 Non-Toxic Plants That Are 100% Safe for Dogs and Cats',
    ringkas: 'A comprehensive curated list of stunning houseplants you can proudly display without worrying about your furry friends.',
    tgl: '14 Sep 2026',
    author: 'Grow, Inc. Pet Safety Team',
    img: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80',
    content: 'From the lush Parlor Palm to delicate Peperomia and vibrant Calathea, creating a pet-safe urban jungle has never been easier...'
  }
];

export const DEFAULT_ORDERS = [
  {
    id: 'PL-948201',
    tanggal: '02 Oct 2026, 10:15 EST',
    pelanggan: 'Jennifer Bell',
    telepon: '+1 (514) 892-4100',
    alamat: '450 Rue Saint-Denis, Montreal, QC H2X 3L3',
    items: [
      { id: 'p2', nama: 'Parlor Palm (Size M)', qty: 1, harga: 30 },
      { id: 'p5', nama: 'Monstera Deliciosa (Size L)', qty: 1, harga: 30 }
    ],
    total: 60,
    metode: 'Credit Card (Stripe)',
    catatan: 'Please leave in the lobby with reception.',
    status: 'Delivered',
    buktiBayar: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80'
  }
];

export const INITIAL_PONDS = [];
export const INITIAL_DEVICES = [];
export const DEFAULT_THRESHOLDS = {};

export const GALLERY_ITEMS = [
  {
    id: 'g1',
    title: 'Indoor Botanical Greenhouse',
    desc: 'Controlled climate nursery with humidity regulation for rare tropical specimens.',
    tag: 'Nursery',
    img: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'g2',
    title: 'Monstera & Fiddle Leaf Nursery',
    desc: 'Large architectural plants ready for modern apartment living.',
    tag: 'Large Plants',
    img: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'g3',
    title: 'Ceramic Planter Studio',
    desc: 'Handcrafted stoneware pots in earthy tones and minimalist textures.',
    tag: 'Pots & Pottery',
    img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80'
  }
];
