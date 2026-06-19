// ===== DATA UTAMA SIPUSTAKA =====
var dataKoleksi = [
  { id: 1, judul: 'Pemrograman Python Dasar', pengarang: 'Budi Raharjo', kategori: 'Teknologi', status: 'tersedia', tahun: 2023 },
  { id: 2, judul: 'Basis Data Relasional', pengarang: 'Ir. Susi Wulandari', kategori: 'Teknologi', status: 'dipinjam', tahun: 2022 },
  { id: 3, judul: 'Sejarah Nusantara Lengkap', pengarang: 'Prof. Agus Salim', kategori: 'Sejarah', status: 'tersedia', tahun: 2021 },
  { id: 4, judul: 'Matematika Diskrit', pengarang: 'Dr. Hendra Gunawan', kategori: 'Matematika', status: 'tersedia', tahun: 2023 },
  { id: 5, judul: 'Novel Laskar Pelangi', pengarang: 'Andrea Hirata', kategori: 'Fiksi', status: 'dipinjam', tahun: 2005 },
  { id: 6, judul: 'Jaringan Komputer Modern', pengarang: 'Wahyu Nur Cholifah', kategori: 'Teknologi', status: 'tersedia', tahun: 2022 },
  { id: 7, judul: 'Fisika Universitas Jilid 1', pengarang: 'Young & Freedman', kategori: 'Sains', status: 'dipinjam', tahun: 2020 },
  { id: 8, judul: 'Belajar Desain UI/UX', pengarang: 'Rizki Aditya', kategori: 'Teknologi', status: 'tersedia', tahun: 2023 },
  { id: 9, judul: 'Kimia Organik Dasar', pengarang: 'Prof. Hartono', kategori: 'Sains', status: 'tersedia', tahun: 2019 },
  { id: 10, judul: 'Bumi Manusia', pengarang: 'Pramoedya A. Toer', kategori: 'Fiksi', status: 'tersedia', tahun: 1980 }
];

var dataNotifikasi = [
  '⚠️ Buku "Basis Data Relasional" sudah dipinjam 7 hari, segera kembalikan.',
  '📦 5 buku baru telah ditambahkan ke koleksi minggu ini.',
  '🎉 Selamat! Perpustakaan mencapai 500 anggota aktif.'
];

var indeksNotifAktif = 0;

var bukuFavorit = JSON.parse(localStorage.getItem('bukuFavorit')) || [];

function updateBadgeFavorit() {
  var badge = document.getElementById('badgeFavorit');
  if (badge !== null) {
    badge.innerHTML = bukuFavorit.length;
  }
}

function tambahFavorit(idBuku) {
  var judul = '';

  for (var i = 0; i < dataKoleksi.length; i++) {
    if (dataKoleksi[i].id === idBuku) {
      judul = dataKoleksi[i].judul;
      break;
    }
  }

  if (judul === '') {
    return;
  }

  if (bukuFavorit.indexOf(judul) === -1) {
    bukuFavorit.push(judul);
    localStorage.setItem('bukuFavorit', JSON.stringify(bukuFavorit));
    updateBadgeFavorit();
    alert('Buku berhasil ditambahkan ke favorit');
  } else {
    alert('Buku ini sudah ada di favorit');
  }
}

window.tambahFavorit = tambahFavorit;
updateBadgeFavorit();

var elemenDashboard = document.getElementById('statTotalBuku');

