import { MapLocation } from './types';

export const MAP_LOCATIONS: MapLocation[] = [
  {
    id: 'karkaraly',
    name: { kz: 'Қарқаралы', en: 'Karkaraly (Qarqaraly)' },
    historicalName: { kz: 'Қоянды жәрмеңкесі / Семей облысы', en: 'Koyandy Fair / Semipalatinsk Oblast' },
    lat: 49.4083,
    lng: 75.0294,
    category: 'alash_center',
    era: '1905–1917',
    region: { kz: 'Орталық Қазақстан (Қарағанды өңірі)', en: 'Central Kazakhstan (Karaganda Region)' },
    historicRole: {
      kz: '1905 жылғы Қарқаралы петициясы дүниеге келген саяси ояну бесігі',
      en: 'Cradle of the 1905 Karkaraly Petition and early political awakening',
    },
    description: {
      kz: '1905 жылғы маусым–шілдеде Қарқаралы маңындағы Қоянды жәрмеңкесінде 14 500-ден астам адам қол қойған тарихи Қарқаралы петициясы қабылданды. Құжатта жерді қорғау, ана тілінде білім беру, баспасөз бен дін бостандығы талап етілді.',
      en: 'In summer 1905 at the Koyandy Fair near Karkaraly, over 14,500 signatories endorsed the Karkaraly Petition — the first organized charter demanding land rights, mother-tongue schooling, press freedom, and judicial equality.',
    },
    keyEvents: [
      {
        year: '1905',
        text: {
          kz: 'Қоянды жәрмеңкесінде Қарқаралы петициясы әзірленіп, патша үкіметіне жолданды.',
          en: 'Drafting and mass signing of the Karkaraly Petition at the Koyandy Fair.',
        },
      },
      {
        year: '1917',
        text: {
          kz: 'Қарқаралы уездік қазақ комитеті құрылып, ағарту жұмыстары жанданды.',
          en: 'Formation of the Karkaraly District Kazakh Committee.',
        },
      },
    ],
    figuresAssociated: {
      kz: ['Әлихан Бөкейхан', 'Ахмет Байтұрсынұлы', 'Жақып Ақбаев', 'Әлімхан Ермеков'],
      en: ['Alikhan Bokeikhan', 'Akhmet Baitursynuly', 'Zhaqyp Aqbaev', 'Alimkhan Ermekov'],
    },
  },
  {
    id: 'orenburg',
    name: { kz: 'Орынбор', en: 'Orenburg (Orynbor)' },
    historicalName: { kz: 'Жалпықазақ съездері мен «Қазақ» газетінің ордасы', en: 'Seat of All-Kazakh Congresses & "Qazaq" Newspaper' },
    lat: 51.7681,
    lng: 55.097,
    category: 'alash_center',
    era: '1913–1925',
    region: { kz: 'Жайық бойы / Тарихи шекаралық орталық', en: 'Ural River / Historic Frontier Hub' },
    historicRole: {
      kz: '«Қазақ» газеті басылған қала және 1917 жылғы I–II жалпықазақ съездерінің орталығы',
      en: 'Home of "Qazaq" newspaper and venue of the 1917 First and Second All-Kazakh Congresses',
    },
    description: {
      kz: '1913–1918 жылдары Орынборда «Қазақ» газеті шықты. 1917 жылғы шілдеде мұнда Бірінші жалпықазақ съезі, ал 5–13 желтоқсанда Екінші жалпықазақ съезі өтіп, Алаш автономиясы мен Алашорда уақытша ұлттық кеңесі құрылды.',
      en: 'Orenburg hosted the "Qazaq" editorial office (1913–1918) and both 1917 All-Kazakh Congresses, culminating in the December 1917 resolution establishing Alash Autonomy and the Alash Orda provisional council.',
    },
    keyEvents: [
      {
        year: '1913',
        text: {
          kz: '2 ақпанда «Қазақ» газетінің алғашқы саны жарық көрді.',
          en: 'Premiere issue of "Qazaq" published on February 2, 1913.',
        },
      },
      {
        year: '1917 (шілде)',
        text: {
          kz: 'Бірінші жалпықазақ съезі: «Алаш» саяси партиясын ұйымдастыру басталды.',
          en: 'First All-Kazakh Congress resolves to form the Alash political party.',
        },
      },
      {
        year: '1917 (желтоқсан)',
        text: {
          kz: 'Екінші жалпықазақ съезі: Алаш автономиясы мен Алашорда үкіметі құрылды.',
          en: 'Second All-Kazakh Congress proclaims Alash Autonomy and elects Alash Orda.',
        },
      },
    ],
    figuresAssociated: {
      kz: ['Әлихан Бөкейхан', 'Ахмет Байтұрсынұлы', 'Міржақып Дулатұлы', 'Халел Досмұхамедов'],
      en: ['Alikhan Bokeikhan', 'Akhmet Baitursynuly', 'Mirzhakyp Dulatuly', 'Khalel Dosmukhamedov'],
    },
  },
  {
    id: 'semey',
    name: { kz: 'Семей (Алаш-қала)', en: 'Semey (Alash-qala)' },
    historicalName: { kz: 'Заречная Слободка — Алаш-қала', en: 'Zarechnaya Slobodka — Alash-qala' },
    lat: 50.4111,
    lng: 80.2275,
    category: 'alash_center',
    era: '1917–1920',
    region: { kz: 'Шығыс Қазақстан (Ертіс бойы)', en: 'Eastern Kazakhstan (Irtysh Valley)' },
    historicRole: {
      kz: 'Алаш автономиясының орталығы болып белгіленген қала және рухани-мәдени орда',
      en: 'Designated administrative seat of Alash Orda (Alash-qala) and literary center',
    },
    description: {
      kz: 'Екінші жалпықазақ съезінің шешімімен Семейдің сол жағалауы «Алаш» (Алаш-қала) деп аталды. Мұнда Алашорда құрылымдары жұмыс істеп, «Сарыарқа» газеті мен «Абай» журналы жарық көрді.',
      en: 'Designated as "Alash-qala" at the Second All-Kazakh Congress, Semey hosted Alash Orda administrative bodies, militia formations, and the periodicals "Saryarqa" and "Abai".',
    },
    keyEvents: [
      {
        year: '1917–1919',
        text: {
          kz: 'Алашорда кеңесінің орталық қызметі және «Сарыарқа» газетінің шығуы.',
          en: 'Operations of the Alash Orda council and publication of "Saryarqa".',
        },
      },
      {
        year: '1918',
        text: {
          kz: 'Ж. Аймауытов пен М. Әуезовтің бастамасымен «Абай» журналы жарық көрді.',
          en: 'Launch of "Abai" literary-philosophical magazine by Aimauytov and Auezov.',
        },
      },
    ],
    figuresAssociated: {
      kz: ['Әлихан Бөкейхан', 'Жүсіпбек Аймауытов', 'Сұлтанмахмұт Торайғыров', 'Мұхтар Әуезов'],
      en: ['Alikhan Bokeikhan', 'Zhusipbek Aimauytov', 'Sultanmakhmut Toraighyrov', 'Mukhtar Auezov'],
    },
  },
  {
    id: 'troitsk',
    name: { kz: 'Троицк', en: 'Troitsk' },
    historicalName: { kz: '«Айқап» журналы мен «Расулия» медресесі', en: '"Aiqap" Journal & Rasuliya Madrasah' },
    lat: 54.0894,
    lng: 61.5714,
    category: 'press_education',
    era: '1911–1915',
    region: { kz: 'Оңтүстік Орал / Солтүстік шекара маңы', en: 'Southern Urals / Northern Steppe Border' },
    historicRole: {
      kz: '«Айқап» журналы жарық көрген қазақ ағартушылық баспасөзінің орталығы',
      en: 'Publishing center of "Aiqap" magazine and progressive Jadid education',
    },
    description: {
      kz: '1911–1915 жылдары Троицк қаласында Мұхамеджан Сералиннің редакторлығымен «Айқап» журналының 88 саны жарық көрді. Қаладағы «Расулия» медресесінде көптеген қазақ жастары жаңа әдіспен білім алды.',
      en: 'From 1911 to 1915, Mukhamedjan Seralin published 88 issues of "Aiqap" in Troitsk, making the city a vital crossroads of Kazakh publishing, trade, and Jadid educational reform.',
    },
    keyEvents: [
      {
        year: '1911',
        text: {
          kz: 'Қаңтарда «Айқап» журналының №1 саны оқырманға жол тартты.',
          en: 'First issue of "Aiqap" magazine published in January 1911.',
        },
      },
      {
        year: '1913–1914',
        text: {
          kz: 'Сұлтанмахмұт Торайғыров редакцияда жауапты хатшы қызметін атқарды.',
          en: 'Sultanmakhmut Toraighyrov worked on Aiqap\'s editorial staff.',
        },
      },
    ],
    figuresAssociated: {
      kz: ['Мұхамеджан Сералин', 'Сұлтанмахмұт Торайғыров', 'Бақытжан Қаратаев'],
      en: ['Mukhamedjan Seralin', 'Sultanmakhmut Toraighyrov', 'Bakhytzhan Karataev'],
    },
  },
  {
    id: 'uralsk',
    name: { kz: 'Орал және Жымпиты', en: 'Oral & Zhympity' },
    historicalName: { kz: 'Батыс Алашорда (Ойыл уәлаяты)', en: 'Western Alash Orda (Oyyl Vilayet)' },
    lat: 51.2333,
    lng: 51.3667,
    category: 'alash_center',
    era: '1917–1920',
    region: { kz: 'Батыс Қазақстан', en: 'Western Kazakhstan' },
    historicRole: {
      kz: 'Батыс Алашорда бөлімшесі мен облыстық қазақ съездерінің саяси орталығы',
      en: 'Political hub of Western Alash Orda and regional Kazakh congresses',
    },
    description: {
      kz: '1917 жылғы сәуірде Оралда алғашқы облыстық қазақ съездерінің бірі өтті. Азамат соғысы кезінде Жымпитыда Жаһанша және Халел Досмұхамедовтер басқарған Алашорданың Батыс бөлімшесі жұмыс істеді.',
      en: 'Oral hosted one of the earliest April 1917 regional Kazakh congresses, while nearby Zhympity served as headquarters of the Western Branch of Alash Orda led by Zhahansha and Khalel Dosmukhamedov.',
    },
    keyEvents: [
      {
        year: '1917 (сәуір)',
        text: {
          kz: 'Орал облыстық қазақ съезі жергілікті басқару мен оқу реформасын талқылады.',
          en: 'First Ural Regional Kazakh Congress convenes under Zhahansha Dosmukhamedov.',
        },
      },
      {
        year: '1918–1919',
        text: {
          kz: 'Жымпитыда Батыс Алашорда бөлімшесі ел қауіпсіздігін ұйымдастырды.',
          en: 'Western Alash Orda administers regional self-defense from Zhympity.',
        },
      },
    ],
    figuresAssociated: {
      kz: ['Жаһанша Досмұхамедов', 'Халел Досмұхамедов', 'Бақытжан Қаратаев'],
      en: ['Zhahansha Dosmukhamedov', 'Khalel Dosmukhamedov', 'Bakhytzhan Karataev'],
    },
  },
  {
    id: 'kokand',
    name: { kz: 'Қоқан', en: 'Kokand (Qoqan)' },
    historicalName: { kz: 'Түркістан (Қоқан) автономиясы', en: 'Turkestan (Kokand) Autonomy' },
    lat: 40.5286,
    lng: 70.9425,
    category: 'allied_autonomy',
    era: '1917–1918',
    region: { kz: 'Ферғана аңғары / Түркістан өлкесі', en: 'Fergana Valley / Turkestan Krai' },
    historicRole: {
      kz: 'Түркістан автономиясы жарияланған қала (Алаш автономиясымен шатастырмау қажет)',
      en: 'Capital where Turkestan Autonomy was proclaimed (distinct from Alash Autonomy)',
    },
    description: {
      kz: '1917 жылғы қарашада Қоқанда Түркістан (Қоқан) автономиясы жарияланды. Оның уақытша үкіметін әуелі Мұхамеджан Тынышпаев, кейін Мұстафа Шоқай басқарды. Ол Алаш автономиясымен ниеттес аймақтық қозғалыс болды, бірақ бөлек саяси құрылым еді.',
      en: 'In November 1917, the Fourth Extraordinary All-Muslim Regional Congress in Kokand proclaimed Turkestan Autonomy, chaired successively by Mukhamedzhan Tynyshpaev and Mustafa Shokai. While allied in spirit with Alash, it was a distinct regional autonomy crushed by Bolshevik forces in February 1918.',
    },
    autonomyNote: {
      kz: 'Маңызды тарихи ескерту: Қоқанда жарияланған Түркістан автономиясы (1917 ж. қараша) мен Орынборда жарияланған Алаш автономиясы (1917 ж. желтоқсан) — екі бөлек тарихи құрылым.',
      en: 'Historical Note: Turkestan Autonomy in Kokand (Nov 1917) and Alash Autonomy in Orenburg (Dec 1917) were distinct political formations.',
    },
    keyEvents: [
      {
        year: '1917 (қараша)',
        text: {
          kz: 'IV Төтенше өлкелік мұсылман съезінде Түркістан автономиясы жарияланды.',
          en: 'Proclamation of Turkestan Autonomy at the 4th Extraordinary Muslim Congress.',
        },
      },
      {
        year: '1918 (ақпан)',
        text: {
          kz: 'Автономия большевиктік әскери күштер тарапынан күшпен таратылды.',
          en: 'Violent suppression of Kokand Autonomy by Bolshevik detachments.',
        },
      },
    ],
    figuresAssociated: {
      kz: ['Мұстафа Шоқай', 'Мұхамеджан Тынышпаев'],
      en: ['Mustafa Shokai', 'Mukhamedzhan Tynyshpaev'],
    },
  },
  {
    id: 'omsk',
    name: { kz: 'Омбы', en: 'Omsk (Omby)' },
    historicalName: { kz: 'Оқу орындары мен «Бірлік» жастар ұйымы', en: 'Educational Institutions & "Birlik" Youth Circle' },
    lat: 54.9885,
    lng: 73.3242,
    category: 'press_education',
    era: '1890–1918',
    region: { kz: 'Батыс Сібір / Дала өлкесі әкімшілігі', en: 'Western Siberia / Steppe Administration' },
    historicRole: {
      kz: 'Қазақ зиялыларының көпшілігі білім алған оқу және жастар қозғалысы орталығы',
      en: 'Major educational center for Kazakh youth and home of the "Birlik" society',
    },
    description: {
      kz: 'Омбыдағы гимназиялар, техникалық училище мен мұғалімдер семинариясында Ә. Бөкейхан, Ж. Ақбаев, М. Жұмабаев, С. Сәдуақасов сынды қайраткерлер оқыды. 1914 жылы мұнда «Бірлік» мәдени-ағарту ұйымы құрылды.',
      en: 'Omsk gymnasiums, technical schools, and teacher seminaries trained Bokeikhan, Aqbaev, Zhumabaev, and Sadvakasov, fostering the "Birlik" Kazakh student enlightenment society in 1914.',
    },
    keyEvents: [
      {
        year: '1900–1914',
        text: {
          kz: 'Қазақ жастарының семинария мен гимназияларда оқып, зиялы орта құруы.',
          en: 'Formation of Kazakh student circles across Omsk schools and seminaries.',
        },
      },
      {
        year: '1914',
        text: {
          kz: 'Қазақ жастарының «Бірлік» ағарту ұйымы құрылды.',
          en: 'Founding of the "Birlik" cultural-educational youth association.',
        },
      },
    ],
    figuresAssociated: {
      kz: ['Әлихан Бөкейхан', 'Жақып Ақбаев', 'Мағжан Жұмабаев'],
      en: ['Alikhan Bokeikhan', 'Zhaqyp Aqbaev', 'Magzhan Zhumabaev'],
    },
  },
  {
    id: 'tashkent',
    name: { kz: 'Ташкент', en: 'Tashkent' },
    historicalName: { kz: '«Бірлік туы» және 1920 жж. ғылыми-ағарту орталығы', en: '"Birlik Tuy" & 1920s Academic Hub' },
    lat: 41.2995,
    lng: 69.2401,
    category: 'press_education',
    era: '1917–1925',
    region: { kz: 'Сырдария / Түркістан өлкесі', en: 'Syr Darya / Turkestan Region' },
    historicRole: {
      kz: '«Бірлік туы» газеті шыққан және қазақ ғылымы мен жоғары мектебі дамыған орталық',
      en: 'Publishing center of "Birlik Tuy" and 1920s Kazakh higher-education hub',
    },
    description: {
      kz: '1917 жылы Ташкентте Мұстафа Шоқайдың бастамасымен «Бірлік туы» газеті шықты. 1920 жылдардың басында Х. Досмұхамедов, М. Жұмабаев, М. Тынышпаев Ташкенттегі Қазақ ағарту институтында сабақ беріп, оқулықтар жазды.',
      en: 'Tashkent saw the launch of "Birlik Tuy" in 1917 and served in the early 1920s as a prolific center where Dosmukhamedov, Zhumabaev, and Tynyshpaev wrote Kazakh textbooks and taught at the Kazakh Institute of Enlightenment.',
    },
    keyEvents: [
      {
        year: '1917',
        text: {
          kz: '«Бірлік туы» газеті жарық көріп, түркістандық қазақтардың мүддесін қорғады.',
          en: 'Launch of "Birlik Tuy" newspaper advocating civic rights in Turkestan.',
        },
      },
      {
        year: '1920–1924',
        text: {
          kz: ' «Талап» қоғамы құрылып, қазақ тіліндегі ғылыми оқулықтар басылды.',
          en: 'Work of the "Talap" scholarly commission publishing Kazakh science textbooks.',
        },
      },
    ],
    figuresAssociated: {
      kz: ['Мұстафа Шоқай', 'Халел Досмұхамедов', 'Мұхамеджан Тынышпаев', 'Мағжан Жұмабаев'],
      en: ['Mustafa Shokai', 'Khalel Dosmukhamedov', 'Mukhamedzhan Tynyshpaev', 'Magzhan Zhumabaev'],
    },
  },
  {
    id: 'petersburg',
    name: { kz: 'Санкт-Петербург', en: 'Saint Petersburg' },
    historicalName: { kz: 'Университеттер және I–II Мемлекеттік Дума', en: 'Imperial Universities & 1st–2nd State Dumas' },
    lat: 59.9343,
    lng: 30.3351,
    category: 'imperial_diplomacy',
    era: '1890–1917',
    region: { kz: 'Империя астанасы / Парламенттік мінбер', en: 'Imperial Capital / Parliamentary Arena' },
    historicRole: {
      kz: 'Алаш қайраткерлері жоғары білім алған және Думада жер мәселесін көтерген қала',
      en: 'University alma mater of Alash leaders and seat of the State Duma debates',
    },
    description: {
      kz: 'Санкт-Петербург жоғары оқу орындарында Ә. Бөкейхан, Ж. Ақбаев, Х. Досмұхамедов, М. Шоқай, М. Тынышпаев білім алды. 1906–1907 жылдары қазақ депутаттары Таврия сарайындағы Мемлекеттік Дума мінберінен қоныс аудару саясатын сынға алды.',
      en: 'Bokeikhan, Aqbaev, Khalel Dosmukhamedov, Shokai, and Tynyshpaev earned degrees in Saint Petersburg, where Kazakh deputies in the 1906–1907 State Dumas challenged colonial land seizures from the parliamentary rostrum.',
    },
    keyEvents: [
      {
        year: '1906–1907',
        text: {
          kz: 'I және II Мемлекеттік Думада Б. Қаратаев, Ә. Бөкейхан, Ш. Қосшығұлов жер мәселесін көтерді.',
          en: 'Kazakh deputies address the First and Second State Dumas on steppe land rights.',
        },
      },
    ],
    figuresAssociated: {
      kz: ['Әлихан Бөкейхан', 'Бақытжан Қаратаев', 'Жақып Ақбаев', 'Халел Досмұхамедов', 'Мұстафа Шоқай'],
      en: ['Alikhan Bokeikhan', 'Bakhytzhan Karataev', 'Zhaqyp Aqbaev', 'Khalel Dosmukhamedov', 'Mustafa Shokai'],
    },
  },
  {
    id: 'moscow',
    name: { kz: 'Мәскеу', en: 'Moscow' },
    historicalName: { kz: 'Келіссөздер, шекара межелеу және қуғын-сүргін қасіреті', en: 'Negotiations, Border Demarcation & Tragic Purges' },
    lat: 55.7558,
    lng: 37.6173,
    category: 'imperial_diplomacy',
    era: '1917–1938',
    region: { kz: 'Саяси келіссөздер орталығы', en: 'Political Negotiations Hub' },
    historicRole: {
      kz: '1918–1920 жж. автономия мен Қазақстан шекарасы қорғалған саяси орталық',
      en: 'Site of 1918 autonomy talks, 1920 border defense, and 1937–1938 executions',
    },
    description: {
      kz: '1917 жылы мамырда Мәскеуде Бүкілресейлік мұсылман съезі өтті. 1918 жылы Х. және Ж. Досмұхамедовтер автономия бойынша келіссөз жүргізді, ал 1920 жылы Әлімхан Ермеков Қазақстан жерінің тұтастығы туралы тарихи баяндама жасады.',
      en: 'Moscow hosted the May 1917 All-Russian Muslim Congress, 1918 Alash autonomy negotiations, and Alimkhan Ermekov\'s landmark May 1920 territorial demarcation defense; tragically, Bokeikhan and Zhahansha Dosmukhamedov were executed here in 1937–1938.',
    },
    keyEvents: [
      {
        year: '1918',
        text: {
          kz: 'Алашорда атынан орталық билікпен автономия туралы келіссөздер жүргізілді.',
          en: 'Alash Orda envoys conduct direct autonomy negotiations in Moscow.',
        },
      },
      {
        year: '1920',
        text: {
          kz: 'Ә. Ермеков баяндама жасап, Каспий мен солтүстік-шығыс өңірлерді Қазақстан құрамында қорғап қалды.',
          en: 'Alimkhan Ermekov defends Kazakhstan\'s western and northern borders.',
        },
      },
    ],
    figuresAssociated: {
      kz: ['Әлихан Бөкейхан', 'Жаһанша Досмұхамедов', 'Халел Досмұхамедов', 'Әлімхан Ермеков'],
      en: ['Alikhan Bokeikhan', 'Zhahansha Dosmukhamedov', 'Khalel Dosmukhamedov', 'Alimkhan Ermekov'],
    },
  },
  {
    id: 'kyzylorda',
    name: { kz: 'Қызылорда', en: 'Kyzylorda' },
    historicalName: { kz: 'Ақмешіт — 1925 ж. «Қазақ» атауы қайтарылған астана', en: 'Ak-Mechet — 1925 Capital Restoring "Qazaq" Name' },
    lat: 44.8488,
    lng: 65.5093,
    category: 'press_education',
    era: '1925–1929',
    region: { kz: 'Сыр бойы / Оңтүстік Қазақстан', en: 'Syr Darya / Southern Kazakhstan' },
    historicRole: {
      kz: 'Халқымыздың тарихи «Қазақ» атауы ресми қайтарылған және мәдениет өркендеген астана',
      en: '1925–1929 capital where the historical ethnonym "Kazakh" was officially restored',
    },
    description: {
      kz: '1925 жылы сәуірде Ақмешіттегі съезде бұрмаланған «киргиз» атауы жойылып, халықтың төл «қазақ» атауы ресми қайтарылды, ал астана Қызылорда деп аталды. Мұнда А. Байтұрсынұлы мен Ж. Аймауытов ағарту-мәдениет саласында еңбек етті.',
      en: 'In April 1925, the congress in Ak-Mechet officially restored the ethnonym "Kazakh" in place of "Kirghiz", renamed the capital Kyzylorda, and inaugurated the first Kazakh national theater with participation from Alash educators.',
    },
    keyEvents: [
      {
        year: '1925',
        text: {
          kz: 'Тарихи «Қазақ» атауы мемлекеттік деңгейде ресми қалпына келтірілді.',
          en: 'Official restoration of the historical ethnonym "Kazakh".',
        },
      },
    ],
    figuresAssociated: {
      kz: ['Ахмет Байтұрсынұлы', 'Жүсіпбек Аймауытов', 'Міржақып Дулатұлы'],
      en: ['Akhmet Baitursynuly', 'Zhusipbek Aimauytov', 'Mirzhakyp Dulatuly'],
    },
  },
  {
    id: 'almaty',
    name: { kz: 'Алматы (Верный)', en: 'Almaty (Verny)' },
    historicalName: { kz: 'Жетісу орталығы және 1929 жылдан бастап астана', en: 'Semirechye Center & Post-1929 Capital' },
    lat: 43.2389,
    lng: 76.8897,
    category: 'press_education',
    era: '1916–1938',
    region: { kz: 'Жетісу өңірі', en: 'Zhetysu (Semirechye) Region' },
    historicRole: {
      kz: '1916 жылғы Жетісу көтерілісінің түйіні және Алаш ғалымдары еңбек еткен ғылыми орда',
      en: 'Focal point of the 1916 Semirechye uprising and 1920s–1930s academic center',
    },
    description: {
      kz: 'Жетісу өңірі 1916 жылғы ұлт-азаттық көтеріліс пен босқыншылық зардабын қатты тартты; М. Тынышпаев бастаған Алаш қайраткерлері зардап шеккен елге көмек ұйымдастырды. 1928 жылдан бастап А. Байтұрсынұлы мен Х. Досмұхамедов алғашқы жоғары оқу орындарында дәріс оқыды.',
      en: 'Zhetysu witnessed intense 1916 uprising reprisals, prompting relief efforts led by Mukhamedzhan Tynyshpaev. From 1928, Baitursynuly and Khalel Dosmukhamedov lectured at Kazakhstan\'s first university in Almaty before the 1937–1938 purges.',
    },
    keyEvents: [
      {
        year: '1916–1917',
        text: {
          kz: 'Жетісу көтерілісі және Алаш комитеттерінің босқындарға жәрдем ұйымдастыруы.',
          en: '1916 Zhetysu uprising and subsequent Alash humanitarian relief committees.',
        },
      },
      {
        year: '1928',
        text: {
          kz: 'Қазақтың тұңғыш жоғары оқу орнында Алаш ғалымдары дәріс оқыды.',
          en: 'Alash scholars lecture as founding professors at the first Kazakh Pedagogical Institute.',
        },
      },
    ],
    figuresAssociated: {
      kz: ['Мұхамеджан Тынышпаев', 'Ахмет Байтұрсынұлы', 'Халел Досмұхамедов'],
      en: ['Mukhamedzhan Tynyshpaev', 'Akhmet Baitursynuly', 'Khalel Dosmukhamedov'],
    },
  },
];

