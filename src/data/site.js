/**
 * ─────────────────────────────────────────────────────────────
 *  SAYT MAZMUNI — barcha matn, kontakt va rasmlar shu faylda.
 *  Loyihalar va turkumlar: src/data/projects.js
 * ─────────────────────────────────────────────────────────────
 *  Barcha ma’lumotlar namuna (placeholder) — o‘zingiznikiga almashtiring.
 */
import { unsplash } from './projects'

/* ── Dizayner ──────────────────────────────────────────────── */
export const designer = {
  name: 'Jahongir Ibragimov',
  initials: 'JI',
  studio: 'Ibragimov Design',
  title: 'Interyer dizayner va arxitektor',
  tagline: 'Sokin, puxta o‘ylangan va aynan siz uchun yaratilgan makonlar.',
  // Namuna portret — o‘z rasmingiz bilan almashtiring (masalan '/images/jahongir.jpg')
  photo: unsplash('1519085360753-af0119f7cbe7', 1200),
  workPhoto: unsplash('1503387762-592deb58ef4e', 1600),
  intro:
    'Uch yildan ortiq vaqt davomida xonadonlar, restoranlar va ofislarni loyihalab kelaman — har birini unda yashaydigan va ishlaydigan insonlarga moslab.',
  bio: [
    'Men — Jahongir Ibragimov, 2005-yilda tug‘ilganman. Interyer dizayn va arxitekturaga qiziqishim maktab yillaridayoq boshlangan: eskizlar chizish, uylarning rejasini o‘rganish va 3D modellashtirish bilan shug‘ullanganman.',
    'Uch yildan ortiq vaqtdan beri professional tarzda loyihalar ustida ishlayman. To‘liq sikl bo‘yicha ishlayman: birinchi o‘lchovdan va rejalashtirishdan tortib 3D vizualizatsiya, materiallar tanlash va qurilish maydonidagi mualliflik nazoratigacha. Shuning uchun tayyor makon renderdagi bilan bir xil bo‘ladi.',
    'Men uchun har bir loyiha — mijoz bilan birga yoziladigan hikoya. Zamonaviy texnologiyalar, yangicha fikrlash va detallarga e’tibor — mening ishimning asosi.',
  ],
  philosophy:
    'Yaxshi dizayn ko‘rinishidan oldin his qilinadi. Men xonadagi insonga xizmat qilmaydigan hamma narsani olib tashlayman va qolganini yorug‘lik, mutanosiblik va tabiiy materiallarga topshiraman.',
  // Namuna raqamlar — haqiqiylariga almashtiring
  stats: [
    { value: 3, suffix: '+', label: 'Yillik tajriba' },
    { value: 40, suffix: '+', label: 'Amalga oshgan loyiha' },
    { value: 12, suffix: 'k', label: 'm² loyihalangan maydon' },
    { value: 35, suffix: '+', label: 'Mamnun mijozlar' },
  ],
  values: [
    { title: 'Tinglash', text: 'Dizayn sizning odatlaringiz, orzularingiz va byudjetingizni tushunishdan boshlanadi.' },
    { title: 'Aniqlik', text: 'Har bir detal chizmada aniqlanadi — qurilishda taxmin va kutilmagan xarajatlarga o‘rin yo‘q.' },
    { title: 'Abadiylik', text: 'Modaga emas, vaqt sinovidan o‘tadigan yechimlarga va sifatli materiallarga tayanaman.' },
  ],
  // Namuna — haqiqiy voqealar bilan almashtiring
  timeline: [
    { year: '2005', text: 'Toshkentda tug‘ildi' },
    { year: '2022', text: 'Interyer dizayn va 3D vizualizatsiya bo‘yicha birinchi buyurtmalar' },
    { year: '2023', text: 'Birinchi to‘liq “kalit topshirish” loyihasi — oilaviy xonadon' },
    { year: '2024', text: 'Tijorat va restoran loyihalari, doimiy pudratchilar jamoasi' },
    { year: '2025', text: 'Ibragimov Design studiyasi — 40 dan ortiq amalga oshgan loyiha' },
  ],
  // Namuna — haqiqiy sertifikat va yutuqlaringiz bilan almashtiring
  awards: [
    { year: '2025', title: 'Yilning yosh dizayneri — nominant', org: 'Design Week Tashkent' },
    { year: '2024', title: '3ds Max va Corona Renderer sertifikati', org: 'Autodesk / Chaos' },
    { year: '2023', title: 'Interyer dizayn professional kursi', org: 'Sertifikat' },
  ],
}

