// Data configuration for NilaFarm IoT & Smart Biofloc Aquaculture

export const DEFAULT_PRODUCTS = [
  {
    id: 'p1',
    nama: 'Nila Konsumsi Segar',
    harga: 38000,
    satuan: '/kg',
    img: '/assets/products/nila-segar.jpg',
    desk: 'Ukuran 500–800 gram per ekor, kondisi hidup & segar dipanen pagi hari.',
    feats: ['Dipanen langsung pagi hari', 'Pembersihan & sisik gratis', 'Min. order 1 kg', 'Bebas formalin & bau lumpur'],
    stok: 'ada',
    pop: false,
    kategori: 'Ikan Konsumsi'
  },
  {
    id: 'p2',
    nama: 'Nila Fillet Premium Vakum',
    harga: 65000,
    satuan: '/kg',
    img: '/assets/products/nila-fillet.jpg',
    desk: 'Daging fillet tanpa tulang & duri, higienis dikemas vakum 500g.',
    feats: ['100% tanpa tulang & kulit', 'Kemasan kedap udara higienis', 'Cocok untuk resto & catering', 'Tahan beku hingga 3 bulan'],
    stok: 'ada',
    pop: true,
    kategori: 'Olahan Siap Masak'
  },
  {
    id: 'p3',
    nama: 'Benih Nila Hitam & Merah Unggul',
    harga: 600,
    satuan: '/ekor',
    img: '/assets/products/benih-nila.jpg',
    desk: 'Ukuran 5–8 cm hasil seleksi ketat, gesit, aktif dan tahan fluktuasi cuaca.',
    feats: ['Min. order 100 ekor', 'Gratis konsultasi tebar & aklimatisasi', 'Garansi hidup 3 hari pertama', 'Daya adaptasi bioflok tinggi'],
    stok: 'ada',
    pop: false,
    kategori: 'Benih Unggul'
  },
  {
    id: 'p4',
    nama: 'Paket Kolam Bundar Bioflok D4',
    harga: 8500000,
    satuan: '/unit',
    img: '/assets/products/kolam-d4.jpg',
    desk: 'Kolam diameter 4 meter komplit rangka galvanis M8 dan terpal semi-karet Orca.',
    feats: ['Kapasitas 3.000 - 5.000 ekor', 'Pipa central drain 2.5 inch', 'Blower & uniring aerasi terpasang', 'Garansi terpal 2 tahun'],
    stok: 'ada',
    pop: false,
    kategori: 'Peralatan Bioflok'
  },
  {
    id: 'p5',
    nama: 'Smart IoT Gateway & Probe Sensor Kit',
    harga: 3200000,
    satuan: '/paket',
    img: '/assets/products/sensor-iot.jpg',
    desk: 'Perangkat monitoring multi-probe nirkabel (pH, DO, Suhu, TDS) + konektivitas cloud.',
    feats: ['Probe industrial grade waterproof', 'Relay 4 channel aktuator otomatis', 'Notifikasi bahaya via WhatsApp', 'Akses dashboard seumur hidup'],
    stok: 'ada',
    pop: true,
    kategori: 'Perangkat IoT'
  },
  {
    id: 'p6',
    nama: 'Smart Auto-Feeder 20 Kg',
    harga: 1750000,
    satuan: '/unit',
    img: '/assets/products/auto-feeder.jpg',
    desk: 'Pemberi pakan otomatis presisi berbasis timer IoT, tabung kedap cuaca.',
    feats: ['Kapasitas pelet 20 kg', 'Sebar pakan merata 360°', 'Jadwal fleksibel via aplikasi', 'Pangkas FCR hingga 1.18'],
    stok: 'ada',
    pop: false,
    kategori: 'Perangkat IoT'
  },
  {
    id: 'p7',
    nama: 'Nila Bumbu Kuning Siap Goreng (Vakum)',
    harga: 48000,
    satuan: '/pack 500g',
    img: '/assets/products/nila-bumbu.jpg',
    desk: 'Ikan nila segar marinasi bumbu rempah kuning alami khas Sumedang, siap langsung digoreng atau dibakar.',
    feats: ['Bumbu rempah kuning alami', 'Tanpa pengawet sintetik', 'Kemasan vakum higienis', 'Praktis tinggal goreng/bakar'],
    stok: 'ada',
    pop: true,
    kategori: 'Olahan Siap Masak'
  },
  {
    id: 'p8',
    nama: 'Pakan Pelet Apung Nila Grower (25 Kg)',
    harga: 320000,
    satuan: '/sak 25kg',
    img: '/assets/products/pakan-nila.jpg',
    desk: 'Pakan apung protein 32% tinggi asam amino esensial untuk percepatan pertumbuhan nila bioflok.',
    feats: ['Kadar protein min. 32%', 'Pelet apung tahan air 30 menit', 'Mendukung target FCR 1.18', 'Air kolam tetap jernih'],
    stok: 'ada',
    pop: false,
    kategori: 'Peralatan Bioflok'
  },
  {
    id: 'p9',
    nama: 'Probiotik Bioflok Multi-Strain (1 Liter)',
    harga: 85000,
    satuan: '/botol 1L',
    img: '/assets/products/probiotik-bioflok.jpg',
    desk: 'Kultur konsorsium bakteri Bacillus subtilis & Lactobacillus untuk pembentukan flok aktif dan penekan amonia.',
    feats: ['Kepadatan bakteri 10^9 CFU/ml', 'Mengurai amonia & sisa pakan', 'Menjaga kestabilan pH air', 'Meningkatkan imunitas ikan'],
    stok: 'ada',
    pop: false,
    kategori: 'Peralatan Bioflok'
  },
  {
    id: 'p10',
    nama: 'Paket Kolam Bundar Bioflok D3 Praktis',
    harga: 5900000,
    satuan: '/unit',
    img: '/assets/products/kolam-d3.jpg',
    desk: 'Kolam diameter 3 meter komplit rangka galvanis anti-karat dan aerator uniring, ideal untuk pekarangan rumah.',
    feats: ['Kapasitas 1.500 - 2.500 ekor', 'Rangka wiremesh galvanis M8', 'Pipa central drain 2 inch', 'Garansi terpal 1 tahun'],
    stok: 'ada',
    pop: false,
    kategori: 'Peralatan Bioflok'
  }
];

