/**
 * Extended educational content for the Chiang Khan Walking Street reference page.
 *
 * Written for a non-profit educational site:
 *  - neutral, encyclopedic tone;
 *  - no named businesses and no commercial recommendations — facility information is
 *    given by *category* only;
 *  - every value that drifts over time (weather, water level, crowds) is described as a
 *    range or a 30-year normal rather than a single figure.
 *
 * All copy is trilingual: zh (简体中文) / en (English) / th (ไทย).
 */

export type Tr = { zh: string; en: string; th: string };

/** A prose block with a heading — used by the interpretive / science sections. */
export interface DeepDiveEntry {
  id: string;
  icon: string;
  title: Tr;
  body: Tr[];
}

/** An oral-tradition entry. `caveat` flags claims that are folklore, not documented fact. */
export interface LegendEntry {
  id: string;
  icon: string;
  title: Tr;
  body: Tr[];
  caveat?: Tr;
}

/** One row of the quarterly planning matrix. */
export interface QuarterEntry {
  id: string;
  season: Tr;
  /** Month range, kept language-neutral. */
  months: string;
  score: number;
  weather: Tr;
  water: Tr;
  wildlife: Tr;
  advice: Tr;
}

/** A route tuned to the needs of one audience. */
export interface AudiencePlan {
  id: string;
  icon: string;
  title: Tr;
  audience: Tr;
  duration: Tr;
  steps: Tr[];
  tips: Tr;
}

/** A generic half-day / full-day itinerary. */
export interface DayPlan {
  id: string;
  icon: string;
  title: Tr;
  duration: Tr;
  timeline: { time: string; text: Tr }[];
}

/** Visitor-service category description (type level only, never a named business). */
export interface FacilityGroup {
  id: string;
  icon: string;
  category: Tr;
  items: Tr[];
  note: Tr;
}

/** Visitor responsibility / interpretation note. */
export interface ResponsibilityEntry {
  id: string;
  icon: string;
  title: Tr;
  body: Tr;
}

/** Bilingual term plus explanation for the small glossary. */
export interface GlossaryEntry {
  term: string;
  meaning: Tr;
}

/**
 * One line of a direct-answer table.
 *
 * `value` is written to stand on its own, because that is the fragment a
 * featured snippet lifts: "Daily, 17:00–22:00" rather than "you can visit
 * between five and ten in the evening".
 */
export interface AnswerRow {
  label: Tr;
  value: Tr;
  note?: Tr;
}

/** A name or address form in one script, shown verbatim so it can be copied. */
export interface NameForm {
  /** Script / system badge: TH, EN, ZH, PLUS. */
  script: string;
  label: Tr;
  /** The literal string. Never translated. */
  value: string;
  usage: Tr;
}

/**
 * Direct answers to the questions visitors actually search for before
 * arriving — opening days and hours, how to reach the street, and what the
 * place is called in each language.
 */
export interface PracticalInfo {
  schedule: AnswerRow[];
  access: AnswerRow[];
  nameForms: NameForm[];
  /** Street address in the local script, for showing to a driver. */
  localAddress: string;
}

export interface ExtendedContent {
  deepDive: DeepDiveEntry[];
  legends: LegendEntry[];
  quarters: QuarterEntry[];
  audiencePlans: AudiencePlan[];
  dayPlans: DayPlan[];
  facilities: FacilityGroup[];
  responsibility: ResponsibilityEntry[];
  glossary: GlossaryEntry[];
  practical: PracticalInfo;
}

/* ------------------------------------------------------------------ */
/* 1. Interpretive deep dives                                          */
/* ------------------------------------------------------------------ */

