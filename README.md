# Codex.Projct Landing Page

## 🚀 Fitur

- **Design Modern**: Tampilan yang clean dan profesional
- **Responsive**: Optimal di semua perangkat (desktop, tablet, mobile)
- **Interactive Elements**: Animasi smooth dan efek hover
- **Contact Form**: Form kontak yang fungsional
- **Chat Widget**: Widget chat untuk customer service
- **FAQ Section**: Accordion untuk pertanyaan umum
- **Testimonials**: Testimoni klien dengan layout yang menarik
- **Statistics Counter**: Animasi counter untuk statistik
- **Smooth Scrolling**: Navigasi yang smooth antar section

## 📁 Struktur File

```
├── index.html          # File HTML utama
├── styles.css          # File CSS untuk styling
├── script.js           # File JavaScript untuk interaktivitas
└── README.md           # Dokumentasi proyek
```

## 🛠️ Teknologi yang Digunakan

- **HTML5**: Struktur semantic yang baik
- **CSS3**: Flexbox, Grid, Animations, Transitions
- **JavaScript**: Vanilla JS untuk interaktivitas
- **Node.js**: Server runtime
- **Express.js**: Web framework
- **Font Awesome**: Icons
- **Google Fonts**: Font Inter untuk typography

## 🔌 API Endpoints

### POST `/api/contact`
Endpoint untuk mengirim form kontak

**Request Body:**
```json
{
  "name": "Nama Lengkap",
  "company": "Nama Perusahaan",
  "email": "email@example.com",
  "phone": "+628-xxxx-xxxx",
  "message": "Pesan Anda"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Terima kasih! Pesan Anda telah terkirim."
}
```

### GET `/api/stats`
Endpoint untuk mendapatkan statistik perusahaan


## 🎨 Sections

1. **Header**: Navigation bar dengan dropdown menu
2. **Hero**: Section utama dengan call-to-action
3. **Why Choose Us**: Keunggulan perusahaan
4. **Services**: Layanan yang ditawarkan
5. **Statistics**: Statistik perusahaan
6. **What You Need**: Kebutuhan target audience
7. **Featured In**: Media yang meliput
8. **FAQ**: Pertanyaan yang sering diajukan
9. **Clients**: Logo klien
10. **Testimonials**: Testimoni klien
11. **Contact**: Form kontak
12. **Footer**: Informasi lengkap perusahaan

## 🚀 Cara Menjalankan

### Prasyarat
- Node.js (versi 14.0.0 atau lebih baru)
- npm atau yarn

### Instalasi & Menjalankan

1. **Clone atau download repository ini**
```bash
git clone <repository-url>
cd digital-marketing-landing-page
```

2. **Install dependencies**
```bash
npm install
```

3. **Jalankan development server**
```bash
npm run dev
```

4. **Buka browser dan akses**
```
http://localhost:3000
```

### Scripts yang Tersedia

```bash
npm run dev      # Menjalankan server development
npm start        # Menjalankan server production
npm run build    # Build proyek (untuk static site)
```

### Alternatif: Tanpa Server
Jika tidak ingin menggunakan server, bisa langsung buka file `index.html` di browser, namun beberapa fitur API tidak akan berfungsi.

## 📱 Responsive Design

Website ini responsive dan optimal di:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

## 🎯 Fitur Interaktif

- **Mobile Menu**: Hamburger menu untuk mobile
- **FAQ Accordion**: Expand/collapse pertanyaan
- **Chat Widget**: Popup chat untuk customer service
- **Form Validation**: Validasi form kontak
- **Scroll Animations**: Animasi saat scroll
- **Counter Animation**: Animasi angka statistik
- **Parallax Effect**: Efek parallax pada hero section
- **Back to Top**: Tombol kembali ke atas

## 🎨 Kustomisasi

### Mengubah Warna
Warna utama website dapat diubah di file `styles.css`:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #1d4ed8;
    --gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Mengubah Konten
- Edit file `index.html` untuk mengubah teks dan konten
- Ganti placeholder images dengan gambar asli
- Update informasi kontak dan social media links

### Mengubah Animasi
- Edit file `script.js` untuk mengubah behavior interaktif
- Modifikasi CSS animations di `styles.css`

## 📞 Kontak

Untuk pertanyaan atau feedback, silakan hubungi:
- Email: bimaa0938@gmail.com
- WhatsApp: +62 882-3058-4013

## 📄 Lisensi

Proyek ini dibuat untuk tujuan usaha.

## 🙏 Credits

- Icons: [Font Awesome](https://fontawesome.com/)
- Fonts: [Google Fonts](https://fonts.google.com/)
- Placeholder Images: [Placeholder.com](https://placeholder.com/)

---

--
serve . -l tcp://0.0.0.0:3000
Run:  http://192.168.1.4:3000