export const DEFAULT_ARTICLES = [
  {
    id: 'a1',
    tgl: '12 Sep 2026',
    judul: 'Bioflok D4: Panen 90 Hari dari Kolam Bundar Rangka Galvanis',
    kategori: 'Teknik Bioflok',
    penulis: 'Hamdan Russ (Owner & Praktisi NilaFarm)',
    bacaWaktu: '6 menit baca',
    img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    ringkas: 'Kenapa kolam bundar D4 jadi favorit farm kami di Sumedang — plus jadwal tebar harian hingga panen raya.',
    keyPoints: [
      'Volume air efektif 12-14 m³ dengan central drain vortex 2 inch',
      'Suplai oksigen terlarut (DO) stabil di atas 4.5 mg/L selama 24 jam nonstop',
      'Kepadatan tebar optimal 2.500 - 3.500 ekor benih nila ukuran 5-8 cm',
      'FCR panen rata-rata 1.15 - 1.22 dengan masa pemeliharaan 90-105 hari'
    ],
    isi: [
      'Kolam bundar diameter 4 meter (D4) dengan ketinggian terpal 1.2 meter merupakan standar emas dalam budidaya ikan nila intensif modern di NilaFarm Sumedang. Dengan volume air operasional berkisar antara 12 hingga 14 meter kubik, kolam ukuran ini mampu menampung populasi antara 2.500 hingga 3.500 ekor benih nila unggul ukuran 5–8 cm tanpa memicu fenomena kanibalisme maupun penurunan laju pertumbuhan.',
      'Keunggulan mekanis utama dari bentuk bundar dibanding kolam persegi tradisional adalah terciptanya arus pusaran air (vortex effect) yang konsisten berkat semburan uniring aerator di sekeliling dasar kolam. Arus melingkar ini secara alami menggiring kotoran feses ikan, sisa flok tua, dan partikel organik tepat ke arah lubang pembuangan tengah (central drain). Dengan membuka kran pipa drain selama 10-15 detik setiap 2 hari sekali, endapan kotoran dapat dibuang keluar tanpa perlu menyedot air dalam jumlah besar.',
      'Sistem bioflok bekerja mengandalkan konsorsium bakteri heterotrof (didominasi strain Bacillus subtilis, Bacillus licheniformis, dan Lactobacillus) yang sengaja dikultur sejak masa persiapan air (H-7 sebelum tebar). Bakteri mengonversi senyawa amonia beracun (NH3/NH4+) dari air limbah menjadi massa sel mikroba padat protein (flok). Gumpalan flok ini kemudian dimakan kembali oleh ikan nila yang secara biologis bersifat omnivora-filter feeder, sehingga menghemat biaya pakan komersial secara signifikan.',
      'Kunci kritis yang tidak boleh ditawar dalam sistem bioflok D4 adalah kecukupan suplai oksigen terlarut (Dissolved Oxygen / DO). Bakteri bioflok dan ribuan ekor ikan nila sama-sama mengonsumsi oksigen sepanjang waktu. Target DO harus selalu dipertahankan di atas 4.5 mg/L, terutama di rentang jam-jam kritis antara pukul 01:00 hingga 05:30 pagi saat fotosintesis fitoplankton terhenti. Di farm kami, blower aerasi cadangan dilengkapi sistem switching otomatis berbasis sensor IoT yang akan langsung mengambil alih daya jika suplai listrik utama terputus.',
      'Pada hari ke-90 hingga ke-105 pasca tebar, bobot individu ikan nila mencapai ukuran panen konsumsi yaitu 500 hingga 800 gram per ekor (isi 1-2 ekor per kg). Dengan tingkat kelangsungan hidup (Survival Rate / SR) mencapai 92-94%, satu kolam D4 mampu memproduksi biomassa panen sekitar 1.3 hingga 1.6 ton ikan nila segar berdaging tebal, manis alami, dan dijamin 100% bebas dari aroma bau lumpur tambak tanah.'
    ],
    comments: [
      {
        id: 'c1',
        nama: 'Asep Supriatna',
        email: 'asep.farm@gmail.com',
        tgl: '14 Sep 2026',
        pesan: 'Pak Hamdan, untuk kolam D4 apakah cukup memakai blower aerator 100 watt atau harus minimal 120 watt? Saya rencana bikin 2 kolam di pekarangan rumah.',
        reply: 'Halo Kang Asep, untuk 1 kolam D4 dengan kedalaman 1 meter tebar 2.500 ekor, kami rekomendasikan minimal blower 100W–120W (tipe Resun LP-100 atau sekelasnya) disambungkan ke 4-6 titik uniring aerator agar DO stabil di atas 5.0 mg/L.'
      },
      {
        id: 'c2',
        nama: 'Dr. Hendra Gunawan',
        email: 'hgunawan@yahoo.co.id',
        tgl: '16 Sep 2026',
        pesan: 'Penjelasan vortex central drain sangat aplikatif. Apakah ada endapan lumpur yang menyumbat pipa central drain jika aerasi mati sebentar?',
        reply: 'Terima kasih Dokter Hendra. Jika pipa drain menggunakan kemiringan minimal 5-7 derajat dari dasar dan diameter minimal 2 inch, kotoran tidak akan mengeras menyumbat asalkan rutin di-flushing 10 detik setiap 2 hari.'
      }
    ]
  },
  {
    id: 'a2',
    tgl: '5 Sep 2026',
    judul: 'Atur Pakan Biar FCR 1,2: Daging Gurih, Padat & Tidak Bau Lumpur',
    kategori: 'Manajemen Pakan',
    penulis: 'Hamdan Russ (Owner & Praktisi NilaFarm)',
    bacaWaktu: '5 menit baca',
    img: 'https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=800&q=80',
    ringkas: 'Formula takaran pelet harian + pakan hijau alami rahasia tekstur daging nila premium tanpa amis tanah.',
    keyPoints: [
      'Pemberian pakan terukur 3 kali sehari (07:30, 12:30, 17:00)',
      'Persentase pakan harian 2.5% - 3.2% dari total biomassa ikan',
      'Pemberian pakan hijau alami (Azolla Microphylla & Daun Pepaya) 2x seminggu',
      'Rasio FCR rendah 1.18 menghemat biaya produksi pakan hingga 30%'
    ],
    isi: [
      'FCR (Feed Conversion Ratio) sebesar 1.2 memiliki arti matematis bahwa setiap 1.2 kilogram pakan pelet komersial yang kita tebarkan mampu dikonversi menjadi 1 kilogram pertambahan daging ikan nila utuh. Angka ini jauh lebih efisien dibandingkan rata-rata tambak konvensional yang kerap mencatat FCR boros di kisaran 1.6 hingga 1.9 akibat pemberian pakan secara berlebihan (overfeeding) yang akhirnya hanya menjadi endapan racun di dasar kolam.',
      'Di NilaFarm Sumedang, kami menerapkan disiplin feeding regime yang ketat dalam 3 interval waktu: pukul 07:30 pagi (30% dari kuota harian), pukul 12:30 siang (30%), dan pukul 17:00 sore menjelang maghrib (40%). Sebelum jam makan pertama, kualitas air (DO dan suhu) dicek terlebih dahulu. Jika suhu air kolam di bawah 26°C atau di atas 32°C, metabolisme ikan melambat dan nafsu makan menurun, sehingga takaran pakan wajib dipangkas 20-30% untuk menghindari pelet mengambang tak termakan.',
      'Sampling biomassa ikan dilakukan rutin setiap 14 hari sekali. Kami mengambil acak 30 ekor ikan, ditimbang bersama untuk menghitung bobot rata-rata (Average Body Weight / ABW). Dari data ABW dikalikan estimasi populasi hidup, diperoleh total biomassa kolam. Kuota pakan harian ditetapkan 3.0% dari biomassa pada bulan pertama tebar, dan bertahap diturunkan menjadi 2.2% - 2.5% pada bulan ketiga saat ukuran ikan sudah mencapai bobot di atas 400 gram.',
      'Rahasia aroma daging nila NilaFarm yang bersih dan bebas dari bau amis tanah (geosmin) adalah kombinasi air aerasi bioflok tanpa dasar lumpur serta introduksi pakan hijau alami. Setiap hari Rabu dan Sabtu, kami memberikan tanaman air Azolla Microphylla segar yang tinggi protein nabati serta daun pepaya cincang. Daun pepaya mengandung enzim papain yang memperlancar pencernaan ikan serta menekan parasit usus, sementara Azolla memberikan serat alami yang membuat daging ikan lebih kenyal dan bercita rasa gurih manis.'
    ],
    comments: [
      {
        id: 'c3',
        nama: 'Budi Hartono',
        email: 'budi.h@pertanian.id',
        tgl: '8 Sep 2026',
        pesan: 'Untuk bibit azolla apakah bisa dibudidayakan sendiri di samping kolam bioflok Pak? Sangat tertarik dengan pakan alami penekan bau tanah ini.',
        reply: 'Sangat bisa Pak Budi! Kami sendiri membudidayakan Azolla di bak dangkal ukuran 2x3 meter dengan memanfaatkan air buangan kolam bioflok yang kaya nutrisi nitrat. Dalam 4 hari azolla berlipat ganda.'
      }
    ]
  },
  {
    id: 'a3',
    tgl: '28 Agu 2026',
    judul: 'Tebar Benih 100 Ekor/m³: Kunci Tingkat Kelangsungan Hidup (SR) 94%',
    kategori: 'Teknik Bioflok',
    penulis: 'Hamdan Russ (Owner & Praktisi NilaFarm)',
    bacaWaktu: '5 menit baca',
    img: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    ringkas: 'Panduan aklimatisasi suhu, persiapan air media flok, dan penanganan adaptasi benih 3 hari pertama.',
    keyPoints: [
      'Kepadatan tebar ideal pemula: 100 - 120 ekor per meter kubik air',
      'Aklimatisasi suhu bertahap selama 25-35 menit saat benih tiba',
      'Aplikasi garam krosok 1-2 kg/m³ untuk mengurangi stres osmotik benih',
      'Puasa 24 jam pertama pasca tebar untuk pemulihan metabolisme pencernaan'
    ],
    isi: [
      'Salah satu kesalahan paling fatal yang sering dilakukan oleh pembudidaya pemula adalah langsung menebar benih dengan kepadatan ekstrem (200-300 ekor/m³) tanpa diimbangi maturitas bioflok dan sistem aerasi yang mumpuni. Akibatnya, pada minggu kedua terjadi lonjakan amonia dan kematian massal. Kami merekomendasikan kepadatan tebar moderat yang aman bagi pemula, yaitu 100 hingga 120 ekor per meter kubik air kolam.',
      'Hari kedatangan benih merupakan fase paling krusial. Perjalanan pengiriman darat selama berjam-jam membuat benih mengalami stres osmotik dan penurunan daya tahan tubuh. Prosedur aklimatisasi wajib dijalankan tanpa kompromi: kantong plastik benih yang masih tertutup diistirahatkan mengapung di permukaan air kolam selama 25–35 menit. Langkah ini bertujuan menyamakan suhu air di dalam kantong dengan suhu air kolam budidaya secara perlahan.',
      'Setelah kantong terasa dinginnya seimbang, buka ikatan plastik secara hati-hati. Masukkan air kolam ke dalam kantong sedikit demi sedikit dengan gayung selama 5-10 menit agar benih beradaptasi dengan pH dan salinitas kolam. Biarkan benih berenang keluar sendiri ke kolam tanpa dipaksa dituangkan. Buang air sisa yang ada di dalam kantong agar bibit patogen atau amonia dari air kemasan tidak mencemari kolam utama.',
      'Pada 3 hari pertama, aplikasikan garam ikan non-yodium (garam krosok) dengan dosis 1 hingga 2 kg per meter kubik air. Garam berfungsi menstabilkan tekanan osmotik cairan tubuh ikan serta merangsang lapisan lendir pelindung kulit dari serangan jamur Saprolegnia. Selain itu, benih wajib dipuasakan selama 24 jam pertama pasca tebar untuk memberi waktu pemulihan organ pencernaan sebelum mulai diberikan pelet ukuran butiran halus (crumbles).'
    ],
    comments: [
      {
        id: 'c4',
        nama: 'Wahyu Darmawan',
        email: 'wahyudarma@gmail.com',
        tgl: '31 Agu 2026',
        pesan: 'Apakah benih nila merah dan nila hitam memiliki daya tahan yang berbeda terhadap kepadatan tebar 100 ekor/m3 ini?',
        reply: 'Secara genetik, benih Nila Hitam (strain Nirwana / Gesit) memiliki toleransi stres dan daya tahan penyakit sedikit lebih tinggi, namun Nila Merah (Bangkok / Citralada) memiliki nilai jual lebih premium di resto dan pasar modern. Di NilaFarm kami membudidayakan kedua strain dengan SOP yang sama.'
      }
    ]
  },
  {
    id: 'a4',
    tgl: '18 Agu 2026',
    judul: 'Implementasi Sensor IoT Kolam: Mencegah Kematian Ikan Dini Hari',
    kategori: 'Teknologi IoT',
    penulis: 'Hamdan Russ (Owner & Praktisi NilaFarm)',
    bacaWaktu: '7 menit baca',
    img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    ringkas: 'Bagaimana telemetri Dissolved Oxygen & relay otomatis menyelamatkan tambak dari mati listrik saat tengah malam.',
    keyPoints: [
      'Probe sensor optik Dissolved Oxygen (DO) & sensor pH digital kontinu',
      'Gateway mikrokontroler ESP32 mengirim telemetri tiap 5 detik via MQTT',
      'Relay cadangan menyalakan aerator darurat otomatis saat DO < 4.0 mg/L',
      'Peringatan instan WhatsApp dan alarm sirine ke smartphone peternak'
    ],
    isi: [
      'Tragedi terbesar dalam budidaya ikan sistem bioflok berpadat tebar tinggi adalah fenomena drop oksigen (oxygen depletion) yang sering terjadi tanpa tanda-tanda pada rentang jam 02:00 hingga 05:00 dini hari. Pada jam-jam tersebut, seluruh organisme mikroba pengurai flok dan ribuan ekor ikan mengonsumsi oksigen bersamaan tanpa adanya pasokan fotosintesis matahari. Jika aerator mendadak mati karena trip MCB atau listrik PLN padam selama 30 menit saja, seluruh isi kolam dapat mati lemas mengambang.',
      'Untuk mengeliminasi risiko bencana ini, NilaFarm merancang arsitektur telemetri IoT kolam berbasis mikrokontroler industri ESP32 yang terhubung dengan sensor optik DO tahan air dan probe pH digital industri. Sensor ini mencelup di kedalaman 60 cm kolam dan mengukur parameter air secara kontinyu setiap 5 detik. Data dikirimkan ke cloud broker MQTT kami dan ditampilkan secara realtime di panel dashboard monitoring.',
      'Sistem dilengkapi dengan logika fail-safe aktuator pintar: manakala sensor mendeteksi kadar DO merosot menyentuh angka ambang batas bahaya (4.2 mg/L), mikrokontroler secara otomatis memicu modul relay solid-state untuk mengaktifkan aerator cadangan seketika tanpa campur tangan manusia. Di saat yang sama, bot sistem mengirimkan notifikasi darurat WhatsApp ke nomor saya (0813-8257-0406) dan tim operator farm.',
      'Dengan investasi sensor IoT cerdas ini, efisiensi operasional farm kami melonjak tajam. Kami tidak lagi harus begadang memeriksa kolam setiap jam di tengah malam, dan risiko kematian massal berhasil ditekan hingga nol persen (zero mortality accident) selama dua tahun terakhir beroperasi.'
    ],
    comments: [
      {
        id: 'c5',
        nama: 'Rian Pratama',
        email: 'rian.iot@tech.co.id',
        tgl: '20 Agu 2026',
        pesan: 'Sangat inspiratif Pak Hamdan! Apakah probe sensor DO-nya perlu kalibrasi berkala karena tertempel lumut atau flok?',
        reply: 'Betul sekali Mas Rian. Kami menggunakan probe optical luminescent DO. Perawatannya cukup diseka spons halus seminggu sekali saat kontrol air untuk membersihkan lapisan biofilm mikroba agar pembacaan tetap presisi 99.8%.'
      }
    ]
  },
  {
    id: 'a5',
    tgl: '10 Agu 2026',
    judul: 'Analisis Modal & Laba Budidaya Nila Bioflok: Balik Modal 2 Siklus',
    kategori: 'Peluang Bisnis',
    penulis: 'Hamdan Russ (Owner & Praktisi NilaFarm)',
    bacaWaktu: '6 menit baca',
    img: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    ringkas: 'Rincian RAB investasi kolam terpal D4, biaya pakan, bibit, operasional listrik, hingga proyeksi omzet panen.',
    keyPoints: [
      'Investasi awal kolam D4 komplit terpal Orca & aerator: Rp 7.500.000',
      'Biaya operasional pakan & benih per siklus: Rp 16.500.000',
      'Hasil panen biomassa: 1.300 kg @ Rp 38.000/kg = Rp 49.400.000',
      'Estimasi laba bersih per siklus 90 hari: Rp 25.000.000 - Rp 30.000.000'
    ],
    isi: [
      'Banyak calon peternak bertanya kepada kami: berapa modal riil yang dibutuhkan untuk memulai budidaya ikan nila sistem bioflok skala komersial pemula, dan kapan modal investasi tersebut bisa kembali (Break Even Point / BEP)? Berdasarkan catatan buku keuangan operasional NilaFarm Sumedang, 1 unit kolam bundar D4 dapat mencapai titik impas modal investasi hanya dalam 2 siklus panen (sekitar 6 hingga 7 bulan).',
      'Komponen biaya dibagi menjadi dua kategori: Belanja Modal (CapEx) dan Biaya Operasional (OpEx). CapEx untuk 1 kolam D4 komplit meliputi rangka wiremesh galvanis M8 anti-karat, terpal karet Orca 0.8 mm, pipa central drain 2 inch, blower aerasi 100W, 4 uniring diffuser, dan instalasi atap paranet dengan total sekitar Rp 7.500.000. Aset fisik ini memiliki masa pakai ekonomis hingga 5 sampai 8 tahun.',
      'Untuk OpEx satu siklus panen (90-100 hari) dengan tebar 3.000 ekor benih nila ukuran 5-7 cm: pembelian benih unggul bersertifikasi (3.000 x Rp 600 = Rp 1.800.000), pakan pelet protein 32% sebanyak 1.500 kg dengan FCR 1.2 (Rp 18.000.000), probiotik, molase, garam, dan vitamin (Rp 750.000), serta tagihan listrik aerasi 24 jam selama 3 bulan (Rp 900.000). Total biaya operasional berkisar Rp 21.450.000.',
      'Dengan tingkat kelangsungan hidup 92% dan bobot rata-rata 500 gram per ekor, biomassa panen bersih mencapai sekitar 1.380 kg. Dijual langsung ke jaringan resto, warung makan, dan konsumen retail dengan harga rata-rata Rp 36.000 - Rp 38.000 per kg, menghasilkan omzet kotor Rp 49.680.000 hingga Rp 52.440.000. Setelah dipotong seluruh biaya operasional, keuntungan bersih mencapai Rp 28.000.000 - Rp 30.000.000 per kolam per siklus.'
    ],
    comments: [
      {
        id: 'c6',
        nama: 'Kurnia Santosa',
        email: 'kurniasantosa@biz.com',
        tgl: '12 Agu 2026',
        pesan: 'Perhitungan yang sangat transparan dan realistis Pak Hamdan. Untuk serapan pasar di Sumedang dan Bandung apakah permintaannya stabil setiap hari?',
        reply: 'Sangat stabil Pak Kurnia! Permintaan ikan nila konsumsi segar di Sumedang, Bandung Raya, dan sekitarnya saat ini selalu defisit. Resto ikan bakar dan katering bahkan rutin meminta pasokan harian 50-100 kg per hari.'
      }
    ]
  }
];

