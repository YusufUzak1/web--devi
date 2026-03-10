import { useState } from 'react'
import Button from './components/Button'
import Input from './components/Input'
import Card from './components/Card'
import Alert from './components/Alert'
import ThemeToggle from './components/ThemeToggle'
import UIKit from './pages/UIKit'

/**
 * App — Ana Uygulama Bileşeni
 * Portföy sayfası ve UI Kit sayfası arasında geçiş yapılabilir.
 */
export default function App() {
    const [page, setPage] = useState('portfolio')
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
    const [errors, setErrors] = useState({})
    const [success, setSuccess] = useState(false)

    // ---- Form Doğrulama ----
    const validate = () => {
        const errs = {}
        if (!formData.name.trim() || formData.name.trim().length < 2)
            errs.name = 'Ad Soyad en az 2 karakter olmalıdır.'
        if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
            errs.email = 'Geçerli bir e-posta adresi giriniz.'
        if (!formData.subject.trim() || formData.subject.trim().length < 3)
            errs.subject = 'Konu en az 3 karakter olmalıdır.'
        if (!formData.message.trim() || formData.message.trim().length < 10)
            errs.message = 'Mesaj en az 10 karakter olmalıdır.'
        return errs
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const errs = validate()
        setErrors(errs)
        if (Object.keys(errs).length === 0) {
            setSuccess(true)
            setFormData({ name: '', email: '', subject: '', message: '' })
            setTimeout(() => setSuccess(false), 5000)
        }
    }

    const handleChange = (field) => (e) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }))
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
    }

    // ---- UI Kit sayfası ----
    if (page === 'uikit') {
        return (
            <div className="min-h-screen bg-bg text-text dark:bg-bg dark:text-text">
                {/* Üst Bar */}
                <header className="sticky top-0 z-50 bg-bg/85 backdrop-blur-xl border-b border-primary/15 dark:bg-bg/85 dark:border-primary-light/15">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <h1 className="text-lg sm:text-xl font-extrabold text-text-heading">
                            <span className="text-primary-light">&lt;</span> UI Kit <span className="text-primary-light">/&gt;</span>
                        </h1>
                        <div className="flex items-center gap-3">
                            <Button variant="ghost" size="sm" onClick={() => setPage('portfolio')}>
                                ← Portföy
                            </Button>
                            <ThemeToggle />
                        </div>
                    </div>
                </header>
                <UIKit />
            </div>
        )
    }

    // ---- Portföy Sayfası ----
    return (
        <div className="min-h-screen bg-bg text-text dark:bg-bg dark:text-text">

            {/* ==================== HEADER ==================== */}
            <header className="sticky top-0 z-50 bg-bg/85 backdrop-blur-xl border-b border-primary/15 py-3 dark:bg-bg/85 dark:border-primary-light/15">
                <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <h1 className="text-xl font-extrabold text-text-heading tracking-tight">
                        <span className="text-primary-light">&lt;</span> Yusuf Uzak <span className="text-primary-light">/&gt;</span>
                    </h1>
                    <nav aria-label="Ana menü" className="flex items-center gap-2 sm:gap-4">
                        <ul className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 list-none p-0 m-0">
                            <li><a href="#hakkimda" className="text-text-muted text-xs sm:text-sm uppercase tracking-wider font-medium px-2 py-1 rounded-md hover:text-text-heading hover:bg-primary/10 transition-all">Hakkımda</a></li>
                            <li><a href="#projelerim" className="text-text-muted text-xs sm:text-sm uppercase tracking-wider font-medium px-2 py-1 rounded-md hover:text-text-heading hover:bg-primary/10 transition-all">Projelerim</a></li>
                            <li><a href="#iletisim" className="text-text-muted text-xs sm:text-sm uppercase tracking-wider font-medium px-2 py-1 rounded-md hover:text-text-heading hover:bg-primary/10 transition-all">İletişim</a></li>
                        </ul>
                        <Button variant="ghost" size="sm" onClick={() => setPage('uikit')}>
                            UI Kit
                        </Button>
                        <ThemeToggle />
                    </nav>
                </div>
            </header>

            {/* ==================== MAIN ==================== */}
            <main id="main-content">

                {/* ===== Hakkımda ===== */}
                <section id="hakkimda" className="py-16 sm:py-20 lg:py-24" aria-labelledby="hakkimda-baslik">
                    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 id="hakkimda-baslik" className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-heading mb-8 relative inline-block after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-[60px] after:h-1 after:bg-gradient-to-r after:from-primary after:to-secondary after:rounded-full">
                            Hakkımda
                        </h2>
                        <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-8 md:gap-12">
                            {/* Profil fotoğrafı */}
                            <div className="shrink-0">
                                <div className="w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full border-4 border-primary shadow-[0_0_20px_rgba(108,92,231,0.3)] bg-bg-secondary overflow-hidden">
                                    <img
                                        src="/images/profil.jpg"
                                        alt="Yusuf Uzak'ın profil fotoğrafı"
                                        className="w-full h-full object-cover"
                                        width={280}
                                        height={280}
                                    />
                                </div>
                            </div>
                            {/* Metin */}
                            <div>
                                <h3 className="text-xl sm:text-2xl font-bold text-text-heading mb-3">Merhaba, Ben Yusuf!</h3>
                                <p className="text-text-muted text-base sm:text-lg mb-3 leading-relaxed">
                                    Yazılım geliştirme ve web teknolojileri alanında tutkulu bir üniversite öğrencisiyim.
                                    Modern web standartları, erişilebilirlik ve kullanıcı deneyimi konularında kendimi sürekli geliştiriyorum.
                                </p>
                                <p className="text-text-muted text-base sm:text-lg mb-5 leading-relaxed">
                                    Şu anda bilgisayar mühendisliği okuyorum ve boş zamanlarımda açık kaynak projelere katkıda bulunuyorum.
                                </p>
                                <ul className="flex flex-wrap justify-center md:justify-start gap-2 list-none p-0" aria-label="Yetenekler">
                                    {['HTML5 & CSS3', 'JavaScript', 'C# / .NET', 'Python', 'Git & GitHub', 'Erişilebilirlik (a11y)'].map((skill) => (
                                        <li key={skill} className="bg-gradient-to-br from-primary/15 to-secondary/10 border border-primary/25 text-primary-light text-xs sm:text-sm font-medium px-3 py-1.5 rounded-md">
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== Projelerim ===== */}
                <section id="projelerim" className="py-16 sm:py-20 lg:py-24 bg-bg-secondary dark:bg-bg-secondary" aria-labelledby="projelerim-baslik">
                    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 id="projelerim-baslik" className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-heading mb-8 relative inline-block after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-[60px] after:h-1 after:bg-gradient-to-r after:from-primary after:to-secondary after:rounded-full">
                            Projelerim
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Proje 1 */}
                            <Card variant="elevated">
                                <div className="aspect-video bg-bg-secondary rounded-md overflow-hidden mb-4">
                                    <img src="/images/proje1.jpg" alt="Eczane Yönetim Sistemi arayüz ekran görüntüsü" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                </div>
                                <h3 className="text-lg font-bold text-text-heading mb-2">Eczane Yönetim Sistemi</h3>
                                <p className="text-text-muted text-sm leading-relaxed mb-3">
                                    C# ve .NET ile geliştirilmiş, stok takibi, reçete yönetimi ve yapay zekâ destekli ilaç etkileşim kontrolü sunan masaüstü uygulaması.
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {['C#', '.NET', 'SQL'].map((tag) => (
                                        <span key={tag} className="bg-secondary/10 text-secondary text-[0.7rem] font-semibold px-2.5 py-0.5 rounded-full border border-secondary/20 uppercase tracking-wide">{tag}</span>
                                    ))}
                                </div>
                            </Card>

                            {/* Proje 2 */}
                            <Card variant="elevated">
                                <div className="aspect-video bg-bg-secondary rounded-md overflow-hidden mb-4">
                                    <img src="/images/proje2.jpg" alt="Duygu Analizi web uygulaması ekran görüntüsü" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                </div>
                                <h3 className="text-lg font-bold text-text-heading mb-2">Duygu Analizi Uygulaması</h3>
                                <p className="text-text-muted text-sm leading-relaxed mb-3">
                                    Python ve DeepFace kütüphanesi kullanılarak geliştirilen, yüz ifadelerinden duygu analizi yapan web tabanlı uygulama.
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {['Python', 'DeepFace', 'Docker'].map((tag) => (
                                        <span key={tag} className="bg-secondary/10 text-secondary text-[0.7rem] font-semibold px-2.5 py-0.5 rounded-full border border-secondary/20 uppercase tracking-wide">{tag}</span>
                                    ))}
                                </div>
                            </Card>

                            {/* Proje 3 */}
                            <Card variant="elevated">
                                <div className="aspect-video bg-bg-secondary rounded-md overflow-hidden mb-4">
                                    <img src="/images/proje3.jpg" alt="Kişisel portföy web sitesi ekran görüntüsü" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                </div>
                                <h3 className="text-lg font-bold text-text-heading mb-2">Portföy Web Sitesi</h3>
                                <p className="text-text-muted text-sm leading-relaxed mb-3">
                                    Semantik HTML5, erişilebilirlik standartları ve modern CSS ile oluşturulmuş kişisel portföy sayfası.
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {['HTML5', 'CSS3', 'a11y'].map((tag) => (
                                        <span key={tag} className="bg-secondary/10 text-secondary text-[0.7rem] font-semibold px-2.5 py-0.5 rounded-full border border-secondary/20 uppercase tracking-wide">{tag}</span>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* ===== İletişim ===== */}
                <section id="iletisim" className="py-16 sm:py-20 lg:py-24" aria-labelledby="iletisim-baslik">
                    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 id="iletisim-baslik" className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-heading mb-4 relative inline-block after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-[60px] after:h-1 after:bg-gradient-to-r after:from-primary after:to-secondary after:rounded-full">
                            İletişim
                        </h2>
                        <p className="text-text-muted text-base sm:text-lg max-w-xl mb-8">
                            Bir sorunuz mu var veya birlikte çalışmak mı istiyorsunuz? Aşağıdaki formu doldurun, en kısa sürede dönüş yapacağım.
                        </p>

                        {success && (
                            <Alert type="success" dismissible onClose={() => setSuccess(false)} className="mb-6 max-w-xl">
                                ✓ Mesajınız başarıyla gönderildi! En kısa sürede dönüş yapacağım.
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit} noValidate className="max-w-xl space-y-5">
                            <Input
                                label="Ad Soyad"
                                type="text"
                                placeholder="Adınızı ve soyadınızı girin"
                                value={formData.name}
                                onChange={handleChange('name')}
                                error={errors.name}
                                autoComplete="name"
                            />
                            <Input
                                label="E-posta"
                                type="email"
                                placeholder="ornek@email.com"
                                value={formData.email}
                                onChange={handleChange('email')}
                                error={errors.email}
                                autoComplete="email"
                            />
                            <Input
                                label="Konu"
                                type="text"
                                placeholder="Mesajınızın konusu"
                                value={formData.subject}
                                onChange={handleChange('subject')}
                                error={errors.subject}
                            />
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wide text-text-heading">
                                    Mesaj
                                </label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    placeholder="Mesajınızı buraya yazın..."
                                    value={formData.message}
                                    onChange={handleChange('message')}
                                    className={`w-full px-4 py-2.5 rounded-md font-sans text-sm transition-all duration-200 focus:outline-none bg-bg-secondary border-2 text-text placeholder-text-muted/60 dark:bg-bg-card dark:text-text resize-y min-h-[120px] ${errors.message
                                            ? 'border-error focus:border-error focus:ring-2 focus:ring-error/20'
                                            : 'border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-primary-light/20 dark:focus:border-primary-light dark:focus:ring-primary-light/20'
                                        }`}
                                />
                                {errors.message && (
                                    <small className="text-xs text-error" role="alert">{errors.message}</small>
                                )}
                            </div>
                            <Button type="submit" variant="primary" size="lg">
                                <span>Gönder</span>
                                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                    <path d="M22 2L11 13" />
                                    <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                                </svg>
                            </Button>
                        </form>
                    </div>
                </section>
            </main>

            {/* ==================== FOOTER ==================== */}
            <footer className="bg-bg-secondary border-t border-primary/10 py-8 text-center dark:bg-bg-secondary dark:border-primary-light/10">
                <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-text-muted text-sm">&copy; 2026 Yusuf Uzak. Tüm hakları saklıdır.</p>
                    <p className="text-text-muted text-xs mt-1 opacity-60">Tailwind CSS v4 &amp; React ile oluşturulmuştur.</p>
                </div>
            </footer>
        </div>
    )
}