const deepDive: DeepDiveEntry[] = [
  {
    id: 'geography',
    icon: '🧭',
    title: { zh: '地理与自然环境', en: 'Geography & Natural Setting', th: 'ภูมิศาสตร์และสภาพแวดล้อมธรรมชาติ' },
    body: [
      {
        zh: '清刊位于泰国东北部（依善地区）黎府的最北端，坐落在湄公河西岸，与老挝隔河相望。这一段河谷处于呵叻高原北缘与湄公河冲积平原的过渡地带，河面宽约 300–400 米，对岸的山脊轮廓构成了步行街最著名的“落日＋对岸山影”景观。',
        en: 'Chiang Khan sits at the northern tip of Loei Province in north-eastern Thailand (the Isan region), on the western bank of the Mekong River, directly facing Laos. This stretch of valley lies where the Khorat Plateau meets the Mekong floodplain; the river runs roughly 300–400 m wide, and the Lao ridge line across the water forms the backdrop of the street’s famous sunset view.',
        th: 'เชียงคานตั้งอยู่ปลายเหนือสุดของจังหวัดเลย ภาคอีสานของไทย บนฝั่งตะวันตกของแม่น้ำโขง ตรงข้ามกับประเทศลาว ช่วงหุบเขานี้อยู่บริเวณรอยต่อระหว่างที่ราบสูงโคราชกับที่ราบลุ่มน้ำโขง ผิวน้ำกว้างราว 300–400 เมตร โดยมีแนวสันเขาฝั่งลาวเป็นฉากหลัง อันเป็นที่มาของภาพพระอาทิตย์ตกที่ขึ้นชื่อของถนนสายนี้',
      },
      {
        zh: '主街（ถนนชายโขง，Chai Khong 路）紧贴河岸呈南北走向，全长约 1 公里，街道与水面之间只隔着一排老屋。河流在镇区下游形成 Kaeng Khut Khu 浅滩急流，枯水期大片礁石滩裸露，成为观察水文节律的天然标尺：水位高低、水色清浊、流速缓急，都直接反映上游降雨与水库调度。',
        en: 'The main street (Chai Khong Road) follows the bank from north to south for about one kilometre, with only a single row of old houses between the road and the water. Downstream of town the Mekong forms the Kaeng Khut Khu rapids; in the dry season wide rock shelves are exposed, turning the river into a natural gauge — level, clarity and current speed all reflect upstream rainfall and reservoir releases.',
        th: 'ถนนสายหลัก (ถนนชายโขง) ทอดยาวตามริมฝั่งในแนวเหนือ–ใต้ระยะประมาณหนึ่งกิโลเมตร โดยมีบ้านเก่าเรียงแถวเดียวคั่นระหว่างถนนกับผิวน้ำ ทางท้ายน้ำมีแก่งคุดคู้ ในฤดูแล้งโขดหินจะโผล่กว้าง กลายเป็นมาตรวัดธรรมชาติของลำน้ำ ระดับน้ำ ความใส และความเร็วกระแสน้ำล้วนสะท้อนปริมาณฝนต้นน้ำและการระบายน้ำจากเขื่อน',
      },
      {
        zh: '气候上，这里受西南季风与东北季风交替控制，全年可分为三段：11 月至次年 2 月的凉季干爽清冷，清晨河面常起浓雾；3 月至 4 月为高温少雨的热季；5 月至 10 月为雨季，午后多雷阵雨，8 至 9 月是降雨峰值。读懂这一节律，是判断河景、光线与行程安排的基础。',
        en: 'The area alternates between the south-west and north-east monsoons, giving the year three parts: a cool, dry season from November to February, when thick mist often lies over the water at dawn; a hot, dry season in March and April; and a rainy season from May to October with frequent afternoon thunderstorms, peaking in August and September. Reading this rhythm is the basis for judging the river, the light and the shape of a visit.',
        th: 'ด้านภูมิอากาศ พื้นที่นี้ได้รับอิทธิพลสลับกันของมรสุมตะวันตกเฉียงใต้และตะวันออกเฉียงเหนือ แบ่งได้สามช่วง คือ ฤดูหนาวที่แห้งและเย็นตั้งแต่พฤศจิกายนถึงกุมภาพันธ์ ซึ่งมักมีหมอกหนาเหนือผิวน้ำยามเช้า ฤดูร้อนที่อุณหภูมิสูงและฝนน้อยในมีนาคม–เมษายน และฤดูฝนตั้งแต่พฤษภาคมถึงตุลาคมที่มักมีฝนฟ้าคะนองตอนบ่าย โดยมีฝนสูงสุดในสิงหาคม–กันยายน การเข้าใจจังหวะนี้เป็นพื้นฐานของการประเมินภาพลำน้ำ แสง และการวางแผนเดินทาง',
      },
    ],
  },
  {
    id: 'architecture',
    icon: '🪵',
    title: { zh: '建筑与工艺解读', en: 'Architecture & Craftsmanship', th: 'สถาปัตยกรรมและงานช่าง' },
    body: [
      {
        zh: '步行街的建筑群常被概括为“老挝—法式骑楼”（Lao–French shophouse）：底层作店铺、上层作居所，正面带一条连续外廊，屋檐深远，既能遮阳也可避雨。这一形制形成于 19 世纪末至 20 世纪中叶，是湄公河两岸贸易市镇在本地木构传统与外来砖石技术交流中产生的混合类型。',
        en: 'The streetscape is usually described as Lao–French shophouse architecture: a shop at ground level, a home above, and a continuous veranda along the front under deep eaves that block both sun and rain. The type emerged between the late nineteenth and mid-twentieth centuries, when trading towns on both banks of the Mekong blended local timber traditions with imported masonry techniques.',
        th: 'ตึกแถวที่นี่มักถูกเรียกว่าสถาปัตยกรรม "ตึกแถวลาว–ฝรั่งเศส" คือชั้นล่างเป็นร้านค้า ชั้นบนเป็นที่อยู่อาศัย มีระเบียงต่อเนื่องด้านหน้าและชายคาที่ยื่นลึกเพื่อกันแดดกันฝน รูปแบบนี้ก่อตัวช่วงปลายคริสต์ศตวรรษที่ 19 ถึงกลางคริสต์ศตวรรษที่ 20 เมื่อเมืองการค้าสองฝั่งโขงผสมผสานงานไม้ท้องถิ่นเข้ากับเทคนิคก่ออิฐจากภายนอก',
      },
      {
        zh: '材料与结构上，老屋以柚木（teak）为主要用材，柱、梁、楼板、板墙与百叶窗多依赖榫卯与企口拼板，铁件使用极少，使建筑在洪水与温差下保有弹性。为应对湄公河季节性涨水，房屋普遍抬高基础，以砖石或木桩架空；部分老屋保留可拆卸的活动楼板与高门槛，形成“防潮＋防洪”的复合做法。',
        en: 'Structurally the houses are built mainly of teak. Posts, beams, floors, plank walls and louvred shutters rely on mortise-and-tenon joints and tongue-and-groove boards with very little ironwork, which lets the buildings flex with floods and temperature swings. To cope with the Mekong’s seasonal rise, houses are raised on masonry or timber piles; some retain removable floor panels and tall thresholds as a combined damp-proofing and flood measure.',
        th: 'ด้านวัสดุและโครงสร้าง บ้านเก่าสร้างจากไม้สักเป็นหลัก เสา คาน พื้น ผนังไม้แผ่น และบานเกล็ด ใช้การเข้าไม้แบบเดือยและรางลิ้น โดยใช้โลหะน้อยมาก ทำให้อาคารยืดหยุ่นต่อน้ำท่วมและความต่างของอุณหภูมิ เพื่อรับมือกับระดับน้ำโขงที่ขึ้นลงตามฤดู บ้านจึงยกฐานสูงด้วยอิฐหรือเสาไม้ บางหลังยังคงแผ่นพื้นที่ถอดได้และธรณีประตูสูง ซึ่งเป็นวิธีผสมระหว่างการกันความชื้นและการกันน้ำท่วม',
      },
      {
        zh: '装饰细节同样值得细看：山墙多作人字形或带翘角，檐下木雕与通风花格兼具结构与通风功能，腰门与半截门扇让人在开门通风时仍保有隐私。今日主街的修缮普遍遵循“保留临街立面、以同种木材替换朽件、沿用传统配色”的原则，因此同一排房屋上常能读出不同年代的修补痕迹——这本身就是一层可供阅读的历史信息。',
        en: 'Details reward close looking: gables are usually human-shaped, sometimes with upturned corners; carved brackets and ventilation grilles serve structure and airflow at once; and half-height doors allow privacy while the upper leaf stays open. Conservation on the main street generally follows a simple rule — keep the street facade, replace decayed members with the same timber species, and stay with traditional colours — so a single row of houses often shows repairs from several decades, readable as a layer of history in itself.',
        th: 'รายละเอียดน่าดูเมื่อเข้าไปใกล้ หน้าจั่วมักเป็นรูปคนหรือมีชายคายกมุม งานแกะสลักค้ำยันและช่องระบายอากาศทำหน้าที่ทั้งโครงสร้างและการถ่ายเทอากาศ บานประตูครึ่งบานเปิดรับลมได้โดยยังคงความเป็นส่วนตัว งานอนุรักษ์บนถนนสายหลักในปัจจุบันมักยึดหลัก "คงรูปด้านหน้า เปลี่ยนไม้ที่ผุด้วยไม้ชนิดเดียวกัน และใช้สีตามแบบดั้งเดิม" จึงอ่านร่องรอยการซ่อมต่างยุคต่างสมัยในตึกแถวเดียวได้ ซึ่งเป็นชั้นข้อมูลทางประวัติศาสตร์ในตัวเอง',
      },
    ],
  },
  {
    id: 'culture',
    icon: '🎶',
    title: { zh: '依善与老挝文化圈', en: 'The Isan–Lao Cultural Sphere', th: 'วัฒนธรรมอีสาน–ลาว' },
    body: [
      {
        zh: '清刊地处泰老边境，居民的语言、饮食、音乐与节庆与湄公河对岸高度同源。日常使用的依善语（อีสาน）在词汇与声调上同老挝语高度接近，许多长者能自然地在两种语言之间切换。理解这一点，是理解“为什么这里不像泰国中部”的关键。',
        en: 'Chiang Khan sits on the Thai–Lao border, and its language, food, music and festivals share deep roots with the communities across the Mekong. Isan (อีสาน) is the everyday language and is closely related to Lao in vocabulary and tone; many older residents move easily between the two. This is the key to understanding why the town does not feel like central Thailand.',
        th: 'เชียงคานตั้งอยู่ชายแดนไทย–ลาว ภาษาพูด อาหาร ดนตรี และประเพณีของคนที่นี่มีรากเดียวกันกับชุมชนอีกฝั่งโขง ภาษาที่ใช้ในชีวิตประจำวันคือภาษาอีสาน ซึ่งใกล้เคียงภาษาลาวทั้งด้านคำศัพท์และเสียงวรรณยุกต์ ผู้สูงอายุจำนวนมากสลับสองภาษาได้อย่างเป็นธรรมชาติ นี่คือกุญแจสำคัญที่อธิบายว่าทำไมเมืองนี้จึงไม่เหมือนภาคกลาง',
      },
      {
        zh: '音乐与仪式上，莫兰（หมอลำ，Mor Lam）叙事歌谣是节庆与聚会的核心。佛教节期中，解夏节（ออกพรรษา）沿湄公河的“火船游行”（ลอยเรือไฟ）尤为特别：人们以竹木扎船、插香点火放流河中，兼具谢恩、送厄与祈福之意。火箭节（บุญบั้งไฟ）则以竹制火箭祈求雨季按时到来。',
        en: 'In music and ritual, Mor Lam (หมอลำ) narrative singing is central to festivals and gatherings. Among Buddhist observances, the illuminated boat procession (ลอยเรือไฟ, Lai Ruea Fai) at the end of the rains retreat is distinctive: bamboo-and-wood boats are floated with lit incense and candles, combining gratitude, the release of misfortune and blessing. The rocket festival (บุญบั้งไฟ) asks the monsoon to arrive on time.',
        th: 'ด้านดนตรีและพิธีกรรม หมอลำเป็นหัวใจของการชุมนุมและงานประเพณี ในรอบปีพุทธศาสนา ลอยเรือไฟช่วงออกพรรษาตามลำโขงโดดเด่นเป็นพิเศษ โดยใช้เรือที่ประดิษฐ์จากไม้ไผ่และไม้ จุดธูปเทียนแล้วปล่อยลงน้ำ มีความหมายทั้งการขอบคุณ การปล่อยทุกข์โศก และการขอพร ส่วนบุญบั้งไฟเป็นการขอให้ฝนมาตามฤดู',
      },
      {
        zh: '物质文化层面，手工织布与靛蓝染仍是重要技艺，纹样随家族与村落而异；饮食以糯米为主食，佐以发酵鱼酱、舂制凉拌与炭烤肉食，与老挝北部饮食一脉相承。这些都不是为游客准备的表演，而是社区仍在延续的日常生活——参观时应以旁观与尊重为前提。',
        en: 'Material culture remains vital: hand-weaving and indigo dyeing continue, with patterns varying by family and village, while the cuisine — glutinous rice, fermented fish paste, pounded salads and charcoal grilling — descends directly from northern Lao cooking. These are not performances staged for visitors; they are living community life, and should be approached as such.',
        th: 'ด้านวัฒนธรรมวัตถุ การทอผ้าและย้อมครามด้วยมือยังคงอยู่ โดยลายผ้าแตกต่างกันตามครอบครัวและหมู่บ้าน อาหารใช้ข้าวเหนียวเป็นหลัก รับประทานคู่กับปลาร้า ส้มตำ และเนื้อปิ้งย่าง ซึ่งสืบทอดจากอาหารลาวเหนือโดยตรง ทั้งหมดนี้ไม่ใช่การแสดงที่จัดไว้ให้นักท่องเที่ยว แต่เป็นชีวิตชุมชนที่ยังดำเนินอยู่ จึงควรเข้าชมด้วยความเคารพ',
      },
    ],
  },
  {
    id: 'naming',
    icon: '🔤',
    title: { zh: '语言与地名', en: 'Language & Place Names', th: 'ภาษาและชื่อสถานที่' },
    body: [
      {
        zh: '泰老语系的地名像一层地质剖面。“เชียง”（Chiang）源自傣泰语，本义是设有城垣的聚落或“城”，在泰国北部与老挝广泛出现（清迈、清莱等皆同源）；“คาน”（Khan）的解释主要有两类：一类与“คาน”（横梁、抬杆）有关，另一类来自当地口传的人名或植物名。',
        en: 'Tai–Lao place names read like a geological section. เชียง (Chiang) comes from the Tai languages and originally meant a walled settlement or “city”; it appears throughout northern Thailand and Laos (Chiang Mai and Chiang Rai share the root). For คาน (Khan) there are two main strands: one linked to คาน, a beam or carrying-pole, and one to a local personal or plant name.',
        th: 'ชื่อบ้านนามเมืองในกลุ่มภาษาไท–ลาวเปรียบเหมือนชั้นหินทางธรณีวิทยา คำว่า "เชียง" มาจากกลุ่มภาษาไท แรกเริ่มหมายถึงชุมชนที่มีกำแพงล้อมหรือ "เมือง" พบทั่วภาคเหนือของไทยและลาว (เชียงใหม่ เชียงราย มีรากเดียวกัน) ส่วนคำว่า "คาน" มีคำอธิบายหลักสองทาง คือเกี่ยวกับ "คาน" ที่หมายถึงคานหรือคานหาม กับอีกทางที่มาจากชื่อบุคคลหรือชื่อพืชในท้องถิ่น',
      },
      {
        zh: '“แก่ง”（Kaeng）指河床礁石形成的浅滩急流，是湄公河地名的常见词素，Kaeng Khut Khu 即由此得名；“บ้าน”（Ban）意为村，“ดอน”（Don）指河中沙洲或高地，“วัด”（Wat）为寺院——掌握这几个词素，就能大致读懂沿途的地名。',
        en: 'แก่ง (Kaeng) denotes rapids over a rocky riverbed and is a common Mekong element — hence Kaeng Khut Khu. บ้าน (Ban) means village, ดอน (Don) a sandbar or raised ground in the river, and วัด (Wat) a temple. With these few elements, most place names along the route become readable.',
        th: '"แก่ง" หมายถึงบริเวณน้ำตื้นที่มีโขดหินในท้องน้ำ เป็นคำที่พบบ่อยในชื่อสถานที่ริมโขง จึงได้ชื่อแก่งคุดคู้ ขณะที่ "บ้าน" หมายถึงหมู่บ้าน "ดอน" หมายถึงเกาะแก่งหรือที่ดอนกลางน้ำ และ "วัด" หมายถึงวัด เพียงเข้าใจคำเหล่านี้ก็อ่านชื่อสถานที่ตลอดเส้นทางได้ในระดับหนึ่ง',
      },
      {
        zh: '值得注意的是，同一地名在泰文、老挝文与中文资料里曾有多种转写（Chiang Khan / Xieng Khan / 清刊）。本站统一使用泰文官方拼写的拉丁转写 Chiang Khan，并在首次出现时标注泰文，以避免检索歧义。关于地名的民间解释，请见“传说与民间故事”一节。',
        en: 'Note that the toponym has been romanised in several ways across Thai, Lao and Chinese sources (Chiang Khan / Xieng Khan / 清刊). This site consistently uses the official Thai romanisation, Chiang Khan, giving the Thai script at first mention to avoid ambiguity in search. For folk explanations of the name, see the folklore section.',
        th: 'น่าสังเกตว่าชื่อเดียวกันนี้เคยถอดอักษรหลายแบบในเอกสารไทย ลาว และจีน (Chiang Khan / Xieng Khan / 清刊) เว็บไซต์นี้ใช้การถอดอักษรตามแบบราชการไทยอย่างสม่ำเสมอ และกำกับอักษรไทยเมื่อปรากฏครั้งแรกเพื่อลดความคลุมเครือในการค้นหา ส่วนคำอธิบายชื่อแบบชาวบ้าน โปรดดูหัวข้อตำนานและเรื่องเล่า',
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* 2. Folklore & oral tradition                                        */
/* ------------------------------------------------------------------ */

const legends: LegendEntry[] = [
  {
    id: 'naga',
    icon: '🐉',
    title: { zh: '那伽与湄公河', en: 'The Naga and the Mekong', th: 'พญานาคกับแม่น้ำโขง' },
    body: [
      {
        zh: '在泰老两地的民间信仰中，湄公河由那伽（พญานาค，Naga）守护——那伽是兼具蛇与龙特征的圣兽，被认为居于河底的水晶宫殿，掌管水位与丰歉。沿岸村落至今保留向河神致意的习惯：出船之前、节庆之时，或河面出现异常漩涡与浪涌时，人们会说那是那伽经过。',
        en: 'In Thai and Lao folk belief the Mekong is guarded by the Naga (พญานาค), a serpent-dragon that dwells in a crystal palace beneath the water and governs its level and the abundance it brings. Riverside villages still greet the river spirit — before a boat leaves, at festivals, or when the water shows an unusual swirl — and such disturbances are attributed to a Naga passing by.',
        th: 'ในความเชื่อของคนไทยและลาว แม่น้ำโขงมีพญานาคเป็นผู้ดูแล ซึ่งเป็นสัตว์ศักดิ์สิทธิ์กึ่งงูกึ่งมังกร เชื่อว่าอาศัยอยู่ในปราสาทแก้วใต้ลำน้ำ เป็นผู้ควบคุมระดับน้ำและความอุดมสมบูรณ์ ชุมชนริมโขงยังคงธรรมเนียมการคารวะเจ้าแม่น้ำ เช่น ก่อนออกเรือ ในงานประเพณี หรือเมื่อพบน้ำวนและคลื่นผิดปกติ ก็มักกล่าวกันว่าพญานาคกำลังเคลื่อนผ่าน',
      },
      {
        zh: '这一信仰也塑造了河上奇观的民间版本。每年解夏节前后，湄公河上偶有夜色中升起的火光，民间称为“那伽吐珠”（บั้งไฟพญานาค）；关于它的成因，既有燃烧沼气的自然解释，也有信仰解释，两者在社区中并存。对访客而言，重要的不是判定孰是孰非，而是理解这套信仰如何组织当地人与河流的关系：以敬畏为前提的使用，而非征服。',
        en: 'The same belief colours folk accounts of river phenomena. Around the end of the rains retreat, small lights are occasionally reported rising from the Mekong at night and are known as Naga fireballs (บั้งไฟพญานาค). Natural explanations involving marsh gas and faith-based explanations coexist in local communities. For a visitor the point is not to adjudicate between them, but to see how this belief frames a relationship of respect and restraint toward the river rather than domination of it.',
        th: 'ความเชื่อนี้ยังปรากฏในคำเล่าขานเกี่ยวกับปรากฏการณ์เหนือลำน้ำ ช่วงใกล้ออกพรรษาบางคืนมีผู้พบเห็นแสงลอยขึ้นจากผิวน้ำ ซึ่งเรียกกันว่าบั้งไฟพญานาค ทั้งคำอธิบายเชิงธรรมชาติเกี่ยวกับก๊าซในหนองน้ำและคำอธิบายเชิงความเชื่อดำรงอยู่ร่วมกันในชุมชน สำหรับผู้มาเยือน สิ่งสำคัญไม่ใช่การตัดสินว่าฝ่ายใดถูก แต่คือการเข้าใจว่าความเชื่อนี้กำกับความสัมพันธ์ระหว่างคนกับแม่น้ำอย่างไร ด้วยความเคารพมากกว่าการเอาชนะ',
      },
    ],
    caveat: {
      zh: '本节记录的是当地口传与信仰实践，不作为自然现象的科学结论。',
      en: 'This records local oral tradition and belief practice, not a scientific conclusion about a natural phenomenon.',
      th: 'เนื้อหาส่วนนี้บันทึกคำเล่าขานและความเชื่อท้องถิ่น มิได้เป็นข้อสรุปทางวิทยาศาสตร์ของปรากฏการณ์ธรรมชาติ',
    },
  },
  {
    id: 'lai-ruea-fai',
    icon: '🕯️',
    title: { zh: '解夏节的火船游行', en: 'The Illuminated Boats of the Rains Retreat', th: 'ลอยเรือไฟในเทศกาลออกพรรษา' },
    body: [
      {
        zh: '解夏节（ออกพรรษา，Ook Phansa）在依善地区有一项特别的仪式：火船游行（ลอยเรือไฟ，Lai Ruea Fai）。人们以竹子与香蕉树干扎成船形，插上香烛、点亮灯火，傍晚成队放入湄公河。船顺流而去，火光在水面拉出长长的线，场面安静而庄重。',
        en: 'In the Isan region the end of the rains retreat (ออกพรรษา, Ook Phansa) brings a distinctive rite: the illuminated boat procession (ลอยเรือไฟ, Lai Ruea Fai). Boats are fashioned from bamboo and banana trunk, planted with incense and lit candles, then floated onto the Mekong in groups at dusk. They drift downstream and the lights draw long lines across the water, in a scene that is quiet and solemn rather than spectacular.',
        th: 'ในภาคอีสาน เทศกาลออกพรรษามีพิธีกรรมที่โดดเด่น คือ ลอยเรือไฟ โดยประดิษฐ์เรือจากไม้ไผ่และลำต้นกล้วย ปักธูปเทียนและจุดไฟ แล้วปล่อยลงแม่น้ำโขงเป็นลำดับในยามเย็น เรือลอยตามน้ำไป แนวแสงลากยาวบนผิวน้ำ บรรยากาศเงียบขรึมและศักดิ์สิทธิ์',
      },
      {
        zh: '关于起源，流传最广的说法与“送走灾厄、感谢河神赐水”有关：雨季结束、河水回落，人们以此感谢河流一年的供养，并把疾病与不幸托付流水带走。也有说法把它与佛经故事相连。仪式通常在解夏节前后举行，具体日期依寺院与村落而定；若恰好遇上，请以旁观为主——拍摄时关闭闪光灯，不阻挡仪式队伍。',
        en: 'The most widely told explanation concerns sending away misfortune and thanking the river spirit for its water: as the rains end and the river falls, people give thanks for a year of sustenance and entrust illness and bad luck to the current. Other accounts link the rite to Buddhist narrative. It is held around the end of the rains retreat, with dates set locally; if you happen upon it, keep to the role of observer — turn off flash and do not block the procession.',
        th: 'คำอธิบายที่แพร่หลายที่สุดเกี่ยวกับที่มาเกี่ยวข้องกับการส่งเคราะห์และขอบคุณเจ้าแม่น้ำ เมื่อฤดูฝนสิ้นสุดและน้ำลดลง ผู้คนขอบคุณที่ลำน้ำเลี้ยงดูมาตลอดปี และฝากความเจ็บไข้และโชคร้ายให้กระแสน้ำพาไป บางคำเล่าเชื่อมโยงกับเรื่องในพระพุทธศาสนา พิธีมักจัดราวเทศกาลออกพรรษา โดยกำหนดวันตามวัดและหมู่บ้าน หากได้พบ ควรอยู่ในบทผู้ชม ปิดแฟลช และไม่ขวางขบวน',
      },
    ],
    caveat: {
      zh: '仪式日期依当地历法与寺院安排每年不同，请以现场与官方公告为准。',
      en: 'Dates follow the local calendar and temple arrangements and change each year; check local announcements.',
      th: 'วันจัดพิธีเป็นไปตามปฏิทินท้องถิ่นและกำหนดของวัดในแต่ละปี โปรดตรวจสอบประกาศในพื้นที่',
    },
  },
  {
    id: 'broken-beam',
    icon: '🪝',
    title: { zh: '“断杠”与清刊之名', en: 'The Broken Carrying-Pole', th: 'คานหักกับชื่อเชียงคาน' },
    body: [
      {
        zh: '关于“清刊”之名的由来，当地流传着一则说法：古时一位贵人或使团乘轿沿河而行，行至此地时轿子的横杠（คาน）突然折断，队伍被迫停留，此后这里便被称作“断杠之地”——เชียงคาน。这则故事在口传中有多个版本，人物与年代各不相同。',
        en: 'A widely told local account explains the name this way: long ago a noble or an official party was travelling along the river by palanquin when, at this very spot, the carrying-pole (คาน) broke and the procession halted. The place was thereafter known as the “broken pole” — เชียงคาน. Oral versions vary over who the travellers were and when it happened.',
        th: 'คำเล่าขานในท้องถิ่นอธิบายที่มาของชื่อว่า ครั้งหนึ่งขุนนางหรือคณะเดินทางได้โดยสารคานหามเลียบลำน้ำ เมื่อมาถึงบริเวณนี้คานหามได้หักลง คณะต้องหยุดพัก ต่อมาจึงเรียกที่นี่ว่า "ที่คานหัก" — เชียงคาน คำเล่าในแต่ละปากมีรายละเอียดเรื่องบุคคลและช่วงเวลาแตกต่างกัน',
      },
      {
        zh: '需要说明的是，这类解释属于民间语源传说，与语言学者基于“เชียง＝有城垣的聚落”的推演并不完全一致，两者可以并存。“因物得名”的故事在泰老地区并不少见，其功能往往是为一个聚落提供便于传诵的起源记忆。本站记录它，是因为传说本身也是地方文化史的一部分，而非作为地名学的定论。',
        en: 'It should be said that this is folk etymology and does not fully match the linguistic reading of เชียง as “walled settlement”; the two can sit side by side. Name-from-an-object stories are common in the Tai–Lao world and often serve to give a settlement a memorable origin. It is recorded here as part of local cultural history, not as a settled conclusion in toponymy.',
        th: 'ควรกล่าวว่าคำอธิบายนี้เป็นนิรุกติศาสตร์ชาวบ้าน ซึ่งไม่ตรงทั้งหมดกับข้อสันนิษฐานทางภาษาศาสตร์ที่ว่า "เชียง" หมายถึงชุมชนมีกำแพง ทั้งสองแนวทางอยู่ร่วมกันได้ เรื่องตั้งชื่อจากวัตถุพบได้ทั่วไปในโลกไท–ลาว และมักทำหน้าที่สร้างความทรงจำเรื่องกำเนิดให้ชุมชนจดจำง่าย บันทึกไว้ในฐานะส่วนหนึ่งของประวัติศาสตร์วัฒนธรรมท้องถิ่น มิใช่ข้อยุติทางนามวิทยา',
      },
    ],
    caveat: {
      zh: '此为民间语源传说，并非已考证的定论。',
      en: 'This is folk etymology, not a documented conclusion.',
      th: 'นี่เป็นนิรุกติศาสตร์ชาวบ้าน มิใช่ข้อยุติที่ตรวจสอบแล้ว',
    },
  },
  {
    id: 'kaeng-khut-khu',
    icon: '🪨',
    title: { zh: 'Kaeng Khut Khu 的传说', en: 'The Legend of Kaeng Khut Khu', th: 'ตำนานแก่งคุดคู้' },
    body: [
      {
        zh: 'Kaeng Khut Khu（แก่งคุดคู้）位于清刊下游数公里处，是湄公河在此形成的一片礁石浅滩。关于名字的由来有两种民间说法：一说“คุดคู้”模拟水流拍打礁石的声响，一说与一位名叫 Khu 的渔人有关——他在此处救助了翻船的人，后来这片急流便以他命名。',
        en: 'Kaeng Khut Khu (แก่งคุดคู้) lies a few kilometres downstream of Chiang Khan, where the Mekong forms a broad shelf of rapids. Two folk explanations of the name circulate: one holds that คุดคู้ imitates the sound of water striking the rocks, the other ties it to a fisherman named Khu who is said to have rescued people from a capsized boat, so the rapids took his name.',
        th: 'แก่งคุดคู้อยู่ห่างจากเชียงคานลงไปทางท้ายน้ำไม่กี่กิโลเมตร บริเวณที่แม่น้ำโขงเกิดแก่งหินกว้าง มีคำอธิบายชื่อแบบชาวบ้านสองทาง ทางหนึ่งว่า "คุดคู้" เลียนเสียงน้ำกระทบหิน อีกทางหนึ่งว่าเกี่ยวกับชาวประมงชื่อคู้ ซึ่งช่วยคนจากเรือล่ม ณ ที่แห่งนี้ แก่งจึงได้ชื่อตามเขา',
      },
      {
        zh: '另一种更古老的版本把礁石与河中巨兽联系起来：传说礁石之下栖息着守护河段的生灵，船只经过时必须保持安静并致意，否则会遇上风浪。无论哪种版本都指向同一个经验内核——这段河水浅、礁多、流急，行船必须谨慎。枯水季礁石滩裸露时，可以清楚看到水流被岩石切割出的沟槽，也更容易理解这些传说的现实来源。',
        en: 'An older version links the rocks to a great creature of the river: a guardian being is said to live beneath the shelf, and boats passing over it must keep quiet and pay their respects or meet rough water. Either way the stories point to the same practical core — here the river is shallow, rocky and fast, and must be navigated with care. When the shelves are exposed in the dry season you can see the channels the current has cut through the rock, which makes the origin of such tales easy to understand.',
        th: 'อีกรุ่นเก่ากว่าเชื่อมโยงโขดหินกับสัตว์ใหญ่ในลำน้ำ เล่ากันว่ามีผู้พิทักษ์อาศัยอยู่ใต้แก่ง เรือที่ผ่านต้องเงียบและแสดงความเคารพ มิฉะนั้นจะเจอคลื่นลม ไม่ว่ารุ่นใด คำเล่าเหล่านี้ชี้ไปที่แก่นประสบการณ์เดียวกัน คือช่วงน้ำนี้ตื้น หินมาก น้ำไหลแรง ต้องเดินเรืออย่างระมัดระวัง ในฤดูแล้งที่โขดหินโผล่ จะเห็นร่องที่กระแสน้ำกัดเซาะหินได้ชัดเจน และเข้าใจที่มาของตำนานได้ง่ายขึ้น',
      },
    ],
    caveat: {
      zh: '属民间传说，非史实记载。',
      en: 'Folk tradition, not a documented record.',
      th: 'เป็นตำนานชาวบ้าน มิใช่บันทึกทางประวัติศาสตร์',
    },
  },
  {
    id: 'house-spirits',
    icon: '🏮',
    title: { zh: '老屋的屋神', en: 'House Spirits of the Old Town', th: 'ผีบ้านผีเรือนของบ้านเก่า' },
    body: [
      {
        zh: '依善地区的老屋多设有屋神（ผีบ้านผีเรือน），通常供奉在主柱或屋前一座架高的小祠堂（ศาลพระภูมิ）中。人们相信家宅有守护之灵，搬迁、开业、婚嫁时会先行祭拜；清晨的糯米供奉，往往先分给僧侣，再留给家中的神灵。',
        en: 'Old houses in Isan usually have house spirits (ผีบ้านผีเรือน), honoured at the main post or in a small raised shrine (ศาลพระภูมิ) in front of the building. A guardian spirit is believed to watch over the home, and offerings are made first when moving house, opening a shop or marrying. The morning offering of glutinous rice is often shared with monks before being left for the household spirit.',
        th: 'บ้านเก่าในภาคอีสานมักมีผีบ้านผีเรือน โดยบูชาที่เสาเอกหรือศาลเล็กที่ยกสูงหน้าบ้าน เชื่อกันว่ามีวิญญาณผู้ดูแลบ้าน เมื่อย้ายบ้าน เปิดร้าน หรือแต่งงาน จะบูชาก่อน ข้าวเหนียวที่ถวายยามเช้ามักถวายพระก่อน แล้วจึงเหลือให้ผีบ้าน',
      },
      {
        zh: '在步行街的老屋里，这一传统体现在许多细节上：门前的香烛台、屋柱上缠绕的白线与花环、以及不轻易移动的主柱。对访客而言，这意味着不要攀爬、倚靠或触碰这些位置，也不要移动小祠堂前的供品。屋主傍晚开店时燃香是很日常的景象，不适合凑近拍摄特写——这是他人的居所，而非展品。',
        en: 'In the old houses of the walking street the tradition shows in many small details: incense holders by the door, white thread and garlands wound around posts, and a main post that is not lightly moved. For a visitor this means not climbing on, leaning against or touching these features, and not moving offerings set before a shrine. A shopkeeper lighting incense at dusk is an ordinary moment, not a display, and does not invite a close-up — this is someone’s home.',
        th: 'ในบ้านเก่าบนถนนคนเดิน ประเพณีนี้ปรากฏในรายละเอียดเล็ก ๆ หลายอย่าง เช่น เชิงธูปหน้าประตู ด้ายขาวและพวงมาลัยที่พันรอบเสา และเสาเอกที่ไม่เคลื่อนย้ายโดยง่าย สำหรับผู้มาเยือน นี่หมายถึงไม่ปีน ไม่พิง ไม่แตะต้องจุดเหล่านี้ และไม่ย้ายของถวายหน้าศาล การจุดธูปของเจ้าของร้านยามเย็นเป็นภาพปกติ ไม่ใช่การแสดง และไม่ควรเข้าไปถ่ายระยะใกล้ เพราะนี่คือบ้านของผู้อื่น',
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* 3. Quarterly planning matrix                                        */
/* ------------------------------------------------------------------ */

const quarters: QuarterEntry[] = [
  {
    id: 'q1',
    season: { zh: '凉季', en: 'Cool season', th: 'ฤดูหนาว' },
    months: '11 – 1',
    score: 5,
    weather: {
      zh: '20–31°C，干燥少雨，日照温和；清晨河面常起浓雾，日出后逐渐消散。',
      en: '20–31 °C, dry with gentle sun; thick mist often lies over the water at dawn and lifts after sunrise.',
      th: '20–31 °C แห้ง ฝนน้อย แสงแดดอ่อนโยน มักมีหมอกหนาเหนือผิวน้ำยามเช้าและจางลงหลังพระอาทิตย์ขึ้น',
    },
    water: {
      zh: '水位全年最低，水色最清，流速平缓，礁石滩大面积裸露。',
      en: 'Lowest water of the year, clearest colour, gentle flow, with wide rock shelves exposed.',
      th: 'ระดับน้ำต่ำที่สุดในรอบปี น้ำใสที่สุด กระแสน้ำนุ่มนวล และโขดหินโผล่กว้าง',
    },
    wildlife: {
      zh: '越冬候鸟与水鸟在浅滩觅食，鱼群集中于深水潭；清晨与黄昏是观鸟最佳时段。',
      en: 'Overwintering and water birds feed on the shallows while fish gather in deeper pools; dawn and dusk are best for birdwatching.',
      th: 'นกอพยพและนกน้ำหากินตามหาดตื้น ปลารวมตัวในแอ่งลึก ช่วงเช้ามืดและเย็นเป็นเวลาที่เหมาะสมที่สุดในการดูนก',
    },
    advice: {
      zh: '全年最舒适的季节。清晨需一件薄外套，日出前约 30 分钟抵达河岸即可拍到河雾；周末与连假人流最多，住宿务必提前预订。',
      en: 'The most comfortable season of the year. Bring a light jacket for the morning and reach the bank about 30 minutes before sunrise for the mist; weekends and long holidays are busiest, so book accommodation well ahead.',
      th: 'เป็นฤดูที่สบายที่สุดของปี ควรมีเสื้อบาง ๆ ยามเช้า และไปถึงริมฝั่งราว 30 นาทีก่อนพระอาทิตย์ขึ้นเพื่อถ่ายหมอก เสาร์อาทิตย์และวันหยุดยาวคนจะมากที่สุด ควรจองที่พักล่วงหน้า',
    },
  },
  {
    id: 'q2',
    season: { zh: '凉末至热季', en: 'Late cool to hot season', th: 'ปลายหนาวถึงฤดูร้อน' },
    months: '2 – 4',
    score: 3,
    weather: {
      zh: '24–36°C，全年最干燥；3–4 月受区域性焚烧影响，能见度与空气品质可能下降。',
      en: '24–36 °C and the driest stretch of the year; in March–April regional burning can reduce visibility and air quality.',
      th: '24–36 °C และแห้งที่สุดในรอบปี ในเดือนมีนาคม–เมษายน การเผาในพื้นที่อาจทำให้ทัศนวิสัยและคุณภาพอากาศลดลง',
    },
    water: {
      zh: '水位持续偏低，部分河段出现连片沙洲，水温升高。',
      en: 'Water stays low, sandbars join up along some reaches, and water temperature rises.',
      th: 'ระดับน้ำยังต่ำต่อเนื่อง บางช่วงมีสันดอนทรายต่อกันเป็นผืน และอุณหภูมิน้ำสูงขึ้น',
    },
    wildlife: {
      zh: '河滩昆虫与蜻蜓活跃；水温升高后鱼群下移至深水区，观察难度增加。',
      en: 'Shore insects and dragonflies are active; as the water warms, fish move to deeper pools and are harder to see.',
      th: 'แมลงริมหาดและแมลงปอชุกชุม เมื่อน้ำอุ่นขึ้น ปลาจะย้ายลงแอ่งลึก ทำให้สังเกตได้ยากขึ้น',
    },
    advice: {
      zh: '避开 11:00–15:00 的曝晒，补水与防晒必备；呼吸敏感人群宜关注当地空气品质。此时也是观察礁石纹理与低水位河床的好时机。',
      en: 'Avoid exposure between 11:00 and 15:00 and carry water and sun protection; those with respiratory sensitivity should check local air quality. This is also a good window for photographing rock textures and the low-water riverbed.',
      th: 'หลีกเลี่ยงการตากแดดช่วง 11:00–15:00 เตรียมน้ำดื่มและครีมกันแดด ผู้ที่ไวต่อระบบทางเดินหายใจควรติดตามคุณภาพอากาศท้องถิ่น ช่วงนี้ยังเหมาะกับการดูลวดลายหินและท้องน้ำที่ลดลง',
    },
  },
  {
    id: 'q3',
    season: { zh: '雨季前段', en: 'Early rainy season', th: 'ต้นฤดูฝน' },
    months: '5 – 7',
    score: 3,
    weather: {
      zh: '25–34°C，湿度明显上升，午后常见短时雷阵雨，雨后天色通透。',
      en: '25–34 °C with humidity rising sharply, short afternoon thunderstorms common, and clear light after rain.',
      th: '25–34 °C ความชื้นเพิ่มชัดเจน ฝนฟ้าคะนองช่วงบ่ายมาเป็นช่วงสั้น ๆ และหลังฝนอากาศโปร่งแสงดี',
    },
    water: {
      zh: '水位回升，水色转浊，流速加快；岸边泥沙松软，河岸边缘不宜久留。',
      en: 'Water rises, turns turbid and flows faster; bank sediment softens and the water’s edge is best avoided.',
      th: 'ระดับน้ำเพิ่มขึ้น น้ำเริ่มขุ่น กระแสไหลเร็วขึ้น ตะกอนริมหาดนุ่ม จึงไม่ควรยืนใกล้ขอบน้ำนาน',
    },
    wildlife: {
      zh: '蛙类与夜行昆虫在雨后鸣叫，萤火虫在林缘与河畔出现，夜间观察条件提升。',
      en: 'Frogs and nocturnal insects call after rain, and fireflies appear along the wooded edge and the riverside, improving night observation.',
      th: 'กบและแมลงกลางคืนส่งเสียงหลังฝน หิ่งห้อยปรากฏตามชายป่าและริมโขง การสังเกตธรรมชาติยามค่ำดีขึ้น',
    },
    advice: {
      zh: '随身携带轻便雨具与防滑鞋，木栈道与礁石雨后湿滑；雨后常出现短暂而强烈的晚霞，是摄影的好窗口，人流也相对较少。',
      en: 'Carry a light rain shell and grippy shoes — boardwalks and rocks are slippery after rain. Brief, intense sunsets often follow showers, making this a good photography window with fewer visitors around.',
      th: 'พกร่มหรือเสื้อกันฝนน้ำหนักเบาและรองเท้ากันลื่น เพราะทางไม้และโขดหินเปียกหลังฝน ท้องฟ้าตอนเย็นมักสวยจัดหลังฝน จึงเป็นช่วงดีสำหรับการถ่ายภาพและคนไม่มาก',
    },
  },
  {
    id: 'q4',
    season: { zh: '雨季高峰至尾声', en: 'Peak to late rainy season', th: 'ปลายฤดูฝน' },
    months: '8 – 10',
    score: 4,
    weather: {
      zh: '24–32°C，降雨最集中的时段，8–9 月为峰值；10 月起雨势逐渐收敛，凉意初现。',
      en: '24–32 °C and the wettest stretch, peaking in August and September; from October the rain eases and the first cool nights arrive.',
      th: '24–32 °C เป็นช่วงฝนชุกที่สุด สูงสุดในสิงหาคม–กันยายน ตั้งแต่ตุลาคมฝนเริ่มเบาลงและมีอากาศเย็นตอนกลางคืน',
    },
    water: {
      zh: '水位全年最高，含沙量大，流势强劲；部分河岸与低洼路段可能受影响。',
      en: 'The river is at its highest and most sediment-laden, with a strong current; some banks and low-lying lanes may be affected.',
      th: 'ระดับน้ำสูงสุดในรอบปี ตะกอนมาก กระแสแรง บางช่วงริมฝั่งและเส้นทางลุ่มอาจได้รับผลกระทบ',
    },
    wildlife: {
      zh: '鱼群随水位上溯，水鸟活动范围扩大，岸边植被全年最茂盛。',
      en: 'Fish move upstream with the rising water, water birds range more widely, and bank vegetation is at its most lush.',
      th: 'ปลาเคลื่อนขึ้นตามระดับน้ำ นกน้ำหากินเป็นบริเวณกว้าง และพืชริมฝั่งเขียวชอุ่มที่สุดในรอบปี',
    },
    advice: {
      zh: '出发前查看水位与天气，避免在礁石滩与临水边缘停留。10 月是凉季来临前的高性价比时段：人少、绿意最盛、雨后光线通透。',
      en: 'Check water level and weather before setting out, and avoid stopping on rock shelves or at the water’s edge. October is the value window just before the cool season: fewer visitors, the greenest landscape and clear light after rain.',
      th: 'ตรวจสอบระดับน้ำและพยากรณ์อากาศก่อนออกเดินทาง และหลีกเลี่ยงการหยุดบนโขดหินหรือริมขอบน้ำ เดือนตุลาคมเป็นช่วงคุ้มค่าก่อนเข้าฤดูหนาว คนน้อย พืชเขียวที่สุด และแสงหลังฝนโปร่งใส',
    },
  },
];

/* ------------------------------------------------------------------ */
/* 4. Audience-specific plans                                          */
/* ------------------------------------------------------------------ */

const audiencePlans: AudiencePlan[] = [
  {
    id: 'family',
    icon: '👨‍👩‍👧',
    title: { zh: '亲子家庭', en: 'Families with children', th: 'ครอบครัวที่มีเด็ก' },
    audience: {
      zh: '学龄前至小学阶段儿童，以及同行有长辈的家庭',
      en: 'Families with pre-school or primary-school children, including grandparents',
      th: 'ครอบครัวที่มีเด็กเล็กถึงประถมศึกษา และมีผู้สูงอายุร่วมเดินทาง',
    },
    duration: {
      zh: '约 1.5 – 2 小时（建议 16:30 后入场）',
      en: 'About 1.5–2 hours (best entered after 16:30)',
      th: 'ประมาณ 1.5–2 ชั่วโมง (ควรเข้าในช่วงหลัง 16:30)',
    },
    steps: [
      {
        zh: '先在街口确认洗手间位置与集合点，并提前告知孩子走散后的集合位置。',
        en: 'First locate the toilets and agree a meeting point at the street entrance, then tell the children where to regroup if you are separated.',
        th: 'ก่อนอื่นหาห้องน้ำและจุดนัดพบบริเวณปากถนน แล้วบอกเด็กว่าถ้าพลัดหลงให้กลับมาเจอกันที่ไหน',
      },
      {
        zh: '前段以小吃为主：选择不辣、易分食的烤糯米、椰香小糕与烤香肠，先解决饥饿再往里走。',
        en: 'Start with the food stalls at the near end: choose mild, easy-to-share items such as grilled sticky rice, coconut cakes and grilled sausages before walking further.',
        th: 'ช่วงต้นถนนเน้นของกิน เลือกของไม่เผ็ดที่แบ่งกันง่าย เช่น ข้าวเหนียวปิ้ง ขนมมะพร้าว และไส้กรอกย่าง ให้อิ่มก่อนแล้วค่อยเดินต่อ',
      },
      {
        zh: '中段是手作与纪念品摊位，让孩子自己挑选一件小物，比大人代选更有参与感。',
        en: 'Mid-street is the craft and souvenir stretch — let each child choose one small item themselves, which is far more engaging than choosing for them.',
        th: 'ช่วงกลางถนนเป็นแผงงานฝีมือและของที่ระลึก ปล่อยให้เด็กเลือกของชิ้นเล็กด้วยตัวเอง จะสนุกกว่าการที่ผู้ใหญ่เลือกให้',
      },
      {
        zh: '走到河畔步道看落日，临水台阶与栏杆处需牵手看护。',
        en: 'Walk down to the riverside path for the sunset, holding hands near the water steps and railings.',
        th: 'เดินลงไปทางเดินริมน้ำเพื่อดูพระอาทิตย์ตก จับมือเด็กบริเวณบันไดและราวริมน้ำ',
      },
      {
        zh: '19:00 前后人流达到高峰，此时结束行程或返回住处休息会更轻松。',
        en: 'Crowds peak around 19:00; ending the visit here or returning to your room makes for a calmer evening.',
        th: 'ราว 19:00 คนจะหนาแน่นที่สุด การจบการเที่ยวตรงนี้หรือกลับที่พักจะสบายกว่า',
      },
    ],
    tips: {
      zh: '主街为无车路面，婴儿车基本可行，但部分老屋门槛较高需要抬车；给孩子带一个小夜灯或发光标识，便于在人流中识别；街边小吃多为现烤现做，注意烫口。',
      en: 'The street is car-free, so a stroller works well, though some old-house thresholds are high and need lifting. Give children a small light or reflective tag so you can spot them in the crowd. Most snacks are grilled to order and are served very hot.',
      th: 'ถนนปลอดรถ จึงใช้รถเข็นเด็กได้ แต่ธรณีประตูบ้านเก่าบางหลังสูงต้องยกผ่าน ให้เด็กพกไฟฉายเล็กหรือป้ายสะท้อนแสงเพื่อสังเกตในฝูงคน ของกินส่วนใหญ่ย่างสดและร้อนจัด',
    },
  },
  {
    id: 'photography',
    icon: '📷',
    title: { zh: '摄影与自然', en: 'Photography & nature', th: 'การถ่ายภาพและธรรมชาติ' },
    audience: {
      zh: '以光线、人文纪实与河景为目标的摄影者',
      en: 'Photographers working on light, documentary street scenes and river views',
      th: 'นักถ่ายภาพที่สนใจแสง ภาพสารคดีวิถีชีวิต และทิวทัศน์ลำน้ำ',
    },
    duration: {
      zh: '约 3 – 4 小时，含蓝调时刻',
      en: 'About 3–4 hours, including blue hour',
      th: 'ประมาณ 3–4 ชั่วโมง รวมช่วงแสงพลบค่ำ',
    },
    steps: [
      {
        zh: '17:00 沿线勘察机位，确认可退可进的拍摄点与背景层次，避免临场换位。',
        en: 'At 17:00 walk the street to scout positions, checking both the subject and the background layers so you are not repositioning at the last minute.',
        th: '17:00 เดินสำรวจตำแหน่งถ่ายตามแนวถนน ตรวจทั้งตัวแบบและฉากหลัง เพื่อไม่ต้องย้ายตำแหน่งในนาทีสุดท้าย',
      },
      {
        zh: '17:45 以侧逆光拍摄木屋立面与百叶窗纹理，明暗反差最能体现木材质感。',
        en: 'At 17:45 shoot the timber facades and louvred shutters in side- and back-light; the contrast brings out the grain of the wood.',
        th: '17:45 ถ่ายด้านหน้าเรือนไม้และบานเกล็ดด้วยแสงข้างและย้อนแสง แสงเงาตัดกันช่วยให้เห็นเนื้อไม้ชัดที่สุด',
      },
      {
        zh: '18:15 蓝调时刻：暖黄灯与冷蓝天空同时出现，降低快门并以三脚架稳定构图。',
        en: 'At 18:15 comes blue hour — warm lamps against a cool blue sky. Slow the shutter and stabilise on a tripod.',
        th: '18:15 เป็นช่วงแสงพลบค่ำ ไฟเหลืองอุ่นตัดกับฟ้าสีน้ำเงิน ควรลดความเร็วชัตเตอร์และใช้ขาตั้งกล้อง',
      },
      {
        zh: '18:45 转向河岸，拍摄落日与对岸山脊剪影，可用停泊的小船作前景。',
        en: 'At 18:45 turn to the bank for the sunset and the silhouette of the Lao ridge, using moored boats as foreground.',
        th: '18:45 หันไปทางริมฝั่ง ถ่ายพระอาทิตย์ตกและเงาสันเขาฝั่งลาว โดยใช้เรือจอดเป็นฉากหน้า',
      },
      {
        zh: '19:30 回到街内做人文纪实，用中长焦压缩人群，并尊重不愿入镜的人。',
        en: 'At 19:30 return for documentary work — a short telephoto compresses the crowd — and respect anyone who does not wish to be photographed.',
        th: '19:30 กลับเข้าไปถ่ายภาพสารคดี ใช้เลนส์เทเลช่วยอัดฉากฝูงคนให้แน่นขึ้น และเคารพผู้ที่ไม่ประสงค์จะถูกถ่าย',
      },
    ],
    tips: {
      zh: '三脚架在人流中贴边架设，不要阻断通行；拍摄摊主与居民前先示意并取得同意；夜市为混合光源，注意白平衡与高光溢出；雨季随身带防雨罩。',
      en: 'Set the tripod at the edge of the flow, never blocking passage. Signal and get consent before photographing vendors and residents. Market light is mixed, so watch white balance and blown highlights, and carry a rain cover in the wet season.',
      th: 'ตั้งขาตั้งกล้องชิดขอบทาง ไม่ขวางทางเดิน ขออนุญาตก่อนถ่ายพ่อค้าแม่ค้าและชาวบ้าน แสงตลาดเป็นแสงผสม ระวังไวต์บาลานซ์และไฮไลต์ไหม้ และพกที่คลุมกันฝนในฤดูฝน',
    },
  },
  {
    id: 'accessible',
    icon: '♿',
    title: { zh: '低体力与无障碍', en: 'Low mobility & accessibility', th: 'ผู้มีข้อจำกัดในการเดิน' },
    audience: {
      zh: '行动不便者、长辈，以及需要控制步行距离的访客',
      en: 'Visitors with limited mobility, older travellers, and anyone who needs to control walking distance',
      th: 'ผู้มีความคล่องตัวจำกัด ผู้สูงอายุ และผู้ที่ต้องควบคุมระยะการเดิน',
    },
    duration: {
      zh: '约 1 – 1.5 小时，可分段往返',
      en: 'About 1–1.5 hours, done in out-and-back stages',
      th: 'ประมาณ 1–1.5 ชั่วโมง แบ่งเป็นช่วงไป–กลับ',
    },
    steps: [
      {
        zh: '把行程拆成“街口—中段”与“中段—河畔”两段，任何一段走完都可原路返回。',
        en: 'Split the visit into two legs — entrance to mid-street, then mid-street to the river — each of which can be walked out and back.',
        th: 'แบ่งการเที่ยวเป็นสองช่วง ปากถนนถึงกลางถนน และกลางถนนถึงริมน้ำ แต่ละช่วงเดินไป–กลับได้',
      },
      {
        zh: '主街路面平整且无车，适合轮椅与助行器通行；老屋内部与部分摊位有台阶，可在护栏外侧观看。',
        en: 'The main street is level and car-free, suitable for wheelchairs and walking frames. Old-house interiors and some stalls have steps and can be viewed from outside.',
        th: 'พื้นถนนเรียบและปลอดรถ เหมาะกับรถเข็นและเครื่องช่วยเดิน ภายในบ้านเก่าและบางแผงมีขั้นบันได สามารถชมจากด้านนอกได้',
      },
      {
        zh: '中段设有可休息的座椅与咖啡店，安排一次约 20 分钟的坐下休息。',
        en: 'There are seats and coffee shops mid-street; plan one seated break of about 20 minutes.',
        th: 'ช่วงกลางถนนมีที่นั่งและร้านกาแฟ ควรพักนั่งราว 20 นาทีหนึ่งครั้ง',
      },
      {
        zh: '河畔平台的落日视野无需走远，是这组人群最省力的观景点。',
        en: 'The riverside platform gives an open sunset view with minimal walking — the easiest viewpoint for this group.',
        th: 'ลานริมน้ำให้วิวพระอาทิตย์ตกโดยเดินไม่ไกล เป็นจุดชมที่ใช้แรงน้อยที่สุดสำหรับกลุ่มนี้',
      },
      {
        zh: '避开 19:00–20:00 的人流高峰，改在 16:30–18:30 游览，通行与人流干扰都更少。',
        en: 'Avoid the 19:00–20:00 peak and visit between 16:30 and 18:30, when both passage and crowding are easier.',
        th: 'หลีกเลี่ยงช่วงคนแน่น 19:00–20:00 แล้วมาในช่วง 16:30–18:30 ซึ่งเดินผ่านและเบียดเสียดน้อยกว่า',
      },
    ],
    tips: {
      zh: '路面虽平，但雨后青苔湿滑，建议穿防滑鞋并携带手杖；随身带折叠凳与薄外套；如需无障碍洗手间，可询问街口店铺或寺庙对外开放的设施。',
      en: 'The surface is level but moss makes it slippery after rain, so use grippy shoes and a cane if helpful. Carry a folding stool and a light jacket. For an accessible toilet, ask at shops near the entrance or about facilities open to visitors at the temples.',
      th: 'พื้นเรียบแต่หลังฝนตะไคร่ลื่น ควรใส่รองเท้ากันลื่นและพกไม้เท้าหากจำเป็น พกเก้าอี้พับและเสื้อบาง ๆ หากต้องการห้องน้ำที่เข้าถึงได้ สอบถามร้านแถวปากถนนหรือวัดที่เปิดให้ใช้',
    },
  },
];

/* ------------------------------------------------------------------ */
/* 5. Generic half-day / full-day itineraries                          */
/* ------------------------------------------------------------------ */

const dayPlans: DayPlan[] = [
  {
    id: 'half-day',
    icon: '🌇',
    title: { zh: '半日路线（傍晚精华）', en: 'Half-day route (the evening essentials)', th: 'เส้นทางครึ่งวัน (หัวใจช่วงเย็น)' },
    duration: { zh: '约 4 小时 · 15:30 – 20:30', en: 'About 4 hours · 15:30–20:30', th: 'ประมาณ 4 ชั่วโมง · 15:30–20:30' },
    timeline: [
      {
        time: '15:30',
        text: {
          zh: '抵达清刊，办理入住或寄存行李，先沿河岸确认当日落日时间与视野遮挡。',
          en: 'Arrive in Chiang Khan, check in or drop your bags, and walk the bank to confirm the day’s sunset time and any obstruction to the view.',
          th: 'ถึงเชียงคาน เช็กอินหรือฝากกระเป๋า แล้วเดินริมฝั่งเพื่อดูเวลาพระอาทิตย์ตกของวันนั้นและสิ่งที่บังทัศนวิสัย',
        },
      },
      {
        time: '16:00',
        text: {
          zh: '漫步老城区，从立面细节、百叶窗与门牌读出“老挝—法式骑楼”的年代层次。',
          en: 'Wander the old quarter and read the Lao–French shophouse layers from facades, shutters and house numbers.',
          th: 'เดินย่านเมืองเก่า อ่านชั้นสมัยของตึกแถวลาว–ฝรั่งเศสจากรูปด้าน บานเกล็ด และบ้านเลขที่',
        },
      },
      {
        time: '17:00',
        text: {
          zh: '步行街开市，从街口开始逐段品尝街头小吃，先主食后甜点。',
          en: 'The walking street opens; work along the stalls from the entrance, savoury first and sweets after.',
          th: 'ถนนคนเดินเริ่มเปิด ไล่ชิมจากปากถนน เริ่มของคาวแล้วปิดท้ายของหวาน',
        },
      },
      {
        time: '18:15',
        text: {
          zh: '进入蓝调时刻，在临街机位拍摄暖黄灯与木屋立面。',
          en: 'Blue hour arrives — photograph the warm lamps against the timber facades.',
          th: 'เข้าสู่ช่วงแสงพลบค่ำ ถ่ายไฟเหลืองอุ่นตัดกับด้านหน้าเรือนไม้',
        },
      },
      {
        time: '18:45',
        text: {
          zh: '走到河岸看落日与对岸山影，随后返回街内。',
          en: 'Walk to the bank for the sunset and the Lao ridge line, then return to the street.',
          th: 'เดินไปริมฝั่งดูพระอาทิตย์ตกและแนวสันเขาฝั่งลาว แล้วกลับเข้าถนน',
        },
      },
      {
        time: '19:30',
        text: {
          zh: '在夜市熟食区或河畔小馆用晚餐。',
          en: 'Have dinner at the market’s cooked-food area or a small riverside eatery.',
          th: 'รับประทานอาหารเย็นที่โซนอาหารปรุงสำเร็จในตลาดหรือร้านเล็ก ๆ ริมน้ำ',
        },
      },
      {
        time: '20:30',
        text: {
          zh: '沿街慢慢走回住处，结束行程。',
          en: 'Stroll back to your accommodation and finish the day.',
          th: 'เดินกลับที่พักช้า ๆ เป็นอันจบการเที่ยว',
        },
      },
    ],
  },
  {
    id: 'full-day',
    icon: '🌅',
    title: { zh: '全日路线（清晨到夜晚）', en: 'Full-day route (dawn to night)', th: 'เส้นทางเต็มวัน (เช้าถึงค่ำ)' },
    duration: { zh: '约 8 – 9 小时 · 07:00 – 21:00', en: 'About 8–9 hours · 07:00–21:00', th: 'ประมาณ 8–9 ชั่วโมง · 07:00–21:00' },
    timeline: [
      {
        time: '07:00',
        text: {
          zh: '清晨到河岸看雾，并观看僧侣沿街托钵；保持安静、保持距离，不阻挡队伍。',
          en: 'At dawn go to the bank for the mist and the alms round; keep quiet, keep a distance and do not block the line of monks.',
          th: 'เช้ามืดไปริมฝั่งดูหมอกและดูพระบิณฑบาต เงียบไว้ เว้นระยะ และไม่ขวางแนวพระ',
        },
      },
      {
        time: '08:00',
        text: {
          zh: '在当地市场用早餐：糯米、烤猪肉与米线汤是常见组合。',
          en: 'Breakfast at the local market — glutinous rice, grilled pork and noodle soup are the usual combination.',
          th: 'อาหารเช้าที่ตลาดท้องถิ่น ข้าวเหนียว หมูปิ้ง และก๋วยเตี๋ยว เป็นชุดที่พบทั่วไป',
        },
      },
      {
        time: '09:00',
        text: {
          zh: '参观 Wat Si Khun Mueang，了解本地寺院的建筑格局与壁画题材。',
          en: 'Visit Wat Si Khun Mueang to read the layout of a local temple and the subjects of its murals.',
          th: 'เยี่ยมชมวัดศรีคุณเมือง ดูผังวัดท้องถิ่นและเรื่องราวในภาพจิตรกรรม',
        },
      },
      {
        time: '10:30',
        text: {
          zh: '前往 Kaeng Khut Khu 急流，观察礁石滩、水位痕与湄公河的水色。',
          en: 'Head to the Kaeng Khut Khu rapids to look at the rock shelves, water-level marks and the colour of the Mekong.',
          th: 'ไปแก่งคุดคู้ ดูโขดหิน รอยระดับน้ำ และสีของน้ำโขง',
        },
      },
      {
        time: '12:00',
        text: {
          zh: '午餐与午休，避开正午高温时段。',
          en: 'Lunch and a rest, avoiding the hottest part of the day.',
          th: 'รับประทานอาหารกลางวันและพักผ่อน หลีกเลี่ยงช่วงร้อนจัด',
        },
      },
      {
        time: '14:00',
        text: {
          zh: '探访老屋与织布工坊，了解榫卯结构与靛蓝染工序。',
          en: 'Visit the old houses and a weaving workshop to see mortise-and-tenon framing and the indigo dyeing process.',
          th: 'เยี่ยมบ้านเก่าและโรงทอผ้า ดูโครงสร้างเข้าไม้และขั้นตอนการย้อมคราม',
        },
      },
      {
        time: '16:00',
        text: {
          zh: '在河畔咖啡店休整，等待光线转暖。',
          en: 'Rest at a riverside café while the light turns warmer.',
          th: 'พักที่ร้านกาแฟริมน้ำ รอแสงเปลี่ยนเป็นโทนอุ่น',
        },
      },
      {
        time: '17:00',
        text: {
          zh: '步行街开市，从街口渐次深入。',
          en: 'The walking street opens; move deeper into it stage by stage.',
          th: 'ถนนคนเดินเปิด ค่อย ๆ เดินจากปากถนนเข้าไป',
        },
      },
      {
        time: '18:30',
        text: {
          zh: '拍摄与观赏落日，河岸是最佳位置。',
          en: 'Watch and photograph the sunset; the riverbank is the best position.',
          th: 'ดูและถ่ายพระอาทิตย์ตก จุดที่ดีที่สุดคือริมฝั่ง',
        },
      },
      {
        time: '19:30',
        text: {
          zh: '夜市晚餐，并选购本地手作作为纪念。',
          en: 'Dinner at the market, then a look at locally made crafts.',
          th: 'อาหารเย็นที่ตลาด และเลือกงานฝีมือท้องถิ่นเป็นที่ระลึก',
        },
      },
      {
        time: '21:00',
        text: {
          zh: '行程结束，返回住处。',
          en: 'The day ends; return to your accommodation.',
          th: 'จบการเที่ยว กลับที่พัก',
        },
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* 6. Visitor services — described by CATEGORY only, never by brand    */
/* ------------------------------------------------------------------ */

const facilities: FacilityGroup[] = [
  {
    id: 'toilets',
    icon: '🚻',
    category: { zh: '洗手间与公共设施', en: 'Toilets & public amenities', th: 'ห้องน้ำและสิ่งอำนวยความสะดวกสาธารณะ' },
    items: [
      {
        zh: '街口与巷口设有公共洗手间，傍晚开市后使用高峰需排队。',
        en: 'Public toilets are located at the street entrance and in the lanes; expect queues after the market opens.',
        th: 'มีห้องน้ำสาธารณะบริเวณปากถนนและตามซอย หลังตลาดเปิดช่วงเย็นมักต้องต่อคิว',
      },
      {
        zh: '部分寺庙对外开放洗手间，入内需脱鞋并保持安静。',
        en: 'Some temples open their toilets to visitors; remove your shoes and keep quiet inside.',
        th: 'วัดบางแห่งเปิดให้ใช้ห้องน้ำ ต้องถอดรองเท้าและเงียบ',
      },
      {
        zh: '连锁便利店与加油站多附设洗手间，通常可免费使用。',
        en: 'Convenience stores and fuel stations usually have toilets, generally free to use.',
        th: 'ร้านสะดวกซื้อและปั๊มน้ำมันมักมีห้องน้ำ โดยทั่วไปใช้ฟรี',
      },
      {
        zh: '部分咖啡店的洗手间仅限顾客使用。',
        en: 'Some café toilets are for customers only.',
        th: 'ห้องน้ำร้านกาแฟบางแห่งให้เฉพาะลูกค้า',
      },
    ],
    note: {
      zh: '以蹲式为主，建议随身携带纸巾与消毒用品。',
      en: 'Most are squat-style; carry tissues and hand sanitiser.',
      th: 'ส่วนใหญ่เป็นแบบนั่งยอง ควรพกทิชชู่และเจลล้างมือ',
    },
  },
  {
    id: 'parking',
    icon: '🅿️',
    category: { zh: '停车', en: 'Parking', th: 'ที่จอดรถ' },
    items: [
      {
        zh: '河畔路段设有划线停车位，但步行街时段数量有限。',
        en: 'There are marked bays along the river road, but availability is limited once the walking street opens.',
        th: 'มีช่องจอดตีเส้นตามถนนริมน้ำ แต่เมื่อถนนคนเดินเปิด จำนวนจะจำกัด',
      },
      {
        zh: '寺庙与学校在傍晚后常开放空地作临时停车区，可留意现场指示。',
        en: 'Temples and schools often open their grounds as temporary parking in the evening; watch for on-site signs.',
        th: 'วัดและโรงเรียนมักเปิดลานเป็นที่จอดชั่วคราวช่วงเย็น สังเกตป้ายในพื้นที่',
      },
      {
        zh: '镇中心设有小型收费停车场，旺季建议 16:30 前抵达。',
        en: 'There is a small paid car park in the town centre; in high season, arrive before 16:30.',
        th: 'มีลานจอดรถแบบเสียค่าใช้จ่ายขนาดเล็กในตัวเมือง ช่วงไฮซีซันควรมาถึงก่อน 16:30',
      },
      {
        zh: '步行街时段主街禁行，车辆需停在外围后步行进入。',
        en: 'The main street is closed to vehicles during walking-street hours; park on the outskirts and walk in.',
        th: 'ถนนสายหลักงดรถยนต์ในช่วงถนนคนเดิน ต้องจอดด้านนอกแล้วเดินเข้าไป',
      },
    ],
    note: {
      zh: '旺季与连假车位紧张，摩托车比汽车更容易找到位置。',
      en: 'Parking is tight in high season and long holidays; motorcycles find space more easily than cars.',
      th: 'ที่จอดตึงตัวในไฮซีซันและวันหยุดยาว มอเตอร์ไซค์หาที่จอดได้ง่ายกว่ารถยนต์',
    },
  },
  {
    id: 'dining',
    icon: '🍜',
    category: { zh: '餐饮类型', en: 'Places to eat — by type', th: 'ประเภทร้านอาหาร' },
    items: [
      {
        zh: '街头摊位：烤串、糯米、油炸小吃与泰式甜品。',
        en: 'Street stalls: grilled skewers, sticky rice, fried snacks and Thai sweets.',
        th: 'แผงข้างทาง: ของย่าง ข้าวเหนียว ของทอด และขนมไทย',
      },
      {
        zh: '河畔小餐馆：以湄公河鱼、凉拌与汤类为主。',
        en: 'Small riverside eateries: Mekong fish, pounded salads and soups.',
        th: 'ร้านเล็ก ๆ ริมน้ำ: ปลาแม่น้ำโขง ส้มตำ และอาหารประเภทต้ม',
      },
      {
        zh: '咖啡与甜品店：多集中于中段老屋内，环境安静。',
        en: 'Cafés and dessert shops cluster mid-street inside the old houses and tend to be quiet.',
        th: 'ร้านกาแฟและของหวานกระจุกอยู่ช่วงกลางถนนในบ้านเก่า บรรยากาศเงียบ',
      },
      {
        zh: '夜市熟食区：分量足、选择多，是晚餐的主要去处。',
        en: 'The market’s cooked-food area: generous portions and the widest choice — the main option for dinner.',
        th: 'โซนอาหารปรุงสำเร็จในตลาด: ปริมาณมาก ตัวเลือกเยอะ เป็นที่หลักสำหรับมื้อเย็น',
      },
    ],
    note: {
      zh: '多数摊位以现金为主；素食与清真选择相对有限，可提前说明需求。',
      en: 'Most stalls are cash-only; vegetarian and halal options are limited, so state your needs in advance.',
      th: 'แผงส่วนใหญ่รับเงินสด ตัวเลือกเจและฮาลาลมีจำกัด ควรแจ้งความต้องการล่วงหน้า',
    },
  },
  {
    id: 'stay',
    icon: '🛏️',
    category: { zh: '住宿类型', en: 'Accommodation — by type', th: 'ประเภทที่พัก' },
    items: [
      {
        zh: '河畔木屋民宿：临河而建，可直接看到落日，是当地最具代表性的类型。',
        en: 'Riverside timber guesthouses: built right on the bank with direct sunset views — the area’s signature type.',
        th: 'เกสต์เฮาส์ไม้ริมน้ำ: สร้างติดริมฝั่ง มองเห็นพระอาทิตย์ตกโดยตรง เป็นแบบที่พบได้มากที่สุดของที่นี่',
      },
      {
        zh: '老屋改造客栈：保留木构与百叶窗，房间数量少。',
        en: 'Converted old-house inns: original timber framing and shutters retained, with few rooms.',
        th: 'ที่พักดัดแปลงจากบ้านเก่า: คงโครงไม้และบานเกล็ดเดิม จำนวนห้องน้อย',
      },
      {
        zh: '精品酒店：设施较新，多位于主街两端。',
        en: 'Boutique hotels: newer facilities, mostly at the two ends of the main street.',
        th: 'โรงแรมบูติก: สิ่งอำนวยความสะดวกใหม่กว่า ส่วนใหญ่ตั้งอยู่สองปลายถนน',
      },
      {
        zh: '青年旅舍与家庭旅馆：价格区间较宽，适合独行与预算有限的访客。',
        en: 'Hostels and family lodgings: a wide price range, suited to solo travellers and tighter budgets.',
        th: 'โฮสเทลและที่พักแบบครอบครัว: ช่วงราคากว้าง เหมาะกับผู้เดินทางคนเดียวและงบจำกัด',
      },
    ],
    note: {
      zh: '旺季（11 月 – 2 月）与连假周末房源紧张，建议提前预订。',
      en: 'Rooms are scarce in high season (November–February) and on long-holiday weekends; book ahead.',
      th: 'ที่พักหายากในไฮซีซัน (พฤศจิกายน–กุมภาพันธ์) และเสาร์อาทิตย์วันหยุดยาว ควรจองล่วงหน้า',
    },
  },
  {
    id: 'shops',
    icon: '🏪',
    category: { zh: '商超与便利店', en: 'Shops & convenience stores', th: 'ร้านค้าและร้านสะดวกซื้อ' },
    items: [
      {
        zh: '连锁便利店：日用品、饮用水、雨具与常用药品。',
        en: 'Convenience chains: daily necessities, drinking water, rain gear and basic medicine.',
        th: 'ร้านสะดวกซื้อเชน: ของใช้ประจำวัน น้ำดื่ม อุปกรณ์กันฝน และยาสามัญ',
      },
      {
        zh: '本地杂货店：零食、饮料与生活杂物，营业时间较长。',
        en: 'Local groceries: snacks, drinks and household oddments, with long opening hours.',
        th: 'ร้านชำท้องถิ่น: ขนม เครื่องดื่ม และของใช้ทั่วไป เปิดนาน',
      },
      {
        zh: '夜市日用摊位：袜子、凉鞋、防蚊用品等小件商品。',
        en: 'Market sundry stalls: socks, sandals, mosquito repellent and other small items.',
        th: 'แผงของใช้ในตลาด: ถุงเท้า รองเท้าแตะ ยากันยุง และของชิ้นเล็กอื่น ๆ',
      },
      {
        zh: '手信店：本地织布、扎染与食品类伴手礼。',
        en: 'Souvenir shops: local weaving, tie-dye textiles and food gifts.',
        th: 'ร้านของฝาก: ผ้าทอท้องถิ่น ผ้ามัดย้อม และของฝากประเภทอาหาร',
      },
    ],
    note: {
      zh: '深夜与清晨时段，连锁便利店是最稳定的补给点。',
      en: 'Late at night and early in the morning, the convenience chains are the most reliable option.',
      th: 'ช่วงดึกและเช้ามืด ร้านสะดวกซื้อเป็นจุดซื้อของที่แน่นอนที่สุด',
    },
  },
  {
    id: 'fuel',
    icon: '⛽',
    category: { zh: '加油与充电', en: 'Fuel & charging', th: 'น้ำมันและที่ชาร์จ' },
    items: [
      {
        zh: '镇上设有加油站，营业时间多至夜间；偏远路段建议提前加满。',
        en: 'The town has fuel stations, most open into the evening; fill up before heading to remote stretches.',
        th: 'ในเมืองมีปั๊มน้ำมัน ส่วนใหญ่เปิดถึงค่ำ ควรเติมให้เต็มก่อนไปเส้นทางไกล',
      },
      {
        zh: '摩托车维修与补胎店集中在主路两侧。',
        en: 'Motorcycle repair and tyre shops cluster along the main road.',
        th: 'ร้านซ่อมมอเตอร์ไซค์และปะยางรวมอยู่สองข้างถนนสายหลัก',
      },
      {
        zh: '电动车充电点数量有限，建议出发前确认住处是否可充电。',
        en: 'EV charging points are few; confirm whether your accommodation can charge a vehicle before setting out.',
        th: 'จุดชาร์จรถไฟฟ้ามีจำกัด ควรสอบถามที่พักล่วงหน้าว่าสามารถชาร์จได้หรือไม่',
      },
    ],
    note: {
      zh: '前往 Kaeng Khut Khu 等外围景点前，建议先补足油量。',
      en: 'Top up the tank before heading to outlying spots such as Kaeng Khut Khu.',
      th: 'ควรเติมน้ำมันให้พอก่อนไปจุดไกลอย่างแก่งคุดคู้',
    },
  },
  {
    id: 'medical',
    icon: '🏥',
    category: { zh: '医疗与药房', en: 'Medical care & pharmacies', th: 'การแพทย์และร้านขายยา' },
    items: [
      {
        zh: '镇内药房可购买常用感冒药、肠胃药与外用药。',
        en: 'Town pharmacies stock common cold, stomach and topical medicines.',
        th: 'ร้านขายยาในเมืองมียาสามัญสำหรับหวัด กระเพาะ และยาใช้ภายนอก',
      },
      {
        zh: '乡镇卫生站可处理轻微外伤与常见病症。',
        en: 'The sub-district health station handles minor injuries and common complaints.',
        th: 'สถานีอนามัยตำบลรับมือบาดแผลเล็กน้อยและอาการทั่วไปได้',
      },
      {
        zh: '较严重的情况需转诊至黎府城区的医院，车程约 1.5 小时。',
        en: 'More serious cases are referred to hospitals in Loei town, about 1.5 hours away by road.',
        th: 'กรณีรุนแรงขึ้นจะส่งต่อไปโรงพยาบาลในตัวเมืองเลย ห่างประมาณ 1.5 ชั่วโมงโดยรถ',
      },
    ],
    note: {
      zh: '建议自带常用药与个人处方药；夜间就诊选择有限。',
      en: 'Bring your usual medicines and any prescriptions; night-time options are limited.',
      th: 'ควรพกยาประจำตัวและยาตามใบสั่งแพทย์ ตัวเลือกช่วงกลางคืนมีจำกัด',
    },
  },
  {
    id: 'money',
    icon: '🏧',
    category: { zh: '金融与通信', en: 'Money & connectivity', th: 'การเงินและการเชื่อมต่อ' },
    items: [
      {
        zh: 'ATM 与货币兑换点集中在镇中心主要路口。',
        en: 'ATMs and currency exchange cluster at the main junctions in the town centre.',
        th: 'ตู้ ATM และจุดแลกเงินกระจุกอยู่บริเวณแยกหลักในตัวเมือง',
      },
      {
        zh: '卡片支付在酒店与咖啡店较普及，摊位仍以现金为主。',
        en: 'Card payment is common in hotels and cafés, while stalls mostly take cash.',
        th: 'การจ่ายบัตรนิยมในโรงแรมและร้านกาแฟ ส่วนแผงค้ายังใช้เงินสดเป็นหลัก',
      },
      {
        zh: '移动网络覆盖良好，多数咖啡店提供无线网络。',
        en: 'Mobile coverage is good, and most cafés provide Wi-Fi.',
        th: 'สัญญาณมือถือครอบคลุมดี และร้านกาแฟส่วนใหญ่มีไวไฟฟรี',
      },
    ],
    note: {
      zh: '夜市购物请备足现金，小额面额最方便。',
      en: 'Carry enough cash for the market, preferably in small notes.',
      th: 'ควรเตรียมเงินสดให้พอสำหรับตลาด และใช้ธนบัตรย่อยสะดวกที่สุด',
    },
  },
  {
    id: 'practical',
    icon: '🎒',
    category: { zh: '寄存、失物与便民', en: 'Luggage, lost property & practical help', th: 'ฝากกระเป๋า ของหาย และเรื่องใช้สอย' },
    items: [
      {
        zh: '部分民宿与客栈可提供行李寄存，退房后仍可继续游览。',
        en: 'Some guesthouses and inns store luggage, so you can keep exploring after check-out.',
        th: 'เกสต์เฮาส์และที่พักบางแห่งรับฝากกระเป๋า ทำให้เที่ยวต่อได้หลังเช็กเอาต์',
      },
      {
        zh: '遗落物品可先询问所在摊主，或前往镇内派出所请警方协助查找。',
        en: 'For lost items, first ask the stallholder where you noticed it missing, then the local police station for help.',
        th: 'หากของหาย ให้ถามพ่อค้าแม่ค้าที่พบว่าหายก่อน แล้วขอความช่วยเหลือจากสถานีตำรวจในพื้นที่',
      },
      {
        zh: '雨具、防蚊液与防晒用品可在便利店临时购买。',
        en: 'Rain gear, mosquito repellent and sunscreen can be bought at convenience stores.',
        th: 'อุปกรณ์กันฝน ยากันยุง และครีมกันแดด หาซื้อได้ที่ร้านสะดวกซื้อ',
      },
    ],
    note: {
      zh: '贵重物品请随身携带，人流高峰时段注意随身包袋。',
      en: 'Keep valuables on you and mind your bag during the busiest hours.',
      th: 'พกของมีค่าไว้กับตัว และระวังกระเป๋าในช่วงคนแน่น',
    },
  },
];

/* ------------------------------------------------------------------ */
/* 7. Visitor responsibility & interpretation                           */
/* ------------------------------------------------------------------ */

const responsibility: ResponsibilityEntry[] = [
  {
    id: 'living-street',
    icon: '🏘️',
    title: { zh: '这是一条仍在生活的街道', en: 'A street that is still lived in', th: 'นี่คือถนนที่ผู้คนยังอาศัยอยู่จริง' },
    body: {
      zh: '居民仍在这些老屋里生活、开店、祭拜。请控制音量，不擅自进入院落或推门参观；拍摄人物前先示意并取得同意。傍晚开店时的忙碌，是他们的日常而非表演。',
      en: 'Residents still live, trade and make offerings in these old houses. Keep your voice down, do not enter courtyards or push doors open, and signal for consent before photographing people. The bustle of opening up at dusk is their ordinary day, not a performance.',
      th: 'ชาวบ้านยังคงอาศัย ค้าขาย และประกอบพิธีในบ้านเก่าเหล่านี้ โปรดลดเสียง ไม่เข้าลานบ้านหรือเปิดประตูเอง และขออนุญาตก่อนถ่ายภาพบุคคล ความวุ่นวายตอนเปิดร้านยามเย็นคือชีวิตปกติ ไม่ใช่การแสดง',
    },
  },
  {
    id: 'car-free',
    icon: '🚫',
    title: { zh: '无车街区的意义', en: 'Why the street is car-free', th: 'เหตุใดถนนจึงปลอดรถ' },
    body: {
      zh: '主街在傍晚时段禁止机动车通行，并非只为营造氛围，而是为了行人安全，并减轻百年木构长期承受的振动与磨损。请勿将摩托车驶入或停靠在街内，接送请在外围道路完成。',
      en: 'The main street closes to motor vehicles in the evening not for atmosphere but for pedestrian safety and to spare century-old timber from vibration and wear. Do not ride or park a motorcycle inside the street; arrange pick-ups and drop-offs on the outer roads.',
      th: 'ถนนสายหลักงดรถยนต์ช่วงเย็น ไม่ใช่เพื่อบรรยากาศเท่านั้น แต่เพื่อความปลอดภัยของผู้เดินและลดการสั่นสะเทือนที่ทำลายโครงไม้ร้อยปี โปรดอย่าขับหรือจอดมอเตอร์ไซค์ในถนน ให้รับ–ส่งที่ถนนรอบนอก',
    },
  },
  {
    id: 'timber',
    icon: '🪵',
    title: { zh: '木构建筑的脆弱性', en: 'The fragility of timber buildings', th: 'ความเปราะบางของอาคารไม้' },
    body: {
      zh: '老屋以柚木与榫卯建成，立面与门窗往往是数十年甚至上百年的原件。请勿倚靠栏杆、坐上门槛、攀爬或在木构件上刻画涂写；雨天湿滑，也请避免手扶潮湿的雕花部位。',
      en: 'The houses are built of teak and joinery, and facades, doors and windows are often decades or a century old. Do not lean on railings, sit on thresholds, climb, or carve and write on timber. On wet days the surfaces are slippery, so avoid gripping damp carved elements as well.',
      th: 'บ้านเก่าสร้างจากไม้สักและการเข้าไม้ รูปด้าน ประตู และหน้าต่างมักเป็นของเดิมอายุนับสิบถึงร้อยปี โปรดอย่าพิงราว อย่านั่งธรณีประตู อย่าปีน และอย่าขีดเขียนบนไม้ ในวันเปียกฝนผิวไม้ลื่น ควรหลีกเลี่ยงการจับส่วนแกะสลักที่ชื้น',
    },
  },
  {
    id: 'temple',
    icon: '🙏',
    title: { zh: '寺院与信仰礼仪', en: 'Temple and belief etiquette', th: 'มารยาทในวัดและความเชื่อ' },
    body: {
      zh: '进入寺院需脱鞋，着装应遮肩过膝，避免触碰法器与佛像；女性请勿与僧侣有直接身体接触，递交物品可经由他人或置于布上。拍摄佛像前，请先确认现场是否有禁止标示。',
      en: 'Remove your shoes at temples, keep shoulders and knees covered, and avoid touching ritual objects or Buddha images. Women should not make direct physical contact with monks — hand items via another person or place them on a cloth. Before photographing images of the Buddha, check for any prohibition notices on site.',
      th: 'เข้าวัดต้องถอดรองเท้า แต่งกายปิดไหล่และเข่า หลีกเลี่ยงการแตะเครื่องศาสนวัตถุและพระพุทธรูป สตรีไม่ควรสัมผัสพระสงฆ์โดยตรง ให้ยื่นของผ่านผู้อื่นหรือวางบนผ้า ก่อนถ่ายภาพพระพุทธรูปควรดูว่ามีป้ายห้ามหรือไม่',
    },
  },
  {
    id: 'river',
    icon: '🐟',
    title: { zh: '湄公河、垃圾与野生动物', en: 'The Mekong, waste and wildlife', th: 'แม่น้ำโขง ขยะ และสัตว์ป่า' },
    body: {
      zh: '请尽量减少一次性塑料与泡沫制品，垃圾随身带走或投入指定收集点；不投喂河鱼、水鸟与其他野生动物，也不购买任何野生动物制品。湄公河的鱼类资源正在减少，消费选择本身就是保护行为的一部分。',
      en: 'Cut down on single-use plastic and foam, and take your litter with you or put it in the designated collection points. Do not feed fish, water birds or other wildlife, and do not buy wildlife products of any kind. Mekong fish stocks are declining, and what visitors choose to consume is part of the pressure or part of the protection.',
      th: 'ลดการใช้พลาสติกและโฟมแบบใช้ครั้งเดียว ทิ้งขยะในจุดที่กำหนดหรือนำกลับ ไม่ให้อาหารปลา นกน้ำ หรือสัตว์ป่า และไม่ซื้อผลิตภัณฑ์จากสัตว์ป่าไม่ว่าชนิดใด ทรัพยากรปลาในโขงกำลังลดลง สิ่งที่ผู้มาเยือนเลือกบริโภคจึงเป็นส่วนหนึ่งของแรงกดดันหรือการปกป้อง',
    },
  },
  {
    id: 'local-economy',
    icon: '🧺',
    title: { zh: '让收益留在社区', en: 'Keeping the benefit in the community', th: 'ให้ผลประโยชน์อยู่กับชุมชน' },
    body: {
      zh: '相同的花费，向本地摊商、家庭旅馆与手工艺人消费，收益会留在社区，并支持老屋的日常修缮。请理性议价，避免把当地当作“廉价体验”的场所。',
      en: 'Spending the same amount with local stalls, family-run lodgings and craftspeople keeps the benefit in the community and helps fund the everyday upkeep of the old houses. Bargain reasonably, and avoid treating the place as a cheap experience.',
      th: 'การใช้จ่ายจำนวนเดียวกันกับแผงค้าท้องถิ่น ที่พักแบบครอบครัว และช่างฝีมือ ทำให้ผลประโยชน์อยู่กับชุมชน และช่วยสนับสนุนการซ่อมบำรุงบ้านเก่า ควรต่อรองอย่างมีเหตุผลและไม่มองที่นี่เป็นที่ซื้อประสบการณ์ราคาถูก',
    },
  },
  {
    id: 'water-safety',
    icon: '🌊',
    title: { zh: '水边安全', en: 'Safety by the water', th: 'ความปลอดภัยริมน้ำ' },
    body: {
      zh: '雨季水位上涨迅速，礁石滩与临水边缘湿滑且水下情况不定。请勿下水游泳或涉水拍照，儿童需全程由成人牵手看护；若发现水位异常上涨，请尽快离开河岸。',
      en: 'In the rainy season the water rises quickly, and rock shelves and the water’s edge are slippery with uncertain conditions below the surface. Do not swim or wade for photographs, keep children by the hand at all times, and leave the bank promptly if the water rises unusually fast.',
      th: 'ในฤดูฝนระดับน้ำขึ้นเร็ว โขดหินและขอบน้ำลื่นและสภาพใต้ผิวน้ำไม่แน่นอน อย่าว่ายน้ำหรือลงน้ำเพื่อถ่ายภาพ จับมือเด็กตลอดเวลา และออกจากริมฝั่งทันทีหากน้ำขึ้นผิดปกติ',
    },
  },
];

/* ------------------------------------------------------------------ */
/* 8. Glossary                                                         */
/* ------------------------------------------------------------------ */

const glossary: GlossaryEntry[] = [
  {
    term: 'เชียง · Chiang',
    meaning: { zh: '傣泰语词素，指设有城垣的聚落或“城”。', en: 'Tai root meaning a walled settlement or town.', th: 'คำไทที่หมายถึงชุมชนมีกำแพงล้อมหรือเมือง' },
  },
  {
    term: 'แก่ง · Kaeng',
    meaning: { zh: '河床礁石形成的浅滩急流，湄公河地名常见词素。', en: 'Rapids over a rocky riverbed; a common Mekong place-name element.', th: 'แก่งหินในท้องน้ำ คำที่พบบ่อยในชื่อสถานที่ริมโขง' },
  },
  {
    term: 'อีสาน · Isan',
    meaning: { zh: '泰国东北部地区，及其与老挝同源的文化圈。', en: 'North-eastern Thailand and its Lao-linked cultural sphere.', th: 'ภาคตะวันออกเฉียงเหนือของไทยและวัฒนธรรมที่เชื่อมโยงกับลาว' },
  },
  {
    term: 'หมอลำ · Mor Lam',
    meaning: { zh: '依善与老挝传统的叙事歌谣表演形式。', en: 'Traditional narrative singing of the Isan–Lao tradition.', th: 'การขับร้องเล่าเรื่องแบบดั้งเดิมของอีสาน–ลาว' },
  },
  {
    term: 'ลอยเรือไฟ · Lai Ruea Fai',
    meaning: { zh: '解夏节沿湄公河放流点火船只的仪式。', en: 'The illuminated-boat rite floated on the Mekong at the end of the rains retreat.', th: 'พิธีปล่อยเรือจุดไฟลงน้ำโขงในช่วงออกพรรษา' },
  },
  {
    term: 'บุญบั้งไฟ · Bun Bang Fai',
    meaning: { zh: '以竹制火箭求雨的节庆。', en: 'The rocket festival held to ask for rain.', th: 'ประเพณีบุญบั้งไฟเพื่อขอฝน' },
  },
  {
    term: 'พญานาค · Naga',
    meaning: { zh: '民间信仰中的圣蛇／河神，湄公河的守护者。', en: 'The serpent spirit of folk belief, guardian of the Mekong.', th: 'พญานาค ผู้พิทักษ์แม่น้ำโขงตามความเชื่อท้องถิ่น' },
  },
  {
    term: 'ศาลพระภูมิ · San Phra Phum',
    meaning: { zh: '屋前架高的小祠堂，供奉家宅守护之灵。', en: 'The small raised spirit shrine in front of a house or business.', th: 'ศาลเล็กยกสูงหน้าบ้านสำหรับสิ่งศักดิ์สิทธิ์ประจำที่' },
  },
  {
    term: 'ข้าวเปียกเส้น · Khao Piak Sen',
    meaning: { zh: '老挝风味米线汤，依善地区常见的早餐与主食。', en: 'Lao-style rice noodle soup, a common breakfast in Isan.', th: 'ก๋วยเตี๋ยวเส้นอ่อนแบบลาว เป็นอาหารเช้าที่พบทั่วไปในอีสาน' },
  },
  {
    term: 'เมี่ยงคำ · Miang Kham',
    meaning: { zh: '叶包小吃，以叶片包裹调味配料一口食用。', en: 'A leaf-wrapped snack eaten in a single bite.', th: 'ของว่างที่ห่อคำด้วยใบไม้ กินหมดในคำเดียว' },
  },
  {
    term: 'โฮมสเตย์ · Homestay',
    meaning: { zh: '家庭式民宿，多见于河畔老屋聚落。', en: 'Family-run lodging, common among riverside old-house communities.', th: 'ที่พักแบบอยู่ร่วมกับเจ้าของบ้าน พบมากในชุมชนบ้านเก่าริมน้ำ' },
  },
  {
    term: 'ของฝาก · Khong Fak',
    meaning: { zh: '伴手礼、带给亲友的当地特产。', en: 'Souvenir gifts bought locally for people back home.', th: 'ของฝากที่ซื้อในท้องถิ่นสำหรับคนทางบ้าน' },
  },
];

/* ------------------------------------------------------------------ */
/* 10. Direct answers                                                  */
/*                                                                     */
/* These three tables exist for the queries that reach this site but   */
/* never click: the Thai "เปิดวันไหน / เปิดกี่โมง" opening-hours intent, */
/* the "ภาษาอังกฤษ" what-is-it-called-in-English intent, and the        */
/* "how do I actually get there" intent. Each row answers in the       */
/* first clause so the answer can be lifted straight into a snippet.   */
/* ------------------------------------------------------------------ */

const schedule: AnswerRow[] = [
  {
    label: { zh: '开放日', en: 'Opening days', th: 'วันที่เปิด' },
    value: { zh: '每天开放，全年无休', en: 'Open every day, all year round', th: 'เปิดทุกวัน ตลอดทั้งปี' },
    note: { zh: '含公共假日与佛日', en: 'Including public holidays and Buddhist holy days', th: 'รวมวันหยุดนักขัตฤกษ์และวันพระ' },
  },
  {
    label: { zh: '开市时间', en: 'Opening time', th: 'เวลาเปิด' },
    value: { zh: '17:00', en: '17:00', th: '17:00' },
    note: { zh: '摊贩约 16:30 起陆续就位', en: 'Stalls start setting up from about 16:30', th: 'ร้านเริ่มตั้งแผงราว 16:30' },
  },
  {
    label: { zh: '收市时间', en: 'Closing time', th: 'เวลาปิด' },
    value: { zh: '22:00', en: '22:00', th: '22:00' },
    note: { zh: '部分摊位 21:30 后开始收摊', en: 'Some stalls pack up after 21:30', th: 'บางร้านเริ่มเก็บของหลัง 21:30' },
  },
  {
    label: { zh: '最热闹时段', en: 'Busiest window', th: 'ช่วงคนเยอะที่สุด' },
    value: { zh: '18:30–20:30', en: '18:30–20:30', th: '18:30–20:30' },
    note: { zh: '凉季与周末摊位最全', en: 'Most stalls open in the cool season and at weekends', th: 'ร้านครบที่สุดในฤดูหนาวและสุดสัปดาห์' },
  },
  {
    label: { zh: '门票', en: 'Entrance fee', th: 'ค่าเข้า' },
    value: { zh: '免费进入', en: 'Free to enter', th: 'เข้าฟรี' },
    note: { zh: '只在你购买商品时付费', en: 'You only pay for what you buy', th: 'จ่ายเฉพาะของที่ซื้อ' },
  },
  {
    label: { zh: '雨天是否开放', en: 'Open when it rains?', th: 'ฝนตกยังเปิดไหม' },
    value: { zh: '照常开放', en: 'Yes, still open', th: 'เปิดตามปกติ' },
    note: {
      zh: '露天摊位可能提前收摊，沿街店铺可以避雨',
      en: 'Open-air stalls may close early; shophouses along the street offer cover',
      th: 'แผงกลางแจ้งอาจเก็บเร็ว ร้านในตึกแถวหลบฝนได้',
    },
  },
  {
    label: { zh: '建议到达时间', en: 'Best arrival time', th: 'เวลาที่ควรไปถึง' },
    value: { zh: '17:30 前后', en: 'Around 17:30', th: 'ราว 17:30' },
    note: {
      zh: '先到河岸看落日，再回头逛夜市',
      en: 'Go to the riverbank for the sunset first, then walk the market',
      th: 'ไปริมฝั่งดูพระอาทิตย์ตกก่อน แล้วค่อยเดินตลาด',
    },
  },
];

const access: AnswerRow[] = [
  {
    label: { zh: '行政区', en: 'Administrative area', th: 'เขตการปกครอง' },
    value: {
      zh: '泰国黎府清刊县 Chai Kong 路',
      en: 'Chai Kong Road, Chiang Khan District, Loei, Thailand',
      th: 'ถนนชายโขง อำเภอเชียงคาน จังหวัดเลย ประเทศไทย',
    },
    note: { zh: '邮政编码 42110', en: 'Postal code 42110', th: 'รหัสไปรษณีย์ 42110' },
  },
  {
    label: { zh: '最近机场', en: 'Nearest airport', th: 'สนามบินที่ใกล้ที่สุด' },
    value: { zh: '黎府机场（LOE）', en: 'Loei Airport (LOE)', th: 'สนามบินเลย (LOE)' },
    note: { zh: '约 55 公里，车程 1.5 小时', en: 'About 55 km, 1.5 hours by road', th: 'ราว 55 กิโลเมตร ใช้เวลา 1.5 ชั่วโมง' },
  },
  {
    label: { zh: '从镇上到街口', en: 'From Chiang Khan town', th: 'จากตัวเมืองเชียงคาน' },
    value: { zh: '步行或租自行车即可', en: 'On foot or by rented bicycle', th: 'เดินหรือเช่าจักรยาน' },
    note: { zh: '主街禁止机动车通行', en: 'The main street is closed to motor vehicles', th: 'ถนนสายหลักห้ามรถยนต์เข้า' },
  },
  {
    label: { zh: '导航定位', en: 'Navigation', th: 'การนำทาง' },
    value: { zh: 'Plus Code VMW6+R8 Chiang Khan', en: 'Plus Code VMW6+R8 Chiang Khan', th: 'รหัสพลัส VMW6+R8 Chiang Khan' },
    note: {
      zh: '在 Google 地图粘贴即可直接定位到街口',
      en: 'Paste into Google Maps to land on the street entrance',
      th: 'วางใน Google Maps เพื่อปักหมุดที่ปากถนน',
    },
  },
];

const nameForms: NameForm[] = [
  {
    script: 'TH',
    label: { zh: '泰文（当地用语）', en: 'Thai (local)', th: 'ภาษาไทย (ท้องถิ่น)' },
    value: 'ถนนคนเดินเชียงคาน',
    usage: { zh: '给司机看、问路时使用', en: 'Show to a driver or when asking for directions', th: 'โชว์ให้คนขับรถดู หรือใช้ถามทาง' },
  },
  {
    script: 'EN',
    label: { zh: '英文名称', en: 'English name', th: 'ชื่อภาษาอังกฤษ' },
    value: 'Chiang Khan Walking Street',
    usage: {
      zh: '地图、订房与英文网站检索',
      en: 'Use on maps, booking sites and English search',
      th: 'ใช้ค้นหาในแผนที่ เว็บจองที่พัก และการค้นหาภาษาอังกฤษ',
    },
  },
  {
    script: 'ZH',
    label: { zh: '中文名称', en: 'Chinese name', th: 'ชื่อภาษาจีน' },
    value: '清刊步行街',
    usage: { zh: '中文沟通与笔记', en: 'For Chinese-language conversation and notes', th: 'ใช้สื่อสารและจดบันทึกภาษาจีน' },
  },
  {
    script: 'EN',
    label: { zh: '常见英文拼写', en: 'Common English spellings', th: 'การสะกดภาษาอังกฤษที่พบบ่อย' },
    value: 'Chiang Khan / Chiangkhan / Chang Khan',
    usage: {
      zh: '几种拼写指向同一地点，搜索时都可使用',
      en: 'These variants all resolve to the same place in search',
      th: 'ทุกรูปสะกดค้นหาแล้วเจอสถานที่เดียวกัน',
    },
  },
  {
    script: 'TH',
    label: { zh: '泰文地址', en: 'Thai address', th: 'ที่อยู่ภาษาไทย' },
    value: 'ถนนชายโขง ตำบลเชียงคาน อำเภอเชียงคาน จังหวัดเลย 42110',
    usage: { zh: '打车、寄件或填写表单', en: 'For taxis, post or forms', th: 'ใช้กับแท็กซี่ ไปรษณีย์ หรือกรอกแบบฟอร์ม' },
  },
  {
    script: 'PLUS',
    label: { zh: 'Plus Code', en: 'Plus Code', th: 'รหัสพลัส' },
    value: 'VMW6+R8 Chiang Khan',
    usage: {
      zh: '在 Google 地图直接定位到街口',
      en: 'Drops a pin at the street entrance in Google Maps',
      th: 'ปักหมุดที่ปากถนนใน Google Maps',
    },
  },
];

const practical: PracticalInfo = {
  schedule,
  access,
  nameForms,
  localAddress: 'ถนนชายโขง ตำบลเชียงคาน อำเภอเชียงคาน จังหวัดเลย 42110',
};

export const extendedContent: ExtendedContent = {
  deepDive,
  legends,
  quarters,
  audiencePlans,
  dayPlans,
  facilities,
  responsibility,
  glossary,
  practical,
};






