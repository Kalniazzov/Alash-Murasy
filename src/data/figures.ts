import { Figure } from './types';

/**
 * 16 Authoritative Alash Figures (8 Core + 8 Extended)
 * Strictly typed against Figure interface in src/data/types.ts
 */
export const figures: Figure[] = [
  // ==========================================
  // CORE FIGURES (8)
  // ==========================================
  {
    id: 'bokeikhanov',
    name: {
      kz: 'Әлихан Нұрмұхамедұлы Бөкейханов',
      en: 'Alikhan Bokeikhanov',
    },
    lifeYears: '1866–1937',
    role: 'leader',
    roleTitle: {
      kz: 'Алаш қозғалысының көсемі, Алашорда үкіметінің төрағасы, экономист-ғалым',
      en: 'Leader of the Alash Movement, Head of Alash Orda Government, Economist',
    },
    shortBio: {
      kz: 'ХХ ғасыр басындағы қазақ ұлт-азаттық қозғалысының саяси көсемі, ғалым-экономист, Алаш автономиясы мен Алашорда үкіметінің төрағасы.',
      en: 'Political leader of the Kazakh national liberation movement, economist-scholar, and Chairman of the Alash Autonomy and the Alash Orda government.',
    },
    fullBio: {
      kz: 'Әлихан Бөкейханов — ХХ ғасыр басындағы қазақ ұлт-азаттық қозғалысының рухани әрі саяси көсемі. Ол қазақ қоғамын еуропалық үлгідегі демократиялық, құқықтық және дербес мемлекетке айналдыруды мұрат тұтты.\n\n1905 жылғы Қарқаралы петициясын ұйымдастырушылардың бірі болды. 1906 жылы Семей облысынан Ресей империясының І Мемлекеттік Думасына депутат болып сайланып, Выборг үндеуіне қол қойғаны үшін патша сотымен түрмеге қамалды. 1913–1918 жылдары Орынборда шыққан «Қазақ» газеті арқылы ұлттық бағдарламаны халыққа жеткізді.\n\n1917 жылғы шілдеде Бірінші жалпықазақ съезінде Алаш партиясын құруға жетекшілік етіп, сол жылғы желтоқсанда Екінші жалпықазақ съезінде бүкілхалықтық баламалы дауыспен Алаш автономиясы үкіметі — Алашорданың төрағасы (премьер-министрі) болып сайланды. 1920–1930 жылдары Мәскеуде үйқамақта отырып, ғылыми-аудармалық жұмыстармен айналысты. 1937 жылғы 27 қыркүйекте Мәскеуде Бутырка түрмесінде атылды. 1989 жылы толық ақталды.',
      en: 'Alikhan Bokeikhanov was the supreme political and intellectual architect of the Alash national liberation movement in early 20th-century Kazakhstan. He envisioned transforming traditional Kazakh society into a modern, law-governed, democratic republic.\n\nIn 1905, he was among the principal organizers of the historic Karkaraly Petition. Elected to the First State Duma of the Russian Empire in 1906 representing Semipalatinsk Oblast, he was imprisoned for co-signing the Vyborg Manifesto defending parliamentary democracy. Between 1913 and 1918 in Orenburg, he helped steer national civic consciousness through the seminal newspaper "Qazaq".\n\nIn July 1917, he convened the First All-Kazakh Congress and founded the Alash Party. In December 1917, at the Second All-Kazakh Congress, he was democratically elected Chairman of the Provisional People\'s Council of Alash Orda. Placed under house arrest in Moscow throughout the 1920s and 1930s, he pursued scholarly economic studies and literary translations until his execution at Butyrka prison on September 27, 1937. He was officially rehabilitated in 1989.',
    },
    education: {
      kz: 'Омбы техникалық училищесі (1890); Санкт-Петербург Императорлық орман институтының экономикалық факультеті (1894)',
      en: 'Omsk Technical School (1890); Faculty of Economics, Saint Petersburg Imperial Forestry Institute (1894)',
    },
    keyWorks: {
      kz: [
        '«Қыр баласы» публицистикалық мақалалары (1913–1918)',
        '«Исторические судьбы киргизского края и культурные его успехи» (1903)',
        'Ф. Щербина экспедициясының экономикалық зерттеулері (1896–1903)',
        'Л. Толстой, А. Чехов, В. Короленко шығармаларының қазақша аудармалары',
      ],
      en: [
        'Publicistic essays under the pen name "Qyr balasy" (1913–1918)',
        'Historical Destinies of the Kirghiz Krai and Its Cultural Progress (1903)',
        'Economic research for the Shcherbina Expedition (1896–1903)',
        'Literary translations of Leo Tolstoy, Anton Chekhov, and Vladimir Korolenko',
      ],
    },
    quote: {
      kz: 'Тірі болсам, қазаққа қызмет қылмай қоймаймын. Алашқа қызмет ету — білімнен емес, мінезден.',
      en: 'As long as I live, I shall never cease serving the Kazakh people. Serving Alash is not a matter of knowledge alone, but of character.',
      citation: '«Қазақ» газеті, 1913 ж.',
    },
    milestones: [
      {
        year: 1905,
        event: {
          kz: 'Қарқаралы петициясын ұйымдастыруға қатысып, халық талаптарын тұжырымдады.',
          en: 'Co-organized the historic Karkaraly Petition formulating national political demands.',
        },
      },
      {
        year: 1906,
        event: {
          kz: 'І Мемлекеттік Думаға депутат болып сайланып, Выборг үндеуіне қол қойды.',
          en: 'Elected deputy to the First State Duma and co-signed the Vyborg Appeal.',
        },
      },
      {
        year: 1917,
        event: {
          kz: 'Екінші жалпықазақ съезінде Алаш автономиясы үкіметі — Алашорданың төрағасы болып сайланды.',
          en: 'Elected Chairman of the Provisional People\'s Council of Alash Orda at the Second All-Kazakh Congress.',
        },
      },
    ],
    photoUrl: '/images/portraits/bokeikhanov.jpeg',
    isCore: true,
  },
  {
    id: 'baitursynov',
    name: {
      kz: 'Ахмет Байтұрсынұлы',
      en: 'Akhmet Baitursynov',
    },
    lifeYears: '1872–1937',
    role: 'scholar',
    roleTitle: {
      kz: '«Ұлт ұстазы», қазақ тіл білімінің негізін қалаушы, ақын, реформатор',
      en: 'Teacher of the Nation, Founder of Kazakh Linguistics, Poet, Reformer',
    },
    shortBio: {
      kz: '«Ұлт ұстазы», қазақ тіл білімі мен әдебиеттану ғылымының негізін салушы, төте жазу реформаторы, «Қазақ» газетінің бас редакторы.',
      en: 'Revered "Teacher of the Nation", founder of modern Kazakh linguistics, creator of Reformed Arabic Script, and editor-in-chief of "Qazaq".',
    },
    fullBio: {
      kz: 'Ахмет Байтұрсынұлы — қазақ халқы «Ұлт ұстазы» деп ардақтаған кемеңгер ғалым, ағартушы, ақын және мемлекет қайраткері. Ол қазақ жазуын түбегейлі реформалап, қазақ тілінің табиғи дыбыстық үндестігіне бейімделген «Төте жазу» (Байтұрсынұлы әліпбиі) жүйесін жасап шығарды.\n\n1909 жылы Санкт-Петербургте «Қырық мысал», 1911 жылы Орынборда «Маса» атты тұңғыш өлеңдер жинағын шығарып, халықты білім мен бірлікке шақырды. 1913–1918 жылдары Орынборда «Қазақ» газетінің бас редакторы болып, ұлттық баспасөзді жаңа деңгейге көтерді.\n\n1917 жылы Алаш партиясы мен Алашорда үкіметін құруға белсене қатысты, Оқу-ағарту комиссиясына жетекшілік етті. 1920–1921 жылдары Қазақ АКСР Халық ағарту комиссары болып қызмет істеп, ұлттық мектептер мен алғашқы төл оқулықтар жүйесін қалыптастырды. «Тіл-құрал», «Оқу құралы», «Әдебиет танытқыш» атты іргелі еңбектерімен қазақ ғылымының іргетасын қалады. 1937 жылы желтоқсанда Алматыда жазықсыз атылып, 1988 жылы толық ақталды.',
      en: 'Akhmet Baitursynov was a seminal polymath, educator, poet, and statesman venerated across Kazakhstan as the "Teacher of the Nation". He modernized and reformed the Arabic alphabet to perfectly fit the phonetic harmony of the Kazakh language, introducing "Tote Jazu" (Reformed Script), which ignited mass literacy across the steppe.\n\nIn 1909 he published "Forty Fables" in Saint Petersburg, followed in 1911 by "The Mosquito" in Orenburg, urging the Kazakh people to awaken from slumber through education and civic responsibility. As editor-in-chief of the newspaper "Qazaq" (1913–1918), he forged modern socio-political discourse across Central Asia.\n\nIn 1917 he helped establish the Alash Party and served on the Alash Orda People\'s Council, overseeing educational modernization. From 1920 to 1921 he served as the first People\'s Commissar of Education of the Kazakh Soviet Republic, authoring foundational grammar and literary theory texts including "Til-Qural" and "Adebiyet Tanytqysh". He was executed during the Stalinist repressions in Almaty in December 1937 and fully rehabilitated in 1988.',
    },
    education: {
      kz: 'Ы. Алтынсарин ашқан Торғайдағы екі кластық орыс-қазақ училищесі (1891); Орынбордағы мұғалімдер мектебі (1895)',
      en: 'Two-class Russo-Kazakh school founded by Y. Altynsarin in Torgay (1891); Orenburg Teachers\' Seminary (1895)',
    },
    keyWorks: {
      kz: [
        '«Қырық мысал» (1909)',
        '«Маса» (1911)',
        '«Оқу құралы» (1912)',
        '«Тіл – құрал» (1914–1916)',
        '«Әдебиет танытқыш» (1926)',
        '«Баяншы» (1920)',
      ],
      en: [
        'Forty Fables (1909)',
        'The Mosquito (1911)',
        'Reading Primer (1912)',
        'Language Manual: Phonetics, Morphology, Syntax (1914–1916)',
        'Theory of Literature (1926)',
        'The Storyteller (1920)',
      ],
    },
    quote: {
      kz: 'Басқадан кем болмас үшін біз білімді, бай һәм күшті болуымыз керек. Білімді болуға — оқу керек. Бай болуға — кәсіп керек. Күшті болуға — бірлік керек.',
      en: 'To not be inferior to others, we must be educated, wealthy, and strong. To be educated, we must study; to be wealthy, master professions; to be strong, unite.',
      citation: '«Қазақ» газеті, 1913 ж.',
    },
    milestones: [
      {
        year: 1912,
        event: {
          kz: 'Қазақ тілінің үндестік заңына негізделген «Төте жазу» әліпбиін жасап, «Оқу құралын» бастырды.',
          en: 'Invented "Tote Jazu" (reformed Kazakh alphabet) and published the primary reader "Oqu quraly".',
        },
      },
      {
        year: 1913,
        event: {
          kz: 'Орынборда ұлттық қоғамдық-саяси ойдың мінберіне айналған «Қазақ» газетін құрып, басқарды.',
          en: 'Founded and edited "Qazaq" newspaper in Orenburg, unifying national thought.',
        },
      },
      {
        year: 1920,
        event: {
          kz: 'Қазақ АКСР-нің тұңғыш Халық ағарту комиссары болып тағайындалды.',
          en: 'Appointed the first People\'s Commissar of Education of the Kazakh Autonomous Republic.',
        },
      },
    ],
    photoUrl: '/images/portraits/baitursynov.jpeg',
    isCore: true,
  },
  {
    id: 'dulatov',
    name: {
      kz: 'Міржақып Дулатұлы',
      en: 'Mirzhakyp Dulatov',
    },
    lifeYears: '1885–1935',
    role: 'writer',
    roleTitle: {
      kz: 'Ақын, жазушы, публицист, ағартушы, тұңғыш қазақ романының авторы',
      en: 'Poet, Novelist, Publicist, Author of the First Kazakh Realistic Novel',
    },
    shortBio: {
      kz: '«Оян, қазақ!» жалынды үндеуі мен «Бақытсыз Жамал» романының авторы, «Қазақ» газетінің жетекшісі, Алаш қозғалысының көшбасшысы.',
      en: 'Author of the historic awakening anthology "Oyan, Qazaq!" and landmark novel "Unhappy Jamal", co-editor of "Qazaq", and Alash leader.',
    },
    fullBio: {
      kz: 'Міржақып Дулатұлы — қазақ халқының сана-сезімін дүр сілкіндірген жалынды ақын, жазушы және қоғам қайраткері. 1909 жылы Уфа қаласында жарық көрген «Оян, қазақ!» өлеңдер жинағы бүкіл қазақ даласын ұйқыдан оятып, ұлттық азаттық қозғалыстың ұранына айналды. Кітап патша цензурасымен тәркіленіп, авторы тұтқындалды.\n\n1910 жылы Қазан қаласында қазақ әдебиетінің тарихындағы тұңғыш көркем роман саналатын «Бақытсыз Жамал» романын бастырып, әйел теңдігі мен әлеуметтік әділеттілік мәселесін биік деңгейге көтерді. 1913–1918 жылдары Орынборда «Қазақ» газетінің жауапты хатшысы қызметін атқарып, «Мадияр» деген бүркеншік есіммен халықты ағартушылыққа шақыратын жүздеген мақала жазды.\n\n1917 жылы желтоқсанда Алашорда үкіметінің мүшесі болып сайланып, автономияның рухани және саяси ұйымдасуына үлес қосты. Кеңестік кезеңде қазақ мектептері үшін алғашқы арифметика оқулығын («Есеп құралы») әзірледі. 1928 жылы саяси айыппен тұтқындалып, 1935 жылы Ақ теңіз – Балтық каналындағы Сосновец лагерінде қаза тапты. 1988 жылы ақталып, сүйегі 1992 жылы туған жері Торғайға әкелініп қайта жерленді.',
      en: 'Mirzhakyp Dulatov was an impassioned poet, groundbreaking novelist, and fearless publicist who awakened the collective conscience of 20th-century Kazakhstan. In 1909, his poetry anthology "Oyan, Qazaq!" (Awaken, Kazakh!) was published in Ufa, challenging imperial subjection and urging the nation toward dignity and modern learning. The book was confiscated by tsarist authorities and Dulatov was imprisoned.\n\nIn 1910 in Kazan, he published "Baqytsyz Jamal" (Unhappy Jamal), universally celebrated as the first modern realistic psychological novel in Kazakh literature, defending women\'s rights and individual freedom. As executive secretary and columnist for "Qazaq" under the pen name "Madiyar" (1913–1918), he galvanized civic mobilization.\n\nElected to the Alash Orda Council in December 1917, he championed educational reform and compiled foundational math textbooks ("Esep quraly"). Arrested by Soviet secret police in 1928, he perished in 1935 at the Solovki/White Sea Gulag camp. Rehabilitated in 1988, his remains were ceremoniously repatriated to his ancestral home in Torgay in 1992.',
    },
    education: {
      kz: 'Ауыл мектебі; Торғайдағы екі кластық орыс-қазақ училищесі (1902)',
      en: 'Village school; Two-class Russo-Kazakh School in Torgay (1902)',
    },
    keyWorks: {
      kz: [
        '«Оян, қазақ!» (1909)',
        '«Бақытсыз Жамал» (1910)',
        '«Азамат» (1913)',
        '«Терме» (1915)',
        '«Есеп құралы» (1914)',
        '«Балқия» пьесасы (1922)',
      ],
      en: [
        'Awaken, Kazakh! (1909)',
        'Unhappy Jamal (1910)',
        'The Citizen (1913)',
        'Terme (1915)',
        'Arithmetic Manual (1914)',
        'Play "Balkiya" (1922)',
      ],
    },
    quote: {
      kz: 'Көзіңді аш, оян, қазақ, көтер басты, / Өткізбей қараңғыда бекер жасты. / Жер кетті, дін нашарлап, хал һәлак боп, / Қазағым, енді жату жарамас-ты.',
      en: 'Open your eyes, awaken, Kazakh, raise your head! Do not spend your youth in vain darkness. Land is lost, religion weakens, people perish; my Kazakhs, lying down any longer is intolerable!',
      citation: '«Оян, қазақ!» жинағы, Уфа, 1909 ж.',
    },
    milestones: [
      {
        year: 1909,
        event: {
          kz: 'Уфа қаласында ұлттық сананы дүр сілкіндірген «Оян, қазақ!» өлеңдер жинағын бастырды.',
          en: 'Published "Oyan, Qazaq!", which sparked the modern national consciousness movement.',
        },
      },
      {
        year: 1910,
        event: {
          kz: 'Қазақ әдебиетіндегі тұңғыш көркем роман «Бақытсыз Жамалды» жарыққа шығарды.',
          en: 'Published "Baqytsyz Jamal", pioneering realistic fiction in Kazakh literature.',
        },
      },
      {
        year: 1917,
        event: {
          kz: 'Екінші жалпықазақ съезінде Алашорда Ұлттық кеңесінің мүшесі болып сайланды.',
          en: 'Elected member of the Alash Orda People\'s Council at the Second All-Kazakh Congress.',
        },
      },
    ],
    photoUrl: '/images/portraits/dulatov.jpg',
    isCore: true,
  },
  {
    id: 'tynyshbaev',
    name: {
      kz: 'Мұхамеджан Тынышбаев',
      en: 'Mukhamedzhan Tynyshbaev',
    },
    lifeYears: '1879–1938',
    role: 'scholar',
    roleTitle: {
      kz: 'Тұңғыш қазақ теміржол инженері, тарихшы-ғалым, Түркістан автономиясының премьер-министрі',
      en: 'First Kazakh Railway Engineer, Historian, Prime Minister of Turkestan Autonomy',
    },
    shortBio: {
      kz: 'Тұңғыш қазақ теміржол инженері, ІІ Мемлекеттік Дума депутаты, Түркістан автономиясы мен Алашорда үкіметінің мүшесі, Түрксіб жетекшісі.',
      en: 'First Kazakh railway engineer, 2nd State Duma deputy, head of Turkestan Autonomy and Alash Orda councilor, lead builder of the Turksib railway.',
    },
    fullBio: {
      kz: 'Мұхамеджан Тынышбаев — қазақтан шыққан тұңғыш теміржол инженері, аса көрнекті тарихшы ғалым және мемлекет қайраткері. Верный ерлер гимназиясын алтын медальмен, Санкт-Петербургтегі Императорлық І Александр атындағы Жол қатынастары инженерлері институтын үздік бітірген.\n\n1907 жылы Жетісу облысынан ІІ Мемлекеттік Думаға депутат болып сайланып, патша үкіметінің қоныс аудару саясаты мен жер тартып алу озбырлығын батыл әшкереледі. 1917 жылғы қарашада Қоқан қаласында Түркістан (Қоқан) автономиясы жарияланғанда, оның тұңғыш премьер-министрі болып сайланды. Сол жылғы желтоқсанда Екінші жалпықазақ съезінде Алашорда үкіметінің мүшесі болып бекітілді.\n\n1920 жылдары қазақ халқының шежіресі мен тарихына арналған «Материалы к истории киргиз-казакского народа» атты сүбелі ғылыми еңбегін жазды. 1927–1930 жылдары ғасыр құрылысы атанған Түркістан-Сібір (Түрксіб) теміржолының жобасын жасап, құрылысын жүргізген бас маман болды. 1938 жылы Ташкентте саяси қуғын-сүргін құрбаны болып атылды. 1959 жылы ақталды.',
      en: 'Mukhamedzhan Tynyshbaev was the first ethnic Kazakh railway civil engineer, a distinguished academic historian, and an influential statesman. Graduating with highest honors from the Emperor Alexander I Institute of Railway Engineers in Saint Petersburg, he proved that high technical competence could directly serve indigenous sovereignty.\n\nElected to the Second State Duma of the Russian Empire in 1907 representing Semirechye, he fearlessly condemned the dispossession of Kazakh pastoralists. In November 1917, he was chosen as the inaugural Prime Minister of the Provisional Government of Autonomous Turkestan in Kokand, later also serving as an Alash Orda Council member.\n\nIn 1925, he published the seminal study "Materials on the History of the Kirghiz-Kazakh People". From 1927 to 1930, he served as lead surveyor and construction engineer for the monumental Turkestan-Siberian (Turksib) railway line. Arrested under trumped-up charges of nationalism, he was executed in Tashkent in 1938 and officially rehabilitated in 1959.',
    },
    education: {
      kz: 'Верный ерлер гимназиясы (алтын медаль, 1900); Санкт-Петербург Императорлық І Александр атындағы Жол қатынастары инженерлері институты (1906)',
      en: 'Verny Gymnasium for Men (gold medal, 1900); Emperor Alexander I Institute of Railway Engineers, Saint Petersburg (1906)',
    },
    keyWorks: {
      kz: [
        '«Материалы к истории киргиз-казакского народа» (1925)',
        'Түрксіб теміржолының инженерлік-жобалау құжаттары (1927–1930)',
        'Жетісу теміржолының жобалық құжаттамасы',
        'Қазақ ру-тайпаларының тарихы мен шежіресі',
      ],
      en: [
        'Materials on the History of the Kirghiz-Kazakh People (1925)',
        'Engineering Survey and Blueprint of Turksib Railway (1927–1930)',
        'Semirechye Railway Infrastructure Projects',
        'Genealogical and Historical Studies of Kazakh Clans',
      ],
    },
    quote: {
      kz: 'Тарихын білмеген халықтың болашағы бұлыңғыр; біз ата-бабамыздың ұлы жолын заманауи білім мен техника арқылы жалғастыруға тиіспіз.',
      en: 'A people ignorant of its history has an obscure future; we are bound to continue our ancestors\' legacy through modern education and engineering.',
      citation: '«Материалы к истории киргиз-казакского народа» алғысөзінен, 1925 ж.',
    },
    milestones: [
      {
        year: 1907,
        event: {
          kz: 'Жетісудан ІІ Мемлекеттік Думаға депутат болып сайланып, қазақ жер құқығын қорғады.',
          en: 'Elected deputy to the Second State Duma representing Semirechye and defended native land rights.',
        },
      },
      {
        year: 1917,
        event: {
          kz: 'Қоқанда Түркістан автономиясының тұңғыш үкімет төрағасы болып сайланды.',
          en: 'Elected first Prime Minister of Autonomous Turkestan in Kokand.',
        },
      },
      {
        year: 1927,
        event: {
          kz: 'Түркістан-Сібір (Түрксіб) теміржолының бас инженері ретінде құрылысты басқарды.',
          en: 'Served as chief surveyor and lead engineer building the monumental Turksib railway.',
        },
      },
    ],
    photoUrl: '/images/portraits/tynyshbaev.jpeg',
    isCore: true,
  },
  {
    id: 'kh_dosmukhamedov',
    name: {
      kz: 'Халел Досмұхамедұлы',
      en: 'Khalel Dosmukhamedov',
    },
    lifeYears: '1883–1939',
    role: 'scholar',
    roleTitle: {
      kz: 'Дәрігер, ғалым-энциклопедист, профессор, Батыс Алашорда жетекшісі',
      en: 'Physician, Polymath Scientist, Professor, Western Alash Orda Co-Leader',
    },
    shortBio: {
      kz: 'Әскери-медицина академиясының үздік түлегі, алғашқы қазақ медицина және биология оқулықтарының авторы, Батыс Алашорданың төрағасы.',
      en: 'Military Medical Academy graduate with honors, author of foundational Kazakh science textbooks, and co-leader of Western Alash Orda.',
    },
    fullBio: {
      kz: 'Халел Досмұхамедов — қазақтан шыққан тұңғыш кәсіби дәрігерлердің бірі, энциклопедист-ғалым, филолог, тарихшы және мемлекет қайраткері. Санкт-Петербургтегі Императорлық Әскери-медициналық академиясын үздік бітіріп, оба мен жұқпалы дерттерге қарсы ел ішіндегі алғашқы медициналық санитарлық жасақтарды ұйымдастырды.\n\n1917 жылы Орал облыстық қазақ съездерін ұйымдастыруға басшылық етті. Екінші жалпықазақ съезінде Алашорда үкіметінің мүшесі болып сайланып, орталығы Жымпитыда орналасқан Батыс Алашорданы (Ойыл уәлаятын) Жаһанша Досмұхамедовпен бірге басқарды. 1918 жылғы наурыз-мамыр айларында Мәскеуде Ленин және Сталинмен тікелей келіссөз жүргізіп, қазақ автономиясын мойындатуға күш салды.\n\nКеңес тұсында Ташкенттегі Қазақ халық ағарту институтының профессоры, Алматыда Қазақ мемлекеттік университетінің проректоры болды. Қазақ тіліндегі тұңғыш анатомия, зоология, физиология оқулықтарын жазып, ұлттық ғылыми терминологияны қалыптастырды. 1930 жылдары Воронежге жер аударылып, 1939 жылы Алматы түрмесінде көз жұмды. 1958 жылы толық ақталды.',
      en: 'Khalel Dosmukhamedov was a true Renaissance figure of the Alash generation. A graduate with honors of the Imperial Military Medical Academy in Saint Petersburg, he battled plagues and epidemic typhus in the steppes while founding Kazakh medical and biological science.\n\nIn 1917–1918, he co-founded and governed the Western Branch of Alash Orda (Oyyl Vilayet). In May 1918, he traveled to Moscow to negotiate with Lenin and Stalin for Soviet recognition of Kazakh autonomy.\n\nLater in Tashkent and Almaty, he authored the very first Kazakh university textbooks on human physiology and biology and served as Vice-Rector of the Kazakh State University. Exiled to Voronezh in the 1930s, he died in prison in Almaty in 1939 and was rehabilitated in 1958.',
    },
    education: {
      kz: 'Орал әскери реалдық училищесі (1902); Санкт-Петербург Императорлық Әскери-медициналық академиясы (алтын медальмен үздік, 1909)',
      en: 'Ural Military Realschule (1902); Imperial Military Medical Academy in Saint Petersburg (graduated with distinction and gold medal, 1909)',
    },
    keyWorks: {
      kz: [
        '«Адамның тән тірлігі» (адам физиологиясы, 1927)',
        '«Жануартану» (1922)',
        '«Табиғаттану» (1922)',
        '«Қазақ-қырғыз тіліндегі сингармонизм заңы» (1924)',
        '«Исатай – Махамбет» тарихи зерттеуі (1925)',
      ],
      en: [
        'Physiology of the Human Body (1927)',
        'Natural Science (1922)',
        'Zoology (1922)',
        'Law of Vowel Harmony in Kazakh-Kyrgyz (1924)',
        'Historical Monograph on Isatay and Makhambet (1925)',
      ],
    },
    quote: {
      kz: 'Ана тілін жақсы білмей тұрып, ұлт мәдениетін көтеру мүмкін емес. Өз тілін білмеген ел — өзгенің жетегінде кетеді.',
      en: 'Without knowing one\'s mother tongue thoroughly, elevating national culture is impossible. A nation that neglects its language falls under foreign subjugation.',
      citation: '«Қазақ-қырғыз тіліндегі сингармонизм заңы» зерттеуінен, 1924 ж.',
    },
    milestones: [
      {
        year: 1917,
        event: {
          kz: 'Орал қазақтарының съезін өткізіп, Батыс Алашорданың тең төрағасы болып сайланды.',
          en: 'Organized and presided over the Ural Kazakh Congress, co-leading Western Alash Orda.',
        },
      },
      {
        year: 1918,
        event: {
          kz: 'Мәскеуде В.И. Ленинмен және И.В. Сталинмен қазақ автономиясын тану бойынша келіссөз жүргізді.',
          en: 'Directly negotiated terms for Kazakh national autonomy in the Kremlin with Lenin and Stalin.',
        },
      },
      {
        year: 1922,
        event: {
          kz: 'Қазақ тіліндегі алғашқы төл медицина және жаратылыстану оқулықтарын жазып шығарды.',
          en: 'Authored foundational textbooks creating Kazakh scientific terminology for medicine and zoology.',
        },
      },
    ],
    photoUrl: '/images/portraits/kh_dosmukhamedov.jpg',
    isCore: true,
  },
  {
    id: 'zh_dosmukhamedov',
    name: {
      kz: 'Жаһанша Досмұхамедов',
      en: 'Zhahansha Dosmukhamedov',
    },
    lifeYears: '1887–1938',
    role: 'jurist',
    roleTitle: {
      kz: 'Заңгер-құқықтанушы, саяси қайраткер, Батыс Алашорда үкіметінің төрағасы',
      en: 'Jurist, Political Statesman, Chairman of the Western Branch of Alash Orda',
    },
    shortBio: {
      kz: 'Мәскеу университетінің түлегі, білікті заңгер, Бүкілресейлік мұсылман съезінің төрағасы, Батыс Алашорда үкіметінің басшысы.',
      en: 'Moscow University law graduate, assistant prosecutor, chairman of the All-Russian Muslim Congress, and head of Western Alash Orda.',
    },
    fullBio: {
      kz: 'Жаһанша Досмұхамедов — қазақтан шыққан білікті заңгер, Ресей империясы кезінде Томск округтік соты прокурорының орынбасары қызметін атқарған сирек қазақ азаматы. Мәскеу Императорлық университетінің заң факультетін үздік бітірген.\n\n1917 жылғы мамырда Мәскеуде өткен Бүкілресейлік мұсылман съезіне төрағалық етіп, ұлттар теңдігі мен федеративтік мемлекет құрылымы туралы талаптарды ұсынды. Сол жылғы желтоқсанда Екінші жалпықазақ съезінде Алашорда үкіметінің мүшесі болып сайланып, орталығы Жымпитыда орналасқан Батыс Алашорданы басқарды.\n\nАзамат соғысы жағдайында қазақ атты әскер полктерін құрып, ел ішіндегі бейбітшілікті сақтап қалды. 1918 жылы наурызда Мәскеуде В.И. Ленинмен және И.В. Сталинмен қазақ ұлттық автономиясын құру туралы келіссөз жүргізді. Кеңестік кезеңде Мәскеуде ғылыми-аудармалық жұмыстармен айналысты. 1938 жылы Мәскеуде Бутово полигонында атылды. 1958 жылы толық ақталды.',
      en: 'Zhahansha Dosmukhamedov was an exceptionally erudite jurist who graduated from Moscow Imperial University and served as assistant prosecutor of the Tomsk District Court.\n\nIn May 1917, he presided over the All-Russian Muslim Congress in Moscow representing millions of citizens. Later that year, he was elected to the Alash Orda government and became Chairman of its Western Branch centered in Zhympity.\n\nUnder harrowing civil war conditions, he mobilized disciplined Kazakh militia regiments to protect local populations against marauding White Cossacks and Red detachments. In March 1918, he led negotiations with Lenin and Stalin in Moscow. He was executed at Butovo, Moscow, in 1938 and rehabilitated in 1958.',
    },
    education: {
      kz: 'Орал әскери реалдық училищесі (1905); Мәскеу Императорлық университетінің заң факультеті (1910)',
      en: 'Ural Military Realschule (1905); Faculty of Law, Moscow Imperial University (1910)',
    },
    keyWorks: {
      kz: [
        'Алаш автономиясының жергілікті басқару және сот жарғылары (1918)',
        '«Қазақ», «Сарыарқа», «Ұран» басылымдарындағы саяси-құқықтық мақалалары',
        'Ресей заңнамасын қазақ тіліне аудару және құқықтық терминология сөздіктері',
      ],
      en: [
        'Constitutional and judicial charters of Western Alash Orda (1918)',
        'Legal treatises in "Qazaq", "Saryarqa", and "Uran"',
        'Legal codifications and terminology translations into Kazakh',
      ],
    },
    quote: {
      kz: 'Біздің мақсатымыз — елдің өзін-өзі билеуі, халықты қорғау және құқық теңдігі. Азаттық берілмейді, ол күреспен келеді.',
      en: 'Our goal is self-governance of our people, protection of the nation, and equality before the law. Liberty is never handed out; it must be won through resolute struggle.',
      citation: 'Орал қазақ съезіндегі сөзі, 1917 ж.',
    },
    milestones: [
      {
        year: 1917,
        event: {
          kz: 'Мәскеуде Бүкілресейлік мұсылман съезіне төрағалық етіп, ұлттық құқықтарды қорғады.',
          en: 'Chaired the All-Russian Muslim Congress in Moscow representing millions of citizens.',
        },
      },
      {
        year: 1918,
        event: {
          kz: 'Мәскеуде В.И. Ленинмен және И.В. Сталинмен қазақ автономиясын құру бойынша келіссөздер жүргізді.',
          en: 'Personally led negotiations with Lenin and Stalin in Moscow for Kazakh autonomous sovereignty.',
        },
      },
      {
        year: 1918,
        event: {
          kz: 'Жымпитыда Батыс Алашорда үкіметін басқарып, ұлттық қорғаныс полктерін жасақтады.',
          en: 'Led the Western Alash Orda government and defense forces from Zhympity.',
        },
      },
    ],
    photoUrl: '/images/portraits/zh_dosmukhamedov.jpeg',
    isCore: true,
  },
  {
    id: 'zhumabaev',
    name: {
      kz: 'Мағжан Бекенұлы Жұмабаев',
      en: 'Magzhan Zhumabaev',
    },
    lifeYears: '1893–1938',
    role: 'writer',
    roleTitle: {
      kz: 'Ұлы лирик ақын, қазақ педагогикасы мен психологиясының негізін салушы',
      en: 'Great Lyric Poet, Founder of Kazakh Pedagogy, Leader of "Alqa" Literary Society',
    },
    shortBio: {
      kz: 'Қазақ лирикасының жарық жұлдызы, романтизм шебері, «Мен жастарға сенемін» гимнінің авторы, ұлттық педагогиканың негізін қалаушы.',
      en: 'Master of Kazakh poetic romanticism, author of the national youth anthem "I Believe in Youth", and pioneer of modern pedagogical science.',
    },
    fullBio: {
      kz: 'Мағжан Жұмабаев — қазақ поэзиясының жарық жұлдызы, романтизм бағытының асқан шебері, ағартушы. Ол 1912 жылы Қазан қаласында «Шолпан» атты тұңғыш өлеңдер жинағын шығарып, әдеби қауымды тәнті етті.\n\n1917 жылы Омбыда Алаш партиясының Ақмола облыстық комитетін құруға қатысып, Алашорданың рухани-мәдени бағдарламасын белсенді жүзеге асырды. Оның «Мен жастарға сенемін» өлеңі ұлттық рухтың әнұранына айналды. «Түркістан», «Батыр Баян», «Қорқыт» сияқты поэмалары ұлттық мақтаныш пен азаттық сезімін асқақтатты.\n\n1922 жылы жазған «Педагогика» оқулығы — ұлттық мектептің бала тәрбиесі мен психологиясына арналған алғашқы фундаменталды ғылыми еңбегі саналады. Ташкентте «Алқа» әдеби бірлестігін құрып, ұлттық әдебиеттің дербестігін қорғады. 1938 жылғы 19 наурызда Алматыда атылды. 1960 және 1988 жылдары ақталды.',
      en: 'Magzhan Zhumabaev was the quintessential romantic poet of the Kazakh Renaissance and a foundational educational theorist. Active in the Akmola branch of the Alash party in 1917, his fiery verse awakened pride and patriotic devotion across generations.\n\nIn 1912, he published his acclaimed debut poetry collection "Sholpan" in Kazan. His iconic poems "I Believe in the Youth", "Turkistan", and epic "Batyr Bayan" defined the artistic zenith of the national awakening era.\n\nHis 1922 treatise "Pedagogy" established child-centered psychology and native-language education as the cornerstones of societal renewal. In Tashkent, he formed the "Alqa" writers\' collective. He was executed in Almaty during the Great Terror on March 19, 1938, and fully rehabilitated in 1960 and 1988.',
    },
    education: {
      kz: 'Уфадағы «Ғалия» медресесі; Омбы мұғалімдер семинариясы (алтын медаль, 1917); Мәскеудегі В. Брюсов атындағы Жоғары әдебиет-көркемөнер институты (1927)',
      en: 'Madrasah Galia in Ufa; Omsk Teachers\' Seminary (gold medal, 1917); Bryusov Higher Literary Institute in Moscow (1927)',
    },
    keyWorks: {
      kz: [
        '«Шолпан» (1912)',
        '«Педагогика» (1922)',
        '«Батыр Баян» (1923)',
        '«Мен жастарға сенемін» (1919)',
        '«Түркістан» (1918)',
        '«Қорқыт» (1923)',
      ],
      en: [
        'Sholpan (1912)',
        'Pedagogy (1922)',
        'Batyr Bayan (1923)',
        'I Believe in the Youth (1919)',
        'Turkistan (1918)',
        'Qorqyt (1923)',
      ],
    },
    quote: {
      kz: 'Арыстандай айбатты, / Жолбарыстай қайратты... / Мен жастарға сенемін!',
      en: 'Majestic as lions, vigorous as tigers... I believe in the youth!',
      citation: '«Мен жастарға сенемін» өлеңі, 1919 ж.',
    },
    milestones: [
      {
        year: 1912,
        event: {
          kz: 'Қазанда тұңғыш «Шолпан» өлеңдер жинағын бастырып, әдеби жаңалық ашты.',
          en: 'Published his celebrated debut anthology "Sholpan" in Kazan.',
        },
      },
      {
        year: 1917,
        event: {
          kz: 'Омбыда Алаш партиясының Ақмола облыстық комитетін құруға белсене қатысты.',
          en: 'Co-founded the Akmola Regional Alash Committee in Omsk.',
        },
      },
      {
        year: 1922,
        event: {
          kz: 'Қазақ тіліндегі тұңғыш ғылыми «Педагогика» оқулығын бастырып шығарды.',
          en: 'Published "Pedagogy", the first modern scientific treatise on child education in Kazakh.',
        },
      },
    ],
    photoUrl: '/images/portraits/zhumabaev.jpg',
    isCore: true,
  },
  {
    id: 'toraighyrov',
    name: {
      kz: 'Сұлтанмахмұт Торайғыров',
      en: 'Sultanmakhmut Toraighyrov',
    },
    lifeYears: '1893–1920',
    role: 'writer',
    roleTitle: {
      kz: 'Ақын-демократ, ойшыл, «Айқап» журналының жауапты қызметкері, «Алаш гимнінің» авторы',
      en: 'Democratic Poet, Philosopher, Assistant Editor of "Aiqap", Bard of Alash Orda',
    },
    shortBio: {
      kz: 'Ақын-демократ, ойшыл, «Айқап» журналының қызметкері, «Алаш гимнінің» авторы, әлеуметтік теңдік пен білімнің жалынды жыршысы.',
      en: 'Democratic poet, philosopher, assistant editor of "Aiqap", author of the "Hymn of Alash", and champion of social justice.',
    },
    fullBio: {
      kz: 'Сұлтанмахмұт Торайғыров — қазақ руханиятының көгінде құйрықты жұлдыздай жарқыраған дарын иесі. Бар-жоғы 26 жыл ғұмыр кешсе де, ұлттық әдебиет пен қоғамдық ойға өшпес мол мұра қалдырды.\n\n1913–1914 жылдары Троицкіде «Айқап» журналының жауапты хатшысы болып, ағартушылық идеяларды белсенді насихаттады. 1914 жылы «Қамар сұлу» романын, 1915 жылы «Кім жазықты?» романын жазып, әйел теңдігі мен әлеуметтік қайшылықтарды терең талдады.\n\n1917 жылы желтоқсанда Алаш автономиясы жарияланғанда «Алаш гимнін» жазып, Алашорда үкіметінің Семейдегі жұмысына бар күш-жігерімен қолдау көрсетті. Өкпе ауруынан 1920 жылы туған жері Баянауылда ерте көз жұмды.',
      en: 'Sultanmakhmut Toraighyrov was one of the brightest philosophical minds and democratic poets in Kazakh history, despite living only 26 years. As assistant editor of "Aiqap" in Troitsk (1913–1914), he fought for social justice and female enlightenment.\n\nIn 1914 he finished "Qamar Sulu" and in 1915 "Who Is to Blame?", pioneering realistic social critique. In December 1917, greeted with euphoria by the creation of Alash Autonomy, he composed the soaring "Hymn of Alash" and aided Alash Orda officials in Semipalatinsk until his tragic death from tuberculosis in 1920.',
    },
    education: {
      kz: 'Троицкідегі орыс-қазақ мектебі; өз бетінше білім алған кемеңгер ойшыл',
      en: 'Russo-Kazakh school in Troitsk; largely self-taught intellectual and philosopher',
    },
    keyWorks: {
      kz: [
        '«Қамар сұлу» романы (1914)',
        '«Кім жазықты?» романы (1915)',
        '«Шәкірт ойы» (1913)',
        '«Алаш гимні» (1917)',
        '«Адасқан өмір» поэмасы',
        '«Сарыарқаның жайын айтқанда»',
      ],
      en: [
        'Novel "Qamar Sulu" (1914)',
        'Novel "Who Is to Blame?" (1915)',
        'Student\'s Thoughts (1913)',
        'Hymn of Alash (1917)',
        'Poem "Stray Life"',
        'Reflections on Saryarqa',
      ],
    },
    quote: {
      kz: 'Қараңғы қазақ көгіне, / Өрмелеп шығып, күн болам! / Қараңғылықтың кегіне, / Күн болмағанда, кім болам?',
      en: 'Into the dark Kazakh sky, / I shall climb and become the sun! / To avenge this darkness, / If I become not the sun, then who will I be?',
      citation: '«Шәкірт ойы» өлеңі, 1913 ж.',
    },
    milestones: [
      {
        year: 1913,
        event: {
          kz: '«Айқап» журналының редакциясында қызмет етіп, «Шәкірт ойы» атты бағдарламалық өлеңін жазды.',
          en: 'Published "Student\'s Thoughts", framing the generational mission of the Kazakh intelligentsia.',
        },
      },
      {
        year: 1914,
        event: {
          kz: 'Қазақ прозасының інжу-маржаны «Қамар сұлу» романын жазып аяқтады.',
          en: 'Completed the landmark novel "Qamar Sulu" defending women\'s rights.',
        },
      },
      {
        year: 1917,
        event: {
          kz: 'Алаш автономиясының жариялануы құрметіне асқақ «Алаш гимнін» шығарды.',
          en: 'Penned the celebrated anthem "Alash Hurrah" upon the proclamation of Alash Autonomy.',
        },
      },
    ],
    photoUrl: '/images/portraits/toraighyrov.jpeg',
    isCore: true,
  },

  // ==========================================
  // EXTENDED FIGURES (8)
  // ==========================================
  {
    id: 'ermekov',
    name: {
      kz: 'Әлімхан Әбеуұлы Ермеков',
      en: 'Alimkhan Ermekov',
    },
    lifeYears: '1891–1970',
    role: 'scholar',
    roleTitle: {
      kz: 'Тұңғыш қазақ математика профессоры, шекара дипломаты, Алашорда үкіметінің мүшесі',
      en: 'First Kazakh Professor of Mathematics, Border Diplomat, Youngest Alash Orda Councilor',
    },
    shortBio: {
      kz: 'Алашорданың ең жас мүшесі, 1920 жылы Мәскеуде Қазақстанның қазіргі мемлекеттік шекарасын дәлелдеп қорғаған қайраткер, математика профессоры.',
      en: 'Youngest Alash Orda councilor, border diplomat who successfully secured Kazakhstan\'s national frontiers in 1920, and first mathematics professor.',
    },
    fullBio: {
      kz: 'Әлімхан Ермеков — 26 жасында Екінші жалпықазақ съезінде Алашорда үкіметінің мүшесі болып сайланған дарынды математик және саясаткер. Семей ерлер гимназиясын алтын медальмен, Томск технологиялық институтын тау-кен инженері мамандығы бойынша бітірген.\n\nОның тарихтағы теңдессіз ерлігі — 1920 жылы мамырда Мәскеуде Ленин мен кеңес басшылығының алдында Қазақ автономиясының шекарасы туралы баяндама жасап, Каспий жағалауын, Атырау, Маңғыстау, Ақмола мен Семей өңірлерін Қазақстан құрамында қалдыруды ғылыми-картографиялық тұрғыда дәлелдеп шығуы. Осылайша қазіргі Қазақстанның мемлекеттік шекарасының негізін бекітті.\n\nКейін Қазақ тау-кен металлургия институтында математика кафедрасын басқарып, тұңғыш қазақша «Ұлы математика курсын» жазды. Сталиндік лагерьлерде 18 жыл отырып, аман оралды. 1955 жылы ақталды.',
      en: 'Alimkhan Ermekov was elected to the Alash Orda government at the age of 26. In May 1920, representing the Kazakh leadership in Moscow, he defended the geographical boundaries of the emergent Kazakh Republic before Lenin and Soviet officials, successfully proving with historical, geological, and demographic evidence that the Caspian coastline, Atyrau oil basins, Mangystau, and northern oblasts belonged to Kazakhstan.\n\nLater, he became the first ethnic Kazakh professor of higher mathematics and authored its first native textbook ("Course of Higher Mathematics", 1935). Despite enduring 18 years in Soviet labor camps, he lived to see his work bear fruit, receiving rehabilitation in 1955.',
    },
    education: {
      kz: 'Семей ерлер гимназиясы (алтын медаль, 1912); Томск технологиялық институтының тау-кен факультеті (1923)',
      en: 'Semipalatinsk Men\'s Gymnasium (gold medal, 1912); Tomsk Technological Institute (mining engineer, 1923)',
    },
    keyWorks: {
      kz: [
        '«Ұлы математика курсы» (тұңғыш қазақша жоғары математика оқулығы, 1935)',
        '«О положении Казахского края» (Мәскеу, 1920)',
        'Қазақша математика терминологиясының сөздіктері',
      ],
      en: [
        'Course of Higher Mathematics (first university calculus manual in Kazakh, 1935)',
        'Diplomatic report "On the Status and Borders of the Kazakh Krai" (Moscow, 1920)',
        'Glossaries of Kazakh mathematical terminology',
      ],
    },
    quote: {
      kz: 'Біз шекарамыздың әрбір сүйем жерін қорғауға тиіспіз, себебі бұл жер — келешек ұрпақтың мәңгілік отаны.',
      en: 'We must defend every inch of our borders, because this land is the eternal homeland of future generations.',
      citation: 'Мәскеудегі В.И. Ленин алдындағы шекара туралы баяндамасы, 1920 ж.',
    },
    milestones: [
      {
        year: 1917,
        event: {
          kz: 'Екінші жалпықазақ съезінде 26 жасында Алашорда Ұлттық кеңесінің мүшесі болып сайланды.',
          en: 'Elected member of the Alash Orda People\'s Council in Orenburg at age 26.',
        },
      },
      {
        year: 1920,
        event: {
          kz: 'Мәскеуде Ленин алдында Қазақстанның қазіргі шекарасын ғылыми-тарихи тұрғыда қорғап қалды.',
          en: 'Delivered the historic diplomatic border defense presentation to Lenin in Moscow.',
        },
      },
      {
        year: 1935,
        event: {
          kz: 'Қазақ тіліндегі тұңғыш «Ұлы математика курсы» атты университеттік оқулықты жариялады.',
          en: 'Published the foundational university textbook "Higher Mathematics" in the Kazakh language.',
        },
      },
    ],
    photoUrl: '/images/portraits/ermekov.jpg',
    isCore: false,
  },
  {
    id: 'marsekov',
    name: {
      kz: 'Райымжан Мәрсекұлы Мәрсеков',
      en: 'Raiymzhan Marsekov',
    },
    lifeYears: '1877–1937',
    role: 'jurist',
    roleTitle: {
      kz: 'Кәсіби адвокат, құқықтанушы-заңгер, публицист, Алаш қайраткері',
      en: 'Certified Attorney, Jurist, Publicist, Chairman of Semipalatinsk Kazakh Committee',
    },
    shortBio: {
      kz: 'Санкт-Петербург университетін бітірген тұңғыш кәсіби қазақ адвокаттарының бірі, Семей облыстық қазақ комитетінің төрағасы, өткір публицист.',
      en: 'Saint Petersburg University law graduate, early certified advocate, head of Semipalatinsk Kazakh Committee, and influential political essayist.',
    },
    fullBio: {
      kz: 'Райымжан Мәрсеков — қазақтан шыққан алғашқы кәсіби білікті заңгер-адвокаттардың бірі, ұлт зиялысы, публицист. Омбы классикалық ерлер гимназиясын жақсы бітіріп, 1902 жылы Санкт-Петербург Императорлық университетінің заң факультетін сәтті тәмамдаған.\n\n1902–1912 жылдары Семей округтік сотында, кейін Омбы сот палатасында адвокат болып қызмет істеп, қазақ шаруаларының жер дауларын, әділетсіздікке ұшыраған құқықтарын ақысыз қорғады. Орыс географиялық қоғамының Семей бөлімшесіне белсене қатысты. «Дала уәлаятының газеті», «Айқап», «Қазақ», «Сарыарқа» газеттерінде жер, сот және басқару жүйесін қозғаған өткір мақалалар жариялады. Оның «Қазақ қайда бара жатыр?», «Қазақ қайтсе жерге ие болады?» еңбектері ұлттық ой-санаға зор ықпал етті.\n\n1917 жылы Ақпан төңкерісінен кейін Семей облыстық қазақ комитетінің төрағасы және Семей земство басқармасының басшысы болып сайланды. Семей өңірінде Алаш полктерін жасақтауға атсалысты. Кеңес билігі орнаған соң 1922 жылы Қытайға өтуге мәжбүр болып, 1937 жылы шетелде қайтыс болды.',
      en: 'Raiymzhan Marsekov was one of the earliest certified Kazakh attorneys-at-law, a pioneering legal scholar, and an incisive publicist of the Alash movement. After completing Omsk Classical Gymnasium, he graduated in law from Saint Petersburg Imperial University in 1902.\n\nBetween 1902 and 1912, he practiced law in Semipalatinsk and Omsk, defending dispossessed Kazakh villagers in land expropriation cases pro bono. In "Aiqap", "Qazaq", and "Saryarqa", he published pivotal socio-legal essays such as "Where Is the Kazakh Nation Heading?" and "How Can Kazakhs Retain Their Land?".\n\nIn 1917, he was elected Chairman of the Semipalatinsk Regional Kazakh Committee and led the Semipalatinsk Zemstvo, actively mobilizing regional Alash cavalry defense units. Forced to flee across the border to China in 1922 due to Bolshevik political persecution, he perished in 1937.',
    },
    education: {
      kz: 'Омбы ерлер классикалық гимназиясы (1897); Санкт-Петербург Императорлық университетінің заң факультеті (1902)',
      en: 'Omsk Classical Gymnasium (1897); Faculty of Law, Saint Petersburg Imperial University (1902)',
    },
    keyWorks: {
      kz: [
        '«Қазақ қайда бара жатыр?» (1917)',
        '«Қазақ қайтсе жерге ие болады?» (1917)',
        'Семей земствосы мен қазақ соты туралы құқықтық еңбектері',
        '«Сарыарқа» және «Қазақ» газеттеріндегі публицистикасы',
      ],
      en: [
        'Where Is the Kazakh Nation Heading? (1917)',
        'How Can Kazakhs Retain Their Land? (1917)',
        'Legal treatises on Semipalatinsk Zemstvo administration',
        'Essays in "Saryarqa" and "Qazaq" newspapers',
      ],
    },
    quote: {
      kz: 'Елдің ең басты байлығы — жері мен еркіндігі; осы екеуін қорғай алмаған жұрт тарих сахнасынан өшеді.',
      en: 'A nation\'s greatest treasures are its land and its freedom; a people unable to defend both will vanish from history.',
      citation: '«Сарыарқа» газеті, 1917 ж.',
    },
    milestones: [
      {
        year: 1902,
        event: {
          kz: 'Санкт-Петербург университетін заңгер мамандығымен бітіріп, сот қорғаушысы қызметін бастады.',
          en: 'Graduated in law from Saint Petersburg Imperial University and commenced legal advocacy.',
        },
      },
      {
        year: 1917,
        event: {
          kz: 'Семей облыстық қазақ комитетінің төрағасы болып сайланып, өңірлік съездерді ұйымдастырды.',
          en: 'Elected Chairman of the Semipalatinsk Kazakh Committee and led regional political congresses.',
        },
      },
      {
        year: 1918,
        event: {
          kz: 'Семей облыстық земство басқармасын басқарып, Алаш атты әскер полкін жасақтады.',
          en: 'Chaired the Semipalatinsk Zemstvo administration and helped muster the Alash cavalry regiment.',
        },
      },
    ],
    photoUrl: '/images/portraits/marsekov.jpeg',
    isCore: false,
  },
  {
    id: 'aqbaev',
    name: {
      kz: 'Жақып Ақбаев',
      en: 'Zhaqyp Aqbaev',
    },
    lifeYears: '1876–1934',
    role: 'jurist',
    roleTitle: {
      kz: 'Тұңғыш қазақ құқықтану магистрі, заңгер, Қарқаралы петициясының авторы',
      en: 'First Kazakh Master of Law, Jurist, Chief Drafter of Karkaraly Petition',
    },
    shortBio: {
      kz: 'Тұңғыш қазақ құқықтану магистрі, 1905 жылғы Қарқаралы петициясының заңдық негізін жасаушы, Алашорда үкіметінің құқық комиссары.',
      en: 'First Kazakh Master of Law, principal legal author of the 1905 Karkaraly Petition, and judicial commissioner in the Alash Orda government.',
    },
    fullBio: {
      kz: 'Жақып Ақбаев — қазақтан шыққан тұңғыш құқықтану магистрі, патшалық Ресей мен кеңестік жүйенің озбырлығына қарсы заң күшімен күрескен айбынды заңгер. Омбы классикалық гимназиясын алтын медальмен, Санкт-Петербург Императорлық университетінің заң факультетін І дәрежелі дипломмен тәмамдаған.\n\n1905 жылғы шілдеде Қоянды жәрмеңкесінде Қарқаралы петициясының заң талаптарын тұжырымдап, жергілікті халықтың азаматтық, діни және жер құқығын қорғады. Сол үшін Омбы, Семей соттарының қудалауына ұшырап, бірнеше мәрте түрмеге қамалды, Сібірге (Якутияға) жер аударылды.\n\n1917 жылы желтоқсанда Алашорда Ұлттық кеңесінің мүшесі болып сайланып, автономияның сот және заң шығару жүйесін құруға жетекшілік етті. 1920–1930 жылдары да саяси қуғын көріп, 1934 жылы Воронежде айдауда жүріп қайтыс болды. 1958 жылы ақталды.',
      en: 'Zhaqyp Aqbaev was the first Kazakh to receive a master\'s certification in jurisprudence from Saint Petersburg Imperial University. He devoted his brilliant legal training to fighting imperial land confiscations and colonial discrimination.\n\nIn 1905, he was the chief legal draftsman of the famous Karkaraly Petition at the Koyandy Fair. Subjected to repeated arrests and exiles to Eastern Siberia by Tsarist gendarmes, he persevered, and in December 1917, he was elected to the Alash Orda People\'s Council, formulating its legal and judicial code.\n\nEnduring relentless surveillance and arrests under Soviet rule, he died in political exile in Voronezh in 1934 and was officially rehabilitated in 1958.',
    },
    education: {
      kz: 'Омбы классикалық гимназиясы (алтын медаль, 1898); Санкт-Петербург Императорлық университетінің заң факультеті (І дәрежелі диплом, 1903)',
      en: 'Omsk Classical Gymnasium (gold medal, 1898); Faculty of Law, Saint Petersburg Imperial University (First Degree Diploma, 1903)',
    },
    keyWorks: {
      kz: [
        'Қарқаралы петициясының заңдық мәтіні (1905)',
        '«Қазақтардағы сот ісі және жер құқығы» ғылыми зерттеуі',
        '«Қазақ» газетіндегі заң және құқық туралы мақалалары',
      ],
      en: [
        'Juridical Text of the Karkaraly Petition (1905)',
        'Monograph "Judicial Practice and Land Rights of the Kazakhs"',
        'Legal commentaries in "Qazaq" newspaper',
      ],
    },
    quote: {
      kz: 'Заң мен құқық үстемдік құрмаған елде әділдік пен азаттық болмайды.',
      en: 'Where law and justice do not reign supreme, there can be neither fairness nor liberty.',
      citation: 'Қарқаралы петициясының заңдық негіздемесінен, 1905 ж.',
    },
    milestones: [
      {
        year: 1905,
        event: {
          kz: 'Қоянды жәрмеңкесінде Қарқаралы петициясының құқықтық талаптарын тұжырымдап жазды.',
          en: 'Authored the legal clauses of the Karkaraly Petition demanding the rule of law.',
        },
      },
      {
        year: 1908,
        event: {
          kz: 'Ұлт-азаттық талаптары үшін патша өкіметі тарапынан Сібірге жер аударылды.',
          en: 'Endured political imprisonment and Siberian exile for defending Kazakh rights.',
        },
      },
      {
        year: 1917,
        event: {
          kz: 'Екінші жалпықазақ съезінде Алашорда Ұлттық кеңесінің мүшесі болып сайланды.',
          en: 'Elected commissioner of judicial and constitutional development in Alash Orda.',
        },
      },
    ],
    photoUrl: '/images/portraits/aqbaev.jpg',
    isCore: false,
  },
  {
    id: 'zhamanmurynov',
    name: {
      kz: 'Тел Бұқпанұлы Жаманмұрынов',
      en: 'Tel Zhamanmurynov',
    },
    lifeYears: '1888–1938',
    role: 'leader',
    roleTitle: {
      kz: 'Қоғам қайраткері, Ырғыз қазақ комитетінің төрағасы, Алашорда мүшесі, агроном-ғалым',
      en: 'Public Statesman, Chairman of Irgiz Kazakh Committee, Alash Orda Member, Agronomist',
    },
    shortBio: {
      kz: 'Мәскеу ауыл шаруашылығы академиясында оқыған қайраткер, Ырғыз уездік қазақ комитетінің төрағасы, Қазақстанның алғашқы суландыру жүйесін салған тұлға.',
      en: 'Moscow Agricultural Academy educated statesman, head of Irgiz Kazakh Committee, and pioneer of sovereign agricultural irrigation in Kazakhstan.',
    },
    fullBio: {
      kz: 'Тел Жаманмұрынов — көрнекті Алаш қайраткері, қоғам және мемлекет қайраткері, Қазақстанда ауыл шаруашылығы мен суландыру ісін мемлекеттік деңгейде алғаш ұйымдастырушылардың бірі. Орынбор реалдық училищесін, кейін Мәскеудегі Петровско-Разумовский атындағы Ауыл шаруашылығы академиясын бітірген.\n\n1916 жылы майданның қара жұмысына алынған қазақ жастарына көмек беру мақсатында Батыс майданға (Минск) Әлихан Бөкейханов бастаған топпен бірге барып, жастарды қорғау үшін «Еркін дала» ұйымын құрды. 1917 жылы Бірінші жалпықазақ съезіне қатысып, Бүкілресейлік Құрылтай жиналысына депутат болып ұсынылды. Ырғыз уездік қазақ комитетінің төрағасы және Ырғыз жер басқармасының жетекшісі ретінде халық мүддесін қорғады.\n\n1921–1929 жылдары Қазақ АКСР Егін шаруашылығы халық комиссарының орынбасары болып, Қазақстанның тұңғыш Жер кодексін жасауға қатысты. Торғай мен Ырғыз бойында Албарбөгет, Ақши сияқты ірі суландыру жүйелерін салдырып, елді ашаршылықтан сақтап қалуға күш салды. 1938 жылы ақпанда атылды. 1958 жылы ақталды.',
      en: 'Tel Zhamanmurynov was a distinguished Alash statesman, public leader, and agricultural scientist who modernized water infrastructure across Kazakhstan. Educated at the Orenburg Realschule and the Petrovsky Agricultural Academy in Moscow, he mobilized engineering to protect rural Kazakh populations.\n\nIn 1916, during the tsarist conscription crisis, he accompanied Alikhan Bokeikhanov\'s Zemsoyz relief expedition to the Western Front in Minsk and co-created the youth organization "Erkin Dala". In 1917, he participated in the First All-Kazakh Congress and was nominated to the All-Russian Constituent Assembly, while presiding over the Irgiz District Kazakh Committee.\n\nFrom 1921 to 1929, he served as Deputy People\'s Commissar of Agriculture of the Kazakh ASSR, co-drafting the first national Land Code and supervising critical canal and dam networks (Albarboget, Aqshi). Persecuted during the Great Terror, he was executed in February 1938 and officially exonerated in 1958.',
    },
    education: {
      kz: 'Орынбор реалдық училищесі (1912); Мәскеудегі Петровско-Разумовский атындағы ауыл шаруашылығы академиясы (1913–1917)',
      en: 'Orenburg Realschule (1912); Petrovsky Agricultural Academy, Moscow (1913–1917)',
    },
    keyWorks: {
      kz: [
        'Қазақ АКСР-нің тұңғыш Жер кодексі жобасы (1924)',
        'Торғай мен Ырғыз өңіріндегі суландыру бөгеттері мен агрономиялық жобалары',
        '«Еркін дала» ұйымының бағдарламалық құжаттары мен үндеулері',
      ],
      en: [
        'Draft of the First Land Code of the Kazakh ASSR (1924)',
        'Engineering plans for irrigation dams in the Torgay and Irgiz river basins',
        'Programmatic resolutions of the "Erkin Dala" society',
      ],
    },
    quote: {
      kz: 'Жерді баптау — елді баптау. Топырағы суланбаған, шаруасы түзелмеген халықтың тәуелсіздігі баянды болмайды.',
      en: 'Tending to the land is tending to the nation. A people whose soil remains unwatered and whose agrarian life is broken cannot sustain independence.',
      citation: 'Жер мәселесі мен суландыру баяндамасынан, Орынбор, 1922 ж.',
    },
    milestones: [
      {
        year: 1916,
        event: {
          kz: 'Минскіде майдандағы қазақ жұмысшыларына көмек ұйымдастырып, «Еркін дала» қоғамын құрды.',
          en: 'Co-founded the "Erkin Dala" league to aid mobilized Kazakh rear workers in Minsk.',
        },
      },
      {
        year: 1917,
        event: {
          kz: 'Бірінші жалпықазақ съезінде Бүкілресейлік Құрылтай жиналысына депутаттыққа ұсынылды.',
          en: 'Nominated for the All-Russian Constituent Assembly at the First All-Kazakh Congress.',
        },
      },
      {
        year: 1921,
        event: {
          kz: 'Қазақ АКСР Егін шаруашылығы халық комиссарының орынбасары болып тағайындалды.',
          en: 'Appointed Deputy People\'s Commissar of Agriculture of the Kazakh ASSR.',
        },
      },
    ],
    photoUrl: '/images/portraits/zhamanmuryno.jpg',
    isCore: false,
  },
  {
    id: 'karataev',
    name: {
      kz: 'Бақытжан Бейсәліұлы Қаратаев',
      en: 'Bakhytzhan Karataev',
    },
    lifeYears: '1860–1934',
    role: 'jurist',
    roleTitle: {
      kz: 'Тұңғыш қазақ присяжный поверенныйы, ІІ Мемлекеттік Дума депутаты, заңгер',
      en: 'First Kazakh Certified Attorney-at-Law, Deputy to the 2nd State Duma, Champion of Land Rights',
    },
    shortBio: {
      kz: 'Қазақтан шыққан тұңғыш кәсіби адвокат, ІІ Мемлекеттік Дума мінберінен Столыпиннің қоныс аудару саясатын тайсалмай әшкерелеген қайраткер.',
      en: 'First Kazakh certified attorney-at-law who directly confronted Stolypin\'s land confiscations from the rostrum of the 2nd State Duma.',
    },
    fullBio: {
      kz: 'Бақытжан Қаратаев — қазақтан шыққан тұңғыш кәсіби сот қорғаушысы (присяжный поверенный), көрнекті заңгер және мемлекет қайраткері. Санкт-Петербург Императорлық университетінің заң факультетін 1890 жылы бітіргеннен кейін қарапайым қазақ шаруаларының жері мен құқығын патша соттарында ақысыз қорғады.\n\n1907 жылы Орал облысынан ІІ Мемлекеттік Думаға депутат болып сайланып, Дума мінберінен премьер-министр П. Столыпиннің қоныс аудару саясатын ашық әшкерелеп, қазақ жерлерін күшпен тартып алу халықты ашаршылық пен күйзеліске ұшырататынын тайсалмай айтты.\n\nОл «Айқап» журналы мен «Дала уәлаятының газеті» басылымдарына мақалалар жазып, ұлттық баспасөз бен ағартушылыққа үнемі демеушілік көрсетті. 1917 жылғы саяси өзгерістер кезінде де халық мүддесі жолындағы күресті тоқтатпады. 1934 жылы Ақтөбеде қайтыс болды.',
      en: 'Bakytzhan Karataev was the first Kazakh certified attorney-at-law. In 1907, as a deputy to the 2nd State Duma in Saint Petersburg, he delivered an electrifying speech directly confronting Prime Minister Pyotr Stolypin, exposing how imperial agrarian resettlement dispossessed indigenous nomads of vital water sources and pastures.\n\nThroughout his long legal career, he represented Kazakh communities in colonial courts pro bono and financially supported early publications such as "Aiqap". He passed away in Aktobe in 1934.',
    },
    education: {
      kz: 'Орынбор гимназиясы (1882); Санкт-Петербург Императорлық университетінің заң факультеті (1890)',
      en: 'Orenburg Gymnasium (1882); Faculty of Law of Saint Petersburg Imperial University (1890)',
    },
    keyWorks: {
      kz: [
        '1907 жылғы ІІ Мемлекеттік Дума мінберіндегі қазақ жері туралы тарихи сөздері',
        '«Айқап», «Дала уәлаятының газеті» басылымдарындағы құқықтық мақалалары',
        'Қазақ шаруаларын сотта қорғау жөніндегі заңдық шағымдары мен баяндамалары',
      ],
      en: [
        'Historic 1907 State Duma parliamentary speeches defending nomad ancestral pastureland',
        'Legal essays in "Aiqap" and "Dala Walayaty"',
        'Judicial defense petitions and legal appeals',
      ],
    },
    quote: {
      kz: 'Қазақтың жері — қазақтың ғасырлар бойы қаны төгіліп қорғалған ата мұрасы; оны тартып алу — ұлтты жоюмен тең.',
      en: 'Kazakh land is the ancestral legacy for which our fathers shed blood for centuries; taking it away is equivalent to annihilating the nation.',
      citation: 'ІІ Мемлекеттік Дума стенограммасынан, Санкт-Петербург, 1907 ж.',
    },
    milestones: [
      {
        year: 1890,
        event: {
          kz: 'Санкт-Петербург университетінің заң факультетін үздік бітіріп, тұңғыш қазақ адвокаты болды.',
          en: 'Graduated with distinction in law from Saint Petersburg Imperial University.',
        },
      },
      {
        year: 1907,
        event: {
          kz: 'ІІ Мемлекеттік Дума мінберінен қазақ жерін қорғап әйгілі сөз сөйледі.',
          en: 'Delivered his landmark parliamentary speech on Kazakh agrarian land preservation.',
        },
      },
      {
        year: 1911,
        event: {
          kz: '«Айқап» журналы мен қазақ ағартушылық мектептеріне белсенді қолдау көрсетті.',
          en: 'Actively supported the educational missions of "Aiqap" magazine.',
        },
      },
    ],
    photoUrl: '/images/portraits/karataev.jpg',
    isCore: false,
  },
  {
    id: 'torekulov',
    name: {
      kz: 'Нәзір Төреқұлұлы Төреқұлов',
      en: 'Nazir Torekulov',
    },
    lifeYears: '1892–1937',
    role: 'scholar',
    roleTitle: {
      kz: 'Дипломат-елші, филолог-ғалым, КСРО Орталық баспасы басқармасының төрағасы',
      en: 'Diplomat-Ambassador, Philologist-Scholar, Central Publishing House Chairman',
    },
    shortBio: {
      kz: 'Қазақтан шыққан тұңғыш кәсіби дипломат-елші (Сауд Арабиясындағы өкілетті өкіл), филолог-ғалым, Алаш қайраткерлерін Мәскеуде қолдаған мемлекет қайраткері.',
      en: 'First Kazakh professional diplomat-ambassador (to Saudi Arabia), philologist-scholar, and patron of Alash intellectuals in Moscow.',
    },
    fullBio: {
      kz: 'Нәзір Төреқұлов — қазақ халқының ХХ ғасыр басындағы аса көрнекті мемлекет қайраткері, тілші-ғалым, публицист және тұңғыш кәсіби дипломат-елші. Қоқан коммерциялық училищесін, Мәскеу коммерциялық институтының экономика факультетін бітірген. Араб, парсы, түрік, орыс және француз тілдерін жетік меңгерген.\n\n1916 жылы Минскіде қазақ жұмысшыларына көмек көрсету кезінде «Еркін дала» ұйымын құруға атсалысты. 1917 жылғы революциядан кейін Түркістан Республикасы Орталық Атқару Комитетінің төрағасы және Түркістан Оқу-ағарту халық комиссары қызметтерін атқарды. 1922–1928 жылдары Мәскеуде КСРО Халықтарының Орталық баспасын басқарып, Әлихан Бөкейханов, Ахмет Байтұрсынұлы, Мағжан Жұмабаев сияқты Алаш зиялыларын жұмыспен және баспанамен қамтамасыз етті.\n\n1928–1936 жылдары КСРО-ның Сауд Арабиясындағы бас елшісі болып, халықаралық дипломатиялық корпустың дуайеніне айналды. 1937 жылы Мәскеуге шақыртылып, жазықсыз тұтқындалып атылды. 1958 жылы ақталды.',
      en: 'Nazir Torekulov was a brilliant statesman, polyglot philologist, publisher, and the first ethnic Kazakh professional diplomat-ambassador. Educated at the Kokand Commercial School and the Moscow Commercial Institute, he was fluent in Arabic, Persian, Ottoman Turkish, Russian, and French.\n\nIn 1916 on the Western Front in Minsk, he formed the underground society "Erkin Dala". He subsequently served as Chairman of the Central Executive Committee and Commissar of Education of the Turkestan Autonomous Republic. Between 1922 and 1928 as Chairman of the Central Publishing House of the Peoples of the USSR in Moscow, he courageously sheltered and employed persecuted Alash intellectuals, including Alikhan Bokeikhanov, Akhmet Baitursynov, and Magzhan Zhumabaev.\n\nFrom 1928 to 1936, he served as Soviet Plenipotentiary (Ambassador) to the Kingdom of Saudi Arabia, earning deep trust from King Abdulaziz Al Saud and serving as Dean of the Diplomatic Corps in Jeddah. Recalled during Stalin\'s Terror, he was executed in Moscow in 1937 and rehabilitated in 1958.',
    },
    education: {
      kz: 'Қоқан коммерциялық училищесі (1913); Мәскеу коммерциялық институтының экономика факультеті (1916)',
      en: 'Kokand Commercial School (1913); Faculty of Economics, Moscow Commercial Institute (1916)',
    },
    keyWorks: {
      kz: [
        '«Темірқазық» журналы (Мәскеу, 1923)',
        'Түркі халықтарының жаңа әліпбиіне арналған лингвистикалық зерттеулері',
        'КСРО Орталық баспасында жарық көрген сөздіктері мен ғылыми басылымдары',
      ],
      en: [
        'Journal "Temirqazyq" (Moscow, 1923)',
        'Linguistic treatises on Latinization and Turkic orthography',
        'Encyclopedic and educational editions of the Central Publishing House',
      ],
    },
    quote: {
      kz: 'Өз ұлтыңның мәдениетін әлемдік деңгейге көтеру — әрбір оқыған азаматтың қасиетті борышы.',
      en: 'Elevating the culture of your nation to the global arena is the sacred duty of every educated citizen.',
      citation: '«Темірқазық» журналындағы бас мақаласынан, Мәскеу, 1923 ж.',
    },
    milestones: [
      {
        year: 1916,
        event: {
          kz: 'Минскіде майдан тылындағы қазақ жұмысшыларына қолдау көрсетіп, «Еркін дала» ұйымын құрды.',
          en: 'Co-founded the "Erkin Dala" society while supporting mobilized Kazakh rear workers in Minsk.',
        },
      },
      {
        year: 1922,
        event: {
          kz: 'Мәскеуде КСРО Халықтарының Орталық баспасын басқарып, Алаш қайраткерлеріне қамқор болды.',
          en: 'Headed the Central Publishing House in Moscow, publishing and protecting Alash scholars.',
        },
      },
      {
        year: 1928,
        event: {
          kz: 'Сауд Арабия Корольдігіндегі КСРО-ның өкілетті өкілі (елшісі) болып тағайындалды.',
          en: 'Appointed Soviet Ambassador Plenipotentiary to the Kingdom of Saudi Arabia.',
        },
      },
    ],
    photoUrl: '/images/portraits/torekulov.jpeg',
    isCore: false,
  },
  {
    id: 'shokay',
    name: {
      kz: 'Мұстафа Шоқай',
      en: 'Mustafa Shokay',
    },
    lifeYears: '1890–1941',
    role: 'leader',
    roleTitle: {
      kz: 'Түркістан автономиясының төрағасы, мемлекет және қоғам қайраткері, саяси публицист',
      en: 'Prime Minister of Autonomous Turkestan, Statesman, Political Emigré',
    },
    shortBio: {
      kz: 'Түркістан автономиясының төрағасы, Алашорда үкіметінің мүшесі, эмиграцияда Түркістан мен Алаш азаттығы үшін күрескен халықаралық қайраткер.',
      en: 'Prime Minister of Turkestan Autonomy, Alash Orda member, and internationally acclaimed political thinker in European exile.',
    },
    fullBio: {
      kz: 'Мұстафа Шоқай — біртұтас Түркістанның азаттығы мен мемлекеттілігі жолында күрескен әлемдік деңгейдегі саяси қайраткер, публицист және дипломат. Ташкент ерлер гимназиясын алтын медальмен, Санкт-Петербург Императорлық университетінің заң факультетін бітірген.\n\n1916–1917 жылдары Ресей Мемлекеттік Думасының мұсылман фракциясының хатшысы болып, Әлихан Бөкейхановпен бірге 1916 жылғы көтерілісті жаныштаған патша озбырлығын әшкереледі. 1917 жылғы қарашада Қоқанда Түркістан автономиясы жарияланғанда, оның сыртқы істер министрі, кейін үкімет төрағасы (премьер-министрі) болды. Сол жылғы желтоқсанда Алашорда үкіметінің құрамына сайланып, қос автономия арасындағы саяси одақты бекітті.\n\n1918 жылы большевиктер Қоқанды талқандаған соң, шетелге өтіп, Франция мен Германияда саяси эмиграцияда өмір сүрді. Парижде «Яш Түркістан» журналын шығарып, кеңестік тоталитаризм мен 1932–1933 жылдардағы Қазақстандағы алапат ашаршылық шындығын батыс әлеміне тұңғыш рет жеткізді. 1941 жылы желтоқсанда Берлинде жұмбақ жағдайда қайтыс болып, Темпельхоф зиратына жерленді.',
      en: 'Mustafa Shokay was an internationally renowned statesman and visionary who fought for a unified, sovereign Turkestan. After working with Alikhan Bokeikhanov in the 4th State Duma to expose tsarist atrocities during the 1916 uprising, he was chosen as Foreign Minister and later Prime Minister of the Provisional Government of Autonomous Turkestan (Kokand Autonomy) in November 1917. Simultaneously elected to the Alash Orda Council, he forged the alliance between the Steppe Krai and Central Asia.\n\nFollowing Kokand\'s bloody destruction by Bolshevik forces in February 1918, Shokay lived in exile in Paris and Berlin, where he published "Yash Turkistan" and became the first to sound the alarm across Western Europe regarding the horrific 1932–1933 Kazakh famine (Asharshylyk). He died in Berlin in 1941.',
    },
    education: {
      kz: 'Ташкент ерлер гимназиясы (алтын медаль, 1910); Санкт-Петербург Императорлық университетінің заң факультеті (1914)',
      en: 'Tashkent Men\'s Gymnasium (gold medal, 1910); Faculty of Law of Saint Petersburg Imperial University (1914)',
    },
    keyWorks: {
      kz: [
        '«Түркістан кеңестер билігінде» (Париж, 1928)',
        '«1917 жыл естеліктерінен үзінділер» (Париж, 1937)',
        '«Яш Түркістан» журналы (Париж-Берлин, 1929–1939)',
        '«Вольный Кавказ», «Прометей» басылымдарындағы мақалалары',
      ],
      en: [
        'Turkestan Under Soviet Rule (Paris, 1928)',
        'Excerpts from Memories of 1917 (Paris, 1937)',
        'Yash Turkistan magazine (Paris-Berlin, 1929–1939)',
        'Articles in "Prométhée" and European periodicals',
      ],
    },
    quote: {
      kz: 'Ұлттық рухсыз ұлт тәуелсіздігі болуы мүмкін емес. Тәуелсіздікке жетудің басты шарты — ұлттық бірлік пен саналы күрес.',
      en: 'Without a national spirit, national independence is impossible. The primary prerequisite for achieving independence is national unity and conscious struggle.',
      citation: '«Яш Түркістан» журналы, 1930 ж.',
    },
    milestones: [
      {
        year: 1917,
        event: {
          kz: 'Қоқанда Түркістан автономиясын жариялап, үкімет төрағасы болып сайланды.',
          en: 'Proclaimed Turkestan Autonomy in Kokand and became its Prime Minister.',
        },
      },
      {
        year: 1917,
        event: {
          kz: 'Екінші жалпықазақ съезінде Алашорда үкіметінің мүшесі болып бекітілді.',
          en: 'Allied with Alash Orda at the Second All-Kazakh Congress to coordinate Kazakh-Turkestani democratic self-determination.',
        },
      },
      {
        year: 1929,
        event: {
          kz: 'Еуропада «Яш Түркістан» журналын шығарып, тоталитаризм мен ашаршылық шындығын әлемге жайды.',
          en: 'Published the anti-totalitarian journal "Yash Turkistan" in Paris and Berlin.',
        },
      },
    ],
    photoUrl: '/images/portraits/shokay.jpg',
    isCore: false,
  },
  {
    id: 'sadvakasov',
    name: {
      kz: 'Смағұл Сәдуақасұлы',
      en: 'Smagul Sadvakasov',
    },
    lifeYears: '1900–1933',
    role: 'leader',
    roleTitle: {
      kz: 'Мемлекет қайраткері, Қазақ АКСР Халық ағарту комиссары, жазушы-публицист',
      en: 'Statesman, People\'s Commissar of Education of Kazakh ASSR, Writer-Publicist',
    },
    shortBio: {
      kz: '25 жасында Халық ағарту комиссары болған дарынды мемлекет қайраткері, «Кіші Қазан» озбырлығына батыл қарсы тұрушы, «Сәрсенбек» романының авторы.',
      en: 'People\'s Commissar of Education at age 25, outspoken defender of Kazakh autonomy against Goloshchekin, and author of "Sarsenbek".',
    },
    fullBio: {
      kz: 'Смағұл Сәдуақасов — Омбыда «Бірлік» жастар ұйымында Алаш жетекшілерінің тәлімін алған, жалындаған мемлекет қайраткері. 25 жасында Қазақстанның Халық ағарту комиссары болып тағайындалып, тұңғыш Қазақ мемлекеттік театрын (Қызылорда, 1926) ашуға, жоғары оқу орындарының негізін қалауға мұрындық болды.\n\nОл большевиктік өлкелік хатшы Ф. Голощекиннің «Кіші Қазан» деген бүлдіргіш саясатына тайсалмай қарсы тұрып, Алаш зиялыларын қудалаудан арашалап қалды және қазақ өнеркәсібін ұлттық мүддеде дамытуды талап етті. «Қазақстан кеңестік емес, қазақтың Қазақстаны болуы керек» деген ұран тастады.\n\n1928 жылы саяси қысыммен қызметінен босатылып, Мәскеуге жіберілді. 1933 жылы Мәскеуде 33 жасында күдікті жағдайда көз жұмды. 2011 жылы күлі Астанаға әкелініп, қайта жерленді.',
      en: 'Smagul Sadvakasov was a brilliant statesman of the post-1917 generation who embraced the intellectual ideals of Alash. At age 25, as People\'s Commissar of Education, he founded the first Kazakh National Drama Theater in Kyzylorda (1926) and expanded vernacular universities.\n\nHe famously resisted Filipp Goloshchekin\'s disastrous "Little October" campaign, defending Kazakh pastoralists and shielding Alash intellectuals from early purges. Exiled to Moscow, he died under suspicious circumstances in 1933 at just 33 years of age; in 2011 his ashes were brought back and solemnly interred in Astana.',
    },
    education: {
      kz: 'Омбы мұғалімдер семинариясы (1918); Мәскеу теміржол инженерлері институты (1932)',
      en: 'Omsk Teachers\' Seminary (1918); Moscow Institute of Railway Engineers (1932)',
    },
    keyWorks: {
      kz: [
        '«Сәрсенбек» романы (1927)',
        '«Жастарға» (1927)',
        '«Ұлт театры туралы» зерттеулері',
        '«Қазақстанның өткені мен бүгіні» саяси очеркі',
      ],
      en: [
        'Novel "Sarsenbek" (1927)',
        'To the Youth (1927)',
        'On the National Theater',
        'Political treatise "Kazakhstan: Past and Present"',
      ],
    },
    quote: {
      kz: 'Қазақстан кеңестік емес, қазақтың Қазақстаны болуы керек. Өз елінде қазақ өгей бала болып қалмауы тиіс!',
      en: 'Kazakhstan must be not an abstract Soviet territory, but the Kazakhs\' own Kazakhstan. The Kazakh must never remain a stepchild in his own land!',
      citation: 'Қазақ өлкелік партия комитетінің пленумындағы сөзі, 1926 ж.',
    },
    milestones: [
      {
        year: 1917,
        event: {
          kz: 'Омбыда «Бірлік» жастар ұйымын құруға қатысып, Алаш идеясын таратты.',
          en: 'Co-led the "Birlik" national student union in Omsk alongside young Alash followers.',
        },
      },
      {
        year: 1925,
        event: {
          kz: 'Халық ағарту комиссары болып, Қызылордада тұңғыш Қазақ мемлекеттік театрын ашты.',
          en: 'Led the Commissariat of Education, opening the first Kazakh State Theater.',
        },
      },
      {
        year: 1926,
        event: {
          kz: 'Өлкелік партия пленумында Голощекиннің бүлдіргі саясатына батыл қарсы шықты.',
          en: 'Courageously confronted Goloshchekin\'s anti-Kazakh agrarian policies at the Party Plenum.',
        },
      },
    ],
    photoUrl: '/images/portraits/sadvakasov.jpeg',
    isCore: false,
  },
];

/**
 * Filtered convenience views
 */
export const coreFigures = figures.filter((f) => f.isCore);
export const extendedFigures = figures.filter((f) => !f.isCore);

/**
 * Lookup helpers
 */
export const getFigureById = (id: string): Figure | undefined =>
  figures.find((f) => f.id === id);

export const getFiguresByRole = (role: Figure['role']): Figure[] =>
  figures.filter((f) => f.role === role);

export const FIGURES = figures;