if (elemenDashboard !== null) {
 
  var jumlahTotal = dataKoleksi.length;
  var jumlahDipinjam = 0;

  for (var i = 0; i < dataKoleksi.length; i++) {
    if (dataKoleksi[i].status === 'dipinjam') {
      jumlahDipinjam = jumlahDipinjam + 1;
    }
  }

  var jumlahTersedia = jumlahTotal - jumlahDipinjam;

  document.getElementById('statTotalBuku').innerHTML = jumlahTotal;
  document.getElementById('statDipinjam').innerHTML = jumlahDipinjam;
  document.getElementById('statTersedia').innerHTML = jumlahTersedia;
  document.getElementById('statAnggota').innerHTML = 47;

  
  var hitungKategori = {};

  for (var j = 0; j < dataKoleksi.length; j++) {
    var kategoriIni = dataKoleksi[j].kategori;

    if (hitungKategori[kategoriIni] === undefined) {
      hitungKategori[kategoriIni] = 0;
    }

    hitungKategori[kategoriIni] = hitungKategori[kategoriIni] + 1;
  }

  var warnaKategori = {
    'Teknologi': 'bg-primary',
    'Sejarah': 'bg-warning',
    'Matematika': 'bg-info',
    'Fiksi': 'bg-success',
    'Sains': 'bg-danger'
  };

  var htmlProgress = '';
  var daftarKategori = Object.keys(hitungKategori);

  for (var k = 0; k < daftarKategori.length; k++) {
    var namaKat = daftarKategori[k];
    var jumlahKat = hitungKategori[namaKat];
    var persenKat = Math.round((jumlahKat / jumlahTotal) * 100);
    var warnaBar = warnaKategori[namaKat];

    if (warnaBar === undefined) {
      warnaBar = 'bg-secondary';
    }

    htmlProgress += '<div class="mb-3">';
    htmlProgress += '<div class="d-flex justify-content-between mb-1">';
    htmlProgress += '<small><strong>' + namaKat + '</strong></small>';
    htmlProgress += '<small>' + jumlahKat + ' buku (' + persenKat + '%)</small>';
    htmlProgress += '</div>';
    htmlProgress += '<div class="progress">';
    htmlProgress += '<div class="progress-bar ' + warnaBar + '" style="width: ' + persenKat + '%" role="progressbar">' + persenKat + '%</div>';
    htmlProgress += '</div>';
    htmlProgress += '</div>';
  }

  document.getElementById('areaPogress').innerHTML = htmlProgress;

  var bukuTerbaru = dataKoleksi.slice(dataKoleksi.length - 3);
  var barisTabel = '';

  for (var m = 0; m < bukuTerbaru.length; m++) {
    var buku = bukuTerbaru[m];
    var badgeStatus = '';

    if (buku.status === 'tersedia') {
      badgeStatus = '<span class="badge bg-success">Tersedia</span>';
    } else {
      badgeStatus = '<span class="badge bg-warning text-dark">Dipinjam</span>';
    }

    barisTabel += '<tr>';
    barisTabel += '<td>' + buku.judul + '</td>';
    barisTabel += '<td>' + buku.pengarang + '</td>';
    barisTabel += '<td><span class="badge bg-light text-dark border">' + buku.kategori + '</span></td>';
    barisTabel += '<td>' + badgeStatus + '</td>';
    barisTabel += '</tr>';
  }

  document.getElementById('tabelBukuBaru').innerHTML = barisTabel;

 
  document.getElementById('tombolNotif').addEventListener('click', function () {
    var pesanNotif = dataNotifikasi[indeksNotifAktif];
    document.getElementById('isiToast').innerHTML = pesanNotif;

    var elemenToast = document.getElementById('toastNotif');
    var toast = new bootstrap.Toast(elemenToast, { delay: 5000 });
    toast.show();

    indeksNotifAktif = indeksNotifAktif + 1;

    if (indeksNotifAktif >= dataNotifikasi.length) {
      indeksNotifAktif = 0;
    }

    var sisaNotif = dataNotifikasi.length - indeksNotifAktif;
    document.getElementById('badgeNotif').innerHTML = sisaNotif;
  });
}


var elemenKoleksi = document.getElementById('tabelKoleksi');