export const GALLERY_ITEMS = [
  {
    id: 'g1',
    title: 'Cluster 4 Kolam Bundar D4',
    sub: 'Sistem Bioflok Terpal Orca • Sumedang',
    img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'g2',
    title: 'Panen Nila Segar Ukuran 700g',
    sub: 'Kondisi Ikan Hidup & Aktif',
    img: 'https://images.unsplash.com/photo-1534043464124-3be32fe00099?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'g3',
    title: 'Central Drain & Uniring Aerasi',
    sub: 'Sirkulasi Oksigen Merata 24 Jam',
    img: 'https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'g4',
    title: 'Monitoring Probe Sensor IoT',
    sub: 'Telemetri Real-time pH & DO',
    img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
  }
];

export const TESTIMONIALS = [
  {
    id: 't1',
    nama: 'Ibu Ratna Dewi',
    peran: 'Pemilik Resto Ikan Bakar Sumedang',
    teks: 'Nila dari NilaFarm selalu segar dan dagingnya manis gurih tanpa bau lumpur sama sekali. Pelanggan resto kami sangat puas, apalagi sudah dibersihkan gratis dan diantar tepat waktu.',
    rating: 5,
    avatar: 'RD'
  },
  {
    id: 't2',
    nama: 'Bpk. Hendra Kurniawan',
    peran: 'Pembudidaya Nila Pemula di Tanjungsari',
    teks: 'Beli paket kolam D4 sekalian sensor IoT-nya sangat membantu saya yang sering dinas luar kota. Saat DO turun dini hari, aerator menyala otomatis dan saya dapat notifikasi WA.',
    rating: 5,
    avatar: 'HK'
  },
  {
    id: 't3',
    nama: 'drh. Agus Prasetyo',
    peran: 'Konsultan Akuakultur Jawa Barat',
    teks: 'Pencatatan data kualitas air dan FCR 1.2 di farm ini membuktikan bahwa budidaya bioflok modern berbasis IoT jauh lebih efisien, hemat air, dan minim risiko kematian.',
    rating: 5,
    avatar: 'AP'
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
      temp: Array.from({ length: 48 }, (_, i) => +(28.2 + Math.sin(i / 3) * 0.5 + (Math.random() * 0.4 - 0.2)).toFixed(1)),
      ph: Array.from({ length: 48 }, (_, i) => +(7.2 + Math.cos(i / 4) * 0.15 + (Math.random() * 0.1 - 0.05)).toFixed(2)),
      do: Array.from({ length: 48 }, (_, i) => +(6.4 + Math.sin(i / 2.5) * 0.6 + (Math.random() * 0.3 - 0.15)).toFixed(1)),
      nh3: Array.from({ length: 48 }, (_, i) => +(0.12 + Math.random() * 0.04).toFixed(2))
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
      temp: Array.from({ length: 48 }, (_, i) => +(28.8 + Math.sin(i / 3.2) * 0.4 + (Math.random() * 0.3 - 0.15)).toFixed(1)),
      ph: Array.from({ length: 48 }, (_, i) => +(7.45 + Math.cos(i / 3) * 0.12 + (Math.random() * 0.1 - 0.05)).toFixed(2)),
      do: Array.from({ length: 48 }, (_, i) => +(5.3 + Math.sin(i / 2) * 0.5 + (Math.random() * 0.2 - 0.1)).toFixed(1)),
      nh3: Array.from({ length: 48 }, (_, i) => +(0.20 + Math.random() * 0.05).toFixed(2))
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
      temp: Array.from({ length: 48 }, (_, i) => +(27.5 + Math.sin(i / 4) * 0.3 + (Math.random() * 0.3 - 0.15)).toFixed(1)),
      ph: Array.from({ length: 48 }, (_, i) => +(6.9 + Math.cos(i / 4) * 0.1 + (Math.random() * 0.08 - 0.04)).toFixed(2)),
      do: Array.from({ length: 48 }, (_, i) => +(7.0 + Math.sin(i / 2) * 0.4 + (Math.random() * 0.2 - 0.1)).toFixed(1)),
      nh3: Array.from({ length: 48 }, (_, i) => +(0.08 + Math.random() * 0.03).toFixed(2))
    }
  },
  {
    id: 'K-B2',
    name: 'Kolam B2',
    type: 'Sistem RAS • Beton',
    fish: 3200,
    age: 21,
    s: { temp: 30.2, ph: 8.10, do: 4.5, nh3: 0.31, turb: 28, level: 70 },
    act: { aerator: true, pompa: true, feeder: false },
    hist: {
      temp: Array.from({ length: 48 }, (_, i) => +(29.9 + Math.sin(i / 3) * 0.4 + (Math.random() * 0.4 - 0.2)).toFixed(1)),
      ph: Array.from({ length: 48 }, (_, i) => +(8.05 + Math.cos(i / 3) * 0.15 + (Math.random() * 0.1 - 0.05)).toFixed(2)),
      do: Array.from({ length: 48 }, (_, i) => +(4.6 + Math.sin(i / 2.2) * 0.5 + (Math.random() * 0.3 - 0.15)).toFixed(1)),
      nh3: Array.from({ length: 48 }, (_, i) => +(0.30 + Math.random() * 0.04).toFixed(2))
    }
  }
];

