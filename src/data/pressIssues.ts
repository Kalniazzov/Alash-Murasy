import { PressPublication, PressArticle } from './types';

export const PRESS_PUBLICATIONS: PressPublication[] = [
  {
    id: 'aiqap',
    title: {
      kz: '«Айқап» журналы',
      en: '"Aiqap" Magazine',
    },
    subtitle: {
      kz: 'Қазақтың тұңғыш қоғамдық-саяси және әдеби журналы',
      en: 'First Kazakh Socio-Political and Literary Periodical',
    },
    years: '1911–1915',
    city: {
      kz: 'Троицк қаласы',
      en: 'Troitsk',
    },
    editor: {
      kz: 'Мұхамеджан Сералин',
      en: 'Mukhamedjan Seralin',
    },
    keyAuthors: {
      kz: 'М. Сералин, С. Торайғыров, Б. Қаратаев, С. Дөнентаев, Ж. Сейдалин',
      en: 'M. Seralin, S. Toraighyrov, B. Karataev, S. Donentaev, Zh. Seidalin',
    },
    issuesCount: {
      kz: '88 сан жарық көрді',
      en: '88 issues published',
    },
    description: {
      kz: '«Айқап» журналы қазақ ағартушылық баспасөзінің іргелі мінберіне айналды. Оқу-білім, жерді қорғау үшін отырықшылыққа көшу, әйел теңдігі, әдебиет пен шаруашылық мәселелерін жүйелі көтерді.',
      en: '"Aiqap" served as a foundational forum of Kazakh enlightenment journalism, addressing modern education, settled agriculture for land protection, women\'s equality, literature, and economic reform.',
    },
    nameOrigin: {
      kz: '«Әттеген-ай, қапы қалдық!» деген тіркестен шыққан атау — елді өкініштен іске, білімге ояту ұраны.',
      en: 'Derived from the Kazakh expression "Ah, what an opportunity missed!" — calling society from regret to education and action.',
    },
    coreTopics: {
      kz: [
        'Отырықшылық пен егіншілік мәдениеті',
        'Жаңа әдісті мектептер мен оқу ісі',
        'Қыз балаларды оқыту және әйел теңдігі',
        'Ұлттық әдебиет пен тіл тазалығы',
      ],
      en: [
        'Transition to settled agriculture and land tenure',
        'Modern Jadid schooling and literacy',
        'Girls\' education and women\'s legal rights',
        'National literature and linguistic revival',
      ],
    },
    archivalNote: {
      kz: 'Архивтік транскрипция және тарихи шолу (түпнұсқа беттері араб графикасымен басылған).',
      en: 'Archival text reconstruction and commentary (originally printed in reformed Arabic script).',
    },
  },
  {
    id: 'qazaq',
    title: {
      kz: '«Қазақ» газеті',
      en: '"Qazaq" Newspaper',
    },
    subtitle: {
      kz: 'Жалпыұлттық қоғамдық-саяси және ғылыми-әдеби газет',
      en: 'All-National Socio-Political, Scientific, and Literary Newspaper',
    },
    years: '1913–1918',
    city: {
      kz: 'Орынбор қаласы (алғашқы саны: 1913 ж. 2 ақпан)',
      en: 'Orenburg (premiere issue: February 2, 1913)',
    },
    editor: {
      kz: 'Ахмет Байтұрсынұлы (кейін Жанұзақ Жәнібеков)',
      en: 'Akhmet Baitursynuly (later Zhanuzak Zhanibekov)',
    },
    keyAuthors: {
      kz: 'Ә. Бөкейхан («Қыр баласы»), А. Байтұрсынұлы, М. Дулатұлы («Мадияр»), М. Жұмабаев, Х. Досмұхамедов',
      en: 'A. Bokeikhan ("Qyr balasy"), A. Baitursynuly, M. Dulatuly ("Madiyar"), M. Zhumabaev, Kh. Dosmukhamedov',
    },
    issuesCount: {
      kz: '265-тен астам сан, таралымы 3 000–8 000 данаға жетті',
      en: 'Over 265 issues, reaching 3,000–8,000 circulation',
    },
    description: {
      kz: '«Қазақ» газеті бүкіл қазақ даласын ортақ ақпараттық-саяси кеңістікке біріктірді. Ұлттық мүдде, жер тұтастығы, ана тілінде білім беру, құқық және өзін-өзі басқару идеяларының басты мінбері болды.',
      en: '"Qazaq" united the entire Kazakh steppe into a single civic information sphere, championing land integrity, vernacular schooling, rule of law, and national autonomy.',
    },
    nameOrigin: {
      kz: 'Отарлық әкімшілік қолданған «киргиз» атауына қарсы халықтың төл тарихи «Қазақ» есімін ту етті.',
      en: 'Reclaimed the authentic historical ethnonym "Qazaq" against the colonial administrative misnomer "Kirghiz".',
    },
    coreTopics: {
      kz: [
        'Жер мәселесі және қоныс аудару саясатына талдау',
        'Төте жазу, оқулықтар және ана тіліндегі мектеп',
        'Құқықтық мемлекет, земство және ұлттық автономия',
        'Демография, шаруашылық және халықаралық саясат',
      ],
      en: [
        'Steppe land defense and critique of colonial resettlement',
        'Tote Jazu script reform and mother-tongue schools',
        'Constitutionalism, zemstvo self-rule, and autonomy',
        'Demographics, economics, and international affairs',
      ],
    },
    archivalNote: {
      kz: 'Архивтік мәтін үзінділері мен қазіргі тілдегі ғылыми түсіндірмесі.',
      en: 'Verified archival excerpts accompanied by plain-language historical commentary.',
    },
  },
];

