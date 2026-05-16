//@version=5
indicator("Ücretsiz Vercel Bot Sinyali", overlay=true)

// Fiyatı takip etmek için basit bir RSI indikatörü (Örnektir, senin stratejin neyse o çalışır)
rsiDeğeri = ta.rsi(close, 14)

// Koşul: RSI 30'un altına inerse (Aşırı satım) AL sinyali tetiklensin
alKoşulu = ta.crossover(rsiDeğeri, 30)

// Sinyal tetiklendiğinde Vercel'e gidecek olan Şifreli JSON Mesajı
// UYARI: Vercel url'sini Make.com'daki pembe webhook e-posta adresinle değiştireceksin!
if (alKoşulu)
    alert('{"symbol": "' + syminfo.ticker + '", "price": "' + str.tostring(close) + '", "signal": "LONG"}', alert.freq_once_per_bar)

// Grafik üzerinde sinyali görebilmek için küçük bir ok çizelim
plotshape(alKoşulu, title="Al Sinyali", location=location.belowbar, color=color.green, style=shape.triangleup, size=size.small)