if (elemenKoleksi !== null) {
  function tampilkanKoleksi() {
    var kataCari = document.getElementById('inputCari').value.toLowerCase();
    var kategoriDipilih = document.getElementById('filterKategori').value;
    var statusDipilih = document.getElementById('filterStatus').value;
    var hasilFilter = [];

    for (var i = 0; i < dataKoleksi.length; i++) {
      var buku = dataKoleksi[i];
      var judulLower = buku.judul.toLowerCase();
      var pengarangLower = buku.pengarang.toLowerCase();

      var cocokTeks = judulLower.indexOf(kataCari) !== -1 || pengarangLower.indexOf(kataCari) !== -1;
      var cocokKategori = kategoriDipilih === 'semua' || buku.kategori === kategoriDipilih;
      var cocokStatus = statusDipilih === 'semua' || buku.status === statusDipilih;

      if (cocokTeks && cocokKategori && cocokStatus) {
        hasilFilter.push(buku);
      }
    }

    var pesanKosong = document.getElementById('pesanKosong');

    if (hasilFilter.length === 0) {
      elemenKoleksi.innerHTML = '';
      pesanKosong.classList.remove('d-none');
    } else {
      pesanKosong.classList.add('d-none');

      var baris = '';

      for (var j = 0; j < hasilFilter.length; j++) {
        var b = hasilFilter[j];
        var badgeKat = '<span class="badge bg-light text-dark border">' + b.kategori + '</span>';
        var badgeSts = '';

        if (b.status === 'tersedia') {
          badgeSts = '<span class="badge bg-success">Tersedia</span>';
        } else {
          badgeSts = '<span class="badge bg-warning text-dark">Dipinjam</span>';
        }

        baris += '<tr>';
        baris += '<td>' + (j + 1) + '</td>';
        baris += '<td class="fw-semibold">' + b.judul + '</td>';
        baris += '<td>' + b.pengarang + '</td>';
        baris += '<td>' + badgeKat + '</td>';
        baris += '<td>' + b.tahun + '</td>';
        baris += '<td>' + badgeSts + '</td>';
        baris += '<td><button class="btn btn-outline-danger btn-sm" onclick="tambahFavorit(' + b.id + ')">❤️</button></td>';
        baris += '</tr>';
      }

      elemenKoleksi.innerHTML = baris;
    }

    document.getElementById('jumlahTampil').innerHTML = hasilFilter.length;
  }

  document.getElementById('inputCari').addEventListener('input', tampilkanKoleksi);
  document.getElementById('filterKategori').addEventListener('change', tampilkanKoleksi);
  document.getElementById('filterStatus').addEventListener('change', tampilkanKoleksi);

  tampilkanKoleksi();
}


var elemenFormPinjam = document.getElementById('formPinjam');

