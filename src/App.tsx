import { useState, useEffect } from 'react'
import Button from './components/Button'
import Input from './components/Input'
import Card from './components/Card'
import Alert from './components/Alert'
import ThemeToggle from './components/ThemeToggle'
import UIKit from './pages/UIKit'

import { Project, Category, FilterState } from './types/project'
import { fetchProjects } from './services/projectService'
import { filterBySearch, filterByCategory, sortProjects } from './utils/projectHelpers'

/**
 * App — Ana Uygulama Bileşeni
 */
export default function App() {
    const [page, setPage] = useState('portfolio')
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [success, setSuccess] = useState(false)

    // LAB-5 State Yönetimi
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [errorMsg, setErrorMsg] = useState<string | null>(null)
    
    const [filters, setFilters] = useState<FilterState>({
        searchQuery: '',
        category: 'All',
        sortBy: 'default'
    })

    // LAB-5 Veriyi Yükleme
    useEffect(() => {
        const loadProjects = async () => {
            setLoading(true)
            setErrorMsg(null)
            try {
                const data = await fetchProjects()
                setProjects(data)
            } catch (err) {
                setErrorMsg('Projeler yüklenirken bir hata oluştu.')
            } finally {
                setLoading(false)
            }
        }
        loadProjects()
    }, [])

    // Profil İletişim Formu (Mevcut Mantık)
    const validate = () => {
        const errs: { [key: string]: string } = {}
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const errs = validate()
        setErrors(errs)
        if (Object.keys(errs).length === 0) {
            setSuccess(true)
            setFormData({ name: '', email: '', subject: '', message: '' })
            setTimeout(() => setSuccess(false), 5000)
        }
    }

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }))
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
    }

    // Filtreleme ve Sıralama İşlemleri
    const filteredSearch = filterBySearch(projects, filters.searchQuery)
    const filteredCat = filterByCategory(filteredSearch, filters.category)
    const displayedProjects = sortProjects(filteredCat, filters.sortBy)

    // Kategoriler
    const categories: Category[] = ["All", "Web", "Mobile"]

    // ---- UI Kit sayfası ----
    if (page === 'uikit') {
        return (
            <div className="min-h-screen bg-bg text-text dark:bg-bg dark:text-text">
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
                            <div className="shrink-0">
                                <div className="w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full border-4 border-primary shadow-[0_0_20px_rgba(108,92,231,0.3)] bg-bg-secondary overflow-hidden flex items-center justify-center">
                                    <span className="text-sm">Profil Fotoğrafı</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl sm:text-2xl font-bold text-text-heading mb-3">Merhaba, Ben Yusuf!</h3>
                                <p className="text-text-muted text-base sm:text-lg mb-3 leading-relaxed">
                                    Yazılım geliştirme ve web teknolojileri alanında tutkulu bir üniversite öğrencisiyim.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== Projelerim (LAB-5 Entegrasyonu) ===== */}
                <section id="projelerim" className="py-16 sm:py-20 lg:py-24 bg-bg-secondary dark:bg-bg-secondary" aria-labelledby="projelerim-baslik">
                    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                            <h2 id="projelerim-baslik" className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-heading relative inline-block after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-[60px] after:h-1 after:bg-gradient-to-r after:from-primary after:to-secondary after:rounded-full">
                                Projelerim
                            </h2>
                        </div>

                        {/* Filtre ve Arama Alanı */}
                        <div className="mb-8 p-4 bg-bg-card rounded-lg shadow-sm border border-primary/10 flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <Input 
                                    label="Proje Ara" 
                                    placeholder="Proje adı, teknoloji vs." 
                                    value={filters.searchQuery}
                                    onChange={(e) => setFilters({...filters, searchQuery: e.target.value})}
                                />
                            </div>
                            
                            <div className="flex flex-col gap-1.5 flex-1 justify-end">
                                <label className="text-xs font-semibold uppercase tracking-wide text-text-heading">Kategori</label>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map(cat => (
                                        <Button 
                                            key={cat} 
                                            variant={filters.category === cat ? 'primary' : 'outline'} 
                                            size="sm"
                                            onClick={() => setFilters({...filters, category: cat})}
                                        >
                                            {cat}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5 flex-1 justify-end">
                                <label className="text-xs font-semibold uppercase tracking-wide text-text-heading">Sırala</label>
                                <select 
                                    className="px-4 py-2.5 rounded-md font-sans text-sm transition-all duration-200 focus:outline-none bg-bg-secondary border-2 border-primary/20 text-text"
                                    value={filters.sortBy}
                                    onChange={(e) => setFilters({...filters, sortBy: e.target.value as any})}
                                >
                                    <option value="default">Varsayılan</option>
                                    <option value="year">Yıla Göre (Yeniden Eskiye)</option>
                                    <option value="title">İsme Göre (A-Z)</option>
                                </select>
                            </div>
                        </div>

                        {/* Durumlar (Yükleniyor, Hata, Boş Liste) */}
                        {loading && (
                            <div className="text-center py-12">
                                <p className="text-text-muted text-lg">Yükleniyor...</p>
                            </div>
                        )}
                        
                        {errorMsg && (
                            <Alert type="error" className="mb-6">
                                {errorMsg}
                            </Alert>
                        )}

                        {!loading && !errorMsg && displayedProjects.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-text-muted text-lg">Arama kriterlerine uygun proje bulunamadı.</p>
                            </div>
                        )}

                        {/* Proje Listesi */}
                        {!loading && !errorMsg && displayedProjects.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {displayedProjects.map((project) => (
                                    <Card key={project.id} variant="elevated">
                                        <div className="aspect-video bg-bg-secondary flex items-center justify-center rounded-md overflow-hidden mb-4 relative">
                                            {project.featured && (
                                                <span className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-md z-10">Öne Çıkan</span>
                                            )}
                                            <img src={project.image} alt={project.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                        </div>
                                        <h3 className="text-lg font-bold text-text-heading mb-1">{project.title}</h3>
                                        <p className="text-xs text-primary mb-2 font-medium">{project.year} • {project.category}</p>
                                        <p className="text-text-muted text-sm leading-relaxed mb-3">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.tech.map((tag) => (
                                                <span key={tag} className="bg-secondary/10 text-secondary text-[0.7rem] font-semibold px-2.5 py-0.5 rounded-full border border-secondary/20 uppercase tracking-wide">{tag}</span>
                                            ))}
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* ===== İletişim ===== */}
                <section id="iletisim" className="py-16 sm:py-20 lg:py-24" aria-labelledby="iletisim-baslik">
                    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 id="iletisim-baslik" className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-heading mb-4 relative inline-block after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-[60px] after:h-1 after:bg-gradient-to-r after:from-primary after:to-secondary after:rounded-full">
                            İletişim
                        </h2>
                        {success && (
                            <Alert type="success" dismissible onClose={() => setSuccess(false)} className="mb-6 max-w-xl">
                                ✓ Mesajınız başarıyla gönderildi!
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit} noValidate className="max-w-xl space-y-5">
                            <Input
                                label="Ad Soyad"
                                type="text"
                                placeholder="Adınızı ve soyadınızı girin"
                                value={formData.name}
                                onChange={handleChange('name') as any}
                                error={errors.name}
                            />
                            <Input
                                label="E-posta"
                                type="email"
                                placeholder="ornek@email.com"
                                value={formData.email}
                                onChange={handleChange('email') as any}
                                error={errors.email}
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
                                    onChange={handleChange('message') as any}
                                    className="w-full px-4 py-2.5 rounded-md font-sans text-sm transition-all duration-200 focus:outline-none bg-bg-secondary border-2 border-primary/20 text-text"
                                />
                                {errors.message && (
                                    <small className="text-xs text-error" role="alert">{errors.message}</small>
                                )}
                            </div>
                            <Button type="submit" variant="primary" size="lg">Gönder</Button>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    )
}
