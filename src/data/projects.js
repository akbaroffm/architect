/**
 * ─────────────────────────────────────────────────────────────
 *  LOYIHALAR VA TURKUMLAR (Projects & categories)
 * ─────────────────────────────────────────────────────────────
 *
 *  Yangi loyiha qo‘shish: `projects` massiviga yangi obyekt qo‘shing.
 *  `slug` — sahifa manzili (/projects/<slug>), faqat lotin harflari va "-".
 *  `category` — pastdagi `categories` ro‘yxatidagi `slug` lardan biri.
 *
 *  O‘z rasmlaringiz: fayllarni /public/images/ papkaga joylang va
 *  unsplash('...') o‘rniga '/images/fayl-nomi.jpg' yozing.
 */

export const unsplash = (id, w = 1800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

/* ── Turkumlar ──────────────────────────────────────────────── */
export const categories = [
  {
    slug: 'turar-joy',
    name: 'Turar-joy',
    title: 'Turar-joy interyerlari',
    description:
      'Kvartiralar, xususiy uylar va villalar. Har bir xonadonni egasining hayot tarzi, odatlari va orzulariga moslab loyihalayman — shunda uy chiroyli bo‘libgina qolmay, unda yashash qulay bo‘ladi.',
    cover: unsplash('1600210491892-03d54c0aaf87', 2400),
  },
  {
    slug: 'tijorat',
    name: 'Tijorat',
    title: 'Tijorat makonlari',
    description:
      'Butiklar, shourumlar va savdo maydonlari. Brendning xarakterini makon tiliga o‘giraman: xaridor ichkariga kirgan zahoti uni his qilishi kerak.',
    cover: unsplash('1441986300917-64674bd600d8', 2400),
  },
  {
    slug: 'ofis',
    name: 'Ofis',
    title: 'Ofis va ish makonlari',
    description:
      'Jamoa samarali ishlaydigan, mijozlarda esa ishonch uyg‘otadigan ofislar. Ish jarayoni, akustika va yorug‘likni puxta o‘ylagan holda loyihalanadi.',
    cover: unsplash('1497366216548-37526070297c', 2400),
  },
  {
    slug: 'restoran-kafe',
    name: 'Restoran va kafe',
    title: 'Restoran va kafelar',
    description:
      'Mehmonlar qaytib kelishni istaydigan joylar. Atmosfera, yoritish, o‘rindiqlar joylashuvi va oshxona texnologiyasi — hammasi yagona konsepsiya asosida.',
    cover: unsplash('1590846406792-0adc7f938f1d', 2400),
  },
  {
    slug: 'tamirlash',
    name: 'Ta’mirlash',
    title: 'Ta’mirlash loyihalari',
    description:
      'Eski xonadonlarga yangi hayot. Qayta rejalashtirish, muhandislik tarmoqlari va pardozlashdan to kalit topshirishgacha — mualliflik nazorati ostida.',
    cover: unsplash('1581858726788-75bc0f6a952d', 2400),
  },
  {
    slug: '3d-vizualizatsiya',
    name: '3D vizualizatsiya',
    title: '3D vizualizatsiya',
    description:
      'Qurilish boshlanmasdan oldin makonni ko‘rish imkoniyati. Fotorealistik renderlar orqali har bir material, rang va yorug‘likni oldindan tasdiqlaysiz.',
    cover: unsplash('1618221381711-42ca8ab6e908', 2400),
  },
]

/* ── Loyihalar ──────────────────────────────────────────────── */
export const projects = [
  {
    slug: 'durmon-villasi',
    title: 'Durmon villasi',
    category: 'turar-joy',
    featured: true,
    summary: 'Bog‘ va hovuz mehmonxona bilan uyg‘unlashgan ikki qavatli xususiy villa.',
    location: 'Toshkent, Durmon',
    area: 420,
    year: 2024,
    duration: '14 oy',
    client: 'Xususiy mijoz',
    cover: unsplash('1613490493576-7fde63acd811', 2400),
    intro:
      'Mijozlar — uch farzandli oila — shahar shovqinidan uzoqda, tabiat bilan uyg‘un yashashni xohlashdi. Vazifa: zamonaviy, ammo iliq va oilaviy uy yaratish.',
    challenge:
      'Uchastka cho‘ziq shaklda bo‘lib, janub tomoni qo‘shni uyga qaragan edi. Kunduzgi yorug‘likni saqlagan holda shaxsiy hududni ta’minlash va bog‘ni uyning davomiga aylantirish kerak edi.',
    solution:
      'Mehmonxona va oshxonani bog‘ tomonga burib, poldan shiftgacha surma oynalar o‘rnatdik. Ochiq yog‘och to‘sinlar oq hajmlarga iliqlik bag‘ishlaydi, ikkinchi qavatdagi yotoqxonalar esa tashqi ko‘zdan yashirilgan terrasalarga chiqadi.',
    result:
      'Oila endi yilning yarmini deyarli ochiq havoda o‘tkazadi: mehmonxona, terrasa va hovuz yagona makonga aylandi.',
    scope: ['Arxitektura loyihasi', 'Interyer dizayn', 'Landshaft muvofiqlashtiruvi', 'Mualliflik nazorati', 'Mebel va dekor tanlash'],
    materials: [
      { name: 'Oq shtukaturka', color: '#efebe4' },
      { name: 'Eman yog‘ochi', color: '#b48a60' },
      { name: 'Travertin', color: '#d9cbb5' },
      { name: 'Qora metall', color: '#2a2826' },
    ],
    images: [
      unsplash('1600596542815-ffad4c1539a9'),
      unsplash('1600566753086-00f18fb6b3ea'),
      unsplash('1600210491892-03d54c0aaf87'),
      unsplash('1600573472550-8090b5e0745e'),
      unsplash('1600585154084-4e5fe7c39198'),
      unsplash('1600607687644-c7171b42498f'),
    ],
    testimonial: {
      quote: 'Jahongir uyimizni biz tasavvur qilganimizdan ham yaxshiroq qilib berdi. Har kuni ertalab bu makonda uyg‘onish — alohida baxt.',
      name: 'Aziz va Nodira',
    },
  },
  {
    slug: 'mirzo-ulugbek-xonadoni',
    title: 'Mirzo Ulug‘bek xonadoni',
    category: 'turar-joy',
    featured: true,
    summary: 'Eman, zig‘ir va tabiiy tosh uyg‘unligidagi yorug‘ oilaviy xonadon.',
    location: 'Toshkent, Mirzo Ulug‘bek tumani',
    area: 164,
    year: 2025,
    duration: '8 oy',
    client: 'Yosh oila',
    cover: unsplash('1600210492486-724fe5c67fb0', 2400),
    intro:
      'Uch xonali kvartirani ikki farzandli yosh oila uchun to‘liq qayta loyihaladik. Asosiy talab — ko‘p saqlash joyi, yorug‘lik va tinch, “nafas oladigan” muhit.',
    challenge:
      'Kvartira tor koridorlar va kichik xonalarga bo‘lingan, oshxona esa qorong‘i edi. Oila bolalar bilan birga vaqt o‘tkazadigan umumiy makonga muhtoj edi.',
    solution:
      'Oshxonani mehmonxona bilan birlashtirib, yagona eman pol yotqizdik. Devorlarga o‘rnatilgan shkaflar kundalik buyumlarni yashiradi, yumshoq neytral palitra esa makonni kengroq ko‘rsatadi.',
    result: 'Foydali maydon vizual jihatdan 30% ga oshdi, har bir xona o‘z tabiiy yorug‘ligiga ega bo‘ldi.',
    scope: ['Rejalashtirish yechimi', 'Interyer dizayn', 'Individual mebel', 'Mebel tanlash', 'Mualliflik nazorati'],
    materials: [
      { name: 'Zig‘ir mato', color: '#e6dccd' },
      { name: 'Oqartirilgan eman', color: '#c9a883' },
      { name: 'Qumrang tosh', color: '#cfc2ae' },
      { name: 'Grafit', color: '#4a4744' },
    ],
    images: [
      unsplash('1600607687939-ce8a6c25118c'),
      unsplash('1583847268964-b28dc8f51f92'),
      unsplash('1541123437800-1bb1317badc2'),
      unsplash('1616594039964-ae9021a400a0'),
      unsplash('1620626011761-996317b8d101'),
    ],
    testimonial: {
      quote: 'Natija renderlardagi bilan bir xil chiqdi — hech qanday kutilmagan holatlarsiz. Uyimiz tinch va yorug‘.',
      name: 'Madina R.',
    },
  },
  {
    slug: 'atelier-butik',
    title: 'Atelier butigi',
    category: 'tijorat',
    summary: 'Xaridorni shoshilmaslikka undaydigan mustaqil moda brendi butigi.',
    location: 'Toshkent, Yunusobod',
    area: 145,
    year: 2023,
    duration: '4 oy',
    client: 'Atelier moda brendi',
    cover: unsplash('1441986300917-64674bd600d8', 2400),
    intro: 'Mahalliy moda brendi uchun birinchi flagman butik. Makon kolleksiyaning o‘zidek sokin va nafis bo‘lishi kerak edi.',
    challenge:
      'Kolleksiya har hafta yangilanadi, shuning uchun jihozlar tez o‘zgartiriladigan bo‘lishi, ayni paytda makon doimo tartibli ko‘rinishi kerak edi.',
    solution:
      'Modulli ko‘rgazma tizimi ishlab chiqdik: javonlar va ilgichlar bir necha daqiqada qayta joylashtiriladi. Shtukaturka va och eman fonida kiyimlar asosiy qahramonga aylanadi.',
    result: 'Ochilishdan keyingi uch oyda o‘rtacha xarid summasi 25% ga oshdi.',
    scope: ['Chakana savdo konsepsiyasi', 'Interyer dizayn', 'Ko‘rgazma tizimlari', 'Yoritish dizayni'],
    materials: [
      { name: 'Ohak shtukaturka', color: '#e9e3da' },
      { name: 'Och eman', color: '#d2b48f' },
      { name: 'Latun', color: '#b08d57' },
      { name: 'Ko‘k aksent', color: '#2f4a6b' },
    ],
    images: [
      unsplash('1555529669-e69e7aa0ba9a'),
      unsplash('1582037928769-181f2644ecb7'),
      unsplash('1551298370-9d3d53740c72'),
      unsplash('1558997519-83ea9252edf8'),
    ],
  },
  {
    slug: 'forma-shourumi',
    title: 'Forma mebel shourumi',
    category: 'tijorat',
    summary: 'Mebel xonadondagidek ko‘rinadigan, yashash muhitiga yaqin shourum.',
    location: 'Toshkent, Shayxontohur',
    area: 380,
    year: 2023,
    duration: '6 oy',
    client: 'Forma Interiors',
    cover: unsplash('1503174971373-b1f69850bded', 2400),
    intro: 'Premium mebel salonini “ombor” ko‘rinishidan xalos qilib, xaridor o‘zini mehmondek his qiladigan makonga aylantirdik.',
    challenge: 'Katta, bo‘sh zal va 200 dan ortiq mahsulot. Har bir kolleksiyani alohida, ammo yaxlit tarzda ko‘rsatish kerak edi.',
    solution:
      'Zalni mehmonxona, yotoqxona va ovqatlanish xonasi ko‘rinishidagi “sahnalar”ga ajratdik. Har bir sahna o‘z yoritish ssenariysiga ega.',
    result: 'Xaridorlar shourumda o‘rtacha ikki baravar ko‘proq vaqt o‘tkazadigan bo‘ldi.',
    scope: ['Konsepsiya', 'Rejalashtirish', 'Interyer dizayn', 'Yoritish dizayni', 'Mualliflik nazorati'],
    materials: [
      { name: 'Silliq beton', color: '#b9b4ad' },
      { name: 'Yong‘oq', color: '#7a5539' },
      { name: 'Qumrang mato', color: '#d8c9b2' },
      { name: 'Qora metall', color: '#262422' },
    ],
    images: [
      unsplash('1606744824163-985d376605aa'),
      unsplash('1598928506311-c55ded91a20c'),
      unsplash('1519710164239-da123dc03ef4'),
      unsplash('1567767292278-a4f21aa2d36e'),
    ],
  },
  {
    slug: 'atrium-ofisi',
    title: 'Atrium ofisi',
    category: 'ofis',
    featured: true,
    summary: '60 kishilik IT jamoa uchun ochiq va yorug‘ bosh ofis.',
    location: 'Toshkent, Tashkent City',
    area: 780,
    year: 2024,
    duration: '7 oy',
    client: 'IT kompaniya',
    cover: unsplash('1497366811353-6870744d04b2', 2400),
    intro: 'Tez o‘sib borayotgan texnologiya kompaniyasi uchun jamoani birlashtiradigan va iqtidorli xodimlarni jalb qiladigan ofis.',
    challenge: 'Ochiq maydonda ham diqqatni jamlash uchun sokin joylar, ham jamoaviy ish uchun jonli zonalar kerak edi.',
    solution:
      'Ofisni markaziy atrium atrofida tashkil etdik: atrofida sokin ish zonalari, moslashuvchan uchrashuv xonalari va keng lounge. Akustik panellar va iliq yoritish beton karkasni yumshatadi.',
    result: 'Xodimlar so‘rovnomasiga ko‘ra, ish joyidan qoniqish darajasi 42% dan 89% gacha oshdi.',
    scope: ['Ish makoni strategiyasi', 'Rejalashtirish', 'Interyer dizayn', 'Akustika', 'Yoritish dizayni'],
    materials: [
      { name: 'Ochiq beton', color: '#a9a6a1' },
      { name: 'Eman reykalar', color: '#bf9a6f' },
      { name: 'Akustik kigiz', color: '#6b6f68' },
      { name: 'Terrakota', color: '#b0664a' },
    ],
    images: [
      unsplash('1497366216548-37526070297c'),
      unsplash('1524758631624-e2822e304c36'),
      unsplash('1531973576160-7125cd663d86'),
      unsplash('1564069114553-7215e1ff1890'),
    ],
    testimonial: {
      quote: 'Yangi ofis jamoamizning ishlash uslubini o‘zgartirdi. Nomzodlar suhbatga kelib, ofisni ko‘rib, qolishni xohlashadi.',
      name: 'Anna L., COO',
    },
  },
  {
    slug: 'nova-agentligi',
    title: 'Nova kreativ agentligi',
    category: 'ofis',
    summary: 'Kreativ jamoa uchun uy kabi qulay, ilhomlantiruvchi studiya-ofis.',
    location: 'Toshkent, Mirobod',
    area: 260,
    year: 2023,
    duration: '5 oy',
    client: 'Nova Creative',
    cover: unsplash('1497215728101-856f4ea42174', 2400),
    intro: 'Dizaynerlar, kopirayterlar va prodyuserlardan iborat agentlik uchun “ofisga o‘xshamaydigan” ish makoni.',
    challenge: 'Jamoa ko‘p vaqtini ofisda o‘tkazadi: makon kun davomida turli rejimlarga — aqliy hujumdan tortib videosuratga olishgacha — moslashishi kerak edi.',
    solution:
      'Uyga xos elementlar — oshxona-orol, kutubxona va yumshoq burchaklar — ishchi zonalar bilan uyg‘unlashtirildi. Katta derazalar bo‘ylab uzun umumiy stol joylashtirildi.',
    result: 'Ofis agentlikning vizit kartasiga aylandi: mijozlar bilan uchrashuvlar endi faqat shu yerda o‘tkaziladi.',
    scope: ['Konsepsiya', 'Interyer dizayn', 'Individual mebel', 'Dekor va o‘simliklar'],
    materials: [
      { name: 'Oq devor', color: '#f1eee9' },
      { name: 'Yashil aksent', color: '#3f5a4a' },
      { name: 'Yong‘oq', color: '#8a6446' },
      { name: 'Marmar', color: '#e4e0da' },
    ],
    images: [
      unsplash('1567521464027-f127ff144326'),
      unsplash('1600494603989-9650cf6ddd3d'),
      unsplash('1588854337236-6889d631faa8'),
    ],
  },
  {
    slug: 'olov-restorani',
    title: 'Olov restorani',
    category: 'restoran-kafe',
    featured: true,
    summary: 'Ochiq olov oshxonasi atrofida qurilgan qorong‘i yog‘och va iliq nurli restoran.',
    location: 'Buxoro',
    area: 320,
    year: 2023,
    duration: '9 oy',
    client: 'Olov Hospitality',
    cover: unsplash('1517248135467-4c7edcad34c4', 2400),
    intro: 'Mualliflik oshxonasiga ega restoran uchun oqshomgi mehmonlarni teatrdagidek taassurotga cho‘mdiradigan zal.',
    challenge: 'Tarixiy binoning cheklovlari saqlangan holda zamonaviy oshxona texnologiyasi va 120 o‘rinli zalni joylashtirish talab etilardi.',
    solution:
      'Ochiq olov oshxonasini zal markaziga olib chiqdik — u makonning “sahnasi”ga aylandi. To‘q yog‘och, individual divanlar va aniq yo‘naltirilgan nurlar iliq, samimiy muhit yaratadi.',
    result: 'Restoran ochilgan birinchi yilidayoq mintaqaning eng yaxshi restoranlari ro‘yxatiga kirdi.',
    scope: ['Konsepsiya', 'Interyer dizayn', 'Yoritish dizayni', 'Individual mebel', 'Ta’mir nazorati'],
    materials: [
      { name: 'Kuydirilgan yog‘och', color: '#3b2a20' },
      { name: 'Latun', color: '#b38b4d' },
      { name: 'Terrakota plitka', color: '#a4583c' },
      { name: 'Teri', color: '#6e4630' },
    ],
    images: [
      unsplash('1590846406792-0adc7f938f1d'),
      unsplash('1552566626-52f8b828add9'),
      unsplash('1559329007-40df8a9345d8'),
      unsplash('1555396273-367ea4eb4db5'),
      unsplash('1414235077428-338989a2e8c0'),
    ],
    testimonial: {
      quote: 'Mehmonlar taomdan oldin interyer haqida gapirishadi. Bu biz orzu qilgan natija edi.',
      name: 'Timur K., asoschi',
    },
  },
  {
    slug: 'maison-kafe',
    title: 'Maison kafe',
    category: 'restoran-kafe',
    summary: 'Sanoat ruhidagi, yam-yashil yurakka ega mahalla kafesi.',
    location: 'Toshkent, Yakkasaroy',
    area: 210,
    year: 2023,
    duration: '5 oy',
    client: 'Maison Coffee',
    cover: unsplash('1554118811-1e0d58224f24', 2400),
    intro: 'Sobiq bosmaxona sexida joylashgan 90 o‘rinli kafe — mahallaning “mehmonxonasi”.',
    challenge: 'Baland shiftli, sovuq sanoat binosini kun bo‘yi odamlar kelib o‘tiradigan iliq joyga aylantirish kerak edi.',
    solution:
      'Xom shift va po‘lat konstruksiyalarni saqladik, ularga o‘simliklar, latun chiroqlar va uzun umumiy bar qo‘shdik. Turli o‘rindiqlar — ertalabki kofedan kechki uchrashuvgacha — har xil ssenariylarga mos.',
    result: 'Bir oy ichida kafe mahallaning eng ko‘p suratga olinadigan joyiga aylandi.',
    scope: ['Konsepsiya', 'Interyer dizayn', 'Mebel tanlash', 'Mualliflik nazorati'],
    materials: [
      { name: 'Po‘lat', color: '#3c3f41' },
      { name: 'Latun', color: '#b8955a' },
      { name: 'Yashil o‘simliklar', color: '#4f6b45' },
      { name: 'Eski g‘isht', color: '#9a6b55' },
    ],
    images: [
      unsplash('1501339847302-ac426a4a7cbb'),
      unsplash('1445116572660-236099ec97a0'),
      unsplash('1453614512568-c4024d13c247'),
      unsplash('1521017432531-fbd92d768814'),
    ],
  },
  {
    slug: 'eski-shahar-xonadoni',
    title: 'Eski shahar xonadoni',
    category: 'tamirlash',
    summary: '1970-yillardagi eskirgan kvartira yorug‘ va ochiq uyga aylandi.',
    location: 'Toshkent, Olmazor',
    area: 96,
    year: 2025,
    duration: '6 oy',
    client: 'Xususiy mijoz',
    cover: unsplash('1631679706909-1844bbd07221', 2400),
    intro: 'To‘liq kapital ta’mir: yangi rejalashtirish, elektr va santexnika tarmoqlari, pol va pardozlash.',
    challenge: 'Eski panelli uy, qiyshiq devorlar va eskirgan kommunikatsiyalar. Shu bilan birga byudjet va muddat qat’iy belgilangan edi.',
    solution:
      'Ikkita to‘siq devorni olib tashlab, mehmonxonaga tushadigan yorug‘likni ikki baravar oshirdik. Foydalanilmayotgan koridor hisobiga yangi hammom qurildi. Barcha ishlar haftalik hisobotlar bilan nazorat qilindi.',
    result: 'Loyiha belgilangan muddatda va byudjet doirasida topshirildi.',
    scope: ['O‘lchov ishlari', 'Qayta rejalashtirish', 'Kapital ta’mir', 'Ta’mir nazorati'],
    materials: [
      { name: 'Oq devor', color: '#f2efea' },
      { name: 'Eman parket', color: '#c29b70' },
      { name: 'Kulrang plitka', color: '#9d9a95' },
      { name: 'Qora armatura', color: '#252423' },
    ],
    images: [
      unsplash('1581858726788-75bc0f6a952d'),
      unsplash('1621905251918-48416bd8575a'),
      unsplash('1604709177225-055f99402ea3'),
      unsplash('1484154218962-a197022b5858'),
      unsplash('1513694203232-719a280e022f'),
    ],
    testimonial: {
      quote: 'Mualliflik nazorati har bir so‘mga arziydi — muammolar qimmatga tushishidan oldin aniqlandi. Ta’mir o‘z vaqtida tugadi.',
      name: 'Rustam A.',
    },
  },
  {
    slug: 'oshxona-va-hammom',
    title: 'Oilaviy oshxona',
    category: 'tamirlash',
    summary: 'Birgalikda ovqat tayyorlash uchun qayta qurilgan klassik oshxona va hammom.',
    location: 'Toshkent, Yashnobod',
    area: 38,
    year: 2023,
    duration: '3 oy',
    client: 'Xususiy mijoz',
    cover: unsplash('1556912173-3bb406ef7e77', 2400),
    intro: 'Xususiy uydagi oshxona va unga tutash hammomni yangilash loyihasi.',
    challenge: 'Oshxona kichik va noqulay edi: oila bayramlarda birga ovqat tayyorlay olmasdi.',
    solution: 'Kattaroq orol, marmar ish yuzasi va professional plita oshxonani uyning ijtimoiy markaziga aylantirdi.',
    result: 'Oshxona endi oilaning eng sevimli xonasi.',
    scope: ['Oshxona dizayni', 'Ta’mirlash', 'Materiallar yetkazib berish', 'Ta’mir nazorati'],
    materials: [
      { name: 'Oq fasad', color: '#f3f1ec' },
      { name: 'Karrara marmari', color: '#e2dfda' },
      { name: 'Latun furnitura', color: '#b4935c' },
      { name: 'Qora plita', color: '#1f1e1d' },
    ],
    images: [
      unsplash('1507089947368-19c1da9775ae'),
      unsplash('1600585152220-90363fe7e115'),
      unsplash('1552321554-5fefe8c9ef14'),
      unsplash('1584622650111-993a426fbf0a'),
    ],
  },
  {
    slug: 'pavilion-uyi',
    title: 'Pavilion uyi',
    category: '3d-vizualizatsiya',
    featured: true,
    summary: 'Zamonaviy qishloq uyi uchun fotorealistik vizualizatsiya.',
    location: 'Toshkent viloyati',
    area: 310,
    year: 2025,
    duration: '6 hafta',
    client: 'Xususiy mijoz',
    cover: unsplash('1600585154340-be6161a56a0c', 2400),
    intro: 'Xususiy mijoz uchun to‘liq vizualizatsiya paketi: kunduzgi va oqshomgi tashqi ko‘rinishlar hamda interyer renderlari.',
    challenge: 'Mijoz qurilish boshlanishidan oldin fasad materiallari va yoritishni aniq tasavvur qilishi kerak edi.',
    solution: 'Uch xil fasad varianti va kunning turli vaqtlari uchun renderlar tayyorladik. Interyer ko‘rinishlari materiallarni tasdiqlash uchun ishlatildi.',
    result: 'Barcha qarorlar qurilishdan oldin qabul qilindi — qayta ishlashlarsiz.',
    scope: ['3D modellashtirish', 'Tashqi renderlar', 'Interyer renderlari', 'Material tadqiqotlari'],
    materials: [
      { name: 'Qora fasad', color: '#232322' },
      { name: 'Sidr yog‘ochi', color: '#a4764c' },
      { name: 'Oq beton', color: '#dedad3' },
      { name: 'Iliq nur', color: '#e8b86a' },
    ],
    images: [
      unsplash('1600585154526-990dced4db0d'),
      unsplash('1600566753376-12c8ab7fb75b'),
      unsplash('1600585153490-76fb20a32601'),
      unsplash('1604014237800-1c9102c219da'),
      unsplash('1600566753190-17f0baa2a6c3'),
    ],
  },
  {
    slug: 'nordic-loft',
    title: 'Nordic loft',
    category: '3d-vizualizatsiya',
    summary: 'Yog‘och, rotang va yumshoq neytral ranglardagi konsept-vizualizatsiya.',
    location: 'Konsept',
    area: 88,
    year: 2024,
    duration: '3 hafta',
    client: 'Xususiy mijoz',
    cover: unsplash('1618219908412-a29a1bb7b86e', 2400),
    intro: 'Loft kvartira uchun ikki xil material palitrasini o‘rgangan konsept renderlar.',
    challenge: 'Mijoz skandinav minimalizmi va iliq boho uslubi o‘rtasida tanlay olmayotgan edi.',
    solution: 'Bir xil rejalashtirish asosida ikki to‘liq variant tayyorladik — mijoz bitta ham buyum buyurtma qilmasdan tanlov qildi.',
    result: 'Tanlangan variant asosida ish chizmalari tayyorlandi.',
    scope: ['Konsept dizayn', '3D vizualizatsiya', 'Mud-bordlar'],
    materials: [
      { name: 'Rotang', color: '#c9a878' },
      { name: 'Qayin yog‘ochi', color: '#dcc5a3' },
      { name: 'Sut rang', color: '#f0ebe2' },
      { name: 'Shalfey', color: '#9aa593' },
    ],
    images: [
      unsplash('1615529182904-14819c35db37'),
      unsplash('1618220179428-22790b461013'),
      unsplash('1616486338812-3dadae4b4ace'),
      unsplash('1617806118233-18e1de247200'),
      unsplash('1615874959474-d609969a20ed'),
    ],
  },
]

/* ── Yordamchi funksiyalar ──────────────────────────────────── */
export const getCategory = (slug) => categories.find((c) => c.slug === slug)
export const getProject = (slug) => projects.find((p) => p.slug === slug)
export const projectsIn = (slug) => projects.filter((p) => p.category === slug)
export const featuredProjects = projects.filter((p) => p.featured)
