import { TimelineEvent } from './types';

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'karkaraly-petition-1905',
    year: 1905,
    month: '07',
    dateStr: {
      kz: '1905 жылғы 22 шілде',
      en: 'July 22, 1905'
    },
    title: {
      kz: 'Қарқаралы петициясы',
      en: 'The Karkaraly Petition'
    },
    summary: {
      kz: 'Қоянды жәрмеңкесінде 14 500-ден астам қазақ қол қойған, Ресей патшасына жолданған тұңғыш жаппай саяси талап-арыз.',
      en: 'A historic petition signed by over 14,500 Kazakhs at the Koyandy Fair submitted to Tsar Nicholas II, articulating civic rights.'
    },
    details: {
      kz: '1905 жылғы жазда Қарқаралы уезіндегі атақты Қоянды (Ботов) жәрмеңкесінде қазақ зиялылары Әлихан Бөкейханов, Ахмет Байтұрсынұлы және Жақып Ақбаевтың ұйымдастыруымен патша II Николайдың атына петиция әзірленді. Құжатқа 14 500 адам қол қойып, телеграф арқылы Санкт-Петербургке жолданды. Петицияда қазақ даласына қоныс аударушыларды тоқтату және қазақ жерінің байырғы меншігін бекіту, ана тілінде оқытатын мектептер ашу, діни сенім бостандығы (мүфтият құру), цензурасыз қазақ баспасөзіне рұқсат беру, отарлық сот жүйесін реформалап қазақ тілінде іс жүргізу талаптары батыл қойылды.',
      en: 'In July 1905 at the renowned Koyandy (Botov) Fair near Karkaraly, leading intellectuals Alikhan Bokeikhanov, Akhmet Baitursynov, and Zhaqyp Aqbaev drafted a monumental petition addressed to Tsar Nicholas II. Signed by over 14,500 citizens and cabled directly to St. Petersburg, the petition demanded an immediate halt to imperial peasant resettlement and legal recognition of Kazakh ancestral land rights. It also advocated for native-language primary education, religious autonomy through an independent muftiate, freedom of the Kazakh-language press without pre-censorship, and judicial reform introducing local jury courts operating in the vernacular tongue.'
    },
    significance: {
      kz: 'Қазақ зиялыларының ұйымдасқан алғашқы бүкілхалықтық саяси бастамасы. Ол қазақ қоғамындағы жеке наразылықтарды біртұтас ұлт-азаттық бағдарламаға айналдырды.',
      en: 'The first organized mass civic political mobilization in modern Kazakh history. It synthesized fragmented regional grievances into a cohesive national platform for democratic self-determination.'
    },
    location: {
      kz: 'Қоянды жәрмеңкесі, Қарқаралы уезі',
      en: 'Koyandy Fair, Karkaraly District'
    },
    figuresInvolved: ['bokeikhanov', 'baitursynov', 'aqbaev'],
    period: '1905-1907',
    image: '/images/events/karkaraly-petition.webp'
  },
  {
    id: 'first-muslim-congress-1905',
    year: 1905,
    month: '08',
    dateStr: {
      kz: '1905 жылғы 15 тамыз',
      en: 'August 15, 1905'
    },
    title: {
      kz: 'Ресей мұсылмандарының I съезі',
      en: '1st Muslim Congress of Russia'
    },
    summary: {
      kz: 'Нижний Новгородта өткен съезде «Иттифак әл-муслимин» одағы құрылып, қазақ өкілдері ортақ саяси майданға қосылды.',
      en: 'Conducted aboard a Volga steamship in Nizhny Novgorod, founding the "Ittifaq al-Muslimin" union with Kazakh intellectual participation.'
    },
    details: {
      kz: '1905 жылғы 15 тамызда Нижний Новгород қаласында, Макарьев жәрмеңкесі күндері Еділ өзеніндегі «Густав Струве» кемесінде жасырын түрде Бүкілресейлік мұсылмандардың I съезі өтті. Съезге Қырым, Кавказ, Еділ бойы, Сібір және Қазақ даласынан 120-дан астам делегат жиналды. Әлихан Бөкейханов бастаған қазақ өкілдері Исмаил Гаспринский, Әлімәрдан Топчибашев, Рашид Ибрагимов секілді тұлғалармен бірге «Иттифак әл-муслимин» (Бүкілресейлік мұсылман одағы) ұйымын құруға атсалысты. Съезд Ресей империясындағы мұсылман халықтарының діни, мәдени және саяси теңдігін, заң шығарушы органдардағы өкілдігін талап етті.',
      en: 'On August 15, 1905, during the Makaryev Fair in Nizhny Novgorod, over 120 delegates convened semi-clandestinely aboard the Volga steamer "Gustav Struve" for the First All-Russian Muslim Congress. Kazakh delegates led by Alikhan Bokeikhanov allied with reformist thinkers like Ismail Gasprinsky, Alimardan Topchibashev, and Rashid Ibragimov to establish the "Ittifaq al-Muslimin" (All-Russian Muslim Union). The congress resolved to unify empire-wide Muslim political demands, coordinate upcoming parliamentary campaigns, and secure proportional civic, educational, and religious self-governance rights.'
    },
    significance: {
      kz: 'Қазақ саяси элитасының империя көлеміндегі түркі-мұсылман зиялыларымен байланыс орнатып, жалпыресейлік саяси күреске бірлесе араласуының бастауы болды.',
      en: 'Marked the strategic integration of Kazakh reformers into the broader pan-imperial Muslim democratic coalition, laying the groundwork for parliamentary caucuses.'
    },
    location: {
      kz: 'Нижний Новгород, Еділ өзені',
      en: 'Nizhny Novgorod, Volga River'
    },
    figuresInvolved: ['bokeikhanov'],
    period: '1905-1907',
    image: '/images/events/muslim-congress.webp'
  },
  {
    id: 'first-state-duma-1906',
    year: 1906,
    month: '04',
    dateStr: {
      kz: '1906 жылғы сәуір – шілде',
      en: 'April – July 1906'
    },
    title: {
      kz: 'I Мемлекеттік Дума сайлауы және қазақ депутаттары',
      en: '1st State Duma Elections & Kazakh Deputies'
    },
    summary: {
      kz: 'Қазақ даласынан алғаш рет парламентке Ә. Бөкейханов, А. Бірімжанов, А. Қалменов секілді депутаттар сайланып, Выборг үндеуіне қол қойылды.',
      en: 'Kazakh representatives entered Russia\'s imperial parliament for the first time, co-signing the historic Vyborg Appeal after dissolution.'
    },
    details: {
      kz: '1905 жылғы 17 қазан манифесінен кейін Ресей тарихында алғаш рет парламенттік сайлау ұйымдастырылды. I Мемлекеттік Думаға Торғай, Семей, Орал және басқа облыстардан қазақ өкілдері: Әлихан Бөкейханов (Семейден), Ахмет Бірімжанов (Торғайдан), Алпысбай Қалменов (Оралдан), Салық Бабажанов (Бөкей ордасынан) сайланды. Әлихан Бөкейханов Дума жұмысына белсенді араласып, Кадеттер (Конституциялық-демократиялық) партиясының Орталық Комитетіне мүше болды. 1906 жылғы 8 шілдеде ІІ Николай Думаны күшпен таратқан кезде, Бөкейханов Петербордан Выборгке барып, патшаның шешіміне азаматтық бағынбауға шақырған атақты «Выборг үндеуіне» қол қойды және сол үшін үш ай Семей түрмесіне қамалды.',
      en: 'Following the 1905 October Manifesto, the Russian Empire held its first parliamentary elections. Kazakh representatives were democratically elected to the First State Duma, notably Alikhan Bokeikhanov (Semipalatinsk), Akhmet Birimzhanov (Torgay), Alpysbai Kalmenov (Uralsk), and Salyk Babazhanov (Bokey Horde). Bokeikhanov joined the Central Committee of the Constitutional Democratic (Kadet) Party and actively lobbied against imperial agrarian colonization. When Tsar Nicholas II abruptly dissolved the Duma on July 8, 1906, Bokeikhanov joined 180 deputies in Vyborg, Finland, co-signing the Vyborg Appeal advocating passive civil resistance, which later led to his three-month imprisonment.'
    },
    significance: {
      kz: 'Қазақ халқының мұң-мұқтажы мен жер дауы алғаш рет империяның жоғарғы мемлекеттік мінберінен заң тұрғысында жарияланды.',
      en: 'The Kazakh national question, specifically land expropriation and civil disenfranchisement, was officially raised on the imperial parliamentary stage.'
    },
    location: {
      kz: 'Санкт-Петербург, Таврия сарайы / Выборг',
      en: 'Saint Petersburg, Tauride Palace / Vyborg'
    },
    figuresInvolved: ['bokeikhanov'],
    period: '1905-1907',
    image: '/images/events/first-duma.webp'
  },
  {
    id: 'second-state-duma-1907',
    year: 1907,
    month: '02',
    dateStr: {
      kz: '1907 жылғы 20 ақпан – 3 маусым',
      en: 'February 20 – June 3, 1907'
    },
    title: {
      kz: 'II Мемлекеттік Дума және 3 маусым мемлекеттік төңкерісі',
      en: '2nd State Duma Elections & Third of June Coup'
    },
    summary: {
      kz: 'Б. Қаратаев пен М. Тынышбаев Думада қазақ жерлерін отарлау саясатын әшкереледі. Патша үкіметі Думаны таратып, сайлау заңын шектеді.',
      en: 'Deputies B. Karataev and M. Tynyshbaev exposed imperial resettlement policy before the Duma was dissolved and Kazakh suffrage revoked.'
    },
    details: {
      kz: '1907 жылғы ақпанда шақырылған II Мемлекеттік Думаға қазақ даласынан Бақытжан Қаратаев (Орал облысы), Мұхамеджан Тынышбаев (Жетісу облысы), Шаймерден Қосшығұлов (Ақмола), Темірғали Нұрекенов (Семей), Тілеулі Аллабергенов (Сырдария) секілді білікті өкілдер сайланды. Заңгер Бақытжан Қаратаев 1907 жылғы 16 мамырда Дума мінберінен сөйлеген тарихи сөзінде Столыпин үкіметінің қазақтарды шұрайлы атақоныстарынан қарудың күшімен қуып, шөл-шөлейттерге ығыстырып жатқан қатал отарлық саясатын бүкіл Ресейге паш етті. Алайда 1907 жылғы 3 маусымда патша үкіметі Думаны қуып таратып, сайлау заңын өз еркімен өзгерту арқылы қазақ халқын сайлау құқығынан түпкілікті айырды.',
      en: 'Convened in February 1907, the Second State Duma included prominent Kazakh deputies: jurist Bakhytzhan Karataev (Uralsk), railway engineer Mukhamedzhan Tynyshbaev (Semirechye), Shaimerden Kosshygylov (Akmola), and Temirgali Nurekenov (Semipalatinsk). On May 16, 1907, Karataev delivered a scathing, historically documented speech from the parliamentary rostrum, systematically exposing the Stolypin administration\'s brutal expropriation of prime nomadic pasturelands. Threatened by the radical Duma, Tsar Nicholas II executed the "Third of June Coup" on June 3, 1907, dissolving the assembly and unilaterally enacting a discriminatory electoral edict that completely disenfranchised the indigenous peoples of Central Asia and Kazakhstan.'
    },
    significance: {
      kz: 'Парламенттік заңды күрес жолының жабылуы қазақ зиялыларын халықты оятудың жаңа құралдарына — ұлттық баспасөз бен ағартушылыққа бет бұрғызды.',
      en: 'The abrupt closure of parliamentary avenues compelled Kazakh intellectuals to pivot toward independent journalism, civil publishing, and grassroots educational enlightenment.'
    },
    location: {
      kz: 'Санкт-Петербург, Таврия сарайы',
      en: 'Saint Petersburg, Tauride Palace'
    },
    figuresInvolved: ['karataev', 'tynyshbaev', 'bokeikhanov'],
    period: '1905-1907',
    image: '/images/events/second-duma.webp'
  },
  {
    id: 'aiqap-magazine-1911',
    year: 1911,
    month: '01',
    dateStr: {
      kz: '1911 жылғы қаңтар',
      en: 'January 1911'
    },
    title: {
      kz: '«Айқап» журналының жарық көруі',
      en: 'Founding of "Aiqap" Magazine in Troitsk'
    },
    summary: {
      kz: 'Троицк қаласында Мұхамеджан Сералиннің бастамасымен тұңғыш қоғамдық-саяси, әдеби қазақ журналы «Айқап» басылып шықты.',
      en: 'Launch of the first regular Kazakh socio-political and literary periodical in Troitsk under the editorial leadership of Mukhamedzhan Seralin.'
    },
    details: {
      kz: '1911 жылғы қаңтар айында Орынбор губерниясының Троицк қаласындағы «Энергия» баспаханасынан «Айқап» журналының алғашқы саны жарық көрді. Бас редакторы әрі негізін қалаушы — талантты ақын және көсемсөзші Мұхамеджан Сералин болды. Журналда Сұлтанмахмұт Торайғыров (жауапты хатшы қызметін атқарды), Міржақып Дулатұлы, Ахмет Байтұрсынұлы, Сәбит Дөнентаев, Бақытжан Қаратаев сынды қаламгерлер белсенді мақалалар жазды. «Айқап» қазақ даласында отырықшылыққа көшу, қалалар мен мектептер салу, жер телімдерін заңдастыру, өнер-білім тарату және әйелдердің тең құқықтылығы мәселелерін қызу көтерді.',
      en: 'In January 1911, the first issue of "Aiqap" was published at the "Energiya" press in Troitsk, Orenburg Governorate, founded and edited by prominent publicist Mukhamedzhan Seralin. The monthly journal quickly recruited brilliant literary figures, including Sultanmakhmut Toraighyrov (who served as editorial secretary), Mirzhakyp Dulatov, Sabit Donentaev, and Bakhytzhan Karataev. "Aiqap" championed agricultural modernization, sedentarization, municipal education, codification of private land plots, and emancipation of Muslim women, fostering spirited national intellectual discourse through 88 printed issues until 1915.'
    },
    significance: {
      kz: 'Қазақ тіліндегі мерзімді қоғамдық ойдың тұңғыш институционалдық мінбері болды және ағартушылық дискуссияның негізін қалады.',
      en: 'Established the first regular institutional platform for modern Kazakh public opinion, socio-economic debates, and civic reformism.'
    },
    location: {
      kz: 'Троицк қаласы',
      en: 'Troitsk'
    },
    figuresInvolved: ['toraighyrov', 'dulatov', 'baitursynov', 'karataev'],
    period: '1908-1916',
    image: '/images/events/aiqap-magazine.webp'
  },
  {
    id: 'qazaq-newspaper-1913',
    year: 1913,
    month: '02',
    dateStr: {
      kz: '1913 жылғы 2 ақпан',
      en: 'February 2, 1913'
    },
    title: {
      kz: '«Қазақ» газетінің алғашқы саны',
      en: 'Founding of "Qazaq" Newspaper in Orenburg'
    },
    summary: {
      kz: 'Орынборда Ахмет Байтұрсынұлы, Әлихан Бөкейханов және Міржақып Дулатұлының басшылығымен ұлттық көсемсөздің шыңы «Қазақ» газеті шықты.',
      en: 'Launch of the premier national socio-political newspaper "Qazaq" in Orenburg by A. Baitursynov, A. Bokeikhanov, and M. Dulatov.'
    },
    details: {
      kz: '1913 жылғы 2 ақпанда Орынборда «Қазақ» газетінің бірінші саны басылып шықты. Бас редакторы — Ахмет Байтұрсынұлы, оның орынбасары — Міржақып Дулатұлы, ал бас идеологы — Әлихан Бөкейханов («Қыр баласы» бүркеншік атымен) болды. Газет маңдайшасында шаңырағы күнге ашылған киіз үй бейнеленді. Басылым «Азамат» серіктестігі мен көзі ашық қазақ меценаттарының (Мұстафа Оразайұлы, т.б.) қаржылық демеуімен шықты. «Қазақ» газеті жерді жекеге бөлмей қауымдық меншікте сақтау, А. Байтұрсынұлының «Төте жазу» әліпбиін енгізу, отарлық езгіге қарсы рухани бірігу және ұлттық мемлекеттілікке дайындалу мәселелерін бүкіл қазақ даласына таратты.',
      en: 'On February 2, 1913, the landmark inaugural issue of "Qazaq" appeared in Orenburg. Edited by Akhmet Baitursynov with Mirzhakyp Dulatov as executive secretary and ideological direction from Alikhan Bokeikhanov (writing as "Kyr Balasy"), the paper bore the iconic emblem of a nomadic yurt welcoming the morning sun. Financed by progressive patrons and the "Azamat" publishing partnership, "Qazaq" reached thousands of readers across the Steppe. It spearheaded the defense of communal pasturelands, standardized vernacular literacy via Baitursynov\'s reformed Arabic script ("Tote Jazu"), and became the direct ideological engine of the Alash national movement.'
    },
    significance: {
      kz: 'Бүкіл қазақ зиялыларын бір идеялық тудың астына біріктіріп, 1917 жылғы «Алаш» партиясы мен үкіметінің бағдарламасын қалыптастырған бас газет болды.',
      en: 'The paramount ideological and journalistic beacon of the era, which unified Kazakh intellectuals and laid the philosophical blueprint for the Alash Autonomy.'
    },
    location: {
      kz: 'Орынбор қаласы',
      en: 'Orenburg'
    },
    figuresInvolved: ['baitursynov', 'bokeikhanov', 'dulatov'],
    period: '1908-1916',
    image: '/images/events/qazaq-newspaper.webp'
  },
  {
    id: 'military-draft-decree-1916',
    year: 1916,
    month: '06',
    dateStr: {
      kz: '1916 жылғы 25 маусым',
      en: 'June 25, 1916'
    },
    title: {
      kz: '25 маусым жарлығы және Алаш зиялыларының ұстанымы',
      en: 'Tsarist Draft Decree & Alash Intellectuals\' Position'
    },
    summary: {
      kz: 'Патшаның бұратана халықтарды тыл жұмысына шақыру жарлығы көтеріліске түрткі болды; Алаш жетекшілері халықты қырғыннан сақтауға күш салды.',
      en: 'Imperial decree drafting Central Asians into frontline rear-labor sparked mass revolt; Alash leaders acted strategically to prevent genocide.'
    },
    details: {
      kz: '1916 жылғы 25 маусымда Ресей патшасы II Николай Бірінші дүниежүзілік соғыс майдандарында қорғаныс бекіністерін салу үшін Орта Азия мен Қазақстанның 19-дан 43 жасқа дейінгі ер азаматтарын тыл жұмысына мәжбүрлеп алу туралы жарлық шығарды. Бұл Жетісу мен Торғайда бұрын-соңды болмаған жаппай қарулы көтеріліске түрткі болды. Амангелді Иманов бастаған қарулы көтерілісшілер патша жазалаушы жасақтарымен шайқасқа түсті. Әлихан Бөкейханов, Ахмет Байтұрсынұлы және Міржақып Дулатұлы «Қазақ» газетінде үндеу жариялап, халықты қару-жарағы жоқ күйде жазалаушы зеңбірек пен пулеметтердің алдында қырылудан сақтандырып, шақыруды реттеу мен кейінге шегеруді талап етті. Зиялылар Минск майданына барып, тыл жұмысындағы қазақ жігіттерінің құқығын қорғайтын арнайы бөлімдер ұйымдастырды.',
      en: 'On June 25, 1916, Tsar Nicholas II issued an imperial edict conscripting male subjects aged 19 to 43 from Central Asia and Kazakhstan for military rear-guard labor behind World War I frontlines. Coming amidst harvest season and intense wartime requisitioning, this sparked a massive anti-colonial insurrection across Semirechye and Torgay, led by figures like Amangeldy Imanov. Facing artillery-armed imperial penal expeditions, Alash leaders Alikhan Bokeikhanov, Akhmet Baitursynov, and Mirzhakyp Dulatov published urgent appeals in "Qazaq" advising against unorganized armed resistance to avert total civilian annihilation. Simultaneously, they organized volunteer medical and translation corps in Minsk to safeguard the legal rights, rations, and survival of conscripted Kazakh workers.'
    },
    significance: {
      kz: 'Отарлық жүйенің күйреуін тездетіп, қазақ қоғамының өзін-өзі қорғау және дербес мемлекеттілікке ұмтылу санасын барынша күшейтті.',
      en: 'Catastrophically undermined imperial legitimacy in Central Asia and catalyzed the urgent demand for armed national defense and territorial autonomy.'
    },
    location: {
      kz: 'Торғай, Жетісу, бүкіл Қазақстан / Минск майданы',
      en: 'Torgay, Semirechye, across Kazakhstan / Western Front (Minsk)'
    },
    figuresInvolved: ['bokeikhanov', 'baitursynov', 'dulatov'],
    period: '1908-1916',
    image: '/images/events/1916-revolt.webp'
  },
  {
    id: 'february-revolution-1917',
    year: 1917,
    month: '02',
    dateStr: {
      kz: '1917 жылғы ақпан – наурыз',
      en: 'February – March 1917'
    },
    title: {
      kz: 'Ақпан төңкерісі және монархияның құлауы',
      en: 'Fall of Tsarist Autocracy in the February Revolution'
    },
    summary: {
      kz: 'Ресейде патша билігі құлап, саяси бостандық орнады. Алаш қайраткерлері Уақытша үкімет органдарына кіріп, қазақ комитеттерін құрды.',
      en: 'Collapse of the Romanov dynasty opened political freedoms; Alash leaders formed Kazakh Civic Committees and prepared national congresses.'
    },
    details: {
      kz: '1917 жылғы ақпанның соңында Петроградта басталған революция нәтижесінде патша II Николай тақтан бас тартып, 300 жылдан астам билік құрған Романовтар әулетінің монархиясы құлады. Ресейде Уақытша үкімет құрылып, азаматтық бостандықтар, сөз еркіндігі мен саяси рақымшылық жарияланды. Әлихан Бөкейханов Торғай облысының комиссары, Мұхамеджан Тынышбаев пен Мұстафа Шоқай Уақытша үкіметтің Түркістан комитетінің мүшелері болып тағайындалды. Қазақ даласында облыстық, уездік қазақ комитеттері құрылып, тыл жұмысындағы ондаған мың азаматты аман-есен елге қайтару жұмыстары жүргізілді.',
      en: 'In late February 1917, mass uprisings in Petrograd culminated in the abdication of Tsar Nicholas II and the downfall of the three-century-old Romanov dynasty. The newly formed Russian Provisional Government proclaimed universal civil liberties, freedom of assembly, and amnesty for political exiles. Alash leaders promptly entered regional executive structures: Alikhan Bokeikhanov was appointed Commissar of Torgay Oblast, while Mukhamedzhan Tynyshbaev and Mustafa Shokay were named to the Turkestan Committee. Kazakh Civil Committees sprang up in every district, dismantling tsarist colonial police apparatuses and orchestrating the urgent repatriation of rear-line laborers.'
    },
    significance: {
      kz: 'Қазақ зиялыларына ашық саяси партия құруға, халық съездерін шақыруға және ұлттық автономия жариялауға тарихи жол ашты.',
      en: 'Removed imperial constraints, enabling Kazakh intellectuals to formally assemble nationwide congresses and pursue constitutional autonomy.'
    },
    location: {
      kz: 'Петроград, Орынбор, Верный, Орал',
      en: 'Petrograd, Orenburg, Verny, Uralsk'
    },
    figuresInvolved: ['bokeikhanov', 'tynyshbaev', 'shokay'],
    period: '1917-1920',
    image: '/images/events/february-revolution.webp'
  },
  {
    id: 'first-all-kazakh-congress-1917',
    year: 1917,
    month: '07',
    dateStr: {
      kz: '1917 жылғы 21–28 шілде',
      en: 'July 21–28, 1917'
    },
    title: {
      kz: 'Бірінші жалпықазақ съезі және «Алаш» партиясының құрылуы',
      en: '1st All-Kazakh Congress & Formation of the Alash Party'
    },
    summary: {
      kz: 'Орынборда барлық қазақ облыстарының делегаттары жиналып, «Алаш» саяси партиясын құру және автономия туралы тарихи қарар қабылдады.',
      en: 'Delegates in Orenburg resolved to establish the "Alash" party, demanding territorial autonomy within a democratic federal republic.'
    },
    details: {
      kz: '1917 жылғы 21–28 шілдеде Орынбор қаласында Бірінші жалпықазақ съезі өтті. Съезге Ақмола, Семей, Торғай, Орал, Жетісу, Сырдария, Ферғана облыстары мен Бөкей ордасынан келген белгілі қайраткерлер мен өкілдер қатысты. Съездің төрағасы болып Халел Досмұхамедов сайланды. Күн тәртібіне 14 мәселе қойылып, оның ішінде мемлекеттік құрылыс (Ресей федеративтік демократиялық республика болуы тиіс), қазақ облыстарының ұлттық-аумақтық автономиясы, жер мәселесі (қоныстанушыларға жер беруді дереу тоқтату), халықтық милиция құру, оқу-ағарту, әйел теңдігі және Бүкілресейлік Құрылтай жиналысына депутаттар сайлау қаралды. Съезд ұлт мүддесін қорғайтын «Алаш» саяси партиясын құру туралы тарихи шешім қабылдады.',
      en: 'From July 21 to 28, 1917, the First All-Kazakh Congress convened in Orenburg, gathering accredited delegates from Akmola, Semipalatinsk, Torgay, Uralsk, Semirechye, Syr Darya, Fergana, and the Bokey Horde. Presided over by Khalel Dosmukhamedov, the congress addressed a comprehensive 14-point agenda. Crucial resolutions demanded that Russia become a federal democratic republic granting territorial-national autonomy to Kazakh territories, an absolute prohibition on further land confiscations, the creation of a national people\'s militia, secular native education, equal rights for women, and candidate nominations for the All-Russian Constituent Assembly. Crucially, the congress formally resolved to establish the "Alash" democratic political party.'
    },
    significance: {
      kz: 'Қазақ ұлттық демократиялық қозғалысының саяси партия түрінде институттануы және тұңғыш ұлттық мемлекеттік бағдарламаның бекуі.',
      en: 'Institutionalized the modern Kazakh democratic movement into a disciplined political party with a comprehensive national constitutional program.'
    },
    location: {
      kz: 'Орынбор қаласы',
      en: 'Orenburg'
    },
    figuresInvolved: ['kh_dosmukhamedov', 'bokeikhanov', 'baitursynov', 'dulatov', 'shokay', 'aqbaev'],
    period: '1917-1920',
    image: '/images/events/first-congress.webp'
  },
  {
    id: 'second-all-kazakh-congress-1917',
    year: 1917,
    month: '12',
    dateStr: {
      kz: '1917 жылғы 5–13 желтоқсан',
      en: 'December 5–13, 1917'
    },
    title: {
      kz: 'Екінші жалпықазақ съезі және Алаш автономиясының жариялануы',
      en: '2nd All-Kazakh Congress & Alash Autonomy Declaration'
    },
    summary: {
      kz: 'Орынборда «Алаш автономиясы» мен оның үкіметі — «Алашорда» Ұлт кеңесі құрылып, Ә. Бөкейханов үкімет төрағасы болып сайланды.',
      en: 'The congress proclaimed the Alash Autonomy and established the provisional government "Alash Orda" under Chairman Alikhan Bokeikhanov.'
    },
    details: {
      kz: '1917 жылғы Қазан төңкерісінен кейінгі анархия жағдайында Орынборда өткен Екінші жалпықазақ съезі қазақ тарихындағы аса маңызды мемлекеттік шешімдердің бірін қабылдады. Съезде Әлімхан Ермеков баяндама жасап, бүкіл қазақ жерлерін біріктіретін дербес мемлекеттік құрылым — «Алаш автономиясын» құруды ұсынды. 12 желтоқсанда съезд делегаттары Алаш автономиясын салтанатты түрде жариялады. Мемлекетті басқару үшін 25 орыннан (оның 10 орны қазақ даласын мекендеген орыс және өзге ұлт өкілдеріне берілді) тұратын «Алашорда» уақытша Ұлттық кеңесі (үкіметі) құрылды. Баламалы негізде өткен жасырын дауыс беру нәтижесінде Әлихан Бөкейханов Б. Құлманов пен А. Тұрлыбаевтан басым түсіп, Алашорда үкіметінің төрағасы болып сайланды.',
      en: 'Convening amidst post-October Bolshevik turmoil in Orenburg from December 5 to 13, 1917, the Second All-Kazakh Congress made a decisive leap toward independent statehood. Following a landmark constitutional report delivered by 26-year-old scholar Alimkhan Ermekov, delegates unanimously proclaimed the creation of "Alash Autonomy", unifying all traditional Kazakh regions. To govern the fledgling state, the congress established the Provisional People\'s Council "Alash Orda", consisting of 25 seats (including 10 seats guaranteed to Russian and other ethnic minorities to maintain civic pluralism). In a democratic secret ballot, Alikhan Bokeikhanov was elected Chairman of Alash Orda, defeating B. Kulmanov and A. Turlybaev.'
    },
    significance: {
      kz: 'ХХ ғасырдағы тұңғыш қазақ ұлттық демократиялық мемлекеттілігінің негізі қаланды.',
      en: 'Marked the historic birth of modern Kazakh democratic statehood and the formal proclamation of constitutional autonomy.'
    },
    location: {
      kz: 'Орынбор қаласы',
      en: 'Orenburg'
    },
    figuresInvolved: ['bokeikhanov', 'ermekov', 'kh_dosmukhamedov', 'zh_dosmukhamedov', 'tynyshbaev', 'baitursynov', 'dulatov'],
    period: '1917-1920',
    image: '/images/events/second-congress.webp'
  },
  {
    id: 'alash-orda-government-1918',
    year: 1918,
    month: '03',
    dateStr: {
      kz: '1918 жылғы көктем – жаз',
      en: 'Spring – Summer 1918'
    },
    title: {
      kz: 'Алашорда үкіметінің құрылымдары (Семей және Жымпиты)',
      en: 'Establishment of Alash Orda Provisional Government (Semey & Zhympity)'
    },
    summary: {
      kz: 'Алашорда Семей қаласында Шығыс бөлімін, Жымпитыда Жаһанша және Халел Досмұхамедовтер бастаған Батыс бөлімін құрды.',
      en: 'Alash Orda established the Eastern branch in Semey and the Western Alash Orda branch in Zhympity under the Dosmukhamedovs.'
    },
    details: {
      kz: '1918 жылдың басында большевиктер Орынборды уақытша басып алғандықтан, Алашорда үкіметі Семей қаласының Заречная слободкасына (кейін «Алаш қаласы» атанған) көшіп, қызметін сол жерде жалғастырды. Әлихан Бөкейханов бастаған Шығыс Алашорда жергілікті кеңестердің билігін заңсыз деп танып, земстволар мен қазақ соттарын қалпына келтіру туралы заңдар шығарды. Сонымен бір мезгілде, 1918 жылғы көктемде Жайық өңірінде Жаһанша және Халел Досмұхамедовтердің жетекшілігімен Жымпиты кентінде «Батыс Алашорда» (Ойыл уәлаяты) құрылды. Батыс бөлімнің дербес әскері, қазынасы мен баспаханасы жұмыс істеді. Алаш үкіметі Омбыдағы Уақытша Сібір үкіметімен және Самарадағы Комучпен (Құрылтай жиналысы мүшелерінің комитеті) ресми дипломатиялық қатынас орнатты.',
      en: 'When Bolshevik forces briefly occupied Orenburg in early 1918, the central Alash Orda government relocated eastward to Semipalatinsk (in the historic district renamed "Alash City"). Headed by Alikhan Bokeikhanov, the Eastern government issued constitutional decrees restoring zemstvo self-administration, establishing local judicial courts, and revoking Soviet decrees. Concurrently, in western Kazakhstan, jurist Zhahansha Dosmukhamedov and scholar Khalel Dosmukhamedov proclaimed the Western Branch of Alash Orda (Oyyl Vilayati), centered in Zhympity. The Western branch maintained its own treasury, legal code, and armed forces. Alash Orda maintained diplomatic legations with the Komuch in Samara and the Provisional Siberian Government in Omsk.'
    },
    significance: {
      kz: 'Азамат соғысы жағдайында қазақ өңірлерінде өзін-өзі басқару мен заң үстемдігін қамтамасыз етудің нақты мемлекеттік тетіктері іске қосылды.',
      en: 'Demonstrated practical state-building through operational regional administrations, fiscal management, and independent foreign diplomacy amidst the Russian Civil War.'
    },
    location: {
      kz: 'Семей (Алаш қаласы) және Жымпиты (Батыс Қазақстан)',
      en: 'Semey (Alash City) and Zhympity (Western Kazakhstan)'
    },
    figuresInvolved: ['bokeikhanov', 'zh_dosmukhamedov', 'kh_dosmukhamedov', 'marsekov', 'zhamanmurynov'],
    period: '1917-1920',
    image: '/images/events/alash-city.webp'
  },
  {
    id: 'alash-militia-1918',
    year: 1918,
    month: '06',
    dateStr: {
      kz: '1918 жылғы маусым – тамыз',
      en: 'June – August 1918'
    },
    title: {
      kz: 'Алаш қарулы полктері мен халықтық милициясының құрылуы',
      en: 'Formation of Alash Militia & Armed Cavalry Regiments'
    },
    summary: {
      kz: 'Алашорда шешімімен Семейде, Қостанайда және Жымпитыда қазақтың тұрақты атты әскер полктері мен милиция жасақтары жасақталды.',
      en: 'Alash Orda mobilized regular cavalry regiments and defense detachments across Semey, Kostanay, and Zhympity under national banners.'
    },
    details: {
      kz: '1918 жылғы 11–24 маусымда Алашорда үкіметі өз аумағы мен бейбіт халқын тонаудан, қызылдар мен ақ казактардың зорлық-зомбылығынан қорғау мақсатында ресми түрде Ұлттық милиция (қарулы күштер) құру туралы қаулы қабылдады. Семейде Райымжан Мәрсеков пен Хамит Тоқтамышевтің басшылығымен қазақтың 1-ші атты әскер полкі жасақталды. Жымпитыда Батыс Алашорда 2000-нан астам сарбаздан тұратын тұрақты 4 кавалериялық полк ұйымдастырды. Торғай мен Қостанай өңірлерінде Міржақып Дулатұлы мен Ахмет Байтұрсынұлының араласуымен ерікті жасақтар құрылды. 1918 жылғы тамызда Семейде өткен әскери парадта Алаш полктері «Жасасын Алаш автономиясы!» деген ұранмен ақ ту көтеріп салтанатты маршпен өтті.',
      en: 'Between June 11 and 24, 1918, Alash Orda ratified legislation establishing a regular national defense force—the Alash People\'s Militia—to protect border settlements from marauding Bolshevik bands and rogue Cossack atamans. In Semey, jurist Raiymzhan Marsekov and professional military officer Captain Khamit Tokhtamyshev organized the 1st Kazakh Cavalry Regiment. In Zhympity, Western Alash Orda stood up four operational cavalry regiments comprising over 2,000 disciplined troops with artillery batteries. In Torgay, Mirzhakyp Dulatov organized territorial defense squadrons. In August 1918, the Alash regiments held a historic military parade in Semey under a white national banner, swearing allegiance to the Alash Autonomy.'
    },
    significance: {
      kz: 'Қазақ мемлекеттілігінің дербес қорғаныс қабілетін дәлелдеген тұңғыш тұрақты ұлттық қарулы құрылым.',
      en: 'The first modern regular national armed forces of Kazakhstan, proving the military capacity and self-defense viability of the Alash state.'
    },
    location: {
      kz: 'Семей, Жымпиты, Торғай, Қостанай',
      en: 'Semey, Zhympity, Torgay, Kostanay'
    },
    figuresInvolved: ['marsekov', 'bokeikhanov', 'dulatov', 'zh_dosmukhamedov'],
    period: '1917-1920',
    image: '/images/events/alash-militia.webp'
  },
  {
    id: 'soviet-negotiations-amnesty-1919',
    year: 1919,
    month: '03',
    dateStr: {
      kz: '1919 жылғы наурыз – қараша',
      en: 'March – November 1919'
    },
    title: {
      kz: 'Кеңес өкіметімен келіссөздер және саяси рақымшылық',
      en: 'Soviet Negotiations & Conditional Amnesty'
    },
    summary: {
      kz: 'А. Байтұрсынұлы Мәскеуде Ленинмен келіссөз жүргізіп, Кирревком құрамына кірді; РКФСР Алаш қайраткерлеріне ресми рақымшылық жариялады.',
      en: 'A. Baitursynov negotiated with Lenin in Moscow and joined Kirrevkom; Soviet Russia decreed formal amnesty for Alash participants.'
    },
    details: {
      kz: '1919 жылдың басында Колчактың әскери диктатурасы ұлттық автономияларды танымай, Алашорданы қуғынға салғаннан кейін, Алаш жетекшілері халықтың амандығы мен автономиялық мұраттарын сақтау мақсатында Кеңес өкіметімен келіссөзге барды. 1919 жылғы наурызда Ахмет Байтұрсынұлы бастаған делегация Мәскеуге барып, В. И. Ленин және И. В. Сталинмен тікелей келіссөз жүргізді. Келіссөз нәтижесінде 1919 жылғы 10 шілдеде Лениннің жарлығымен Қазақ өлкесін басқаратын Революциялық комитет (Кирревком) құрылып, Байтұрсынұлы оның төрағасының орынбасары болып тағайындалды. Ал 1919 жылғы 4 қарашада Бүкілресейлік Орталық Атқару Комитеті (ВЦИК) Кеңес өкіметі жағына өткен барлық Алаш қайраткерлеріне толық саяси рақымшылық (амнистия) жариялау туралы тарихи декрет қабылдады.',
      en: 'By early 1919, Admiral Kolchak\'s White military dictatorship rejected all minority national autonomies and suppressed Alash Orda organs. Seeking pragmatic survival and national preservation, Alash leaders initiated high-level diplomatic talks with the Bolsheviks. In March 1919, Akhmet Baitursynov led a delegation to Moscow, negotiating directly with Vladimir Lenin and Joseph Stalin. These talks culminated in the July 10, 1919 decree establishing the Military-Revolutionary Committee for Administering the Kazakh Krai (Kirrevkom), where Baitursynov was appointed Deputy Chairman. On November 4, 1919, the All-Russian Central Executive Committee (VTsIK) ratified a blanket political amnesty guaranteeing former Alash leaders immunity from prosecution.'
    },
    significance: {
      kz: 'Алаш зиялыларының қазақ мемлекеттілігін кеңестік жүйе аясында жалғастыруына және жаңа биліктің басшылық құрылымдарына кіруіне мүмкіндік берді.',
      en: 'Enabled Alash statesmen to transition into administrative and educational offices of the burgeoning republic, safeguarding national institutions from within.'
    },
    location: {
      kz: 'Мәскеу, Торғай, Орынбор',
      en: 'Moscow, Torgay, Orenburg'
    },
    figuresInvolved: ['baitursynov', 'bokeikhanov', 'sadvakasov', 'torekulov'],
    period: '1917-1920',
    image: '/images/events/soviet-negotiations.webp'
  },
  {
    id: 'alash-dissolution-kirrevkom-1920',
    year: 1920,
    month: '03',
    dateStr: {
      kz: '1920 жылғы 9 наурыз – 26 тамыз',
      en: 'March 9 – August 26, 1920'
    },
    title: {
      kz: 'Алашорданың таратылуы және Қазақ АКСР шекарасының бекітілуі',
      en: 'Dissolution of Alash Autonomy & Demarcation of Kazakh ASSR'
    },
    summary: {
      kz: 'Кирревком Алашорданы ресми таратты; Ә. Ермеков Ленин алдында шекараны қорғап қалып, 26 тамызда Қазақ кеңестік республикасы құрылды.',
      en: 'Kirrevkom formally dissolved Alash Orda; A. Ermekov defended borders in Moscow, culminating in the historic August 26, 1920 Kazakh ASSR decree.'
    },
    details: {
      kz: '1920 жылғы 9 наурызда Қазақ әскери-революциялық комитеті (Кирревком) Алашорда үкіметі мен оның барлық құрылымдарын ресми түрде тарату туралы шешім қабылдады. Саяси биліктен шеттетілген Алаш зиялылары біртұтас майдан болып ұлттың болашағы — оқу-ағарту, мәдениет және шекара тұтастығы жолындағы күреске көшті. 1920 жылғы мамыр–тамыз айларында Мәскеуде өткен шекараны анықтау мәжілістерінде 29 жастағы Әлімхан Ермеков Лениннің төрағалығымен өткен отырыста ғылыми негізделген әйгілі баяндама жасап, Каспий жағалауы, Ақмола, Семей өңірлерін Қазақстан құрамында қалдыруды дәлелдеп шықты. Осы қажырлы еңбектің арқасында 1920 жылғы 26 тамызда ВЦИК пен РКФСР Халық Комиссарлар Кеңесі Қазақ (Қырғыз) Автономиялы Кеңестік Социалистік Республикасын құру туралы тарихи Декрет қабылдады.',
      en: 'On March 9, 1920, the Kirrevkom formally decreed the liquidation of all Alash Orda provisional organs. While direct political power was denied them, Alash intellectuals channeled their energy into defending national borders, codifying the language, and building higher education. Between May and August 1920, young scholar Alimkhan Ermekov delivered a historic, geographically irrefutable report before Vladimir Lenin in Moscow, successfully countering Russian chauvinists who sought to detach Caspian oil lands, Semipalatinsk, and Akmola from Kazakhstan. As a direct result, on August 26, 1920, the Soviet government signed the founding decree establishing the Kazakh (Kyrgyz) Autonomous Socialist Soviet Republic, legally cementing the borders of contemporary Kazakhstan.'
    },
    significance: {
      kz: 'Алаш қозғалысының саяси мұрасы Қазақ АКСР-нің аумақтық негізін қалап, кейінгі мемлекеттік тәуелсіздіктің географиялық шекарасын қамтамасыз етті.',
      en: 'Preserved the territorial integrity of Kazakhstan, transforming the Alash movement\'s constitutional vision into the internationally recognized borders of modern Kazakhstan.'
    },
    location: {
      kz: 'Орынбор, Мәскеу, Семей',
      en: 'Orenburg, Moscow, Semey'
    },
    figuresInvolved: ['ermekov', 'baitursynov', 'bokeikhanov', 'zhumabaev', 'sadvakasov'],
    period: '1917-1920',
    image: '/images/events/alash-dissolution.webp'
  }
];

export const getEventsByPeriod = (period: TimelineEvent['period']): TimelineEvent[] => {
  return timelineEvents.filter((event) => event.period === period);
};

export const getEventById = (id: string): TimelineEvent | undefined => {
  return timelineEvents.find((event) => event.id === id);
};

export const getEventsForFigure = (figureId: string): TimelineEvent[] => {
  return timelineEvents.filter((event) => event.figuresInvolved.includes(figureId));
};
