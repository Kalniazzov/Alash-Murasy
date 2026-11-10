import { QuizQuestion, DailyFactItem } from './types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Category 1: figures (Қазақ зиялылары)
  {
    id: 1,
    category: 'figures',
    question: {
      kz: '1909 жылы жарық көрген «Оян, қазақ!» жинағы мен «Бақытсыз Жамал» романының авторы кім?',
      en: 'Who authored the 1909 poetry collection "Oyan, Qazaq!" and the novel "Baqytsyz Jamal"?',
    },
    options: [
      { kz: 'Ахмет Байтұрсынұлы', en: 'Akhmet Baitursynuly' },
      { kz: 'Міржақып Дулатұлы', en: 'Mirzhakyp Dulatuly' },
      { kz: 'Мағжан Жұмабаев', en: 'Magzhan Zhumabaev' },
      { kz: 'Сұлтанмахмұт Торайғыров', en: 'Sultanmakhmut Toraighyrov' },
    ],
    correctIndex: 1,
    explanation: {
      kz: 'Міржақып Дулатұлы 1909 жылы «Оян, қазақ!» жинағын, ал 1910 жылы қазақ әдебиетіндегі алғашқы романдардың бірі «Бақытсыз Жамалды» жариялады.',
      en: 'Mirzhakyp Dulatuly published "Oyan, Qazaq!" in 1909 and "Baqytsyz Jamal" in 1910.',
    },
  },
  {
    id: 2,
    category: 'figures',
    question: {
      kz: 'Санкт-Петербургтегі Орман институтын бітірген экономист-ғалым әрі Алаш қозғалысының жетекшісі кім?',
      en: 'Which economist graduated from the St. Petersburg Imperial Forestry Institute and led the Alash movement?',
    },
    options: [
      { kz: 'Әлихан Бөкейхан', en: 'Alikhan Bokeikhan' },
      { kz: 'Жақып Ақбаев', en: 'Zhaqyp Aqbaev' },
      { kz: 'Халел Досмұхамедов', en: 'Khalel Dosmukhamedov' },
      { kz: 'Мұхамеджан Сералин', en: 'Mukhamedjan Seralin' },
    ],
    correctIndex: 0,
    explanation: {
      kz: 'Әлихан Бөкейхан (1866–1937) Санкт-Петербург Орман институтында білім алып, Алаш қозғалысы мен Алашордаға жетекшілік етті.',
      en: 'Alikhan Bokeikhan (1866–1937) studied at the St. Petersburg Forestry Institute and chaired Alash Orda.',
    },
  },
  {
    id: 3,
    category: 'figures',
    question: {
      kz: 'Араб графикасы негізінде қазақ дыбыс жүйесіне бейімделген әліпби («Төте жазу») мен «Тіл-құрал» оқулығын кім жасады?',
      en: 'Who reformed the Kazakh alphabet ("Tote Jazu") and wrote the foundational linguistics series "Til-Qural"?',
    },
    options: [
      { kz: 'Жүсіпбек Аймауытов', en: 'Zhusipbek Aimauytov' },
      { kz: 'Мұстафа Шоқай', en: 'Mustafa Shokai' },
      { kz: 'Ахмет Байтұрсынұлы', en: 'Akhmet Baitursynuly' },
      { kz: 'Бақытжан Қаратаев', en: 'Bakhytzhan Karataev' },
    ],
    correctIndex: 2,
    explanation: {
      kz: 'Ахмет Байтұрсынұлы қазақ жазуын реформалап, «Оқу құралы» мен «Тіл-құрал» арқылы қазақ тіл білімінің негізін қалады.',
      en: 'Akhmet Baitursynuly created the phonetic Tote Jazu script and authored "Oqu Quraly" and "Til-Qural".',
    },
  },

  // Category 2: events_1905 (1905 жылғы оқиғалар)
  {
    id: 4,
    category: 'events_1905',
    question: {
      kz: '1905 жылғы Қарқаралы петициясында төмендегі мәселелердің қайсысы көтерілді?',
      en: 'Which core set of demands was raised in the 1905 Karkaraly Petition?',
    },
    options: [
      {
        kz: 'Жер құқығы, ана тілінде білім беру, дін және баспасөз бостандығы',
        en: 'Land rights, mother-tongue education, freedom of conscience, and uncensored press',
      },
      {
        kz: 'Тек қана теміржол салығын азайту',
        en: 'Exclusively lowering railway freight tariffs',
      },
      {
        kz: 'Барлық мектептерді жабу',
        en: 'Closing secular rural schools across the Steppe',
      },
      {
        kz: 'Қоныс аудару саясатын кеңейту',
        en: 'Expanding colonial peasant resettlement',
      },
    ],
    correctIndex: 0,
    explanation: {
      kz: 'Қарқаралы петициясы жерді тартып алуды тоқтатуды, ана тілінде оқуды, дін еркіндігін, газет шығару құқығын және әділ сотты талап етті.',
      en: 'The 1905 Karkaraly Petition systematically demanded native land protection, Kazakh-language schooling, religious liberty, press freedom, and judicial fairness.',
    },
  },
  {
    id: 5,
    category: 'events_1905',
    question: {
      kz: 'Қарқаралы петициясын әзірлеуге белсене қатысқан құқықтану магистрі, заңгер кім?',
      en: 'Which Saint Petersburg-trained jurist actively helped draft the 1905 Karkaraly Petition?',
    },
    options: [
      { kz: 'Сұлтанмахмұт Торайғыров', en: 'Sultanmakhmut Toraighyrov' },
      { kz: 'Жақып Ақбаев', en: 'Zhaqyp Aqbaev' },
      { kz: 'Мағжан Жұмабаев', en: 'Magzhan Zhumabaev' },
      { kz: 'Мұхамеджан Сералин', en: 'Mukhamedjan Seralin' },
    ],
    correctIndex: 1,
    explanation: {
      kz: 'Заңгер Жақып Ақбаев Ә. Бөкейхан және А. Байтұрсынұлымен бірге 1905 жылғы Қарқаралы петициясын ұйымдастыруға зор үлес қосты.',
      en: 'Jurist Zhaqyp Aqbaev worked alongside Bokeikhan and Baitursynuly in drafting and organizing the Karkaraly Petition.',
    },
  },
  {
    id: 6,
    category: 'events_1905',
    question: {
      kz: '1907 жылғы 3 маусымдағы сайлау заңнамасының өзгеруі дала өлкесіне қалай әсер етті?',
      en: 'How did the June 3, 1907 imperial electoral law change affect the Kazakh Steppe?',
    },
    options: [
      {
        kz: 'Қазақ депутаттарының Думадағы квотасы екі есе өсті',
        en: 'Kazakh representation in the State Duma doubled',
      },
      {
        kz: 'Дала халқы Мемлекеттік Думаға депутат сайлау құқығынан шеттетілді',
        en: 'Indigenous Steppe populations were stripped of State Duma voting representation',
      },
      {
        kz: 'Қазақ автономиясы ресми жарияланды',
        en: 'Kazakh territorial autonomy was immediately granted',
      },
      {
        kz: 'Отарлық әкімшілік таратылды',
        en: 'Colonial district administrations were dissolved',
      },
    ],
    correctIndex: 1,
    explanation: {
      kz: '1907 жылы патша үкіметі сайлау заңын қатаңдатып, дала аймақтарының Мемлекеттік Думадағы саяси өкілдігін тоқтатты.',
      en: 'The June 1907 coup revised electoral law, disenfranchising the Kazakh Steppe and Central Asia from parliamentary representation.',
    },
  },

  // Category 3: press («Айқап» және «Қазақ»)
  {
    id: 7,
    category: 'press',
    question: {
      kz: '«Айқап» журналы 1911–1915 жылдары қай қалада және кімнің редакторлығымен шықты?',
      en: 'In which city and under whose editorship was "Aiqap" magazine published from 1911 to 1915?',
    },
    options: [
      { kz: 'Троицк қаласында, Мұхамеджан Сералин', en: 'Troitsk, edited by Mukhamedjan Seralin' },
      { kz: 'Орынборда, Ахмет Байтұрсынұлы', en: 'Orenburg, edited by Akhmet Baitursynuly' },
      { kz: 'Семейде, Жүсіпбек Аймауытов', en: 'Semey, edited by Zhusipbek Aimauytov' },
      { kz: 'Қоқанда, Мұстафа Шоқай', en: 'Kokand, edited by Mustafa Shokai' },
    ],
    correctIndex: 0,
    explanation: {
      kz: '«Айқап» журналы 1911–1915 жылдары Троицк қаласында Мұхамеджан Сералиннің редакторлығымен жарық көрді.',
      en: '"Aiqap" was published in Troitsk (1911–1915) under founder and editor Mukhamedjan Seralin.',
    },
  },
  {
    id: 8,
    category: 'press',
    question: {
      kz: '«Қазақ» газетінің алғашқы саны қашан және қай қалада жарық көрді?',
      en: 'When and where did the premiere issue of "Qazaq" newspaper appear?',
    },
    options: [
      { kz: '1909 жылы Уфада', en: '1909 in Ufa' },
      { kz: '1913 жылғы 2 ақпанда Орынборда', en: 'February 2, 1913 in Orenburg' },
      { kz: '1915 жылы Омбыда', en: '1915 in Omsk' },
      { kz: '1918 жылы Ташкентте', en: '1918 in Tashkent' },
    ],
    correctIndex: 1,
    explanation: {
      kz: '«Қазақ» газетінің №1 саны 1913 жылғы 2 ақпанда Орынбор қаласында шықты.',
      en: 'Issue No. 1 of "Qazaq" was published on February 2, 1913 in Orenburg.',
    },
  },
  {
    id: 9,
    category: 'press',
    question: {
      kz: '«Айқап» журналы мен «Қазақ» газетінің өзара қатынасын тарихи тұрғыдан қалай бағалаған дұрыс?',
      en: 'How should the historical relationship between "Aiqap" and "Qazaq" be accurately understood?',
    },
    options: [
      {
        kz: 'Екеуі де қазақ қоғамын ағартуға қызмет етті, тек кейбір мәселелерді шешу жолдарында пікір айырмашылықтары болды',
        en: 'Both advanced Kazakh enlightenment and civic progress while debating tactical approaches on certain issues',
      },
      {
        kz: 'Олар тек көркем аудармамен ғана айналысты',
        en: 'Both avoided social issues and published only foreign fiction',
      },
      {
        kz: 'Екеуі де ана тілінде білім беруге қарсы болды',
        en: 'Both opposed mother-tongue primary schooling',
      },
      {
        kz: 'Екеуі бір редакцияның бір қаладағы қосымшасы болды',
        en: 'One was merely a weekly supplement printed inside the same office',
      },
    ],
    correctIndex: 0,
    explanation: {
      kz: 'Екі басылым да білім, тіл, жер және әйел теңдігі үшін күресті; оларды тек қарсылас екі лагерь ретінде көрсету тарихи тұрғыдан біржақты болар еді.',
      en: 'Both periodicals championed literacy, native language, and land protection, engaging in pluralistic debate over strategy.',
    },
  },

  // Category 4: years_1916_1917 (1916–1917 жылдар)
  {
    id: 10,
    category: 'years_1916_1917',
    question: {
      kz: '1916 жылғы 25 маусымдағы патша жарлығының негізгі мазмұны қандай болды?',
      en: 'What did the imperial decree of June 25, 1916 order?',
    },
    options: [
      {
        kz: '19–43 жас аралығындағы ер азаматтарды майданның қара жұмысына (тыл жұмысына) алу',
        en: 'Conscripting indigenous men aged 19–43 for rear-line war labor',
      },
      {
        kz: 'Дала өлкесінде университеттер ашу',
        en: 'Opening autonomous universities across the Steppe',
      },
      {
        kz: 'Салықтар мен міндеткерліктерді тоқтату',
        en: 'Abolishing wartime taxes and requisitions',
      },
      {
        kz: 'Қоныс аударушылардан жерді қайтару',
        en: 'Returning expropriated pastures to Kazakh communities',
      },
    ],
    correctIndex: 0,
    explanation: {
      kz: '25 маусым жарлығымен Орта Азия мен Қазақстанның 19–43 жастағы ер азаматтарын майданның қара жұмысына алу жаппай ұлт-азаттық көтеріліске түрткі болды.',
      en: 'The June 25, 1916 decree requisitioning men aged 19–43 for front-line labor sparked the 1916 national liberation uprising.',
    },
  },
  {
    id: 11,
    category: 'years_1916_1917',
    question: {
      kz: 'Алаш партиясы мен Алашорда үкіметі нақты қай жылы құрылды?',
      en: 'In which year were the Alash Party and the Alash Orda council established?',
    },
    options: [
      { kz: '1905 жылы', en: '1905' },
      { kz: '1911 жылы', en: '1911' },
      { kz: '1917 жылы', en: '1917' },
      { kz: '1924 жылы', en: '1924' },
    ],
    correctIndex: 2,
    explanation: {
      kz: 'Маңызды хронология: 1900–1914 жж. — қазақ зиялыларының қалыптасу кезеңі, ал Алаш партиясы (шілде) мен Алашорда (желтоқсан) 1917 жылы құрылды.',
      en: '1900–1914 was the formative intellectual period, whereas the Alash Party (July) and Alash Orda (December) were founded in 1917.',
    },
  },
  {
    id: 12,
    category: 'years_1916_1917',
    question: {
      kz: '1917 жылғы қарашада Қоқан қаласында жарияланған автономия қалай аталды?',
      en: 'Which regional autonomy was proclaimed in Kokand in November 1917?',
    },
    options: [
      { kz: 'Алаш автономиясы', en: 'Alash Autonomy' },
      { kz: 'Түркістан (Қоқан) автономиясы', en: 'Turkestan (Kokand) Autonomy' },
      { kz: 'Сібір облыстық думасы', en: 'Siberian Regional Duma' },
      { kz: 'Бөкей губерниясы', en: 'Bukei Governorate' },
    ],
    correctIndex: 1,
    explanation: {
      kz: 'Қоқанда 1917 жылғы қарашада М. Тынышпаев пен М. Шоқай қатысқан Түркістан автономиясы жарияланды; оны желтоқсанда Орынборда құрылған Алаш автономиясымен шатастырмау қажет.',
      en: 'Turkestan Autonomy was proclaimed in Kokand in November 1917 with leadership from Tynyshpaev and Mustafa Shokai, distinct from Alash Autonomy in Orenburg.',
    },
  },

  // Category 5: alash_orda (Алаш партиясы және Алашорда)
  {
    id: 13,
    category: 'alash_orda',
    question: {
      kz: '1917 жылғы желтоқсанда құрылған Алашорда уақытша Ұлттық кеңесіндегі 25 орынның нешеуі өзге халықтар өкілдеріне қарастырылды?',
      en: 'Out of 25 seats on the provisional Alash Orda People\'s Council, how many were reserved for non-Kazakh representatives?',
    },
    options: [
      { kz: '10 орын', en: '10 seats' },
      { kz: '1 орын', en: '1 seat' },
      { kz: '20 орын', en: '20 seats' },
      { kz: 'Өзге ұлттарға орын берілген жоқ', en: 'Zero seats were allocated' },
    ],
    correctIndex: 0,
    explanation: {
      kz: 'Екінші жалпықазақ съезінің шешімімен 25 орынның 10-ы қазақтармен бірге тұратын өзге халықтардың өкілдеріне қалдырылды.',
      en: 'Ten of the 25 council seats were reserved for non-Kazakh communities living in the region, reflecting civic pluralism.',
    },
  },
  {
    id: 14,
    category: 'alash_orda',
    question: {
      kz: '1917 жылғы «Алаш» партиясы бағдарламасының жобасында дін мен мемлекет қатынасы қалай белгіленді?',
      en: 'How did the 1917 Draft Program of the Alash Party define the relationship between religion and the state?',
    },
    options: [
      {
        kz: 'Дін ісі мемлекеттен бөлек болуы және әркімнің діни сенім бостандығы қорғалуы',
        en: 'Separation of religion from state governance alongside full freedom of conscience',
      },
      {
        kz: 'Барлық діндерге тыйым салу',
        en: 'Complete prohibition of religious practice',
      },
      {
        kz: 'Сот пен салықты тек діни мекемелерге беру',
        en: 'Transferring taxation and secular courts entirely to clergy',
      },
      {
        kz: 'Бір дінді барлық азаматқа міндеттеу',
        en: 'Compulsory state religion for all inhabitants',
      },
    ],
    correctIndex: 0,
    explanation: {
      kz: 'Бағдарламаның IV тарауы («Дін ісі») діннің мемлекеттен бөлінуін және ар-ождан бостандығын нақты бекітті.',
      en: 'Article IV ("Religion") explicitly called for separating religious affairs from the state while guaranteeing freedom of worship.',
    },
  },
  {
    id: 15,
    category: 'alash_orda',
    question: {
      kz: 'Батыс Алашорда бөлімшесінің қызметіне жетекшілік еткен көрнекті қайраткерлер кімдер?',
      en: 'Which prominent figures led the Western Branch of Alash Orda?',
    },
    options: [
      {
        kz: 'Жаһанша Досмұхамедов пен Халел Досмұхамедов',
        en: 'Zhahansha Dosmukhamedov and Khalel Dosmukhamedov',
      },
      {
        kz: 'Сұлтанмахмұт Торайғыров пен Сәбит Дөнентаев',
        en: 'Sultanmakhmut Toraighyrov and Sabit Donentaev',
      },
      {
        kz: 'Мұхамеджан Сералин мен Мұхтар Әуезов',
        en: 'Mukhamedjan Seralin and Mukhtar Auezov',
      },
      {
        kz: 'Мұстафа Шоқай мен Сұлтанбек Қожанов',
        en: 'Mustafa Shokai and Sultanbek Kozhanov',
      },
    ],
    correctIndex: 0,
    explanation: {
      kz: 'Заңгер Жаһанша Досмұхамедов пен дәрігер-ғалым Халел Досмұхамедов Жымпитыда орналасқан Батыс Алашорда құрылымдарын басқарды.',
      en: 'Jurist Zhahansha Dosmukhamedov and physician-scholar Khalel Dosmukhamedov headed Western Alash Orda from Zhympity.',
    },
  },
];