export const INITIAL_DEVICES = [
  { id: 'GW-01', name: 'Gateway Utama IoT & LoRa', kind: 'gateway', pond: 'Semua Kolam', batt: 100, sig: 98, online: true, fw: 'v2.4.1' },
  { id: 'NODE-A1', name: 'Sensor Multi-Probe Kolam A1', kind: 'sensor', pond: 'Kolam A1', batt: 87, sig: 84, online: true, fw: 'v1.9.0' },
  { id: 'NODE-A2', name: 'Sensor Multi-Probe Kolam A2', kind: 'sensor', pond: 'Kolam A2', batt: 76, sig: 78, online: true, fw: 'v1.9.0' },
  { id: 'NODE-B1', name: 'Sensor Multi-Probe Kolam B1', kind: 'sensor', pond: 'Kolam B1', batt: 92, sig: 88, online: true, fw: 'v1.9.0' },
  { id: 'NODE-B2', name: 'Sensor Multi-Probe Kolam B2', kind: 'sensor', pond: 'Kolam B2', batt: 44, sig: 62, online: true, fw: 'v1.8.3' },
  { id: 'ACT-01', name: 'Kontroler Otomasi Aerator 4-Ch', kind: 'aktuator', pond: 'Kolam A1, A2, B2', batt: 100, sig: 92, online: true, fw: 'v1.2.0' },
  { id: 'ACT-02', name: 'Smart Auto-Feeder 20kg', kind: 'aktuator', pond: 'Kolam A1 & A2', batt: 70, sig: 74, online: true, fw: 'v1.2.0' }
];