if (elemenFormPinjam !== null) {
  var selectBuku = document.getElementById('pilihBuku');

  for (var i = 0; i < dataKoleksi.length; i++) {
    var buku = dataKoleksi[i];

    if (buku.status === 'tersedia') {
      var opsi = document.createElement('option');
      opsi.value = buku.id;
      opsi.textContent = buku.judul + ' — ' + buku.pengarang;
      selectBuku.appendChild(opsi);
    }
  }

  var hariIni = new Date();
  var tahun = hariIni.getFullYear();
  var bulan = hariIni.getMonth() + 1;
  var tanggal = hariIni.getDate();

  if (bulan < 10) {
    bulan = '0' + bulan;
  }

  if (tanggal < 10) {
    tanggal = '0' + tanggal;
  }

  var formatTanggal = tahun + '-' + bulan + '-' + tanggal;
  document.getElementById('tanggalPinjam').value = formatTanggal;

  function tampilkanDaftarPinjaman() {
    var area = document.getElementById('daftarPinjaman');
    var dataTersimpan = localStorage.getItem('dataPinjaman');
    var daftarPinjaman = [];

    if (dataTersimpan !== null) {
      daftarPinjaman = JSON.parse(dataTersimpan);
    }

    document.getElementById('badgeJumlahPinjam').innerHTML = daftarPinjaman.length;

    if (daftarPinjaman.length === 0) {
      area.innerHTML = '<p class="text-muted text-center py-4 mb-0">Belum ada peminjaman aktif.</p>';
      return;
    }

    var html = '<div class="table-responsive"><table class="table table-sm table-hover mb-0">';
    html += '<thead class="table-light"><tr>';
    html += '<th>Buku</th><th>Peminjam</th><th>Kembali</th><th></th>';
    html += '</tr></thead><tbody>';

    for (var j = 0; j < daftarPinjaman.length; j++) {
      var p = daftarPinjaman[j];
      var classBaris = '';
      var badgeTempo = '';

      if (p.tanggalKembaliISO !== undefined) {
        var hariIniCek = new Date();
        var tanggalKembaliCek = new Date(p.tanggalKembaliISO);
        var selisihHari = Math.ceil((tanggalKembaliCek - hariIniCek) / (1000 * 60 * 60 * 24));

        if (selisihHari < 3) {
          classBaris = ' class="table-danger"';
          badgeTempo = ' <span class="badge bg-danger">Segera Kembalikan</span>';
        }
      }

      html += '<tr' + classBaris + '>';
      html += '<td><small class="fw-semibold">' + p.judulBuku + '</small></td>';
      html += '<td><small>' + p.namaPeminjam + '</small></td>';
      html += '<td><small>' + p.tanggalKembali + badgeTempo + '</small></td>';
      html += '<td><button class="btn btn-outline-danger btn-sm" onclick="hapusPinjaman(' + j + ')">Kembalikan</button></td>';
      html += '</tr>';
    }

    html += '</tbody></table></div>';
    area.innerHTML = html;
  }

  function hapusPinjaman(indeks) {
    var dataTersimpan = localStorage.getItem('dataPinjaman');
    var daftarPinjaman = JSON.parse(dataTersimpan);
    var namaBuku = daftarPinjaman[indeks].judulBuku;

    daftarPinjaman.splice(indeks, 1);
    localStorage.setItem('dataPinjaman', JSON.stringify(daftarPinjaman));

    tampilkanDaftarPinjaman();
    tampilkanToastPinjam('📚 "' + namaBuku + '" berhasil dikembalikan.');
  }

  window.hapusPinjaman = hapusPinjaman;

  function tampilkanToastPinjam(pesan) {
    document.getElementById('isiToastPinjam').innerHTML = pesan;
    var toast = new bootstrap.Toast(document.getElementById('toastPinjam'), { delay: 4000 });
    toast.show();
  }

  elemenFormPinjam.addEventListener('submit', function (event) {
    event.preventDefault();

    document.getElementById('pilihBuku').classList.remove('is-invalid');
    document.getElementById('namaPeminjam').classList.remove('is-invalid');

    var idBukuDipilih = document.getElementById('pilihBuku').value;
    var nama = document.getElementById('namaPeminjam').value.trim();
    var tglPinjam = document.getElementById('tanggalPinjam').value;
    var durasi = parseInt(document.getElementById('durasiPinjam').value);
    var adaError = false;

    if (idBukuDipilih === '') {
      document.getElementById('pilihBuku').classList.add('is-invalid');
      adaError = true;
    }

    if (nama === '') {
      document.getElementById('namaPeminjam').classList.add('is-invalid');
      adaError = true;
    }

    if (adaError) {
      return;
    }

    var bukuDipilih = null;

    for (var m = 0; m < dataKoleksi.length; m++) {
      if (dataKoleksi[m].id === parseInt(idBukuDipilih)) {
        bukuDipilih = dataKoleksi[m];
        break;
      }
    }

    var tglKembali = new Date(tglPinjam);
    tglKembali.setDate(tglKembali.getDate() + durasi);

    var tglKembaliISO = tglKembali.toISOString().slice(0, 10);

    var tglKembaliStr = tglKembali.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });

    var peminjamanBaru = {
      judulBuku: bukuDipilih.judul,
      namaPeminjam: nama,
      tanggalPinjam: tglPinjam,
      tanggalKembali: tglKembaliStr,
      tanggalKembaliISO: tglKembaliISO,
      durasi: durasi
    };

    var dataTersimpan = localStorage.getItem('dataPinjaman');
    var daftarPinjaman = [];

    if (dataTersimpan !== null) {
      daftarPinjaman = JSON.parse(dataTersimpan);
    }

    daftarPinjaman.push(peminjamanBaru);
    localStorage.setItem('dataPinjaman', JSON.stringify(daftarPinjaman));

    tampilkanDaftarPinjaman();
    tampilkanToastPinjam('✅ Peminjaman "' + bukuDipilih.judul + '" berhasil dicatat!');

    elemenFormPinjam.reset();
    document.getElementById('tanggalPinjam').value = formatTanggal;
  });

  tampilkanDaftarPinjaman();
}


