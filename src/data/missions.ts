import { Mission } from './types';

export const MISSIONS_DATA: Mission[] = [
  {
    id: 1,
    badgeKey: 'chronicle_keeper',
    badgeTitle: {
      kz: 'Уақыт шежірешісі',
      en: 'Chronicler of Time',
    },
    badgeDesc: {
      kz: '1905–1917 жылдардағы тарихи сабақтастықты дәл ретке келтіргені үшін',
      en: 'Awarded for mastering the chronological progression from 1905 to 1917',
    },
    title: {
      kz: 'Миссия 1 — «Уақытты ретке келтір»',
      en: 'Mission 1 — "Restore the Timeline"',
    },
    objective: {
      kz: 'Бес тарихи белесті ең ерте оқиғадан (1905) ең кейінгі оқиғаға (1917) қарай хронологиялық ретпен орналастырыңыз.',
      en: 'Arrange the five pivotal historical milestones in chronological order from earliest (1905) to latest (1917).',
    },
    hint: {
      kz: 'Ишара: Әуелі Қарқаралы петициясы (1905), одан соң М. Дулатұлының «Оян, қазақ!» кітабы (1909), кейін Троицкідегі «Айқап» журналы (1911) мен Орынбордағы «Қазақ» газеті (1913) шықты; ал Алаш автономиясы 1917 жылы құрылды.',
      en: 'Hint: First came the Karkaraly Petition (1905), then Dulatuly\'s "Oyan, Qazaq!" (1909), followed by "Aiqap" magazine (1911) and "Qazaq" newspaper (1913), culminating in Alash Autonomy (1917).',
    },
    type: 'chronology',
    points: 10,
    chronologyItems: [
      {
        id: 'chr-1913',
        year: 1913,
        label: {
          kz: 'Орынборда «Қазақ» газетінің алғашқы саны шығуы',
          en: 'Premiere issue of "Qazaq" newspaper in Orenburg',
        },
        detail: {
          kz: '1913 жылғы 2 ақпан — жалпыұлттық қоғамдық-саяси газеттің басталуы.',
          en: 'February 2, 1913 — launch of the influential all-national newspaper.',
        },
      },
      {
        id: 'chr-1905',
        year: 1905,
        label: {
          kz: 'Қоянды жәрмеңкесіндегі Қарқаралы петициясы',
          en: 'The Karkaraly Petition at the Koyandy Fair',
        },
        detail: {
          kz: '1905 жыл — жер, тіл, оқу, дін және баспасөз талаптары тұжырымдалды.',
          en: '1905 — systematic charter of land, language, education, and press rights.',
        },
      },
      {
        id: 'chr-1917',
        year: 1917,
        label: {
          kz: 'Екінші жалпықазақ съезінде Алаш автономиясының құрылуы',
          en: 'Creation of Alash Autonomy at the Second All-Kazakh Congress',
        },
        detail: {
          kz: '1917 жылғы желтоқсан — Алашорда уақытша ұлттық кеңесі жасақталды.',
          en: 'December 1917 — formation of the Alash Orda provisional council.',
        },
      },
      {
        id: 'chr-1909',
        year: 1909,
        label: {
          kz: 'Міржақып Дулатұлының «Оян, қазақ!» жинағының жарық көруі',
          en: 'Publication of Mirzhakyp Dulatuly\'s "Oyan, Qazaq!" ("Awaken, Kazakh!")',
        },
        detail: {
          kz: '1909 жыл — ұлттық сананы оятқан поэзиялық манифест басылды.',
          en: '1909 — poetic manifesto calling Kazakh society to education and civic dignity.',
        },
      },
      {
        id: 'chr-1911',
        year: 1911,
        label: {
          kz: 'Троицк қаласында «Айқап» журналының шыға бастауы',
          en: 'Launch of "Aiqap" magazine in Troitsk',
        },
        detail: {
          kz: '1911 жылғы қаңтар — М. Сералин шығарған тұңғыш қазақ журналы.',
          en: 'January 1911 — first Kazakh socio-political and literary magazine.',
        },
      },
    ],
  },
  {
    id: 2,
    badgeKey: 'figure_expert',
    badgeTitle: {
      kz: 'Тұлға білгірі',
      en: 'Biographical Scholar',
    },
    badgeDesc: {
      kz: 'Алаш зиялыларын еңбектері мен тарихи қызметі бойынша дәл танығаны үшін',
      en: 'Awarded for accurately identifying key Alash intellectuals by their works and roles',
    },
    title: {
      kz: 'Миссия 2 — «Тұлғаны таны»',
      en: 'Mission 2 — "Identify the Luminary"',
    },
    objective: {
      kz: 'Төрт тарихи сипаттаманы оқып, әр еңбектің немесе тарихи қызметтің иесін дәл табыңыз.',
      en: 'Read all four historical descriptions and match each work or leadership role to the correct figure.',
    },
    hint: {
      kz: 'Ишара: «Тіл-құрал» — қазақ тіл білімінің негізін қалаушының еңбегі; «Оян, қазақ!» пен «Бақытсыз Жамал» — бір қаламгердің туындысы; «Айқап» Троицкіде шықты; ал Алашорда төрағасы 1917 жылы Орынборда сайланды.',
      en: 'Hint: "Til-Qural" founded Kazakh linguistics; "Oyan, Qazaq!" and "Baqytsyz Jamal" share one author; "Aiqap" was edited in Troitsk; and Alash Orda\'s Chairman was elected in December 1917.',
    },
    type: 'identification',
    points: 10,
    identificationQuestions: [
      {
        id: 'id-q1',
        prompt: {
          kz: '«Тіл-құрал» оқулығының авторы, қазақ әліпбиін реформалаушы және «Қазақ» газетінің редакторы кім?',
          en: 'Who authored "Til-Qural", reformed the Kazakh alphabet, and edited "Qazaq" newspaper?',
        },
        clue: {
          kz: '«Ұлт ұстазы» атанған тіл ғалымы (1872–1937)',
          en: 'Linguist revered as "Teacher of the Nation" (1872–1937)',
        },
        options: [
          { kz: 'Ахмет Байтұрсынұлы', en: 'Akhmet Baitursynuly' },
          { kz: 'Жақып Ақбаев', en: 'Zhaqyp Aqbaev' },
          { kz: 'Мұхамеджан Сералин', en: 'Mukhamedjan Seralin' },
          { kz: 'Халел Досмұхамедов', en: 'Khalel Dosmukhamedov' },
        ],
        correctIndex: 0,
        explanation: {
          kz: 'Ахмет Байтұрсынұлы — «Оқу құралы» мен «Тіл-құрал» авторы, Төте жазу реформаторы және «Қазақ» газетінің бас редакторы.',
          en: 'Akhmet Baitursynuly authored "Til-Qural", created the phonetic Tote Jazu alphabet, and edited "Qazaq".',
        },
      },
      {
        id: 'id-q2',
        prompt: {
          kz: '1909 жылғы «Оян, қазақ!» жинағы мен «Бақытсыз Жамал» романын кім жазды?',
          en: 'Who wrote the 1909 collection "Oyan, Qazaq!" and the novel "Baqytsyz Jamal"?',
        },
        clue: {
          kz: 'Ақын, прозашы, публицист («Мадияр», 1885–1935)',
          en: 'Poet, novelist, and publicist ("Madiyar", 1885–1935)',
        },
        options: [
          { kz: 'Сұлтанмахмұт Торайғыров', en: 'Sultanmakhmut Toraighyrov' },
          { kz: 'Міржақып Дулатұлы', en: 'Mirzhakyp Dulatuly' },
          { kz: 'Мағжан Жұмабаев', en: 'Magzhan Zhumabaev' },
          { kz: 'Жүсіпбек Аймауытов', en: 'Zhusipbek Aimauytov' },
        ],
        correctIndex: 1,
        explanation: {
          kz: 'Міржақып Дулатұлы 1909 жылы «Оян, қазақ!» өлеңдер жинағын, 1910 жылы «Бақытсыз Жамал» романын жариялады.',
          en: 'Mirzhakyp Dulatuly published "Oyan, Qazaq!" in 1909 and the pioneering Kazakh novel "Baqytsyz Jamal" in 1910.',
        },
      },
      {
        id: 'id-q3',
        prompt: {
          kz: '1911–1915 жылдары Троицк қаласында шыққан «Айқап» журналының негізін қалаушы әрі редакторы кім?',
          en: 'Who founded and edited "Aiqap" magazine in Troitsk (1911–1915)?',
        },
        clue: {
          kz: 'Ағартушы-журналист, «Топжарған» поэмасының авторы (1872–1929)',
          en: 'Enlightenment journalist and poet (1872–1929)',
        },
        options: [
          { kz: 'Бақытжан Қаратаев', en: 'Bakhytzhan Karataev' },
          { kz: 'Мұстафа Шоқай', en: 'Mustafa Shokai' },
          { kz: 'Мұхамеджан Сералин', en: 'Mukhamedjan Seralin' },
          { kz: 'Жаһанша Досмұхамедов', en: 'Zhahansha Dosmukhamedov' },
        ],
        correctIndex: 2,
        explanation: {
          kz: 'Мұхамеджан Сералин 1911–1915 жылдары «Айқап» журналын ұйымдастырып, 88 санын шығарды.',
          en: 'Mukhamedjan Seralin founded and edited all 88 issues of "Aiqap" magazine in Troitsk.',
        },
      },
      {
        id: 'id-q4',
        prompt: {
          kz: 'Экономист-ғалым, I Мемлекеттік Дума депутаты және 1917 жылы сайланған Алашорда үкіметінің төрағасы кім?',
          en: 'Which economist, First State Duma deputy, and statesman was elected Chairman of Alash Orda in 1917?',
        },
        clue: {
          kz: 'Санкт-Петербург Орман институтының түлегі (1866–1937)',
          en: 'Graduate of the St. Petersburg Imperial Forestry Institute (1866–1937)',
        },
        options: [
          { kz: 'Әлихан Бөкейхан', en: 'Alikhan Bokeikhan' },
          { kz: 'Мұхамеджан Тынышпаев', en: 'Mukhamedzhan Tynyshpaev' },
          { kz: 'Халел Досмұхамедов', en: 'Khalel Dosmukhamedov' },
          { kz: 'Жақып Ақбаев', en: 'Zhaqyp Aqbaev' },
        ],
        correctIndex: 0,
        explanation: {
          kz: 'Әлихан Бөкейхан — Алаш қозғалысының жетекшісі және 1917 жылғы желтоқсанда сайланған Алашорда төрағасы.',
          en: 'Alikhan Bokeikhan led the Alash movement and was elected Chairman of the Alash Orda council in December 1917.',
        },
      },
    ],
  },
  {
    id: 3,
    badgeKey: 'archive_detective',
    badgeTitle: {
      kz: 'Архив зерттеушісі',
      en: 'Archival Detective',
    },
    badgeDesc: {
      kz: 'Түпнұсқа тарихи құжат үзінділерінің бағытын дәл анықтағаны үшін',
      en: 'Awarded for accurately classifying primary archival document excerpts',
    },
    title: {
      kz: 'Миссия 3 — «Архив детективі»',
      en: 'Mission 3 — "Archival Detective"',
    },
    objective: {
      kz: 'Нақты тарихи дереккөздерден алынған үш құжат үзіндісін оқып, әрқайсысы көтерген басты тақырыпты анықтаңыз.',
      en: 'Examine three verified archival excerpts and identify the core policy domain addressed by each.',
    },
    hint: {
      kz: 'Ишара: Бірінші үзіндіде қоныс аудару мен байырғы меншік туралы, екіншісінде бастауыш мектеп пен ана тілі туралы, үшіншісінде федерация мен облыстардың өзін-өзі басқаруы туралы айтылады.',
      en: 'Hint: Look for keywords — ancestral land allocation in Fragment 1, free mother-tongue schooling in Fragment 2, and federative self-rule in Fragment 3.',
    },
    type: 'detective',
    points: 10,
    detectiveFragments: [
      {
        id: 'det-1',
        excerpt: {
          kz: '«Негізгі заң жасағанда жер сыбағасы алдымен жергілікті жұртқа берілсін деу; жерді сатуға тыйым салынсын...»',
          en: '"When enacting fundamental land law, land shares shall first be allocated to the native population; private sale of land shall be prohibited..."',
        },
        source: {
          kz: 'Дереккөз: «Алаш» партиясы бағдарламасының жобасы, X тарау («Қазақ», №251, 1917 ж.)',
          en: 'Source: Draft Program of the Alash Party, Chapter X ("Qazaq", No. 251, 1917)',
        },
        options: [
          { id: 'land', label: { kz: 'Жер мәселесі', en: 'Land Tenure & Property' } },
          { id: 'press', label: { kz: 'Баспасөз бостандығы', en: 'Freedom of the Press' } },
          { id: 'edu', label: { kz: 'Білім және тіл', en: 'Education & Language' } },
          { id: 'court', label: { kz: 'Әскери қорғаныс', en: 'Military Defense' } },
        ],
        correctDomainId: 'land',
        explanation: {
          kz: 'Дұрыс! Бағдарламаның X тарауы қазақ жерін саудаға салмай, алдымен жергілікті халықтың шаруашылық қажетіне бекітуді көздеді.',
          en: 'Correct! Chapter X protected communal land tenure and prioritized native inhabitants before any resettlement.',
        },
      },
      {
        id: 'det-2',
        excerpt: {
          kz: '«Білім ордаларының есігі кімге де болса ашық һәм ақысыз болу; жұртқа жалпы оқу жайылу; бастауыш мектептерде ана тілінде оқу...»',
          en: '"Doors of educational institutions shall be open to all and free of charge; primary schools shall teach in the mother tongue..."',
        },
        source: {
          kz: 'Дереккөз: «Алаш» партиясы бағдарламасының жобасы, IX тарау («Қазақ», №251, 1917 ж.)',
          en: 'Source: Draft Program of the Alash Party, Chapter IX ("Qazaq", No. 251, 1917)',
        },
        options: [
          { id: 'tax', label: { kz: 'Салық саясаты', en: 'Taxation Policy' } },
          { id: 'edu', label: { kz: 'Білім және тіл', en: 'Education & Language' } },
          { id: 'autonomy', label: { kz: 'Сыртқы дипломатия', en: 'Foreign Diplomacy' } },
          { id: 'land', label: { kz: 'Жер реформасы', en: 'Agrarian Land Reform' } },
        ],
        correctDomainId: 'edu',
        explanation: {
          kz: 'Дұрыс! IX тарау («Ғылым-білім үйрету») тегін білім беру мен ана тіліндегі бастауыш мектепті заңдастыруды ұсынды.',
          en: 'Correct! Chapter IX mandated universal, tuition-free education starting in the student\'s native language.',
        },
      },
      {
        id: 'det-3',
        excerpt: {
          kz: '«Қазақ жүрген облыстардың бәрі бір байланып, өз тізгіні өзінде болып, Ресей республикасының федерациялық бір ағзасы болу.»',
          en: '"All regions inhabited by Kazakhs shall unite with self-governance in their own hands as an autonomous constituent member of a federative republic."',
        },
        source: {
          kz: 'Дереккөз: «Алаш» партиясы бағдарламасының жобасы, II тарау («Қазақ», №251, 1917 ж.)',
          en: 'Source: Draft Program of the Alash Party, Chapter II ("Qazaq", No. 251, 1917)',
        },
        options: [
          { id: 'press', label: { kz: 'Баспахана ісі', en: 'Printing Regulation' } },
          { id: 'autonomy', label: { kz: 'Саяси автономия және өзін-өзі басқару', en: 'Political Autonomy & Self-Governance' } },
          { id: 'labor', label: { kz: 'Жұмысшылар еңбегі', en: 'Industrial Labor Code' } },
          { id: 'edu', label: { kz: 'Әліпби реформасы', en: 'Orthographic Reform' } },
        ],
        correctDomainId: 'autonomy',
        explanation: {
          kz: 'Дұрыс! II тарау («Жергілікті бостандық») ұлттық-аумақтық автономия мен өзін-өзі басқару қағидатын белгіледі.',
          en: 'Correct! Chapter II established the constitutional principle of national-territorial autonomy.',
        },
      },
    ],
  },
  {
    id: 4,
    badgeKey: 'press_reviewer',
    badgeTitle: {
      kz: 'Баспасөз шолушысы',
      en: 'Press Reviewer',
    },
    badgeDesc: {
      kz: '«Айқап» пен «Қазақ» басылымдарының ортақ мұраты мен ерекшеліктерін ажырата білгені үшін',
      en: 'Awarded for distinguishing the shared mission and editorial nuances of Aiqap and Qazaq',
    },
    title: {
      kz: 'Миссия 4 — «Газет редакторы»',
      en: 'Mission 4 — "The Newspaper Editor"',
    },
    objective: {
      kz: 'Төмендегі төрт деректі не тақырыпты оның қай басылымға («Айқап», «Қазақ» немесе «Екі басылымға да ортақ») тән екеніне қарай белгілеңіз.',
      en: 'Assign each editorial position or publication fact to "Aiqap", "Qazaq", or "Shared by Both Periodicals".',
    },
    hint: {
      kz: 'Ишара: Троицкіде шығып, отырықшы кент салуды белсенді жақтаған — «Айқап»; Орынборда шығып, 1917 ж. Алаш бағдарламасын жариялаған — «Қазақ»; ал оқу-ағарту мен әйел теңдігін екі басылым да көтерді.',
      en: 'Hint: Troitsk & settled township norms belong to "Aiqap"; Orenburg & the 1917 Alash Program belong to "Qazaq"; modern schooling and women\'s rights were championed by both.',
    },
    type: 'editor',
    points: 10,
    editorItems: [
      {
        id: 'ed-1',
        headline: {
          kz: '1911–1915 жж. Троицк қаласында М. Сералиннің редакторлығымен шығып, құнарлы жерді сақтау үшін қала-кент салып отырықшылануды ұсынды.',
          en: 'Published in Troitsk (1911–1915) under M. Seralin, advocating settled townships as a legal defense of fertile lands.',
        },
        correctTarget: 'aiqap',
        explanation: {
          kz: 'Бұл — Троицкіде шыққан «Айқап» журналының (1911–1915) тарихи дерегі мен ұстанымы.',
          en: 'This describes "Aiqap" magazine (Troitsk, 1911–1915) edited by Mukhamedjan Seralin.',
        },
      },
      {
        id: 'ed-2',
        headline: {
          kz: '1913 ж. 2 ақпаннан Орынборда А. Байтұрсынұлының редакторлығымен шығып, 1917 жылы «Алаш» партиясы бағдарламасының жобасын жариялады.',
          en: 'Published in Orenburg from Feb 2, 1913 under A. Baitursynuly, and printed the 1917 Draft Program of the Alash Party.',
        },
        correctTarget: 'qazaq',
        explanation: {
          kz: 'Бұл — Орынборда жарық көрген жалпыұлттық «Қазақ» газеті (1913–1918).',
          en: 'This describes the Orenburg newspaper "Qazaq" (1913–1918).',
        },
      },
      {
        id: 'ed-3',
        headline: {
          kz: 'Халықты сауаттандыруды, ана тілінде мектеп ашуды, қыз балаларды оқытуды және әйел теңдігін жүйелі түрде насихаттады.',
          en: 'Consistently championed mass literacy, mother-tongue schooling, girls\' education, and women\'s equality.',
        },
        correctTarget: 'both',
        explanation: {
          kz: 'Оқу-ағарту, тіл және әйел теңдігі — «Айқап» пен «Қазақты» біріктірген ең басты ортақ құндылықтар.',
          en: 'Literacy, native-language schooling, and women\'s rights united both periodicals in a shared enlightenment mission.',
        },
      },
      {
        id: 'ed-4',
        headline: {
          kz: 'Қазақ даласының табиғи жағдайында шағын егістік нормасы миллиондаған десятина жайылымнан айыратынын ескертіп, мал шаруашылығы нормасын қорғады.',
          en: 'Warned using agronomic statistics that small peasant plot norms would forfeit vast pastures, defending pastoral land norms.',
        },
        correctTarget: 'qazaq',
        explanation: {
          kz: 'Бұл ұстанымды Әлихан Бөкейхан мен «Қазақ» газеті авторлары ғылыми есептермен негіздеді.',
          en: 'Alikhan Bokeikhan and contributors to "Qazaq" advanced this statistical defense of steppe pastoral land norms.',
        },
      },
    ],
    editorSynthesis: {
      kz: 'Тарихи түйін: «Айқап» пен «Қазақ» басылымдарын бір-біріне қарсы екі лагерь деп қарау дұрыс емес. Екеуі де ұлттың білімін, тілін, жерін және теңдігін қорғады; тек жерді заңдастыру мен съезд шақыру тактикасында пікір алуандығы болды.',
      en: 'Historical Takeaway: "Aiqap" and "Qazaq" were not hostile camps — both served national enlightenment, language, and land defense, differing constructively on tactical paths.',
    },
  },
  {
    id: 5,
    badgeKey: 'alash_scholar',
    badgeTitle: {
      kz: 'Алаш мұрасын зерттеуші',
      en: 'Alash Heritage Explorer',
    },
    badgeDesc: {
      kz: 'Күрделі тарихи ахуалдағы зиялылар шешімінің мәнін терең түсінгені үшін',
      en: 'Awarded for grasping the nuanced historical reasoning behind early 20th-century decisions',
    },
    title: {
      kz: 'Миссия 5 — «Тарихи шешім»',
      en: 'Mission 5 — "Historical Decision"',
    },
    objective: {
      kz: '1916 жылғы күрделі тарихи жағдайды талдап, зиялылардың бір бөлігі ұстанған саяси шешімнің негізгі себебін анықтаңыз.',
      en: 'Analyze the 1916 historical crisis and identify the primary motivation behind the moderate intelligentsia\'s counsel.',
    },
    hint: {
      kz: 'Ишара: Зеңбірек пен пулеметпен қаруланған патшаның жазалаушы әскеріне қарсы қарусыз шыққан бейбіт ауылдарға қандай қауіп төнетінін ойлаңыз.',
      en: 'Hint: Consider what happened when unarmed pastoral communities confronted imperial regiments armed with artillery and machine guns.',
    },
    type: 'dilemma',
    points: 10,
    dilemma: {
      context: {
        kz: '1916 жылғы 25 маусым жарлығынан кейін ел ішінде үлкен наразылық пен көтеріліс туды. Қазақ зиялыларының көзқарастары біркелкі болған жоқ, алайда Ә. Бөкейхан, А. Байтұрсынұлы, М. Дулатұлы бастаған топ халықты қарусыз қақтығыстан сақтандыруға шақырды.',
        en: 'After the Tsar\'s June 25, 1916 labor-conscription decree sparked widespread fury, Kazakh intellectuals held diverse views; leaders including Bokeikhan, Baitursynuly, and Dulatuly urged avoiding unarmed military clashes.',
      },
      question: {
        kz: 'Мұндай ұстанымның басты тарихи себебі қандай болды?',
        en: 'What was the primary reason behind this stance?',
      },
      options: [
        {
          kz: 'Отарлық әкімшіліктің жер саясатын толық құптау',
          en: 'Unconditional endorsement of colonial agrarian administration',
        },
        {
          kz: 'Қарусыз халықты жазалаушы әскердің жаппай қырғынынан аман сақтап қалу',
          en: 'Protecting an unarmed population from mass slaughter by punitive military expeditions',
        },
        {
          kz: 'Қоғамдық-саяси қызметтен біржола бас тарту',
          en: 'Withdrawing permanently from civic and political engagement',
        },
        {
          kz: 'Ана тіліндегі мектептер мен газетті жабу',
          en: 'Closing vernacular schools and newspapers',
        },
      ],
      correctIndex: 1,
      explanation: {
        kz: 'Дұрыс! Олар отарлық билікті жақтаған жоқ — керісінше, қарусыз елді жаппай қырғыннан қорғауды бірінші орынға қойды және кейін майданның тыл жұмысындағы қазақ жігіттеріне көмектесу үшін Минскіде Земгор бөлімін ұйымдастырды. Сонымен қатар тарихта зиялылардың барлығы біркелкі ойламағанын, кейбір қайраткерлердің халық көтерілісімен бірге болғанын да ескеру маңызды.',
        en: 'Correct! Far from supporting colonial rule, they sought to shield unarmed civilians from devastating military reprisals — and subsequently traveled to the Western Front to organize medical and legal protection for drafted laborers, while other figures supported direct popular resistance.',
      },
    },
  },
];

