import { CelestialBodyData } from '../types';

export const CELESTIAL_BODIES: CelestialBodyData[] = [
  {
    id: 'sun',
    nameUz: 'Quyosh',
    nameEn: 'The Sun',
    type: 'star',
    typeLabelUz: 'Yulduz (Sariq pakana G2V)',
    taglineUz: 'Quyosh tizimining qudratli markazi va barcha hayot manbai',
    descriptionUz: "Quyosh — Quyosh tizimi massasining 99.86 foizini tashkil etuvchi ulkan plazma shari. Har soniyada uning qa'rida 600 million tonna vodorod geliyga aylanadi va 3.8 × 10²⁶ vatt quvvatdagi cheksiz yorug'lik hamda issiqlik energiyasi ajralib chiqadi.",
    diameterKm: 1392700,
    massKg: '1.989 × 10³⁰ kg (Yer massasidan 333,000 baravar katta)',
    distanceFromSunAu: 0,
    distanceFromSunKm: 0,
    orbitalPeriodDays: 0,
    rotationPeriodHours: 648,
    avgTempC: 5500,
    minTempC: 4000,
    maxTempC: 15000000,
    moonsCount: 0,
    moonsList: [],
    gravityMps2: 274,
    lightTravelTimeSun: '0 soniya (Manba)',
    lightTravelTimeEarth: '8 daqiqa 20 soniya',
    apparentMagnitude: '-26.74 (Eng yorqin)',
    realImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg',
    infraredImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/SDO_171_A_304_Sun_20110309.jpg/1024px-SDO_171_A_304_Sun_20110309.jpg',
    realPhotos: [
      {
        titleUz: 'Quyosh protuberansi va plazma otilishi',
        source: 'NASA SDO (Solar Dynamics Observatory)',
        imageUrl: 'https://images.nasa.gov/images/GSFC_20171208_Archive_e000214~orig.jpg',
        descriptionUz: 'Magnit maydon kuch chiziqlari bo\'ylab Quyosh sirtidan yuz minglab kilometr balandlikka otilayotgan super-qaynoq plazma halqasi.'
      },
      {
        titleUz: 'Quyosh toji va magnit bo\'ronlari',
        source: 'NASA / SOHO',
        imageUrl: 'https://images.nasa.gov/images/GSFC_20171208_Archive_e000790~orig.jpg',
        descriptionUz: 'Quyosh koronasidagi koronal massa otilishi (CME), Yer magnitosferasiga qutb yog\'dulari va magnit bo\'ronlarini yetkazuvchi quvvat.'
      }
    ],
    landmarks: [
      {
        id: 'sunspot-active',
        nameUz: 'Faol Quyosh Dog\'lari Hududi',
        typeUz: 'Quyosh Dog\'i',
        coords: { x: 45, y: 55 },
        sizeKm: '50,000 km (Yerdan 4 marta katta)',
        descriptionUz: 'Kuchli magnit maydon haroratni 4,000 °C gacha tushirib, qorong\'i ko\'rinadigan ulkan faol magnit hudud.',
        realPhotoUrl: 'https://images.nasa.gov/images/GSFC_20171208_Archive_e000214~orig.jpg'
      },
      {
        id: 'coronal-prominence',
        nameUz: 'Gigant Koronal Protuberans',
        typeUz: 'Plazma o\'ti',
        coords: { x: 80, y: 30 },
        sizeKm: '350,000 km balandlikda',
        descriptionUz: 'Quyosh sirtidan koinotga yoy shaklida otilib chiqqan termoyadroviy olov favvorasi.',
        realPhotoUrl: 'https://images.nasa.gov/images/GSFC_20171208_Archive_e000790~orig.jpg'
      }
    ],
    atmosphereCompositionUz: [
      'Vodorod (H₂): 73.46%',
      'Geliy (He): 24.85%',
      'Kislorod (O): 0.77%',
      'Uglerod, Temir, Neon: 0.92%'
    ],
    funFactsUz: [
      'Quyosh ichiga 1.3 millionta Yer sayyorasi sig\'adi.',
      'Quyoshdan chiqayotgan yorug\'lik Yerga 8 daqiqa 20 soniyada yetib keladi.',
      'Markazida bosim 250 milliard atmosferani tashkil etadi.'
    ],
    missions: [
      { name: 'Parker Solar Probe', year: '2018-hozirgacha', agency: 'NASA', descriptionUz: 'Quyosh tojiga tarixdagi eng yaqin masofadan (6 mln km) kirdi.' }
    ],
    internalLayers: [
      { nameUz: 'Termoyadroviy Yadro', nameEn: 'Core', depth: '0 - 175,000 km', descriptionUz: '15 million °C haroratda vodorod geliyga sintezlanadi.', color: '#ffffff' },
      { nameUz: 'Radiatsion Zona', nameEn: 'Radiative Zone', depth: '175,000 - 490,000 km', descriptionUz: 'Fotonlar sirtga chiqishi 100,000 yil davom etadi.', color: '#ffb703' },
      { nameUz: 'Konvektiv Zona', nameEn: 'Convective Zone', depth: '490,000 - 696,000 km', descriptionUz: 'Qaynab chiqayotgan plazma oqimlari.', color: '#fb8500' },
      { nameUz: 'Fotosfera', nameEn: 'Photosphere', depth: 'Sirt ~500 km', descriptionUz: 'Biz ko\'radigan Quyosh sirti (5,500 °C).', color: '#ffd166' }
    ],
    visual: {
      baseRadius: 7.0,
      distanceAuVisual: 0,
      realDistanceScale: 0,
      orbitSpeed: 0,
      rotationSpeed: 0.002,
      axialTiltDeg: 7.25,
      color: '#ffaa00',
      isEmissive: true,
      emissiveColor: '#ff9900',
      emissiveIntensity: 2.2,
      hasAtmosphereGlow: true,
      atmosphereColor: '#ffdd55'
    }
  },
  {
    id: 'mercury',
    nameUz: 'Merkuriy',
    nameEn: 'Mercury',
    type: 'terrestrial',
    typeLabelUz: 'Ichki qoyatosh sayyora',
    taglineUz: 'Quyoshga eng yaqin va eng tez aylanuvchi mittivoy sayyora',
    descriptionUz: "Merkuriy — Quyoshga eng yaqin va Quyosh tizimidagi eng kichik sayyora. U 88 Yer kunida Quyosh atrofida aylanadi. Atmosferasi yo'qligi sababli kunduzgi harorat +430°C ga yetsa, tunda -180°C gacha tushib ketadi. Sirti Oynikiga o'xshash milliardlab kraterlar bilan qoplangan.",
    diameterKm: 4879,
    massKg: '3.301 × 10²³ kg (Yer massasining 5.5%)',
    distanceFromSunAu: 0.39,
    distanceFromSunKm: 57910000,
    orbitalPeriodDays: 88,
    rotationPeriodHours: 1407.6,
    avgTempC: 167,
    minTempC: -180,
    maxTempC: 430,
    moonsCount: 0,
    moonsList: [],
    gravityMps2: 3.7,
    lightTravelTimeSun: '3 daqiqa 13 soniya',
    lightTravelTimeEarth: '5 daqiqa - 11 daqiqa',
    apparentMagnitude: '-2.48 dan +7.25 gacha',
    realImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg',
    realPhotos: [
      {
        titleUz: 'MESSENGER apparatidan olingan haqiqiy rangli mozaika',
        source: 'NASA / JHUAPL / Carnegie Institution of Washington',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Mercury_in_color_-_Prockter05_centered.jpg/1024px-Mercury_in_color_-_Prockter05_centered.jpg',
        descriptionUz: 'Merkuriy sirtidagi vulqon faolligi, qadimiy zarba havzalari va mineral qatlamlarning real fotosuratlari.'
      }
    ],
    landmarks: [
      {
        id: 'caloris-basin',
        nameUz: 'Kaloris Havzasi (Caloris Planitia)',
        typeUz: 'Gigant Krater Havzasi',
        coords: { x: 42, y: 38 },
        sizeKm: '1,550 km diametrda',
        descriptionUz: 'Quyosh tizimidagi eng katta zarba kraterlaridan biri, ulkan asteroid urilishi natijasida hosil bo\'lgan.',
        realPhotoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Mercury_in_color_-_Prockter05_centered.jpg/1024px-Mercury_in_color_-_Prockter05_centered.jpg'
      },
      {
        id: 'alisher-navoi-crater',
        nameUz: 'Alisher Navoiy Krateri (Navoi Crater)',
        typeUz: 'Zarba Krateri',
        coords: { x: 62, y: 64 },
        sizeKm: '66 km diametrda',
        descriptionUz: 'Xalqaro Astronomiya Ittifoqi tomonidan buyuk o\'zbek shoiri va mutafakkiri Alisher Navoiy sharafiga nomlangan rasmiy krater.',
        realPhotoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg'
      }
    ],
    atmosphereCompositionUz: [
      'Kislorod (O₂): 42%',
      'Natriy (Na): 29%',
      'Vodorod (H₂): 22%',
      'Geliy (He): 6%'
    ],
    funFactsUz: [
      'Merkuriyda bir kun (176 Yer kuni) uning bir yilidan (88 kun) uzunroq!',
      'Merkuriy qutblaridagi abadiy soyali kraterlarda haqiqiy suv muzi aniqlangan.',
      'Markazidagi temir yadro sayyora hajmining 85 foizini egallaydi.'
    ],
    missions: [
      { name: 'MESSENGER', year: '2011-2015', agency: 'NASA', descriptionUz: 'Merkuriyni ilk bor to\'liq global yuqori aniqlikda xaritalashtirdi.' },
      { name: 'BepiColombo', year: '2018-hozirgacha', agency: 'ESA / JAXA', descriptionUz: 'Hozirda sayyora tomon uchib bormoqda.' }
    ],
    internalLayers: [
      { nameUz: 'Temir-nikel yadro', nameEn: 'Core', depth: 'Radiusi ~2,000 km', descriptionUz: 'O\'ta zich metall markaz.', color: '#9d0208' },
      { nameUz: 'Silikat mantiya', nameEn: 'Mantle', depth: 'Qalinligi ~400 km', descriptionUz: 'Toshli minerallar.', color: '#8d99ae' },
      { nameUz: 'Qobiq', nameEn: 'Crust', depth: 'Qalinligi ~35 km', descriptionUz: 'Kraterli qotgan sirt.', color: '#adb5bd' }
    ],
    visual: {
      baseRadius: 0.9,
      distanceAuVisual: 12,
      realDistanceScale: 0.39,
      orbitSpeed: 0.04,
      rotationSpeed: 0.005,
      axialTiltDeg: 0.034,
      color: '#a8a29e'
    }
  },
  {
    id: 'venus',
    nameUz: 'Venera',
    nameEn: 'Venus',
    type: 'terrestrial',
    typeLabelUz: 'Ichki qoyatosh sayyora',
    taglineUz: 'Qalin zaharli bulutlar ostidagi eng issiq osmon go\'zali',
    descriptionUz: "Venera — Yerning 'egizak singlisi', biroq uning sirti haqiqiy jahannamdir. Qalin karbonat angidrid atmosferasi va sulfat kislota bulutlari tufayli sirt harorati +465°C ga yetadi. Bosim Yerdagi okean tubining 900 metr chuqurligi bilan teng (92 atmosfera).",
    diameterKm: 12104,
    massKg: '4.867 × 10²⁴ kg (Yer massasining 81.5%)',
    distanceFromSunAu: 0.72,
    distanceFromSunKm: 108200000,
    orbitalPeriodDays: 224.7,
    rotationPeriodHours: -5832.5,
    avgTempC: 464,
    minTempC: 438,
    maxTempC: 482,
    moonsCount: 0,
    moonsList: [],
    gravityMps2: 8.87,
    lightTravelTimeSun: '6 daqiqa 0 soniya',
    lightTravelTimeEarth: '2 daqiqa 15 soniya - 14 daqiqa',
    apparentMagnitude: '-4.92 (Oydan keyingi eng yorqin osmon jismi)',
    realImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg',
    radarImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Venus_globe_-_transparent_background.png/1024px-Venus_globe_-_transparent_background.png',
    realPhotos: [
      {
        titleUz: 'Venera sirtining haqiqiy fotosurati (Venera-13 zondi)',
        source: 'Sovet Kosmik Dasturi / Venera-13 Lander',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Venera-13_color_panoramas.jpg',
        descriptionUz: 'Tarixda ilk bor Venera sirtiga qo\'nib, 465 °C jazirama va 90 atm bosim ostida olingan haqiqiy rangli fotosurat.'
      },
      {
        titleUz: 'Magellan radar mozaikasi — bulutlar ostidagi haqiqiy relyef',
        source: 'NASA / JPL Magellan Mission',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Venus_globe_-_transparent_background.png/1024px-Venus_globe_-_transparent_background.png',
        descriptionUz: 'Radar nurlari yordamida qalin bulutlar teshib o\'tilib, yuz minglab vulqonlar xaritasi tuzildi.'
      }
    ],
    landmarks: [
      {
        id: 'maat-mons',
        nameUz: 'Maat Mons Vulqoni',
        typeUz: 'Qalqonsimon Vulqon',
        coords: { x: 50, y: 45 },
        sizeKm: '8 km balandlikda',
        descriptionUz: 'Veneradagi eng baland vulqon, yaqinda unda faol lava oqimlari mavjudligi isbotlandi.',
        realPhotoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Venus_globe_-_transparent_background.png/1024px-Venus_globe_-_transparent_background.png'
      },
      {
        id: 'ishtar-terra',
        nameUz: 'Ishtar Terra Qit\'asi',
        typeUz: 'Tog\'li Qit\'a',
        coords: { x: 38, y: 22 },
        sizeKm: 'Avstraliya o\'lchamida',
        descriptionUz: 'Veneraning shimoliy qutbidagi ulkan qit\'asimon plato va Maksvell tog\'lari (11 km balandlik).',
        realPhotoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg'
      }
    ],
    atmosphereCompositionUz: [
      'Karbonat angidrid (CO₂): 96.5%',
      'Azot (N₂): 3.5%',
      'Sulfat kislotali bulutlar (H₂SO₄)',
      'Suv bug\'i: 0.002%'
    ],
    funFactsUz: [
      'Venera soat strelkasi bo\'ylab (Quyosh g\'arbdan chiqib sharqqa botadi) aylanadi.',
      'U Quyosh tizimidagi eng issiq sayyora (hatto Quyoshga yaqinroq Merkuriydan ham issiq).',
      'Veneradagi atmosfera bosimi qo\'rg\'oshin va qalayni bir zumda eritib yuboradi.'
    ],
    missions: [
      { name: 'Venera-13 & 14', year: '1981-1982', agency: 'Sovet Ittifoqi', descriptionUz: 'Sirtga muvaffaqiyatli qo\'nib, birinchi rangli panoramalarni yubordi.' },
      { name: 'Magellan', year: '1989-1994', agency: 'NASA', descriptionUz: 'Radar bilan sirtining 98 foizini xaritalashtirdi.' }
    ],
    internalLayers: [
      { nameUz: 'Temir yadro', nameEn: 'Core', depth: 'Radiusi ~3,200 km', descriptionUz: 'Qattiq va erigan metall.', color: '#b7094c' },
      { nameUz: 'Mantiya', nameEn: 'Mantle', depth: 'Qalinligi ~3,000 km', descriptionUz: 'Qaynoq silikat tog\' jinslari.', color: '#c77dff' },
      { nameUz: 'Bazalt qobiq', nameEn: 'Crust', depth: 'Qalinligi ~50 km', descriptionUz: 'Vulkanik qora toshlar.', color: '#ffb703' }
    ],
    visual: {
      baseRadius: 1.5,
      distanceAuVisual: 18,
      realDistanceScale: 0.72,
      orbitSpeed: 0.025,
      rotationSpeed: -0.002,
      axialTiltDeg: 177.3,
      color: '#e0a96d',
      hasAtmosphereGlow: true,
      atmosphereColor: '#ffd166'
    }
  },
  {
    id: 'earth',
    nameUz: 'Yer',
    nameEn: 'Earth',
    type: 'terrestrial',
    typeLabelUz: 'Ichki qoyatosh sayyora',
    taglineUz: 'Bizning moviy maskanimiz — hayot qaynagan yagona sayyora',
    descriptionUz: "Yer — Quyosh tizimidagi suyuq suv okeanlari va boy biologik hayotga ega birdan-bir sayyora. Uning sirtining 71 foizini jahon okeani egallaydi. Magnitosfera va ozon qatlami sayyoramizni halokatli kosmik nurlardan ishonchli himoya qiladi.",
    diameterKm: 12742,
    massKg: '5.972 × 10²⁴ kg',
    distanceFromSunAu: 1.0,
    distanceFromSunKm: 149600000,
    orbitalPeriodDays: 365.25,
    rotationPeriodHours: 23.93,
    avgTempC: 15,
    minTempC: -89.2,
    maxTempC: 56.7,
    moonsCount: 1,
    moonsList: [
      { name: 'Oy (Moon)', diameterKm: 3474, descriptionUz: 'Yerning tabiiy yo\'ldoshi. Apollo fazogirlari uning sirtiga 6 marotaba muvaffaqiyatli qadam qo\'ygan.' }
    ],
    gravityMps2: 9.81,
    lightTravelTimeSun: '8 daqiqa 20 soniya',
    lightTravelTimeEarth: '0 soniya (Bizning uyimiz)',
    apparentMagnitude: '- (Kuzatuv nuqtasi)',
    realImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg',
    nightImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/The_earth_at_night.jpg/1024px-The_earth_at_night.jpg',
    realPhotos: [
      {
        titleUz: 'Moviy Marvarid (The Blue Marble) — Haqiqiy Apollo 17 fotosurati',
        source: 'NASA / Apollo 17 ekipaji (1972)',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg',
        descriptionUz: 'Insoniyat tarixidagi eng mashhur real fotosurat: Afrika, O\'rta dengiz, Hind okeani va Antarktida yaqqol ko\'rinib turibdi.'
      },
      {
        titleUz: 'Yerning kechki shahar chiroqlari (Earth at Night)',
        source: 'NASA / NOAA Suomi NPP Satellite',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/The_earth_at_night.jpg/1024px-The_earth_at_night.jpg',
        descriptionUz: 'Koinotdan olingan tungi Yer tasviri — inson sivilizatsiyasi, shaharlar va energetika tarmoqlarining nurli ko\'rinishi.'
      },
      {
        titleUz: 'Oy sirtidagi inson izi (Apollo 11)',
        source: 'NASA / Baz Oldrin (Apollo 11)',
        imageUrl: 'https://images.nasa.gov/images/as11-40-5878~orig.jpg',
        descriptionUz: '1969-yil 20-iyul: Insoniyatning Oydagi birinchi qadami va changli sirtda saqlanib qolgan poyafzal izi.'
      }
    ],
    landmarks: [
      {
        id: 'himalayas-everest',
        nameUz: 'Himoloy va Everest Cho\'qqisi',
        typeUz: 'Tog\' Tizmasi',
        coords: { x: 68, y: 40 },
        sizeKm: '8,848 metr balandlikda',
        descriptionUz: 'Sayyoramizning eng baland nuqtasi bo\'lib, tektonik plitalar to\'qnashuvi natijasida o\'sishda davom etmoqda.',
        realPhotoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg'
      },
      {
        id: 'mariana-trench',
        nameUz: 'Mariana Botiqligi (Challenger chuqurligi)',
        typeUz: 'Okean Botiqligi',
        coords: { x: 82, y: 48 },
        sizeKm: '11,034 metr chuqurlikda',
        descriptionUz: 'Jahon okeanining eng chuqur nuqtasi, bu yerda suv bosimi 1,000 atmosferadan oshadi.',
        realPhotoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg'
      },
      {
        id: 'lunar-tranquility',
        nameUz: 'Oydagi Osoyishtalik Dengizi (Mare Tranquillitatis)',
        typeUz: 'Oy Qo\'nish Hududi',
        coords: { x: 55, y: 50 },
        sizeKm: '873 km diametrda',
        descriptionUz: '1969-yilda Neil Armstrong va Buzz Aldrin birinchi bor Oyga qadam qo\'ygan tarixiy joy.',
        realPhotoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg'
      }
    ],
    atmosphereCompositionUz: [
      'Azot (N₂): 78.08%',
      'Kislorod (O₂): 20.95%',
      'Argon (Ar): 0.93%',
      'Karbonat angidrid (CO₂): 0.04%',
      'Suv bug\'i (H₂O): 0-4%'
    ],
    funFactsUz: [
      'Yer Quyosh atrofida sekundiga 29.8 km (soatiga 107,000 km) tezlikda yeldek uchadi.',
      'Yer sayyorasi yagona suyuq suvli okeanlarga ega jannatmakon maskandir.',
      'Oy har yili Yerdan 3.8 santimetrga uzoqlashib bormoqda.'
    ],
    missions: [
      { name: 'Apollon-11', year: '1969', agency: 'NASA', descriptionUz: 'Insoniyat birinchi marta boshqa osmon jismi (Oy)ga qadam qo\'ydi.' },
      { name: 'Xalqaro Kosmik Stansiya', year: '1998-hozir', agency: 'Xalqaro', descriptionUz: 'Doimiy fazoviy ilmiy tadqiqot maskani.' }
    ],
    internalLayers: [
      { nameUz: 'Qattiq ichki yadro', nameEn: 'Inner Core', depth: 'Radiusi ~1,220 km', descriptionUz: '5,400 °C haroratdagi qattiq temir-nikel kristalli.', color: '#ffd000' },
      { nameUz: 'Suyuq tashqi yadro', nameEn: 'Outer Core', depth: 'Qalinligi ~2,300 km', descriptionUz: 'Yer magnit maydonini hosil qiluvchi erigan suyuq metall.', color: '#ff6b35' },
      { nameUz: 'Silikat mantiya', nameEn: 'Mantle', depth: 'Qalinligi ~2,900 km', descriptionUz: 'Qaynoq plastik magma tog\' jinslari.', color: '#d00000' },
      { nameUz: 'Litosfera va qobiq', nameEn: 'Crust', depth: 'Qalinligi 5-70 km', descriptionUz: 'Biz yashaydigan qit\'alar va okean tubi.', color: '#2a9d8f' }
    ],
    visual: {
      baseRadius: 1.6,
      distanceAuVisual: 25,
      realDistanceScale: 1.0,
      orbitSpeed: 0.018,
      rotationSpeed: 0.015,
      axialTiltDeg: 23.44,
      color: '#2b6cb0',
      hasAtmosphereGlow: true,
      atmosphereColor: '#63b3ed',
      hasClouds: true,
      cloudsSpeed: 0.019
    }
  },
  {
    id: 'mars',
    nameUz: 'Mars',
    nameEn: 'Mars',
    type: 'terrestrial',
    typeLabelUz: 'Ichki qoyatosh sayyora',
    taglineUz: 'Qizil sayyora — insoniyatning kelajakdagi ikkinchi uyi',
    descriptionUz: "Mars — zanglagan temir oksidi changi bilan qoplangan sirli qizil sayyora. Unda Quyosh tizimidagi eng baland vulqon Olimp (Everestdan 2.5 barobar baland) va Yerning Katta Kanyonidan 10 barobar uzun bo'lgan Mariner vodiylari mavjud. Hozirda Perseverance va Curiosity roverlari qadimgi hayot izlarini qidirmoqda.",
    diameterKm: 6779,
    massKg: '6.417 × 10²³ kg (Yer massasining 10.7%)',
    distanceFromSunAu: 1.52,
    distanceFromSunKm: 227900000,
    orbitalPeriodDays: 687,
    rotationPeriodHours: 24.62,
    avgTempC: -63,
    minTempC: -140,
    maxTempC: 20,
    moonsCount: 2,
    moonsList: [
      { name: 'Fobos (Phobos)', diameterKm: 22.2, descriptionUz: 'Marsga eng yaqin asteroidsimon yo\'ldosh.' },
      { name: 'Deymos (Deimos)', diameterKm: 12.4, descriptionUz: 'Kichik tashqi yo\'ldosh.' }
    ],
    gravityMps2: 3.72,
    lightTravelTimeSun: '12 daqiqa 40 soniya',
    lightTravelTimeEarth: '4 daqiqa - 24 daqiqa',
    apparentMagnitude: '-2.94 dan +1.86 gacha',
    realImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg',
    realPhotos: [
      {
        titleUz: 'Perseverance roveri Mars sirtida (Jezero krateri)',
        source: 'NASA / JPL-Caltech / Mastcam-Z',
        imageUrl: 'https://images.nasa.gov/images/PIA24424~orig.jpg',
        descriptionUz: 'Haqiqiy marsiy landshaft: 3.8 milliard yil avval ko\'l bo\'lgan Jezero kraterida olingan o\'ta yuqori aniqlikdagi panorama.'
      },
      {
        titleUz: 'Olimp tog\'i (Olympus Mons) — Quyosh tizimidagi eng ulkan vulqon',
        source: 'ESA / Mars Express Orbiter',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Olympus_Mons_alt.jpg/1024px-Olympus_Mons_alt.jpg',
        descriptionUz: 'Balandligi 21.9 km bo\'lgan Quyosh tizimidagi eng baland cho\'qqi; maydoni butun Fransiya hududiga teng.'
      },
      {
        titleUz: 'Marsdagi moviy quyosh botishi',
        source: 'NASA / Curiosity Rover',
        imageUrl: 'https://images.nasa.gov/images/PIA19400~orig.jpg',
        descriptionUz: 'Yupqa Mars atmosferasidagi chang zarrachalari ko\'k yorug\'likni sochishi sababli Marsda shafaq ko\'k rangda jilolanadi.'
      }
    ],
    landmarks: [
      {
        id: 'olympus-mons',
        nameUz: 'Olimp Tog\'i (Olympus Mons)',
        typeUz: 'Super Vulqon',
        coords: { x: 32, y: 40 },
        sizeKm: '21.9 km balandlik, 600 km diametr',
        descriptionUz: 'Sayyoramizdagi Everestdan 2.5 barobar baland bo\'lgan koinotdagi eng ulkan vulqon.',
        realPhotoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Olympus_Mons_alt.jpg/1024px-Olympus_Mons_alt.jpg'
      },
      {
        id: 'valles-marineris',
        nameUz: 'Mariner Vodiylari (Valles Marineris)',
        typeUz: 'Gigant Kanyonlar Tizimi',
        coords: { x: 55, y: 55 },
        sizeKm: '4,000 km uzunlik, 7 km chuqurlik',
        descriptionUz: 'Butun Yevropa qit\'asi kengligiga teng ulkan tektonik daralar majmuasi.',
        realPhotoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg'
      },
      {
        id: 'jezero-crater',
        nameUz: 'Jezero Krateri (Perseverance qo\'nish joyi)',
        typeUz: 'Qadimiy Daryo Deltasi',
        coords: { x: 68, y: 35 },
        sizeKm: '45 km diametr',
        descriptionUz: 'Qadimda suv bilan to\'lib turgan daryo deltasi, qazilma mikrobial hayot qidirilayotgan joy.',
        realPhotoUrl: 'https://images.nasa.gov/images/PIA24424~orig.jpg'
      }
    ],
    atmosphereCompositionUz: [
      'Karbonat angidrid (CO₂): 95.3%',
      'Azot (N₂): 2.7%',
      'Argon (Ar): 1.6%',
      'Kislorod (O₂): 0.13%'
    ],
    funFactsUz: [
      'Marsda quyosh botishi moviy rangda porlaydi.',
      'Marsdagi bir kun (sol) 24 soat 39 daqiqa — deyarli Yerdagi kabi.',
      'Marsda butun sayyorani oylarcha o\'rab oluvchi global chang bo\'ronlari bo\'ladi.'
    ],
    missions: [
      { name: 'Perseverance va Ingenuity', year: '2021-hozirgacha', agency: 'NASA', descriptionUz: 'Birinchi marotaba begona sayyorada vertolyot uchirdi va tosh namunalarini to\'pladi.' },
      { name: 'Curiosity', year: '2012-hozirgacha', agency: 'NASA', descriptionUz: 'Geyl kraterida suvli o\'tmishni isbotladi.' }
    ],
    internalLayers: [
      { nameUz: 'Temir-oltingugurt yadro', nameEn: 'Dense Core', depth: 'Radiusi ~1,800 km', descriptionUz: 'Qisman erigan metall yadro.', color: '#a53860' },
      { nameUz: 'Silikat mantiya', nameEn: 'Silicate Mantle', depth: 'Qalinligi ~1,500 km', descriptionUz: 'Qadimiy vulqonlarni oziqlantirgan tosh qatlam.', color: '#da627d' },
      { nameUz: 'Temir oksidli qobiq', nameEn: 'Oxidized Crust', depth: 'Qalinligi ~50 km', descriptionUz: 'Zanglagan qizil chang va bazalt.', color: '#e56b6f' }
    ],
    visual: {
      baseRadius: 1.1,
      distanceAuVisual: 32,
      realDistanceScale: 1.52,
      orbitSpeed: 0.013,
      rotationSpeed: 0.014,
      axialTiltDeg: 25.19,
      color: '#c85a32',
      hasAtmosphereGlow: true,
      atmosphereColor: '#e07a5f'
    }
  },
  {
    id: 'jupiter',
    nameUz: 'Yupiter',
    nameEn: 'Jupiter',
    type: 'gas_giant',
    typeLabelUz: 'Gaz giganti',
    taglineUz: 'Sayyoralar shohi — Quyosh tizimining eng bahaybat himoyachisi',
    descriptionUz: "Yupiter — barcha boshqa sayyoralarning birgalikdagi massasidan 2.5 barobar og'irroq bo'lgan gaz bahaybati. Unda qattiq sirt yo'q. Mashhur 'Katta Qizil Dog' — bu kamida 350 yildan beri tinimsiz aylanayotgan, Yer sharidan ham kattaroq gigant quyundir.",
    diameterKm: 139820,
    massKg: '1.898 × 10²⁷ kg (Yer massasidan 318 baravar katta)',
    distanceFromSunAu: 5.2,
    distanceFromSunKm: 778500000,
    orbitalPeriodDays: 4333,
    rotationPeriodHours: 9.93,
    avgTempC: -110,
    minTempC: -145,
    maxTempC: 24000,
    moonsCount: 95,
    moonsList: [
      { name: 'Ganimed (Ganymede)', diameterKm: 5268, descriptionUz: 'Koinotdagi eng katta yo\'ldosh (Merkuriydan ham yirik).' },
      { name: 'Kallisto (Callisto)', diameterKm: 4821, descriptionUz: 'Kraterlar bilan eng zich qoplangan qadimiy sirt.' },
      { name: 'Io (Io)', diameterKm: 3643, descriptionUz: 'Yuzlab faol oltingugurt vulqonlari otilib turuvchi olovli olam.' },
      { name: 'Yevropa (Europa)', diameterKm: 3122, descriptionUz: 'Muz ostida Yer okeanlaridan 2 barobar ko\'proq suvli global okean bor.' }
    ],
    gravityMps2: 24.79,
    lightTravelTimeSun: '43 daqiqa 15 soniya',
    lightTravelTimeEarth: '33 daqiqa - 53 daqiqa',
    apparentMagnitude: '-2.94 gacha (Juda yorqin)',
    realImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg',
    realPhotos: [
      {
        titleUz: 'Katta Qizil Dog\' (Great Red Spot) — Juno yaqindan tasviri',
        source: 'NASA / JPL-Caltech / SwRI / MSSS / JunoCam',
        imageUrl: 'https://images.nasa.gov/images/PIA21775~orig.jpg',
        descriptionUz: 'Yer sayyorasidan ham kattaroq bo\'lgan 400 yillik super-bo\'ronning Juno apparati tomonidan 9,000 km masofadan olingan fotosurati.'
      },
      {
        titleUz: 'Yupiterning qutb bo\'ronlari va siklonlari',
        source: 'NASA / Juno Missiyasi',
        imageUrl: 'https://images.nasa.gov/images/PIA21984~orig.jpg',
        descriptionUz: 'Yupiter shimoliy qutbidagi bir-biri atrofida aylanuvchi bir necha ming kilometrli gipnozli girdoblar.'
      }
    ],
    landmarks: [
      {
        id: 'great-red-spot',
        nameUz: 'Katta Qizil Dog\' (Great Red Spot)',
        typeUz: 'Antitsiklonik Bo\'ron',
        coords: { x: 58, y: 65 },
        sizeKm: '16,350 km eniga (Yer to\'liq sig\'adi)',
        descriptionUz: 'Shamol tezligi soatiga 680 km bo\'lgan, kamida 350 yildan beri davom etayotgan ulkan bo\'ron.',
        realPhotoUrl: 'https://images.nasa.gov/images/PIA21775~orig.jpg'
      },
      {
        id: 'equatorial-bands',
        nameUz: 'Ekvatorial Ammiak Bo\'ron Belbog\'lari',
        typeUz: 'Atmosfera Oqimlari',
        coords: { x: 50, y: 48 },
        sizeKm: 'Butun sayyora bo\'ylab',
        descriptionUz: 'Har xil tezlikda qarama-qarshi yo\'nalishda harakatlanuvchi rang-barang gaz oqimlari.',
        realPhotoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg'
      }
    ],
    atmosphereCompositionUz: [
      'Vodorod (H₂): 89.8%',
      'Geliy (He): 10.2%',
      'Metan: 0.3%',
      'Ammiak: 0.026%'
    ],
    funFactsUz: [
      'Yupiter o\'z o\'qi atrofida eng tez aylanadi — bir kun atigi 9 soat 55 daqiqa.',
      'U o\'zining kuchli gravitatsiyasi bilan kometalarni tutib, Yerni falokatlardan asraydi.',
      'Yupiter ichida suyuq metallik vodorod okeani mavjud.'
    ],
    missions: [
      { name: 'Juno', year: '2016-hozirgacha', agency: 'NASA', descriptionUz: 'Yupiter qutblari va atmosferasini o\'rganmoqda.' },
      { name: 'Galileo', year: '1995-2003', agency: 'NASA', descriptionUz: 'Yupiter atrofida 8 yil aylanib, uning yo\'ldoshlarida okeanlar borligini ochdi.' }
    ],
    internalLayers: [
      { nameUz: 'Qoyatosh yadro', nameEn: 'Core', depth: 'Massa ~15 Yer massasi', descriptionUz: '24,000 °C haroratdagi tosh va og\'ir elementlar.', color: '#4a4e69' },
      { nameUz: 'Metallik vodorod', nameEn: 'Metallic Hydrogen', depth: 'Qalinligi ~40,000 km', descriptionUz: 'Elektr o\'tkazuvchi super-suyuq metall vodorod.', color: '#9a8c98' },
      { nameUz: 'Molekulyar vodorod', nameEn: 'Molecular Hydrogen', depth: 'Qalinligi ~20,000 km', descriptionUz: 'Gazdan asta suyuqlikka o\'tuvchi qatlam.', color: '#c9ada7' },
      { nameUz: 'Bo\'ronli atmosfera', nameEn: 'Atmosphere', depth: 'Qalinligi ~1,000 km', descriptionUz: 'Ammiak va vodorod bulutlari.', color: '#d4a373' }
    ],
    visual: {
      baseRadius: 3.8,
      distanceAuVisual: 46,
      realDistanceScale: 5.2,
      orbitSpeed: 0.007,
      rotationSpeed: 0.025,
      axialTiltDeg: 3.13,
      color: '#d4a373',
      hasAtmosphereGlow: true,
      atmosphereColor: '#eddcd2'
    }
  },
  {
    id: 'saturn',
    nameUz: 'Saturn',
    nameEn: 'Saturn',
    type: 'gas_giant',
    typeLabelUz: 'Gaz giganti',
    taglineUz: 'Halqalar tojini kiygan osmon mo\'jizasi',
    descriptionUz: "Saturn — Quyosh tizimidagi eng go'zal sayyora bo'lib, milliardlab muz bo'laklari va chang zarrachalaridan iborat muhtasham halqalar tizimiga ega. Sayyoraning o'rtacha zichligi suvnikidan ham past (0.69 g/sm³) — agar yetarli darajadagi ulkan suv havzasi bo'lsa, Saturn cho'kmasdan suzib yurar edi.",
    diameterKm: 116460,
    massKg: '5.683 × 10²⁶ kg (Yer massasidan 95 baravar katta)',
    distanceFromSunAu: 9.58,
    distanceFromSunKm: 1433500000,
    orbitalPeriodDays: 10759,
    rotationPeriodHours: 10.66,
    avgTempC: -140,
    minTempC: -185,
    maxTempC: 11700,
    moonsCount: 146,
    moonsList: [
      { name: 'Titan (Titan)', diameterKm: 5150, descriptionUz: 'Qalin azot atmosferasi, metan daryolari va ko\'llariga ega bo\'lgan yagona yo\'ldosh.' },
      { name: 'Enselad (Enceladus)', diameterKm: 504, descriptionUz: 'Muzli qobig\'idan ochiq koinotga suv geyzerlari purkaydi (hayot uchun qulay okean).' },
      { name: 'Mimas (Mimas)', diameterKm: 396, descriptionUz: 'Katta Gershel krateri tufayli "O\'lim yulduzi"ga o\'xshaydi.' }
    ],
    gravityMps2: 10.44,
    lightTravelTimeSun: '1 soat 19 daqiqa',
    lightTravelTimeEarth: '1 soat 10 daqiqa - 1 soat 30 daqiqa',
    apparentMagnitude: '+0.43 (Yalang ko\'z bilan ko\'rinadi)',
    realImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg',
    realPhotos: [
      {
        titleUz: 'Cassini fazoviy stansiyasidan Saturn va uning halqalari',
        source: 'NASA / ESA / SSI / Cassini Imaging Team',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg',
        descriptionUz: 'Tarixdagi eng mukammal real fotosurat: Saturnning ekvinoks (tengkunlik) davrida olingan 30 dan ortiq fotosuratlar mozaikasi.'
      },
      {
        titleUz: 'Saturnning shimoliy qutbidagi sirli Oltiburchak (Hexagon)',
        source: 'NASA / JPL-Caltech / SSI / Hampton University',
        imageUrl: 'https://images.nasa.gov/images/PIA17652~orig.jpg',
        descriptionUz: 'Eni 30,000 km bo\'lgan mukammal geometrik 6 burchakli atmosfera oqimi.'
      }
    ],
    landmarks: [
      {
        id: 'cassini-division',
        nameUz: 'Kassini Bo\'shlig\'i (Cassini Division)',
        typeUz: 'Halqalar Oralig\'i',
        coords: { x: 75, y: 50 },
        sizeKm: '4,800 km kenglikda',
        descriptionUz: 'Mimas yo\'ldoshining gravitatsiyasi sababli tozalangan, asosiy A va B halqalar orasidagi bo\'shliq.',
        realPhotoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg'
      },
      {
        id: 'north-polar-hexagon',
        nameUz: 'Saturn Oltiburchagi (North Polar Hexagon)',
        typeUz: 'Oltiburchakli Bo\'ron',
        coords: { x: 50, y: 15 },
        sizeKm: '32,000 km diametrda',
        descriptionUz: 'Sayyora qutbida doimiy aylanuvchi sirli oltiburchakli reaktiv oqim.',
        realPhotoUrl: 'https://images.nasa.gov/images/PIA17652~orig.jpg'
      }
    ],
    atmosphereCompositionUz: [
      'Vodorod (H₂): 96.3%',
      'Geliy (He): 3.25%',
      'Metan: 0.45%',
      'Ammiak: 0.01%'
    ],
    funFactsUz: [
      'Halqalarning kengligi 282,000 km, lekin qalinligi atigi 10-100 metr!',
      'Saturn 146 ta tabiiy yo\'ldosh bilan Quyosh tizimida mutlaq rekordchi.',
      'Uning o\'rtacha zichligi suvnikidan ham pastroqdir.'
    ],
    missions: [
      { name: 'Cassini-Huygens', year: '1997-2017', agency: 'NASA / ESA / ASI', descriptionUz: 'Saturn va uning yo\'ldoshlarini 13 yil davomida chuqur o\'rgandi.' }
    ],
    internalLayers: [
      { nameUz: 'Tosh va muz yadro', nameEn: 'Core', depth: 'Massa ~15 Yer massasi', descriptionUz: 'Og\'ir minerallar va muz aralashmasi.', color: '#3d348b' },
      { nameUz: 'Metallik vodorod', nameEn: 'Metallic Hydrogen', depth: 'Qalinligi ~15,000 km', descriptionUz: 'O\'ta siqilgan suyuq metall vodorod.', color: '#7678ed' },
      { nameUz: 'Molekulyar vodorod', nameEn: 'Hydrogen-Helium', depth: 'Qalinligi ~25,000 km', descriptionUz: 'Tashqi gazli qatlamga ulanuvchi suyuqlik.', color: '#f7b801' },
      { nameUz: 'Tilla rang atmosfera', nameEn: 'Atmosphere', depth: 'Qalinligi ~1,000 km', descriptionUz: 'Ammiak kristallari va metan tumanlari.', color: '#e0c097' }
    ],
    visual: {
      baseRadius: 3.2,
      distanceAuVisual: 60,
      realDistanceScale: 9.58,
      orbitSpeed: 0.005,
      rotationSpeed: 0.022,
      axialTiltDeg: 26.73,
      color: '#e2c275',
      hasRings: true,
      ringInnerRadius: 4.2,
      ringOuterRadius: 7.8,
      ringColor: '#d6c59b',
      hasAtmosphereGlow: true,
      atmosphereColor: '#faedcd'
    }
  },
  {
    id: 'uranus',
    nameUz: 'Uran',
    nameEn: 'Uranus',
    type: 'ice_giant',
    typeLabelUz: 'Muz giganti',
    taglineUz: 'Yonboshlagan zangori muz saroyi',
    descriptionUz: "Uran — zangori-moviy feruza tusdagi muz giganti. Uning o'ziga xosligi shundaki, u o'z o'qi atrofida 98 daraja burchak ostida, ya'ni deyarli 'yonboshlab' aylanadi. Uning atmosferasi Quyosh tizimidagi eng sovuq atmosfera hisoblanadi (-224°C).",
    diameterKm: 50724,
    massKg: '8.681 × 10²⁵ kg (Yer massasidan 14.5 baravar katta)',
    distanceFromSunAu: 19.2,
    distanceFromSunKm: 2871000000,
    orbitalPeriodDays: 30687,
    rotationPeriodHours: -17.24,
    avgTempC: -195,
    minTempC: -224,
    maxTempC: 4700,
    moonsCount: 28,
    moonsList: [
      { name: 'Titaniya (Titania)', diameterKm: 1578, descriptionUz: 'Kanyonlar bilan qoplangan eng yirik yo\'ldoshi.' },
      { name: 'Miranda (Miranda)', diameterKm: 472, descriptionUz: 'Koinotdagi eng chuqur jarlik — 20 km li Verona Rupesga ega.' }
    ],
    gravityMps2: 8.69,
    lightTravelTimeSun: '2 soat 40 daqiqa',
    lightTravelTimeEarth: '2 soat 30 daqiqa - 2 soat 50 daqiqa',
    apparentMagnitude: '+5.38 (Qorong\'i osmonda arang ko\'rinadi)',
    realImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg',
    realPhotos: [
      {
        titleUz: 'Voyager 2 apparatidan olingan haqiqiy rangli Uran fotosurati',
        source: 'NASA / JPL-Caltech',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg',
        descriptionUz: '1986-yilda Voyager 2 zondi tomonidan 9.1 million km masofadan olingan haqiqiy feruza-moviy Uran tasviri.'
      }
    ],
    landmarks: [
      {
        id: 'verona-rupes',
        nameUz: 'Verona Rupes Jarligi (Miranda yo\'ldoshida)',
        typeUz: 'Ekstremal Kanyon',
        coords: { x: 45, y: 55 },
        sizeKm: '20 km tik balandlik',
        descriptionUz: 'Koinotdagi eng chuqur tik jarlik; pastga qulagan tosh 12 daqiqa davomida uchib tushadi.',
        realPhotoUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg'
      }
    ],
    atmosphereCompositionUz: [
      'Vodorod (H₂): 82.5%',
      'Geliy (He): 15.2%',
      'Metan (CH₄): 2.3% (Feruza rang manbai)'
    ],
    funFactsUz: [
      "Uran Quyosh atrofida 'yonboshlagan' g'ildirak kabi aylanadi — qutblarida 42 yil yoz, 42 yil qish bo'ladi.",
      'Teleskop orqali kashf etilgan birinchi sayyora (Uilyam Gershel, 1781).',
      'Atmosferasi -224 °C gacha sovub, eng past harorat rekordchisidir.'
    ],
    missions: [
      { name: 'Voyager 2', year: '1986', agency: 'NASA', descriptionUz: 'Uran yonidan uchib o\'tgan yagona kosmik apparat.' }
    ],
    internalLayers: [
      { nameUz: 'Qoyatosh yadro', nameEn: 'Core', depth: 'Radiusi ~4,000 km', descriptionUz: 'Temir va minerallar.', color: '#4a5568' },
      { nameUz: 'Muzli mantiya', nameEn: 'Icy Mantle', depth: 'Qalinligi ~15,000 km', descriptionUz: 'Qaynoq zich suv, ammiak va metan muzi.', color: '#48cae4' },
      { nameUz: 'Metan atmosferasi', nameEn: 'Atmosphere', depth: 'Qalinligi ~10,000 km', descriptionUz: 'Feruza rangli metan tumanlari.', color: '#a0e7e5' }
    ],
    visual: {
      baseRadius: 2.2,
      distanceAuVisual: 74,
      realDistanceScale: 19.2,
      orbitSpeed: 0.003,
      rotationSpeed: -0.012,
      axialTiltDeg: 97.77,
      color: '#70d6ff',
      hasRings: true,
      ringInnerRadius: 2.6,
      ringOuterRadius: 3.4,
      ringColor: '#bbf2f6',
      hasAtmosphereGlow: true,
      atmosphereColor: '#9bf6ff'
    }
  },
  {
    id: 'neptune',
    nameUz: 'Neptun',
    nameEn: 'Neptune',
    type: 'ice_giant',
    typeLabelUz: 'Muz giganti',
    taglineUz: 'Dahshatli quyunlar kezuvchi cheksiz moviy ummon',
    descriptionUz: "Neptun — Quyoshdan eng olisda joylashgan sakkizinchi sayyora. Uning chuqur ko'k rangi metan gazi sabablidir. Neptunda tovush tezligidan ham oshuvchi, soatiga 2,100 kilometr tezlikdagi dahshatli shamollar esadi.",
    diameterKm: 49244,
    massKg: '1.024 × 10²⁶ kg (Yer massasidan 17 baravar katta)',
    distanceFromSunAu: 30.07,
    distanceFromSunKm: 4498000000,
    orbitalPeriodDays: 60190,
    rotationPeriodHours: 16.11,
    avgTempC: -201,
    minTempC: -218,
    maxTempC: 5000,
    moonsCount: 16,
    moonsList: [
      { name: 'Triton (Triton)', diameterKm: 2707, descriptionUz: 'Neptun o\'qiga teskari aylanuvchi muzli ulkan yo\'ldosh, faol azot geyzerlariga ega.' }
    ],
    gravityMps2: 11.15,
    lightTravelTimeSun: '4 soat 10 daqiqa',
    lightTravelTimeEarth: '4 soat 0 daqiqa - 4 soat 20 daqiqa',
    apparentMagnitude: '+7.67 (Faqat teleskop orqali ko\'rinadi)',
    realImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg',
    realPhotos: [
      {
        titleUz: 'Voyager 2 zondi olgan Neptun va Katta Qorong\'i Dog\'',
        source: 'NASA / JPL-Caltech',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg',
        descriptionUz: '1989-yilda olingan mashhur real fotosurat: chuqur ko\'k atmosfera, oq metan bulutlari va Katta Qorong\'i Dog\'.'
      }
    ],
    landmarks: [
      {
        id: 'great-dark-spot',
        nameUz: 'Katta Qorong\'i Dog\' (Great Dark Spot)',
        typeUz: 'Gigant Siklonik Bo\'ron',
        coords: { x: 50, y: 55 },
        sizeKm: '13,000 × 6,600 km',
        descriptionUz: 'Shamol tezligi soatiga 2,100 km ga yetuvchi koinotdagi eng tezkor quyun.',
        realPhotoUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg'
      }
    ],
    atmosphereCompositionUz: [
      'Vodorod (H₂): 80%',
      'Geliy (He): 19%',
      'Metan (CH₄): 1.5%'
    ],
    funFactsUz: [
      'Neptun kashf etilganidan buyon Quyosh atrofida atigi bir marta to\'liq aylanib chiqdi (2011-yilda).',
      'Neptun sirtidagi shamollar Yer bo\'ronlaridan 9 marta kuchliroq.',
      'Neptun qa\'ridagi ulkan bosim ostida haqiqiy olmos yomg\'irlari yog\'ishi taxmin qilinadi.'
    ],
    missions: [
      { name: 'Voyager 2', year: '1989', agency: 'NASA', descriptionUz: 'Neptun va Tritonni yaqindan o\'rgangan yagona kema.' }
    ],
    internalLayers: [
      { nameUz: 'Tosh yadro', nameEn: 'Core', depth: 'Massa ~1.2 Yer massasi', descriptionUz: 'Silikat va metall markaz.', color: '#274c77' },
      { nameUz: 'Super-ionli muz mantiya', nameEn: 'Mantle', depth: 'Qalinligi ~16,000 km', descriptionUz: 'Olmos kristallari hosil bo\'ladigan suv-ammiak okeani.', color: '#168aad' },
      { nameUz: 'Atmosfera', nameEn: 'Atmosphere', depth: 'Qalinligi ~5,000 km', descriptionUz: 'Bo\'ronli chuqur ko\'k gaz qatlami.', color: '#0077b6' }
    ],
    visual: {
      baseRadius: 2.1,
      distanceAuVisual: 88,
      realDistanceScale: 30.07,
      orbitSpeed: 0.002,
      rotationSpeed: 0.013,
      axialTiltDeg: 28.32,
      color: '#0077b6',
      hasAtmosphereGlow: true,
      atmosphereColor: '#00b4d8'
    }
  },
  {
    id: 'pluto',
    nameUz: 'Pluton',
    nameEn: 'Pluto',
    type: 'dwarf',
    typeLabelUz: 'Mitti sayyora (Koyper belbog\'i)',
    taglineUz: 'Koyper belbog\'ining yurak shaklidagi muzli qiroli',
    descriptionUz: "Pluton — Quyosh tizimining eng chekka hududidagi mitti sayyora. 2015-yilda New Horizons apparati uning yonidan uchib o'tib, sirtidagi mashhur ulkan muz yurak (Tombo tekisligi) va 3,500 metrli suv muzidan iborat tog'larni kashf etdi.",
    diameterKm: 2376,
    massKg: '1.303 × 10²² kg',
    distanceFromSunAu: 39.48,
    distanceFromSunKm: 5906380000,
    orbitalPeriodDays: 90560,
    rotationPeriodHours: -153.3,
    avgTempC: -229,
    minTempC: -240,
    maxTempC: -218,
    moonsCount: 5,
    moonsList: [
      { name: 'Xaron (Charon)', diameterKm: 1212, descriptionUz: 'Plutonning yarmi o\'lchamidagi ulkan yo\'ldosh.' }
    ],
    gravityMps2: 0.62,
    lightTravelTimeSun: '5 soat 28 daqiqa',
    lightTravelTimeEarth: '5 soat 20 daqiqa - 5 soat 40 daqiqa',
    apparentMagnitude: '+13.65 (Faqat kuchli teleskopda ko\'rinadi)',
    realImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Pluto_in_True_Color_-_High-Res.jpg',
    realPhotos: [
      {
        titleUz: 'New Horizons zondi olgan Plutonning haqiqiy rangli portreti',
        source: 'NASA / Johns Hopkins University APL / Southwest Research Institute',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Pluto_in_True_Color_-_High-Res.jpg',
        descriptionUz: 'Tarixda ilk bor Plutonga 12,500 km yaqinlashib olingan fotosurat — mashhur Tombo yurak muzligi va muz cho\'qqilari.'
      }
    ],
    landmarks: [
      {
        id: 'tombaugh-regio',
        nameUz: 'Tombo Mintaqasi (Muz Yurak)',
        typeUz: 'Azotli Muzlik Tekisligi',
        coords: { x: 55, y: 55 },
        sizeKm: '1,000 km kenglikda',
        descriptionUz: 'Muzlagan azot, uglerod oksidi va metandan iborat mashhur yurak shaklidagi muzlik.',
        realPhotoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Pluto_in_True_Color_-_High-Res.jpg'
      }
    ],
    atmosphereCompositionUz: [
      'Azot (N₂): 99%',
      'Metan (CH₄): 0.5%',
      'Uglerod oksidi (CO): 0.1%'
    ],
    funFactsUz: [
      'Pluton yuzasida haqiqiy yurak shaklidagi ulkan muzlik mavjud.',
      'Pluton maydoni bo\'yicha Rossiya hududidan ham kichikroqdir.',
      'Pluton va uning yo\'ldoshi Xaron bir-biriga doim bir xil yuzi bilan boqib turadi.'
    ],
    missions: [
      { name: 'New Horizons', year: '2015', agency: 'NASA', descriptionUz: 'Pluton yonidan uchib o\'tib, uning sirini butun dunyoga ochib berdi.' }
    ],
    internalLayers: [
      { nameUz: 'Tosh yadro', nameEn: 'Core', depth: 'Radiusi ~850 km', descriptionUz: 'Zich toshli silikatlar.', color: '#495057' },
      { nameUz: 'Suv-muz mantiyasi', nameEn: 'Icy Mantle', depth: 'Qalinligi ~300 km', descriptionUz: 'Suyuq suv okeani ehtimoli bor.', color: '#a2d2ff' },
      { nameUz: 'Muz po\'stlog\'i', nameEn: 'Crust', depth: 'Qalinligi ~50 km', descriptionUz: 'Muzlagan azot va metan.', color: '#e9ecef' }
    ],
    visual: {
      baseRadius: 0.7,
      distanceAuVisual: 102,
      realDistanceScale: 39.48,
      orbitSpeed: 0.0012,
      rotationSpeed: -0.006,
      axialTiltDeg: 122.5,
      color: '#c4b5a5'
    }
  }
];
