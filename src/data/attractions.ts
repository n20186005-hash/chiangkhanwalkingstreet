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

  // --- media (future: sourced from Wikimedia Commons, user uploads) ---
  images: AttractionImage[];

  // --- content modules (localized) ---
  intro: Tr;
  history: Tr;
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
      lat: 17.884,
      lng: 101.645,
      address: 'Chai Kong, Chiang Khan, Chiang Khan District, Loei 42110',
      plusCode: 'VMW6+R8 Chiang Khan',
    },

    hours: { open: '17:00', close: '22:00', note: {
      zh: '每日傍晚 17:00 至 22:00 开放，雨季客流较少。',
      en: 'Open every evening 17:00–22:00; quieter during the rainy season.',
      th: 'เปิดทุกเย็น 17:00–22:00 ในช่วงฝนคนจะบางตาลง',
    } },
    rating: 4.5,
    reviewCount: 12076,
    mapsUrl: 'https://maps.app.goo.gl/WDRoraurE8et4atV7',

    images: Array.from({ length: 15 }, (_, i) => ({
      file: `/gallery/chiang-khan-walking-street-${i + 1}.jpg`,
      caption: {
        zh: `清刊步行街实景 ${i + 1}`,
        en: `Chiang Khan Walking Street scene ${i + 1}`,
        th: `บรรยากาศถนนคนเดินเชียงคาน ${i + 1}`,
      },
    })),

    history: {
      zh: '清刊自湄公河航运时代便是老挝边境的河港小镇。20 世纪初的木构店屋沿主街而建，随航运衰落一度沉寂；近年以"慢城"理念修复老街、限制车辆，复兴为步行文化与夜市街区。',
      en: 'Chiang Khan grew as a Mekong river-port on the Lao border. Timber shophouses rose along the main lane in the early 1900s, then faded with river trade. Recently the town revived the street as a car-free "slow town" of culture and night market.',
      th: 'เชียงคานเติบโตเป็นท่าจอดเรือริมโขงชายแดนลาว บ้านไม้เกิดขึ้นตลอดซอยหลักต้นศตวรรษที่ 20 แล้วซบเซาลงกับการค้าแม่น้ำ ล่าสุดเมืองฟื้นฟูถนนเป็นเมืองช้าไร้รถของวัฒนธรรมและตลาดนัด',
    },

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
      { name: 'Miang Kham', type: { zh: '叶包小吃', en: 'Leaf-wrapped bites', th: 'เมี่ยงคำ' }, desc: { zh: '槟榔叶包椰糖、姜、柠檬与花生，一口多重口感。', en: 'Betel leaf wrapping palm sugar, ginger, lime and peanut — one bite, many textures.', th: 'ใบพลูห่อน้ำตาล โ�ตรกิ้ง มะนาวและถั่ว หนึ่งคำหลายรส' }, origin: 'Isan / Lao' },
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
      { q: { zh: '需要门票吗？', en: 'Is there an entrance fee?', th: 'มีค่าเข้าไหม' }, a: { zh: '免费开放，消费另计。', en: 'Free to enter; you only pay for what you buy.', th: 'เข้าฟรี จ่ายเฉพาะของที่ซื้อ' } },
      { q: { zh: '工作日和周末有区别吗？', en: 'Weekday vs weekend?', th: 'วันธรรมดากับเสาร์อาทิตย์ต่างกันไหม' }, a: { zh: '周末更热闹，工作日更清净，适合拍照。', en: 'Weekends are livelier; weekdays are calmer and better for photos.', th: 'เสาร์อาทิตย์คึกคัก วันธรรมดาสงบเหมาะถ่ายรูป' } },
      { q: { zh: '怎么从曼谷过去？', en: 'How to get there from Bangkok?', th: 'ไปจาก กทม. อย่างไร' }, a: { zh: '飞黎府机场再转车约 1.5 小时，或过夜大巴直达。', en: 'Fly to Loei then transfer (~1.5h), or take an overnight bus direct.', th: 'บินไปเลยแล้วต่อรถ ~1.5 ชม. หรือนั่งบัสค้างคืนตรง' } },
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
      { name: 'Tourism Thailand (TAT)', url: 'https://www.tourismthailand.org/' },
      { name: 'Google Maps', url: 'https://maps.app.goo.gl/WDRoraurE8et4atV7' },
      { name: 'OpenStreetMap', url: 'https://www.openstreetmap.org/' },
      { name: 'Wikidata', url: 'https://www.wikidata.org/' },
    ],
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

/** Section definitions that drive the auto-generated SEO page matrix. */
export interface SectionDef {
  slug: string;
  focus: 'transport' | 'bestTime' | 'food' | 'routes' | 'nearby' | 'hours' | 'photography';
  title: Tr;
  transportFrom?: string; // for transport sections, filter by this `from` (en key)
}

export const sectionDefs: SectionDef[] = [
  { slug: 'from-bangkok', focus: 'transport', transportFrom: 'From Bangkok', title: { zh: '从曼谷前往清刊步行街', en: 'Getting to Chiang Khan Walking Street from Bangkok', th: 'เดินทางจากกรุงเทพฯ ไปถนนคนเดินเชียงคาน' } },
  { slug: 'from-chiang-mai', focus: 'transport', transportFrom: 'From Chiang Mai', title: { zh: '从清迈前往清刊步行街', en: 'Getting to Chiang Khan Walking Street from Chiang Mai', th: 'เดินทางจากเชียงใหม่ ไปถนนคนเดินเชียงคาน' } },
  { slug: 'from-loei-airport', focus: 'transport', transportFrom: 'From Loei Airport', title: { zh: '从黎府机场前往清刊步行街', en: 'Getting to Chiang Khan Walking Street from Loei Airport', th: 'เดินทางจากสนามบินเลย ไปถนนคนเดินเชียงคาน' } },
  { slug: 'best-time-to-visit', focus: 'bestTime', title: { zh: '清刊步行街最佳游览时间', en: 'Best Time to Visit Chiang Khan Walking Street', th: 'เวลาเยี่ยมชมที่ดีที่สุด' } },
  { slug: 'food-guide', focus: 'food', title: { zh: '清刊步行街美食指南', en: 'Chiang Khan Walking Street Food Guide', th: 'คู่มืออาหารถนนคนเดินเชียงคาน' } },
  { slug: 'walking-route', focus: 'routes', title: { zh: '清刊步行街游玩路线', en: 'Chiang Khan Walking Street Routes', th: 'เส้นทางถนนคนเดินเชียงคาน' } },
  { slug: 'nearby-attractions', focus: 'nearby', title: { zh: '清刊步行街周边探索', en: 'Near Chiang Khan Walking Street', th: 'สถานที่ใกล้เคียง' } },
  { slug: 'night-market-hours', focus: 'hours', title: { zh: '清刊步行街开放时间', en: 'Chiang Khan Walking Street Hours', th: 'เวลาเปิด-ปิด' } },
  { slug: 'photo-spots', focus: 'photography', title: { zh: '清刊步行街摄影机位', en: 'Chiang Khan Walking Street Photo Spots', th: 'จุดถ่ายภาพ' } },
];

export function getSection(slug: string): SectionDef | undefined {
  return sectionDefs.find((s) => s.slug === slug);
}