/* ── Kontaktlar ────────────────────────────────────────────── */
export const contact = {
  phone: '+998 93 358 70 08',
  phoneHref: 'tel:+998933587008',
  // Namuna — haqiqiy email, Instagram va Telegram manzillarini yozing
  email: 'info@ibragimov.design',
  instagram: { handle: '@ibragimov.design', url: 'https://instagram.com/' },
  telegram: { handle: '@ibragimovdesign', url: 'https://t.me/' },
  address: 'Toshkent sh., Amir Temur shoh ko‘chasi, 12',
  // Xarita uchun manzil yoki "kenglik,uzunlik"
  mapQuery: 'Amir Temur Avenue, Tashkent',
  hours: [
    { days: 'Dushanba – Juma', time: '10:00 – 19:00' },
    { days: 'Shanba', time: '11:00 – 16:00 (oldindan yozilib)' },
    { days: 'Yakshanba', time: 'Dam olish kuni' },
  ],
  // Forma xabarlarini qabul qilish uchun Formspree / Getform yoki o‘z API manzilingizni
  // yozing. Bo‘sh bo‘lsa, forma faqat tekshiradi va xabar yubormaydi (demo rejim).
  formEndpoint: '',
}

/* ── Menyu ─────────────────────────────────────────────────── */
export const nav = [
  { to: '/projects', label: 'Loyihalar' },
  { to: '/services', label: 'Xizmatlar' },
  { to: '/about', label: 'Men haqimda' },
  { to: '/contact', label: 'Aloqa' },
]

