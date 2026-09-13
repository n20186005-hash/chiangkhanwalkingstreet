// ============================================================================
// POI DATA MODEL — single source of truth for the attraction knowledge graph.
//
// This is the "Attraction POI 主表". One record here drives:
//   - the main attraction page (all 16 modules)
//   - every SEO sub-page in the matrix ([slug]/[section])
//   - the multi-language rendering (Tr = translated string per language)
//
// To add a new attraction: append one record below. Everything else
// (pages, components, hreflang, JSON-LD, language switching) is automatic.
// ============================================================================

import {
  extendedContent,
  type AudiencePlan,
  type DayPlan,
  type DeepDiveEntry,
  type FacilityGroup,
  type GlossaryEntry,
  type LegendEntry,
  type PracticalInfo,
  type QuarterEntry,
  type ResponsibilityEntry,
} from './attraction-content';

export type Lang = 'zh' | 'en' | 'th';
export type Tr = Record<Lang, string>;

export interface AttractionImage {
  file: string;
  caption: Tr;
}

export interface Attraction {
  id: string;
  slug: string;

  // --- core identity (name_local is the endonym, e.g. Thai script) ---
  name: Tr;
  nameLocal: string;
  tagline: Tr;
  country: string;
  province: string;
  city: string;
  category: string[];

  // --- geo (the only thing the <Map /> component needs) ---
  location: {
    lat: number;
    lng: number;
    address: string;
    plusCode: string;
  };

  // --- facts ---
  hours: { open: string; close: string; note: Tr };
  rating: number;
  reviewCount: number;
  mapsUrl: string;
  /** Provenance of the aggregate rating / review count shown on the page. */
  ratingSource: { name: string; url: string; retrieved: string };

  // --- media (future: sourced from Wikimedia Commons, user uploads) ---
  images: AttractionImage[];

  // --- content modules (localized) ---
  intro: Tr;
  history: Tr;
  timeline?: { year: string; event: Tr }[];
  folklore?: Tr;
  preservation?: Tr;
  localVoices?: { quote: Tr; author: Tr }[];
  whyVisit: Tr[];
  thingsToDo: { title: Tr; desc: Tr }[];
  routes: {
    thirty: { title: Tr; steps: Tr[] };
    twoHour: { title: Tr; steps: { time: string; text: Tr }[] };
    halfDay: { title: Tr; text: Tr };
  };
  bestTime: { rows: { range: string; score: number; note: Tr }[]; reasons: Tr };
  transport: { from: Tr; mode: Tr; duration: Tr; steps: Tr[] }[];
  food: { name: string; type: Tr; desc: Tr; origin: string }[];
  nearby: { name: Tr; type: Tr; desc: Tr }[];
  culture: Tr;
  photography: Tr;
  accessibility: Tr;
  faq: { q: Tr; a: Tr }[];
  visitorSummary: { positives: Tr[]; negatives: Tr[] };
  sources: { name: string; url: string }[];

  // --- extended educational content (see ./attraction-content.ts) ---
  /** Interpretive essays: geography, architecture, culture, place names. */
  deepDive: DeepDiveEntry[];
  /** Local legends and oral tradition, each with an optional source caveat. */
  legends: LegendEntry[];
  /** Quarterly planning matrix (weather / water / wildlife / advice). */
  quarters: QuarterEntry[];
  /** Route plans built around a specific audience. */
  audiencePlans: AudiencePlan[];
  /** Generic half-day and full-day itineraries. */
  dayPlans: DayPlan[];
  /** Visitor services, described by category only — never a named business. */
  facilities: FacilityGroup[];
  /** Visitor responsibility and behavioural guidance. */
  responsibility: ResponsibilityEntry[];
  /** Small bilingual glossary of local terms. */
  glossary: GlossaryEntry[];
  /** Direct answers: opening schedule, access and name forms per script. */
  practical: PracticalInfo;
}