export const DEFAULT_THRESHOLDS = {
  temp: [26.0, 30.0],
  ph: [6.5, 8.5],
  do: [4.0, 10.0],
  nh3: [0.0, 0.5]
};

export const TRANSLATIONS = {
  id: {
    hero_badge: '🐟 Budidaya Ikan Nila Bioflok • Sumedang',
    hero_h1: 'Nila Segar dari Kolam Kami,',
    hero_h1_span: 'Langsung ke Meja Anda',
    hero_sub: 'Usaha budidaya nila keluarga di Sumedang — panen segar tiap pagi dari 4 kolam sendiri (3 bundar + 1 kotak), dibersihkan gratis, diantar di hari yang sama.',
    hero_cta1: 'Lihat Produk Siap Jual',
    hero_cta2: 'Hubungi WhatsApp',
    stat_kolam: 'Kolam Aktif',
    stat_ikan: 'Ekor Nila Sehat',
    stat_panen: 'Panen Tiap Siklus',
    stat_fcr: 'FCR Rata-rata',
    k_tentang: 'Tentang Kami',
    tentang_h2: 'Budidaya Keluarga Berteknologi Cerdas',
    tentang_p: 'NilaFarm lahir dari kolam bioflok keluarga di Sumedang. Berawal dari catatan harian tambak, kini berkembang menjadi sistem peternakan modern yang memadukan pakan alami dengan monitoring IoT 24 jam.',
    k_fitur: 'Keunggulan Kami',
    fitur_h2: 'Kenapa Nila dari Kolam Kami Lebih Unggul',
    k_cara: 'Alur Dari Kolam ke Meja',
    cara_h2: 'Pesan Hari Ini, Dinikmati Segar Besok',
    k_harga: 'Produk Siap Jual',
    harga_h2: 'Panen Segar Setiap Pagi',
    k_galeri: 'Galeri Farm',
    galeri_h2: 'Intip Langsung Suasana Kolam Kami',
    k_testi: 'Testimoni Pelanggan',
    testi_h2: 'Kata Mereka yang Sudah Menikmati',
    k_kontak: 'Hubungi Kami',
    kontak_h2: 'Pesan Nila atau Kunjungi Farm',
    cta_banner_h2: 'Butuh Ikan Nila Segar untuk Hari Ini?',
    cta_banner_p: 'Chat kami sebelum jam 9 pagi — panen siang hari dan langsung diantar ke alamat Anda.'
  },
  en: {
    hero_badge: '🐟 Biofloc Tilapia Farm • Sumedang',
    hero_h1: 'Fresh Tilapia from Our Ponds,',
    hero_h1_span: 'Straight to Your Table',
    hero_sub: 'A family tilapia farm in Sumedang — fresh harvest every morning from 4 active ponds, scaled & cleaned for free, same-day delivery.',
    hero_cta1: 'Explore Ready Products',
    hero_cta2: 'Contact on WhatsApp',
    stat_kolam: 'Active Ponds',
    stat_ikan: 'Healthy Tilapia',
    stat_panen: 'Harvest per Cycle',
    stat_fcr: 'Average FCR',
    k_tentang: 'About Us',
    tentang_h2: 'Smart Technology Family Aquaculture',
    tentang_p: 'NilaFarm originated from a family biofloc pond in Sumedang, evolving into a modern smart aquaculture facility with 24/7 IoT telemetry.',
    k_fitur: 'Our Strengths',
    fitur_h2: 'Why Our Pond Tilapia Tastes Better',
    k_cara: 'From Pond to Table',
    cara_h2: 'Order Today, Enjoy Fresh Tomorrow',
    k_harga: 'Available Products',
    harga_h2: 'Fresh Harvest Every Morning',
    k_galeri: 'Pond Gallery',
    galeri_h2: 'A Look at Our Modern Biofloc Setup',
    k_testi: 'Customer Reviews',
    testi_h2: 'What Our Buyers Say',
    k_kontak: 'Contact Us',
    kontak_h2: 'Order Fresh Tilapia or Visit Our Farm',
    cta_banner_h2: 'Need Fresh Tilapia for Today?',
    cta_banner_p: 'Chat us before 9 AM — harvested at noon and delivered same-day to your doorstep.'
  }
};

