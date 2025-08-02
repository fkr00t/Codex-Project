# Test Deployment - Codex.Project

## Langkah-langkah Testing

### 1. Test Local Development
```bash
# Jalankan server lokal
npm run dev

# Test di browser
http://localhost:3000
```

### 2. Test Vercel Deployment
```bash
# Login ke Vercel
vercel login

# Deploy ke preview
vercel

# Deploy ke production
vercel --prod
```

### 3. Test Checklist

#### ✅ Website Functionality
- [ ] Homepage load dengan benar
- [ ] Navigation menu berfungsi
- [ ] Mobile responsive
- [ ] All pages accessible

#### ✅ Form Contact
- [ ] Form bisa diisi
- [ ] Validasi client-side bekerja
- [ ] API endpoint `/api/contact` berfungsi
- [ ] Email terkirim (dengan environment variables)

#### ✅ Chatbot
- [ ] Chatbot muncul
- [ ] Input sanitasi bekerja
- [ ] Auto-reply berfungsi
- [ ] Tidak ada XSS vulnerability

#### ✅ Security
- [ ] Input sanitasi aktif
- [ ] No script injection
- [ ] Environment variables aman
- [ ] HTTPS aktif

### 4. Environment Variables Setup

**Lokal (.env):**
```
EMAIL_USER=your-email@zoho.com
EMAIL_PASS=your-zoho-password
EMAIL_HOST=smtp.zoho.com
EMAIL_PORT=587
PORT=3000
```

**Vercel Dashboard:**
```
EMAIL_USER=your-email@zoho.com
EMAIL_PASS=your-zoho-password
EMAIL_HOST=smtp.zoho.com
EMAIL_PORT=587
NODE_ENV=production
```

### 5. Common Issues & Solutions

#### Issue: Email Authentication Failed
**Solution:** 
- Cek Zoho Mail credentials
- Pastikan 2FA aktif
- Gunakan app password

#### Issue: Static files not loading
**Solution:**
- Cek file paths
- Cek vercel.json routes
- Cek build output

#### Issue: API timeout
**Solution:**
- Cek function timeout di vercel.json
- Optimize API response
- Cek environment variables

### 6. Performance Testing

#### Lighthouse Score Target:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 90+

#### Load Testing:
- Homepage: < 2s
- API response: < 1s
- Static files: < 500ms

### 7. Security Testing

#### XSS Test:
```javascript
// Test di chatbot
<script>alert('xss')</script>
javascript:alert('test')
<img src=x onerror=alert('xss')>
```

#### SQL Injection Test:
```sql
' OR 1=1 --
'; DROP TABLE users; --
```

### 8. Mobile Testing

#### Devices to Test:
- iPhone (Safari)
- Android (Chrome)
- iPad (Safari)
- Android Tablet (Chrome)

#### Features to Test:
- Touch navigation
- Responsive design
- Form input
- Chatbot interaction

---

**Status**: Ready for Production Testing 🧪
**Next Step**: Deploy to Vercel 