var elemenAccordion = document.getElementById('accordionFaq');

if (elemenAccordion !== null) {
  var dataFaq = [
    {
      pertanyaan: 'Berapa lama saya bisa meminjam buku?',
      jawaban: 'Durasi peminjaman standar adalah 14 hari. Anda dapat memilih 7, 14, atau 21 hari saat melakukan peminjaman melalui halaman Peminjaman.'
    },
    {
      pertanyaan: 'Bagaimana cara memperpanjang masa pinjam buku?',
      jawaban: 'Perpanjangan dapat dilakukan satu kali sebelum tanggal jatuh tempo. Kunjungi meja layanan atau hubungi petugas minimal 2 hari sebelum tanggal pengembalian.'
    },
    {
      pertanyaan: 'Apa sanksi jika buku terlambat dikembalikan?',
      jawaban: 'Keterlambatan dikenakan denda Rp500 per hari per buku. Buku yang rusak atau hilang wajib diganti dengan buku baru dengan judul yang sama.'
    },
    {
      pertanyaan: 'Berapa banyak buku yang bisa dipinjam sekaligus?',
      jawaban: 'Setiap anggota aktif dapat meminjam maksimal 3 buku secara bersamaan. Anggota dengan status Anggota Istimewa dapat meminjam hingga 5 buku.'
    },
    {
      pertanyaan: 'Bagaimana cara mendaftar sebagai anggota perpustakaan?',
      jawaban: 'Pendaftaran dilakukan di meja layanan dengan membawa kartu identitas mahasiswa atau pegawai yang masih berlaku. Kartu anggota akan diterbitkan dalam 1x24 jam.'
    }
  ];

  function tampilkanFaq(kataCari) {
    var htmlAccordion = '';
    var nomor = 0;

    for (var i = 0; i < dataFaq.length; i++) {
      var faq = dataFaq[i];
      var teksFaq = (faq.pertanyaan + ' ' + faq.jawaban).toLowerCase();

      if (teksFaq.indexOf(kataCari) !== -1) {
        var idItem = 'faqItem' + nomor;
        var idKonten = 'faqKonten' + nomor;

        htmlAccordion += '<div class="accordion-item">';
        htmlAccordion += '<h2 class="accordion-header" id="' + idItem + '">';
        htmlAccordion += '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#' + idKonten + '" aria-expanded="false" aria-controls="' + idKonten + '">';
        htmlAccordion += faq.pertanyaan;
        htmlAccordion += '</button></h2>';
        htmlAccordion += '<div id="' + idKonten + '" class="accordion-collapse collapse" aria-labelledby="' + idItem + '" data-bs-parent="#accordionFaq">';
        htmlAccordion += '<div class="accordion-body">' + faq.jawaban + '</div>';
        htmlAccordion += '</div></div>';
        nomor++;
      }
    }

    if (htmlAccordion === '') {
      htmlAccordion = '<div class="alert alert-warning">FAQ tidak ditemukan.</div>';
    }

    elemenAccordion.innerHTML = htmlAccordion;
  }

  var inputFaq = document.getElementById('cariFaq');

  inputFaq.addEventListener('input', function () {
    tampilkanFaq(inputFaq.value.toLowerCase());
  });

  tampilkanFaq('');
}