export const ALLIED_PERIODICALS = [
  {
    id: 'saryarqa',
    title: { kz: '«Сарыарқа» (1917–1919)', en: '"Saryarqa" (1917–1919)' },
    city: { kz: 'Семей (Алаш-қала)', en: 'Semey (Alash-qala)' },
    note: {
      kz: 'Р. Мәрсеков, Х. Ғаббасов, Ж. Аймауытов шығарған Алаш автономиясының шығыс өңірлік мінбері.',
      en: 'Edited by R. Marsekov, Kh. Gabbasov, and Zh. Aimauytov in Semey supporting Alash autonomy.',
    },
  },
  {
    id: 'birlik-tuy',
    title: { kz: '«Бірлік туы» (1917–1918)', en: '"Birlik Tuy" (1917–1918)' },
    city: { kz: 'Ташкент', en: 'Tashkent' },
    note: {
      kz: 'М. Шоқай, С. Қожанов, Х. Болғанбаев шығарған Түркістан өлкесіндегі ұлттық бірлік газеті.',
      en: 'Founded by M. Shokai, S. Kozhanov, and Kh. Bolganbaev voicing Turkestan regional unity.',
    },
  },
  {
    id: 'uran',
    title: { kz: '«Ұран» (1917–1918)', en: '"Uran" (1917–1918)' },
    city: { kz: 'Орда (Бөкей ордасы)', en: 'Orda (Bukei Horde)' },
    note: {
      kz: 'Ғ. Қараш пен Ғ. Мұсағалиев қатысқан Батыс өңірдегі қоғамдық-ағартушылық газет.',
      en: 'Western regional civic newspaper featuring Gumar Karash and Gabdolgazi Musagaliev.',
    },
  },
  {
    id: 'abai',
    title: { kz: '«Абай» журналы (1918)', en: '"Abai" Magazine (1918)' },
    city: { kz: 'Семей', en: 'Semey' },
    note: {
      kz: 'Ж. Аймауытов пен М. Әуезов шығарған ғылыми-әдеби және философиялық журнал.',
      en: 'Literary-philosophical journal founded by Zh. Aimauytov and M. Auezov in Semey.',
    },
  },
];