/* ── Xizmatlar ─────────────────────────────────────────────── */
// `icon` — src/components/BaseIcon.vue dagi nomlardan biri
export const services = [
  {
    icon: 'sofa',
    title: 'Interyer dizayn',
    short: 'Rejalashtirish, materiallar, yoritish va ish chizmalaridan iborat to‘liq dizayn-loyiha.',
    text: 'Kvartira, uy yoki tijorat makoni uchun to‘liq dizayn-loyiha. Siz qurilish brigadasiga topshirish mumkin bo‘lgan, har bir detali aniqlangan hujjatlar to‘plamini olasiz.',
    includes: ['O‘lchov va rejalashtirish variantlari', 'Uslub konsepsiyasi va mud-bord', 'Har bir xonaning 3D vizualizatsiyasi', 'Ish chizmalari to‘plami', 'Materiallar va mebel spetsifikatsiyasi'],
    price: '1 m² uchun 250 000 so‘mdan',
    image: unsplash('1616137466211-f939a420be84', 1600),
  },
  {
    icon: 'plan',
    title: 'Arxitektura loyihasi',
    short: 'Xususiy uylar va tijorat binolari uchun arxitektura yechimlari va qayta rejalashtirish.',
    text: 'Xususiy uy yoki tijorat binosining arxitektura konsepsiyasi — hajm, fasad, uchastkadagi joylashuv va tabiiy yorug‘likni hisobga olgan holda.',
    includes: ['Uchastka tahlili', 'Hajmiy-rejaviy yechim', 'Fasad dizayni', 'Eskiz loyiha', 'Konstruktorlar bilan muvofiqlashtirish'],
    price: 'Kelishuv asosida',
    image: unsplash('1600607688969-a5bfcd646154', 1600),
  },
  {
    icon: 'cube',
    title: '3D vizualizatsiya',
    short: 'Ish boshlanishidan oldin makoningizni ko‘rish imkonini beruvchi fotorealistik renderlar.',
    text: 'Fotorealistik renderlar yordamida ta’mir boshlanishidan oldin makoningiz qanday ko‘rinishini aniq bilasiz va barcha qarorlarni oldindan qabul qilasiz.',
    includes: ['3D model', 'Har bir xonadan 3–4 ta ko‘rinish', 'Ikki marta tuzatish', 'Kunduzgi va kechki yoritish', 'Yuqori sifatli fayllar'],
    price: '1 m² uchun 120 000 so‘mdan',
    image: unsplash('1618221639244-c1a8502c0eb9', 1600),
  },
  {
    icon: 'helmet',
    title: 'Ta’mir nazorati',
    short: 'Pudratchilar loyiha, byudjet va muddatga amal qilishini ta’minlovchi mualliflik nazorati.',
    text: 'Mualliflik nazorati — loyiha qog‘ozda qolib ketmasligining kafolati. Qurilish maydoniga muntazam tashrif buyurib, ishlar sifatini va loyihaga muvofiqligini tekshiraman.',
    includes: ['Haftalik tashriflar', 'Pudratchilar bilan ishlash', 'Foto hisobotlar', 'Materiallarni qabul qilish', 'Byudjet nazorati'],
    price: 'Oyiga 4 000 000 so‘mdan',
    image: unsplash('1504307651254-35680f356dfd', 1600),
  },
  {
    icon: 'armchair',
    title: 'Mebel va dekor',
    short: 'Mebel, matolar, san’at asarlari va aksessuarlarni tanlash, jumladan individual buyurtmalar.',
    text: 'Mahalliy va xorijiy yetkazib beruvchilardan mebel, yoritgichlar, matolar va dekor tanlab, xarid va yetkazib berishni tashkil qilaman. Dizaynerlik chegirmalari sizga o‘tadi.',
    includes: ['Xarid ro‘yxati', 'Individual mebel chizmalari', 'Yetkazib beruvchilar bilan muzokara', 'Yetkazib berish nazorati', 'Yakuniy dekoratsiya'],
    price: 'Kelishuv asosida',
    image: unsplash('1582037928769-181f2644ecb7', 1600),
  },
  {
    icon: 'lamp',
    title: 'Yoritish dizayni',
    short: 'Kayfiyat yaratuvchi va har bir materialni eng yaxshi ko‘rsatuvchi ko‘p qatlamli yoritish.',
    text: 'Yoritish — interyerning eng kam baholanadigan qismi. Umumiy, ish va dekorativ yoritish qatlamlarini loyihalab, har bir xona uchun ssenariylar yarataman.',
    includes: ['Yoritish rejasi', 'Yoritgichlar tanlovi', 'Ssenariylar va “aqlli uy”', 'Elektr bilan muvofiqlashtirish'],
    price: '1 m² uchun 60 000 so‘mdan',
    image: unsplash('1611048267451-e6ed903d4a38', 1600),
  },
]

/* ── Ish jarayoni ──────────────────────────────────────────── */
export const process = [
  {
    icon: 'chat',
    title: 'Konsultatsiya',
    duration: '1 – 2 kun',
    text: 'Obyektda yoki onlayn uchrashib, ehtiyojlaringiz, byudjet va muddatlarni muhokama qilamiz, o‘lchovlarni olamiz.',
  },
  {
    icon: 'pen',
    title: 'Konsepsiya',
    duration: '1 – 2 hafta',
    text: 'Rejalashtirish, mud-bordlar va loyihaning xarakterini belgilaydigan materiallar palitrasi.',
  },
  {
    icon: 'cube',
    title: '3D vizualizatsiya',
    duration: '2 – 4 hafta',
    text: 'Har bir xonaning fotorealistik renderlari — har bir detal sizga yoqmaguncha birga takomillashtiramiz.',
  },
  {
    icon: 'key',
    title: 'Amalga oshirish',
    duration: 'Loyihaga qarab',
    text: 'Ish chizmalari, xaridlar va mualliflik nazorati — kalitlarni topshirgunimizcha.',
  },
]