export const attractions: Attraction[] = [
  {
    id: 'chiang_khan_walking_street',
    slug: 'chiang-khan-walking-street',
    name: {
      zh: '清刊步行街',
      en: 'Chiang Khan Walking Street',
      th: 'ถนนคนเดินเชียงคาน',
    },
    nameLocal: 'ถนนคนเดินเชียงคาน',
    tagline: {
      zh: '湄公河畔的百年木街，慢城夜市的温柔傍晚。',
      en: 'A century-old timber street by the Mekong — slow town, gentle evening market.',
      th: 'ถนนไม้ร้อยปีริมโขง เมืองช้า ตลาดนัดยามเย็นที่แผ่วเบา',
    },
    country: 'Thailand',
    province: 'Loei',
    city: 'Chiang Khan',
    category: ['Night Market', 'Walking Street', 'Cultural Street', 'Local Food Market'],

    location: {
      lat: 17.8969,
      lng: 101.6594,
      address: 'Chai Kong, Chiang Khan, Chiang Khan District, Loei 42110',
      plusCode: 'VMW6+R8 Chiang Khan',
    },

    hours: { open: '17:00', close: '22:00', note: {
      zh: '每日傍晚 17:00 至 22:00 开放，雨季客流较少。',
      en: 'Open every evening 17:00–22:00; quieter during the rainy season.',
      th: 'เปิดทุกเย็น 17:00–22:00 ในช่วงฝนคนจะบางตาลง',
    } },
    rating: 4.5,
    reviewCount: 12158,
    mapsUrl: 'https://maps.app.goo.gl/TwNr5mSMUff1hf8G7',
    ratingSource: {
      name: 'Google Maps',
      url: 'https://maps.app.goo.gl/TwNr5mSMUff1hf8G7',
      retrieved: 'September 2026',
    },

    images: Array.from({ length: 15 }, (_, i) => ({
      file: `/gallery/chiang-khan-walking-street-${i + 1}.jpg`,
      caption: {
        zh: `清刊步行街实景 ${i + 1}`,
        en: `Chiang Khan Walking Street scene ${i + 1}`,
        th: `บรรยากาศถนนคนเดินเชียงคาน ${i + 1}`,
      },
    })),

    history: {
      zh: '清刊自湄公河航运时代便是老挝边境的河港小镇。20 世纪初，这里是湄公河航运黄金时代的繁荣边境商埠。当时的富商与工匠沿主街建造了融合老挝传统与法国殖民地风格的木构店屋。随着公路的兴起，水路贸易衰退，小镇一度沉寂，却也因此将这些珍贵的木建筑完整保留至今。',
      en: 'Chiang Khan grew as a Mekong river-port on the Lao border. In the early 20th century, it was a prosperous border port during the golden age of Mekong River trade. Wealthy merchants and artisans built wooden shophouses along the main street, blending traditional Lao and French colonial styles. As road transport rose, river trade declined, leaving the town quiet but perfectly preserving these wooden structures.',
      th: 'เชียงคานเติบโตเป็นท่าจอดเรือริมโขงชายแดนลาว ในช่วงต้นศตวรรษที่ 20 ที่นี่เป็นเมืองท่าชายแดนที่เจริญรุ่งเรืองในยุคทองของการค้าแม่น้ำโขง พ่อค้าและช่างฝีมือได้สร้างบ้านไม้แถวตามถนนสายหลัก ซึ่งผสมผสานสถาปัตยกรรมลาวดั้งเดิมและอาณานิคมฝรั่งเศส เมื่อการขนส่งทางถนนเพิ่มขึ้น การค้าทางน้ำจึงลดลง ทำให้เมืองเงียบสงบ แต่ก็ช่วยอนุรักษ์อาคารไม้เหล่านี้ไว้อย่างสมบูรณ์',
    },

    timeline: [
      { year: '1890s', event: { zh: '老挝与法国商人沿河建立贸易据点', en: 'Lao and French merchants establish river trade posts', th: 'พ่อค้าลาวและฝรั่งเศสตั้งจุดการค้าริมแม่น้ำ' } },
      { year: '1919', event: { zh: '清刊现存最古老的柚木店屋（现为老屋客栈）落成', en: 'The oldest surviving teak shophouse in Chiang Khan is built', th: 'บ้านไม้สักที่เก่าแก่ที่สุดในเชียงคานสร้างเสร็จ' } },
      { year: '1970s', event: { zh: '公路运输兴起，湄公河水路贸易逐渐衰退，旧放映厅等公共空间停业', en: 'Road transport rises, Mekong river trade declines, old cinemas close', th: 'การขนส่งทางถนนเพิ่มขึ้น การค้าทางแม่น้ำโขงลดลง โรงภาพยนตร์เก่าปิดตัว' } },
      { year: '2009', event: { zh: '社区发起老街保护运动，限制车辆并转型为文化步行街', en: 'Community launches old street preservation movement, transforming into a cultural walking street', th: 'ชุมชนริเริ่มการอนุรักษ์ถนนเก่า เปลี่ยนเป็นถนนคนเดินเชิงวัฒนธรรม' } },
    ],

    folklore: {
      zh: '湄公河沿岸居民世代信仰水神“那伽”（Naga）。作为一种半神半蛇的超自然存在，那伽被认为是河流的守护者，掌管降雨与丰收。在清刊的建筑细节与传统节日（如解夏节的火船游行）中，都能寻见那伽图腾的印记，这反映了依善地区与自然共生的深层水系人类学特征。',
      en: 'Residents along the Mekong River have worshipped the water deity "Naga" for generations. A supernatural serpentine being, the Naga is considered the guardian of the river, controlling rain and harvest. Naga motifs can be seen in Chiang Khan\'s architectural details and traditional festivals (like the Illuminated Boat Procession), reflecting the deep hydrological anthropology of the Isan region living in harmony with nature.',
      th: 'ชาวบ้านริมฝั่งแม่น้ำโขงมีความเชื่อในเทพแห่งน้ำ "พญานาค" มาหลายชั่วอายุคน ในฐานะสิ่งมีชีวิตเหนือธรรมชาติกึ่งเทพกึ่งงู พญานาคถือเป็นผู้พิทักษ์แม่น้ำ ผู้ควบคุมฝนและการเก็บเกี่ยว ลวดลายพญานาคสามารถพบเห็นได้ในรายละเอียดสถาปัตยกรรมของเชียงคานและเทศกาลดั้งเดิม ซึ่งสะท้อนถึงมานุษยวิทยาทางน้ำที่ลึกซึ้งของภูมิภาคอีสานที่อยู่ร่วมกับธรรมชาติ',
    },

    preservation: {
      zh: '面对旅游业的冲击，清刊原住民主动发起了“慢城”保护运动。社区制定了严格的木屋修缮规范，禁止破坏原有立面；同时实施主街车辆限行，以保护脆弱的百年木结构。作为非盈利机构，我们呼吁访客尊重当地的生活节奏，支持在地小微商户，共同践行可持续旅游（Sustainable Tourism）的理念。',
      en: 'Facing the impact of tourism, indigenous Chiang Khan residents initiated a "Slow Town" preservation movement. The community established strict guidelines for wooden house repairs, prohibiting alterations to original facades, and implemented vehicle restrictions on the main street to protect the fragile century-old structures. We urge visitors to respect the local pace of life, support local micro-businesses, and practice sustainable tourism.',
      th: 'เมื่อเผชิญกับผลกระทบจากการท่องเที่ยว ชาวเชียงคานพื้นเมืองได้ริเริ่มการเคลื่อนไหวเพื่อการอนุรักษ์ "เมืองช้า" ชุมชนได้กำหนดแนวทางที่เข้มงวดในการซ่อมแซมบ้านไม้ ห้ามดัดแปลงส่วนหน้าอาคารเดิม และจำกัดยานพาหนะบนถนนสายหลักเพื่อปกป้องโครงสร้างไม้อายุร้อยปีที่เปราะบาง เราขอเรียกร้องให้ผู้มาเยือนเคารพจังหวะชีวิตในท้องถิ่น สนับสนุนธุรกิจรายย่อย และร่วมกันปฏิบัติตามแนวทางการท่องเที่ยวอย่างยั่งยืน',
    },

    localVoices: [
      {
        quote: { zh: '“我们的房子建于 1919 年，用的全是柚木。它不仅仅是商店，更是我们家族四代人的记忆。保留它，就是保留清刊的根。”', en: '"Our house was built in 1919, entirely of teak. It is not just a shop, but the memory of four generations of our family. Preserving it means preserving the roots of Chiang Khan."', th: '"บ้านของเราสร้างขึ้นในปี 1919 ด้วยไม้สักทั้งหมด มันไม่ใช่แค่ร้านค้า แต่เป็นความทรงจำของครอบครัวเราถึงสี่ชั่วอายุคน การรักษามันไว้คือการรักษารากเหง้าของเชียงคาน"' },
        author: { zh: 'Somchai (百年木屋屋主)', en: 'Somchai (Heritage Wooden House Owner)', th: 'สมชาย (เจ้าของบ้านไม้เก่าแก่)' }
      },
      {
        quote: { zh: '“传统的棉织工艺正在流失，但我依然坚持用木织机。这里的每一条纹理，都记录着湄公河的水波。”', en: '"Traditional cotton weaving is fading, but I still insist on using a wooden loom. Every pattern here records the ripples of the Mekong River."', th: '"การทอผ้าฝ้ายแบบดั้งเดิมกำลังเลือนหายไป แต่ฉันยังคงยืนหยัดใช้กี่ทอผ้าไม้ ทุกรอยถักทอที่นี่บันทึกคลื่นน้ำของแม่น้ำโขง"' },
        author: { zh: 'Nid (传统手工织娘)', en: 'Nid (Traditional Weaver)', th: 'นิด (ช่างทอผ้าแบบดั้งเดิม)' }
      }
    ],

    intro: {
      zh: '清刊步行街是位于泰国黎府清刊县、紧邻湄公河的一条百年文化老街。傍晚时分，木构老屋亮起暖灯，沿街摆满地道小吃、手作商品与河畔夜市氛围，是体验依善—老挝边境慢生活的最佳去处。',
      en: 'Chiang Khan Walking Street is a century-old cultural lane beside the Mekong River in Loei Province, Thailand. Each evening the wooden shop-houses glow with warm light while the street fills with local food, handmade crafts and a relaxed riverside night-market mood — a window into the slow border-town life of Isan and Laos.',
      th: 'ถนนคนเดินเชียงคานเป็นถนนวัฒนธรรมเก่าแก่ริมแม่น้ำโขงในจังหวัดเลย ทุกเย็นตัวบ้านไม้จะสว่างไส้ด้วยแสงสีวาร์ม ถนนเต็มไปด้วยอาหารพื้นเมือง ของฝีมือและบรรยากาศตลาดนัดริมน้ำที่ผ่อนคลาย',
    },

    whyVisit: [
      { zh: '百年木建筑：保存完好的殖民时期与老挝风格木屋，适合漫步与摄影。', en: 'Historic atmosphere: well-preserved wooden shophouses in Lao-colonial style, perfect for a stroll and photography.', th: 'บรรยากาศ historic: บ้านไม้สมัยโบราณสไตล์ลาว-โคโลเนียลที่อนุรักษ์ไว้ดีเยี่ยม' },
      { zh: '当地生活方式：感受依善与老挝边境小镇的慢节奏日常。', en: 'Local lifestyle: feel the slow daily rhythm of an Isan–Lao border town.', th: 'วิถีชีวิตท้องถิ่น: สัมผัสจังหวะชีวิตช้าๆ ของเมืองชายแดนอีสาน-ลาว' },
      { zh: '美食体验：从米线汤到叶包小吃，沿街即是流动餐桌。', en: 'Food experience: from noodle soups to leaf-wrapped snacks, the street is a moving table.', th: 'ประสบการณ์อาหาร: จากก๋วยเตี๋ยวถึงขนมห่อใบ ถนนคือโต๊ะอาหารเคลื่อนที่' },
      { zh: '摄影与夕阳：湄公河对岸的老挝山丘是绝佳落日背景。', en: 'Photography & sunset: Lao hills across the Mekong make a perfect sunset backdrop.', th: 'ถ่ายภาพและพระอาทิตย์ตก: ทิวเขาลาวฝั่งโค้งแม่น้ำโขงเป็นฉากพระอาทิตย์ตกที่สวยที่สุด' },
      { zh: '傍晚散步：凉爽的夜间气温与无车街道适合全家闲逛。', en: 'Evening walk: cool night air and car-free lanes suit a relaxed family stroll.', th: 'เดินเล่นยามค่ำ: อากาศเย็นและถนนปลอดรถเหมาะกับการเดินครอบครัว' },
    ],

    thingsToDo: [
      { title: { zh: '逛木屋老街', en: 'Stroll the wooden shophouses', th: 'เดินชมบ้านไม้' }, desc: { zh: '沿主街细看百年木结构与老招牌。', en: 'Read the century-old timberwork and faded signboards along the main lane.', th: 'ชมไม้แกะสลักและป้ายเก่าๆ ตลอดซอยหลัก' } },
      { title: { zh: '品尝街头小吃', en: 'Taste street food', th: 'ลองอาหารข้างถนน' }, desc: { zh: '米线汤、叶包小吃与烤河鱼不容错过。', en: 'Do not miss noodle soup, leaf-wrapped bites and grilled river fish.', th: 'ห้ามพลาดก๋วยเตี๋ยว ขนมห่อใบและปลาเผา' } },
      { title: { zh: '选购手作', en: 'Browse handicrafts', th: 'เลือกของฝีมือ' }, desc: { zh: '棉织品、草药与本地特产集中售卖。', en: 'Cotton textiles, herbal products and local specialties are clustered here.', th: 'ผ้าฝ้าย สมุนไพรและของพื้นเมืองรวมกันที่นี่' } },
      { title: { zh: '湄公河看落日', en: 'Catch the Mekong sunset', th: 'ชมพระอาทิตย์ตกที่โขง' }, desc: { zh: '步行几分钟即到河畔观景步道。', en: 'A few minutes walk reaches the riverside viewing path.', th: 'เดินไม่กี่นาทีก็ถึงทางเดินชมวิวริมน้ำ' } },
    ],

    routes: {
      thirty: {
        title: { zh: '30 分钟精华路线', en: '30-minute highlights', th: 'เส้นทาง 30 นาที' },
        steps: [
          { zh: '街口进入', en: 'Enter at the street gate', th: 'เข้าทางปากซอย' },
          { zh: '百年木建筑', en: 'Old wooden houses', th: 'บ้านไม้โบราณ' },
          { zh: '小吃摊位', en: 'Food stalls', th: 'แผงอาหาร' },
          { zh: '纪念品区', en: 'Souvenir area', th: 'โซนของที่ระลึก' },
          { zh: '湄公河畔夕阳', en: 'Mekong riverside sunset', th: 'พระอาทิตย์ตกริมโขง' },
        ],
      },
      twoHour: {
        title: { zh: '2 小时深度路线', en: '2-hour route', th: 'เส้นทาง 2 ชั่วโมง' },
        steps: [
          { time: '17:00', text: { zh: '抵达街口', en: 'Arrive at the gate', th: 'ถึงปากซอย' } },
          { time: '17:30', text: { zh: '探索街头美食', en: 'Explore street food', th: 'สำรวจอาหารข้างถนน' } },
          { time: '18:30', text: { zh: '摄影时间', en: 'Photography', th: 'ถ่ายภาพ' } },
          { time: '19:30', text: { zh: '选购手作', en: 'Shopping', th: 'ช้อปปิ้ง' } },
          { time: '20:30', text: { zh: '河畔散步', en: 'Riverside walk', th: 'เดินเล่นริมน้ำ' } },
        ],
      },
      halfDay: {
        title: { zh: '半日联游路线', en: 'Half-day combo', th: 'ครึ่งวัน' },
        text: { zh: '步行街 + 湄公河步道 + 老城区 + 周边当地寺庙，串联成半日慢游。', en: 'Pair the walking street with the Mekong promenade, the old town and nearby local temples for a relaxed half-day loop.', th: 'จับคู่ถนนคนเดินกับทางเดินริมโขง เมืองเก่าและวัดท้องถิ่นใกล้เคียงเป็นloop ครึ่งวัน' },
      },
    },

    bestTime: {
      rows: [
        { range: 'Nov–Feb', score: 5, note: { zh: '凉季干爽，落日与夜市体验最佳。', en: 'Cool and dry — best sunsets and market mood.', th: 'หนาวแห้ง เหมาะกับพระอาทิตย์ตกและตลาดนัดที่สุด' } },
        { range: 'Mar–May', score: 3, note: { zh: '炎热但游人适中。', en: 'Hot, but manageable crowds.', th: 'ร้อน แต่คนไม่พลุกพล่านมาก' } },
        { range: 'Jun–Oct', score: 2, note: { zh: '雨季偶阵雨，客流最少、更清净。', en: 'Occasional rain; fewest visitors, very calm.', th: 'มีฝนบางครั้ง คนน้อยที่สุด สงบมาก' } },
      ],
      reasons: { zh: '天气、客流与摄影条件共同决定最佳访问月份；凉季综合评分最高。', en: 'Weather, crowd levels and photo conditions together set the best month; the cool season scores highest overall.', th: 'สภาพอากาศ ความหนาแน่นของนักท่องเที่ยวและเงื่อนไขถ่ายภาพกำหนดเดือนที่ดีที่สุด ฤดูหนาวได้คะแนนสูงสุด' },
    },

    transport: [
      { from: { zh: '从曼谷', en: 'From Bangkok', th: 'จากกรุงเทพฯ' }, mode: { zh: '飞机 + 陆路', en: 'Flight + road', th: 'เครื่องบิน + รถ' }, duration: { zh: '约 4–5 小时', en: 'About 4–5 hours', th: 'ประมาณ 4–5 ชั่วโมง' }, steps: [
        { zh: '曼谷 (DMK/BKK) 飞往黎府机场 (LOE)', en: 'Fly Bangkok (DMK/BKK) to Loei Airport (LOE)', th: 'บินจาก กทม. (DMK/BKK) ไปสนามบินเลย (LOE)' },
        { zh: '机场打车或拼车约 1.5 小时到清刊', en: 'Taxi or shared ride ~1.5h to Chiang Khan', th: 'รถแท็กซี่หรือรถร่วม ~1.5 ชม. ถึงเชียงคาน' },
        { zh: '或乘过夜大巴直抵清刊（约 10–11 小时）', en: 'Or take an overnight bus straight to Chiang Khan (~10–11h)', th: 'หรือนั่งรถบัสค้างคืนถึงเชียงคาน (~10–11 ชม.)' },
      ] },
      { from: { zh: '从清迈', en: 'From Chiang Mai', th: 'จากเชียงใหม่' }, mode: { zh: '自驾 / 巴士', en: 'Drive / bus', th: 'ขับรถ / รถบัส' }, duration: { zh: '约 5–6 小时', en: 'About 5–6 hours', th: 'ประมาณ 5–6 ชั่วโมง' }, steps: [
        { zh: '沿 1 号公路南下经彭世洛转往黎府', en: 'Head south on Route 1 via Phitsanulok toward Loei', th: 'ขึ้นทางหลวง 1 ใต้ผ่านพิษณุโลกไปเลย' },
        { zh: '抵达黎府后继续东北至清刊', en: 'From Loei continue northeast to Chiang Khan', th: 'จากเลยตรงตะวันออกเฉียงเหนือถึงเชียงคาน' },
      ] },
      { from: { zh: '从黎府机场', en: 'From Loei Airport', th: 'จากสนามบินเลย' }, mode: { zh: '出租车 / 拼车', en: 'Taxi / shared', th: 'แท็กซี่ / รถร่วม' }, duration: { zh: '约 1.5 小时', en: 'About 1.5 hours', th: 'ประมาณ 1.5 ชั่วโมง' }, steps: [
        { zh: '机场出口有出租车与拼车点', en: 'Taxi and shared-ride stands at the airport exit', th: 'ป้ายแท็กซี่และรถร่วมหน้าสนามบิน' },
        { zh: '沿 211 公路向东直达清刊镇', en: 'Take Route 211 east straight to Chiang Khan town', th: 'ใช้ทางหลวง 211 ไปตะวันออกถึงตัวเมืองเชียงคาน' },
      ] },
    ],

    food: [
      { name: 'Khao Piak Sen', type: { zh: '米线汤', en: 'Noodle soup', th: 'ก๋วยเตี๋ยว' }, desc: { zh: '老挝风手擀米线鸡汤，清刊最常见早餐与夜市暖身选择。', en: 'Lao-style hand-cut rice noodles in broth — a Chiang Khan staple for warmth.', th: 'เส้นมือตัดสไตล์ลาวในน้ำซุป ของขึ้นชื่อที่เชียงคาน' }, origin: 'Loei / Isan' },
      { name: 'Miang Kham', type: { zh: '叶包小吃', en: 'Leaf-wrapped bites', th: 'เมี่ยงคำ' }, desc: { zh: '槟榔叶包椰糖、姜、柠檬与花生，一口多重口感。', en: 'Betel leaf wrapping palm sugar, ginger, lime and peanut — one bite, many textures.', th: 'ใบพลูห่อน้ำตาล ขิง มะนาวและถั่ว หนึ่งคำหลายรส' }, origin: 'Isan / Lao' },
      { name: 'Grilled Mekong Fish', type: { zh: '烤河鱼', en: 'Grilled river fish', th: 'ปลาเผา' }, desc: { zh: '湄公河鲜鱼炭烤，配青木瓜沙拉。', en: 'Charcoal-grilled Mekong fish served with green papaya salad.', th: 'ปลาแม่น้ำโขงย่างไฟถ่าน คู่ส้มตำ' }, origin: 'Mekong' },
      { name: 'Khanom Krok', type: { zh: '椰香小糕', en: 'Coconut pancakes', th: 'ขนมครก' }, desc: { zh: '椰子焦糖小糕，外脆内嫩的街头甜点。', en: 'Coconut custard pancakes, crisp outside and soft inside.', th: 'ขนมมะพร้าวกรอบนอกนุ่มใน' }, origin: 'Thailand' },
    ],

    nearby: [
      { name: { zh: '清刊老城区', en: 'Chiang Khan Old Town', th: 'เมืองเก่าเชียงคาน' }, type: { zh: '历史街区', en: 'Historic district', th: 'ย่านเก่า' }, desc: { zh: '步行街之外，老城区仍有木屋民宿与咖啡馆。', en: 'Beyond the street, the old town keeps wooden guesthouses and cafés.', th: 'นอกเหนือจากถนน ยังมีโรงแรมไม้และคาเฟ่' } },
      { name: { zh: '湄公河畔步道', en: 'Mekong Riverside', th: 'ทางเดินริมแม่น้ำโขง' }, type: { zh: '自然 / 景观', en: 'Nature / view', th: 'ธรรมชาติ / วิว' }, desc: { zh: '对岸即老挝，是看落日与晨雾的好去处。', en: 'Lao hills across the water make a fine sunrise and sunset spot.', th: 'ทิวเขาลาวฝั่งโค้งเหมาะชมพระอาทิตย์ขึ้นและตก' } },
      { name: { zh: '城镇中心', en: 'Town Center', th: 'ใจกลางเมือง' }, type: { zh: '配套区', en: 'Amenities', th: 'สิ่งอำนวยความสะดวก' }, desc: { zh: '便利店、市场与车站集中在中心区。', en: 'Convenience stores, market and bus station cluster in the center.', th: 'ร้านสะดวกซื้อ ตลาดและสถานีรถบัสอยู่กลางเมือง' } },
    ],

    culture: { zh: '清刊深受老挝依善文化影响：木屋、法语—老挝混合的店招、慢生活节奏，以及河畔佛教日常，构成独特的边境小镇气质。', en: 'Chiang Khan is shaped by Lao–Isan culture: timber houses, Franco-Lao shop signs, a slow pace of life and riverside Buddhist routines give the border town its distinct character.', th: 'เชียงคานได้รับอิทธิพลวัฒนธรรมลาว-อีสาน บ้านไม้ ป้ายร้านสไตล์ลาว-ฝรั่งเศส จังหวะชีวิตที่ช้าและวิถีพุทธริมน้ำ' },
    photography: { zh: '傍晚蓝调时刻的木屋暖灯、无车街道的纵深透视、以及湄公河对岸老挝山脊的落日，是最出片的三个机位。', en: 'Three top shots: warm-lit timber houses at blue hour, the car-free lane in deep perspective, and the Lao ridge sunset across the Mekong.', th: 'จุดถ่ายภาพเด่น: บ้านไม้สว่างไส้ช่วง blue hour ซอยปลอดรถในมุมลึก และพระอาทิตย์ตกทิวเขาลาว' },
    accessibility: { zh: '步行街为无车步道，平缓易行；部分老屋台阶较多。建议穿舒适鞋，雨季注意湿滑。', en: 'The street is a flat, car-free walkway; some old houses have steps. Wear comfortable shoes and mind wet surfaces in the rainy season.', th: 'ถนนเป็นทางเดินราบปลอดรถ บางบ้านไม้มีบันได สวมรองเท้าสบายและระวังลื่นหน้าฝน' },

    faq: [
      { q: { zh: '步行街几点开放？', en: 'What time does it open?', th: 'เปิดกี่โมง' }, a: { zh: '每日 17:00–22:00，傍晚后摊贩才陆续就位。', en: 'Every evening 17:00–22:00; stalls set up after sundown.', th: 'ทุกเย็น 17:00–22:00 ร้านค่อยๆ ตั้งหลังพระอาทิตย์ตก' } },
      { q: { zh: '每周哪几天开市？', en: 'Which days of the week is it open?', th: 'ถนนคนเดินเชียงคานเปิดวันไหน' }, a: { zh: '每天都开，全年无休，包括公共假日与佛日。', en: 'Every day, all year round, including public holidays and Buddhist holy days.', th: 'เปิดทุกวันตลอดทั้งปี รวมวันหยุดนักขัตฤกษ์และวันพระ' } },
      { q: { zh: '几点收市？', en: 'What time does it close?', th: 'ถนนคนเดินเชียงคานปิดกี่โมง' }, a: { zh: '22:00 收市，部分摊位 21:30 后就开始收摊。', en: 'It closes at 22:00; some stalls start packing up after 21:30.', th: 'ปิดเวลา 22:00 บางร้านเริ่มเก็บของตั้งแต่ 21:30' } },
      { q: { zh: '“清刊步行街”的英文怎么写？', en: 'What is Chiang Khan Walking Street called in English?', th: 'เชียงคาน ภาษาอังกฤษ เรียกว่าอะไร' }, a: { zh: '英文写作 Chiang Khan Walking Street，也有 Chiangkhan 的拼法，指同一地点。', en: 'In English it is written Chiang Khan Walking Street; the spelling "Chiangkhan" refers to the same place.', th: 'ภาษาอังกฤษเขียนว่า Chiang Khan Walking Street และมีการสะกดแบบ Chiangkhan ซึ่งหมายถึงที่เดียวกัน' } },
      { q: { zh: '需要门票吗？', en: 'Is there an entrance fee?', th: 'มีค่าเข้าไหม' }, a: { zh: '免费开放，消费另计。', en: 'Free to enter; you only pay for what you buy.', th: 'เข้าฟรี จ่ายเฉพาะของที่ซื้อ' } },
      { q: { zh: '工作日和周末有区别吗？', en: 'Weekday vs weekend?', th: 'วันธรรมดากับเสาร์อาทิตย์ต่างกันไหม' }, a: { zh: '周末更热闹，工作日更清净，适合拍照。', en: 'Weekends are livelier; weekdays are calmer and better for photos.', th: 'เสาร์อาทิตย์คึกคัก วันธรรมดาสงบเหมาะถ่ายรูป' } },
      { q: { zh: '怎么从曼谷过去？', en: 'How to get there from Bangkok?', th: 'ไปจาก กทม. อย่างไร' }, a: { zh: '飞黎府机场再转车约 1.5 小时，或过夜大巴直达。', en: 'Fly to Loei then transfer (~1.5h), or take an overnight bus direct.', th: 'บินไปเลยแล้วต่อรถ ~1.5 ชม. หรือนั่งบัสค้างคืนตรง' } },
      { q: { zh: '清刊步行街在哪里？', en: 'Where is Chiang Khan Walking Street located?', th: 'ถนนคนเดินเชียงคานตั้งอยู่ที่ไหน' }, a: { zh: '位于泰国黎府清刊县 Chai Kong 路，紧邻湄公河，邮政编码 42110。', en: 'It is located on Chai Kong Road in Chiang Khan, Loei Province, Thailand, beside the Mekong River (postal code 42110).', th: 'ตั้งอยู่บนถนนชายโขง อำเภอเชียงคาน จังหวัดเลย ริมแม่น้ำโขง รหัสไปรษณีย์ 42110' } },
      { q: { zh: '一年中什么时候去最好？', en: 'What is the best time of year to visit?', th: 'ช่วงไหนของปีที่ควรไปที่สุด' }, a: { zh: '11 月至次年 2 月的凉季最舒适，落日与夜市氛围最佳；雨季（6–10 月）人最少。', en: 'The cool season from November to February is the most comfortable, with the best sunsets and market atmosphere; the rainy season (June–October) is the quietest.', th: 'ฤดูหนาวตั้งแต่พฤศจิกายนถึงกุมภาพันธ์สบายที่สุด พระอาทิตย์ตกและบรรยากาศตลาดดีที่สุด ส่วนฤดูฝน (มิถุนายน–ตุลาคม) คนน้อยที่สุด' } },
      { q: { zh: '有什么必吃的当地美食？', en: 'What local food should I try?', th: 'มีอาหารท้องถิ่นอะไรที่ต้องลอง' }, a: { zh: '推荐老挝风米线汤（Khao Piak Sen）、叶包小吃（Miang Kham）与湄公河烤鱼。', en: 'Try Lao-style rice noodle soup (Khao Piak Sen), leaf-wrapped bites (Miang Kham) and charcoal-grilled Mekong fish.', th: 'แนะนำก๋วยเตี๋ยวเส้นมือ (ข้าวเปียกเส้น) เมี่ยงคำ และปลาแม่น้ำโขงเผา' } },
      { q: { zh: '游览步行街需要多久？适合家庭吗？', en: 'How long does a visit take? Is it family friendly?', th: 'ใช้เวลาเที่ยวเท่าไร เหมาะกับครอบครัวไหม' }, a: { zh: '慢慢逛完约 1.5–2 小时；街道无车、平坦易行，非常适合家庭与长辈。', en: 'A relaxed visit takes about 1.5–2 hours; the street is car-free and flat, making it very family and senior friendly.', th: 'ใช้เวลาประมาณ 1.5–2 ชั่วโมง ถนนปลอดรถและราบเรียบ เหมาะกับครอบครัวและผู้สูงอายุมาก' } },
    ],

    visitorSummary: {
      positives: [
        { zh: '傍晚氛围迷人', en: 'Beautiful evening atmosphere', th: 'บรรยากาศยามค่ำสวยงาม' },
        { zh: '传统木屋保存完好', en: 'Well-kept traditional houses', th: 'บ้านไม้ดั้งเดิมอนุรักษ์ดี' },
        { zh: '美食丰富实惠', en: 'Rich, affordable food', th: 'อาหารอุดมสมบูรณ์ราคาดี' },
        { zh: '湄公河落日绝美', en: 'Stunning Mekong sunset', th: 'พระอาทิตย์ตกโขงงดงาม' },
      ],
      negatives: [
        { zh: '工作日相对冷清', en: 'Quieter on weekdays', th: 'วันธรรมดาค่อนข้างเงียบ' },
        { zh: '地处偏远、交通需转乘', en: 'Remote, needs transfers', th: 'อยู่ไกลต้องต่อรถ' },
        { zh: '旺季周末人多', en: 'Crowded on peak weekends', th: 'คนแน่นในสุดสัปดาห์ฤดูกาล' },
      ],
    },

    sources: [
      { name: 'Tourism Authority of Thailand (TAT)', url: 'https://www.tourismthailand.org/' },
      { name: 'Google Maps — reviews & rating', url: 'https://maps.app.goo.gl/TwNr5mSMUff1hf8G7' },
      { name: 'Loei Province — official provincial portal', url: 'https://www.loei.go.th/' },
      { name: 'OpenStreetMap', url: 'https://www.openstreetmap.org/' },
      { name: 'Wikidata', url: 'https://www.wikidata.org/' },
      { name: 'Open-Meteo', url: 'https://open-meteo.com/' },
    ],

    ...extendedContent,
  },
];