export const PRESS_ARTICLES: PressArticle[] = [
  {
    id: 'qazaq-1913-1-purpose',
    publication: 'qazaq',
    issueNumber: '№ 1',
    date: { kz: '1913 ж. 2 ақпан', en: 'February 2, 1913' },
    title: {
      kz: 'Құрметті оқушылар! (Бас мақала)',
      en: 'Dear Readers! (Inaugural Editorial)',
    },
    author: {
      kz: 'Ахмет Байтұрсынұлы',
      en: 'Akhmet Baitursynuly',
    },
    theme: 'language',
    originalExcerpt: {
      kz: '«Газет — халықтың көзі, құлағы һәм тілі. Адамға көз, құлақ, тіл қандай керек болса, халыққа газет сондай керек. Газеті жоқ жұрт басқа газеті бар жұрттардың қасында құлағы жоқ керең, тілі жоқ мақау, көзі жоқ соқыр сықылды.»',
      en: '"A newspaper is the eyes, ears, and tongue of the people. Just as an individual needs sight, hearing, and speech, so too does a nation require a press. Without its own press, a nation stands deaf, mute, and blind beside nations that possess newspapers."',
    },
    modernExplanation: {
      kz: 'Автор ұлттық баспасөзді жай жаңалық таратушы емес, бүкіл халықтың құқығын қорғайтын, аймақтарды біріктіретін және қоғамдық сананы қалыптастыратын өмірлік қажетті институт ретінде негіздеді.',
      en: 'Baitursynuly defines national journalism not merely as news reporting, but as a vital civic institution enabling collective awareness, legal self-defense, and cultural survival.',
    },
    historicalNote: {
      kz: 'Орынборда шыққан алғашқы санның бағдарламалық мақаласы.',
      en: 'Programmatic opening editorial of the premiere Orenburg issue.',
    },
    sourceCitation: {
      kz: '«Қазақ» газеті, 1913 ж., №1 (жинақ басылымы, Алматы, 1998)',
      en: '"Qazaq" Newspaper, 1913, Issue No. 1 (Academic Anthology, Almaty, 1998)',
    },
  },
  {
    id: 'aiqap-1911-1-awakening',
    publication: 'aiqap',
    issueNumber: '№ 1',
    date: { kz: '1911 ж. қаңтар', en: 'January 1911' },
    title: {
      kz: 'Біздің мақсатымыз (Редакциялық үндеу)',
      en: 'Our Purpose (Editorial Statement)',
    },
    author: {
      kz: 'Мұхамеджан Сералин',
      en: 'Mukhamedjan Seralin',
    },
    theme: 'education',
    originalExcerpt: {
      kz: '«Біздің қазақ жұртының артта қалуының зор себебі — оқу-өнердің аздығы һәм ынтымақтың кемдігі. Заман өзгерді: енді білімсіз жұрт өз жеріне де, өз теңдігіне де ие бола алмайды.»',
      en: '"The principal reason our Kazakh society lags behind lies in the scarcity of modern schooling and lack of unity. Times have transformed: an uneducated people can safeguard neither its ancestral land nor its civic equality."',
    },
    modernExplanation: {
      kz: 'Мұхамеджан Сералин журналдың алғашқы санында-ақ заманауи мектеп ашу, ғылым-білім үйрену және қоғамдық мәселелерді ашық талқылау арқылы елді жаңғырту бағдарламасын ұсынды.',
      en: 'In the premiere issue of Aiqap, Seralin sets out a modernization agenda centered on mass schooling, practical knowledge, and open public debate.',
    },
    historicalNote: {
      kz: 'Троицк қаласында шыққан тұңғыш қазақ журналының беташар сөзі.',
      en: 'Opening statement of the first Kazakh magazine printed in Troitsk.',
    },
    sourceCitation: {
      kz: '«Айқап» журналы, 1911 ж., №1 (құраст. Ү. Субханбердина, Алматы, 1995)',
      en: '"Aiqap" Magazine, 1911, No. 1 (Ed. U. Subkhanberdina, Almaty, 1995)',
    },
  },
  {
    id: 'aiqap-1911-3-land',
    publication: 'aiqap',
    issueNumber: '№ 3',
    date: { kz: '1911 ж. наурыз', en: 'March 1911' },
    title: {
      kz: 'Жер және отырықшылық мәселесі',
      en: 'The Question of Land and Settlement',
    },
    author: {
      kz: 'Мұхамеджан Сералин',
      en: 'Mukhamedjan Seralin',
    },
    theme: 'land',
    originalExcerpt: {
      kz: '«Құнарлы жерлеріміз «артық жер» деген атпен қоныс аударушыларға өтіп жатыр. Егер біз қала-кент салып, егіншілік нормасымен құнарлы қоныстарды өз атымызға бекітіп алмасақ, ертең шөл далаға ығысамыз.»',
      en: '"Our fertile pastures are being classified as \'surplus land\' and transferred to settlers. Unless we establish permanent towns and legally register fertile tracts under settled norms, tomorrow we shall be pushed into barren desert."',
    },
    modernExplanation: {
      kz: '«Айқап» тобы патшалық заң аясында құнарлы жерді сақтап қалудың жолы ретінде отырықшы елді мекендер құрып, егіншілік үлесін ресми бекітуді ұсынды.',
      en: 'The Aiqap circle argued for registering settled townships under imperial agrarian statutes as a pragmatic legal shield to keep fertile land in Kazakh hands.',
    },
    historicalNote: {
      kz: 'Жерді сақтау тактикасы бойынша «Айқап» пен «Қазақ» арасындағы ғылыми пікірталастың өзекті тақырыбы.',
      en: 'Part of the constructive strategic debate between Aiqap and Qazaq on how best to defend Kazakh land.',
    },
    sourceCitation: {
      kz: '«Айқап» журналы, 1911 ж., №3',
      en: '"Aiqap" Magazine, 1911, No. 3',
    },
  },
  {
    id: 'qazaq-1913-land-debate',
    publication: 'qazaq',
    issueNumber: '№ 14',
    date: { kz: '1913 ж. мамыр', en: 'May 1913' },
    title: {
      kz: 'Жер шаруашылығы және қазақ тұрмысы',
      en: 'Land Economy and Steppe Livelihoods',
    },
    author: {
      kz: 'Әлихан Бөкейхан («Қыр баласы»)',
      en: 'Alikhan Bokeikhan ("Qyr balasy")',
    },
    theme: 'land',
    originalExcerpt: {
      kz: '«Қазақ даласының табиғаты мен топырағы мал шаруашылығына негізделген. Бір отбасына 15 десятина егістік нормасын таңу — миллиондаған десятина жайылымды қазынаға тартып алудың амалы. Қазаққа мал шаруашылығы нормасымен кең жер берілуі тиіс.»',
      en: '"The ecology and soil of the Kazakh steppe are suited to pastoralism. Imposing a 15-desyatina peasant plot norm is a pretext to confiscate millions of acres of pasture. Kazakhs must retain land norms commensurate with livestock husbandry."',
    },
    modernExplanation: {
      kz: 'Экономист Әлихан Бөкейхан дала климатын ғылыми есеппен дәлелдеп, шағын егістік үлесіне жаппай көшу қазақтың кең жайылымнан айырылуына әкелетінін ескертті. Екі басылым да жерді қорғауды көздеді, бірақ экономикалық тәсілдерді әр қырынан талдады.',
      en: 'Using agronomic data from the Shcherbina expedition, Bokeikhan warned that accepting small peasant land norms in arid zones would forfeit vast ancestral pastures — illustrating how both papers defended Kazakh land through different economic strategies.',
    },
    historicalNote: {
      kz: 'Щербина экспедициясының статистикалық деректеріне сүйенген экономикалық талдау.',
      en: 'Economic analysis grounded in statistical surveys of the Steppe region.',
    },
    sourceCitation: {
      kz: '«Қазақ» газеті, 1913 ж., Ә. Бөкейхан шығармалар жинағы',
      en: '"Qazaq" Newspaper, 1913; Collected Works of A. Bokeikhan',
    },
  },
  {
    id: 'aiqap-1912-women',
    publication: 'aiqap',
    issueNumber: '№ 9',
    date: { kz: '1912 ж. қыркүйек', en: 'September 1912' },
    title: {
      kz: 'Қазақ қыздарын оқыту және әйел теңдігі',
      en: 'Educating Kazakh Girls and Women\'s Equality',
    },
    author: {
      kz: 'Сақыпжамал Тілеубайқызы / Редакция шолуы',
      en: 'Sakhypzhamal Tileubaikyzy / Editorial Review',
    },
    theme: 'women',
    originalExcerpt: {
      kz: '«Ұлттың тәрбиешісі — ана. Қыз баланы оқытпай, қалыңмалға матап беру — халықтың жартысын теңдіктен айыру. Мектеп есігі ұл мен қызға бірдей ашық болуы керек.»',
      en: '"The mother is the first educator of the nation. Denying girls schooling and binding them through forced bride-price deprives half the nation of dignity. School doors must open equally to sons and daughters."',
    },
    modernExplanation: {
      kz: 'Журнал бетінде қазақ қыздары мен мұғалімдерінің өз хаттары жарияланып, еріксіз неке мен қалыңмалға тыйым салу, қыздарға арналған мектеп ашу мәселесі алғаш рет қоғамдық деңгейде көтерілді.',
      en: 'Aiqap published letters by Kazakh women teachers themselves, pioneering public advocacy against forced marriage and campaigning for girls\' education.',
    },
    historicalNote: {
      kz: 'Қазақ баспасөзіндегі әйел авторлардың алғашқы мақалаларының бірі.',
      en: 'Among the earliest contributions by Kazakh women educators in the national press.',
    },
    sourceCitation: {
      kz: '«Айқап» журналы, 1912 ж., мақалалар жинағы',
      en: '"Aiqap" Magazine, 1912 anthology',
    },
  },
  {
    id: 'qazaq-1914-school',
    publication: 'qazaq',
    issueNumber: '№ 62',
    date: { kz: '1914 ж. мамыр', en: 'May 1914' },
    title: {
      kz: 'Бастауыш мектеп қандай болуы керек?',
      en: 'What Should the Primary School Be Like?',
    },
    author: {
      kz: 'Ахмет Байтұрсынұлы',
      en: 'Akhmet Baitursynuly',
    },
    theme: 'education',
    originalExcerpt: {
      kz: '«Бастауыш мектеп әуелі миссионерлік саясаттан азат болып, балаға өз ана тілінде білім беруі шарт. Бала алғашқы бес жылда ана тілімен ойлауды, жазуды, есепті еркін меңгергенде ғана ғылымға жол ашылады.»',
      en: '"Elementary schools must be free of missionary assimilation and instruct children first in their native tongue. Only when a child masters literacy, reasoning, and arithmetic in their mother language does genuine scholarship take root."',
    },
    modernExplanation: {
      kz: 'Байтұрсынұлы бастауыш білім берудің ұлттық моделін ұсынды: оқыту ана тілінде, қазақ дыбыс жүйесіне сай әліпбимен («Оқу құралы», «Тіл-құрал») жүргізілуі керек.',
      en: 'Baitursynuly outlines a pedagogical model rooted in mother-tongue primary education supported by phonetic Kazakh textbooks ("Oqu Quraly", "Til-Qural").',
    },
    historicalNote: {
      kz: 'Кейін 1917 жылғы Алаш бағдарламасының 9-бабына («Ғылым-білім») енген қағидат.',
      en: 'Directly shaped Article 9 ("Science & Education") of the 1917 Alash Party Program.',
    },
    sourceCitation: {
      kz: '«Қазақ» газеті, 1914 ж., №62; А. Байтұрсынұлы, «Ақ жол»',
      en: '"Qazaq" Newspaper, 1914, No. 62; A. Baitursynuly, "Aq Zhol"',
    },
  },
  {
    id: 'qazaq-1917-program',
    publication: 'qazaq',
    issueNumber: '№ 251',
    date: { kz: '1917 ж. 21 қараша', en: 'November 21, 1917' },
    title: {
      kz: '«Алаш» партиясы бағдарламасының жобасы',
      en: 'Draft Program of the "Alash" Party',
    },
    author: {
      kz: 'Ә. Бөкейхан, А. Байтұрсынұлы, М. Дулатұлы, Е. Омаров, Е. Тұрмұхамедов, Ғ. Жүндібаев, Ғ. Бірімжанов',
      en: 'A. Bokeikhan, A. Baitursynuly, M. Dulatuly, E. Omarov, E. Turmukhamedov, G. Zhundibaev, G. Birimzhanov',
    },
    theme: 'politics',
    originalExcerpt: {
      kz: '«1. Мемлекет қалпы: Ресей демократиялық, федеративтік республика болу. 2. Жергілікті бостандық: қазақ жүрген облыстардың бәрі бір байланып, өз тізгіні өзінде болып, Ресей республикасының федерациялық бір ағзасы болу... Дінге, қанға қарамай, еркек-әйел демей адам баласы тең болу.»',
      en: '"1. Form of State: Russia shall be a democratic federative republic. 2. Local Autonomy: All Kazakh regions shall unite into an autonomous self-governing constituent unit... All citizens shall be equal before the law regardless of religion, ethnicity, or gender."',
    },
    modernExplanation: {
      kz: '10 баптан тұратын бұл тарихи құжатта демократиялық федерация, ұлттық автономия, сөз бен баспасөз еркіндігі, діннің мемлекеттен бөлінуі, тәуелсіз сот, прогрессивті салық және тегін білім беру бекітілді.',
      en: 'This landmark 10-article constitutional platform codified federative democracy, territorial autonomy, universal civil equality, secular governance, fair taxation, and free mother-tongue education.',
    },
    historicalNote: {
      kz: 'Екінші жалпықазақ съезі қарсаңында бүкілхалықтық талқылауға ұсынылған саяси тұғырнама.',
      en: 'Published ahead of the Second All-Kazakh Congress as the constitutional blueprint of Alash.',
    },
    sourceCitation: {
      kz: '«Қазақ» газеті, 1917 жылғы 21 қараша, №251',
      en: '"Qazaq" Newspaper, November 21, 1917, Issue No. 251',
    },
  },
  {
    id: 'aiqap-1914-language',
    publication: 'aiqap',
    issueNumber: '№ 14',
    date: { kz: '1914 ж. шілде', en: 'July 1914' },
    title: {
      kz: 'Қазақ тілі және әдебиет өрісі',
      en: 'The Kazakh Language and Literary Horizon',
    },
    author: {
      kz: 'Сұлтанмахмұт Торайғыров',
      en: 'Sultanmakhmut Toraighyrov',
    },
    theme: 'language',
    originalExcerpt: {
      kz: '«Ана тілі қайнаған қанның, қиналған жанның, толғантқан көңілдің, соққан жүректің сығындысы. Тілімізді шұбарламай, ғылым мен мектеп тіліне айналдыру — жас буынның парызы.»',
      en: '"Our mother tongue is the distillation of vibrant lifeblood, yearning spirit, and beating heart. Preserving its clarity while elevating it into a language of scholarship and schooling is the duty of the rising generation."',
    },
    modernExplanation: {
      kz: 'Жас ақын әрі публицист С. Торайғыров «Айқап» редакциясында қызмет ете жүріп, қазақ әдеби тілін бөгде қоспалардан тазарту мен ғылыми стиль қалыптастыруды жақтады.',
      en: 'Writing as editorial secretary at Aiqap, Toraighyrov championed preserving pure vernacular Kazakh while developing modern literary and academic terminology.',
    },
    historicalNote: {
      kz: 'С. Торайғыров 1913–1914 жылдары «Айқап» журналының жауапты хатшысы болды.',
      en: 'Toraighyrov served on Aiqap\'s editorial desk in Troitsk during 1913–1914.',
    },
    sourceCitation: {
      kz: '«Айқап» журналы, 1914 ж.; С. Торайғыров шығармалары',
      en: '"Aiqap" Magazine, 1914; Collected Works of S. Toraighyrov',
    },
  },
];

