import { useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import Card from '../components/Card'
import Alert from '../components/Alert'

/**
 * UIKit — Bileşen Dokümantasyon Sayfası
 * Tüm bileşenlerin varyantlarını bir arada sergiler.
 */
export default function UIKit() {
    const [inputValue, setInputValue] = useState('')

    return (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

            {/* ========== BUTTON ========== */}
            <section>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-heading mb-2">🔘 Button</h2>
                <p className="text-text-muted text-sm mb-6">4 renk varyantı × 3 boyut seçeneği, disabled durumu.</p>

                {/* Varyantlar */}
                <div className="space-y-6">
                    {/* Primary */}
                    <div>
                        <h3 className="text-sm font-semibold text-primary-light uppercase tracking-wider mb-3">Primary</h3>
                        <div className="flex flex-wrap items-end gap-3">
                            <Button variant="primary" size="sm">Small</Button>
                            <Button variant="primary" size="md">Medium</Button>
                            <Button variant="primary" size="lg">Large</Button>
                            <Button variant="primary" size="md" disabled>Disabled</Button>
                        </div>
                    </div>

                    {/* Secondary */}
                    <div>
                        <h3 className="text-sm font-semibold text-primary-light uppercase tracking-wider mb-3">Secondary</h3>
                        <div className="flex flex-wrap items-end gap-3">
                            <Button variant="secondary" size="sm">Small</Button>
                            <Button variant="secondary" size="md">Medium</Button>
                            <Button variant="secondary" size="lg">Large</Button>
                            <Button variant="secondary" size="md" disabled>Disabled</Button>
                        </div>
                    </div>

                    {/* Danger */}
                    <div>
                        <h3 className="text-sm font-semibold text-primary-light uppercase tracking-wider mb-3">Danger</h3>
                        <div className="flex flex-wrap items-end gap-3">
                            <Button variant="danger" size="sm">Small</Button>
                            <Button variant="danger" size="md">Medium</Button>
                            <Button variant="danger" size="lg">Large</Button>
                            <Button variant="danger" size="md" disabled>Disabled</Button>
                        </div>
                    </div>

                    {/* Ghost */}
                    <div>
                        <h3 className="text-sm font-semibold text-primary-light uppercase tracking-wider mb-3">Ghost</h3>
                        <div className="flex flex-wrap items-end gap-3">
                            <Button variant="ghost" size="sm">Small</Button>
                            <Button variant="ghost" size="md">Medium</Button>
                            <Button variant="ghost" size="lg">Large</Button>
                            <Button variant="ghost" size="md" disabled>Disabled</Button>
                        </div>
                    </div>
                </div>
            </section>

            <hr className="border-primary/15 dark:border-primary-light/15" />

            {/* ========== INPUT ========== */}
            <section>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-heading mb-2">✏️ Input</h2>
                <p className="text-text-muted text-sm mb-6">Normal, hatalı (error) ve devre dışı (disabled) durumları.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl">
                    <Input
                        label="Normal"
                        placeholder="Metin giriniz…"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <Input
                        label="Hatalı (Error)"
                        placeholder="Hatalı giriş"
                        error="Bu alan zorunludur."
                        defaultValue="yanlış-değer"
                    />
                    <Input
                        label="Devre Dışı (Disabled)"
                        placeholder="Düzenlenemez"
                        disabled
                        value="Salt okunur"
                    />
                </div>
            </section>

            <hr className="border-primary/15 dark:border-primary-light/15" />

            {/* ========== CARD ========== */}
            <section>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-heading mb-2">🃏 Card</h2>
                <p className="text-text-muted text-sm mb-6">Gölgeli (elevated), çerçeveli (outlined) ve dolgulu (filled) varyantlar.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card variant="elevated" title="Elevated Card">
                        <p className="text-text-muted text-sm">Gölge efekti ile derinlik hissi veren kart tasarımı. Hover ile yukarı kayar.</p>
                        <div className="mt-4">
                            <Button variant="primary" size="sm">Detaylar</Button>
                        </div>
                    </Card>

                    <Card variant="outlined" title="Outlined Card">
                        <p className="text-text-muted text-sm">Çerçeve ile ayrılmış, şeffaf arka planlı temiz kart tasarımı.</p>
                        <div className="mt-4">
                            <Button variant="secondary" size="sm">Detaylar</Button>
                        </div>
                    </Card>

                    <Card variant="filled" title="Filled Card">
                        <p className="text-text-muted text-sm">Dolgulu arka plan ile yumuşak geçişli, modern kart tasarımı.</p>
                        <div className="mt-4">
                            <Button variant="ghost" size="sm">Detaylar</Button>
                        </div>
                    </Card>
                </div>
            </section>

            <hr className="border-primary/15 dark:border-primary-light/15" />

            {/* ========== ALERT ========== */}
            <section>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-heading mb-2">🔔 Alert</h2>
                <p className="text-text-muted text-sm mb-6">Info, success, warning ve error tipleri. Kapatılabilir (dismissible) seçeneği.</p>

                <div className="space-y-4 max-w-2xl">
                    {/* Sabit (kapatılamayan) */}
                    <Alert type="info">
                        <strong>Bilgi:</strong> Sisteminiz başarıyla güncellendi.
                    </Alert>
                    <Alert type="success">
                        <strong>Başarılı:</strong> İşlem tamamlandı, değişiklikler kaydedildi.
                    </Alert>
                    <Alert type="warning">
                        <strong>Uyarı:</strong> Oturumunuzun süresi 5 dakika içinde dolacak.
                    </Alert>
                    <Alert type="error">
                        <strong>Hata:</strong> Bağlantı kurulamadı, lütfen tekrar deneyin.
                    </Alert>

                    {/* Kapatılabilir (dismissible) */}
                    <div className="mt-6">
                        <h3 className="text-sm font-semibold text-primary-light uppercase tracking-wider mb-3">Kapatılabilir (Dismissible)</h3>
                        <div className="space-y-3">
                            <Alert type="info" dismissible>
                                Bu bildirim kapatılabilir — sağdaki × butonuna tıklayın.
                            </Alert>
                            <Alert type="success" dismissible>
                                Dosya başarıyla yüklendi! Bu mesajı kapatabilirsiniz.
                            </Alert>
                            <Alert type="warning" dismissible>
                                Disk alanınız azalıyor. Gereksiz dosyaları temizleyin.
                            </Alert>
                            <Alert type="error" dismissible>
                                Ödeme işlemi başarısız oldu. Kart bilgilerinizi kontrol edin.
                            </Alert>
                        </div>
                    </div>
                </div>
            </section>

            {/* Alt boşluk */}
            <div className="pb-8" />
        </main>
    )
}