export const DEFAULT_ORDERS = [
  {
    id: 'NF-839201',
    tanggal: '25 Sep 2026, 06:15 WIB',
    pelanggan: 'H. Ridwan Kosasih',
    telepon: '081298452311',
    alamat: 'Jl. Mayor Abdurahman No. 45, Kotakaler, Sumedang Utara',
    items: [
      { id: 'p1', nama: 'Nila Konsumsi Segar', qty: 5, harga: 38000 },
      { id: 'p7', nama: 'Nila Bumbu Kuning Rempah Siap Goreng', qty: 2, harga: 36000 }
    ],
    total: 262000,
    metode: 'Transfer Bank BCA (138-049-2810)',
    catatan: 'Tolong ikan dibersihkan sisik dan jeroannya. Kirim sebelum makan siang.',
    status: 'Menunggu Konfirmasi',
    buktiBayar: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'NF-839188',
    tanggal: '24 Sep 2026, 17:30 WIB',
    pelanggan: 'Resto Saung Lesehan Cimalaka',
    telepon: '085721345678',
    alamat: 'Jl. Raya Cimalaka KM 8, Cimalaka, Sumedang',
    items: [
      { id: 'p2', nama: 'Nila Fillet Premium Vakum', qty: 10, harga: 65000 }
    ],
    total: 650000,
    metode: 'Transfer Bank Mandiri (182-000-482-9102)',
    catatan: 'Pesanan langganan mingguan. Kemasan vakum utuh.',
    status: 'Dikonfirmasi',
    buktiBayar: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=600&q=80'
  }
];
