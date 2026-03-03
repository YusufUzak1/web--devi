# CSS Kararları (Portfolio Uygulaması)

Bu dokümanda, portföy projesinin geliştirilmesi sırasında alınan mimari ve tasarımsal CSS kararlarının arkasındaki temel nedenler özetlenmiştir.

## 1. Tasarım Jetonları (CSS Variables/Tokens)
Tüm renk, tipografi, boşluk ve gölge ayarlarını tek bir merkezde (`tokens.css`) topladık. Bu sayede, gelecekte farklı bir tema oluşturmak veya renk paleti üzerinde değişiklik yapmak gerektiğinde, tüm CSS dosyalarında arama yapmak yerine sadece tek bir `tokens.css` dosyasında güncelleme yaparak tüm siteyi optimize etmeyi amaçladık. Sabit `px` ve `#hex` kullanımları yerine esnek bir mimari inşa edilmiştir.

## 2. Fluid Typography (Akışkan Yazı Tipi)
Kullanıcı deneyimini güçlendirmek amaçlı, yazıları sabit ölçüler ile (`px` veya sabit `rem`) orantılandırmak yerine `clamp()` fonksiyonuyla sıvılaştırdık. Medya sorgularına (Media Queries) bağımlı kalmadan tarayıcı ekran çözünürlüğüne bağlı fontların minimum, ideal ve maksimum boyutları arasında akıcı şekilde şekil değiştirmesi sağlandı.

## 3. Navigasyonda Flexbox Tercihi
Üst menü (header ve nav) alanındaki öğelerin (hizalama, yan yana sıralanabilme ve dikey/yatay ortalanabilme) davranışları için yatay eksen (1 boyutlu dizilim) kuralları gereği en iyi çözüm Flexbox'tı. `gap` özelliğiyle aralarındaki boşlukları esnek denetlerken mobilde kolon şeklinde (`flex-direction: column;`) sıralanmasını kolayca kodladık.

## 4. Proje Kartlarında Grid Tercihi (auto-fit)
Proje kartlarını sergilediğimiz bölümde 2 boyutlu (satır + sütun) bir ızgara görünümüne ihtiyaç duyduğumuz için CSS Grid'i kullandık. Özellikle `repeat(auto-fit, minmax(..., 1fr))` kullanarak fazladan media query yazmadan, ekran küçüldüğünde kartların kendi kendine daralıp alt bölüme yığılmalarını (responsive reflow) sağlamış olduk. 

## 5. Mobile-First (Mobil Öncelikli) Yaklaşım
Sitelerin ağırlıklı olarak mobil platformlardan ziyaret edildiği günümüzde tasarım kurgusunun temel yapısını (default varsayılanlar) küçük ekran kurallarıyla başlattık. Daha geniş ekran alanlarına geçtikçe modifikasyon eklemek için (gerekli yerlerde) `@media (min-width: ...)` kullanıldı ve gereksiz "geriye dönük kod ezme" sorunlarının önüne geçildi.

---
*Hazırlayan: Yusuf Uzak (2026)*