export function getAttraction(slug: string): Attraction | undefined {
  return attractions.find((a) => a.slug === slug);
}

/** Resolve a translated field for the active language, falling back to English. */
export function pick(tr: Tr | undefined, lang: Lang): string {
  if (!tr) return '';
  return tr[lang] ?? tr.en ?? '';
}

/**
 * Section definitions that drive the auto-generated SEO page matrix.
 *
 * `seoTitle` / `seoDesc` are written against the Search Console queries these
 * pages are meant to win, not against the section heading. Each description
 * answers the query in its first clause, because the snippets that earn clicks
 * are the ones that give the answer away instead of teasing it.
 */
export interface SectionDef {
  slug: string;
  focus:
    | 'transport'
    | 'bestTime'
    | 'food'
    | 'routes'
    | 'nearby'
    | 'hours'
    | 'photography'
    | 'weather'
    | 'seasons'
    | 'services'
    | 'plans'
    | 'science';
  title: Tr;
  seoTitle: Tr;
  seoDesc: Tr;
  transportFrom?: string; // for transport sections, filter by this `from` (en key)
}

export const sectionDefs: SectionDef[] = [
  {
    slug: 'from-bangkok',
    focus: 'transport',
    transportFrom: 'From Bangkok',
    title: { zh: '从曼谷前往清刊步行街', en: 'Getting to Chiang Khan Walking Street from Bangkok', th: 'เดินทางจากกรุงเทพฯ ไปถนนคนเดินเชียงคาน' },
    seoTitle: { zh: '从曼谷到清刊步行街：飞机＋大巴交通攻略与耗时', en: 'Bangkok to Chiang Khan Walking Street: Flight & Bus Guide', th: 'จากกรุงเทพฯ ไปถนนคนเดินเชียงคาน กี่ชั่วโมง วิธีเดินทาง' },
    seoDesc: {
      zh: '从曼谷去清刊步行街怎么走：飞黎府机场再转车约 1.5 小时，或乘过夜大巴直达约 10–11 小时，含换乘节点与时间安排。',
      en: 'How to get from Bangkok to Chiang Khan Walking Street in Loei: fly to Loei Airport then transfer about 1.5 hours, or take a direct overnight bus in 10–11 hours.',
      th: 'วิธีเดินทางจากกรุงเทพฯ ไปถนนคนเดินเชียงคาน บินลงสนามบินเลยแล้วต่อรถราว 1.5 ชั่วโมง หรือนั่งรถบัสค้างคืนตรงราว 10–11 ชั่วโมง',
    },
  },
  {
    slug: 'from-chiang-mai',
    focus: 'transport',
    transportFrom: 'From Chiang Mai',
    title: { zh: '从清迈前往清刊步行街', en: 'Getting to Chiang Khan Walking Street from Chiang Mai', th: 'เดินทางจากเชียงใหม่ ไปถนนคนเดินเชียงคาน' },
    seoTitle: { zh: '从清迈到清刊步行街：自驾与巴士路线、耗时', en: 'Chiang Mai to Chiang Khan Walking Street: Route & Drive Time', th: 'จากเชียงใหม่ ไปถนนคนเดินเชียงคาน เส้นทางและเวลาเดินทาง' },
    seoDesc: {
      zh: '从清迈开车或坐巴士去清刊步行街约 5–6 小时：沿 1 号公路南下经彭世洛转黎府，再向东北进入清刊，含路线与休息点。',
      en: 'Driving or taking the bus from Chiang Mai to Chiang Khan Walking Street takes about 5–6 hours: south on Route 1 via Phitsanulok to Loei, then northeast to Chiang Khan.',
      th: 'ขับรถหรือนั่งรถบัสจากเชียงใหม่ไปถนนคนเดินเชียงคานราว 5–6 ชั่วโมง ใช้ทางหลวงหมายเลข 1 ผ่านพิษณุโลกไปเลย แล้วต่อไปทางตะวันออกเฉียงเหนือ',
    },
  },
  {
    slug: 'from-loei-airport',
    focus: 'transport',
    transportFrom: 'From Loei Airport',
    title: { zh: '从黎府机场前往清刊步行街', en: 'Getting to Chiang Khan Walking Street from Loei Airport', th: 'เดินทางจากสนามบินเลย ไปถนนคนเดินเชียงคาน' },
    seoTitle: { zh: '黎府机场到清刊步行街：出租车、拼车与双条车', en: 'Loei Airport to Chiang Khan Walking Street: Taxi & Songthaew', th: 'จากสนามบินเลย ไปถนนคนเดินเชียงคาน แท็กซี่และรถสองแถว' },
    seoDesc: {
      zh: '从黎府机场（LOE）到清刊步行街约 1.5 小时，走 211 号公路。含出租车、拼车与双条车的上车点、大致车资与夜间到达提示。',
      en: 'From Loei Airport (LOE) to Chiang Khan Walking Street is about 1.5 hours on Route 211. Taxi, shared ride and songthaew pick-up points, plus late-arrival notes.',
      th: 'จากสนามบินเลย (LOE) ไปถนนคนเดินเชียงคานราว 1.5 ชั่วโมง ใช้ทางหลวง 211 พร้อมจุดขึ้นแท็กซี่ รถร่วม และรถสองแถว',
    },
  },
  {
    slug: 'best-time-to-visit',
    focus: 'bestTime',
    title: { zh: '清刊步行街最佳游览时间', en: 'Best Time to Visit Chiang Khan Walking Street', th: 'เวลาเยี่ยมชมที่ดีที่สุด' },
    seoTitle: { zh: '清刊步行街最佳游览时间：11 月至次年 2 月最舒适', en: 'Best Time to Visit Chiang Khan Walking Street (Month by Month)', th: 'ช่วงเวลาที่ดีที่สุดในการเที่ยวถนนคนเดินเชียงคาน' },
    seoDesc: {
      zh: '按月对比清刊步行街的天气、湄公河水位、人流与摄影条件：11 月至次年 2 月凉季最舒适、落日与夜市氛围最佳；6–10 月雨季人最少。',
      en: 'Chiang Khan Walking Street month by month: the cool season (November–February) offers the best weather, sunsets and market mood, while the rainy season is the quietest.',
      th: 'เที่ยวถนนคนเดินเชียงคานเดือนไหนดี ฤดูหนาว (พ.ย.–ก.พ.) อากาศดีที่สุด พระอาทิตย์ตกและบรรยากาศตลาดดีที่สุด ส่วนฤดูฝนคนน้อยที่สุด',
    },
  },
  {
    slug: 'food-guide',
    focus: 'food',
    title: { zh: '清刊步行街美食指南', en: 'Chiang Khan Walking Street Food Guide', th: 'คู่มืออาหารถนนคนเดินเชียงคาน' },
    seoTitle: { zh: '清刊步行街美食指南：米线汤、叶包小吃与湄公河烤鱼', en: 'Chiang Khan Walking Street Food Guide: What to Eat', th: 'อาหารถนนคนเดินเชียงคาน กินอะไรดี ของต้องลอง' },
    seoDesc: {
      zh: '清刊步行街必吃当地美食：老挝风米线汤（Khao Piak Sen）、叶包小吃（Miang Kham）、炭烤湄公河鱼与椰香小糕，附口味与吃法说明。',
      en: 'What to eat on Chiang Khan Walking Street: Lao-style rice noodle soup, leaf-wrapped miang kham, charcoal-grilled Mekong fish and coconut pancakes, with tasting notes.',
      th: 'อาหารต้องลองที่ถนนคนเดินเชียงคาน ข้าวเปียกเส้น เมี่ยงคำ ปลาแม่น้ำโขงเผา และขนมครก พร้อมคำอธิบายรสชาติและวิธีทาน',
    },
  },
  {
    slug: 'walking-route',
    focus: 'routes',
    title: { zh: '清刊步行街游玩路线', en: 'Chiang Khan Walking Street Routes', th: 'เส้นทางถนนคนเดินเชียงคาน' },
    seoTitle: { zh: '清刊步行街游玩路线：30 分钟、2 小时与半日', en: 'Chiang Khan Walking Street Routes: 30 Min, 2 Hour & Half Day', th: 'เส้นทางเดินเที่ยวถนนคนเดินเชียงคาน 30 นาที ถึงครึ่งวัน' },
    seoDesc: {
      zh: '清刊步行街的三种走法：30 分钟精华、2 小时深度、半日联游湄公河步道与老城区，含路段顺序、耗时与沿途看点。',
      en: 'Three ways to walk Chiang Khan Walking Street: a 30-minute highlights pass, a two-hour route and a half-day loop with the Mekong promenade and old town.',
      th: 'สามเส้นทางสำหรับเดินถนนคนเดินเชียงคาน 30 นาที 2 ชั่วโมง และครึ่งวันที่ต่อกับทางเดินริมโขงกับเมืองเก่า',
    },
  },
  {
    slug: 'nearby-attractions',
    focus: 'nearby',
    title: { zh: '清刊步行街周边探索', en: 'Near Chiang Khan Walking Street', th: 'สถานที่ใกล้เคียง' },
    seoTitle: { zh: '清刊步行街周边景点：老城区、湄公河畔与寺庙', en: 'Near Chiang Khan Walking Street: Old Town, Riverside & Temples', th: 'สถานที่เที่ยวใกล้ถนนคนเดินเชียงคาน' },
    seoDesc: {
      zh: '清刊步行街周边可以步行抵达的景点：老城区木屋与咖啡馆、湄公河畔步道、当地寺庙与镇上市场，含方位与推荐串联方式。',
      en: "What to see around Chiang Khan Walking Street: the old town's wooden houses and cafés, the Mekong riverside path, local temples and the town market.",
      th: 'สถานที่เที่ยวใกล้ถนนคนเดินเชียงคาน เมืองเก่าเชียงคาน ทางเดินริมโขง วัดท้องถิ่นและตลาดในเมือง พร้อมวิธีต่อเส้นทาง',
    },
  },
  {
    slug: 'night-market-hours',
    focus: 'hours',
    title: { zh: '清刊步行街开放时间', en: 'Chiang Khan Walking Street Hours', th: 'เวลาเปิด-ปิด' },
    seoTitle: { zh: '清刊步行街开放时间：每天 17:00–22:00', en: 'Chiang Khan Walking Street Opening Hours: Daily 17:00–22:00', th: 'ถนนคนเดินเชียงคาน เปิดวันไหน เปิดกี่โมง ปิดกี่โมง' },
    seoDesc: {
      zh: '清刊步行街几点开、几点关、哪天开：每天 17:00–22:00 营业，一周七天都有；含摊贩就位时间、最热闹时段与雨天方案。',
      en: 'What time Chiang Khan Walking Street opens and closes: every day 17:00–22:00, including which days it runs, when stalls finish setting up and the busiest window.',
      th: 'ถนนคนเดินเชียงคานเปิดทุกวัน 17:00–22:00 เปิดวันไหน เปิดกี่โมง ปิดกี่โมง ร้านเริ่มตั้งกี่โมง และช่วงที่คนเยอะที่สุด',
    },
  },
  {
    slug: 'photo-spots',
    focus: 'photography',
    title: { zh: '清刊步行街摄影机位', en: 'Chiang Khan Walking Street Photo Spots', th: 'จุดถ่ายภาพ' },
    seoTitle: { zh: '清刊步行街摄影机位：蓝调时刻与湄公河落日', en: 'Chiang Khan Walking Street Photo Spots & Best Light', th: 'จุดถ่ายภาพถนนคนเดินเชียงคาน ช่วงแสงสวยที่สุด' },
    seoDesc: {
      zh: '清刊步行街的三个出片机位：蓝调时刻的木屋暖灯、无车街道的纵深透视、湄公河对岸老挝山脊的落日，含最合适的拍摄时间。',
      en: 'The three best photo spots on Chiang Khan Walking Street: warm-lit timber houses at blue hour, the car-free lane in deep perspective and the Lao ridge at sunset.',
      th: 'สามจุดถ่ายภาพเด่นของถนนคนเดินเชียงคาน บ้านไม้ช่วง blue hour ซอยปลอดรถในมุมลึก และพระอาทิตย์ตกแนวสันเขาลาว',
    },
  },
  {
    slug: 'weather-and-forecast',
    focus: 'weather',
    title: { zh: '清刊步行街天气与多日预报', en: 'Chiang Khan Walking Street Weather & Forecast', th: 'สภาพอากาศและการพยากรณ์' },
    seoTitle: { zh: '清刊步行街天气与 7 日预报：穿什么、怎么安排', en: 'Chiang Khan Walking Street Weather & 7-Day Forecast', th: 'สภาพอากาศถนนคนเดินเชียงคาน พยากรณ์ 7 วัน' },
    seoDesc: {
      zh: '清刊步行街实时天气与未来 7 日预报，并直接给出建议：降雨概率、紫外线与风力如何影响傍晚行程，该穿什么、带什么。',
      en: 'Live weather for Chiang Khan Walking Street with a 7-day outlook and plain-language advice: how rain, UV and wind affect your evening visit, and what to wear and carry.',
      th: 'สภาพอากาศปัจจุบันของถนนคนเดินเชียงคาน พร้อมพยากรณ์ 7 วันและคำแนะนำที่ใช้ได้จริง โอกาสฝน ค่า UV และลมส่งผลต่อการเที่ยวช่วงเย็นอย่างไร',
    },
  },
  {
    slug: 'seasonal-guide',
    focus: 'seasons',
    title: { zh: '清刊步行街四季游览策略', en: 'Seasonal Guide to Chiang Khan Walking Street', th: 'คู่มือเที่ยวตามฤดูกาล' },
    seoTitle: { zh: '清刊步行街四季游览策略：气象、水位与野生动物', en: 'Seasonal Guide to Chiang Khan Walking Street', th: 'คู่มือเที่ยวถนนคนเดินเชียงคานตามฤดูกาล' },
    seoDesc: {
      zh: '按凉季、热季、雨季对照清刊步行街的气象、湄公河水位与野生动物活动，并给出每一季的穿搭、行程安排与摄影建议。',
      en: 'Chiang Khan Walking Street season by season: weather, Mekong river levels and wildlife for the cool, hot and rainy seasons, with packing, planning and photo advice.',
      th: 'เที่ยวถนนคนเดินเชียงคานในแต่ละฤดู เปรียบเทียบอากาศ ระดับน้ำโขง และสัตว์ป่า พร้อมคำแนะนำการแต่งตัว แผนเที่ยวและถ่ายภาพ',
    },
  },
  {
    slug: 'travel-plans',
    focus: 'plans',
    title: { zh: '清刊步行街游览路线方案', en: 'Chiang Khan Walking Street Route Plans', th: 'แผนการเที่ยวถนนคนเดินเชียงคาน' },
    seoTitle: { zh: '清刊步行街游览路线：亲子、摄影与低体力方案', en: 'Chiang Khan Walking Street Route Plans by Visitor Type', th: 'แผนเที่ยวถนนคนเดินเชียงคาน ตามกลุ่มผู้เดินทาง' },
    seoDesc: {
      zh: '按出行构成选清刊步行街路线：亲子家庭、摄影与自然爱好者、需要限制步行距离的访客，另附半日与全日两种时间安排。',
      en: 'Pick a Chiang Khan Walking Street plan by who is travelling: families, photographers and naturalists, or visitors who need to limit walking. Half-day and full-day options.',
      th: 'เลือกแผนเที่ยวถนนคนเดินเชียงคานตามกลุ่มผู้เดินทาง ครอบครัวที่มีเด็ก นักถ่ายภาพและผู้สนใจธรรมชาติ และผู้ที่ต้องจำกัดระยะเดิน',
    },
  },
  {
    slug: 'visitor-facilities',
    focus: 'services',
    title: { zh: '清刊步行街访客服务与周边设施', en: 'Visitor Services Around Chiang Khan Walking Street', th: 'บริการนักท่องเที่ยวและสิ่งอำนวยความสะดวก' },
    seoTitle: { zh: '清刊步行街访客设施：停车、卫生间与便利店', en: 'Visitor Facilities Around Chiang Khan Walking Street', th: 'บริการและสิ่งอำนวยความสะดวก ถนนคนเดินเชียงคาน' },
    seoDesc: {
      zh: '清刊步行街周边的设施类型说明：停车与接送点、卫生间、便利店、医疗服务与无障碍通行，仅按类别说明，不推荐具体商户。',
      en: 'Facilities around Chiang Khan Walking Street described by category: parking and drop-off, toilets, convenience stores, medical help and step-free access. No businesses named.',
      th: 'สิ่งอำนวยความสะดวกโดยรอบถนนคนเดินเชียงคาน อธิบายตามประเภท ที่จอดรถ จุดส่ง-รับ ห้องน้ำ ร้านสะดวกซื้อ และการเข้าถึงสำหรับผู้ใช้รถเข็น',
    },
  },
  {
    slug: 'nature-and-heritage',
    focus: 'science',
    title: { zh: '清刊步行街自然与人文科普', en: 'Nature & Heritage of Chiang Khan Walking Street', th: 'ธรรมชาติและมรดกของถนนคนเดินเชียงคาน' },
    seoTitle: { zh: '清刊步行街自然与人文：地理、建筑、传说与地名', en: 'Nature & Heritage of Chiang Khan Walking Street', th: 'ธรรมชาติและมรดกของถนนคนเดินเชียงคาน' },
    seoDesc: {
      zh: '理解清刊步行街的背景知识：湄公河地理与水文、老挝—法国殖民地风格木构建筑、那伽水神信仰与口述传统，以及地名由来与读音。',
      en: 'Background on Chiang Khan Walking Street: Mekong geography and hydrology, Lao-colonial timber architecture, Naga river beliefs and oral tradition, and where the names come from.',
      th: 'ความรู้เบื้องหลังถนนคนเดินเชียงคาน ภูมิศาสตร์และอุทกวิทยาแม่น้ำโขง สถาปัตยกรรมไม้สไตล์ลาว-โคโลเนียล ความเชื่อพญานาค และที่มาของชื่อสถานที่',
    },
  },
];

export function getSection(slug: string): SectionDef | undefined {
  return sectionDefs.find((s) => s.slug === slug);
}
