# Keamanan Website - Codex.Project

## Sanitasi Input untuk Mencegah Script Injection

### 1. Chatbot Widget (script.js)

#### Fitur Keamanan:
- ✅ **Sanitasi Input** - Mencegah XSS dengan `textContent`
- ✅ **Validasi Pattern** - Menghapus karakter berbahaya
- ✅ **Limit Panjang** - Maksimal 500 karakter per pesan
- ✅ **Console Warning** - Log untuk input berbahaya

#### Pattern yang Diblokir:
```javascript
/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi
/javascript:/gi
/on\w+\s*=/gi
/<iframe/gi
/<object/gi
/<embed/gi
/<form/gi
/<input/gi
/<textarea/gi
/<select/gi
/<button/gi
```

### 2. Form Contact (contact.html)

#### Fitur Keamanan:
- ✅ **Client-side Sanitasi** - Validasi sebelum kirim
- ✅ **Email Validation** - Regex untuk format email
- ✅ **Length Validation** - Minimal dan maksimal karakter
- ✅ **Input Sanitasi** - Menghapus karakter berbahaya

#### Validasi:
- **Nama**: Minimal 2 karakter
- **Email**: Format email valid
- **Pesan**: Minimal 10 karakter, maksimal 1000 karakter

### 3. Server-side API (/api/contact)

#### Fitur Keamanan:
- ✅ **Double Sanitasi** - Client + Server protection
- ✅ **Input Validation** - Validasi ulang di server
- ✅ **Email Template** - Data sanitasi di template
- ✅ **Error Handling** - Response error yang aman

#### Sanitasi Server:
```javascript
function sanitizeInput(input) {
    // Hapus karakter berbahaya
    // Validasi panjang
    // Return data bersih
}
```

### 4. Email Template

#### Fitur Keamanan:
- ✅ **Sanitized Data** - Hanya data bersih yang ditampilkan
- ✅ **HTML Escape** - Mencegah XSS di email
- ✅ **Safe Template** - Template yang aman

### 5. Best Practices

#### Implementasi:
1. **Input Validation** di client-side
2. **Double Sanitasi** di server-side
3. **Content Security Policy** (CSP)
4. **Regular Updates** untuk pattern berbahaya
5. **Logging** untuk monitoring

#### Monitoring:
- Console warnings untuk input berbahaya
- Server logs untuk tracking
- Email alerts untuk suspicious activity

### 6. Testing

#### Test Cases:
```javascript
// Test XSS
<script>alert('xss')</script>

// Test JavaScript injection
javascript:alert('test')

// Test Event handlers
<img src=x onerror=alert('xss')>

// Test Long input
// Input dengan 1000+ karakter
```

### 7. Maintenance

#### Regular Updates:
- Update pattern berbahaya
- Review security logs
- Update dependencies
- Monitor security advisories

---

**Status Keamanan**: ✅ AMAN
**Last Updated**: 2024
**Security Level**: HIGH 