export const DAILY_FACTS: DailyFactItem[] = [
  {
    id: 'fact-qazaq-circulation',
    year: '1913–1918',
    title: {
      kz: 'Халық қаржысымен шыққан ұлттық газет',
      en: 'A Community-Sustained National Newspaper',
    },
    fact: {
      kz: '«Қазақ» газетінің алғашқы саны 1913 жылғы 2 ақпанда шықты. Цензура салған бірнеше мың рубль айыппұлдарды оқырмандар ел ішінен жылу жинап төлеп, сүйікті басылымын жабылудан сақтап отырған.',
      en: 'Launched on February 2, 1913, "Qazaq" survived repeated imperial censorship fines thanks to ordinary readers across the steppe pooling donations whenever its editor faced arrest.',
    },
    source: {
      kz: 'Дереккөз: «Қазақ» газеті (1913–1918), академиялық жинақ; e-history.kz',
      en: 'Source: "Qazaq" Newspaper Anthology (1913–1918); e-history.kz',
    },
  },
  {
    id: 2 + '',
    year: '1905',
    title: {
      kz: 'Қарқаралы петициясының ауқымы',
      en: 'Scale of the Karkaraly Petition',
    },
    fact: {
      kz: '1905 жылғы Қоянды жәрмеңкесінде дайындалған Қарқаралы петициясы тек жер дауымен шектелмей, ана тілінде білім алу, цензурасыз газет шығару және әділ сот талаптарын біртұтас құқықтық құжатқа біріктірді.',
      en: 'Drafted at the 1905 Koyandy Fair, the Karkaraly Petition went far beyond land complaints — uniting demands for mother-tongue schools, uncensored newspapers, and judicial equality.',
    },
    source: {
      kz: 'Дереккөз: ҚР Орталық мемлекеттік архиві; Ш. Уәлиханов атындағы ТЭИ',
      en: 'Source: Central State Archive of RK; Ch. Valikhanov Institute of History',
    },
  },
  {
    id: 'fact-pluralism',
    year: '1917',
    title: {
      kz: 'Көпұлтты өкілдік қағидаты',
      en: 'Civic Pluralism in Alash Orda',
    },
    fact: {
      kz: '1917 жылғы желтоқсанда Екінші жалпықазақ съезі Алашорда уақытша ұлттық кеңесіндегі 25 орынның 10-ын қазақтармен бірге тұратын өзге халықтар өкілдеріне қалдырды.',
      en: 'At the December 1917 Second All-Kazakh Congress, 10 of the 25 seats in the provisional Alash Orda council were reserved for non-Kazakh communities living in the region.',
    },
    source: {
      kz: 'Дереккөз: Екінші жалпықазақ съезінің хаттамасы, Орынбор, 1917 ж.',
      en: 'Source: Protocol of the Second All-Kazakh Congress, Orenburg, 1917',
    },
  },
  {
    id: 'fact-polymaths',
    year: '1920–1928',
    title: {
      kz: 'Ғылыми оқулықтар мен терминология мұрасы',
      en: 'Pioneers of Kazakh Scientific Textbooks',
    },
    fact: {
      kz: 'Алаш зиялылары тек саясаткер емес, жан-жақты ғалым болды: А. Байтұрсынұлы тіл білімін, Х. Досмұхамедов анатомия мен зоологияны, М. Дулатұлы арифметиканы, Ж. Аймауытов психологияны алғаш қазақ тілінде оқулық етіп жазды.',
      en: 'Alash figures authored the very first Kazakh-language textbooks across disciplines: Baitursynuly in linguistics, Khalel Dosmukhamedov in physiology and zoology, Dulatuly in arithmetic, and Aimauytov in psychology.',
    },
    source: {
      kz: 'Дереккөз: ҚР Ұлттық академиялық кітапханасының сирек кітаптар қоры',
      en: 'Source: Rare Books Collection, National Academic Library of RK',
    },
  },
];