/* ── Mijozlar fikri (namuna — haqiqiylariga almashtiring) ─── */
export const testimonials = [
  {
    quote: 'Jahongir biz nimani xohlashimizni o‘zimizdan ham yaxshiroq tushundi. Xonadonimiz sokin va yorug‘, natija esa renderlardagi bilan bir xil — hech qanday kutilmagan holatlarsiz.',
    name: 'Madina R.',
    role: 'Mirzo Ulug‘bek xonadoni',
    avatar: unsplash('1494790108377-be9c29b29330', 200),
  },
  {
    quote: 'Kafemiz bir oy ichida mahallaning eng ko‘p suratga olinadigan joyiga aylandi. Konsepsiyadan tortib pudratchilargacha — hammasini o‘zi boshqardi.',
    name: 'Timur K.',
    role: 'Maison kafe asoschisi',
    avatar: unsplash('1507003211169-0a1dd7228f2d', 200),
  },
  {
    quote: 'Professional, tartibli va chinakam iqtidorli. Ofisimizning yangi dizayni jamoamizning har kungi ishini yaxshiladi.',
    name: 'Anna L.',
    role: 'COO, Atrium ofisi',
    avatar: unsplash('1438761681033-6461ffad8d80', 200),
  },
  {
    quote: 'Mualliflik nazorati har bir so‘mga arziydi — muammolar qimmatga tushishidan oldin aniqlandi. Ta’mirimiz o‘z vaqtida tugadi.',
    name: 'Rustam A.',
    role: 'Eski shahar xonadoni',
    avatar: unsplash('1500648767791-00dcc994a43e', 200),
  },
]

/* ── Ko‘p beriladigan savollar ─────────────────────────────── */
export const faq = [
  {
    q: 'Dizayn-loyiha qancha vaqt oladi?',
    a: '100 m² gacha bo‘lgan kvartira uchun to‘liq dizayn-loyiha odatda 6–8 hafta davom etadi. Aniq muddat maydon va loyiha tarkibiga bog‘liq bo‘lib, shartnomada belgilanadi.',
  },
  {
    q: 'Faqat 3D vizualizatsiya yoki faqat konsultatsiya buyurtma qilish mumkinmi?',
    a: 'Ha. Xizmatlarni alohida ham buyurtma qilishingiz mumkin: bir martalik konsultatsiya, faqat rejalashtirish yechimi yoki faqat vizualizatsiya.',
  },
  {
    q: 'Boshqa shaharlarda ham ishlaysizmi?',
    a: 'Ha, O‘zbekistonning barcha hududlarida va xorijda ishlayman. Masofaviy loyihalarda uchrashuvlar onlayn o‘tadi, obyektga esa asosiy bosqichlarda tashrif buyuraman.',
  },
  {
    q: 'Ta’mir va qurilish ishlarini ham bajarasizmi?',
    a: 'Qurilish ishlarini ishonchli, tekshirilgan pudratchilar bajaradi, men esa mualliflik nazorati orqali sifat, muddat va byudjetni nazorat qilaman.',
  },
  {
    q: 'To‘lov qanday amalga oshiriladi?',
    a: 'To‘lov bosqichma-bosqich: shartnoma imzolanganda avans, qolgan qismi esa har bir bosqich topshirilganidan keyin to‘lanadi.',
  },
]

/* ── Yugurib turuvchi satr (bosh sahifa) ───────────────────── */
export const marquee = ['Interyer dizayn', 'Arxitektura', '3D vizualizatsiya', 'Ta’mir nazorati', 'Mebel tanlash', 'Yoritish dizayni']

/* ── Bosh sahifadagi yakuniy chaqiriq ──────────────────────── */
export const cta = {
  title: 'Orzuingizdagi makonni birga yaratamiz',
  text: 'Birinchi konsultatsiya bepul. Bir ish kuni ichida javob beraman.',
  image: unsplash('1600585154084-4e5fe7c39198', 2400),
}
